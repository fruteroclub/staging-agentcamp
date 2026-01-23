# Roadmap: AgentCamp 2.0 Landing Page - Multi-language Support

## Overview

Transform the AgentCamp 2.0 landing page from Spanish-only to a bilingual experience with react-i18next. Starting with infrastructure setup and translation extraction, then systematically replacing hardcoded strings while preserving Framer Motion animations, adding a user-facing language switcher, and finishing with browser detection and production polish. The roadmap prioritizes risk reduction by establishing translation structure before touching components, and exposing the switcher only after all translations work correctly.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Content** - Install i18next, configure infrastructure, extract and translate all content
- [ ] **Phase 2: Component Integration** - Replace hardcoded strings with translation hooks, fix animation re-triggering
- [ ] **Phase 3: Language Switcher** - Build and integrate navbar switcher with accessibility support
- [ ] **Phase 4: Detection & Polish** - Add browser language detection, smooth transitions, production validation

## Phase Details

### Phase 1: Foundation & Content
**Goal**: Establish i18n infrastructure and complete translation files without breaking existing functionality
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, TRANS-01, TRANS-02, TRANS-03, TRANS-04
**Success Criteria** (what must be TRUE):
  1. i18next, react-i18next, and i18next-browser-languagedetector packages installed and configured
  2. `/locales/es/translation.json` contains all extracted Spanish content with hierarchical key structure
  3. `/locales/en/translation.json` contains complete English translations with identical key structure
  4. Pre-commit validation script prevents translation key mismatches between languages
  5. Application still renders with hardcoded Spanish strings (no visual changes yet)
**Plans**: 2 plans in 2 waves

Plans:
- [ ] 01-01-PLAN.md — Install i18next packages, create config, wire into main.tsx
- [ ] 01-02-PLAN.md — Extract Spanish content, generate English translations, create validation script

### Phase 2: Component Integration
**Goal**: All landing page components use translation hooks instead of hardcoded strings, with animations re-triggering on language change
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08
**Success Criteria** (what must be TRUE):
  1. All components (Hero, Pain Points, Curriculum, CTA, Footer) use `useTranslation()` hook with no hardcoded strings
  2. Complex content with links/bold uses Trans component for proper interpolation
  3. Framer Motion animations re-trigger when language changes via `key={i18n.language}` prop
  4. ScrollReveal component accepts animationKey prop and forces remount on key change
  5. Application renders correctly in both languages when manually switching via console
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Language Switcher
**Goal**: Users can switch between English and Spanish via accessible navbar control
**Depends on**: Phase 2
**Requirements**: SWITCH-01, SWITCH-02, SWITCH-03, SWITCH-04, SWITCH-05, SWITCH-06
**Success Criteria** (what must be TRUE):
  1. LanguageSwitcher component visible in navbar (left of CTA button) with EN/ES toggle buttons
  2. Visual active state clearly indicates current language
  3. Clicking switcher immediately updates all content without page reload
  4. Switcher supports keyboard navigation (Tab, Enter, Arrow keys)
  5. Screen readers announce language options and current selection via aria-labels
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Detection & Polish
**Goal**: Production-ready experience with browser detection, smooth transitions, and validated layouts
**Depends on**: Phase 3
**Requirements**: DETECT-01, DETECT-02, DETECT-03, POLISH-01, POLISH-02, POLISH-03, POLISH-04
**Success Criteria** (what must be TRUE):
  1. First-time visitors see Spanish by default, or English if browser preference is English
  2. Selected language persists in localStorage across browser sessions
  3. User's explicit switcher choice always overrides auto-detection on future visits
  4. Language switch includes smooth fade/slide transitions leveraging Framer Motion
  5. All layouts handle Spanish text length variance (20-30% longer) without breaking on mobile or desktop
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Content | 0/2 | Planned | - |
| 2. Component Integration | 0/2 | Not started | - |
| 3. Language Switcher | 0/1 | Not started | - |
| 4. Detection & Polish | 0/1 | Not started | - |
