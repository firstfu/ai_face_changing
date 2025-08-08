import { ModelConfig } from '@/types';

export const REPLICATE_MODELS: Record<string, ModelConfig> = {
  'easel/advanced-face-swap': {
    name: 'Premium 專業版',
    price: 0.04,
    description: '🌟 影視級 4K 超高清輸出，完美細節還原',
    processingTime: '30秒',
    quality: 'high',
    type: 'image',
  },
  'codeplugtech/face-swap': {
    name: 'Standard 標準版',
    price: 0.0039,
    description: '⚡ 高性價比，日常使用的最佳選擇',
    processingTime: '39秒',
    quality: 'standard',
    type: 'image',
  },
  'arabyai-replicate/roop_face_swap': {
    name: 'Video Pro 影片版',
    price: 0.10,
    description: '🎬 專業影片換臉，支援高幀率流暢處理',
    processingTime: '73秒',
    quality: 'high',
    type: 'video',
  },
} as const;

export const DEFAULT_IMAGE_MODEL = 'easel/advanced-face-swap';
export const ECONOMY_IMAGE_MODEL = 'codeplugtech/face-swap';
export const DEFAULT_VIDEO_MODEL = 'arabyai-replicate/roop_face_swap';