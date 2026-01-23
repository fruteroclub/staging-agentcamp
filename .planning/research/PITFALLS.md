# Domain Pitfalls: React i18n Implementation

**Domain:** Multi-language React landing page with animations
**Stack:** Vite + React + TypeScript + Framer Motion + shadcn/ui
**Researched:** 2026-01-23

## Critical Pitfalls

Mistakes that cause rewrites, broken UX, or major production issues.

### Pitfall 1: Translation Keys Become Unmanageable Sprawl
**What goes wrong:** Translation keys proliferate without structure. You start with `t('title')`, then add `t('hero_title')`, then `t('heroSection_mainTitle')`, then someone adds `t('main-hero-title')`. After 3 weeks you have 150+ keys with no naming convention, duplicates, and orphaned keys that break the UI when removed.

**Why it happens:** No upfront namespace strategy. Developers add keys reactively as they translate components. No automated validation catches unused keys or inconsistent naming.

**Consequences:**
- Missing keys cause runtime errors (blank UI sections)
- Duplicate translations waste translation budget
- Refactoring becomes impossible (afraid to delete unused keys)
- New developers can't find the right key to use
- Translation files balloon to 1000+ lines

**Prevention:**
```typescript
// BAD: Flat structure
{
  "hero_title": "...",
  "heroSubtitle": "...",
  "main-cta": "...",
  "cta_button_hero": "..."
}

// GOOD: Hierarchical namespaces
{
  "hero": {
    "badge": {
      "virtual": "100% Virtual",
      "duration": "Programa de 4 semanas"
    },
    "title": "Construye Agentes IA",
    "subtitle": "Llevas meses jugando...",
    "cta": {
      "primary": "Reserva Tu Lugar",
      "secondary": "Ver Programa"
    }
  }
}
```

**Recommended structure:**
- Top-level: Component/section name (`hero`, `pricing`, `faq`)
- Second-level: Element type (`title`, `description`, `cta`)
- Third-level: Variants if needed (`primary`, `secondary`)

**Automation setup (Phase 1):**
- ESLint plugin: `eslint-plugin-i18next` to catch hardcoded strings
- TypeScript types: Generate types from translation JSON for autocomplete
- Pre-commit hook: Validate all keys exist in both locales

**Detection:**
- Key names have 3+ different naming conventions (camelCase, snake_case, kebab-case)
- Translation files exceed 200 lines without namespaces
- Grep finds `t('` in more than 60% of components without shared pattern

---

### Pitfall 2: Framer Motion Animations Don't Re-trigger on Language Change
**What goes wrong:** User switches language. Text changes instantly but animations don't re-play. Newly visible content appears static while previously animated elements remain animated. The page feels broken and unprofessional, especially for scroll-reveal animations that should re-trigger.

**Why it happens:** Framer Motion's `once: true` prop (used in your ScrollReveal component) prevents animations from re-running. React component state doesn't reset when i18n changes language. Animation refs maintain their "already animated" state across language switches.

**Specific to your codebase:**
```typescript
// Current ScrollReveal.tsx uses once: true
const isInView = useInView(ref, { once, margin: "-100px" });

// When language changes, isInView stays true, no re-animation
```

**Consequences:**
- Language switcher feels broken (text updates, animations don't)
- User experience is janky and unprofessional
- Scroll reveals become permanent after first view
- Hero animations (HeroSection.tsx) don't replay on language switch
- Stagger animations get desynchronized

**Prevention:**

**Phase-specific approach:**

*Phase 1 (Core Integration):*
Add language as animation key:
```typescript
// In components using motion
const { i18n } = useTranslation();

<motion.div
  key={i18n.language} // Force remount on language change
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
>
```

*Phase 2 (Animation Polish):*
Update ScrollReveal component:
```typescript
// Add language prop to force re-animation
interface ScrollRevealProps {
  // ... existing props
  animationKey?: string; // Pass i18n.language here
}

export function ScrollReveal({ animationKey, ... }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      key={animationKey} // Remounts on language change
      ref={ref}
      // ... rest of animation
    />
  );
}
```

*Phase 3 (Performance Optimization):*
Selective re-animation (not all components need to replay):
```typescript
// Only re-animate hero and visible sections
const shouldReAnimate =
  componentType === 'hero' ||
  componentType === 'cta' ||
  isCurrentlyInView;

const animationKey = shouldReAnimate ? i18n.language : undefined;
```

**Detection:**
- Record language switch in dev tools
- Observe if scroll-reveal animations replay when language changes
- Check if hero section animations re-trigger
- Test with motion debug mode: `<motion.div transition={{ duration: 2 }}` (slow down to see clearly)

---

### Pitfall 3: Missing Translation Fallbacks Cause Silent UI Breaks
**What goes wrong:** Spanish translation file is missing a key that exists in English. Instead of showing English fallback or error, the UI renders an empty string or translation key name. Users see "hero.cta.primary" as button text in production.

**Why it happens:** Default i18next config doesn't enforce strict fallback. Auto-translated JSON files have typos in key names. No validation catches missing keys before deploy. React components don't handle undefined translations gracefully.

**Consequences:**
- Production UI shows translation keys instead of text: `<button>hero.cta.primary</button>`
- Buttons without text break accessibility (screen readers can't announce)
- Layout breaks when text disappears (CSS relies on content height)
- Silent failures: No console errors, just broken UI
- SEO impact: Search engines index malformed content

**Prevention:**

**i18next configuration:**
```typescript
// Bad: Default config
i18next.init({
  lng: 'es',
  resources: { ... }
});

// Good: Strict mode with fallbacks
i18next.init({
  lng: 'es',
  fallbackLng: 'en', // Fallback to English

  // Show warnings in development
  debug: import.meta.env.DEV,

  // Return key if translation missing (easier to spot)
  returnNull: false,
  returnEmptyString: false,

  // Strict interpolation
  interpolation: {
    escapeValue: false, // React already escapes
    skipOnVariables: false, // Error on missing variables
  },

  // Namespace handling
  defaultNS: 'common',
  fallbackNS: 'common',
});
```

**TypeScript safety:**
```typescript
// Generate types from translation files
// Install: npm i -D i18next-resources-to-backend

// types/i18n.d.ts
import 'react-i18next';
import en from '../locales/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}

// Now t('invalid.key') is a TypeScript error
```

**Runtime validation (Phase 1):**
```typescript
// utils/validateTranslations.ts
export function validateTranslations(
  primary: object,
  secondary: object,
  path = ''
): string[] {
  const missing: string[] = [];

  for (const key in primary) {
    const fullPath = path ? `${path}.${key}` : key;

    if (!(key in secondary)) {
      missing.push(fullPath);
    } else if (typeof primary[key] === 'object') {
      missing.push(
        ...validateTranslations(primary[key], secondary[key], fullPath)
      );
    }
  }

  return missing;
}

// Run in tests or build script
const missingInSpanish = validateTranslations(en, es);
if (missingInSpanish.length > 0) {
  throw new Error(`Missing Spanish translations: ${missingInSpanish.join(', ')}`);
}
```

**Detection:**
- Search codebase for `{t(` and manually check if all keys exist in both locale files
- Run app in each language and scan for visible translation keys
- Console warnings in dev mode when translations missing
- E2E tests that switch languages and screenshot each section

---

### Pitfall 4: String Interpolation Breaks with Complex UI Elements
**What goes wrong:** Translation needs to include a link, bold text, or React component. Developer tries string interpolation: `t('text', { link: '<a>here</a>' })` which renders as escaped HTML. Or tries `dangerouslySetInnerHTML` which opens XSS vulnerabilities and can't include React components.

**Example from your codebase:**
```typescript
// Current component might have:
<p>Reserva tu lugar <Button>aquí</Button> antes del 31 de enero</p>

// Can't translate this as single string without breaking Button component
```

**Why it happens:** Natural language requires inline UI elements (links, bold, icons). Simple string interpolation doesn't support JSX. Teams default to dangerous solutions or split sentences awkwardly.

**Consequences:**
- XSS vulnerabilities from `dangerouslySetInnerHTML`
- Awkward text splits that sound unnatural: "Click" + \<button\> + "to continue"
- Lost context for translators (can't see full sentence)
- Can't include interactive components (buttons, tooltips) mid-sentence
- Accessibility breaks (screen readers can't understand fragmented sentences)

**Prevention:**

**Use Trans component for rich content:**
```typescript
// BAD: String interpolation with HTML
t('cta.text', { returnObjects: true })
<div dangerouslySetInnerHTML={{ __html: t('cta.html') }} />

// GOOD: Trans component with JSX
import { Trans } from 'react-i18next';

<Trans i18nKey="hero.urgency">
  Cohorte 2 · Solo <strong className="text-primary">50 lugares</strong>
</Trans>

// Translation file:
{
  "hero": {
    "urgency": "Cohorte 2 · Solo <1>50 lugares</1>"
  }
}
```

**With interactive components:**
```typescript
<Trans
  i18nKey="pricing.cta"
  components={{
    cta: <Button size="lg" />,
    link: <a href="/program" className="text-primary" />
  }}
>
  <cta>Reserva Tu Lugar</cta> o <link>ver programa completo</link>
</Trans>

// Translation:
{
  "pricing": {
    "cta": "<0>Reserva Tu Lugar</0> o <1>ver programa completo</1>"
  }
}
```

**For simple formatting:**
```typescript
// Variables and formatting
t('curriculum.duration', {
  weeks: 4,
  hours: 16,
  formatted: true
})

// Translation with formatting:
{
  "curriculum": {
    "duration": "{{weeks}} semanas · {{hours}} horas"
  }
}
```

**Phase 2 consideration:**
Document Trans component usage pattern for team. Create reusable pattern for common cases:
```typescript
// components/i18n/TransWithButton.tsx
export function TransWithButton({ i18nKey, onButtonClick }: Props) {
  return (
    <Trans
      i18nKey={i18nKey}
      components={{
        btn: <Button onClick={onButtonClick} />
      }}
    />
  );
}
```

**Detection:**
- Search for `dangerouslySetInnerHTML` in components
- Look for awkwardly split sentences with JSX in middle
- Check translation files for HTML strings
- Review any component with `<a>`, `<strong>`, `<Button>` inside translated text

---

### Pitfall 5: Language Persistence Fails or Causes Hydration Mismatches
**What goes wrong:** User selects Spanish, refreshes page, sees English flash before Spanish loads. Or localStorage language preference conflicts with browser language detection. Or SSR/SSG apps show hydration mismatch errors because server renders in English but client initializes in Spanish.

**Why it happens:** Race condition between i18next initialization and React render. LocalStorage read happens after first render. No loading state while translations load. Browser language detection overrides user preference.

**Consequences:**
- FOUC (Flash of Untranslated Content) or wrong language content
- User must re-select language on every visit
- Hydration errors in production (if using SSR)
- Animations trigger twice (once for English, once for Spanish)
- Poor performance (unnecessary re-renders)
- Accessibility: Screen readers announce wrong language

**Prevention:**

**Synchronous initialization (Vite + React):**
```typescript
// i18n/config.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations synchronously (not lazy loaded)
import en from './locales/en.json';
import es from './locales/es.json';

// Detect language BEFORE React renders
const savedLanguage = localStorage.getItem('i18n-language');
const browserLanguage = navigator.language.split('-')[0];
const initialLanguage = savedLanguage || browserLanguage || 'en';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage, // Set immediately
    fallbackLng: 'en',

    resources: {
      en: { translation: en },
      es: { translation: es }
    },

    // Critical: Don't wait for async operations
    initImmediate: true,

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18n-language',
    },
  });

export default i18next;
```

**App initialization order:**
```typescript
// main.tsx
import './i18n/config'; // Initialize i18n FIRST
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// i18n ready before React renders
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Suspense fallback (if async loading needed):**
```typescript
// App.tsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  );
}
```

**Detection:**
- Record page load, look for language flash
- Check localStorage in DevTools after language change
- Test refresh after selecting non-default language
- Test with localStorage cleared (should use browser language)
- Test with browser language = Spanish, localStorage = English (localStorage should win)

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or poor UX.

### Pitfall 6: Pluralization Rules Ignored or Implemented Incorrectly
**What goes wrong:** English text says "1 weeks" or Spanish says "1 semanas". Pluralization is hardcoded in JSX: `{count} week${count !== 1 ? 's' : ''}` which doesn't work for languages with complex plural rules (Spanish has rules for 0, 1, 2-10, 11+).

**Prevention:**
Use i18next pluralization:
```typescript
// Translation file
{
  "curriculum": {
    "duration_one": "{{count}} semana",
    "duration_other": "{{count}} semanas"
  }
}

// Component
t('curriculum.duration', { count: weeks })
```

Spanish and English both use `_one` and `_other`, but some languages need `_zero`, `_two`, `_few`, `_many`.

**Detection:**
- Search codebase for `${count !== 1 ? 's' : ''}`
- Look for hardcoded plural logic in components
- Check translation files for `_one` and `_other` suffixes

---

### Pitfall 7: Date/Number Formatting Stays English After Language Change
**What goes wrong:** Language switches to Spanish but dates show "January 23, 2026" instead of "23 de enero de 2026". Numbers show "1,234.56" instead of "1.234,56". Currency shows "$50" instead of "50 €".

**Prevention:**
Use Intl API or i18next formatting:
```typescript
// Date formatting
const { i18n } = useTranslation();
const formatted = new Intl.DateTimeFormat(i18n.language, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date());

// Number formatting
const formatted = new Intl.NumberFormat(i18n.language, {
  style: 'currency',
  currency: i18n.language === 'es' ? 'EUR' : 'USD'
}).format(1234.56);
```

Or use i18next format plugin:
```typescript
// Install: npm i i18next-browser-languagedetector

t('pricing.amount', {
  val: 1234.56,
  formatParams: {
    val: { style: 'currency', currency: 'USD' }
  }
});
```

**Phase consideration:** If no dates/numbers/currency in content, defer this. But if pricing section shows amounts, must handle in Phase 1.

**Detection:**
- Switch language and look for any numbers, dates, or currency
- Check if format changes with language

---

### Pitfall 8: Translation Files Get Out of Sync Between Locales
**What goes wrong:** English JSON has 47 keys, Spanish has 43 keys. Some keys only exist in one locale. Structure differs between files (nested in one, flat in another). Deployments break because Spanish is missing critical keys added to English last week.

**Prevention:**

**Pre-commit validation:**
```bash
# package.json scripts
{
  "scripts": {
    "validate-i18n": "node scripts/validateTranslations.js",
    "pre-commit": "npm run validate-i18n"
  }
}
```

**Validation script:**
```javascript
// scripts/validateTranslations.js
import en from '../src/locales/en.json' assert { type: 'json' };
import es from '../src/locales/es.json' assert { type: 'json' };

function compareKeys(obj1, obj2, path = '') {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const errors = [];

  // Check for missing keys
  for (const key of keys1) {
    if (!(key in obj2)) {
      errors.push(`Missing in locale 2: ${path}${key}`);
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      errors.push(...compareKeys(obj1[key], obj2[key], `${path}${key}.`));
    }
  }

  for (const key of keys2) {
    if (!(key in obj1)) {
      errors.push(`Missing in locale 1: ${path}${key}`);
    }
  }

  return errors;
}

const errors = compareKeys(en, es);
if (errors.length > 0) {
  console.error('Translation sync errors:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('✓ All translations in sync');
```

**Automated tooling:**
- Use `i18next-parser` to extract keys from code automatically
- Consider `tolgee.io` or `lokalise.com` for translation management UI
- GitHub Actions to validate on PR

**Detection:**
- Manually diff the two JSON files
- Count keys in each file
- Run validation script in CI

---

### Pitfall 9: SEO Meta Tags and Document Title Not Translated
**What goes wrong:** Page content is in Spanish but \<title\>, meta description, and Open Graph tags stay in English. Search engines index wrong language. Social media shares show English preview for Spanish link.

**Prevention:**

**React Helmet or document manipulation:**
```typescript
// components/SEO.tsx
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function SEO({ titleKey, descriptionKey }: Props) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(titleKey);
    document.documentElement.lang = i18n.language;

    // Update meta tags
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t(descriptionKey));
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t(titleKey));
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t(descriptionKey));
    }
  }, [t, i18n.language, titleKey, descriptionKey]);

  return null;
}

// Usage in page
<SEO titleKey="seo.home.title" descriptionKey="seo.home.description" />
```

**Translation file:**
```json
{
  "seo": {
    "home": {
      "title": "AgentCamp 2.0 - Construye Agentes IA en 4 Semanas",
      "description": "Programa virtual de 4 semanas para construir y desplegar agentes IA en producción sin código."
    }
  }
}
```

**Detection:**
- Switch language and check browser tab title
- View page source and check \<html lang=""\>
- Check meta description tag
- Test social share preview (Facebook debugger, Twitter card validator)

---

### Pitfall 10: Component Library (shadcn/ui) Components Not Translated
**What goes wrong:** Landing page is in Spanish but Calendar component shows "January, February, March" in English. Dialog close button says "Cancel" not "Cancelar". Form validation errors in English.

**Why it happens:** shadcn/ui components use English by default. Radix UI primitives don't have built-in i18n. Component labels and aria-labels are hardcoded.

**Prevention:**

**Wrap or configure shadcn components:**
```typescript
// components/ui/calendar-i18n.tsx
import { Calendar } from '@/components/ui/calendar';
import { useTranslation } from 'react-i18next';
import { es, en } from 'date-fns/locale';

export function CalendarI18n(props: CalendarProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'es' ? es : en;

  return <Calendar locale={locale} {...props} />;
}
```

**Button labels:**
```typescript
// Instead of hardcoded:
<Button>Cancel</Button>

// Use translation:
<Button>{t('common.cancel')}</Button>
```

**Form validation with zod:**
```typescript
// Use i18next with zod error map
import { zodI18nMap } from 'zod-i18n-map';
import { z } from 'zod';

z.setErrorMap(zodI18nMap);

// Translation file needs zod error messages
{
  "zod": {
    "errors": {
      "invalid_type": "Tipo inválido",
      "required": "Campo requerido"
    }
  }
}
```

**Phase consideration:** Audit which UI components have English text. If only using Button, Badge (no forms or calendars), this is minimal work.

**Detection:**
- Switch to Spanish and interact with every UI component
- Look for English text in buttons, labels, placeholders
- Test form validation errors
- Check calendar/date picker month names

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable.

### Pitfall 11: Language Switcher UI/UX Issues
**What goes wrong:** Language switcher in corner is tiny and hard to find. No visual feedback when language changes. Unclear which language is active. Accessibility: no keyboard navigation or screen reader labels.

**Prevention:**
- Clear active state: highlight current language
- Loading indicator during switch (if async)
- Accessible: aria-label, keyboard navigation
- Position prominently (navbar, top-right)

```typescript
<Button
  variant={i18n.language === 'es' ? 'default' : 'ghost'}
  onClick={() => i18n.changeLanguage('es')}
  aria-label="Cambiar a español"
  aria-pressed={i18n.language === 'es'}
>
  ES
</Button>
```

---

### Pitfall 12: Console Warnings from i18next in Development
**What goes wrong:** Console flooded with i18next warnings during development. Makes it hard to spot real errors.

**Prevention:**
```typescript
i18next.init({
  debug: false, // or import.meta.env.MODE === 'test'
  // Keep false unless actively debugging i18n
});
```

Only enable when debugging translation issues.

---

### Pitfall 13: Text Length Differences Break Layout
**What goes wrong:** English button says "Join" (4 chars), Spanish says "Reserva Tu Lugar" (16 chars). Button wraps to two lines or overflows container. German text even longer.

**Prevention:**
- Use flexible layouts (flexbox, grid with auto-sizing)
- Test both languages for layout breaks
- Avoid fixed widths on text containers
- Use `text-overflow: ellipsis` or `line-clamp` for long text

```css
/* Allow buttons to grow */
.button {
  min-width: 120px; /* Accommodate longer text */
  white-space: nowrap;
}

/* Or allow wrapping */
.button {
  white-space: normal;
  text-align: center;
}
```

**Phase 2 consideration:** Once translations complete, do visual regression testing in both languages.

**Detection:**
- Switch language and look for layout shifts
- Check if buttons wrap or overflow
- Test on mobile (narrower width)

---

## Phase-Specific Warnings

Mapping pitfalls to implementation phases.

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: Core i18n Setup | Pitfall 1 (Key sprawl), Pitfall 3 (Missing fallbacks), Pitfall 5 (Persistence) | Establish namespace structure, configure strict mode, synchronous init |
| Phase 2: Component Integration | Pitfall 2 (Animation re-trigger), Pitfall 4 (String interpolation), Pitfall 10 (UI components) | Add language keys to animations, use Trans component, audit shadcn usage |
| Phase 3: Content Translation | Pitfall 8 (Sync issues), Pitfall 13 (Text length) | Pre-commit validation, visual regression testing |
| Phase 4: Polish & SEO | Pitfall 7 (Date/number format), Pitfall 9 (SEO meta tags), Pitfall 11 (Switcher UX) | Intl API integration, SEO component, accessible switcher |

---

## Confidence Assessment

| Area | Confidence | Source |
|------|-----------|--------|
| react-i18next pitfalls | HIGH | Personal knowledge from training data (common patterns), codebase analysis |
| Framer Motion + i18n | MEDIUM | Analyzed your ScrollReveal component, training data on animation re-trigger issues |
| Vite configuration | HIGH | Analyzed your vite.config.ts, standard Vite + React patterns |
| shadcn/ui i18n | MEDIUM | Reviewed your package.json dependencies, common Radix UI i18n challenges |
| Project-specific risks | HIGH | Read HeroSection.tsx and ScrollReveal.tsx to identify specific integration points |

---

## Sources

**Codebase Analysis:**
- `/Users/mel/code/frutero/agentcamp-2.0-landing/src/components/landing/HeroSection.tsx` - Framer Motion animation patterns
- `/Users/mel/code/frutero/agentcamp-2.0-landing/src/components/ui/scroll-reveal.tsx` - ScrollReveal component with `once: true` flag
- `/Users/mel/code/frutero/agentcamp-2.0-landing/package.json` - Stack verification (Framer Motion, shadcn/ui, Radix UI)
- `/Users/mel/code/frutero/agentcamp-2.0-landing/vite.config.ts` - Vite configuration

**Knowledge Base:**
- react-i18next common patterns and pitfalls (from training)
- Framer Motion animation lifecycle and key-based remounting
- Vite + React i18n integration patterns
- shadcn/ui and Radix UI internationalization challenges

**Note:** WebSearch was unavailable for this research session. All findings based on codebase analysis and existing knowledge from training data. Confidence levels reflect this limitation. Recommend verifying specific implementation details against current react-i18next and Framer Motion documentation during implementation.
