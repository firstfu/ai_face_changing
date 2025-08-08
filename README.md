# AI 換臉應用 | Face Swap AI

使用最新 AI 技術的高品質換臉 Web 應用程式。

![Next.js 15.4](https://img.shields.io/badge/Next.js-15.4-black)
![React 19](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4)

## 🚀 功能特色

- 🎨 **高品質換臉**：使用 Replicate 的先進 AI 模型
- ⚡ **快速處理**：平均 30-75 秒完成處理
- 🎯 **多種模型**：支援高品質和經濟模式
- 📱 **響應式設計**：完美支援桌面和行動裝置
- 🔒 **安全隱私**：本地處理，保護用戶隱私
- 💫 **即時預覽**：實時查看處理進度

## 🛠️ 技術棧

### 前端技術
- **Next.js 15.4** - 最新的 React 框架，支援 Turbopack
- **React 19** - 最新版本，包含新的 hooks 和功能
- **TypeScript 5.7** - 型別安全和開發體驗
- **Tailwind CSS v4** - 最新版本的 CSS 框架
- **shadcn/ui (canary)** - 現代化 UI 組件庫
- **Zustand** - 輕量級狀態管理
- **Lucide React** - 美觀的圖示庫

### 後端服務
- **Replicate API** - AI 模型服務
  - `easel/advanced-face-swap` - 高品質商業模型
  - `codeplugtech/face-swap` - 經濟實用模型
- **Next.js API Routes** - 後端 API 處理

## 🏗️ 專案結構

```
ai_face_changing/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── swap/          # 換臉 API
│   │   ├── status/        # 狀態查詢
│   │   └── result/        # 結果獲取
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首頁
├── components/            # React 組件
│   ├── ui/               # shadcn/ui 基礎組件
│   ├── face-swap/        # 換臉相關組件
│   └── layout/           # 布局組件
├── lib/                  # 工具庫
├── stores/               # Zustand 狀態管理
├── types/                # TypeScript 型別定義
└── config/               # 配置文件
```

## 🚀 開始使用

### 前置需求
- Node.js 18+ 
- npm 或 yarn
- Replicate API Token

### 安裝步驟

1. **安裝依賴**
```bash
npm install
```

2. **設定環境變數**
編輯 `.env.local` 文件，添加您的 Replicate API Token：
```env
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

3. **啟動開發服務器**
```bash
npm run dev
```

4. **開啟瀏覽器**
前往 [http://localhost:3000](http://localhost:3000) 查看應用

## 📊 API 使用說明

### 換臉 API
```bash
POST /api/swap/image
Content-Type: multipart/form-data

FormData:
- sourceImage: File
- targetImage: File
- quality: 'high' | 'standard'
```

### 狀態查詢
```bash
GET /api/status/{predictionId}
```

### 結果獲取
```bash
GET /api/result/{predictionId}
```

## 🎯 Replicate 模型

### 高品質模式
- **模型**: `easel/advanced-face-swap`
- **價格**: $0.04/張
- **特色**: 商業級品質，全身替換
- **處理時間**: ~30秒

### 經濟模式
- **模型**: `codeplugtech/face-swap`
- **價格**: $0.0039/張
- **特色**: 基礎換臉功能
- **處理時間**: ~39秒

## 🔧 開發指令

```bash
# 開發模式（使用 Turbopack）
npm run dev

# 建置專案
npm run build

# 啟動生產服務器
npm run start

# 程式碼檢查
npm run lint
```

## 🚀 部署

### Vercel 部署（推薦）
1. 推送代碼到 GitHub
2. 連接 Vercel 帳號
3. 導入專案並設定環境變數
4. 自動部署完成

## 🤝 貢獻

歡迎提交 Pull Request 或開 Issue！

## 📄 授權

MIT License

## 🆘 常見問題

### Q: 如何獲取 Replicate API Token？
A: 前往 [Replicate](https://replicate.com) 註冊帳號並在設定中獲取 API Token。

### Q: 支援哪些圖片格式？
A: 支援 JPG、PNG、WebP 格式，最大 5MB。

### Q: 處理失敗怎麼辦？
A: 檢查圖片品質、網路連線，或聯絡支援。

---

**使用最新技術打造，為您提供專業級 AI 換臉體驗！** ✨
