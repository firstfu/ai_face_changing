'use client';

import { useState } from 'react';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">選擇換臉品質</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedQuality === 'high'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedQuality('high')}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">高品質模式</h3>
                  <p className="text-sm text-muted-foreground">
                    {REPLICATE_MODELS['easel/advanced-face-swap'].description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${REPLICATE_MODELS['easel/advanced-face-swap'].price}/次 • 
                    {REPLICATE_MODELS['easel/advanced-face-swap'].processingTime}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedQuality === 'standard'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedQuality('standard')}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">經濟模式</h3>
                  <p className="text-sm text-muted-foreground">
                    {REPLICATE_MODELS['codeplugtech/face-swap'].description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${REPLICATE_MODELS['codeplugtech/face-swap'].price}/次 • 
                    {REPLICATE_MODELS['codeplugtech/face-swap'].processingTime}
                  </p>
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
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>處理進度</Label>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              正在使用 {selectedModel.name} 進行換臉處理...
              <br />
              預計需要 {selectedModel.processingTime}
            </p>
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
          className="flex-1"
          size="lg"
        >
          {isLoading ? '處理中...' : '開始換臉'}
        </Button>
        
        {(sourceImage || targetImage || currentSwap) && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
          >
            重置
          </Button>
        )}
      </div>
    </div>
  );
}