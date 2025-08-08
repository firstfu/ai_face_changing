'use client';

import { useState } from 'react';
import { Sparkles, Zap, ArrowRight, Star, TrendingUp, Award, Badge as BadgeIcon } from 'lucide-react';
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
      <Card className="p-8 bg-gradient-to-br from-white to-purple-50/30 border-purple-200/50">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">選擇您的換臉方案</h3>
            <p className="text-muted-foreground mt-2">兩種強大模式，滿足不同需求</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`relative rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                selectedQuality === 'high'
                  ? 'ring-4 ring-purple-500 ring-offset-2 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedQuality('high')}
            >
              <div className={`p-6 rounded-xl border-2 ${
                selectedQuality === 'high'
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-purple-200 bg-white hover:border-purple-400'
              }`}>
                {/* 推薦標籤 */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    最受歡迎
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
                      <Sparkles className="h-6 w-6 text-white animate-pulse" />
                    </div>
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                      Premium
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">專業級品質</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      影視等級輸出，完美細節還原
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span>4K 超高清輸出</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span>99.8% 真實度</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span>30 秒極速處理</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        ${REPLICATE_MODELS['easel/advanced-face-swap'].price}
                      </span>
                      <span className="text-sm text-muted-foreground">每次</span>
                    </div>
                    {selectedQuality === 'high' && (
                      <div className="text-xs text-green-600 font-medium animate-pulse">
                        ✓ 已選擇此方案
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                selectedQuality === 'standard'
                  ? 'ring-4 ring-blue-500 ring-offset-2 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedQuality('standard')}
            >
              <div className={`p-6 rounded-xl border-2 ${
                selectedQuality === 'standard'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50'
                  : 'border-blue-200 bg-white hover:border-blue-400'
              }`}>
                {/* 優惠標籤 */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    超值優惠
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 shadow-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      Standard
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">快速經濟</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      高性價比，日常使用首選
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span>高清品質輸出</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span>95% 滿意度</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>39 秒快速完成</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-400 line-through">
                          $0.01
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${REPLICATE_MODELS['codeplugtech/face-swap'].price}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">每次</span>
                    </div>
                    <div className="text-xs text-red-600 font-medium">
                      節省 60% 費用！
                    </div>
                    {selectedQuality === 'standard' && (
                      <div className="text-xs text-green-600 font-medium animate-pulse">
                        ✓ 已選擇此方案
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
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                <Sparkles className="h-8 w-8 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-bold mb-2">正在施展 AI 魔法 ✨</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">處理進度</span>
                <span className="text-sm font-bold text-purple-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-purple-100" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                使用 <span className="font-medium text-purple-600">{selectedModel.name}</span> 處理中
              </p>
              <p className="text-xs text-muted-foreground">
                預計還需 {selectedModel.processingTime}
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
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
          className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          size="lg"
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-spin" />
              正在施展魔法...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              立即開始換臉
            </>
          )}
        </Button>
        
        {(sourceImage || targetImage || currentSwap) && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="h-14 px-8 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
          >
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            重新開始
          </Button>
        )}
      </div>
    </div>
  );
}