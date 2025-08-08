import { Video, Image, Zap, Users, Shield, Clock, Trophy, TrendingUp, Award, Star, CheckCircle, ArrowRight, Play, BarChart3 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-slate-50 opacity-70" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    <Trophy className="h-4 w-4" />
                    <span>創作者首選工具</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    <span>節省 80% 制作時間</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                    <BarChart3 className="h-4 w-4" />
                    <span>企業級API</span>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-foreground mb-2">專業內容創作</span>
                  <span className="text-blue-600">
                    AI換臉解決方案
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  <span className="font-semibold text-foreground">批量處理</span> · 
                  <span className="font-semibold text-foreground"> API整合</span> · 
                  <span className="font-semibold text-foreground"> 企業級安全</span>
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 border-2 border-white" />
                    ))}
                  </div>
                  <span>信賴於 <span className="font-bold text-foreground">1,000+</span> 專業創作者</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#workflow">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    開始專業創作
                  </Button>
                </a>
                <a href="#showcase">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2 hover:bg-blue-50 transition-all"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    查看案例展示
                  </Button>
                </a>
              </div>
              
              {/* Social proof */}
              <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="text-sm font-medium ml-1">4.8/5 專業評分</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ISO 27001 認證</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>API 99.9% 穩定性</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 border-blue-200">
                專業創作者工具
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800">
                提升創作效率的AI解決方案
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                專為內容創作者設計，從個人工作室到大型企業都信賴的專業工具
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-blue-100 w-fit">
                    <Zap className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">批量高速處理</h3>
                  <p className="text-muted-foreground">
                    一次處理數百張圖片，大幅提升工作效率
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">節省 80% 時間</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-orange-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-orange-100 w-fit">
                    <BarChart3 className="h-6 w-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">API 企業整合</h3>
                  <p className="text-muted-foreground">
                    RESTful API 輕鬆整合至您的工作流程
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-orange-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">99.9% 可用性</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-green-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-green-100 w-fit">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">團隊協作管理</h3>
                  <p className="text-muted-foreground">
                    專案管理、權限控制、使用統計一應俱全
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">多人協作</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-slate-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-slate-100 w-fit">
                    <Shield className="h-6 w-6 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">企業級安全保護</h3>
                  <p className="text-muted-foreground">
                    SOC2 認證，符合GDPR規範的資料保護
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">ISO 27001 認證</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-purple-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-purple-100 w-fit">
                    <Image className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">專業品質輸出</h3>
                  <p className="text-muted-foreground">
                    4K高清輸出，滿足商業使用需求
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-purple-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">99.7% 精確度</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-indigo-100 rounded-full opacity-20 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="p-3 rounded-lg bg-indigo-100 w-fit">
                    <Trophy className="h-6 w-6 text-indigo-700" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">靈活訂閱方案</h3>
                  <p className="text-muted-foreground">
                    從個人創作者到企業團隊的完整解決方案
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">彈性計費</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-orange-100 text-orange-700 border-orange-200">
                <Play className="h-3 w-3 mr-1" />
                成功案例展示
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
                專業創作者的實際應用案例
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                看看不同行業的專業創作者如何使用 ContentSwap Pro 提升工作效率
              </p>
            </div>

            {/* Industry Cases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              
              {/* YouTuber Case */}
              <Card className="p-8 bg-gradient-to-br from-red-50 to-pink-50 border-red-100 hover:shadow-xl transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-red-100">
                      <Video className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">YouTube 內容創作</h3>
                      <p className="text-sm text-red-600">縮圖製作 · 影片封面</p>
                    </div>
                  </div>
                  
                  {/* Before/After Comparison */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">原始素材</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">專業效果</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs">
                          After
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">客戶：</strong>科技頻道 YouTuber</p>
                    <p><strong className="text-foreground">需求：</strong>多樣化縮圖人物，提升點擊率</p>
                    <p><strong className="text-foreground">效果：</strong>點擊率提升 45%，節省拍攝成本 80%</p>
                  </div>
                </div>
              </Card>

              {/* E-commerce Case */}
              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 hover:shadow-xl transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">電商產品攝影</h3>
                      <p className="text-sm text-green-600">服裝展示 · 模特兒替換</p>
                    </div>
                  </div>
                  
                  {/* Before/After Comparison */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">原始模特兒</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="aspect-[3/4] bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">本土化模特兒</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs">
                          After
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">客戶：</strong>服裝品牌電商</p>
                    <p><strong className="text-foreground">需求：</strong>本土化產品展示，降低拍攝成本</p>
                    <p><strong className="text-foreground">效果：</strong>轉換率提升 30%，拍攝成本降低 70%</p>
                  </div>
                </div>
              </Card>

              {/* Agency Case */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 hover:shadow-xl transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">廣告代理商</h3>
                      <p className="text-sm text-blue-600">創意多元化 · A/B 測試</p>
                    </div>
                  </div>
                  
                  {/* Before/After Comparison */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">單一代言人</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">多元代言人</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs">
                          After
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">客戶：</strong>數位行銷代理商</p>
                    <p><strong className="text-foreground">需求：</strong>快速產出多版本廣告創意</p>
                    <p><strong className="text-foreground">效果：</strong>創意產出速度提升 3 倍，客戶滿意度提升</p>
                  </div>
                </div>
              </Card>

              {/* Enterprise Case */}
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100 hover:shadow-xl transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">企業行銷</h3>
                      <p className="text-sm text-purple-600">品牌全球化 · 多市場適配</p>
                    </div>
                  </div>
                  
                  {/* Before/After Comparison */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">原版廣告</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-indigo-300 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">多市場版本</span>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs">
                          After
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">客戶：</strong>跨國企業品牌</p>
                    <p><strong className="text-foreground">需求：</strong>品牌廣告多市場本土化</p>
                    <p><strong className="text-foreground">效果：</strong>本土化速度提升 5 倍，成本降低 60%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* ROI Statistics */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">平均投資回報率 (ROI)</h3>
                <p className="text-muted-foreground">基於 1,000+ 專業創作者的實際使用數據</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
                  <div className="text-sm text-muted-foreground">平均ROI提升</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                  <div className="text-sm text-muted-foreground">製作成本節省</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">5x</div>
                  <div className="text-sm text-muted-foreground">內容產出速度</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">客戶滿意度</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Testimonials Section */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 border-blue-200">
                <Trophy className="h-3 w-3 mr-1" />
                專業創作者首選
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
                信賴於全球 1,000+ 專業創作者
              </h2>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1K+</div>
                  <div className="text-sm text-muted-foreground">專業創作者</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2M+</div>
                  <div className="text-sm text-muted-foreground">API 調用次數</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                  <div className="text-sm text-muted-foreground">時間節省</div>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">服務可用性</div>
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
                    &quot;ContentSwap Pro的API整合非常順暢，讓我們的影片製作效率提升了80%，客戶滿意度大幅提高。&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-orange-400" />
                    <div>
                      <div className="font-semibold">Alex Chen</div>
                      <div className="text-sm text-muted-foreground">創意總監 | 數位行銷公司</div>
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
                    &quot;批量處理功能太棒了！我可以一次處理100張產品照片，大大節省了拍攝成本和時間。&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400" />
                    <div>
                      <div className="font-semibold">Sarah Wang</div>
                      <div className="text-sm text-muted-foreground">電商攝影師</div>
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
                    &quot;企業級的安全性和穩定性讓我們很放心。團隊協作功能也很實用，專案管理變得更有序。&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                    <div>
                      <div className="font-semibold">Mike Zhang</div>
                      <div className="text-sm text-muted-foreground">影片製作公司創辦人</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">SOC2 Type II 認證</span>
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
                <span className="text-sm font-medium">4.8/5 專業評分</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main App Section */}
        <section id="workflow" className="py-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 border-blue-200">
                  <Video className="h-3 w-3 mr-1 inline" />
                  專業工具試用
                </Badge>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
                  立即開始專業創作
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  簡化工作流程：上傳 → 處理 → 批量下載，提升您的創作效率
                </p>
                <div className="flex justify-center gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>免費試用 3 次</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>無需綁定付款</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>企業級安全</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    需要更多處理次數？ 
                    <a href="#pricing" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                      查看訂閱方案 →
                    </a>
                  </p>
                </div>
              </div>

              {/* 換臉表單 */}
              <FaceSwapForm />
              
              {/* 結果展示 */}
              <ResultDisplay />
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 border-blue-200">
                <Trophy className="h-3 w-3 mr-1" />
                訂閱方案
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
                選擇適合您的專業方案
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-6">
                從個人創作者到企業團隊，我們提供彈性的訂閱選項
              </p>
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
                <p className="text-blue-700 text-sm">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  所有處理均包含在訂閱方案中，無需額外按次付費
                </p>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* 免費版 */}
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">免費試用</h3>
                    <div className="text-3xl font-bold text-slate-800 mb-1">$0</div>
                    <p className="text-sm text-muted-foreground">每月 3 次處理</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>標準品質輸出</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>基本技術支援</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">開始免費試用</Button>
                </div>
              </Card>

              {/* 專業版 */}
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow relative ring-2 ring-blue-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    最受歡迎
                  </Badge>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">專業版</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">$49</div>
                    <p className="text-sm text-muted-foreground">每月 200 次處理</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>4K 高品質輸出</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>批量處理功能</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>優先技術支援</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>專案管理工具</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">立即升級</Button>
                </div>
              </Card>

              {/* 企業版 */}
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">企業版</h3>
                    <div className="text-3xl font-bold text-slate-800 mb-1">$199</div>
                    <p className="text-sm text-muted-foreground">無限制處理</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>所有專業版功能</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>API 存取權限</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>團隊協作功能</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>專屬客戶經理</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">聯繫業務</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
