/**
 * 使用量查詢 API 路由 (Usage Statistics API Route)
 * 
 * 提供用戶使用量統計資料：
 * - 驗證用戶身份與權限
 * - 獲取當前月份使用量
 * - 提供使用限制與剩餘額度
 * - 返回訂閱方案資訊
 * - 歷史使用資料與總計
 * - 使用狀態檢查 (是否可繼續使用)
 * 
 * API 端點：GET /api/usage
 * 
 * 回傳資料結構：
 * - current: 當月使用次數
 * - limit: 方案使用上限
 * - plan: 訂閱方案類型
 * - canUse: 是否可繼續使用
 * - monthlyData: 月度使用資料
 * - totalUsage: 總使用次數
 * 
 * 使用技術：
 * - Next.js 15 API Routes
 * - NextAuth.js 身份驗證
 * - UsageTracker 服務整合
 * - 即時使用量計算
 */

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