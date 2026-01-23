---
phase: 02-component-integration
plan: 02
subsystem: ui
tags: [react-i18next, framer-motion, index-based-translation, accordion-state]

# Dependency graph
requires:
  - phase: 02-01
    provides: Translation hook patterns and animation integration established
provides:
  - All 9 remaining landing components fully translated (13/13 total)
  - Index-based translation pattern for array iterations
  - Accordion state preservation on language switch
  - Complete landing page multi-language support
affects: [03-language-switcher, future-content-updates]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Index-based translation keys: t(`key.items.${index}.prop`)"
    - "Accordion state preservation: key on AnimatePresence content only"
    - "whitespace-pre-line for multiline translations"

key-files:
  created: []
  modified:
    - src/components/landing/PainPointsSection.tsx
    - src/components/landing/TransformationSection.tsx
    - src/components/landing/MethodSection.tsx
    - src/components/landing/EcosystemSection.tsx
    - src/components/landing/TestimonialsSection.tsx
    - src/components/landing/AudienceFitSection.tsx
    - src/components/landing/PricingSection.tsx
    - src/components/landing/CurriculumSection.tsx
    - src/components/landing/FAQSection.tsx

key-decisions:
  - "Index-based translation pattern applied consistently across all array components"
  - "AnimatePresence key includes language for content re-animation while preserving parent state"
  - "whitespace-pre-line used for multiline translations with \n line breaks"

patterns-established:
  - "Array iteration: Array.from({ length: N }).map((_, index) => ...)"
  - "State preservation: key={`content-${index}-${i18n.language}`} on AnimatePresence child only"
  - "Icon mapping: const icons = [...]; const Icon = icons[index];"

# Metrics
duration: 7min
completed: 2026-01-23
---

# Phase 02 Plan 02: Array-Based Components Migration Summary

**All 9 remaining landing components migrated to translations using index-based keys, completing full landing page multi-language support with accordion state preservation**

## Performance

- **Duration:** 7 min
- **Started:** 2026-01-23T21:16:22Z
- **Completed:** 2026-01-23T21:23:35Z
- **Tasks:** 5
- **Files modified:** 9

## Accomplishments
- Migrated all array-based components (pain points, transformation, method steps) with index-based translation keys
- Migrated complex nested data components (ecosystem stats/partners, testimonials, audience fit)
- Migrated pricing section with nested details and includes arrays
- Implemented accordion state preservation in CurriculumSection (4 weeks with nested learnings/projects)
- Migrated FAQSection with multiline answers and accordion state
- Complete landing page now supports English and Spanish via console language switching
- All 13 landing components successfully using useTranslation hook

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate array-based components** - `baec182` (feat)
   - PainPointsSection (3 items)
   - TransformationSection (4 items)
   - MethodSection (split title, 5 explanation strings, 4 steps)

2. **Task 2: Migrate ecosystem/testimonials/audience fit** - `8b2ad91` (feat)
   - EcosystemSection (5 partners, 3 stats, authority text, sponsor CTA)
   - TestimonialsSection (3 testimonials)
   - AudienceFitSection (5 + 5 items)

3. **Task 3: Migrate pricing section** - `3e09361` (feat)
   - Cohort title/subtitle, badge, prices
   - Program details grid (4 items)
   - Includes section (5 items)
   - CTA and guarantee text

4. **Task 4: Migrate curriculum section** - `5c505a4` (feat)
   - Title and 4 weeks with nested arrays
   - Each week: number, title, tagline, 3 learnings, project (name/input/output)
   - Supporting text with line breaks
   - Critical: Accordion state preserved via AnimatePresence key pattern

5. **Task 5: Migrate FAQ section** - `0f90997` (feat)
   - Title and 8 FAQ items
   - Multiline answers with whitespace-pre-line
   - Accordion state preserved

## Files Created/Modified
- `src/components/landing/PainPointsSection.tsx` - 3 pain points with index-based iteration
- `src/components/landing/TransformationSection.tsx` - 4 transformation items before/after
- `src/components/landing/MethodSection.tsx` - Split title, 5 explanation texts, 4 steps
- `src/components/landing/EcosystemSection.tsx` - 5 partners, 3 stats, authority with Frutero span, sponsor CTA
- `src/components/landing/TestimonialsSection.tsx` - 3 testimonials with quote/name/role/company
- `src/components/landing/AudienceFitSection.tsx` - Two lists of 5 items each (forYou/notForYou)
- `src/components/landing/PricingSection.tsx` - Cohort info, 4 program details, 5 includes, CTA, guarantee
- `src/components/landing/CurriculumSection.tsx` - 4 weeks with nested learnings (3 each) and project details, accordion state preserved
- `src/components/landing/FAQSection.tsx` - 8 FAQ items with multiline answers

## Decisions Made

**Index-based translation pattern:**
- Applied consistently: `t(\`key.items.\${index}.prop\`)`
- Enables validation of array length consistency
- Works with existing translation structure from Plan 01-02

**Accordion state preservation:**
- CurriculumSection: Added `key={content-${weekIndex}-${i18n.language}}` to AnimatePresence motion.div only
- Parent containers (StaggerContainer, outer motion.div) do NOT have key prop
- This ensures openWeek state persists while content re-animates on language change
- FAQSection: Radix UI Accordion manages internal state, no special handling needed

**Multiline text handling:**
- Used `whitespace-pre-line` CSS class for translations with `\n` line breaks
- Applied to FAQ answers and curriculum supporting text
- Preserves formatting from translation files

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all components migrated successfully following established patterns from Plan 02-01.

## Next Phase Readiness

**Ready for Phase 3 (Language Switcher & Polish):**
- All 13 landing components fully translated
- Animations re-trigger on language change via animationKey prop
- Accordion states preserved during language switching
- Application renders correctly in both English and Spanish
- Console language switching verified: `window.i18n.changeLanguage('en')` / `window.i18n.changeLanguage('es')`

**Next steps:**
- Implement UI language switcher component (header toggle)
- Add keyboard shortcuts for language switching
- Polish transitions and loading states
- Final testing and refinement

**Array counts verified:**
- Pain points: 3
- Transformations: 4
- Method steps: 4
- Ecosystem partners: 5, stats: 3
- Testimonials: 3
- Audience fit: 5 + 5
- Pricing includes: 5
- Curriculum weeks: 4 (each with 3 learnings)
- FAQ items: 8

---
*Phase: 02-component-integration*
*Completed: 2026-01-23*
