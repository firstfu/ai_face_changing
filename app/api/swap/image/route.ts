import { NextRequest, NextResponse } from 'next/server';
import { ReplicateService } from '@/lib/replicate';
import { DEFAULT_IMAGE_MODEL, ECONOMY_IMAGE_MODEL } from '@/config/replicate';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const sourceImage = formData.get('sourceImage') as File;
    const targetImage = formData.get('targetImage') as File;
    const quality = formData.get('quality') as string || 'high';
    
    if (!sourceImage || !targetImage) {
      return NextResponse.json(
        { error: 'Source and target images are required' },
        { status: 400 }
      );
    }

    // 選擇模型
    const model = quality === 'high' ? DEFAULT_IMAGE_MODEL : ECONOMY_IMAGE_MODEL;

    // 將圖片轉換為 base64 或上傳到臨時存儲
    // 這裡需要實作圖片上傳邏輯
    const sourceImageUrl = await uploadImageTemporary(sourceImage);
    const targetImageUrl = await uploadImageTemporary(targetImage);

    // 建立 Replicate 預測
    const prediction = await ReplicateService.createFaceSwap(
      model,
      sourceImageUrl,
      targetImageUrl
    );

    return NextResponse.json({
      success: true,
      predictionId: prediction.id,
      status: prediction.status,
      model,
      estimatedTime: getEstimatedTime(model),
    });

  } catch (error) {
    console.error('Face swap error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 臨時圖片上傳函數 (需要整合 UploadThing 或其他服務)
async function uploadImageTemporary(file: File): Promise<string> {
  // TODO: 實作圖片上傳邏輯
  // 可以使用 UploadThing, Cloudinary, 或其他服務
  // 或者將圖片轉換為 base64
  
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

function getEstimatedTime(model: string): string {
  const times: Record<string, string> = {
    'easel/advanced-face-swap': '約 30 秒',
    'codeplugtech/face-swap': '約 39 秒',
    'arabyai-replicate/roop_face_swap': '約 73 秒',
  };
  
  return times[model] || '約 30 秒';
}