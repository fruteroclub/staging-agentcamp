# Coding Conventions

**Analysis Date:** 2026-01-23

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `HeroSection.tsx`, `FAQSection.tsx`, `Button.tsx`)
- UI component files: lowercase with hyphens (e.g., `scroll-reveal.tsx`, `tubelight-navbar.tsx`, `use-mobile.tsx`)
- Utility files: lowercase (e.g., `utils.ts`)
- Test files: `.test.ts` or `.spec.ts` suffix (e.g., `example.test.ts`)
- Directories: lowercase with hyphens (e.g., `components/ui`, `components/landing`, `src/lib`, `src/pages`)

**Functions:**
- React components: PascalCase with `function` keyword or arrow function (e.g., `export function HeroSection()`, `export const StaggerContainer =`)
- Hooks: camelCase with `use` prefix (e.g., `useIsMobile()`, `useFormField()`)
- Utility functions: camelCase (e.g., `cn()` for className utility)
- Variant functions: camelCase with descriptive suffix (e.g., `buttonVariants`)

**Variables:**
- Constants: camelCase (e.g., `MOBILE_BREAKPOINT`, `queryClient`, `faqs`, `navItems`, `footerLinks`)
- State variables: camelCase (e.g., `isScrolled`, `isMobileMenuOpen`, `isMobile`)
- Props interfaces: PascalCase with `Props` suffix (e.g., `ButtonProps`, `ScrollRevealProps`, `StaggerContainerProps`)

**Types:**
- Interfaces: PascalCase (e.g., `ButtonProps`, `ScrollRevealProps`, `FormFieldContextValue`)
- Type aliases: PascalCase (e.g., `ClassValue`)
- Exported types: PascalCase (e.g., `VariantProps`)

## Code Style

**Formatting:**
- ESLint: configured in `eslint.config.js`
- No Prettier config detected; follows ESLint rules
- Target: ES2020
- JSX: `react-jsx` (automatic JSX transform)
- Two-space indentation (standard TypeScript/ESLint default)

**Linting:**
- Tool: ESLint 9.32.0 with typescript-eslint
- Configuration file: `eslint.config.js` (flat config format)
- Key plugins:
  - `@eslint/js` recommended config
  - `typescript-eslint` recommended config
  - `react-hooks` (enforces rules of hooks)
  - `react-refresh` (warn on non-component exports)
- Custom rules:
  - `@typescript-eslint/no-unused-vars`: **off** (disabled)
  - `react-refresh/only-export-components`: **warn** (allows constant exports with allowConstantExport flag)

**TypeScript:**
- Strict mode: **false** (loose typing)
- `noUnusedLocals`: false
- `noUnusedParameters`: false
- `noImplicitAny`: false
- `skipLibCheck`: true
- `strictNullChecks`: false
- Module resolution: bundler mode
- Path alias: `@/*` maps to `src/*`

## Import Organization

**Order:**
1. React and external libraries (e.g., `import * as React from "react"`)
2. Third-party UI/component libraries (e.g., `@radix-ui`, `lucide-react`, `framer-motion`)
3. Internal components (e.g., `@/components/ui/button`)
4. Internal utilities (e.g., `@/lib/utils`)
5. Type imports (e.g., `type ClassValue`, `type VariantProps`)

**Example from codebase:**
```typescript
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
```

**Path Aliases:**
- `@/*` resolves to `src/*` (defined in `tsconfig.json` and `vite.config.ts`)
- Use aliases consistently for all internal imports

## Error Handling

**Patterns:**
- Error logging: `console.error()` for runtime errors (see `NotFound.tsx`)
- Context-based error checking: Error thrown if hook used outside required context (see `useFormField()` in `form.tsx`)
- Form validation: Uses `react-hook-form` with Zod integration for schema validation
- Silent failures: Most components don't explicitly handle errors beyond logging; UI simply renders fallback states

**Example from `NotFound.tsx`:**
```typescript
useEffect(() => {
  console.error("404 Error: User attempted to access non-existent route:", location.pathname);
}, [location.pathname]);
```

**Example from `form.tsx`:**
```typescript
if (!fieldContext) {
  throw new Error("useFormField should be used within <FormField>");
}
```

## Logging

**Framework:** Native `console` methods

**Patterns:**
- Use `console.error()` for errors in `useEffect` hooks
- No debug logging configured
- No structured logging library in use

**Example:**
```typescript
console.error("404 Error: User attempted to access non-existent route:", location.pathname);
```

## Comments

**When to Comment:**
- Minimal commenting observed in codebase
- Inline comments used for section labels (e.g., `{/* Logo */}`, `{/* Background gradient effects */}`)
- Comments explain layout/visual structure in JSX blocks, not logic

**JSDoc/TSDoc:**
- Not used throughout codebase
- No function-level documentation
- Component props documented via TypeScript interfaces

**Example from `HeroSection.tsx`:**
```typescript
{/* Background gradient effects */}
<div className="absolute inset-0 overflow-hidden">
  {/* Pre-headline badges */}
  <motion.div ...>
```

## Function Design

**Size:** Functions are typically 20-100 lines for component functions. Smaller utility functions (2-10 lines) for helpers.

**Parameters:**
- React components use props object with destructuring:
```typescript
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 30,
  once = true,
}: ScrollRevealProps)
```
- Utility functions accept minimal parameters (e.g., `cn(...inputs: ClassValue[])`)

**Return Values:**
- Components return JSX (React elements)
- Hooks return state or state setters
- Utility functions return computed values or JSX fragments

## Module Design

**Exports:**
- Named exports for components and utilities: `export function HeroSection()`, `export { Button, buttonVariants }`
- Default exports for page components: `export default Index`, `export default NotFound`
- Mixed exports in UI component files (e.g., `button.tsx` exports both `Button` and `buttonVariants`)

**Barrel Files:**
- Not extensively used in codebase
- Each component imports directly from its file rather than index files
- Example import pattern: `import { Button } from "@/components/ui/button"` (direct file import)

**File Organization:**
- Utility functions grouped in `src/lib/utils.ts`
- UI components in `src/components/ui/` (shadow/shadcn-ui library components)
- Landing page sections in `src/components/landing/` (custom components)
- Hooks isolated in `src/hooks/`
- Constants defined in-file alongside components (e.g., `const faqs = [...]` in `FAQSection.tsx`)

## Specific Conventions Observed

**Variant-based Components:**
- Components use `class-variance-authority` (CVA) for managing variants
- Pattern: `const buttonVariants = cva(...)` with variants object
- Components receive variant props and merge with `cn()` utility

**Animation Patterns:**
- `framer-motion` used for animations with `initial`, `animate`, `transition` props
- Scroll-reveal animations use `useInView` hook with Variants
- Consistent stagger patterns for grouped animations

**Styling:**
- Tailwind CSS with custom theme tokens (e.g., `bg-primary`, `text-muted-foreground`)
- `cn()` utility combines Tailwind classes with Radix UI styling
- Theme system based on CSS variables (light/dark mode support via next-themes)

**Data Structures:**
- Component data (FAQs, nav items, footer links) stored as arrays of objects near component definition
- Example: `const faqs = [{question: "...", answer: "..."}]` in `FAQSection.tsx`

---

*Convention analysis: 2026-01-23*
