# Feature Landscape: i18n for Landing Pages

**Domain:** Internationalization (i18n) for React Landing Pages
**Researched:** 2026-01-23
**Confidence:** MEDIUM (based on training data and common patterns, unable to verify with external sources)

## Executive Summary

Landing page i18n has well-established user expectations. Users expect instant language switching with zero page reload, visible language controls, and persistence across sessions. For a two-language landing page (English/Spanish), the feature set is straightforward with low complexity.

**Key insight:** Most landing page i18n implementations over-engineer. For static marketing content with 2 languages, users only truly need: a visible toggle, instant switching, and persistence. Everything else is nice-to-have or actively harmful.

## Table Stakes

Features users expect. Missing = product feels broken or incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Visible language switcher** | Users need to know multilingual support exists and how to access it | Low | Button or dropdown in navbar. Must be visible without scrolling. |
| **Instant language switching** | Zero tolerance for page reload. Users expect instant feedback. | Low | Client-side only, no server round-trip. React state change with immediate re-render. |
| **Language persistence** | Users expect their choice remembered across page reloads | Low | localStorage is standard. Must persist even after closing browser. |
| **Complete content translation** | All visible text must be translated. Missing translations = broken experience. | Medium | Includes: navigation, headings, body text, CTAs, tooltips, error messages. |
| **Consistent UI element sizing** | Text length varies by language. UI must not break with longer Spanish text. | Medium | Spanish often 20-30% longer than English. Buttons, cards must accommodate. |
| **Icon-based language indicators** | Flag icons or language codes (EN/ES) for quick recognition | Low | Visual recognition faster than reading text labels. |

## Differentiators

Features that set products apart. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Browser language auto-detection** | Reduces friction for first visit. User sees their language immediately. | Low | Read `navigator.language`, set default if not already stored. Only on first visit. |
| **URL-based language routing** | Enables sharing links in specific language (/es/, /en/). SEO benefits. | Medium | Requires router integration. `/es/` vs `/en/` paths. Updates URL without reload. |
| **Smooth transition animations** | Subtle fade or slide when switching languages feels polished | Low | Framer Motion already in project. Can animate text opacity on language change. |
| **Keyboard shortcut** | Power users appreciate Alt+L or similar for quick switching | Low | Accessibility win. Document in FAQ or footer. |
| **Language-specific formatting** | Dates, numbers, currency formatted per locale | Medium | Spanish uses DD/MM/YYYY, English uses MM/DD/YYYY. Use Intl API or date-fns locales. |
| **Right-to-left (RTL) support** | Future-proofs for Arabic, Hebrew if expanding | High | Only valuable if planning additional languages. NOT needed for ES/EN only. |

## Anti-Features

Features to explicitly NOT build. Common mistakes in this domain.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Automatic language switching mid-session** | Confusing and disorienting. User explicitly chose a language. | Only auto-detect on first visit. Then respect user choice completely. |
| **Too many language options** | 10+ languages in dropdown = decision paralysis and poor UX | For landing page with 2 languages, use toggle button not dropdown. |
| **Machine translation on-the-fly** | Google Translate quality is poor for marketing copy. Unprofessional. | Pre-translate all content. Professional translations only. |
| **Language detection via IP/geolocation** | Wrong country ≠ wrong language. Spanish speakers exist worldwide. | Use browser language preference, not IP address. |
| **Hiding language switcher in footer** | Users don't scroll to footer to find language options | Navbar only. Visible above the fold always. |
| **Full page reload on language change** | Feels slow and broken. Loses scroll position and context. | Client-side state management. React re-render only. |
| **Separate domains per language** | example.com vs example.es = fragmented analytics, confusing for users | Single domain with language toggle or URL paths. |
| **Over-engineering with i18n libraries** | For 2 languages with static content, full i18next is overkill | Simple context provider with JSON translation files sufficient. |

## Feature Dependencies

```
Language Persistence → Requires storage mechanism (localStorage)
                    → Requires initial load check

Browser Auto-detection → Must run BEFORE checking localStorage
                       → Only applies if no stored preference exists

URL-based Routing → Requires react-router integration
                  → Must sync with localStorage
                  → Must handle initial page load from shared URL

Locale-specific Formatting → Requires language context available
                           → Depends on Intl API or date-fns with locales

Smooth Transitions → Requires animation library
                    → Must not interfere with instant switching perception
```

## MVP Recommendation

For MVP (AgentCamp 2.0 landing page), prioritize:

### Phase 1: Core i18n (Must-Have)
1. **Visible language toggle** (navbar, EN/ES button)
2. **Instant switching** (React context + JSON translation files)
3. **localStorage persistence** (remember choice across sessions)
4. **Complete content translation** (all sections translated to Spanish)
5. **Consistent UI sizing** (test with both languages for overflow)

**Rationale:** These 5 features = complete i18n experience. Anything less feels broken.

### Phase 2: Polish (Nice-to-Have)
6. **Browser language auto-detection** (good first-visit UX)
7. **Smooth transition animation** (professional polish)
8. **Date/number formatting** (if curriculum has dates)

**Rationale:** Enhances UX but not critical for launch. Can add in days after MVP.

### Defer to Post-MVP
- **URL-based routing**: SEO benefit but requires significant router changes. Evaluate based on partner needs.
- **Keyboard shortcut**: Power user feature, minimal ROI for landing page audience.
- **RTL support**: Not applicable for English/Spanish. Only if adding Arabic/Hebrew later.

## Implementation Complexity by Feature

| Feature | LOC Estimate | Files Changed | Testing Complexity |
|---------|--------------|---------------|-------------------|
| Language toggle button | ~30 | Navbar.tsx, new LanguageToggle component | Low |
| Translation context/provider | ~50 | New context, provider wrapper | Medium |
| JSON translation files | ~200 per language | en.json, es.json | Low (review only) |
| localStorage persistence | ~20 | Context/provider hook | Low |
| Browser auto-detection | ~15 | Initial app load | Medium (test fallbacks) |
| Smooth transitions | ~30 | Component with animation | Low |
| URL routing integration | ~100 | Router config, context sync, hooks | High |

**Total MVP estimate:** ~500 LOC for core features (Phase 1 + browser detection)

## Competitive Analysis Notes

**Confidence: LOW** (based on training data patterns, not current market research)

Common patterns in landing page i18n:
- **Simple toggle (2-3 languages):** Linear, Stripe, Figma - button in navbar
- **Dropdown (4+ languages):** GitHub, Airbnb - dropdown menu in footer or navbar
- **URL-based (enterprise/SEO-focused):** Shopify, HubSpot - /en/, /es/ paths with auto-redirect

For AgentCamp use case (2 languages, education program):
- **Closest comparable:** Coding bootcamp landing pages (General Assembly, Le Wagon)
- **Common pattern:** Toggle button in navbar, instant switching, no URL routing
- **Typical implementation:** react-i18next or lightweight custom context

## Sources

**Note:** Unable to verify with external sources during research. Recommendations based on:
- Training data on i18n best practices (current as of January 2025)
- Common React i18n patterns
- Standard web localization conventions

**Verification recommended for:**
- Current react-i18next feature set and API
- Latest browser language detection APIs
- Performance implications of different approaches

**Files to create in implementation:**
- `/src/contexts/LanguageContext.tsx` - React context for language state
- `/src/translations/en.json` - English translations
- `/src/translations/es.json` - Spanish translations
- `/src/components/LanguageToggle.tsx` - Toggle button component
- `/src/hooks/useTranslation.ts` - Hook for accessing translations

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Spanish text overflow breaks layouts | High | Medium | Test all sections with Spanish content. Use CSS text-overflow strategies. |
| Missing translations in production | Medium | High | Automated testing to verify all keys exist in both language files. |
| localStorage not available (privacy mode) | Low | Low | Fallback to session-level state. Still works within session. |
| Auto-detection chooses wrong language | Medium | Low | User can manually override. Only affects first visit. |
| Performance impact on language switch | Low | Medium | Lazy load translations. Preload both for 2 languages (small payload). |

## Accessibility Considerations

**Must-have for WCAG compliance:**
- Language toggle must have proper ARIA labels (`aria-label="Switch language"`)
- `lang` attribute on `<html>` must update when language changes
- Screen readers must announce language change
- Keyboard navigation must support language toggle (tab + enter/space)

**Implementation note:**
```tsx
// Update document lang attribute
useEffect(() => {
  document.documentElement.lang = currentLanguage === 'es' ? 'es' : 'en';
}, [currentLanguage]);
```

## Performance Considerations

For 2-language landing page:
- **Translation file size:** ~5-10KB per language (uncompressed) = negligible
- **Load both languages upfront:** With only 2 languages, no need for lazy loading
- **Client-side switching:** <16ms re-render on modern devices
- **localStorage read:** <1ms synchronous operation

**Optimization not needed unless:**
- Adding 5+ languages (then lazy load)
- Translation files exceed 50KB (then split by section)
- Targeting very slow devices (then consider code splitting)

## Future Expansion Paths

If adding more languages later:

**3-4 languages:**
- Switch from toggle button to dropdown
- Consider lazy loading translation files
- May need URL routing for SEO

**5+ languages:**
- Definitely need dropdown with search
- Lazy load all translation files
- URL routing recommended
- Consider language grouping (Americas, Europe, Asia)

**Non-Latin scripts (Arabic, Hebrew, Chinese):**
- RTL support required for Arabic/Hebrew
- Font loading strategy for non-Latin scripts
- Increased UI testing complexity

## Open Questions

Questions that couldn't be resolved without external verification:

1. **Does react-i18next v14+ have improved bundle size?** Last known version in training had concerns about bundle size for simple use cases.
2. **What's the current best practice for translation file format?** JSON vs YAML vs PO files - preferences may have shifted.
3. **Are there new browser APIs for language preference?** Navigator.languages may have new capabilities.
4. **What's the SEO impact of client-side only vs URL routing?** Google's indexing of client-side content may have improved.

## Conclusion

For AgentCamp 2.0 landing page, i18n feature set is straightforward:

**Build these (table stakes):**
- Navbar language toggle (EN/ES button with flag/code icons)
- Instant client-side switching
- localStorage persistence
- Complete content translation
- Responsive UI for text length variance

**Consider these (differentiators):**
- Browser language auto-detection (low effort, good UX)
- Smooth transition animations (polish, leverages existing Framer Motion)

**Explicitly avoid these (anti-features):**
- Complex i18n libraries for 2-language use case
- Machine translation
- Automatic switching after user makes choice
- URL routing (unless partner requirement for sharing)

**Complexity: LOW** - Estimated 2-3 days for full implementation including testing.
