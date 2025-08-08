import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { UsageTracker } from '@/lib/usage-tracker';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: '請先登入' },
        { status: 401 }
      );
    }

    const usageStats = await UsageTracker.getUserUsageStats(session.user.id as string);

    if (!usageStats) {
      return NextResponse.json(
        { error: '獲取使用統計失敗' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      usage: {
        current: usageStats.currentMonthUsage,
        limit: usageStats.limit,
        plan: usageStats.plan,
        canUse: usageStats.canUse,
        monthlyData: usageStats.monthlyData,
        totalUsage: usageStats.totalUsage
      }
    });

  } catch (error) {
    console.error('Get usage error:', error);
    return NextResponse.json(
      { error: '獲取使用統計失敗' },
      { status: 500 }
    );
  }
}