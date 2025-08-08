import Replicate from 'replicate';
import { ReplicatePredict } from '@/types';

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export class ReplicateService {
  static async createFaceSwap(
    model: string,
    sourceImageUrl: string,
    targetImageUrl: string
  ): Promise<ReplicatePredict> {
    try {
      const prediction = await replicate.predictions.create({
        version: await this.getModelVersion(model),
        input: {
          source_image: sourceImageUrl,
          target_image: targetImageUrl,
        },
      });

      return {
        id: prediction.id,
        status: prediction.status as ReplicatePredict['status'],
        input: {
          source_image: sourceImageUrl,
          target_image: targetImageUrl,
        },
        output: prediction.output as string,
        error: prediction.error as string,
        created_at: prediction.created_at,
        completed_at: prediction.completed_at,
      };
    } catch (error) {
      throw new Error(`Failed to create face swap: ${error}`);
    }
  }

  static async getPredicationStatus(id: string): Promise<ReplicatePredict> {
    try {
      const prediction = await replicate.predictions.get(id);
      
      return {
        id: prediction.id,
        status: prediction.status as ReplicatePredict['status'],
        input: prediction.input as { source_image: string; target_image: string },
        output: prediction.output as string,
        error: prediction.error as string,
        created_at: prediction.created_at,
        completed_at: prediction.completed_at,
      };
    } catch (error) {
      throw new Error(`Failed to get prediction status: ${error}`);
    }
  }

  static async cancelPredicition(id: string): Promise<void> {
    try {
      await replicate.predictions.cancel(id);
    } catch (error) {
      throw new Error(`Failed to cancel prediction: ${error}`);
    }
  }

  private static async getModelVersion(modelName: string): Promise<string> {
    // 實際實作中需要從 Replicate 獲取最新版本
    const modelVersions: Record<string, string> = {
      'easel/advanced-face-swap': 'latest', // 需要替換為實際版本號
      'codeplugtech/face-swap': 'latest',
      'arabyai-replicate/roop_face_swap': 'latest',
    };

    return modelVersions[modelName] || 'latest';
  }
}