import { Video, Zap, Shield, Award, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌資訊 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-600">
                <Video className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">
                ContentSwap Pro
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              專業內容創作者的AI換臉工具，提升創作效率，節省制作時間
            </p>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <Shield className="h-3 w-3 mr-1" />
                企業級安全
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                <Award className="h-3 w-3 mr-1" />
                專業品質
              </Badge>
            </div>
          </div>

          {/* 產品功能 */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" />
              產品功能
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                高速批量處理
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                API 整合服務
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                專案管理工具
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                4K 專業輸出
              </li>
            </ul>
          </div>

          {/* 企業服務 */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              企業服務
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                API 文檔
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                技術支援
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                客製化解決方案
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                商業授權
              </li>
            </ul>
          </div>

          {/* 聯絡我們 */}
          <div className="space-y-3">
            <h4 className="font-semibold">聯絡我們</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@contentswap.pro
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                企業專線：+886-2-8888-0000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                台北市信義區
              </li>
            </ul>
            <div className="pt-2">
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                工作日專業支援
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 ContentSwap Pro</span>
              <Separator orientation="vertical" className="h-4" />
              <span>保留所有權利</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">服務條款</a>
              <a href="#" className="hover:text-blue-600 transition-colors">隱私政策</a>
              <a href="#" className="hover:text-blue-600 transition-colors">API 條款</a>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Video className="h-3 w-3 mr-1" />
                信賴於 1,000+ 創作者
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}