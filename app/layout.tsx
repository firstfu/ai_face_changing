/**
 * 根布局組件 (Root Layout Component)
 * 
 * 這是整個應用程式的根布局，定義了全域設定：
 * - 設定 HTML 語言為繁體中文 (zh-TW)
 * - 整合 Geist 字型系統 (San Serif 和 Monospace)
 * - 提供 AuthSessionProvider 進行用戶會話管理
 * - 整合 Sonner Toast 通知系統
 * - 全域 CSS 樣式載入
 * 
 * 使用技術：
 * - Next.js 15 App Router 根布局
 * - Google Fonts (Geist 字型系統)
 * - NextAuth.js 會話管理
 * - Sonner 通知組件
 * - Tailwind CSS 全域樣式
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import AuthSessionProvider from "@/components/providers/session-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 換臉應用 | Face Swap AI",
  description: "使用最新 AI 技術進行高品質圖片和影片換臉處理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {children}
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
