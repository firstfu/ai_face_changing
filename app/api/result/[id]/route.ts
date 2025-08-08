import { NextRequest, NextResponse } from 'next/server';
import { ReplicateService } from '@/lib/replicate';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
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