/**
 * 換臉表單主組件 (Face Swap Form Component)
 * 
 * 這是換臉功能的核心界面組件，提供完整的用戶操作流程：
 * - 品質選擇：專業級/標準品質雙選項，含詳細特性說明
 * - 圖片上傳：整合 ImageUpload 組件，支援來源與目標圖片
 * - 進度顯示：即時處理進度條與狀態回饋
 * - 錯誤處理：友善的錯誤訊息與重試機制
 * - 響應式設計：適配桌面與行動裝置
 * 
 * 功能特色：
 * - 視覺化品質比較卡片 (推薦 vs 經濟方案)
 * - Zustand 狀態管理整合
 * - 動畫與互動效果 (hover, scale, ring effects)
 * - 處理中的動態 UI 回饋
 * - 智能表單驗證 (需同時上傳兩張圖片)
 * 
 * 使用技術：
 * - React 19 Client Component
 * - Zustand 全域狀態管理
 * - Lucide React 圖標系統
 * - Tailwind CSS 動畫與漸層
 * - shadcn/ui 組件系統
 */

'use client';

import { useState } from 'react';
import { Settings, Zap, ArrowRight, Star, TrendingUp, Award, Badge as BadgeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from './image-upload';
import { useFaceSwapStore } from '@/stores/face-swap-store';
import { REPLICATE_MODELS } from '@/config/replicate';

export function FaceSwapForm() {
  const [selectedQuality, setSelectedQuality] = useState<'high' | 'standard'>('high');
  
  const {
    sourceImage,
    targetImage,
    sourceImagePreview,
    targetImagePreview,
    isLoading,
    progress,
    error,
    currentSwap,
    setSourceImage,
    setTargetImage,
    startSwap,
    clearCurrentSwap,
  } = useFaceSwapStore();

  const canStartSwap = sourceImage && targetImage && !isLoading;
  const selectedModel = selectedQuality === 'high' 
    ? REPLICATE_MODELS['easel/advanced-face-swap']
    : REPLICATE_MODELS['codeplugtech/face-swap'];

  const handleSwap = async () => {
    await startSwap({
      model: selectedQuality === 'high' 
        ? 'easel/advanced-face-swap' 
        : 'codeplugtech/face-swap',
      quality: selectedQuality,
    });
  };

  const handleReset = () => {
    setSourceImage(null);
    setTargetImage(null);
    clearCurrentSwap();
  };

  return (
    <div className="space-y-8">
      {/* 品質選擇 */}
      <Card className="p-8 bg-white border-slate-200">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800">選擇處理品質</h3>
            <p className="text-muted-foreground mt-2">不同品質等級適合不同的使用場景</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`relative rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                selectedQuality === 'high'
                  ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedQuality('high')}
            >
              <div className={`p-6 rounded-xl border-2 ${
                selectedQuality === 'high'
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}>
                {/* 推薦標籤 */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-blue-600 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    推薦方案
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-full bg-blue-600 shadow-lg">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      Premium
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">專業級品質</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      適合商業使用，4K高清輸出
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span>4K 專業輸出</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span>99.7% 精確度</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>30 秒處理</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    {selectedQuality === 'high' && (
                      <div className="text-xs text-green-600 font-medium text-center">
                        ✓ 已選擇此品質
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                selectedQuality === 'standard'
                  ? 'ring-2 ring-orange-500 ring-offset-2 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedQuality('standard')}
            >
              <div className={`p-6 rounded-xl border-2 ${
                selectedQuality === 'standard'
                  ? 'border-orange-500 bg-orange-50/50'
                  : 'border-slate-200 bg-white hover:border-orange-300'
              }`}>
                {/* 優惠標籤 */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-orange-600 text-white border-0">
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    經濟實惠
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-full bg-orange-600 shadow-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      Standard
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">標準品質</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      適合測試和一般用途
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-orange-600" />
                      <span>高清品質輸出</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span>95% 精確度</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <span>39 秒處理</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    {selectedQuality === 'standard' && (
                      <div className="text-xs text-green-600 font-medium text-center">
                        ✓ 已選擇此品質
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 圖片上傳 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageUpload
            label="來源圖片（要被替換的臉）"
            onImageChange={setSourceImage}
            preview={sourceImagePreview}
          />
        </div>
        
        <div className="flex items-center justify-center md:my-8">
          <div className="p-3 rounded-full bg-primary/10">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div>
          <ImageUpload
            label="目標圖片（新的臉部來源）"
            onImageChange={setTargetImage}
            preview={targetImagePreview}
          />
        </div>
      </div>

      {/* 處理狀態 */}
      {isLoading && (
        <Card className="p-8 bg-blue-50/50 border-blue-200">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
                <Settings className="h-8 w-8 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-bold mb-2">正在處理您的內容</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">處理進度</span>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-blue-100" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                使用 <span className="font-medium text-blue-600">{selectedModel.name}</span> 處理中
              </p>
              <p className="text-xs text-muted-foreground">
                預計還需 {selectedModel.processingTime}
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
            </div>
          </div>
        </Card>
      )}

      {/* 錯誤訊息 */}
      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      {/* 操作按鈕 */}
      <div className="flex gap-4">
        <Button
          onClick={handleSwap}
          disabled={!canStartSwap}
          className="flex-1 h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          {isLoading ? (
            <>
              <Settings className="mr-2 h-5 w-5 animate-spin" />
              正在處理中...
            </>
          ) : (
            <>
              <Settings className="mr-2 h-5 w-5" />
              開始處理
            </>
          )}
        </Button>
        
        {(sourceImage || targetImage || currentSwap) && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="h-14 px-8 hover:bg-slate-50"
          >
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            重新開始
          </Button>
        )}
      </div>
    </div>
  );
}