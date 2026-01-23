# Requirements: AgentCamp 2.0 Landing Page - i18n

**Defined:** 2026-01-23
**Core Value:** Effectively communicate the AgentCamp 2.0 program value to both Spanish-speaking participants and English-speaking partners through a visually engaging, multi-language landing experience.

## v1 Requirements

Requirements for initial i18n release. Each maps to roadmap phases.

### Infrastructure

- [ ] **INFRA-01**: react-i18next installed and configured with hierarchical namespace structure
- [ ] **INFRA-02**: i18next initialized synchronously before React mount to prevent FOUC
- [ ] **INFRA-03**: Translation fallback configured to English if Spanish keys missing
- [ ] **INFRA-04**: localStorage persistence configured for language preference
- [ ] **INFRA-05**: Pre-commit validation script checks translation key parity between languages

### Translations

- [ ] **TRANS-01**: Extract existing Spanish content from components to `/locales/es/translation.json`
- [ ] **TRANS-02**: Generate English translations from extracted Spanish content to `/locales/en/translation.json`
- [ ] **TRANS-03**: Both language files use identical hierarchical key structure (section.element.variant)
- [ ] **TRANS-04**: English translations auto-generated using LLM (refinement happens post-launch)

### Component Integration

- [ ] **COMP-01**: Replace hardcoded Spanish strings with `useTranslation()` hook in all components
- [ ] **COMP-02**: Hero section: replace Spanish strings with translation keys
- [ ] **COMP-03**: Pain Points section: replace Spanish strings with translation keys
- [ ] **COMP-04**: Curriculum section: replace Spanish strings with translation keys
- [ ] **COMP-05**: CTA sections: replace Spanish strings with translation keys
- [ ] **COMP-06**: Footer: replace Spanish strings with translation keys
- [ ] **COMP-07**: Framer Motion animations re-trigger on language change (add key={i18n.language})
- [ ] **COMP-08**: ScrollReveal component updated to accept animationKey prop for re-animation

### Language Switcher

- [ ] **SWITCH-01**: Language switcher component created with EN/ES toggle buttons
- [ ] **SWITCH-02**: Switcher positioned in navbar (left of CTA button)
- [ ] **SWITCH-03**: Visual active state indicates current language
- [ ] **SWITCH-04**: Switcher includes keyboard navigation support
- [ ] **SWITCH-05**: Switcher includes screen reader labels (aria-labels)
- [ ] **SWITCH-06**: Spanish remains default language on first visit

### Browser Detection

- [ ] **DETECT-01**: Browser language auto-detection on first visit
- [ ] **DETECT-02**: Detection order: localStorage → browser preference → Spanish default
- [ ] **DETECT-03**: User's explicit choice overrides auto-detection on subsequent visits

### Polish

- [ ] **POLISH-01**: Smooth transition animations when switching languages
- [ ] **POLISH-02**: Layout handles Spanish text length variance (20-30% longer than English)
- [ ] **POLISH-03**: Date formatting with locale-specific rules (if applicable)
- [ ] **POLISH-04**: Number formatting with locale-specific rules (if applicable)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### SEO

- **SEO-01**: SEO meta tags translated per language
- **SEO-02**: Document title updates on language change
- **SEO-03**: HTML lang attribute updates on language change

### Advanced Features

- **ADV-01**: URL-based language routing (/es, /en paths)
- **ADV-02**: Keyboard shortcut (Alt+L) for quick language switching
- **ADV-03**: Right-to-left (RTL) layout support for additional languages

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Machine translation | Unprofessional for marketing copy, all translations pre-written |
| IP-based language detection | Wrong country doesn't mean wrong language, explicit choice better UX |
| Automatic mid-session switching | Violates user's explicit choice, confusing UX |
| More than 2 languages | Limited to English/Spanish for v1, assess demand later |
| URL routing | Browser storage sufficient, no SEO concerns for landing page |
| Translation management UI | Translations hardcoded in JSON, no need for admin interface |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| TRANS-01 | Phase 1 | Complete |
| TRANS-02 | Phase 1 | Complete |
| TRANS-03 | Phase 1 | Complete |
| TRANS-04 | Phase 1 | Complete |
| COMP-01 | Phase 2 | Pending |
| COMP-02 | Phase 2 | Pending |
| COMP-03 | Phase 2 | Pending |
| COMP-04 | Phase 2 | Pending |
| COMP-05 | Phase 2 | Pending |
| COMP-06 | Phase 2 | Pending |
| COMP-07 | Phase 2 | Pending |
| COMP-08 | Phase 2 | Pending |
| SWITCH-01 | Phase 3 | Pending |
| SWITCH-02 | Phase 3 | Pending |
| SWITCH-03 | Phase 3 | Pending |
| SWITCH-04 | Phase 3 | Pending |
| SWITCH-05 | Phase 3 | Pending |
| SWITCH-06 | Phase 3 | Pending |
| DETECT-01 | Phase 4 | Pending |
| DETECT-02 | Phase 4 | Pending |
| DETECT-03 | Phase 4 | Pending |
| POLISH-01 | Phase 4 | Pending |
| POLISH-02 | Phase 4 | Pending |
| POLISH-03 | Phase 4 | Pending |
| POLISH-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30 (100% coverage)
- Unmapped: 0

---
*Requirements defined: 2026-01-23*
*Last updated: 2026-01-23 after roadmap creation*
