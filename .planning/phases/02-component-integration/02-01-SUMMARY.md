---
phase: 02-component-integration
plan: 01
subsystem: ui
tags: [react-i18next, framer-motion, animation, multi-language, landing-page]

# Dependency graph
requires:
  - phase: 01-foundation-content
    provides: i18n configuration, translation JSON files, useTranslation hook
provides:
  - animationKey prop on ScrollReveal and StaggerContainer for language-aware re-animation
  - Translated Footer, Navbar, HeroSection, and FinalCTASection components
  - Pattern for re-triggering animations on language change via key prop
affects: [03-complex-components, remaining component migrations]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "animationKey prop passthrough for re-animation on state change"
    - "key={i18n.language} pattern for motion elements to re-trigger animations"
    - "useTranslation with i18n destructuring when key prop needed"

key-files:
  created: []
  modified:
    - src/components/ui/scroll-reveal.tsx
    - src/components/landing/Footer.tsx
    - src/components/landing/Navbar.tsx
    - src/components/landing/HeroSection.tsx
    - src/components/landing/FinalCTASection.tsx

key-decisions:
  - "animationKey as optional prop (non-breaking change for existing components)"
  - "Unique key prefixes (badges-, title-, subtitle1-, etc.) to avoid React duplicate key warnings"
  - "Social link aria-labels unchanged (Twitter, LinkedIn, YouTube are brand names, not translated)"
  - "Background gradient animations unchanged (decorative, no text content)"

patterns-established:
  - "animationKey prop: Optional string prop passed to motion.div key attribute for re-animation control"
  - "Language-aware animations: key={`element-${i18n.language}`} pattern for motion elements with initial/animate"
  - "Translation hook placement: useTranslation at component start, arrays/objects inside component for t() access"

# Metrics
duration: 4min
completed: 2026-01-23
---

# Phase 02 Plan 01: Animation & Translation Integration Summary

**Language-aware animation infrastructure with animationKey prop, plus Footer, Navbar, HeroSection, and FinalCTASection fully translated with re-triggering animations**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-23T20:03:07Z
- **Completed:** 2026-01-23T20:07:22Z
- **Tasks:** 5
- **Files modified:** 5

## Accomplishments
- Extended ScrollReveal and StaggerContainer with optional animationKey prop for language-aware re-animation
- Migrated 4 simple components (no arrays, no complex state) to use react-i18next
- Established pattern for re-triggering animations on language change via key={i18n.language}
- All components build successfully with TypeScript validation passing
- Translation validation confirms all keys in sync (194 keys each language)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend ScrollReveal and StaggerContainer with animationKey prop** - `92f66e2` (feat)
2. **Task 2: Migrate Footer component to use translations** - `9e0791b` (feat)
3. **Task 3: Migrate Navbar component to use translations** - `cc46158` (feat)
4. **Task 4: Migrate HeroSection component with animation re-triggering** - `8b2f245` (feat)
5. **Task 5: Migrate FinalCTASection component with animation re-triggering** - `c87b613` (feat)

## Files Created/Modified
- `src/components/ui/scroll-reveal.tsx` - Added optional animationKey prop to both ScrollReveal and StaggerContainer, passed to motion.div key attribute
- `src/components/landing/Footer.tsx` - Translated logo text, byline, navigation links, and copyright using useTranslation hook
- `src/components/landing/Navbar.tsx` - Translated nav items, CTA buttons, logo text, and menu label; navItems array moved inside component
- `src/components/landing/HeroSection.tsx` - Translated badges, title, subtitle, CTAs, and urgency; added key={`prefix-${i18n.language}`} to all motion elements with animations
- `src/components/landing/FinalCTASection.tsx` - Translated title, subtitle, CTA, and urgency; added animationKey={i18n.language} to all ScrollReveal wrappers

## Decisions Made

**animationKey as optional prop:**
Non-breaking change allows existing components to continue working without modification while enabling re-animation for language-aware components.

**Unique key prefixes for motion elements:**
Using badges-, title-, subtitle1-, subtitle2-, ctas-, urgency- prefixes prevents React duplicate key warnings when multiple motion elements in same component need language-based keys.

**Social links aria-labels unchanged:**
Twitter, LinkedIn, YouTube are brand names used for accessibility, not user-facing translated content.

**Background gradient animations excluded:**
Decorative motion elements with no text content don't need language-based keys - they animate once on mount and don't need to re-trigger.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed without issues.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for complex component migration (Plan 02):**
- animationKey infrastructure established and tested
- Pattern proven with 4 simple components
- Translation hook integration understood
- Build and validation passing

**What's next:**
- Migrate components with arrays (PainPoints, Transformation, Method, Curriculum)
- Migrate components with complex state and dynamic rendering
- Apply animationKey to StaggerContainer usages
- Maintain established patterns for consistency

**No blockers or concerns.**

---
*Phase: 02-component-integration*
*Completed: 2026-01-23*
