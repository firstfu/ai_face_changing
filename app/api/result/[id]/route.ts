/**
 * 預測結果獲取 API 路由 (Prediction Result API Route)
 * 
 * 獲取已完成的換臉任務結果：
 * - 驗證用戶身份與權限
 * - 接收預測任務 ID 作為路由參數
 * - 確認任務狀態為 'succeeded' 才提供結果
 * - 返回處理完成的圖片 URL 與詳細資訊
 * - 包含任務執行時間與完成狀態
 * 
 * API 端點：GET /api/result/[id]
 * 
 * 回傳資料結構：
 * - id: 任務識別碼
 * - status: 任務狀態
 * - resultImageUrl: 結果圖片 URL
 * - created_at: 任務創建時間
 * - completed_at: 任務完成時間
 * 
 * 使用技術：
 * - Next.js 15 動態路由
 * - NextAuth.js 身份驗證
 * - Replicate API 結果獲取
 * - 狀態驗證邏輯
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
    
    if (prediction.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Prediction not completed or failed', status: prediction.status },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      result: {
        id: prediction.id,
        status: prediction.status,
        resultImageUrl: prediction.output,
        created_at: prediction.created_at,
        completed_at: prediction.completed_at,
      },
    });

  } catch (error) {
    console.error('Result fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to get prediction result' },
      { status: 500 }
    );
  }
}