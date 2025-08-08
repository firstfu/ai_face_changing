/**
 * 用戶註冊 API 路由 (User Registration API Route)
 * 
 * 處理新用戶註冊流程：
 * - 使用 Zod 進行表單資料驗證
 * - 檢查電子郵件是否已被註冊
 * - 使用 bcrypt 進行密碼加密處理
 * - 建立新用戶記錄於資料庫
 * - 自動為新用戶創建免費訂閱方案
 * - 返回新用戶基本資訊 (不含敏感資料)
 * 
 * API 端點：POST /api/auth/register
 * 
 * 請求資料結構：
 * - name: 用戶姓名 (至少 1 個字元)
 * - email: 有效電子郵件地址
 * - password: 密碼 (至少 6 個字元)
 * 
 * 安全措施：
 * - bcrypt 密碼雜湊 (salt rounds: 12)
 * - 重複註冊檢查
 * - 輸入資料驗證與清理
 * 
 * 使用技術：
 * - Next.js 15 API Routes
 * - Prisma ORM
 * - Zod 資料驗證
 * - bcryptjs 密碼加密
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, '姓名不能為空'),
  email: z.string().email('請輸入有效的電子郵件'),
  password: z.string().min(6, '密碼至少需要 6 個字元'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // 檢查用戶是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '此電子郵件已經註冊過了' },
        { status: 400 }
      );
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, 12);

    // 建立用戶
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 建立免費訂閱
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'FREE',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天後
      },
    });

    return NextResponse.json(
      { 
        message: '註冊成功',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('註冊錯誤:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '註冊過程中發生錯誤' },
      { status: 500 }
    );
  }
}