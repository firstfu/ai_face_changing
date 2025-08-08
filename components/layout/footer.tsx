export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌資訊 */}
          <div className="space-y-3">
            <h3 className="font-semibold">Face Swap AI</h3>
            <p className="text-sm text-muted-foreground">
              使用最新 AI 技術，提供高品質的換臉服務
            </p>
          </div>

          {/* 功能 */}
          <div className="space-y-3">
            <h4 className="font-medium">功能</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>圖片換臉</li>
              <li>影片換臉</li>
              <li>批次處理</li>
              <li>高品質輸出</li>
            </ul>
          </div>

          {/* 技術 */}
          <div className="space-y-3">
            <h4 className="font-medium">技術支援</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 15</li>
              <li>React 19</li>
              <li>Tailwind v4</li>
              <li>Replicate API</li>
            </ul>
          </div>

          {/* 幫助 */}
          <div className="space-y-3">
            <h4 className="font-medium">幫助</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>使用指南</li>
              <li>常見問題</li>
              <li>聯絡我們</li>
              <li>隱私政策</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Face Swap AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}