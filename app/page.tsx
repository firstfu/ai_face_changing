import { Sparkles, Image, Zap, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FaceSwapForm } from '@/components/face-swap/face-swap-form';
import { ResultDisplay } from '@/components/face-swap/result-display';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>最新 AI 換臉技術</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI 換臉應用
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  使用先進的人工智慧技術，快速且高品質地完成圖片換臉處理。
                  支援多種模型選擇，滿足不同需求和預算。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  立即開始換臉
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  查看範例
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">強大功能特色</h2>
              <p className="text-muted-foreground text-lg">
                專業級 AI 換臉技術，為您提供最佳的使用體驗
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-purple-100 w-fit">
                  <Image className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">高品質換臉</h3>
                <p className="text-muted-foreground">
                  使用最新的深度學習模型，確保換臉結果自然逼真
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-blue-100 w-fit">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">快速處理</h3>
                <p className="text-muted-foreground">
                  平均處理時間 30-75 秒，快速獲得換臉結果
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-green-100 w-fit">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">多人換臉</h3>
                <p className="text-muted-foreground">
                  支援單張圖片中多個人臉的同時換臉處理
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-yellow-100 w-fit">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">安全隱私</h3>
                <p className="text-muted-foreground">
                  所有處理過程加密進行，保護您的隱私安全
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-pink-100 w-fit">
                  <Clock className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold">即時預覽</h3>
                <p className="text-muted-foreground">
                  實時查看處理進度，隨時掌握換臉狀態
                </p>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-indigo-100 w-fit">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">多種模型</h3>
                <p className="text-muted-foreground">
                  提供高品質和經濟模式，滿足不同需求
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Main App Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">開始您的換臉之旅</h2>
                <p className="text-muted-foreground text-lg">
                  上傳圖片，選擇品質，一鍵完成專業級換臉處理
                </p>
              </div>

              {/* 換臉表單 */}
              <FaceSwapForm />
              
              {/* 結果展示 */}
              <ResultDisplay />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
