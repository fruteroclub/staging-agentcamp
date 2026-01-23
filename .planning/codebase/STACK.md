# Technology Stack

**Analysis Date:** 2026-01-23

## Languages

**Primary:**
- TypeScript 5.8.3 - All source code, configuration files, and type definitions

**Secondary:**
- JavaScript - ESLint configuration, PostCSS configuration
- HTML - Static markup in `index.html`
- CSS - Tailwind CSS utilities and custom variables

## Runtime

**Environment:**
- Node.js (No specific version pinned; compatible with npm lock)
- Browser: Modern browsers supporting ES2020+ features

**Package Manager:**
- npm (with `package-lock.json` committed)
- Alternative: Bun (`.bun.lockb` file present)

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- Vite 5.4.19 - Build tool and development server

**Routing:**
- React Router DOM 6.30.1 - Client-side routing for multi-page navigation

**UI Components:**
- shadcn/ui - Pre-built component library built on Radix UI
- Radix UI (multiple modules) - Unstyled, accessible component primitives:
  - `@radix-ui/react-accordion` 1.2.11
  - `@radix-ui/react-alert-dialog` 1.1.14
  - `@radix-ui/react-avatar` 1.1.10
  - `@radix-ui/react-button` (via shadcn/ui)
  - `@radix-ui/react-checkbox` 1.3.2
  - `@radix-ui/react-collapsible` 1.1.11
  - `@radix-ui/react-context-menu` 2.2.15
  - `@radix-ui/react-dialog` 1.1.14
  - `@radix-ui/react-dropdown-menu` 2.1.15
  - `@radix-ui/react-hover-card` 1.1.14
  - `@radix-ui/react-label` 2.1.7
  - `@radix-ui/react-menubar` 1.1.15
  - `@radix-ui/react-navigation-menu` 1.2.13
  - `@radix-ui/react-popover` 1.1.14
  - `@radix-ui/react-progress` 1.1.7
  - `@radix-ui/react-radio-group` 1.3.7
  - `@radix-ui/react-scroll-area` 1.2.9
  - `@radix-ui/react-select` 2.2.5
  - `@radix-ui/react-separator` 1.1.7
  - `@radix-ui/react-slider` 1.3.5
  - `@radix-ui/react-slot` 1.2.3
  - `@radix-ui/react-switch` 1.2.5
  - `@radix-ui/react-tabs` 1.1.12
  - `@radix-ui/react-toast` 1.2.14
  - `@radix-ui/react-toggle` 1.1.9
  - `@radix-ui/react-toggle-group` 1.1.10
  - `@radix-ui/react-tooltip` 1.2.7

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS framework
- PostCSS 8.5.6 - CSS transformations via `postcss.config.js`
- Autoprefixer 10.4.21 - Vendor prefix automation
- tailwind-merge 2.6.0 - Utility class merging helper
- tailwindcss-animate 1.0.7 - Animation utilities for Tailwind
- @tailwindcss/typography 0.5.16 - Typography plugin

**Animation & Motion:**
- Framer Motion 12.27.1 - Advanced motion and animation library

**Forms & Validation:**
- react-hook-form 7.61.1 - Efficient form state management
- @hookform/resolvers 3.10.0 - Validation resolver integrations
- zod 3.25.76 - TypeScript-first schema validation

**Data & State:**
- @tanstack/react-query 5.83.0 - Server state management and caching

**Icons:**
- lucide-react 0.462.0 - Icon library

**UI Utilities:**
- cmdk 1.1.1 - Command menu component
- class-variance-authority 0.7.1 - CSS class variance utility
- clsx 2.1.1 - Utility for constructing className strings
- sonner 1.7.4 - Toast notification library
- vaul 0.9.9 - Drawer/modal primitive
- embla-carousel-react 8.6.0 - Carousel/slider component
- input-otp 1.4.2 - OTP input component
- react-day-picker 8.10.1 - Date picker component
- react-resizable-panels 2.1.9 - Resizable panel layout
- recharts 2.15.4 - Chart/graph visualization library
- date-fns 3.6.0 - Date utility library

**Theme:**
- next-themes 0.3.0 - Theme provider (light/dark mode support)

## Testing

**Framework:**
- Vitest 3.2.4 - Unit test runner with Vite integration
- Config: `vitest.config.ts`

**Assertion & Utilities:**
- @testing-library/react 16.0.0 - React component testing utilities
- @testing-library/jest-dom 6.6.0 - DOM matcher assertions
- jsdom 20.0.3 - DOM implementation for Node.js testing environment

**Run Commands:**
```bash
npm run test              # Run all tests once
npm run test:watch       # Run tests in watch mode
```

## Build & Development

**Build Tool:**
- Vite 5.4.19 - Lightning-fast build tool with hot module reload
- Plugin: @vitejs/plugin-react-swc 3.11.0 - SWC-based React transformation

**Linting:**
- ESLint 9.32.0 - JavaScript/TypeScript linter
- Config: `eslint.config.js` (flat config format)
- Plugins:
  - eslint-plugin-react-hooks 5.2.0 - React hooks rules
  - eslint-plugin-react-refresh 0.4.20 - React fast refresh rules
- Rules: typescript-eslint recommended + custom overrides

**Type Checking:**
- TypeScript 5.8.3 - Static type checking
- Config: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Relaxed settings: `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, `strictNullChecks` all disabled

## Key Dependencies Summary

**Critical (must-have):**
- React 18.3.1 - Core UI framework
- TypeScript 5.8.3 - Type safety
- Vite 5.4.19 - Build and dev server
- Tailwind CSS 3.4.17 - Styling
- Radix UI (26+ packages) - Accessible component primitives

**Important (feature-specific):**
- Framer Motion 12.27.1 - Scroll animations and transitions
- React Router DOM 6.30.1 - Multi-page navigation
- @tanstack/react-query 5.83.0 - Server state management
- react-hook-form 7.61.1 - Form handling
- zod 3.25.76 - Runtime validation
- lucide-react 0.462.0 - Icons

**Utility:**
- date-fns 3.6.0 - Date manipulation
- recharts 2.15.4 - Data visualization
- sonner 1.7.4 - Notifications
- clsx / tailwind-merge - CSS class utilities

## Configuration Files

**TypeScript:**
- `tsconfig.json` - Base compiler options with path alias `@/*`
- `tsconfig.app.json` - App-specific config (ES2020, DOM libs, JSX)
- `tsconfig.node.json` - Build tool config

**Vite:**
- `vite.config.ts` - Build config with React plugin, alias resolution, component tagger
- Dev server: IPv6 host (`::`), port `8080`, HMR overlay disabled

**Styling:**
- `tailwind.config.ts` - Custom theme with CSS variables, animations, colors
- `postcss.config.js` - Tailwind + Autoprefixer

**Testing:**
- `vitest.config.ts` - jsdom environment, global test APIs, setup file
- `src/test/setup.ts` - Test initialization

**Linting:**
- `eslint.config.js` - Flat config with TypeScript and React hooks rules

**Components:**
- `components.json` - shadcn/ui configuration with aliases

## Platform Requirements

**Development:**
- Node.js (LTS recommended; no pinned version in `.nvmrc`)
- npm or Bun package manager
- Modern terminal/IDE with TypeScript support

**Production:**
- Static hosting (Vercel, Netlify, GitHub Pages, or any HTTP server)
- CDN optional but recommended for assets
- No backend required (static SPA)

**Browser Support:**
- ES2020+ compatible browsers (Chrome, Firefox, Safari, Edge modern versions)
- Responsive design from mobile (320px) to desktop (2560px+)

---

*Stack analysis: 2026-01-23*
