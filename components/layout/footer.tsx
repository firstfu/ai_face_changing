import { Sparkles, Star, Shield, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌資訊 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FaceMagic Pro
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              領先全球的 AI 換臉平台，為您創造無限可能
            </p>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <Shield className="h-3 w-3 mr-1" />
                安全認證
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                <Award className="h-3 w-3 mr-1" />
                專業品質
              </Badge>
            </div>
          </div>

          {/* 熱門功能 */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              熱門功能
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                🎯 一鍵換臉
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                🎬 影片處理
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                ⚡ 批量操作
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                💎 4K 輸出
              </li>
            </ul>
          </div>

          {/* 用戶支援 */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              用戶支援
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                📖 使用教學
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                ❓ 常見問題
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                💬 線上客服
              </li>
              <li className="hover:text-purple-600 cursor-pointer transition-colors">
                🔒 隱私保護
              </li>
            </ul>
          </div>

          {/* 聯絡我們 */}
          <div className="space-y-3">
            <h4 className="font-semibold">聯絡我們</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@facemagic.pro
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                0800-123-456
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                台北市信義區
              </li>
            </ul>
            <div className="pt-2">
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300">
                24/7 全天候服務
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 FaceMagic Pro</span>
              <Separator orientation="vertical" className="h-4" />
              <span>保留所有權利</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-purple-600 transition-colors">服務條款</a>
              <a href="#" className="hover:text-purple-600 transition-colors">隱私政策</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Cookie 設定</a>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                已服務 50,000+ 用戶
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}