import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ecpayService, subscriptionPlans } from '@/lib/ecpay';
import { z } from 'zod';

const createPaymentSchema = z.object({
  plan: z.enum(['CREATOR', 'PRO', 'ENTERPRISE']),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: '請先登入' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = createPaymentSchema.parse(body);

    // 檢查用戶是否存在
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: '用戶不存在' },
        { status: 404 }
      );
    }

    // 檢查是否已經是相同或更高級的方案
    if (user.subscription && user.subscription.plan !== 'FREE') {
      const currentPlanLevel = Object.keys(subscriptionPlans).indexOf(user.subscription.plan);
      const newPlanLevel = Object.keys(subscriptionPlans).indexOf(plan);
      
      if (newPlanLevel <= currentPlanLevel) {
        return NextResponse.json(
          { error: '無法降級到更低級的方案' },
          { status: 400 }
        );
      }
    }

    const planConfig = subscriptionPlans[plan];
    
    // 創建 ECPay 付款
    const paymentResult = await ecpayService.createSubscriptionPayment({
      userId: session.user.id as string,
      plan,
      amount: planConfig.price,
      userEmail: session.user.email as string,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: '付款創建失敗', details: paymentResult.error },
        { status: 500 }
      );
    }

    // 記錄付款意圖到資料庫
    await prisma.subscription.upsert({
      where: { userId: session.user.id as string },
      update: {
        ecpayMerchantTradeNo: paymentResult.tradeNo,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id as string,
        plan,
        status: 'INCOMPLETE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天後
        ecpayMerchantTradeNo: paymentResult.tradeNo,
      }
    });

    return NextResponse.json({
      success: true,
      paymentHtml: paymentResult.html,
      tradeNo: paymentResult.tradeNo,
      plan: planConfig.name,
      amount: planConfig.price,
    });

  } catch (error) {
    console.error('Create payment error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '付款創建過程中發生錯誤' },
      { status: 500 }
    );
  }
}