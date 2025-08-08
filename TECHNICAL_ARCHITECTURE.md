# ContentSwap Pro - 技術架構文檔

## 📋 技術概述

ContentSwap Pro 是基於 Next.js 15.4 構建的現代化 AI 換臉應用，採用 React 19、TypeScript 5.7 和 Tailwind CSS v4，整合 Replicate API 進行 AI 模型推理。

---

## 🏗️ 系統架構

### 技術棧
```
Frontend: Next.js 15.4 + React 19 + TypeScript 5.7
Styling: Tailwind CSS v4 + shadcn/ui
State Management: Zustand
Forms: React Hook Form + Zod
AI Service: Replicate API
Build Tool: Turbopack
```

### 項目結構
```
ai_face_changing/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── swap/image/    # 發起換臉請求
│   │   ├── status/[id]/   # 輪詢處理狀態
│   │   └── result/[id]/   # 獲取處理結果
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主頁面
├── components/
│   ├── ui/               # shadcn/ui 組件
│   ├── layout/           # 布局組件 (Header, Footer)
│   └── face-swap/        # 核心業務組件
├── lib/                  # 工具庫
├── stores/               # Zustand 狀態管理
├── types/                # TypeScript 類型定義
└── config/               # 配置文件
```

---

## 🔧 核心架構模式

### 狀態管理 (Zustand)

集中化的 `useFaceSwapStore` 管理：
```typescript
interface FaceSwapStore {
  // 圖片上傳狀態
  sourceImage: File | null
  targetImage: File | null
  sourceImagePreview: string | null
  targetImagePreview: string | null
  
  // 處理狀態
  isLoading: boolean
  progress: number
  error: string | null
  
  // 結果管理
  currentSwap: SwapResult | null
  swapHistory: SwapResult[]
  
  // 異步操作
  startSwap: (params: SwapParams) => Promise<void>
  pollStatus: (id: string) => Promise<void>
}
```

### API 架構 (三層結構)

#### 1. `/api/swap/image` - 換臉請求
```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const sourceImage = formData.get('sourceImage') as File
  const targetImage = formData.get('targetImage') as File
  const quality = formData.get('quality') as string
  
  // 調用 Replicate API
  const prediction = await replicate.predictions.create({
    version: MODEL_VERSIONS[quality],
    input: {
      source_image: await fileToBase64(sourceImage),
      target_image: await fileToBase64(targetImage)
    }
  })
  
  return NextResponse.json({ id: prediction.id })
}
```

#### 2. `/api/status/[id]` - 狀態輪詢
```typescript
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const prediction = await replicate.predictions.get(id)
  
  return NextResponse.json({
    status: prediction.status,
    progress: calculateProgress(prediction),
    output: prediction.output
  })
}
```

#### 3. `/api/result/[id]` - 結果獲取
```typescript
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const prediction = await replicate.predictions.get(id)
  
  if (prediction.status === 'succeeded') {
    return NextResponse.json({
      resultImageUrl: prediction.output,
      completedAt: prediction.completed_at
    })
  }
  
  return NextResponse.json({ error: prediction.error }, { status: 400 })
}
```

---

## 🧩 核心組件設計

### 圖片上傳流程 (`ImageUpload`)
```typescript
interface ImageUploadProps {
  label: string
  onImageChange: (file: File | null) => void
  preview?: string | null
}

export function ImageUpload({ label, onImageChange, preview }: ImageUploadProps) {
  // 拖放處理
  const handleDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageChange(file)
    }
  }
  
  // 預覽生成
  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      return () => URL.revokeObjectURL(previewUrl)
    }
  }, [file])
}
```

### 處理流程編排 (`FaceSwapForm`)
```typescript
export function FaceSwapForm() {
  const {
    sourceImage, targetImage, isLoading, progress,
    startSwap, pollStatus
  } = useFaceSwapStore()
  
  const handleSwap = async () => {
    try {
      // 1. 發起處理請求
      const response = await fetch('/api/swap/image', {
        method: 'POST',
        body: createFormData(sourceImage, targetImage, quality)
      })
      const { id } = await response.json()
      
      // 2. 開始狀態輪詢
      const pollInterval = setInterval(async () => {
        const statusResponse = await fetch(`/api/status/${id}`)
        const status = await statusResponse.json()
        
        if (status.status === 'succeeded') {
          clearInterval(pollInterval)
          // 3. 獲取最終結果
          await fetchResult(id)
        }
      }, 2000)
      
    } catch (error) {
      setError(error.message)
    }
  }
}
```

### 結果展示 (`ResultDisplay`)
```typescript
export function ResultDisplay() {
  const { currentSwap, swapHistory } = useFaceSwapStore()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Before */}
      <div className="space-y-4">
        <h3>原始圖片</h3>
        <img src={currentSwap?.sourceImageUrl} alt="原始" />
      </div>
      
      {/* After */}
      <div className="space-y-4">
        <h3>處理結果</h3>
        <img src={currentSwap?.resultImageUrl} alt="結果" />
        <Button onClick={downloadImage}>下載結果</Button>
      </div>
    </div>
  )
}
```

---

## 🎨 UI 框架與設計系統

### Tailwind CSS v4 配置
```typescript
// 無需配置文件，使用默認設置
// 專業化色彩系統：
// - Primary: Blue (專業、信任)
// - Secondary: Orange (活力、創新)
// - Accent: Green (成功、確認)
```

### shadcn/ui 組件系統
```bash
# 已安裝組件
components/ui/
├── button.tsx          # 按鈕組件
├── card.tsx           # 卡片容器
├── input.tsx          # 輸入框
├── label.tsx          # 標籤
├── progress.tsx       # 進度條
├── badge.tsx          # 徽章
└── separator.tsx      # 分隔線
```

### 響應式設計模式
```css
/* Mobile First 設計 */
.container {
  @apply px-4 sm:px-6 lg:px-8;
  @apply max-w-6xl mx-auto;
}

/* 網格布局 */
.pricing-grid {
  @apply grid grid-cols-1 md:grid-cols-4 gap-6;
}

/* 卡片懸停效果 */
.card-hover {
  @apply hover:shadow-xl transition-shadow hover:-translate-y-1;
}
```

---

## 🔗 外部服務整合

### Replicate API 整合

#### 服務層封裝
```typescript
// lib/replicate.ts
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export class ReplicateService {
  static async createPrediction(params: PredictionParams) {
    return await replicate.predictions.create({
      version: params.modelVersion,
      input: {
        source_image: params.sourceImage,
        target_image: params.targetImage,
      }
    })
  }
  
  static async getPrediction(id: string) {
    return await replicate.predictions.get(id)
  }
}
```

#### 模型配置管理
```typescript
// config/replicate.ts
export const REPLICATE_MODELS: Record<string, ModelConfig> = {
  'easel/advanced-face-swap': {
    name: 'Premium 專業版',
    price: 0.04,
    processingTime: '30秒',
    quality: 'high',
    type: 'image',
  },
  'codeplugtech/face-swap': {
    name: 'Standard 標準版',
    price: 0.0039,
    processingTime: '39秒',
    quality: 'standard',
    type: 'image',
  },
}
```

### 環境配置
```bash
# .env.local
REPLICATE_API_TOKEN=your_replicate_token_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📊 性能優化策略

### 圖片處理優化
```typescript
// 1. 客戶端預覽優化
const createPreview = (file: File) => {
  return URL.createObjectURL(file) // 即時預覽
}

// 2. Base64 編碼優化
const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}

// 3. 圖片壓縮 (未來實現)
const compressImage = (file: File, maxSize: number) => {
  // 實現圖片壓縮邏輯
}
```

### 狀態輪詢優化
```typescript
// 智能輪詢間隔
const getPollingInterval = (status: string, attempts: number) => {
  if (status === 'processing') {
    return Math.min(2000 + attempts * 500, 5000) // 漸進式增加
  }
  return 2000
}

// 超時控制
const MAX_POLLING_ATTEMPTS = 60 // 最多輪詢 60 次
const POLLING_TIMEOUT = 120000  // 2 分鐘超時
```

### Next.js 15 優化
```typescript
// 靜態優化
export const dynamic = 'force-dynamic' // API routes
export const revalidate = 0            // 禁用緩存

// Turbopack 開發優化
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack" // 更快的開發建構
  }
}
```

---

## 🔒 安全性考慮

### 數據安全
```typescript
// 文件類型驗證
const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  return allowedTypes.includes(file.type) && file.size < 10 * 1024 * 1024
}

// API 請求驗證
export async function POST(request: NextRequest) {
  // 1. Content-Type 檢查
  const contentType = request.headers.get('content-type')
  if (!contentType?.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }
  
  // 2. 文件大小限制
  const formData = await request.formData()
  // ... 驗證邏輯
}
```

### 隱私保護
```typescript
// 圖片處理後清理
const cleanupFiles = async (files: string[]) => {
  for (const file of files) {
    try {
      await fs.unlink(file)
    } catch (error) {
      console.error('清理文件失敗:', error)
    }
  }
}

// 不儲存用戶上傳的圖片
// 所有處理都通過 API 直接傳輸
```

### 錯誤處理
```typescript
// 全局錯誤邊界
export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => {
        console.error('應用錯誤:', error)
        // 發送到錯誤監控服務
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// API 錯誤處理
const handleAPIError = (error: any) => {
  if (error.response?.status === 429) {
    return '請求過於頻繁，請稍後再試'
  }
  if (error.response?.status >= 500) {
    return '服務暫時不可用，請稍後再試'
  }
  return '處理失敗，請檢查圖片格式'
}
```

---

## 🚀 部署架構

### 生產環境配置
```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['replicate.delivery'], // Replicate 圖片域名
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp'] // 圖片處理
  }
}
```

### Docker 配置
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### 監控與日志
```typescript
// 性能監控
export const monitoring = {
  // API 響應時間
  trackAPILatency: (endpoint: string, latency: number) => {
    console.log(`API ${endpoint} 響應時間: ${latency}ms`)
  },
  
  // 錯誤率監控
  trackErrorRate: (endpoint: string, errorCount: number, totalCount: number) => {
    const errorRate = (errorCount / totalCount) * 100
    console.log(`API ${endpoint} 錯誤率: ${errorRate}%`)
  }
}
```

---

## 📈 擴展性設計

### 微服務架構準備
```typescript
// 服務接口定義
interface AIProcessingService {
  processImage(request: ProcessingRequest): Promise<ProcessingResult>
  getProcessingStatus(id: string): Promise<ProcessingStatus>
}

interface UserManagementService {
  authenticateUser(token: string): Promise<User>
  checkUsageQuota(userId: string): Promise<QuotaInfo>
}

interface BillingService {
  recordUsage(userId: string, usage: UsageRecord): Promise<void>
  processPayment(userId: string, amount: number): Promise<PaymentResult>
}
```

### 數據庫整合準備
```sql
-- 用戶表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscription_tier VARCHAR(50) NOT NULL,
  monthly_quota INTEGER NOT NULL,
  used_quota INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 處理記錄表
CREATE TABLE processing_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  replicate_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  model_used VARCHAR(255) NOT NULL,
  processing_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 緩存策略
```typescript
// Redis 緩存配置
interface CacheService {
  // 用戶配額緩存
  getUserQuota(userId: string): Promise<number>
  updateUserQuota(userId: string, used: number): Promise<void>
  
  // 處理結果臨時緩存
  cacheResult(id: string, result: any, ttl: number): Promise<void>
  getResult(id: string): Promise<any>
}
```

---

## 🔧 開發工具鏈

### 開發命令
```bash
# 開發環境 (Turbopack 加速)
npm run dev

# 生產建構
npm run build

# 生產服務器
npm run start

# 代碼檢查
npm run lint

# 類型檢查
npx tsc --noEmit
```

### 代碼品質工具
```json
// .eslintrc.js
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "jsx-a11y/alt-text": "warn",
    "@next/next/no-img-element": "warn"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 測試策略（規劃中）
```typescript
// 單元測試 (Jest + Testing Library)
describe('ImageUpload Component', () => {
  test('should accept valid image files', () => {
    // 測試文件上傳功能
  })
  
  test('should reject invalid file types', () => {
    // 測試文件類型驗證
  })
})

// API 測試
describe('/api/swap/image', () => {
  test('should return prediction ID', async () => {
    // 測試 API 端點
  })
})
```

---

## 📚 技術債務與改進計劃

### 短期改進
1. **錯誤邊界完善**：添加更細粒度的錯誤處理
2. **圖片壓縮**：客戶端圖片預處理
3. **離線支援**：Service Worker 實現
4. **性能監控**：集成 Sentry 或 DataDog

### 中期架構升級
1. **用戶認證系統**：NextAuth.js 整合
2. **數據庫集成**：PostgreSQL + Prisma ORM
3. **文件存儲**：AWS S3 或 Cloudinary
4. **API 版本控制**：RESTful API 標準化

### 長期技術規劃
1. **微服務化**：按業務域拆分服務
2. **容器化部署**：Kubernetes 集群
3. **CDN 優化**：全球內容分發
4. **自主 AI 模型**：減少第三方依賴

---

*最後更新：2025年8月8日*
*技術棧版本：Next.js 15.4, React 19, TypeScript 5.7*