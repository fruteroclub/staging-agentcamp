# Codebase Concerns

**Analysis Date:** 2026-01-23

## Test Coverage Gaps

**Minimal testing infrastructure:**
- What's not tested: All landing page components, routing, navigation interactions, state management (useState/useEffect in 24 locations)
- Files: `src/pages/Index.tsx`, `src/components/landing/**/*.tsx`, `src/components/ui/**/*.tsx`
- Current state: Only placeholder test exists in `src/test/example.test.ts`
- Risk: Component regressions go undetected; user-facing features lack validation. Hero section, navbar scroll behavior, accordion interactions, pricing card animations all untested.
- Priority: High - This is a user-facing marketing landing page where visual/interactive bugs directly impact conversion

**Missing critical test scenarios:**
- No E2E tests for user flows (scroll reveal behavior, button clicks, form interactions)
- No unit tests for hook-based components (`useInView`, `useState` in Navbar, CurriculumSection)
- No integration tests for RouteProvider setup or NotFound page
- Carousel and scroll-based interactions have zero test coverage

## Type Safety Issues

**Loose TypeScript configuration:**
- Problem: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false` in `tsconfig.json` - allows unsafe code patterns
- Files: `tsconfig.json` lines 9-14
- Impact: Type errors silently allowed; null/undefined access won't catch at compile time. Example: `testimonial.company` in `src/components/landing/TestimonialsSection.tsx` line 62 could be undefined
- Fix approach: Enable strict mode (`strictNullChecks: true`, `noImplicitAny: true`), run linter with fixes, update code to handle nulls properly

**ESLint configuration disables important checks:**
- Problem: `@typescript-eslint/no-unused-vars: "off"` in `eslint.config.js` line 23 allows dead code to accumulate
- Files: `eslint.config.js`
- Impact: Unused imports and variables pile up, increasing bundle size and code complexity. Makes refactoring riskier.
- Fix approach: Enable rule, audit codebase for unused vars, remove them in a follow-up commit

## Performance Concerns

**Large JavaScript bundle size:**
- Problem: Main bundle `dist/assets/index-e_nANR0R.js` is 484.50 kB (153.01 kB gzipped) for a static landing page
- Cause: Unused component library (many shadcn/ui components imported but not used), Framer Motion animations on every scroll reveal, heavy dependencies like recharts/victory
- Impact: Slow first contentful paint; poor Core Web Vitals on slower networks. Users on 4G will experience delayed page load.
- Improvement path:
  1. Tree-shake unused UI components - remove unused imports from `src/components/ui/`
  2. Code-split animation components - lazy load Framer Motion for below-fold sections
  3. Audit and remove unused dependencies (recharts, victory-vendor not used in landing page)
  4. Consider lighter animation library or CSS-only reveals for scroll animations

**Unchecked animation render cost:**
- Problem: `ScrollReveal`, `StaggerContainer` components with `useInView` hooks trigger re-renders on scroll in 10+ sections
- Files: `src/components/ui/scroll-reveal.tsx` lines 22, 49 (useInView with margin: "-100px")
- Impact: Performance degradation on slow devices; janky scrolling on mobile with many staggered animations
- Improvement path: Implement intersection observer throttling, consider using `will-change` CSS carefully, profile with DevTools

## Fragile Areas

**Hardcoded anchor link navigation:**
- Files: `src/components/landing/Navbar.tsx` lines 7-11, `src/components/ui/tubelight-navbar.tsx` lines 49-54
- Why fragile: Navigation relies on DOM id selectors (e.g., `#programa`, `#faq`) that must match exactly. If section IDs are renamed without updating nav, links break silently.
- Safe modification:
  1. Create centralized route/anchor constants file (`src/constants/routes.ts`)
  2. Update all anchor references to use constants
  3. Add integration tests verifying anchor targets exist
- Test coverage: No tests verify anchor links point to existing elements

**Scroll-based state management:**
- Files: `src/components/landing/Navbar.tsx` lines 17-23 (scroll listener), `src/components/ui/tubelight-navbar.tsx` lines 25-44 (indicator calculation)
- Why fragile: Multiple `useEffect` hooks managing window.scrollY and DOM measurements. ResizeObserver callback at line 42 could fail silently if navRef is unmounted.
- Potential issues: Memory leaks if cleanup doesn't fire properly; indicator position calculation relies on DOM elements being stable
- Safe modification: Add error boundaries, add cleanup verification tests, consider moving to a custom hook

**QueryClient instantiation without error handling:**
- Files: `src/App.tsx` lines 4, 9
- Problem: `new QueryClient()` creates fresh instance on every render (no memo/useMemo). No error handlers configured.
- Impact: Lost error context; failed requests won't propagate to UI. If API calls were added later, errors would be lost.
- Fix approach: Move QueryClient outside component, add default error handler callback

## Missing Critical Features

**No environment configuration:**
- Problem: No .env support; API endpoints, feature flags, analytics keys hardcoded nowhere (good) but can't configure for different environments
- Impact: Deployment to staging/production requires code changes. Multi-language support (current branch) won't have language toggle without env-driven feature flags.
- Fix approach: Add `.env.example`, load from import.meta.env in Vite config

**No multi-language implementation despite branch name:**
- Problem: Branch is `feat/multi-language-support` but all content is Spanish hardcoded in components
- Files: All `src/components/landing/**/*.tsx` - content in Spanish without i18n library
- Impact: Cannot switch languages without rebuilding. User preference won't persist. No translation management system.
- Fix approach:
  1. Install i18n library (react-i18next or similar)
  2. Extract all Spanish strings to JSON files (en.json, es.json)
  3. Add language selector in Navbar
  4. Store preference in localStorage
  5. Add dynamic imports for language files

**No real button functionality:**
- Problem: All CTA buttons ("Reserva Tu Lugar", "Asegura Tu Lugar") have no onClick handlers
- Files: `src/components/landing/Navbar.tsx` line 51, `src/components/landing/HeroSection.tsx` line 81, `src/components/landing/PricingSection.tsx` line 94, `src/components/landing/FinalCTASection.tsx`
- Impact: Users can't actually sign up; conversion path is broken
- Fix approach: Connect to signup API (Supabase, Stripe, custom backend); add form modal or redirect

## Logging & Error Handling

**Basic error logging in 404 page:**
- Problem: Only error logging in codebase is at `src/pages/NotFound.tsx` line 8 - console.error to browser console
- Impact: Errors aren't persisted, users can't be tracked, no error aggregation for production debugging
- Fix approach:
  1. Add Sentry or similar error tracking service
  2. Create error logger utility that respects environment
  3. Log navigation errors, component errors to service

**No error boundaries:**
- Problem: No React ErrorBoundary components wrapping sections or the entire app
- Impact: Any component error crashes entire page; users get white screen instead of graceful degradation
- Fix approach: Add ErrorBoundary at `src/App.tsx` and around major sections; create shared error fallback UI

## Dependencies at Risk

**Outdated dependency tooling notification:**
- Problem: Build output shows `Browserslist: browsers data (caniuse-lite) is 7 months old`
- Files: All builds affected
- Impact: PostCSS/Autoprefixer might apply unnecessary vendor prefixes or miss new browser support
- Migration plan: Run `npx update-browserslist-db@latest` before next build

**Unused large dependencies:**
- Problem: `recharts`, `victory-vendor`, full shadcn/ui component library included but most components not used
- Impact: Increases bundle by ~100kB
- Audit needed: Check which components are actually imported vs. installed
- Fix approach: Remove unused component files, uninstall recharts if not needed

**Development-only dependency in package.json:**
- Problem: `lovable-tagger@1.1.13` is only used in dev mode (vite.config.ts line 15) but included in dependencies
- Fix: Move to devDependencies

## Security Considerations

**Console error logging in production:**
- Risk: `src/pages/NotFound.tsx` line 8 logs user navigation to 404s - could expose internal route structure or be abused
- Current mitigation: Only logs to console (not persistent)
- Recommendations:
  1. Suppress console logs in production
  2. Only send to error tracking for high-frequency patterns (indicates misconfigured links)
  3. Add rate limiting on error endpoint

**No CSP headers or security headers configuration:**
- Risk: No Content-Security-Policy defined. Vulnerable to XSS if user-generated content added later
- Impact: Landing page itself is safe (static content) but infrastructure doesn't protect
- Recommendations: Configure headers in deployment platform (Vercel, Netlify, etc.)

## Accessibility Gaps

**Limited accessibility testing:**
- Found: 83 aria-labels/roles across codebase - good coverage but not comprehensive
- Missing from major sections:
  - `src/components/landing/HeroSection.tsx` - main CTA buttons missing aria-labels (lines 81, 88)
  - `src/components/ui/tubelight-navbar.tsx` - nav links are `<a>` tags without proper focus management
  - Carousel component - no keyboard navigation support for prev/next buttons
- Impact: Screen reader users get poor experience; keyboard navigation breaks on custom nav
- Safe modification: Add aria-labels to all interactive elements; implement focus visible styles; test with axe DevTools

**Scroll animations may break reduced-motion preferences:**
- Problem: Framer Motion animations don't check `prefers-reduced-motion`
- Files: `src/components/ui/scroll-reveal.tsx`, `src/components/landing/**/*.tsx` (all motion divs)
- Impact: Users with vestibular disorders get dizzy/nauseous from mandatory animations
- Fix approach: Wrap motion.div with `AnimatePresence` check for `prefers-reduced-motion` media query

## Build & Deployment

**No deployment configuration in repo:**
- Problem: No vercel.json, netlify.toml, or similar
- Impact: Default deployment settings applied; no control over caching, redirects, or environment
- Recommendation: Add deployment config file for target platform

**No CI/CD pipeline configured:**
- Problem: No GitHub Actions, no lint/build checks on PR
- Impact: Broken builds, style violations, untested changes can be merged
- Recommendation: Add workflow for test, lint, build validation on every PR

## Schema Validation Issues

**No form validation despite having zod/react-hook-form:**
- Problem: Dependencies installed (zod, react-hook-form, @hookform/resolvers) but not used
- Files: Form components in UI library but no actual forms using them
- Impact: Future forms won't have built-in validation; developers might skip it
- Recommendation: Document validation patterns in CONVENTIONS.md; create form examples

## Stale Content Risk

**Hardcoded dates and numbers:**
- Problem: Pricing shows "Cohorte 2 · Solo 50 lugares" (line 104, HeroSection) but other places say "Cohorte 1" (PricingSection line 23)
- Files: `src/components/landing/HeroSection.tsx`, `src/components/landing/PricingSection.tsx`
- Impact: Conflicting information confuses users; manual updates required for each cohort
- Fix approach: Create content constants file with cohort info; update once when cohort changes

**Placeholder schedule:**
- Problem: PricingSection line 63 shows `"[Por definir]"` for class schedule
- Impact: Users can't plan their time; looks unprofessional
- Recommendation: Either hide placeholder or fill in real schedule

---

*Concerns audit: 2026-01-23*
