# Architecture

**Analysis Date:** 2026-01-23

## Pattern Overview

**Overall:** Single-page landing site with component-based UI architecture

**Key Characteristics:**
- Client-side React application with Vite build tooling
- Component composition with presentational and functional separation
- Motion and animation-first design with scroll-triggered reveals
- Responsive layout from mobile-first approach
- Radix UI primitive components wrapped in custom UI library

## Layers

**Presentation Layer:**
- Purpose: Render visual interface for the landing page
- Location: `src/components/`
- Contains: Landing page sections, UI primitives, navigation
- Depends on: Motion libraries, Tailwind CSS, icon libraries
- Used by: Pages and App components

**Page Layer:**
- Purpose: Orchestrate landing page composition
- Location: `src/pages/Index.tsx`
- Contains: Single index page that imports and composes all sections in order
- Depends on: Landing components, UI components
- Used by: App router

**App Layer:**
- Purpose: Provide global providers and routing context
- Location: `src/App.tsx`
- Contains: QueryClientProvider, TooltipProvider, Toast providers, Router setup
- Depends on: React Router, TanStack Query, UI providers
- Used by: main.tsx entry point

**Utilities Layer:**
- Purpose: Shared helper functions and style utilities
- Location: `src/lib/utils.ts`, `src/hooks/`
- Contains: Class name merging (cn), custom React hooks
- Depends on: clsx, tailwind-merge, React
- Used by: All components

**Styling Layer:**
- Purpose: Define theme tokens, colors, animations, global styles
- Location: `src/index.css`, `tailwind.config.ts`
- Contains: CSS custom properties (HSL-based), Tailwind utilities, animations
- Depends on: Tailwind CSS, PostCSS
- Used by: All components via Tailwind classes

## Data Flow

**Page Load Flow:**

1. `src/main.tsx` mounts React to DOM
2. `src/App.tsx` initializes providers (Query, Tooltip, Toast)
3. Router renders route - currently only "/" maps to `<Index />`
4. `src/pages/Index.tsx` composes all landing sections in sequence
5. Each section component mounts, initializes state/animation
6. Framer Motion triggers animations on mount and scroll

**Scroll Animation Flow:**

1. User scrolls page
2. Framer Motion's `useInView` hook detects element visibility
3. `ScrollReveal` component triggers animation variant
4. `StaggerContainer` sequences child animations with stagger delay
5. Motion properties update element opacity and transform

**Interactive Interactions:**

- Navbar scroll state: `useState` tracks scroll position, updates header styling
- Mobile menu: `useState` toggles mobile menu visibility on button click
- Curriculum accordion: `useState` tracks open week, expands/collapses on click
- All interactions are client-side, no backend calls

## Key Abstractions

**ScrollReveal Component:**
- Purpose: Unified scroll-triggered animation pattern
- Examples: `src/components/ui/scroll-reveal.tsx`
- Pattern: Wrapper component using Framer Motion's `useInView` hook with margin offset for early trigger, applying animation variants on visibility

**Section Component Pattern:**
- Purpose: Modular, self-contained landing page sections
- Examples: `src/components/landing/HeroSection.tsx`, `src/components/landing/PainPointsSection.tsx`, `src/components/landing/CurriculumSection.tsx`
- Pattern: Exported function component with internal state management, animations, and Tailwind styling; sections compose independently

**UI Primitive Wrapper Pattern:**
- Purpose: Enhance Radix UI primitives with consistent styling and properties
- Examples: `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/badge.tsx`
- Pattern: Wrapper components using CVA (class-variance-authority) for size/variant props, applying Tailwind classes

**Gradient and Animation Utilities:**
- Purpose: Reusable visual effects
- Examples: `.gradient-primary`, `.shadow-primary`, `.text-gradient` in `src/index.css`
- Pattern: Tailwind utility classes for gradient backgrounds, glowing shadows, text gradients

## Entry Points

**Application Entry:**
- Location: `src/main.tsx`
- Triggers: Browser loading HTML file
- Responsibilities: Create React root, render App component into DOM

**App Component:**
- Location: `src/App.tsx`
- Triggers: Loaded by main.tsx
- Responsibilities: Wrap application in global providers (Query client, Tooltip, Toast, Router); define route structure

**Landing Page:**
- Location: `src/pages/Index.tsx`
- Triggers: Router matches "/" path
- Responsibilities: Compose all landing sections in correct visual order; provide page structure wrapper

**Not Found Fallback:**
- Location: `src/pages/NotFound.tsx`
- Triggers: Router matches undefined routes (catch-all "*" path)
- Responsibilities: Display 404 message

## Error Handling

**Strategy:** No explicit error handling layer; relies on React error boundaries (not currently implemented) and browser error console

**Patterns:**
- Silent failures for navigation (no validation)
- No error states in components (animations assume success)
- No API error handling (no API calls present)

## Cross-Cutting Concerns

**Logging:** None - no logging infrastructure in place; relies on browser console

**Validation:** None - no form validation; no user input beyond navigation

**Authentication:** None - public landing page, no auth required

**Theme Management:** Dark mode only via Tailwind CSS (darkMode: ["class"]); single theme currently active

**Responsive Design:** Mobile-first Tailwind breakpoints (md:, lg:); responsive behavior in Navbar and layout containers

---

*Architecture analysis: 2026-01-23*
