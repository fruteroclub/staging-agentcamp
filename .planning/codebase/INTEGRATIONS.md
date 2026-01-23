# External Integrations

**Analysis Date:** 2026-01-23

## APIs & External Services

**Not Detected** - This is a static marketing landing page with no external API integrations.

The application is purely frontend-based with no backend API calls, microservice dependencies, or third-party API integrations at this time.

## Data Storage

**Databases:**
- None - No database connectivity required or implemented

**File Storage:**
- Local filesystem only - No cloud storage (S3, Google Cloud Storage, etc.)

**Caching:**
- Client-side caching via @tanstack/react-query 5.83.0 (for potential future API calls)
  - Currently configured with default QueryClient in `src/App.tsx`
  - No persistent or server-side cache configured

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- No authentication required for landing page access

**User Sessions:**
- Not applicable - Stateless public website

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service (Sentry, Rollbar, etc.)

**Analytics:**
- Not detected - No analytics SDK (Google Analytics, Mixpanel, etc.)
- No tracking pixels or event logging

**Logs:**
- Browser console only - Standard `console` logging available in development
- No server-side logging or log aggregation

## CDN & External Assets

**Fonts:**
- Google Fonts CDN - `https://fonts.googleapis.com`
  - Fonts loaded: Inter (400, 500, 600, 700), JetBrains Mono (400, 500)
  - Preconnected in `index.html` for performance

**Icons:**
- Lucide React - Local npm package (no external dependency)

**Favicon:**
- Local `/public/favicon.ico`

## CI/CD & Deployment

**Hosting Platform:**
- Lovable - Primary deployment target (mentioned in README)
- Alternative: Vercel, Netlify, GitHub Pages, or any static host

**CI Pipeline:**
- Not detected - No CI/CD configuration (GitHub Actions, GitLab CI, etc.)

**Build Output:**
- Static site generation - Output to `dist/` directory via `vite build`
- No server-side rendering or dynamic backend required

## Environment Configuration

**Environment Variables:**
- Not used - No `.env` files present
- No secrets or configuration variables required

**Configuration Approach:**
- Hardcoded values in component files
- Theme configuration via `tailwind.config.ts`
- CSS variables for theming in `src/index.css`

## Webhooks & Callbacks

**Incoming Webhooks:**
- None detected

**Outgoing Webhooks:**
- None configured

## Third-Party Integrations

**Payment Processing:**
- Not detected - Program is 100% sponsored (free), no payment integration

**Email Service:**
- Not detected - No email sending capability (Sendgrid, Mailgun, etc.)
- CTA buttons direct to external URLs but don't trigger emails

**Communication:**
- Not detected - No chat, messaging, or real-time communication services

**Social Media Integration:**
- Not detected - No OAuth or social login
- Links to social profiles in footer are standard HTML links

## Internal State Management

**Query Client:**
- **Provider:** `src/App.tsx` configures QueryClientProvider
- **Purpose:** Prepared for future API data fetching
- **Configuration:** Default QueryClient with no custom options
- **Usage:** Currently unused; no queries or mutations in codebase

**Context Providers:**
- `TooltipProvider` from Radix UI - Only context provider in use
  - Enables tooltip functionality across app

**Theme Provider:**
- `next-themes` installed but not actively configured in app
- Available for future dark mode implementation

## Future Integration Points

**Prepared for but not implemented:**
- Query client ready for API integration via @tanstack/react-query
- Form infrastructure (react-hook-form + zod) ready for form submissions
- Next.js themes integration available for light/dark mode

**No blocking integrations:**
- This is a fully functional landing page with zero external dependencies
- Can be deployed immediately as-is to any static host

---

*Integration audit: 2026-01-23*
