# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development with Turbopack (Next.js 15.4 optimized)
npm run dev

# Production build and type checking
npm run build

# Production server
npm run start  

# ESLint checking
npm run lint
```

## Architecture Overview

This is a Next.js 15.4 AI face-swapping application using React 19, TypeScript 5.7, and Tailwind CSS v4. The application integrates with Replicate API for AI model inference.

### Core Architecture Patterns

**State Management**: Uses Zustand with a centralized `useFaceSwapStore` that manages:
- Image upload state (source/target images and previews)
- Processing state (progress, loading, error handling)
- Swap results and history
- Asynchronous polling for Replicate API status updates

**API Architecture**: Three-tier API structure under `/app/api/`:
- `/swap/image` - Initiates face swap with FormData (sourceImage, targetImage, quality)
- `/status/[id]` - Polls Replicate prediction status
- `/result/[id]` - Retrieves completed results

**Replicate Integration**: 
- Service layer in `lib/replicate.ts` wraps Replicate SDK
- Model configurations in `config/replicate.ts` define available models:
  - `easel/advanced-face-swap` (high quality, $0.04/image)
  - `codeplugtech/face-swap` (economy, $0.0039/image)
  - `arabyai-replicate/roop_face_swap` (video, $0.10/video)

### Key Components Structure

**Upload Flow**: `ImageUpload` component handles drag-and-drop, validation, and preview generation using URL.createObjectURL

**Processing Flow**: `FaceSwapForm` orchestrates the complete workflow:
1. Quality/model selection
2. Form submission to `/api/swap/image` 
3. Status polling via Zustand store actions
4. Real-time progress updates

**Results Display**: `ResultDisplay` shows before/after comparison with download capabilities

### TypeScript Types

Core interfaces in `types/face-swap.ts`:
- `SwapRequest`: Client-side request structure
- `SwapResult`: Application state representation  
- `ReplicatePredict`: Replicate API response structure
- `ModelConfig`: Model metadata and pricing

### Next.js 15 Specific Patterns

**API Routes**: Use new async params pattern:
```typescript
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
}
```

**Turbopack**: Development server uses `--turbopack` flag for faster builds

### Environment Configuration

Required environment variables in `.env.local`:
- `REPLICATE_API_TOKEN`: Required for AI model access
- Optional UploadThing variables for file handling (currently using base64 encoding)

### UI Framework

Uses shadcn/ui (canary version) with Tailwind CSS v4:
- Components in `components/ui/` (auto-generated)
- Custom components in `components/face-swap/` and `components/layout/`
- Responsive design with mobile-first approach

### Error Handling Patterns

The application implements comprehensive error handling:
- Client-side validation in upload components
- API error responses with appropriate HTTP status codes
- Zustand store error state management
- Replicate API error forwarding and user-friendly messages

### Performance Considerations

- Image previews use URL.createObjectURL for immediate display
- Polling implementation with timeout limits (60 attempts max)
- Progress tracking during long-running AI operations
- Next.js 15 static optimization where possible

### Development Notes

- Uses bleeding-edge versions requiring npm legacy peer deps for some packages
- Tailwind v4 removes need for config files in most cases
- React 19 patterns throughout (no React.forwardRef needed)
- TypeScript strict mode enabled with comprehensive type coverage