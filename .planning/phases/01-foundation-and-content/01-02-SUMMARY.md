---
phase: 01-foundation-content
plan: 02
subsystem: infra
tags: [i18n, react-i18next, translation, validation, husky, pre-commit]

# Dependency graph
requires:
  - phase: 01-01
    provides: i18next infrastructure with bundled translations
provides:
  - Complete Spanish translation file (194 keys) extracted from all landing components
  - Complete English translation file with identical structure
  - Translation validation script preventing key drift
  - Pre-commit hook enforcing translation parity (INFRA-05)
affects: [02-component-refactor, 03-language-switcher, all future content phases]

# Tech tracking
tech-stack:
  added: [husky]
  patterns: [hierarchical i18n keys by component, CommonJS validation script in ES module project]

key-files:
  created:
    - public/locales/es/translation.json
    - public/locales/en/translation.json
    - scripts/validate-translations.cjs
    - .husky/pre-commit
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Hierarchical key structure: component.element.variant pattern for maintainability"
  - "Array objects as indexed keys (items.0, items.1) for consistent validation"
  - ".cjs extension for validation script (project uses ES modules)"
  - "Source language (es) as validation baseline with targets compared to it"

patterns-established:
  - "Translation key naming: component-first hierarchy (navbar.links.home, hero.badge.virtual)"
  - "Multiline content with \\n for FAQ answers and descriptions"
  - "Technical terms and proper nouns unchanged (Agentcamp, Cursor, Claude Code)"

# Metrics
duration: 7min
completed: 2026-01-23
---

# Phase 01 Plan 02: Multi-language Content Setup Summary

**All Spanish content extracted into 194-key hierarchical structure, English translations with identical structure, and validation script with pre-commit hook preventing translation drift**

## Performance

- **Duration:** 7 minutes
- **Started:** 2026-01-23T19:48:59Z
- **Completed:** 2026-01-23T19:55:48Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Extracted all user-facing Spanish strings from 13 landing page components into hierarchical JSON
- Generated natural-sounding English translations maintaining identical key structure
- Created validation script detecting missing or extra keys between languages
- Configured pre-commit hook blocking commits when translations are out of sync (INFRA-05 requirement)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract Spanish content to translation.json** - `447edf4` (feat)
2. **Task 2: Generate English translations** - `610a3b8` (feat)
3. **Task 3: Create validation script with pre-commit hook** - `65443d3` (feat)

## Files Created/Modified
- `public/locales/es/translation.json` - 194 keys with all Spanish content from 13 landing components
- `public/locales/en/translation.json` - Identical structure with English translations
- `scripts/validate-translations.cjs` - Key parity validation script (CommonJS)
- `.husky/pre-commit` - Hook running validate:i18n before each commit
- `package.json` - Added validate:i18n and prepare scripts
- `package-lock.json` - Installed husky as devDependency

## Decisions Made
- **Hierarchical key structure:** Used component.element.variant pattern (e.g., `navbar.links.home`, `hero.badge.virtual`) for clarity and maintainability
- **Array handling:** Represented array objects with indexed keys (`items.0`, `items.1`) to enable flat-key comparison in validation
- **.cjs extension:** Used CommonJS for validation script since project has `"type": "module"` in package.json
- **Source language baseline:** Spanish (es) is the source, English compared against it (reflects primary audience)

## Deviations from Plan

**1. [Rule 3 - Blocking] Used .cjs extension for validation script**
- **Found during:** Task 3 (validation script creation)
- **Issue:** Initial .js extension failed with "require is not defined in ES module scope" because package.json has `"type": "module"`
- **Fix:** Renamed script to validate-translations.cjs and updated package.json script reference
- **Files modified:** scripts/validate-translations.cjs (renamed), package.json
- **Verification:** `npm run validate:i18n` succeeds, outputs "Validation PASSED"
- **Committed in:** 65443d3 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (blocking)
**Impact on plan:** Necessary for script to run in ES module environment. No scope change.

## Issues Encountered
None - tasks executed smoothly with one ES module compatibility fix.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Translation files populated and validated, ready for Phase 2 component refactoring
- Validation script prevents drift as components are updated to use t() calls
- Pre-commit hook ensures all future content additions maintain key parity
- English-speaking partners and Spanish-speaking participants both have complete translations

**Blockers:** None
**Concerns:** None - all infrastructure requirements (INFRA-05) met

---
*Phase: 01-foundation-content*
*Completed: 2026-01-23*
