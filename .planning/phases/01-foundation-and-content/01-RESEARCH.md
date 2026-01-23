# Phase 1: Foundation & Content - Research

**Researched:** 2026-01-23
**Domain:** React internationalization (i18next/react-i18next ecosystem)
**Confidence:** HIGH

## Summary

React internationalization in 2026 is dominated by the i18next ecosystem, specifically the combination of i18next (core), react-i18next (React bindings), and i18next-browser-languagedetector (language detection). For a Vite + React 18 + TypeScript landing page transitioning from hardcoded Spanish to multi-language support, the standard approach involves:

1. Bundling translation JSON files directly in the Vite build (synchronous initialization prevents FOUC)
2. Using hierarchical dot-notation keys (e.g., `hero.title`, `pricing.cta`) for organized translation structure
3. Configuring i18next with localStorage persistence and Spanish as fallback language
4. TypeScript type augmentation for type-safe translation keys (requires TypeScript 5+)

The ecosystem is mature and well-documented. For this landing page use case, bundled translations (not HTTP backend) provide the simplest, most reliable setup with no network requests or initialization race conditions.

**Primary recommendation:** Use `i18next-resources-to-backend` with dynamic imports to bundle translations synchronously in Vite, configure Spanish as fallback language, and implement pre-commit validation to enforce translation key parity.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| i18next | 25.7.4 | Internationalization framework | Industry standard, framework-agnostic, 60k+ GitHub stars |
| react-i18next | 16.5.3 | React bindings for i18next | Official React integration, hooks-based API for React 18 |
| i18next-browser-languagedetector | 8.2.0 | Automatic language detection | Detects from localStorage, navigator, query params with caching |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| i18next-resources-to-backend | Latest | Lazy-load bundled translations | Vite dynamic imports, enables synchronous bundling |
| i18n-check | Latest | Translation key validation | Pre-commit hooks to enforce key parity between languages |
| husky | 9.1.7 | Git hooks management | Automate pre-commit validation scripts |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| i18next ecosystem | react-intl (FormatJS) | More opinionated, ICU message format required, smaller ecosystem |
| Bundled translations | i18next-http-backend | Adds network requests, initialization complexity, unnecessary for landing page |
| Manual extraction | i18next-parser/scanner | Automated extraction fragile with dynamic keys, better for manual workflow |

**Installation:**
```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-resources-to-backend
npm install --save-dev i18n-check husky
```

## Architecture Patterns

### Recommended Project Structure
```
public/
└── locales/                 # Alternative: place in src/ for bundling
    ├── es/
    │   └── translation.json
    └── en/
        └── translation.json

src/
├── i18n/
│   ├── config.ts           # i18next configuration
│   └── index.ts            # Export initialized i18n instance
├── types/
│   └── i18next.d.ts        # TypeScript type augmentation
└── main.tsx                # Import i18n before React.render()

.husky/
└── pre-commit              # Translation validation hook

scripts/
└── validate-translations.js # Key parity validation
```

### Pattern 1: Synchronous Bundled Translations (Recommended)

**What:** Import translations directly in i18n config using `i18next-resources-to-backend` with dynamic imports
**When to use:** Landing pages, SPAs where all translations can be bundled at build time
**Example:**
```typescript
// src/i18n/config.ts
// Source: https://www.i18next.com/how-to/add-or-load-translations
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`../../public/locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
```

```typescript
// src/main.tsx
// Source: https://react.i18next.com/guides/quick-start
import './i18n/config'; // Must import BEFORE React renders
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Pattern 2: Hierarchical Translation Keys

**What:** Use dot-notation to organize translations by UI section
**When to use:** Always - prevents key collisions and improves maintainability
**Example:**
```json
// locales/es/translation.json
{
  "hero": {
    "badge": {
      "virtual": "100% Virtual",
      "duration": "Programa de 4 semanas"
    },
    "title": {
      "line1": "Construye Agentes IA",
      "line2": "Despliega en Producción",
      "line3": "Sin Código"
    },
    "subtitle": {
      "problem": "Llevas meses jugando con ChatGPT...",
      "solution": "Agentcamp te lleva de experimentar a operar en 4 semanas."
    },
    "cta": {
      "primary": "Reserva Tu Lugar",
      "secondary": "Ver Programa"
    }
  },
  "pricing": {
    "title": "Inversión y Fecha de Inicio",
    "amount": "$397 USD"
  }
}
```

```typescript
// src/components/landing/HeroSection.tsx
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('hero.title.line1')}</h1>
      <p>{t('hero.subtitle.problem')}</p>
      <Button>{t('hero.cta.primary')}</Button>
    </section>
  );
}
```

### Pattern 3: TypeScript Type Safety

**What:** Use type augmentation to get autocomplete and type checking for translation keys
**When to use:** TypeScript projects (requires TypeScript 5+)
**Example:**
```typescript
// src/types/i18next.d.ts
// Source: https://www.i18next.com/overview/typescript
import 'i18next';
import type translation from '../../public/locales/es/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof translation;
    };
  }
}
```

**Note:** The project's `tsconfig.json` has `strictNullChecks: false`, which may reduce type safety effectiveness. Consider enabling for better i18next type inference.

### Anti-Patterns to Avoid

- **String concatenation in translations:** Different languages have different grammar structures - use interpolation instead
- **Using `useTranslation` outside React components:** Causes "Invalid Hook Call" - use `i18n.t()` for utilities/services
- **Hard-coded namespace prefixes:** Use the `ns` option in `useTranslation(['common', 'moduleA'])` instead of `t('common:key')`
- **Missing Trans component for JSX:** When translations contain links or formatted text, use `<Trans>` component, not string templates

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Language detection | Custom navigator.language parser | i18next-browser-languagedetector | Handles 9+ detection methods (localStorage, cookie, navigator, query params, subdomain, path) with fallback chains |
| Translation key validation | Bash script comparing JSON keys | i18n-check | Detects missing keys, type mismatches, unused keys, and undefined references with i18next format support |
| Pluralization | Template strings with conditionals | i18next pluralization | Handles complex plural rules for 140+ languages (English has 2 forms, Arabic has 6) |
| Interpolation escaping | Manual string replacement | i18next interpolation | Auto-escapes in HTML contexts, handles nested values, format functions |
| Translation file merging | Manual JSON merge scripts | i18next-parser/scanner | Preserves existing translations, adds new keys, removes obsolete ones |
| Fallback language chains | Nested if statements | i18next fallbackLng config | Supports complex fallback chains like 'de-CH' → 'de' → 'en' → 'dev' |

**Key insight:** i18n is deceptively complex - languages have different pluralization rules, date formats, number formats, RTL text direction, and grammatical gender. The i18next ecosystem has solved these problems over 10+ years. Custom solutions inevitably hit edge cases.

## Common Pitfalls

### Pitfall 1: FOUC (Flash of Untranslated Content)

**What goes wrong:** User sees English keys like "hero.title.line1" briefly before translations load
**Why it happens:** i18next initializes asynchronously by default, React renders before translations ready
**How to avoid:**
- Use bundled translations with `i18next-resources-to-backend` (no HTTP requests)
- Import i18n config in `main.tsx` BEFORE `ReactDOM.createRoot()`
- Avoid `i18next-http-backend` for initial load (lazy-load additional namespaces if needed)
**Warning signs:** Translation keys appearing as text, `t()` returning the key string itself

### Pitfall 2: Initialization Timing in Tests

**What goes wrong:** Tests fail with "i18next not initialized" or return translation keys
**Why it happens:** Test files don't import i18n config, or run before async initialization completes
**How to avoid:**
- Create `setupTests.ts` that imports i18n config
- Use synchronous initialization (bundled translations)
- Mock `useTranslation` in unit tests that don't need real translations
**Warning signs:** Tests pass individually but fail in CI, intermittent test failures

### Pitfall 3: Translation Key Drift Between Languages

**What goes wrong:** Spanish has 50 keys, English has 48 keys, app crashes or shows keys instead of text
**Why it happens:** Manual editing of translation files, forgetting to update all languages
**How to avoid:**
- Use pre-commit hook with i18n-check to validate key parity
- Treat Spanish (source language) as source of truth
- Automate English translation generation, never manually add/remove keys
**Warning signs:** Missing translation warnings in console, keys appearing in UI instead of text

### Pitfall 4: TypeScript Memory Issues with Large Translation Files

**What goes wrong:** TypeScript compilation runs out of memory or takes 5+ minutes
**Why it happens:** Type inference for deeply nested translation objects is computationally expensive
**How to avoid:**
- Split translations into multiple namespaces (common, hero, pricing, etc.)
- Use `enableSelector: "optimize"` in CustomTypeOptions (i18next v25.4+)
- Keep individual translation files under 200 keys
**Warning signs:** `tsc` process crashes, "JavaScript heap out of memory" errors

### Pitfall 5: Incorrect Interpolation for JSX Content

**What goes wrong:** Translation contains `<strong>Bold</strong>` but renders as plain text
**Why it happens:** Using `t()` function for translations containing React/HTML nodes
**How to avoid:**
- Use `<Trans>` component when translation contains JSX elements
- Reserve `t()` for plain text only
- For dynamic components, use Trans with components prop: `<Trans components={{ bold: <strong />, link: <Link to="/path" /> }}>key</Trans>`
**Warning signs:** HTML tags visible as text, links not clickable, formatting lost

### Pitfall 6: Hard-Coding Strings After i18n Setup

**What goes wrong:** New features add hard-coded strings, breaking multi-language support
**Why it happens:** Developers forget to use translation system, no automated enforcement
**How to avoid:**
- Create ESLint rule to detect string literals in JSX (eslint-plugin-i18next)
- Code review checklist includes "all user-facing strings use t() or Trans"
- Use TypeScript strict mode to catch missing translation keys
**Warning signs:** New UI sections only appear in Spanish, missing keys in English JSON

## Code Examples

Verified patterns from official sources:

### Basic Component Translation
```typescript
// Source: https://react.i18next.com/latest/usetranslation-hook
import { useTranslation } from 'react-i18next';

export function PricingSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('pricing.title')}</h2>
      <p>{t('pricing.amount')}</p>
    </section>
  );
}
```

### Translation with Interpolation
```typescript
// Source: https://react.i18next.com/latest/usetranslation-hook
import { useTranslation } from 'react-i18next';

export function WelcomeMessage({ userName }: { userName: string }) {
  const { t } = useTranslation();

  // Translation: "Bienvenido, {{name}}!"
  return <p>{t('welcome.message', { name: userName })}</p>;
}
```

### Trans Component for JSX Content
```typescript
// Source: https://react.i18next.com/latest/trans-component
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

export function LegalText() {
  // Translation: "Al registrarte, aceptas nuestros <1>términos de servicio</1> y <3>política de privacidad</3>."
  return (
    <Trans i18nKey="legal.acceptance">
      Al registrarte, aceptas nuestros <Link to="/terms">términos de servicio</Link> y <Link to="/privacy">política de privacidad</Link>.
    </Trans>
  );
}
```

### Language Switcher Component
```typescript
// Source: https://react.i18next.com/latest/usetranslation-hook
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button onClick={toggleLanguage}>
      {i18n.language === 'es' ? 'English' : 'Español'}
    </Button>
  );
}
```

### Pre-commit Validation Script
```javascript
// scripts/validate-translations.js
// Source: https://github.com/lingualdev/i18n-check
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const LANGUAGES = ['es', 'en'];

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      keys = keys.concat(getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function validateTranslations() {
  const translations = LANGUAGES.map(lang => {
    const filePath = path.join(LOCALES_DIR, lang, 'translation.json');
    return {
      lang,
      keys: getKeys(JSON.parse(fs.readFileSync(filePath, 'utf-8'))),
    };
  });

  const [source, ...targets] = translations;
  let hasError = false;

  targets.forEach(target => {
    const missingInTarget = source.keys.filter(k => !target.keys.includes(k));
    const extraInTarget = target.keys.filter(k => !source.keys.includes(k));

    if (missingInTarget.length > 0) {
      console.error(`❌ Missing keys in ${target.lang}:`, missingInTarget);
      hasError = true;
    }
    if (extraInTarget.length > 0) {
      console.error(`❌ Extra keys in ${target.lang}:`, extraInTarget);
      hasError = true;
    }
  });

  if (hasError) {
    process.exit(1);
  }
  console.log('✅ Translation keys are in sync');
}

validateTranslations();
```

```json
// package.json
{
  "scripts": {
    "validate:i18n": "node scripts/validate-translations.js"
  }
}
```

```bash
# .husky/pre-commit
# Source: https://typicode.github.io/husky/
npm run validate:i18n
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| HTTP backend (`i18next-http-backend`) | Bundled with `i18next-resources-to-backend` | 2023-2024 | Eliminates network requests, prevents FOUC, simpler config for SPAs |
| Manual type definitions | Type augmentation with `CustomTypeOptions` | i18next v23 (2023) | Autocomplete for keys, compile-time validation, better DX |
| String-based API only | Selector API (`enableSelector`) | i18next v25.4 (2024) | Better performance with large translation sets, reduces TS memory issues |
| react-i18next v11 (class components) | react-i18next v14+ (hooks-first) | 2022 | Modern React patterns, better tree-shaking, simpler code |
| i18next-parser | Deprecated, migrate to i18next-cli | September 2025 | Tool consolidation, better maintenance |

**Deprecated/outdated:**
- `withTranslation` HOC: Still works but hooks are preferred (`useTranslation`)
- `i18next.t()` in components: Use `useTranslation()` hook to get `t` function
- `ns` string prefix syntax `t('common:key')`: Use array in `useTranslation(['common'])` instead
- TypeScript v4 with i18next v23+: Requires i18next v22.5.1 or upgrade to TypeScript v5

## Open Questions

Things that couldn't be fully resolved:

1. **LLM Translation Quality**
   - What we know: Multiple tools exist (i18n-ai-translate, i18nweb) that use ChatGPT/Claude/Gemini for translation
   - What's unclear: Quality benchmarks, cost per 1000 keys, handling of context/tone for marketing copy
   - Recommendation: Start with automated translation using Gemini 2.0 Flash (cost-effective), manually review 10-20 key strings (hero headlines, CTAs), flag low-confidence translations for post-launch refinement

2. **TypeScript Strict Mode Impact**
   - What we know: Project has `strictNullChecks: false` in tsconfig, i18next type safety works best with strict mode
   - What's unclear: Whether enabling strict mode will break existing code, effort to fix type errors
   - Recommendation: Keep strict mode disabled for Phase 1 to avoid scope creep. Type augmentation still provides key autocomplete even without strict mode. Consider enabling in future phases.

3. **Translation Extraction Automation**
   - What we know: i18next-parser/scanner can auto-extract strings from components, but deprecated (migrate to i18next-cli)
   - What's unclear: i18next-cli maturity, extraction reliability for TypeScript/JSX, handling of dynamic keys
   - Recommendation: Manual extraction for Phase 1 (small landing page, ~50-100 strings). Automated extraction adds complexity and risk of breaking changes. Evaluate i18next-cli for future content updates.

4. **Language Detection Order**
   - What we know: i18next-browser-languagedetector supports multiple detection methods (localStorage, navigator, query params)
   - What's unclear: Optimal detection order for Spanish-default, English opt-in use case
   - Recommendation: Use `order: ['localStorage', 'navigator']` - respects explicit user choice (localStorage) but falls back to browser language. Skip query params/cookies (unnecessary complexity for landing page).

## Sources

### Primary (HIGH confidence)
- i18next Official Documentation - Configuration Options: https://www.i18next.com/overview/configuration-options
- i18next Official Documentation - TypeScript: https://www.i18next.com/overview/typescript
- i18next Official Documentation - Add/Load Translations: https://www.i18next.com/how-to/add-or-load-translations
- react-i18next Official Documentation - useTranslation Hook: https://react.i18next.com/latest/usetranslation-hook
- react-i18next Official Documentation - Trans Component: https://react.i18next.com/latest/trans-component
- react-i18next Official Documentation - Quick Start: https://react.i18next.com/guides/quick-start
- i18next-browser-languageDetector GitHub README: https://github.com/i18next/i18next-browser-languageDetector
- NPM Package Registry (version checks):
  - i18next 25.7.4: https://www.npmjs.com/package/i18next
  - react-i18next 16.5.3: https://www.npmjs.com/package/react-i18next
  - i18next-browser-languagedetector 8.2.0: https://www.npmjs.com/package/i18next-browser-languagedetector

### Secondary (MEDIUM confidence)
- i18n-check GitHub Repository: https://github.com/lingualdev/i18n-check (validated tool for translation parity)
- Husky Official Documentation: https://typicode.github.io/husky/ (standard for Git hooks)
- Locize Blog - Using t() Outside Components: https://www.locize.com/blog/how-to-use-i18next-t-outside-react-components/ (verified patterns)
- Medium - Vite + React + TypeScript i18n Guide (2024): https://medium.com/@sundargautam2022/for-integrating-internationalization-i18n-in-a-react-vite-typescript-project-the-best-and-e240f444fdaf
- Phrase Blog - React Localization with i18next: https://phrase.com/blog/posts/localizing-react-apps-with-i18next/

### Tertiary (LOW confidence - marked for validation)
- InfiniteJS - Common i18n Mistakes in React: https://infinitejs.com/posts/common-mistakes-i18n-react (community article, patterns align with official docs)
- GitHub Issues - i18next synchronous initialization discussions: https://github.com/i18next/i18next/issues/636 (historical context)
- i18n-ai-translate GitHub: https://github.com/taahamahdi/i18n-ai-translate (tool exists but quality unverified)
- Medium - i18n Workflow with AI (2024): https://medium.com/fsmk-engineering/from-days-to-minutes-how-we-revolutionized-our-i18n-workflow-with-ai-and-github-actions-e14219588cb5 (single source, needs validation)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official npm versions verified, ecosystem well-established
- Architecture: HIGH - Official documentation patterns, verified with Vite compatibility
- Pitfalls: MEDIUM - Combination of official docs and community articles, patterns cross-verified
- LLM translation tools: LOW - Multiple tools exist but quality/reliability unverified in production

**Research date:** 2026-01-23
**Valid until:** 2026-02-23 (30 days - i18n ecosystem is stable, major versions change ~yearly)
