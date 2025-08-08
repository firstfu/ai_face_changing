/**
 * 換臉功能型別定義 (Face Swap Type Definitions)
 * 
 * 定義換臉應用程式的核心資料結構與型別：
 * - SwapRequest: 客戶端換臉請求的資料結構
 * - SwapResult: 應用程式內部使用的結果表示
 * - ReplicatePredict: Replicate API 的回應格式
 * - ModelConfig: AI 模型的詳細配置資訊
 * 
 * 型別安全特色：
 * - 嚴格的聯合型別約束
 * - 可選屬性的明確定義
 * - 跨 API 邊界的型別一致性
 * - 完整的錯誤狀態覆蓋
 * 
 * 支援的模型：
 * - easel/advanced-face-swap: 專業級高品質
 * - codeplugtech/face-swap: 標準品質經濟版
 * 
 * 狀態生命周期：
 * - pending → processing → completed/failed
 * - 支援錯誤訊息與完成時間記錄
 * - 完整的任務追蹤能力
 * 
 * 使用技術：
 * - TypeScript 嚴格型別系統
 * - 聯合型別與字面量型別
 * - 介面繼承與擴充
 * - 可選屬性的型別安全
 */

export interface SwapRequest {
  sourceImage: File;
  targetImage: File;
  model: 'easel/advanced-face-swap' | 'codeplugtech/face-swap';
  quality: 'high' | 'standard';
}

export interface SwapResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  sourceImageUrl: string;
  targetImageUrl: string;
  resultImageUrl?: string;
  model: string;
  quality: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

export interface ReplicatePredict {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  input: {
    source_image: string;
    target_image: string;
  };
  output?: string;
  error?: string;
  created_at: string;
  completed_at?: string;
}

export type ModelType = 'image' | 'video';

export interface ModelConfig {
  name: string;
  price: number;
  description: string;
  processingTime: string;
  quality: 'high' | 'standard';
  type: ModelType;
}