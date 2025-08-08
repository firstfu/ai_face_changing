import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { ReplicateService } from '@/lib/replicate';
import { DEFAULT_IMAGE_MODEL, ECONOMY_IMAGE_MODEL } from '@/config/replicate';
import { usageTracker } from '@/lib/usage-tracker';

export async function POST(request: NextRequest) {
  try {
    // 檢查用戶身份驗證
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: '請先登入才能使用此服務' },
        { status: 401 }
      );
    }

    // 檢查使用量限制
    const usageCheck = await usageTracker.checkUsageLimit(session.user.id);
    
    if (!usageCheck.canUse) {
      if (usageCheck.currentUsage >= usageCheck.limit) {
        return NextResponse.json(
          { 
            error: '已達到本月使用上限',
            details: {
              currentUsage: usageCheck.currentUsage,
              limit: usageCheck.limit,
              plan: usageCheck.plan
            }
          },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: '訂閱狀態異常，請檢查您的訂閱方案' },
        { status: 403 }
      );
    }

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

    // 記錄使用量
    await usageTracker.trackUsage(session.user.id, 'face_swap', 1);

    return NextResponse.json({
      success: true,
      predictionId: prediction.id,
      status: prediction.status,
      model,
      estimatedTime: getEstimatedTime(model),
      usage: {
        current: usageCheck.currentUsage + 1,
        limit: usageCheck.limit,
        remaining: usageCheck.limit - usageCheck.currentUsage - 1
      }
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