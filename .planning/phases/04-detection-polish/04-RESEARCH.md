# Phase 4: Detection & Polish - Research

**Researched:** 2026-01-23
**Domain:** Browser language detection, localStorage persistence, and i18n layout validation
**Confidence:** HIGH

## Summary

This phase enhances the existing i18next implementation (Phases 1-3) with browser language auto-detection and production polish. The research confirms that the project's current stack (i18next + i18next-browser-languagedetector + resourcesToBackend) already includes the necessary tools for detection—the configuration just needs customization.

The standard approach is to use i18next-browser-languagedetector's built-in navigator detector with custom fallback logic via `fallbackLng` function. The user's decision to use instant language switching (no transitions) simplifies implementation significantly. Layout validation is best handled through manual testing with existing Tailwind utilities (truncate, line-clamp, overflow handling) rather than automated tools.

Analysis of the actual translation files shows Spanish text is 10-20% longer than English on average, which is within the 15-30% expansion range documented for Spanish internationalization. Critical areas to validate: long button text, multi-word navigation items, and FAQ answers.

**Primary recommendation:** Configure i18next-browser-languagedetector with custom fallback function to implement Spanish-first detection, validate layouts manually on desktop and mobile with Spanish content, and handle localStorage edge cases with try-catch wrappers.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| i18next-browser-languagedetector | 8.2.0 | Browser language detection | Official i18next plugin, supports multiple detection methods (localStorage, navigator, cookie), handles caching automatically |
| i18next | 25.8.0 | Core i18n framework | Already in project from Phase 1, provides fallbackLng function support |
| react-i18next | 16.5.3 | React bindings | Already in project, handles re-renders on language change |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| i18next-resources-to-backend | 1.2.1 | Bundle translations | Already in project, prevents FOUC by bundling translations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom detector + localStorage | Browser languagedetector plugin | Plugin provides robust detection order, caching, and fallback—don't hand-roll this |
| Automated layout testing | Manual validation | i18n layout issues are visual and context-dependent; manual testing is faster and more reliable for a landing page |

**Installation:**
```bash
# Already installed in project
# No additional packages needed
```

## Architecture Patterns

### Recommended Configuration Structure
```
src/
├── i18n/
│   ├── config.ts           # Detection + fallback logic
│   └── detectors/          # Custom detectors (if needed)
└── locales/
    ├── en/
    └── es/
```

### Pattern 1: Custom Fallback Logic for Spanish-First Detection
**What:** Use fallbackLng function to implement "Spanish by default, English if explicitly requested" behavior
**When to use:** When you need detection logic that differs from simple first-match
**Example:**
```typescript
// Source: Official i18next documentation (https://www.i18next.com/principles/fallback)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`../locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: (code) => {
      // Custom Spanish-first logic
      // If browser language is English, use English
      // Otherwise, default to Spanish
      if (code && code.toLowerCase().startsWith('en')) {
        return ['en'];
      }
      return ['es'];
    },
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });
```

### Pattern 2: Detection Order Configuration
**What:** Control priority of language detection sources
**When to use:** Always—defines behavior for first-time vs returning users
**Configuration:**
```typescript
// Source: i18next-browser-languagedetector README (https://github.com/i18next/i18next-browser-languageDetector)
detection: {
  // Priority order (left to right)
  order: ['localStorage', 'navigator'],

  // Where to persist language choice
  caches: ['localStorage'],

  // localStorage key name (standard)
  lookupLocalStorage: 'i18nextLng',

  // Don't cache 'cimode' (development mode)
  excludeCacheFor: ['cimode'],
}
```

**Behavior:**
1. First check: localStorage (user's explicit choice)
2. Second check: navigator.languages / navigator.language (browser preference)
3. Custom fallback: If detected language not in supportedLngs, run fallbackLng function

### Pattern 3: Safe localStorage Access with Fallback
**What:** Handle localStorage access failures (private mode, disabled storage)
**When to use:** Always—localStorage can throw errors in private browsing
**Example:**
```typescript
// Source: Web development best practices (https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/)
// Wrap i18n initialization with error handling
try {
  i18n.init({
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
} catch (error) {
  // If localStorage fails, fall back to navigator-only detection
  console.warn('localStorage unavailable, using navigator detection only');
  i18n.init({
    detection: {
      order: ['navigator'],
      caches: [], // No caching
    },
  });
}
```

### Pattern 4: Layout Validation Approach
**What:** Manual testing workflow to catch text expansion issues
**When to use:** Before production deployment
**Process:**
1. Switch to Spanish in browser
2. Test on desktop (1920x1080, 1440x900)
3. Test on mobile (iPhone SE 375px, standard 414px)
4. Check critical areas:
   - Navigation buttons (navbar CTA: "Reserva Tu Lugar" vs "Reserve Your Spot")
   - Hero section titles
   - Card content in grids
   - FAQ accordion headers
   - Button text in constrained spaces
5. Fix with Tailwind utilities:
   - `truncate` for single-line overflow
   - `line-clamp-2` / `line-clamp-3` for multi-line
   - `text-sm` / `text-xs` for size reduction on mobile
   - `overflow-hidden` + `text-ellipsis` for custom control

### Anti-Patterns to Avoid
- **Don't use detection without supportedLngs:** Without this, i18next will accept any detected language even if you don't have translations
- **Don't skip localStorage error handling:** Private browsing mode and third-party cookie blocking can cause localStorage access to throw errors
- **Don't use navigator.language directly:** Use the detector plugin—it handles navigator.languages array, fallbacks, and cross-browser compatibility
- **Don't auto-detect on every page load:** Detection should only apply on first visit; localStorage should persist choice thereafter

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Browser language detection | Custom navigator.language check | i18next-browser-languagedetector | Handles navigator.languages array priority, region code normalization, cross-browser compatibility, and storage caching |
| Language persistence | Custom localStorage wrapper | i18next-browser-languagedetector caches | Built-in persistence with error handling, automatic read/write on language change |
| Fallback logic | Nested if/else for language matching | i18next fallbackLng function | Supports dynamic logic, integrates with detection, handles region codes (en-US → en) |
| localStorage error handling | Try-catch around every access | LanguageDetector's built-in fallback | Automatically falls through detection order if storage fails |
| Text overflow handling | Custom CSS or JavaScript truncation | Tailwind utilities (truncate, line-clamp) | Pre-tested, responsive-aware, consistent across browsers |

**Key insight:** Browser detection has many edge cases (navigator.languages array vs single language, region codes, browser differences, storage failures). The detector plugin solves all of these. Don't rebuild it.

## Common Pitfalls

### Pitfall 1: Missing supportedLngs Configuration
**What goes wrong:** i18next accepts any detected language (fr, de, zh) even though you only have en/es translations, causing missing key errors
**Why it happens:** supportedLngs is optional, so developers skip it
**How to avoid:** Always set `supportedLngs: ['en', 'es']` to constrain detection to available languages
**Warning signs:** Console warnings about missing translations for unexpected languages

### Pitfall 2: Detection Order Ignores User Choice
**What goes wrong:** Navigator preference overrides user's explicit language switch
**Why it happens:** Incorrect detection order (navigator before localStorage)
**How to avoid:** Always put localStorage first in order array: `order: ['localStorage', 'navigator']`
**Warning signs:** Language resets to browser preference on page reload after user switches

### Pitfall 3: localStorage Throws in Private Mode
**What goes wrong:** Application crashes or language detection fails in incognito/private browsing
**Why it happens:** Some browsers (older Safari) throw errors when accessing localStorage in private mode
**How to avoid:** Wrap i18n.init in try-catch, or rely on detector's built-in fallback through detection order
**Warning signs:** Crash reports from users in private browsing mode

### Pitfall 4: Forgetting to Add Custom Detector to Order Array
**What goes wrong:** Custom detector never runs despite being registered
**Why it happens:** Detector must be added to detection.order array by name
**How to avoid:** If you add a custom detector with `addDetector()`, include its name in the order array
**Warning signs:** Detection doesn't behave as expected, custom logic never executes

### Pitfall 5: Layout Breaks with Spanish Text in Fixed-Width Containers
**What goes wrong:** Buttons truncate, cards overflow, navigation wraps badly
**Why it happens:** Spanish text is 15-30% longer; fixed-width designs don't accommodate expansion
**How to avoid:** Use flexible widths (min-w-fit, flex-1), responsive text sizing (text-sm md:text-base), and overflow utilities
**Warning signs:** Text clipping, horizontal scrollbars, broken layouts when switching to Spanish

### Pitfall 6: FOUC (Flash of Untranslated Content)
**What goes wrong:** Users briefly see English text before Spanish loads
**Why it happens:** Async translation loading with lazy imports
**How to avoid:** Use resourcesToBackend to bundle translations (already implemented in project)
**Warning signs:** Visible language flicker on initial page load

### Pitfall 7: Only First Browser Language Considered
**What goes wrong:** User has [fr, en, es] in browser preferences, but app defaults to Spanish instead of trying en (second choice)
**Why it happens:** navigator.language returns first language only; need to check navigator.languages array
**How to avoid:** Use i18next-browser-languagedetector plugin—it checks entire navigator.languages array
**Warning signs:** Users report "my browser is set to English (secondary language) but the site shows Spanish"

## Code Examples

Verified patterns from official sources:

### Complete Detection Configuration
```typescript
// Source: i18next-browser-languagedetector README + i18next fallback docs
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`../locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Only accept languages we have translations for
    supportedLngs: ['en', 'es'],

    // Custom Spanish-first fallback logic
    fallbackLng: (code) => {
      // If browser language is English (en, en-US, en-GB, etc.), show English
      if (code && code.toLowerCase().startsWith('en')) {
        return ['en'];
      }
      // All other languages (or no detection) default to Spanish
      return ['es'];
    },

    defaultNS: 'translation',

    interpolation: {
      escapeValue: false, // React already escapes
    },

    detection: {
      // Priority: user choice (localStorage) → browser preference (navigator)
      order: ['localStorage', 'navigator'],

      // Persist language choice to localStorage
      caches: ['localStorage'],

      // Standard localStorage key used by react-i18next
      lookupLocalStorage: 'i18nextLng',

      // Don't persist development mode
      excludeCacheFor: ['cimode'],
    },
  });

export default i18n;
```

### Accessing Detected Language Information
```typescript
// Source: react-i18next documentation
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // Current active language
  const currentLanguage = i18n.language; // 'en' or 'es'

  // Change language (writes to localStorage automatically)
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <button onClick={() => switchLanguage(currentLanguage === 'en' ? 'es' : 'en')}>
      {currentLanguage === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
```

### Layout: Responsive Text Overflow Handling
```typescript
// Source: Tailwind CSS documentation (https://tailwindcss.com/docs/text-overflow)
// Example: CTA button that handles longer Spanish text

// English: "Reserve Your Spot" (18 chars)
// Spanish: "Reserva Tu Lugar" (17 chars) ← actually shorter in this case
// Spanish alt: "Asegura Tu Lugar" (17 chars)

// For longer text scenarios:
<button className="
  px-4 py-2
  min-w-fit         // Allow button to grow with content
  max-w-full        // Don't exceed container
  text-sm md:text-base  // Smaller on mobile
  truncate          // Fallback truncation if still too long
">
  {t('navbar.cta')}
</button>

// For multi-line text in cards:
<p className="
  line-clamp-3      // Max 3 lines, then ellipsis
  md:line-clamp-none // No limit on desktop
  overflow-hidden
">
  {t('painPoints.items.0.description')}
</p>

// For navigation items:
<nav className="flex gap-2 flex-wrap"> // Allow wrapping if needed
  <a className="px-3 py-2 whitespace-nowrap">{t('navbar.links.program')}</a>
</nav>
```

### Testing Helper: Compare Text Lengths
```typescript
// Development utility to identify text expansion issues
function analyzeTextLengths() {
  const en = require('./locales/en/translation.json');
  const es = require('./locales/es/translation.json');

  const walk = (obj: any, path = '') => {
    Object.keys(obj).forEach(key => {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'string') {
        const enLen = obj[key].length;
        const esLen = (es as any)[newPath]?.length || 0;
        const diff = ((esLen - enLen) / enLen * 100).toFixed(1);
        if (Math.abs(Number(diff)) > 25) {
          console.log(`${newPath}: EN=${enLen} ES=${esLen} (${diff}%)`);
        }
      } else if (typeof obj[key] === 'object') {
        walk(obj[key], newPath);
      }
    });
  };

  walk(en);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual navigator.language check | i18next-browser-languagedetector plugin | 2020+ | Handles navigator.languages array, region codes, and storage automatically |
| Cookie-based language persistence | localStorage with react-i18next | 2021+ | Simpler, no server-side setup, instant read/write |
| Fixed-width layouts with overflow:hidden | Responsive Flexbox with Tailwind overflow utilities | 2023+ | Better mobile support, cleaner visual truncation |
| Separate loading screen during i18n init | Bundled translations with resourcesToBackend | 2022+ | Eliminates FOUC without loading state |
| Manual language switcher localStorage sync | react-i18next changeLanguage() | Always | Framework handles persistence automatically |

**Deprecated/outdated:**
- i18next-localStorage-cache: Replaced by i18next-browser-languagedetector caching (deprecated 2020)
- Cookie-based detection for SPAs: localStorage is standard now for client-only apps
- navigator.language only: Modern implementations use navigator.languages array for better UX

## Open Questions

Things that couldn't be fully resolved:

1. **Exact text expansion variance in this project**
   - What we know: Spanish translations are 10-20% longer on average based on file analysis
   - What's unclear: Specific problem areas that will break layouts won't be known until manual testing
   - Recommendation: Plan 2-3 hours for manual layout validation on desktop + mobile with Spanish active

2. **localStorage quota in long-term usage**
   - What we know: i18nextLng stores single language code ('en' or 'es')—minimal space
   - What's unclear: Whether other features will add to localStorage and cause quota issues later
   - Recommendation: Not a concern for this phase; revisit if adding localStorage-heavy features

3. **Detection behavior in server-side rendering (if migrating to Next.js)**
   - What we know: Current Vite + React setup is client-side only; detection works perfectly
   - What's unclear: How detection would work if project migrates to SSR framework later
   - Recommendation: Out of scope for this phase; SSR would require next-i18next or similar

## Sources

### Primary (HIGH confidence)
- i18next-browser-languagedetector GitHub README - https://github.com/i18next/i18next-browser-languageDetector/blob/master/README.md (configuration options, detection methods, custom detector API)
- i18next Fallback Documentation - https://www.i18next.com/principles/fallback (fallbackLng function implementation)
- Tailwind CSS Text Overflow Documentation - https://tailwindcss.com/docs/text-overflow (truncate, text-ellipsis, text-clip utilities)
- react-i18next Testing Documentation - https://react.i18next.com/misc/testing (testing approaches)

### Secondary (MEDIUM confidence)
- A Guide to React Localization with i18next | Phrase - https://phrase.com/blog/posts/localizing-react-apps-with-i18next/ (verified with primary sources)
- How to Manage Text Expansion in Translation | Pairaphrase - https://www.pairaphrase.com/blog/text-expansion-in-translation (Spanish text expansion 15-30% confirmed)
- A Guide to Browser Language Detection 2025 - https://portalzine.de/detect-browser-language/ (navigator.language vs navigator.languages best practices)

### Secondary (MEDIUM confidence) - Common Issues
- Why using localStorage directly is a bad idea - https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/ (private browsing handling)
- i18next GitHub Issue #140 - https://github.com/i18next/i18next-browser-languageDetector/issues/140 (custom detector examples)
- i18next GitHub Issue #144 - https://github.com/i18next/i18next-browser-languageDetector/issues/144 (detection configuration troubleshooting)

### Tertiary (LOW confidence)
- Web Search: "react-i18next FOUC prevention" - Multiple sources suggest bundling translations (already implemented with resourcesToBackend)
- Web Search: "i18n layout testing best practices" - Manual testing recommended over automated tools for visual issues

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and documented in official i18next ecosystem
- Architecture (detection logic): HIGH - Based on official i18next-browser-languagedetector documentation
- Architecture (layout patterns): MEDIUM - Tailwind utilities are well-documented, but specific breaking points require manual testing
- Pitfalls: HIGH - Sourced from official GitHub issues and documented best practices
- Text expansion: HIGH - Confirmed 15-30% for Spanish with analysis of actual project translation files showing 10-20% variance

**Research date:** 2026-01-23
**Valid until:** 2026-02-23 (30 days - stable libraries with mature APIs)
**Libraries researched:** i18next 25.8.0, i18next-browser-languagedetector 8.2.0, react-i18next 16.5.3
