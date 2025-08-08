/**
 * 預測狀態查詢 API 路由 (Prediction Status API Route)
 * 
 * 查詢 Replicate AI 模型預測任務的進度：
 * - 驗證用戶身份與權限
 * - 接收預測任務 ID 作為路由參數
 * - 向 Replicate API 查詢任務狀態
 * - 返回任務的詳細資訊包括：
 *   - 任務狀態 (pending/processing/succeeded/failed)
 *   - 輸出結果 (如果已完成)
 *   - 錯誤資訊 (如果失敗)
 *   - 創建與完成時間
 * 
 * API 端點：GET /api/status/[id]
 * 
 * 使用技術：
 * - Next.js 15 動態路由
 * - NextAuth.js 身份驗證
 * - Replicate API 狀態查詢
 * - 非同步參數處理
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { ReplicateService } from '@/lib/replicate';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 檢查用戶身份驗證
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: '請先登入' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Prediction ID is required' },
        { status: 400 }
      );
    }

    const prediction = await ReplicateService.getPredicationStatus(id);

    return NextResponse.json({
      success: true,
      prediction: {
        id: prediction.id,
        status: prediction.status,
        output: prediction.output,
        error: prediction.error,
        created_at: prediction.created_at,
        completed_at: prediction.completed_at,
      },
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to get prediction status' },
      { status: 500 }
    );
  }
}