# Architecture Patterns: React i18n Integration

**Domain:** React application internationalization
**Researched:** January 23, 2026
**Confidence:** MEDIUM (based on training knowledge, external verification unavailable)

## Recommended Architecture

React i18n systems follow a provider-hook pattern with centralized configuration and component-level translation access.

```
App Layer (Providers)
├── I18nextProvider (or direct i18n instance)
│   └── Context available to all children
│
Component Layer
├── useTranslation() hook → accesses context
├── Trans component → for JSX interpolation
└── Language Switcher → triggers i18n.changeLanguage()

Configuration Layer
├── i18n.ts (initialization)
├── /locales
│   ├── /en/translation.json
│   └── /es/translation.json
└── Type definitions (optional)
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **I18nextProvider** | Provides i18n instance via React Context | All child components |
| **i18n.ts config** | Initializes i18next instance, loads resources, sets defaults | I18nextProvider |
| **useTranslation() hook** | Accesses translation function (t), current language, change language function | I18nextProvider context |
| **Trans component** | Renders translations with JSX interpolation (bold, links, etc.) | I18nextProvider context |
| **Language Switcher** | UI control to trigger language changes | i18n.changeLanguage() API |
| **Translation files** | JSON files with key-value translation pairs | i18n backend/resource loader |

### Data Flow

**Initialization Flow:**
1. `i18n.ts` configures i18next with languages, fallback, resources
2. App.tsx wraps application with I18nextProvider (or imports i18n instance)
3. Provider makes i18n instance available via React Context
4. Components mount and access context via hooks

**Translation Access Flow:**
1. Component calls `useTranslation()` hook
2. Hook returns `{ t, i18n }` from context
3. Component renders `t('key')` in JSX
4. i18n resolves key from current language's resource file
5. Translated string rendered to DOM

**Language Change Flow:**
1. User clicks language switcher
2. Switcher calls `i18n.changeLanguage('es')`
3. i18n instance updates internal state
4. Context provider re-renders (triggers subscribers)
5. All components using `useTranslation()` re-render with new translations

**Resource Loading Flow (lazy loading):**
1. User changes to language not yet loaded
2. i18n triggers backend plugin to fetch resources
3. Backend loads `/locales/es/translation.json`
4. Resources added to i18n instance
5. Translation functions now return Spanish strings

## Patterns to Follow

### Pattern 1: Centralized i18n Configuration
**What:** Single `i18n.ts` file that initializes i18next before React mounts
**When:** Always (standard pattern)
**Example:**
```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
```

**Integration point:** Import `./i18n` in `main.tsx` or `App.tsx` before rendering.

### Pattern 2: Provider at App Root
**What:** I18nextProvider wraps entire application (or import i18n in entry point)
**When:** Always for react-i18next
**Example:**
```typescript
// src/App.tsx
import './i18n'; // Initialize before rendering

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* i18n context automatically available */}
      <BrowserRouter>
        <Routes>...</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Note:** With react-i18next v11+, simply importing `i18n.ts` is sufficient. The `I18nextProvider` component is only needed if you want to pass a different i18n instance than the global one.

**Integration point for AgentCamp:** Add `import './i18n';` at top of App.tsx, before all other imports.

### Pattern 3: Hook-Based Translation Access
**What:** Components use `useTranslation()` hook to access translation function
**When:** In all components needing translations
**Example:**
```typescript
// src/components/landing/HeroSection.tsx
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
};
```

**Integration point:** Replace hardcoded strings with `t('namespace.key')` calls.

### Pattern 4: Namespace Organization
**What:** Group related translations in separate files/namespaces
**When:** For larger applications with many sections
**Example:**
```
/locales
  /en
    /translation.json (common/shared)
    /landing.json (landing page specific)
    /curriculum.json (curriculum specific)
  /es
    /translation.json
    /landing.json
    /curriculum.json
```

```typescript
// Use namespace in hook
const { t } = useTranslation('landing');
t('hero.title'); // Loads from landing.json
```

**Integration point for AgentCamp:** Consider single `translation.json` for MVP, namespace later if file grows large.

### Pattern 5: Language Switcher Component
**What:** Reusable component that displays current language and allows switching
**When:** In Navbar or global UI
**Example:**
```typescript
// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};
```

**Integration point for AgentCamp:** Add to Navbar component, likely as a button or dropdown in the header.

### Pattern 6: Trans Component for Rich Content
**What:** Use `<Trans>` component when translations contain HTML/JSX
**When:** Translations need bold, links, or other formatting
**Example:**
```typescript
import { Trans } from 'react-i18next';

// translation.json: "agree": "I agree to the <bold>terms</bold> and <link>privacy policy</link>"

<Trans
  i18nKey="agree"
  components={{
    bold: <strong />,
    link: <a href="/privacy" />
  }}
/>
```

**Integration point for AgentCamp:** Use for sections with formatted text (testimonials, CTAs with links).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Direct i18n Instance Import in Components
**What:** Importing i18n instance directly instead of using hooks
**Why bad:**
- Breaks React's reactivity (component won't re-render on language change)
- Bypasses Suspense integration
- Makes testing harder (can't mock context)
**Instead:** Always use `useTranslation()` hook in functional components

**Example of what NOT to do:**
```typescript
// BAD
import i18n from './i18n';
const title = i18n.t('hero.title'); // Won't re-render on language change
```

**Correct approach:**
```typescript
// GOOD
const { t } = useTranslation();
const title = t('hero.title'); // Re-renders on language change
```

### Anti-Pattern 2: Inline Translation Objects
**What:** Defining translations directly in components
**Why bad:**
- Defeats purpose of i18n (can't change translations without code changes)
- Makes translation management impossible
- Can't leverage translation tools or services
**Instead:** Always use external JSON/resource files

### Anti-Pattern 3: String Concatenation for Dynamic Content
**What:** Building translated sentences by concatenating translated parts
**Why bad:**
- Grammar/word order differs across languages
- Impossible for translators to see full context
- Results in broken translations
**Instead:** Use interpolation with placeholders

**Example of what NOT to do:**
```typescript
// BAD - word order is English-specific
const message = t('hello') + ' ' + userName + ', ' + t('welcome');
```

**Correct approach:**
```typescript
// GOOD - translator can rearrange order
// translation.json: "greeting": "Hello {{name}}, welcome!"
const message = t('greeting', { name: userName });
```

### Anti-Pattern 4: Not Using Fallback Language
**What:** Omitting `fallbackLng` configuration
**Why bad:**
- Missing translations show keys instead of readable text
- Poor UX when translation incomplete
- Harder to debug what's missing
**Instead:** Always configure fallback (usually English)

### Anti-Pattern 5: Loading All Languages Upfront
**What:** Bundling all translation files in initial JS bundle
**Why bad:**
- Increases initial bundle size unnecessarily
- User only needs one language at a time
- Slower page load
**Instead:** Use lazy loading with i18next-http-backend or dynamic imports

**For small projects like AgentCamp:** Initial bundle inclusion is acceptable if total translation size is < 50KB. For larger projects, lazy load.

## Integration with Existing Architecture

### AgentCamp-Specific Integration Points

**Current Architecture:**
```typescript
// App.tsx structure
<QueryClientProvider>
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
```

**Proposed i18n Integration:**
```typescript
// App.tsx with i18n
import './i18n'; // Import at top to initialize

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Why this works:**
- i18n instance is global once initialized
- No additional provider nesting needed (react-i18next v11+ uses module-level instance)
- Compatible with existing provider stack
- No conflicts with QueryClient, Router, or UI providers

**Component Integration Example:**

**Before:**
```typescript
// HeroSection.tsx
export const HeroSection = () => {
  return (
    <h1 className="text-5xl">
      Build AI Agents That Actually Ship
    </h1>
  );
};
```

**After:**
```typescript
// HeroSection.tsx
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <h1 className="text-5xl">
      {t('hero.title')}
    </h1>
  );
};
```

**Translation file:**
```json
// locales/en/translation.json
{
  "hero": {
    "title": "Build AI Agents That Actually Ship"
  }
}

// locales/es/translation.json
{
  "hero": {
    "title": "Construye Agentes de IA Que Realmente Funcionan"
  }
}
```

## Build Order Implications

### Phase 1: Foundation Setup
**Goal:** Establish i18n infrastructure without breaking existing functionality

1. Install dependencies (`i18next`, `react-i18next`, optional: `i18next-browser-languagedetector`)
2. Create `src/i18n.ts` with minimal configuration
3. Create `/locales/en/translation.json` with empty object `{}`
4. Import `i18n.ts` in App.tsx
5. Verify app still works (no translations yet)

**Why this order:** Sets up infrastructure safely. App continues to work with hardcoded strings.

### Phase 2: Translation File Structure
**Goal:** Create translation files for all existing content

1. Audit all components for user-facing strings
2. Design translation key structure (`section.element.variant`)
3. Extract English strings to `/locales/en/translation.json`
4. Create parallel `/locales/es/translation.json` (copy structure, mark for translation)
5. Verify JSON is valid and matches key structure

**Why this order:** Having all keys defined prevents runtime errors during component updates. Parallel structure makes translation handoff clearer.

### Phase 3: Component Integration
**Goal:** Replace hardcoded strings with translation hooks

**Suggested order:**
1. Start with simple components (Footer, simpler sections)
2. Move to complex components (HeroSection, PricingSection)
3. Save Navbar for last (needs language switcher integration)

**Why this order:**
- Simple components = practice with pattern, lower risk
- Complex components = apply learnings from simple ones
- Navbar = needs switcher component, so integrate translations and switcher together

**Per-component steps:**
1. Import `useTranslation` hook
2. Call hook: `const { t } = useTranslation();`
3. Replace string with `t('key')`
4. Test component renders correctly
5. Test language switching (manual change in devtools)

### Phase 4: Language Switcher UI
**Goal:** User can switch languages via UI

1. Create `LanguageSwitcher.tsx` component
2. Style to match existing Navbar design
3. Integrate into Navbar component
4. Test language switching updates all components
5. Test language preference persists (if using LanguageDetector)

**Why last:** Switcher is most visible feature. Want all translations working before exposing to user.

### Phase 5: Polish & Optimization
**Goal:** Production-ready i18n

1. Add loading states (if lazy loading translations)
2. Add language detector configuration (browser, localStorage)
3. Add TypeScript types (if using typed translations)
4. Test all sections in both languages
5. Verify no hardcoded strings remain

## Scalability Considerations

| Concern | At 2 languages (MVP) | At 5+ languages | At 10+ languages |
|---------|---------------------|-----------------|------------------|
| **File organization** | Single translation.json per language | Consider namespaces (landing.json, curriculum.json) | Namespace + lazy loading per section |
| **Loading strategy** | Bundle all translations | Bundle primary, lazy load others | Lazy load all non-primary, code-split by route |
| **Translation management** | Manual JSON editing | Consider translation management UI | Use translation service (Lokalise, Crowdin) with API sync |
| **Type safety** | Optional | Recommended (typed translation keys) | Required (prevents missing key bugs) |
| **Testing** | Manual QA in each language | Automated tests for key existence | Automated translation coverage reports |
| **CI/CD** | None needed | Lint for missing keys | Automated translation completeness checks |

**For AgentCamp (2 languages):** Manual JSON editing is fine. No need for namespaces or lazy loading. Bundle all translations in initial load.

## Architecture Decision Records

### ADR 1: Use react-i18next over alternatives
**Context:** Multiple i18n solutions exist (react-intl, LinguiJS, react-i18next)
**Decision:** Use react-i18next
**Rationale:**
- Most popular (36K+ GitHub stars, widely adopted)
- Excellent React integration (hooks, Suspense support)
- Mature ecosystem (plugins for language detection, lazy loading)
- Good TypeScript support
- Compatible with Vite (no special configuration needed)

**Confidence:** HIGH (based on training data, industry standard)

### ADR 2: Initialize i18n at module level (not via provider)
**Context:** react-i18next v11+ allows module-level instance vs explicit I18nextProvider
**Decision:** Use module-level initialization (import i18n.ts in App.tsx)
**Rationale:**
- Simpler (one less provider wrapper)
- Same functionality (context still available to hooks)
- Less nesting in App.tsx
- Standard modern pattern

**Confidence:** MEDIUM (based on training, unable to verify current v13+ best practices)

### ADR 3: Single translation file per language (no namespaces)
**Context:** Could split translations into multiple files (landing.json, curriculum.json, etc.)
**Decision:** Single translation.json per language
**Rationale:**
- AgentCamp is single-page landing (not multi-route app)
- Total translation size likely < 50KB
- Simpler structure for 2 languages
- Can namespace later if needed (non-breaking change)

**Confidence:** HIGH (appropriate for project scale)

### ADR 4: Bundle translations (no lazy loading)
**Context:** Could lazy-load translation files on language change
**Decision:** Bundle all translations in initial load
**Rationale:**
- Only 2 languages = small bundle impact
- Simpler implementation (no loading states needed)
- Better UX (instant language switching)
- Can add lazy loading later if adding many languages

**Confidence:** HIGH (standard for small translation sets)

### ADR 5: Add language detector for browser preference
**Context:** Could require user to manually select language or auto-detect
**Decision:** Use i18next-browser-languagedetector plugin
**Rationale:**
- Better UX (auto-detects browser language)
- Respects user preference
- Persists selection in localStorage
- Minimal code (plugin handles detection logic)

**Confidence:** MEDIUM (standard pattern, but optional dependency)

## Testing Implications

### Unit Testing Components with i18n

Components using `useTranslation()` need i18n context in tests.

**Pattern:**
```typescript
// test-utils.tsx
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n-for-tests';

export const renderWithI18n = (component) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

// HeroSection.test.tsx
import { renderWithI18n } from './test-utils';

test('renders hero title', () => {
  const { getByText } = renderWithI18n(<HeroSection />);
  expect(getByText(/Build AI Agents/)).toBeInTheDocument();
});
```

### E2E Testing Language Switching

**Playwright example:**
```typescript
test('switching language updates content', async ({ page }) => {
  await page.goto('/');

  // Verify English content
  await expect(page.locator('h1')).toContainText('Build AI Agents');

  // Switch to Spanish
  await page.selectOption('[data-testid="language-switcher"]', 'es');

  // Verify Spanish content
  await expect(page.locator('h1')).toContainText('Construye Agentes');
});
```

## Performance Considerations

### Bundle Size Impact

**Before i18n:**
- App bundle: ~100KB (example)

**After i18n (2 languages, bundled):**
- i18next: ~10KB
- react-i18next: ~5KB
- Translation files: ~5-10KB per language (depends on content)
- **Total added:** ~25-30KB

**Mitigation if needed:**
- Lazy load non-primary languages (saves ~5-10KB on initial load)
- Use dynamic imports for translation files
- Only load active language until user switches

### Runtime Performance

**Translation lookup:** O(1) - hash map lookup by key
**Language switching:** Re-renders all components using `useTranslation()` hook
**Memory footprint:** Minimal - translations are static JSON objects

**Optimization if needed:**
- Use React.memo() on components that don't need to re-render on language change
- Memoize expensive computed translations with useMemo()

## Developer Experience

### DX Improvements

1. **Centralized content:** All user-facing strings in one place (easier to audit, update)
2. **Type safety (optional):** Can generate TypeScript types from translation JSON
3. **Hot reload:** Vite detects translation file changes and hot-reloads
4. **Consistent pattern:** All components use same `t()` function

### DX Challenges

1. **Key naming:** Requires upfront thought about structure (section.element.variant)
2. **Context loss:** Strings in JSON files lack component context (solve with comments or key naming)
3. **Testing complexity:** Need to provide i18n context in tests
4. **Debugging:** Translation key errors show in console, not compile-time (unless using TypeScript types)

### Recommended Tooling

1. **VSCode extension:** i18n Ally (shows translations inline in code)
2. **Linting:** eslint-plugin-i18next (catches missing keys, unused translations)
3. **Type generation:** i18next-parser (generates types from JSON files)

**For AgentCamp MVP:** VSCode extension recommended, linting optional, types optional.

## Migration Path (Current → i18n)

### Step-by-step migration strategy

**Week 1: Setup**
- Install dependencies
- Create i18n.ts
- Create translation file structure
- Import i18n in App.tsx
- Verify app still works

**Week 2: Content extraction**
- Audit all components for strings
- Design key structure
- Create English translation file
- Create Spanish translation file (structure only, mark for translation)

**Week 3: Component integration**
- Migrate 2-3 components per day
- Start simple (Footer)
- Move to complex (Hero, Pricing)
- End with Navbar + switcher

**Week 4: Polish**
- Get Spanish translations
- Add language detector
- Test all sections
- Launch

**Total effort estimate:** 2-3 weeks for full landing page (12 sections)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **react-i18next architecture** | MEDIUM | Based on training knowledge (Jan 2025 cutoff), unable to verify v13+ documentation due to tool access restrictions |
| **Integration patterns** | HIGH | Standard React patterns, well-established in ecosystem |
| **Vite compatibility** | HIGH | No special Vite configuration needed for i18n |
| **Build order recommendations** | HIGH | Based on risk-first approach and dependency analysis |
| **Performance implications** | MEDIUM | Bundle sizes and performance characteristics from training data |
| **Testing strategies** | HIGH | Standard React testing patterns with i18n context |

## Sources

**Primary sources (unable to access for verification):**
- react.i18next.com (official documentation)
- i18next.com (core library documentation)
- github.com/i18next/react-i18next (source code, examples)

**Confidence note:** This research is based on training knowledge of react-i18next and i18n patterns as of January 2025. External verification via WebFetch and WebSearch was unavailable. Recommendations follow established industry patterns but should be verified against current official documentation (react.i18next.com) before implementation.

**Verification recommended for:**
- Current version-specific API changes (v13+)
- Latest Vite integration best practices
- Recent plugin ecosystem changes
- TypeScript integration patterns in v13+

**What's reliable:**
- Core architectural patterns (provider-hook model is stable)
- Integration approach (module-level init vs provider)
- Build order logic (based on dependency analysis)
- Anti-patterns (these are fundamental to i18n, not version-specific)
