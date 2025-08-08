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

This is a Next.js 15.4 AI face-swapping application using React 19, TypeScript 5.7, and Tailwind CSS v4. The application integrates with Replicate API for AI model inference and includes user authentication, subscription management, and usage tracking.

### Core Architecture Patterns

**State Management**: Uses Zustand with a centralized `useFaceSwapStore` that manages:
- Image upload state (source/target images and previews)
- Processing state (progress, loading, error handling)
- Swap results and history
- User authentication state and subscription data
- Usage tracking and limits
- Asynchronous polling for Replicate API status updates with 60-attempt timeout

**API Architecture**: Comprehensive API structure under `/app/api/`:
- `/swap/image` - Initiates face swap with FormData (sourceImage, targetImage, quality)
- `/status/[id]` - Polls Replicate prediction status
- `/result/[id]` - Retrieves completed results
- `/auth/*` - NextAuth.js authentication routes
- `/payment/*` - ECPay payment integration (create, callback, return)
- `/subscription` - Subscription management
- `/usage` - Usage tracking and limits

**Authentication System**: 
- NextAuth.js v5 (beta) with Prisma adapter
- Credentials provider with bcrypt password hashing
- Optional Google OAuth (when environment variables are set)
- JWT session strategy with custom callbacks

**Database Layer**: 
- Prisma ORM with SQLite database
- Models: User, Account, Session, Subscription, UsageRecord
- Subscription plans: FREE, CREATOR, PRO, ENTERPRISE
- Monthly usage tracking by user and service type

**Payment Integration**: 
- ECPay integration for Taiwan market
- Merchant trade number tracking
- Payment callbacks and return URL handling
- Subscription status management

**Replicate Integration**: 
- Service layer in `lib/replicate.ts` wraps Replicate SDK
- Model configurations in `config/replicate.ts` define available models:
  - `easel/advanced-face-swap` (high quality, $0.04/image, ~30s)
  - `codeplugtech/face-swap` (economy, $0.0039/image, ~39s)
  - `arabyai-replicate/roop_face_swap` (video, $0.10/video, ~73s)

### Key Components Structure

**Authentication Flow**: 
- Custom signin/signup pages in `/app/auth/`
- Session provider wrapper in `components/providers/session-provider.tsx`
- Middleware protection for authenticated routes

**Upload Flow**: `ImageUpload` component handles drag-and-drop, validation, and preview generation using URL.createObjectURL

**Processing Flow**: `FaceSwapForm` orchestrates the complete workflow:
1. Authentication and usage limit checks
2. Quality/model selection
3. Form submission to `/api/swap/image` 
4. Status polling via Zustand store actions (5-second intervals)
5. Real-time progress updates with comprehensive error handling
6. Usage tracking updates

**Results Display**: `ResultDisplay` shows before/after comparison with download capabilities

**Subscription Management**: Dashboard and subscription pages with plan comparison and payment integration

### TypeScript Types

Core interfaces in `types/face-swap.ts`:
- `SwapRequest`: Client-side request structure
- `SwapResult`: Application state representation  
- `ReplicatePredict`: Replicate API response structure
- `ModelConfig`: Model metadata and pricing
- `ModelType`: 'image' | 'video' for different processing types

Additional types in `types/ecpay.d.ts` for payment integration.

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
- `NEXTAUTH_SECRET`: Required for session encryption
- `DATABASE_URL`: SQLite database connection string
- Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` for OAuth
- ECPay payment variables for production

### Database Schema

Key Prisma models:
- **User**: Core user data with email/password authentication
- **Subscription**: Plan management (FREE/CREATOR/PRO/ENTERPRISE) with ECPay integration
- **UsageRecord**: Monthly usage tracking with type/count per user
- **Account/Session**: NextAuth.js session management

### UI Framework

Uses shadcn/ui (canary version) with Tailwind CSS v4:
- Components in `components/ui/` (auto-generated)
- Custom components in `components/face-swap/` and `components/layout/`
- Responsive design with mobile-first approach

### Error Handling Patterns

The application implements comprehensive error handling:
- Client-side validation in upload components
- API error responses with appropriate HTTP status codes (401, 403, 429)
- Zustand store error state management with user-friendly Chinese messages
- Replicate API error forwarding and timeout handling
- Authentication error handling in middleware

### Usage Tracking System

- Monthly usage limits enforced per subscription plan
- Real-time usage checks before processing
- Usage updates after successful operations
- Persistent storage in Zustand with partialize for user data

### Performance Considerations

- Image previews use URL.createObjectURL for immediate display
- Polling implementation with timeout limits (60 attempts max, 5-minute total)
- Progress tracking during long-running AI operations
- Next.js 15 static optimization where possible
- Zustand persistence for user state and history

### Development Notes

- Uses bleeding-edge versions requiring npm legacy peer deps for some packages
- Tailwind v4 removes need for config files in most cases
- React 19 patterns throughout (no React.forwardRef needed)
- TypeScript strict mode enabled with comprehensive type coverage
- Chinese UI text throughout the application
- ECPay integration requires Taiwan-specific merchant configuration