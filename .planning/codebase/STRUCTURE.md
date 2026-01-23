# Codebase Structure

**Analysis Date:** 2026-01-23

## Directory Layout

```
agentcamp-2.0-landing/
├── src/                        # Source code
│   ├── components/             # Reusable React components
│   │   ├── landing/           # Landing page sections
│   │   ├── ui/                # Shadcn/UI primitive wrappers
│   │   └── NavLink.tsx        # Navigation link component
│   ├── pages/                 # Page components (routed views)
│   │   ├── Index.tsx          # Main landing page
│   │   └── NotFound.tsx       # 404 page
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   ├── lib/                   # Utilities and helpers
│   │   └── utils.ts           # Class name utility (cn)
│   ├── test/                  # Test files
│   │   ├── setup.ts           # Vitest configuration
│   │   └── example.test.ts    # Example test
│   ├── App.tsx                # Root application component
│   ├── App.css                # App-level styles
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles and design tokens
│   └── vite-env.d.ts          # Vite environment type definitions
├── public/                    # Static assets
├── .planning/                 # Planning documents
│   └── codebase/             # Architecture/structure documentation
├── node_modules/             # Dependencies
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── eslint.config.js          # ESLint configuration
├── postcss.config.js         # PostCSS configuration
├── components.json           # Shadcn component registry
├── index.html                # HTML entry point
└── package.json              # Dependencies and scripts
```

## Directory Purposes

**src/:**
- Purpose: All source code for the application
- Contains: Components, pages, utilities, styling
- Key files: `App.tsx`, `main.tsx`

**src/components/:**
- Purpose: Reusable React components
- Contains: Two subdirectories - landing sections and UI primitives
- Key files: `NavLink.tsx`

**src/components/landing/:**
- Purpose: Presentational sections that compose the landing page
- Contains: 13 section components, each fully self-contained
- Key files: `Navbar.tsx`, `HeroSection.tsx`, `CurriculumSection.tsx`, `PainPointsSection.tsx`, `FAQSection.tsx`, `PricingSection.tsx`, etc.

**src/components/ui/:**
- Purpose: Reusable UI primitives (Radix UI wrappers) and custom UI components
- Contains: 50+ component files including buttons, cards, badges, modals, form components
- Key files: `button.tsx`, `card.tsx`, `scroll-reveal.tsx`, `tubelight-navbar.tsx`

**src/pages/:**
- Purpose: Page-level components that are routed
- Contains: Landing page composition and 404 fallback
- Key files: `Index.tsx` (main page), `NotFound.tsx` (404 page)

**src/hooks/:**
- Purpose: Custom React hooks for shared logic
- Contains: Mobile detection and toast notification hooks
- Key files: `use-mobile.tsx`, `use-toast.ts`

**src/lib/:**
- Purpose: Utility functions and constants
- Contains: Helper functions for common tasks
- Key files: `utils.ts` (cn function for merging class names)

**src/test/:**
- Purpose: Test configuration and example tests
- Contains: Vitest setup and test files
- Key files: `setup.ts`, `example.test.ts`

**public/:**
- Purpose: Static assets served as-is
- Contains: Images, favicons, etc.
- Committed: Yes

## Key File Locations

**Entry Points:**
- `index.html`: HTML document that loads React
- `src/main.tsx`: React root initialization
- `src/App.tsx`: Application wrapper with providers and routing

**Configuration:**
- `vite.config.ts`: Vite server, plugins, path alias configuration
- `tailwind.config.ts`: Tailwind CSS theme, color tokens, animations
- `tsconfig.json`: TypeScript path alias and compiler options
- `eslint.config.js`: ESLint rules and plugins
- `components.json`: Shadcn CLI configuration for component aliases

**Core Logic:**
- `src/pages/Index.tsx`: Landing page composition (orchestrates all sections)
- `src/components/landing/`: Business logic and content for each section

**Styling:**
- `src/index.css`: Global styles, CSS custom properties, utility classes
- `tailwind.config.ts`: Theme tokens, colors, animations

**Testing:**
- `src/test/setup.ts`: Vitest configuration
- `src/test/example.test.ts`: Example test pattern

## Naming Conventions

**Files:**
- React components: PascalCase (e.g., `HeroSection.tsx`, `Button.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `use-mobile.tsx`, `use-toast.ts`)
- Utilities: camelCase (e.g., `utils.ts`)
- CSS files: lowercase with dash separator (e.g., `index.css`)
- Config files: lowercase with dot separator (e.g., `vite.config.ts`, `tailwind.config.ts`)

**Directories:**
- Lowercase with plural or descriptive names (e.g., `components`, `pages`, `hooks`, `lib`)
- Grouped by domain: `landing/` for landing page sections, `ui/` for primitives

**Component Naming:**
- Exported named functions: PascalCase function name (e.g., `export function HeroSection()`)
- Internal state/hooks: camelCase (e.g., `const [isScrolled, setIsScrolled] = useState()`)
- Constants: UPPER_SNAKE_CASE for string/enum values (e.g., `const navItems = [...]`)

**CSS Classes:**
- Utility classes: Tailwind generated (e.g., `flex`, `gap-4`, `bg-background`)
- Custom utilities: kebab-case (e.g., `.gradient-primary`, `.shadow-primary`, `.text-gradient`)
- Component classes: kebab-case with BEM-like prefixes (e.g., `group`, `group-hover:*`)

## Where to Add New Code

**New Landing Section:**
- Implementation: `src/components/landing/[SectionName].tsx`
  - Pattern: Export function component named `[SectionName]`
  - Use ScrollReveal/StaggerContainer for animations
  - Use Tailwind classes for styling
  - Import icons from lucide-react, UI components from `@/components/ui/`
- Integration: Add import to `src/pages/Index.tsx` and render in JSX

**New UI Component:**
- Implementation: `src/components/ui/[component-name].tsx`
  - Pattern: Wrap Radix UI primitive or create custom component
  - Export named function component
  - Use CVA for variant/size props
  - Apply Tailwind classes

**New Page/Route:**
- Implementation: `src/pages/[PageName].tsx`
  - Pattern: Export default function component
- Integration: Add route to `src/App.tsx` in Routes component

**New Custom Hook:**
- Implementation: `src/hooks/use-[hook-name].tsx`
  - Pattern: Export function starting with `use`
  - Include TypeScript types for props/returns

**New Utility Function:**
- Implementation: Add to `src/lib/utils.ts` or create new file in `src/lib/`
- Export function and types
- Document with comments if non-obvious

**Global Styles:**
- Tailwind utilities: Add to `tailwind.config.ts` extend section
- CSS utilities: Add to `src/index.css` in @layer utilities block
- Theme colors/tokens: Update CSS custom properties in `src/index.css` :root

## Special Directories

**src/test/:**
- Purpose: Testing configuration and test files
- Generated: No
- Committed: Yes
- Run tests with: `npm test` or `npm run test:watch`

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes
- Committed: No (.gitignore excludes)

**public/:**
- Purpose: Static assets served directly by Vite
- Generated: No
- Committed: Yes

**.planning/codebase/:**
- Purpose: Architecture and design documentation
- Generated: No (manually updated)
- Committed: Yes

## File Structure Summary

**Component Tree:**
```
App.tsx (root with providers)
  ├── BrowserRouter
  │   └── Routes
  │       └── Route "/" → pages/Index.tsx
  │           ├── Navbar (header)
  │           ├── HeroSection (intro)
  │           ├── PainPointsSection (problems)
  │           ├── TransformationSection
  │           ├── MethodSection
  │           ├── CurriculumSection (expandable weeks)
  │           ├── EcosystemSection
  │           ├── TestimonialsSection
  │           ├── AudienceFitSection
  │           ├── PricingSection
  │           ├── FAQSection
  │           ├── FinalCTASection
  │           └── Footer
  │       └── Route "*" → pages/NotFound.tsx
  ├── TooltipProvider
  ├── QueryClientProvider
  ├── Toaster (shadcn toast)
  └── Sonner (sonner toast)
```

**Import Path Aliases:**
- `@/*` resolves to `src/*` (defined in `tsconfig.json` and `vite.config.ts`)

---

*Structure analysis: 2026-01-23*
