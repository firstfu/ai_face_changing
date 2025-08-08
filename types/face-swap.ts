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