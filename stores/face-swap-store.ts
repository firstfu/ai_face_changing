import { create } from 'zustand';
import { SwapResult, SwapRequest } from '@/types';

interface FaceSwapStore {
  // 狀態
  currentSwap: SwapResult | null;
  swapHistory: SwapResult[];
  isLoading: boolean;
  progress: number;
  error: string | null;

  // 圖片相關
  sourceImage: File | null;
  targetImage: File | null;
  sourceImagePreview: string | null;
  targetImagePreview: string | null;

  // Actions
  setSourceImage: (file: File | null) => void;
  setTargetImage: (file: File | null) => void;
  startSwap: (request: Omit<SwapRequest, 'sourceImage' | 'targetImage'>) => Promise<void>;
  checkSwapStatus: (id: string) => Promise<void>;
  clearCurrentSwap: () => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
}

export const useFaceSwapStore = create<FaceSwapStore>((set, get) => ({
  // 初始狀態
  currentSwap: null,
  swapHistory: [],
  isLoading: false,
  progress: 0,
  error: null,
  sourceImage: null,
  targetImage: null,
  sourceImagePreview: null,
  targetImagePreview: null,

  // Actions
  setSourceImage: (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    set({ 
      sourceImage: file, 
      sourceImagePreview: preview,
      error: null 
    });
  },

  setTargetImage: (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    set({ 
      targetImage: file, 
      targetImagePreview: preview,
      error: null 
    });
  },

  startSwap: async (options) => {
    const { sourceImage, targetImage } = get();
    
    if (!sourceImage || !targetImage) {
      set({ error: '請選擇來源圖片和目標圖片' });
      return;
    }

    set({ isLoading: true, error: null, progress: 10 });

    try {
      const formData = new FormData();
      formData.append('sourceImage', sourceImage);
      formData.append('targetImage', targetImage);
      formData.append('quality', options.quality);

      const response = await fetch('/api/swap/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('換臉請求失敗');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '換臉失敗');
      }

      // 建立新的換臉記錄
      const newSwap: SwapResult = {
        id: data.predictionId,
        status: 'processing',
        sourceImageUrl: get().sourceImagePreview!,
        targetImageUrl: get().targetImagePreview!,
        model: data.model,
        quality: options.quality,
        createdAt: new Date().toISOString(),
      };

      set({ 
        currentSwap: newSwap,
        progress: 30 
      });

      // 開始輪詢狀態
      get().checkSwapStatus(data.predictionId);

    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '發生未知錯誤',
        isLoading: false,
        progress: 0 
      });
    }
  },

  checkSwapStatus: async (id) => {
    const maxAttempts = 60; // 最多檢查 60 次 (約 5 分鐘)
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`/api/status/${id}`);
        
        if (!response.ok) {
          throw new Error('無法獲取處理狀態');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || '狀態檢查失敗');
        }

        const { prediction } = data;
        const currentSwap = get().currentSwap;

        if (!currentSwap) return;

        // 更新進度
        const progressMap = {
          starting: 40,
          processing: 70,
          succeeded: 100,
          failed: 0,
          canceled: 0,
        };

        set({ 
          progress: progressMap[prediction.status as keyof typeof progressMap] || 50 
        });

        if (prediction.status === 'succeeded') {
          const completedSwap: SwapResult = {
            ...currentSwap,
            status: 'completed',
            resultImageUrl: prediction.output,
            completedAt: prediction.completed_at,
          };

          set(state => ({
            currentSwap: completedSwap,
            swapHistory: [completedSwap, ...state.swapHistory],
            isLoading: false,
            progress: 100,
          }));

        } else if (prediction.status === 'failed') {
          const failedSwap: SwapResult = {
            ...currentSwap,
            status: 'failed',
            error: prediction.error || '處理失敗',
            completedAt: prediction.completed_at,
          };

          set(state => ({
            currentSwap: failedSwap,
            swapHistory: [failedSwap, ...state.swapHistory],
            isLoading: false,
            progress: 0,
            error: prediction.error || '處理失敗',
          }));

        } else if (prediction.status === 'processing' || prediction.status === 'starting') {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 5000); // 每 5 秒檢查一次
          } else {
            throw new Error('處理超時，請稍後再試');
          }
        }

      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : '狀態檢查失敗',
          isLoading: false,
          progress: 0 
        });
      }
    };

    // 開始輪詢
    setTimeout(poll, 2000); // 2 秒後開始第一次檢查
  },

  clearCurrentSwap: () => {
    set({
      currentSwap: null,
      isLoading: false,
      progress: 0,
      error: null,
    });
  },

  setError: (error) => {
    set({ error, isLoading: false });
  },

  setProgress: (progress) => {
    set({ progress });
  },
}));