# AgentCamp 2.0 Landing Page

## What This Is

A single-page landing site for AgentCamp 2.0 built with React, showcasing the program to potential participants and partners. The site features scroll-triggered animations, responsive design, and presents curriculum details, pain points, and program benefits in Spanish (with English toggle for partner communication).

## Core Value

Effectively communicate the AgentCamp 2.0 program value to both Spanish-speaking participants and English-speaking partners through a visually engaging, multi-language landing experience.

## Requirements

### Validated

<!-- Existing capabilities shipped and working -->

- ✓ Single-page landing with multiple sections (Hero, Pain Points, Curriculum, etc.) — existing
- ✓ Responsive design from mobile to desktop — existing
- ✓ Scroll-triggered animations using Framer Motion — existing
- ✓ Navigation bar with mobile menu support — existing
- ✓ Component-based architecture with shadcn/ui and Radix UI primitives — existing
- ✓ Dark mode theming — existing
- ✓ Spanish content for all landing sections — existing

### Active

<!-- Current scope: adding i18n support -->

- [ ] Users can toggle between Spanish and English languages
- [ ] Language toggle appears in navbar (left of CTA button)
- [ ] Selected language persists in browser storage across visits
- [ ] All landing page content has English translations
- [ ] Spanish remains default language on first visit

### Out of Scope

- URL-based language routing (e.g., /es, /en paths) — using browser storage instead
- Server-side language detection based on browser locale — explicit user choice only
- Additional languages beyond English/Spanish — limited to two languages for v1
- Translation management UI — translations hardcoded in JSON files

## Context

**Current State:**
- Vite + React 18 + TypeScript project
- Landing page with all content currently in Spanish
- Established component architecture with section-based composition
- Uses Framer Motion for scroll animations throughout

**User Need:**
- Existing Spanish content targets potential participants
- Need English version to communicate with potential partners
- Toggle must be easily accessible (navbar placement)

**Technical Environment:**
- Modern browser-based React SPA
- No backend; all content client-side
- Static hosting deployment

## Constraints

- **Library Choice**: react-i18next — standard for React i18n, compatible with Vite
- **Translation Quality**: Auto-generated translations acceptable (will be refined manually later) — use cheapest model for generation
- **Persistence**: Browser localStorage — simple, no server required
- **Default Language**: Spanish — maintains existing user experience

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| react-i18next over alternatives | Standard library for React, well-documented, Vite-compatible | — Pending |
| Browser storage over URL routing | Simpler implementation, no SEO concerns for landing page | — Pending |
| Auto-generate translations | Faster implementation, refinement can happen post-launch | — Pending |
| Spanish default | Existing audience expects Spanish, explicit opt-in for English | — Pending |

---
*Last updated: 2026-01-23 after initialization*
