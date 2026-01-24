# Phase 3: Language Switcher - Research

**Researched:** 2026-01-23
**Domain:** React internationalization UI components, navbar patterns, accessibility
**Confidence:** HIGH

## Summary

Language switchers are critical navigation elements that enable users to change interface language dynamically. For a two-language site (EN/ES), the optimal pattern is a toggle button group placed in the top navbar, styled to match the existing design system with clear active/inactive states. The implementation leverages react-i18next's `changeLanguage()` method, which triggers automatic re-rendering of all translated content and persists the user's choice to localStorage via the browser language detector plugin.

Accessibility is paramount: WCAG 2.1 AA compliance requires keyboard operability (Tab, Enter, Space), visible focus indicators with 3:1 contrast ratio, proper ARIA labels, and language-specific HTML attributes. The USWDS (U.S. Web Design System) passed WCAG 2.1 AA tests for language selectors with proper color contrast, semantic HTML, and screen reader announcements.

For this specific implementation, integrating with the existing Tubelight navbar component (which already uses Framer Motion animations) provides visual consistency. The switcher should use shadcn/ui Toggle or Toggle Group components with custom styling to match the glassmorphism design system, positioned to the left of the CTA button.

**Primary recommendation:** Implement a Toggle Group component (2 buttons: EN/ES) with Framer Motion layout animations for the active indicator, integrated into the existing navbar structure. Use `i18n.changeLanguage()` from the `useTranslation` hook, with full keyboard navigation support and localized aria-labels.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-i18next | 13.x+ | Language switching integration | Official React bindings for i18next, 6.3M+ weekly downloads, seamless hook integration |
| i18next-browser-languagedetector | 7.x+ | Language persistence | Auto-detects and persists user language preference in localStorage |
| shadcn/ui Toggle Group | Latest | Toggle button UI primitive | Built on Radix UI with accessibility built-in, matches existing design system |
| Framer Motion | 11.x | Animation library | Already integrated in project, provides layout animations for active state transitions |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Radix UI Toggle | 1.x | Underlying primitive | Used by shadcn/ui, provides semantic HTML and ARIA patterns |
| Tailwind CSS | 3.x+ | Styling system | Already in project, used for glassmorphism effects and responsive design |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Toggle Group | Dropdown/Select | Dropdowns work for 3+ languages but add unnecessary complexity for 2 languages; toggles are more direct |
| shadcn/ui | Custom toggle | Custom implementation requires manual ARIA, keyboard handling, and accessibility testing |
| Framer Motion | CSS transitions | CSS can't handle layout animations as smoothly; Framer already integrated |

**Installation:**
All required libraries already installed in project. No additional packages needed.

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   └── landing/
│       ├── Navbar.tsx           # Existing - integrate LanguageSwitcher here
│       └── LanguageSwitcher.tsx # New component to create
└── i18n/
    └── config.ts                # Existing - already configured with detector
```

### Pattern 1: Inline Toggle Group Integration
**What:** Embed LanguageSwitcher component directly in navbar layout, positioned between main nav items and CTA button
**When to use:** For persistent visibility and quick access (recommended for this project)
**Example:**
```typescript
// src/components/landing/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language;

  const handleLanguageChange = (value: string) => {
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={currentLang}
      onValueChange={handleLanguageChange}
      className="bg-card/80 backdrop-blur-md border border-white/10 rounded-full p-1"
      aria-label={t('navbar.languageSwitcher.label')}
    >
      <ToggleGroupItem
        value="en"
        aria-label={t('navbar.languageSwitcher.english')}
        className="rounded-full px-4 py-2 text-sm font-medium transition-colors data-[state=on]:bg-primary/20 data-[state=on]:text-primary"
      >
        EN
      </ToggleGroupItem>
      <ToggleGroupItem
        value="es"
        aria-label={t('navbar.languageSwitcher.spanish')}
        className="rounded-full px-4 py-2 text-sm font-medium transition-colors data-[state=on]:bg-primary/20 data-[state=on]:text-primary"
      >
        ES
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Pattern 2: Custom Tubelight-Style Toggle (Alternative)
**What:** Build custom toggle matching existing Tubelight navbar animation pattern with sliding indicator
**When to use:** For perfect visual consistency with existing nav items
**Example:**
```typescript
// Custom implementation matching Tubelight pattern
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const languages = ['en', 'es'];
  const currentIndex = languages.indexOf(i18n.resolvedLanguage || 'es');

  return (
    <div className="relative flex gap-1 rounded-full bg-card/80 backdrop-blur-md border border-white/10 p-1.5">
      {/* Animated indicator - matches Tubelight pattern */}
      <motion.div
        className="absolute h-[calc(100%-12px)] rounded-full bg-primary/20 border border-primary/30"
        animate={{ x: currentIndex * 56 }} // Adjust based on button width
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={cn(
            "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            lang === i18n.resolvedLanguage ? "text-primary" : "text-muted-foreground"
          )}
          aria-label={lang === 'en' ? 'English' : 'Español'}
          lang={lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### Pattern 3: Mobile Responsive Integration
**What:** Show language switcher in mobile menu with same visual style
**When to use:** Always - mobile users need language switching too
**Example:**
```typescript
// In Navbar.tsx mobile menu section
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden pt-20">
    <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
      {/* Language Switcher at top of mobile menu */}
      <div className="flex justify-center mb-4">
        <LanguageSwitcher />
      </div>

      {/* Existing nav items */}
      {navItems.map((item) => (...))}
    </nav>
  </div>
)}
```

### Anti-Patterns to Avoid
- **Using country flags alone:** Flags represent countries, not languages. Spanish is spoken in 20+ countries. Use text labels (EN/ES) instead.
- **Auto-redirecting without user control:** Don't force language based on IP/browser locale. USWDS research shows this frustrates users who need different languages.
- **Coupling language with other settings:** Don't tie language selection to currency, location, or other preferences. Allow independent selection.
- **Hard-coded aria-labels:** Don't use `aria-label="English"` in hard-coded English. Use i18n for aria-labels too: `aria-label={t('navbar.languageSwitcher.english')}`.
- **Missing lang attributes:** Don't forget `lang="en"` or `lang="es"` attributes on language-specific text for screen readers.
- **Low contrast inactive states:** Don't use similar shades of gray. Use saturated color for active state and neutral for inactive.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Language persistence | Custom localStorage logic | i18next-browser-languagedetector | Handles detection order, caching, edge cases; standard in ecosystem |
| Toggle component | Custom button group | shadcn/ui ToggleGroup + Radix UI | ARIA attributes, keyboard navigation, focus management built-in; WCAG tested |
| Language switching logic | Manual state + prop drilling | react-i18next hooks (useTranslation) | Automatic re-rendering, context-based, no prop drilling; 6.3M+ weekly downloads |
| Animation timing functions | Custom CSS transitions | Framer Motion spring animations | Natural physics-based motion, layout animations, already integrated |
| Keyboard navigation | Manual keydown handlers | Radix UI primitives | Implements ARIA patterns, handles Tab/Enter/Space/Arrow keys correctly |

**Key insight:** Language switching involves complex edge cases (fallback languages, partial translations, RTL support, screen reader language switching). The i18next ecosystem has solved these over 10+ years. Custom implementations miss edge cases and fail accessibility audits.

## Common Pitfalls

### Pitfall 1: Inconsistent Language Code Display
**What goes wrong:** Using "EN" on English site but spelling out "English" on Spanish site (or vice versa)
**Why it happens:** Developers don't consider what non-native speakers understand. "ES" is ISO 639-1 code, but many users don't know this.
**How to avoid:**
- Display language names in their native form: "English" and "Español" (not "Spanish")
- Be consistent: use either codes (EN/ES) or full names, but same pattern on both language versions
- For 2-language sites, short codes work well due to space constraints
**Warning signs:** User testing shows confusion; support requests about language switching

### Pitfall 2: WCAG Failure on Label In Name (SC 2.5.3)
**What goes wrong:** Visible text shows "Deutsch" but aria-label says "German" with lang="de". Screen reader speaks "German" in German accent, failing WCAG 2.5.3 Label In Name criterion.
**Why it happens:** Developers localize aria-label to UI language instead of matching visible text
**How to avoid:**
- If visible text is "Español", aria-label must include "Español" (not "Spanish")
- Add lang attribute to match the language being labeled: `<button lang="es" aria-label="Cambiar a Español">`
- Use `aria-describedby` for additional context if needed
**Warning signs:** Accessibility audit fails SC 2.5.3; screen reader users report confusion

### Pitfall 3: Language Resets on Refresh
**What goes wrong:** User selects Spanish, page reloads, language reverts to English
**Why it happens:** Language detector plugin not configured, or detection order wrong, or localStorage key conflicts
**How to avoid:**
```typescript
// Correct configuration (already in project)
detection: {
  order: ['localStorage', 'navigator'], // Check localStorage FIRST
  caches: ['localStorage'],
  lookupLocalStorage: 'i18nextLng',     // Standard key
}
```
- Verify localStorage contains 'i18nextLng' key after language change
- Don't manually set fallbackLng after initial load
**Warning signs:** localStorage empty or wrong key; users complain about language not saving

### Pitfall 4: No Keyboard Access to Toggle
**What goes wrong:** Toggle only responds to clicks, not keyboard; Tab skips over it; Enter doesn't activate
**Why it happens:** Using divs instead of buttons; onClick without onKeyDown; missing tabIndex
**How to avoid:**
- Use semantic HTML (`<button>`) or Radix UI primitives (handles keyboard automatically)
- Verify Tab reaches component, focus indicator visible (3:1 contrast)
- Test with keyboard only: Tab to switcher, Enter/Space to activate, Arrow keys to navigate (if applicable)
**Warning signs:** Keyboard users can't change language; fails WCAG 2.1.1 (Keyboard)

### Pitfall 5: Missing Focus Indicators
**What goes wrong:** Focus outline removed for aesthetic reasons; keyboard users can't see which element is focused
**Why it happens:** Developers use `outline: none` without replacement; design doesn't consider focus states
**How to avoid:**
```typescript
// Good: Custom focus style with sufficient contrast
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```
- Never use `outline: none` without replacement
- Focus indicator must have 3:1 contrast ratio (WCAG SC 2.4.7)
- Test with keyboard navigation in production
**Warning signs:** Fails accessibility audit; keyboard navigation unclear

### Pitfall 6: Animation Disrupts Screen Readers
**What goes wrong:** Framer Motion layout animations trigger screen reader re-announcements; confusing experience
**Why it happens:** DOM reordering from layout animations; ARIA live regions not managed
**How to avoid:**
- Use `layoutId` consistently across animation targets
- Avoid animating ARIA live regions
- Test with NVDA, JAWS, VoiceOver to verify no phantom announcements
- Consider `prefers-reduced-motion` media query: disable animations for users who need it
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400 };
```
**Warning signs:** Screen reader users report duplicate announcements; animations feel disorienting

### Pitfall 7: Language Switcher Hidden on Mobile
**What goes wrong:** Switcher only visible on desktop; mobile users stuck in wrong language
**Why it happens:** Responsive design hides switcher; developer assumes mobile users don't need it
**How to avoid:**
- Include language switcher in mobile hamburger menu
- Position at top of mobile menu for easy discovery
- Consider sticky/floating switcher if hamburger menu not used
**Warning signs:** Mobile user complaints; analytics show high bounce rate on mobile

## Code Examples

Verified patterns from official sources:

### Basic i18next Language Change
```typescript
// Source: https://www.i18next.com/overview/api
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // Method 1: With callback
  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng, (err, t) => {
      if (err) console.error('Language change failed:', err);
      // Optional callback after translations loaded
    });
  };

  // Method 2: With Promise (recommended)
  const handleChangeAsync = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      // Language changed successfully
    } catch (err) {
      console.error('Language change failed:', err);
    }
  };

  // Access current language
  const current = i18n.resolvedLanguage; // Recommended for UI
  // or
  const currentAlt = i18n.language; // Alternative

  return (
    <button onClick={() => handleChangeAsync('es')}>
      Switch to Spanish
    </button>
  );
}
```

### shadcn/ui Toggle Group with Keyboard Navigation
```typescript
// Source: https://ui.shadcn.com/docs/components/toggle
// Built on Radix UI - keyboard navigation included automatically
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  return (
    <ToggleGroup
      type="single"
      value={i18n.resolvedLanguage}
      onValueChange={(value) => {
        if (value) i18n.changeLanguage(value);
      }}
      aria-label={t('navbar.languageSwitcher.label')}
    >
      <ToggleGroupItem
        value="en"
        aria-label={t('navbar.languageSwitcher.english')}
      >
        <span lang="en">EN</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="es"
        aria-label={t('navbar.languageSwitcher.spanish')}
      >
        <span lang="es">ES</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Framer Motion Layout Animation for Active State
```typescript
// Source: https://blog.maximeheckel.com/posts/framer-motion-layout-animations/
import { motion } from 'framer-motion';

export function AnimatedLanguageSwitcher() {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  return (
    <div className="relative flex gap-1 rounded-full bg-card/80 p-1.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="relative z-10 px-4 py-2 rounded-full text-sm font-medium"
          lang={lang.code}
        >
          {/* Active state indicator with layout animation */}
          {lang.code === i18n.resolvedLanguage && (
            <motion.div
              layoutId="activeLanguage" // Key for smooth transitions
              className="absolute inset-0 bg-primary/20 rounded-full border border-primary/30"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
```

### WCAG-Compliant Language Switcher with Full Accessibility
```typescript
// Sources:
// - https://designsystem.digital.gov/components/language-selector/
// - https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6
import { useTranslation } from 'react-i18next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function AccessibleLanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.resolvedLanguage || 'es';

  return (
    <ToggleGroup
      type="single"
      value={currentLang}
      onValueChange={(value) => {
        if (value) i18n.changeLanguage(value);
      }}
      className="bg-card/80 backdrop-blur-md border border-white/10 rounded-full p-1.5"
      // Accessible label - localized to current UI language
      aria-label={t('navbar.languageSwitcher.label')} // e.g., "Choose language" / "Elegir idioma"
    >
      <ToggleGroupItem
        value="en"
        // aria-label describes the action in current UI language
        aria-label={t('navbar.languageSwitcher.switchToEnglish')} // "Switch to English" / "Cambiar a inglés"
        // lang attribute for screen reader pronunciation
        lang="en"
        className="rounded-full px-4 py-2.5 text-sm font-medium transition-colors
                   data-[state=on]:bg-primary/20 data-[state=on]:text-primary
                   data-[state=off]:text-muted-foreground
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        EN
      </ToggleGroupItem>
      <ToggleGroupItem
        value="es"
        aria-label={t('navbar.languageSwitcher.switchToSpanish')} // "Switch to Spanish" / "Cambiar a español"
        lang="es"
        className="rounded-full px-4 py-2.5 text-sm font-medium transition-colors
                   data-[state=on]:bg-primary/20 data-[state=on]:text-primary
                   data-[state=off]:text-muted-foreground
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        ES
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Navbar Integration Example
```typescript
// src/components/landing/Navbar.tsx
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  // ... existing code ...

  return (
    <header className={/* ... */}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            {/* ... existing logo ... */}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <NavBar items={navItems} />

            {/* Language Switcher - positioned between nav and CTA */}
            <LanguageSwitcher />

            <Button className="gradient-primary rounded-full">
              {t('navbar.cta')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={/* ... */}>
            {/* ... */}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden pt-20">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            {/* Language switcher at top of mobile menu */}
            <div className="flex justify-center mb-4">
              <LanguageSwitcher />
            </div>

            {/* ... existing nav items ... */}
          </nav>
        </div>
      )}
    </header>
  );
}
```

### Translation Keys to Add
```json
// src/locales/en/translation.json
{
  "navbar": {
    "languageSwitcher": {
      "label": "Choose language",
      "english": "English",
      "spanish": "Spanish",
      "switchToEnglish": "Switch to English",
      "switchToSpanish": "Switch to Spanish"
    }
  }
}

// src/locales/es/translation.json
{
  "navbar": {
    "languageSwitcher": {
      "label": "Elegir idioma",
      "english": "Inglés",
      "spanish": "Español",
      "switchToEnglish": "Cambiar a inglés",
      "switchToSpanish": "Cambiar a español"
    }
  }
}
```

### Responsive Design Pattern
```typescript
// Desktop: full switcher visible
// Mobile: in hamburger menu or as separate sticky element
export function ResponsiveLanguageSwitcher() {
  return (
    <>
      {/* Desktop - inline with nav */}
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>

      {/* Mobile - in menu or as floating element */}
      <div className="md:hidden">
        {/* Option 1: In hamburger menu (recommended) */}
        {isMobileMenuOpen && <LanguageSwitcher />}

        {/* Option 2: Floating in corner (if no hamburger) */}
        {/* <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div> */}
      </div>
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Dropdown for 2 languages | Toggle buttons | 2020+ | Faster interaction, less clicks, better mobile UX |
| Country flags as primary indicator | Text labels (EN/ES) with optional flags | 2021+ | Better accessibility, avoids country/language confusion |
| Manual localStorage management | i18next-browser-languagedetector | 2018+ | Automatic persistence, detection fallbacks, standard ecosystem tool |
| Custom keyboard handlers | Radix UI primitives | 2022+ | Built-in ARIA, keyboard patterns, WCAG compliance |
| CSS transitions | Framer Motion layout animations | 2023+ | Smoother state transitions, physics-based motion |
| Auto-redirect based on IP | User-controlled selector with smart defaults | 2019+ | Respects user agency, reduces frustration (USWDS research) |
| Hard-coded aria-labels | i18n-based aria-labels | 2020+ | Screen reader users get localized labels too |

**Deprecated/outdated:**
- **i18next-localStorage-cache:** Deprecated in favor of i18next-browser-languagedetector with built-in caching
- **Flags alone:** Accessibility guidelines now recommend text labels; flags can be supplementary decoration only
- **Modal dialogs for language selection:** Non-modal patterns (inline, sidebar) perform better per UX research
- **Context API for i18n:** react-i18next hooks are now standard, no need for custom context wrappers

## Open Questions

Things that couldn't be fully resolved:

1. **Should language codes be EN/ES or full names English/Español?**
   - What we know: USWDS research suggests codes work for 2 languages; full names scale better for 3+; native names (Español not Spanish) are best practice
   - What's unclear: User testing data specific to this project's audience
   - Recommendation: Use codes (EN/ES) for space efficiency in navbar, add full names in aria-labels and tooltips for clarity

2. **Animation timing: should it match existing Tubelight animation parameters?**
   - What we know: Tubelight uses `{ type: 'spring', stiffness: 400, damping: 30 }`
   - What's unclear: Whether language switcher should animate identically or be subtler
   - Recommendation: Start with same parameters for consistency, adjust in user testing if it feels too bouncy for a smaller component

3. **Mobile placement: hamburger menu or always-visible floating element?**
   - What we know: USWDS recommends discoverable position; hamburger menu is common pattern; floating elements can obstruct content
   - What's unclear: Whether current mobile UX has hamburger menu or other navigation pattern
   - Recommendation: Integrate into existing mobile menu (hamburger or otherwise); if no menu exists, add as top-right element above CTA

4. **Should Spanish truly remain default on first visit?**
   - What we know: Requirement SWITCH-06 states "Spanish remains default language on first visit"
   - What's unclear: Browser language detection is configured - does "first visit" mean ignore browser locale?
   - Recommendation: Clarify with stakeholder. Options: (a) Set fallbackLng: 'es' and disable detector on first visit, (b) Set es as fallback but allow detector to override if browser is English

## Sources

### Primary (HIGH confidence)
- [i18next API Documentation](https://www.i18next.com/overview/api) - changeLanguage method, language access
- [react-i18next Step-by-Step Guide](https://react.i18next.com/latest/using-with-hooks) - useTranslation hook usage
- [shadcn/ui Toggle Component](https://ui.shadcn.com/docs/components/toggle) - Toggle component specifications, variants
- [USWDS Language Selector](https://designsystem.digital.gov/components/language-selector/) - Official US government accessibility standards
- [USWDS Accessibility Tests](https://designsystem.digital.gov/components/language-selector/accessibility-tests/) - 12 WCAG 2.1 AA tests passed
- [W3C ARIA6 Technique](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6) - aria-label official guidance
- [Framer Motion Layout Animations](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/) - Layout animation patterns
- [Radix UI Toggle Group](https://www.radix-ui.com/primitives/docs/components/toggle-group) - Underlying primitive documentation

### Secondary (MEDIUM confidence)
- [Smashing Magazine: Better Language Selector](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/) - UX best practices, verified with USWDS
- [Accessible Language Pickers](https://terrillthompson.com/759) - WCAG Label In Name pitfall, verified with W3C
- [TestParty: Accessible Toggle Buttons](https://testparty.ai/blog/accessible-toggle-buttons-modern-web-apps-complete-guide) - Keyboard navigation patterns
- [Phrase: React Localization with i18next](https://phrase.com/blog/posts/localizing-react-apps-with-i18next/) - Implementation patterns
- [Linguise: Language Selector Best Practices 2025](https://www.linguise.com/blog/guide/best-practices-designing-language-selector/) - Positioning guidance
- [Weglot: Language Selector Tips](https://www.weglot.com/blog/website-language-selector) - Native language names, positioning
- [UXtweak: Toggle Button Design Research](https://www.uxtweak.com/research/toggle-button-design/) - Active/inactive state visual design

### Tertiary (LOW confidence - community sources)
- [GeeksforGeeks: Framer Motion Toggle](https://www.geeksforgeeks.org/reactjs/design-an-animated-toggle-switch-button-using-framer-motion-react/) - Animation examples (basic tutorial)
- [GitHub: react-i18next Issue #1052](https://github.com/i18next/react-i18next/issues/1052) - localStorage persistence troubleshooting
- Various blog posts on language switcher implementation (multiple sources) - General patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - react-i18next is industry standard with 6.3M+ weekly downloads; shadcn/ui on Radix UI primitives is well-established; Framer Motion already in project
- Architecture: HIGH - Patterns verified against USWDS (WCAG 2.1 AA certified), W3C guidelines, and multiple authoritative sources
- Pitfalls: HIGH - Based on official accessibility audits, WCAG failure modes, and documented GitHub issues with i18next ecosystem
- UI patterns: MEDIUM - Toggle vs dropdown for 2 languages is consensus but not formally specified; positioning recommendations vary by source but converge on "top corner"
- Animation details: MEDIUM - Framer Motion patterns are well-documented but specific timing for this use case requires testing

**Research date:** 2026-01-23
**Valid until:** 2026-02-23 (30 days - stable ecosystem, WCAG standards don't change rapidly)

**Key technologies researched:**
- react-i18next 13.x (stable)
- i18next-browser-languagedetector 7.x (stable)
- shadcn/ui Toggle/ToggleGroup (based on Radix UI 1.x - stable)
- Framer Motion 11.x (recent release, stable)
- WCAG 2.1 AA standards (current, WCAG 2.2 is latest but 2.1 is baseline)
- Tailwind CSS 3.x (stable)

**Research methodology:**
1. Web search for react-i18next patterns, accessibility guidelines, UI design patterns (2026 date included)
2. Official documentation verification via WebFetch (i18next, W3C, USWDS, shadcn/ui)
3. Cross-reference findings across multiple authoritative sources
4. Prioritized government standards (USWDS) and W3C specifications over blog posts
5. Validated current project setup (i18n config, existing components, design system)
