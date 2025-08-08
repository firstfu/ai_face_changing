import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ecpayService } from '@/lib/ecpay';

export async function POST(request: NextRequest) {
  try {
    // 獲取 ECPay 回調參數
    const formData = await request.formData();
    const params: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    console.log('ECPay callback received:', params);

    // 處理付款結果
    const result = await ecpayService.handlePaymentResult(params);
    
    if (result.success) {
      // 更新訂閱狀態
      const subscription = await prisma.subscription.findFirst({
        where: {
          ecpayMerchantTradeNo: result.tradeNo
        },
        include: {
          user: true
        }
      });

      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: 'ACTIVE',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天後
            updatedAt: new Date(),
          }
        });

        console.log(`Subscription activated for user: ${subscription.user.email}`);
      } else {
        console.error(`Subscription not found for tradeNo: ${result.tradeNo}`);
      }
    } else {
      console.error(`Payment failed for tradeNo: ${result.tradeNo}`, result.rtnMsg);
      
      // 標記訂閱為失敗
      await prisma.subscription.updateMany({
        where: {
          ecpayMerchantTradeNo: result.tradeNo
        },
        data: {
          status: 'INCOMPLETE',
          updatedAt: new Date(),
        }
      });
    }

    // ECPay 要求返回 '1|OK' 表示處理成功
    return new Response('1|OK', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Payment callback error:', error);
    
    // ECPay 要求返回 '0|ERROR' 表示處理失敗
    return new Response('0|ERROR', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// ECPay 也可能用 GET 方式發送某些通知
export async function GET(request: NextRequest) {
  return POST(request);
}