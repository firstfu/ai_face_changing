import { ModelConfig } from '@/types';

export const REPLICATE_MODELS: Record<string, ModelConfig> = {
  'easel/advanced-face-swap': {
    name: 'Advanced Face Swap (Commercial)',
    price: 0.04,
    description: '高品質商業級換臉，支援全身替換',
    processingTime: '~30秒',
    quality: 'high',
    type: 'image',
  },
  'codeplugtech/face-swap': {
    name: 'Basic Face Swap (Economy)',
    price: 0.0039,
    description: '經濟實惠的基礎換臉功能',
    processingTime: '~39秒',
    quality: 'standard',
    type: 'image',
  },
  'arabyai-replicate/roop_face_swap': {
    name: 'Video Face Swap',
    price: 0.10,
    description: '高品質影片換臉',
    processingTime: '~73秒',
    quality: 'high',
    type: 'video',
  },
} as const;

export const DEFAULT_IMAGE_MODEL = 'easel/advanced-face-swap';
export const ECONOMY_IMAGE_MODEL = 'codeplugtech/face-swap';
export const DEFAULT_VIDEO_MODEL = 'arabyai-replicate/roop_face_swap';