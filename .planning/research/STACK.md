# Technology Stack: i18n Implementation

**Project:** AgentCamp 2.0 Landing Page - i18n Support
**Researched:** 2026-01-23
**Overall Confidence:** MEDIUM (based on training data from January 2025, external verification unavailable)

## Executive Summary

For adding i18n to an existing Vite + React application, the standard stack consists of:
- **react-i18next** (already decided) - React bindings for i18next
- **i18next** - Core i18n framework
- **i18next-browser-languagedetector** - Browser language detection and persistence
- **i18next-http-backend** (optional) - For external translation files

This stack integrates seamlessly with Vite's module system and supports localStorage persistence out-of-the-box.

## Recommended Stack

### Core i18n Libraries

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| i18next | ^23.x | Core i18n framework | Industry standard, framework-agnostic, powerful pluralization and interpolation | MEDIUM |
| react-i18next | ^14.x | React bindings | Official React integration with hooks support (useTranslation, Trans component) | MEDIUM |
| i18next-browser-languagedetector | ^8.x | Language detection & persistence | Auto-detects browser language, handles localStorage persistence, configurable detection order | MEDIUM |

**Installation:**
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Optional Enhancement

| Technology | Version | Purpose | When to Use | Confidence |
|------------|---------|---------|-------------|------------|
| i18next-http-backend | ^2.x | Load translations from external files | If translations stored as separate JSON files rather than inline | MEDIUM |

**Why this minimal stack:**
- Vite handles module imports natively - no special plugin needed
- TypeScript support built-in to react-i18next
- No build-time optimization needed for a landing page
- Browser-side language detection sufficient for this use case

## Integration Approach

### 1. Configuration Structure

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // English translations
        }
      },
      es: {
        translation: {
          // Spanish translations
        }
      }
    },
    fallbackLng: 'es', // Spanish default as specified
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
```

### 2. Vite Integration

Import i18n config in `main.tsx` BEFORE rendering:

```typescript
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config' // Initialize i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

No Vite plugin required - standard ES module imports work.

### 3. TypeScript Support

Add type definitions for type-safe translations:

```typescript
// src/i18n/types.ts
import 'react-i18next';
import type en from './locales/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not | Confidence |
|----------|-------------|-------------|---------|------------|
| i18n Framework | i18next + react-i18next | FormatJS (react-intl) | react-i18next has better React 18+ hooks support, more flexible, lighter weight | MEDIUM |
| i18n Framework | i18next | next-i18next | next-i18next is Next.js specific, unnecessary for Vite | HIGH |
| Language Detection | i18next-browser-languagedetector | Custom solution | Built-in persistence, configurable detection order, battle-tested | HIGH |
| Translation Storage | Inline resources | i18next-http-backend | Landing page has limited content, inline is simpler and faster (no HTTP requests) | HIGH |
| Build Plugin | None | vite-plugin-i18next | Unnecessary - Vite handles ES modules natively, plugin only needed for advanced optimizations | MEDIUM |

## What NOT to Use

### ❌ react-intl (FormatJS)
**Why avoid:**
- Heavier API surface
- Less flexible namespace management
- More verbose component syntax (`<FormattedMessage>` vs `t()` hook)
- Decision already made for react-i18next

**When it IS appropriate:** Large enterprise apps requiring ICU message format and extensive number/date formatting

### ❌ vite-plugin-i18next-loader
**Why avoid:**
- Adds build complexity
- Minimal benefit for a landing page
- Standard ES imports work fine in Vite

**When it IS appropriate:** Apps with 10+ languages, large translation files needing code-splitting

### ❌ i18next-icu
**Why avoid:**
- Adds ICU message format complexity
- Not needed for simple ES/EN toggle
- Increases bundle size

**When it IS appropriate:** Languages with complex pluralization rules beyond what i18next supports natively

## localStorage Implementation

The `i18next-browser-languagedetector` package handles localStorage automatically:

```typescript
detection: {
  order: ['localStorage', 'navigator'], // Check localStorage first, then browser setting
  lookupLocalStorage: 'i18nextLng',     // Key name (default)
  caches: ['localStorage']               // Persist language choice
}
```

**What this gives you:**
- User selects language → saved to `localStorage` under key `i18nextLng`
- User returns → language loaded from localStorage
- No localStorage entry → falls back to browser language → falls back to 'es'

No manual localStorage code needed.

## Bundle Size Considerations

| Package | Approximate Size | Impact |
|---------|------------------|--------|
| i18next | ~15KB gzipped | Core framework |
| react-i18next | ~5KB gzipped | React bindings |
| i18next-browser-languagedetector | ~3KB gzipped | Language detection |
| **Total** | **~23KB** | Acceptable for landing page |

**Optimization notes:**
- Tree-shaking works automatically with Vite
- Translations inline = zero HTTP overhead
- No additional build plugins = faster builds

## Testing Integration

Works with existing Vitest setup. Mock i18n in tests:

```typescript
// src/test/setup.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: {} },
      es: { translation: {} }
    }
  });
```

## Migration Path

Since this is adding i18n to an existing codebase:

1. **Install packages** (no version conflicts expected with existing React 18.3.1)
2. **Create i18n config** with inline translations
3. **Import config in main.tsx** before render
4. **Wrap strings with t()** hook progressively
5. **Add language toggle component** using i18next.changeLanguage()

No changes to existing Vite config, build setup, or other dependencies required.

## Version Compatibility

| Package | React Version | Vite Version | TypeScript |
|---------|---------------|--------------|------------|
| react-i18next 14.x | React 18+ | Any | 4.x, 5.x |
| i18next 23.x | N/A | N/A | 4.x, 5.x |

Existing stack (React 18.3.1, Vite 5.4.19, TypeScript 5.8.3) is fully compatible.

## Confidence Assessment

| Aspect | Level | Reason |
|--------|-------|--------|
| Package choices | MEDIUM | Based on training data (Jan 2025), unable to verify current versions with Context7 or official docs |
| Version numbers | LOW | Versions are estimates based on training data, may not be latest as of Jan 2026 |
| Integration approach | HIGH | Vite + React integration patterns are stable and well-established |
| localStorage strategy | HIGH | i18next-browser-languagedetector API is stable and documented |
| Alternatives analysis | HIGH | Ecosystem comparison is based on established tradeoffs |
| Bundle sizes | MEDIUM | Approximate sizes from training data, actual may vary by version |

## Validation Recommendations

Before implementation, verify:
1. Current versions of i18next, react-i18next, i18next-browser-languagedetector on npm
2. Check react-i18next changelog for any breaking changes in React 18.3+ integration
3. Confirm TypeScript 5.8 compatibility (likely fine, but verify)

## Sources

**Note:** Research conducted without access to external verification tools (Context7, WebSearch, WebFetch unavailable). All recommendations based on training data current as of January 2025. Version numbers and API details should be verified against current official documentation before implementation.

**Recommended verification sources:**
- https://react.i18next.com/ (official docs)
- https://www.i18next.com/ (core framework docs)
- https://github.com/i18next/react-i18next (GitHub repo)
- https://www.npmjs.com/package/react-i18next (npm registry for current versions)

---

**Ready for roadmap creation:** Stack research complete with clear confidence levels marked.
