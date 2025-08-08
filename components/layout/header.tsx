'use client';

import { Sparkles, Star, Users, Menu } from 'lucide-react';
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
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
                <Sparkles className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Badge className="h-5 px-1 text-[10px] bg-red-500 text-white">
                  HOT
                </Badge>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                FaceMagic Pro
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                專業級 AI 換臉平台
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">
              已服務 <span className="font-bold">50,000+</span> 用戶
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              強大功能
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              如何使用
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              定價方案
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="hidden sm:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              免費試用
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