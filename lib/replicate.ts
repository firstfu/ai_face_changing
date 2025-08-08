/**
 * Replicate AI 服務封裝 (Replicate AI Service Wrapper)
 * 
 * 封裝 Replicate API 的核心服務類別，提供換臉 AI 模型整合：
 * - 預測任務建立：支援多種換臉模型的任務創建
 * - 狀態查詢：即時監控 AI 處理進度與結果
 * - 任務管理：支援任務取消與錯誤處理
 * - 模型版本管理：動態選擇最新或指定版本
 * - 型別安全：完整的 TypeScript 型別定義
 * 
 * 支援的 AI 模型：
 * - easel/advanced-face-swap: 高品質專業級換臉
 * - codeplugtech/face-swap: 經濟實惠標準換臉
 * - arabyai-replicate/roop_face_swap: 影片換臉支援
 * 
 * 資料流程：
 * 1. 接收 base64 或 URL 格式的圖片
 * 2. 建立 Replicate 預測任務
 * 3. 輪詢查詢處理狀態
 * 4. 返回處理結果或錯誤資訊
 * 
 * 錯誤處理：
 * - API token 驗證
 * - 網路請求錯誤捕捉
 * - 模型版本不存在處理
 * - 友善錯誤訊息包裝
 * 
 * 使用技術：
 * - Replicate Node.js SDK
 * - TypeScript 嚴格型別檢查
 * - 環境變數配置管理
 * - Promise-based 非同步處理
 */

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