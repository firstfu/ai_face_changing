'use client';

import { Video, TrendingUp, Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                ContentSwap Pro
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                專業內容創作工具
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">
              信賴於 <span className="font-bold">1,000+</span> 創作者
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              產品功能
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#workflow" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              工作流程
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              訂閱方案
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            >
              <Video className="h-4 w-4 mr-1" />
              開始創作
            </Button>
            
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
              <span className="sr-only">選單</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}