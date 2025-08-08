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