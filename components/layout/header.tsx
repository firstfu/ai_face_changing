'use client';

import { Video, TrendingUp, Users, Menu, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                ContentSwap Pro
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                專業內容創作工具
              </p>
            </div>
          </Link>

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
            {status === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button 
                    size="sm" 
                    className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    儀表板
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                        {session.user?.image ? (
                          <img 
                            src={session.user.image} 
                            alt={session.user.name || '用戶'} 
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name || '用戶'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>儀表板</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/subscription" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>訂閱管理</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>登出</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    登入
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    開始創作
                  </Button>
                </Link>
              </div>
            )}
            
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