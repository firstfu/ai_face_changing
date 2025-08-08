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