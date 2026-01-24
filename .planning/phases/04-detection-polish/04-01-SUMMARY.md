---
phase: 04-detection-polish
plan: 01
subsystem: i18n
tags: [react-i18next, i18next-browser-languagedetector, localStorage, language-detection]

# Dependency graph
requires:
  - phase: 01-foundation-content
    provides: i18n configuration and translation infrastructure
  - phase: 03-language-switcher
    provides: UI component for manual language selection
provides:
  - Spanish-first browser language detection with English opt-in
  - localStorage persistence for user language preference
  - Constrained language detection to supported languages only
affects: [final-deployment, user-experience]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Custom fallbackLng function for Spanish-first detection logic
    - Browser language detection with supportedLngs constraint

key-files:
  created: []
  modified:
    - src/i18n/config.ts

key-decisions:
  - "Spanish-first fallback: English browsers (en*) get English, all others default to Spanish"
  - "supportedLngs constraint: Prevents i18next from attempting unsupported languages"
  - "Detection order unchanged: localStorage preference always overrides browser detection"

patterns-established:
  - "Custom fallbackLng function pattern: Enable conditional defaults based on detected language"
  - "Spanish-first UX: Aligns with primary Spanish-speaking audience while accommodating English partners"

# Metrics
duration: 5min
completed: 2026-01-24
---

# Phase 4 Plan 1: Detection & Polish Summary

**Spanish-first browser language detection using custom fallbackLng function - English browsers opt-in to English, all others default to Spanish**

## Performance

- **Duration:** 5 min
- **Started:** 2026-01-24T06:59:00Z
- **Completed:** 2026-01-24T07:04:20Z
- **Tasks:** 1 (plus human-verify checkpoint)
- **Files modified:** 1

## Accomplishments
- Implemented Spanish-first browser detection logic
- Added supportedLngs constraint to prevent fallback to unsupported languages
- Maintained localStorage preference priority
- Validated layouts and functionality across both languages on mobile and desktop

## Task Commits

Each task was committed atomically:

1. **Task 1: Update i18n config for Spanish-first detection** - `97637e8` (feat)

**Plan metadata:** (this commit)

## Files Created/Modified
- `src/i18n/config.ts` - Added supportedLngs=['en','es'] and custom fallbackLng function implementing Spanish-first detection (English browsers → English, all others → Spanish)

## Decisions Made

**Spanish-first fallback logic**
- **Decision:** Use custom fallbackLng function checking for 'en' prefix instead of static string
- **Rationale:** Enables Spanish default while respecting English browser preferences
- **Implementation:** `if (code && code.toLowerCase().startsWith('en')) return ['en']; return ['es'];`

**supportedLngs constraint**
- **Decision:** Add explicit supportedLngs: ['en', 'es'] array
- **Rationale:** Prevents i18next from attempting to load unsupported language files (e.g., fr, de, zh)
- **Benefit:** Cleaner fallback behavior, avoids 404s for missing translation files

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - implementation was straightforward following the research patterns.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Phase 4 complete.** All i18n functionality implemented and validated:
- Spanish-first detection working correctly
- User language preferences persist across sessions
- Layouts handle text length variance without breaking
- Language switcher provides manual override

**Production ready:**
- First-time visitors see Spanish by default (unless English browser)
- English-speaking partners can access English version
- User choices persist via localStorage
- Mobile and desktop layouts validated in both languages

No blockers or concerns for deployment.

---
*Phase: 04-detection-polish*
*Completed: 2026-01-24*
