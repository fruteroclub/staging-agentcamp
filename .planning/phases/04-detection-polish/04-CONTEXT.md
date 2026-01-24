# Phase 4: Detection & Polish - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Enhance the i18n experience with browser language auto-detection on first visit and production polish. This includes implementing smart language detection logic, ensuring user preferences persist correctly across sessions, and validating layouts handle text length variance. The switcher component and translation infrastructure already exist from Phases 1-3.

</domain>

<decisions>
## Implementation Decisions

### Detection priority & fallback
- **Browser preference wins on first visit**: If browser language is English, show English. If browser language is Spanish or anything else, show Spanish.
- **Unsupported languages fall back to Spanish**: Browser set to French, Chinese, German, etc. → default to Spanish (primary audience)
- **Explicit choice always wins**: Once user manually switches language via the switcher, that choice persists in localStorage and overrides browser preference on all future visits
- **No reset mechanism in UI**: Manual choice is permanent. Advanced users can clear browser localStorage to reset to auto-detection behavior.

### Language switch transitions
- **Instant updates (no transitions)**: Content updates immediately when user clicks EN/ES. Fast and responsive UX.
- **Roadmap adjustment**: Success criteria mentions "smooth transitions" but we've decided instant is better UX. Update ROADMAP.md to reflect this decision.

### Layout validation approach
- **Quick manual check**: Switch to Spanish, scroll through the page on desktop and mobile, note any obvious layout issues
- **Fix critical issues only**: If text overflow, broken layouts, or truncation occurs, fix it in this phase
- **Defer edge cases**: Minor spacing or aesthetic issues can be addressed later if they become problematic

### User preference persistence
- **Forever (no expiration)**: localStorage persists indefinitely until user manually clears browser data
- **Each device independent**: User can have different language preferences on laptop vs mobile vs tablet
- **Use react-i18next default key**: Store preference in `i18nextLng` localStorage key (standard, works out of the box)

### Claude's Discretion
- Exact implementation of browser language detection (navigator.language vs navigator.languages array)
- How to handle edge cases (browser language not set, privacy mode blocking localStorage)
- Specific breakpoints to test during manual layout validation

</decisions>

<specifics>
## Specific Ideas

- Detection logic should work silently - no UI indicators for "we detected your language"
- If layout issues are found during manual check, fix them with existing Tailwind utilities (truncate, line-clamp, responsive text sizing)

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope

</deferred>

---

*Phase: 04-detection-polish*
*Context gathered: 2026-01-23*
