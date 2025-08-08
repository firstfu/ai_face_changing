import { Sparkles, Image, Zap, Users, Shield, Clock, Trophy, TrendingUp, Award, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 opacity-70" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                    <Trophy className="h-4 w-4" />
                    <span>熱門 #1 換臉工具</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    <span>98% 用戶滿意度</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    <span>限時優惠中</span>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-foreground mb-2">瞬間變身！</span>
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    專業級 AI 換臉魔法
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  <span className="font-semibold text-foreground">30 秒極速處理</span> · 
                  <span className="font-semibold text-foreground"> 影視級品質</span> · 
                  <span className="font-semibold text-foreground"> 100% 安全隱私</span>
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white" />
                    ))}
                  </div>
                  <span>已有 <span className="font-bold text-foreground">50,000+</span> 用戶正在使用</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  免費開始 - 無需註冊
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                >
                  <Award className="mr-2 h-5 w-5" />
                  查看成功案例
                </Button>
              </div>
              
              {/* Social proof */}
              <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="text-sm font-medium ml-1">4.9/5 評分</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>企業級安全認證</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>隱私保護承諾</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                為什麼選擇我們
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                顛覆性的換臉體驗
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                領先業界的 AI 技術，讓每一次換臉都成為藝術品
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 w-fit">
                    <Image className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">影視級品質輸出</h3>
                  <p className="text-muted-foreground">
                    4K 超高清晰度，細節完美還原
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-purple-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">99.8% 真實度</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 w-fit">
                    <Zap className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">閃電般處理速度</h3>
                  <p className="text-muted-foreground">
                    GPU 加速運算，秒速完成換臉
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">比競品快 3 倍</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 to-green-200 w-fit">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">智能多人識別</h3>
                  <p className="text-muted-foreground">
                    一次處理多張臉，批量換臉超簡單
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">最多支援 10 人</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200 w-fit">
                    <Shield className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">銀行級安全保護</h3>
                  <p className="text-muted-foreground">
                    256 位元加密，資料永不外洩
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-yellow-600">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">ISO 27001 認證</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-pink-100 to-pink-200 w-fit">
                    <Clock className="h-6 w-6 text-pink-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">即時進度追蹤</h3>
                  <p className="text-muted-foreground">
                    視覺化處理流程，全程透明可控
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-pink-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">零等待焦慮</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 w-fit">
                    <Sparkles className="h-6 w-6 text-indigo-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">彈性定價方案</h3>
                  <p className="text-muted-foreground">
                    從免費試用到企業方案，總有適合您的
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600">
                    <Trophy className="h-4 w-4" />
                    <span className="font-medium">最佳性價比</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust & Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                <Trophy className="h-3 w-3 mr-1" />
                用戶好評如潮
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                超過 50,000 位用戶的信賴選擇
              </h2>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">滿意用戶</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
                  <div className="text-sm text-muted-foreground">處理圖片</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                  <div className="text-sm text-muted-foreground">成功率</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">全天候服務</div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "效果超出預期！AI 技術真的很厲害，換臉效果非常自然，朋友們都以為是真的。"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                    <div>
                      <div className="font-semibold">小明</div>
                      <div className="text-sm text-muted-foreground">內容創作者</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "處理速度超快，品質也很好！用來製作有趣的短片，粉絲反應都很熱烈。"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                    <div>
                      <div className="font-semibold">小美</div>
                      <div className="text-sm text-muted-foreground">YouTuber</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "介面簡潔易用，即使是第一次使用也能快速上手。客服回應也很迅速！"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400" />
                    <div>
                      <div className="font-semibold">阿華</div>
                      <div className="text-sm text-muted-foreground">攝影師</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">SSL 安全加密</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">ISO 27001 認證</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">GDPR 合規</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">4.9/5 用戶評分</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main App Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border-red-200">
                  <Sparkles className="h-3 w-3 mr-1 inline" />
                  限時免費試用
                </Badge>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  立即體驗魔法時刻
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  簡單三步驟：上傳 → 處理 → 下載，讓 AI 為您創造驚喜
                </p>
                <div className="flex justify-center gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>無需信用卡</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>無需註冊</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>永久免費額度</span>
                  </div>
                </div>
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
