# Phase 2: Component Integration - Research

**Researched:** 2026-01-23
**Domain:** react-i18next component integration, Framer Motion re-animation, complex content translation
**Confidence:** HIGH

## Summary

Phase 2 involves migrating 13 hardcoded Spanish components to use react-i18next translation hooks, with the critical requirement that Framer Motion animations re-trigger when language changes. This research identifies proven patterns for:

1. **Simple string replacement**: Using `useTranslation()` hook's `t()` function for basic text (90% of strings)
2. **Complex JSX content**: Using `Trans` component for strings containing links, bold text, or React elements (10% of strings)
3. **Array iteration patterns**: Accessing nested array translations using dot notation with `.map()` and numeric indices
4. **Animation re-triggering**: Using Framer Motion's `key={i18n.language}` prop to force component remount when language changes
5. **ScrollReveal modification**: Adding `animationKey` prop to wrapper component to propagate key changes to animated children

The standard approach is component-by-component migration (no automation tools needed for 13 components), starting with simpler components (Footer, Hero) before complex ones (Curriculum with accordion state). Testing via browser console with `i18n.changeLanguage('en')` provides immediate visual feedback.

**Primary recommendation:** Migrate components in order of complexity (simple → complex), use `Trans` component only for JSX interpolation (links/bold), add `key={i18n.language}` to all motion.div elements for re-animation, and extend ScrollReveal component to accept `animationKey` prop.

## Standard Stack

Already established in Phase 1:

### Core (Installed)
| Library | Version | Purpose | Integration Pattern |
|---------|---------|---------|---------------------|
| react-i18next | 16.5.3 | React bindings for i18next | `useTranslation()` hook in components |
| i18next | 25.8.0 | Core i18n framework | Configured in `src/i18n/config.ts` |
| framer-motion | 12.27.1 | Animation library | Works with key prop for re-animation |

### Phase 2 Specific Patterns
| Pattern | When to Use | Example Location |
|---------|-------------|------------------|
| `useTranslation()` hook | Simple text strings | Hero badges, buttons, titles |
| `Trans` component | JSX elements in translations | Footer copyright, FAQ answers with links |
| `returnObjects: true` | Array/object translations | Pain points items, curriculum weeks |
| `key={i18n.language}` | Force animation re-trigger | All motion.div with animations |

**No additional installations needed** - all required libraries already in package.json from Phase 1.

## Architecture Patterns

### Pattern 1: Basic String Replacement with useTranslation

**What:** Replace hardcoded Spanish strings with `t()` function calls using hierarchical translation keys
**When to use:** 90% of component text - simple strings without HTML/JSX elements
**Example:**

```typescript
// BEFORE: Hardcoded Spanish
export function HeroSection() {
  return (
    <section>
      <h1>Construye Agentes IA</h1>
      <p>Llevas meses jugando con ChatGPT...</p>
      <Button>Reserva Tu Lugar</Button>
    </section>
  );
}

// AFTER: Translation hooks
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('hero.title.line1')}</h1>
      <p>{t('hero.subtitle.problem')}</p>
      <Button>{t('hero.cta.primary')}</Button>
    </section>
  );
}
```

**Key points:**
- Destructure only `{ t }` if only translating text
- Destructure `{ t, i18n }` if also need language state
- Translation keys use dot notation matching JSON structure
- TypeScript provides autocomplete for keys via type augmentation

### Pattern 2: Trans Component for JSX Interpolation

**What:** Use `Trans` component when translations contain React elements (links, bold, formatting)
**When to use:** Translations containing `<strong>`, `<Link>`, `<br/>`, or other JSX elements
**Example:**

```typescript
// Source: https://react.i18next.com/latest/trans-component

// BEFORE: Hardcoded with JSX
export function Footer() {
  return (
    <p>
      © 2026 <strong>Frutero</strong>. Todos los derechos reservados.
    </p>
  );
}

// AFTER: Trans component with named components
import { Trans } from 'react-i18next';

export function Footer() {
  return (
    <p>
      <Trans
        i18nKey="footer.copyright"
        components={{ strong: <strong /> }}
      />
    </p>
  );
}

// Translation file:
// "footer.copyright": "© 2026 <strong>Frutero</strong>. All rights reserved."
```

**Named components pattern (recommended over indexed):**
```typescript
// For reusable components like links
<Trans
  i18nKey="legal.acceptance"
  components={{
    termsLink: <Link to="/terms" />,
    privacyLink: <Link to="/privacy" />
  }}
/>

// Translation: "By signing up, you agree to our <termsLink>terms</termsLink> and <privacyLink>privacy policy</privacyLink>."
```

**When NOT to use Trans:**
- Simple text without HTML/JSX → use `t()` instead
- Multiple separate strings → use multiple `t()` calls
- Trans adds complexity - official docs say "in most cases you don't even need it"

### Pattern 3: Array Iteration with Translations

**What:** Access array items in translation files using numeric index keys and `.map()`
**When to use:** Lists of items (pain points, testimonials, FAQ items, curriculum weeks)
**Example:**

```typescript
// Source: https://www.i18next.com/translation-function/objects-and-arrays

// Translation structure (already exists from Phase 1):
// {
//   "painPoints": {
//     "items": {
//       "0": { "title": "Prompts Sueltos", "description": "..." },
//       "1": { "title": "Demos Que Mueren", "description": "..." },
//       "2": { "title": "Cero Control", "description": "..." }
//     }
//   }
// }

// BEFORE: Hardcoded array
const painPoints = [
  { title: "Prompts Sueltos", description: "Cada conversación..." },
  { title: "Demos Que Mueren", description: "Funciona en tu laptop..." },
  { title: "Cero Control", description: "El agente alucina..." }
];

export function PainPointsSection() {
  return (
    <div>
      {painPoints.map((point) => (
        <div key={point.title}>
          <h3>{point.title}</h3>
          <p>{point.description}</p>
        </div>
      ))}
    </div>
  );
}

// AFTER: Translation-driven with index-based keys
import { useTranslation } from 'react-i18next';

export function PainPointsSection() {
  const { t } = useTranslation();
  const itemCount = 3; // Number of items in translation file

  return (
    <div>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index}>
          <h3>{t(`painPoints.items.${index}.title`)}</h3>
          <p>{t(`painPoints.items.${index}.description`)}</p>
        </div>
      ))}
    </div>
  );
}
```

**Alternative pattern - returnObjects (for entire array):**
```typescript
const { t } = useTranslation();
const items = t('painPoints.items', { returnObjects: true }) as Array<{title: string, description: string}>;

return (
  <div>
    {Object.values(items).map((item, index) => (
      <div key={index}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
);
```

**Recommendation:** Use index-based template literals (`t(\`key.${index}.prop\`)`) for clarity and to avoid Object.values() type casting.

### Pattern 4: Framer Motion Re-Animation on Language Change

**What:** Add `key={i18n.language}` prop to motion.div components to force remount and re-trigger animations when language changes
**When to use:** All components with Framer Motion animations that should replay on language switch
**Example:**

```typescript
// Source: https://www.nan.fyi/keys-in-framer-motion

// BEFORE: Animation only plays on mount
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {t('hero.title.line1')}
    </motion.h1>
  );
}

// AFTER: Animation re-triggers on language change
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t, i18n } = useTranslation();

  return (
    <motion.h1
      key={i18n.language} // Remounts component when language changes
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {t('hero.title.line1')}
    </motion.h1>
  );
}
```

**How it works:**
- React's key prop uniquely identifies components
- When key changes (e.g., 'es' → 'en'), React unmounts old component and mounts new one
- Mounting triggers Framer Motion's `initial` → `animate` transition
- No AnimatePresence needed for simple re-animation

**Performance consideration:**
- Remounting has cost - acceptable for language change (infrequent user action)
- Don't use key prop for frequent state changes (use `animate` prop instead)
- Each remount triggers useEffect hooks - acceptable for this use case

### Pattern 5: ScrollReveal Component Modification

**What:** Extend ScrollReveal wrapper to accept `animationKey` prop that forces remount of wrapped content
**When to use:** Components wrapped in ScrollReveal that need animations to replay on language change
**Current implementation:**

```typescript
// src/components/ui/scroll-reveal.tsx (CURRENT)
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 30,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Proposed modification:**
```typescript
// Add animationKey to props interface
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  animationKey?: string; // NEW: Key to force re-animation
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 30,
  once = true,
  animationKey, // NEW
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      key={animationKey} // NEW: Pass key to motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Usage in components:**
```typescript
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function PainPointsSection() {
  const { t, i18n } = useTranslation();

  return (
    <ScrollReveal animationKey={i18n.language}>
      <h2>{t('painPoints.title.line1')}</h2>
    </ScrollReveal>
  );
}
```

**Why this pattern:**
- Preserves existing ScrollReveal API (animationKey is optional)
- Avoids breaking existing components that don't need re-animation
- Centralizes key prop logic in wrapper component
- Makes intention explicit: "re-animate on this key change"

### Pattern 6: StaggerContainer Component Modification

**Similar modification needed for StaggerContainer:**

```typescript
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animationKey?: string; // NEW
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  animationKey, // NEW
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      key={animationKey} // NEW
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Anti-Patterns to Avoid

- **Using returnObjects without type casting:** Results in TypeScript errors and runtime bugs
- **Adding key prop to non-animated elements:** Unnecessary remounting, performance cost
- **Using Trans component for simple text:** Adds complexity, use `t()` instead
- **Hardcoding array indices:** If translation file has different number of items, will break
- **Using array index as React key in mapped elements:** Causes animation glitches (use stable identifier instead)
- **Not destructuring i18n from useTranslation:** Will cause "i18n is not defined" errors when adding key prop

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Language switcher UI | Custom dropdown with state | `i18n.changeLanguage()` + useTranslation hook | Already persists to localStorage, triggers re-render automatically |
| Manual key management for animations | Custom state variable tracking content changes | `key={i18n.language}` pattern | React handles remount, works with all animation libraries |
| Custom Trans component | String replacement with dangerouslySetInnerHTML | `<Trans>` component from react-i18next | Handles indexed/named components, supports interpolation, type-safe |
| Translation key validation | Manual JSON comparison | Pre-commit hook with validation script (already in Phase 1) | Automated, catches drift before commit |
| Finding all hardcoded strings | Manual search and replace | jscodeshift-react-i18next | Automated extraction, but overkill for 13 components |

**Key insight:** Component integration patterns are well-established in react-i18next ecosystem. The only custom code needed is extending ScrollReveal/StaggerContainer props (3 lines each).

## Common Pitfalls

### Pitfall 1: Forgetting to Destructure i18n from useTranslation

**What goes wrong:** Component uses `key={i18n.language}` but only destructures `{ t }` from hook
**Why it happens:** Initial implementation only needs `t()` for translation, key prop added later
**How to avoid:**
- Grep for `key={i18n.language}` to find components needing i18n destructuring
- Pattern: Always destructure both when using key prop: `const { t, i18n } = useTranslation();`
**Warning signs:**
- "i18n is not defined" error in browser console
- Animations don't re-trigger on language change

### Pitfall 2: Using Trans Component for Simple Strings

**What goes wrong:** Developer wraps every translated string in `<Trans>` "to be safe"
**Why it happens:** Misunderstanding when Trans is needed vs `t()` function
**How to avoid:**
- Rule: If translation contains JSX/HTML elements → use Trans. Otherwise → use `t()`
- Trans has performance overhead (creates React elements even for plain text)
- Official docs say "in most cases you don't even need it"
**Warning signs:**
- Every string wrapped in `<Trans i18nKey="..." />`
- No usage of `t()` function in component

### Pitfall 3: Array Index Mismatch Between Languages

**What goes wrong:** Spanish translation has 3 items, English has 2 items, component maps 3 times
**Why it happens:** Translation files edited separately, missing key validation
**How to avoid:**
- Keep item counts identical across all languages
- Use Phase 1's pre-commit validation to catch mismatches
- Test both languages before committing
**Warning signs:**
- Missing translation warnings in console
- Translation keys appearing as text (e.g., "painPoints.items.2.title")
- Different number of cards/items rendered in each language

### Pitfall 4: Component State Reset on Language Change

**What goes wrong:** Accordion is open, user switches language, accordion closes
**Why it happens:** `key={i18n.language}` on parent component remounts entire tree, losing state
**How to avoid:**
- Add key prop only to motion.div elements, not to parent containers with state
- Keep stateful logic (useState) in components WITHOUT key prop
- Animated children can have key prop without affecting parent state
**Example of correct placement:**
```typescript
// WRONG: Key on parent loses accordion state
export function CurriculumSection() {
  const { i18n } = useTranslation();
  const [openWeek, setOpenWeek] = useState(1);

  return (
    <section key={i18n.language}> {/* DON'T: Remounts state */}
      <button onClick={() => setOpenWeek(2)}>Week 2</button>
    </section>
  );
}

// CORRECT: Key only on motion elements
export function CurriculumSection() {
  const { t, i18n } = useTranslation();
  const [openWeek, setOpenWeek] = useState(1); // State preserved

  return (
    <section>
      <motion.h2 key={i18n.language}> {/* DO: Only animates, doesn't lose state */}
        {t('curriculum.title')}
      </motion.h2>
      <button onClick={() => setOpenWeek(2)}>Week 2</button>
    </section>
  );
}
```

### Pitfall 5: ScrollReveal animationKey Not Propagating

**What goes wrong:** Pass `animationKey={i18n.language}` to ScrollReveal but animations don't replay
**Why it happens:** ScrollReveal props interface doesn't include animationKey prop before modification
**How to avoid:**
- Modify ScrollReveal component FIRST before using animationKey prop
- TypeScript will error if prop doesn't exist (good - catches this early)
- Test ScrollReveal modification in isolation before migrating all components
**Warning signs:**
- TypeScript error: "Property 'animationKey' does not exist on type 'ScrollRevealProps'"
- Animations replay on direct motion.div but not in ScrollReveal-wrapped content

### Pitfall 6: Over-Using Key Prop for Performance

**What goes wrong:** Every motion.div gets `key={i18n.language}`, causing excessive remounting
**Why it happens:** "Apply everywhere" mentality without considering performance
**How to avoid:**
- Only add key prop to animated elements with initial → animate transitions
- Static elements don't need re-animation (no key prop needed)
- Background gradients, container divs → no key prop
- Text with fade-in, slide-up → yes, key prop
**Performance check:**
- Open React DevTools Profiler during language switch
- Look for excessive commit times (>100ms)
- If slow, audit which components have key={i18n.language}

## Code Examples

Verified patterns for Phase 2 implementation:

### Example 1: Simple Component (Footer)

```typescript
// src/components/landing/Footer.tsx
import { useTranslation } from 'react-i18next';
import { Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  // Footer links from translation
  const footerLinks = [
    { href: "#programa", label: t('footer.links.program') },
    { href: "#faq", label: t('footer.links.faq') },
    { href: "#", label: t('footer.links.contact') },
    { href: "#", label: t('footer.links.terms') },
    { href: "#", label: t('footer.links.privacy') },
  ];

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{t('footer.logo.text')}</span>
          <span className="text-muted-foreground text-sm">
            {t('footer.logo.byline')}
          </span>
        </div>

        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-muted-foreground">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
```

### Example 2: Component with Arrays (PainPointsSection)

```typescript
// src/components/landing/PainPointsSection.tsx
import { useTranslation } from 'react-i18next';
import { RefreshCw, StopCircle, Dices } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [RefreshCw, StopCircle, Dices];

export function PainPointsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('painPoints.title.line1')} <br />
            <span className="text-muted-foreground">
              {t('painPoints.title.line2')}
            </span>
          </h2>
        </motion.div>

        <StaggerContainer
          animationKey={i18n.language}
          className="grid md:grid-cols-3 gap-6"
        >
          {Array.from({ length: 3 }).map((_, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="p-8 rounded-3xl bg-card"
              >
                <Icon className="w-7 h-7 text-destructive" />
                <h3 className="text-xl font-semibold mb-3">
                  {t(`painPoints.items.${index}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`painPoints.items.${index}.description`)}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### Example 3: Component with Complex Accordion State (CurriculumSection)

```typescript
// src/components/landing/CurriculumSection.tsx
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FileCode2, Bot, Link2, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";

const icons = [FileCode2, Bot, Link2, Cloud];

export function CurriculumSection() {
  const { t, i18n } = useTranslation();
  const [openWeek, setOpenWeek] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal animationKey={i18n.language}>
          <h2 className="text-3xl font-bold mb-4">
            {t('curriculum.title')}
          </h2>
        </ScrollReveal>

        <StaggerContainer animationKey={i18n.language}>
          {Array.from({ length: 4 }).map((_, weekIndex) => {
            const Icon = icons[weekIndex];
            return (
              <motion.div key={weekIndex} className="rounded-2xl bg-card">
                <button
                  onClick={() => setOpenWeek(openWeek === weekIndex ? null : weekIndex)}
                  className="w-full flex items-center p-6"
                >
                  <Icon className="w-7 h-7 text-primary" />
                  <span>{t(`curriculum.weeks.${weekIndex}.number`)}</span>
                  <span>{t(`curriculum.weeks.${weekIndex}.title`)}</span>
                </button>

                <AnimatePresence>
                  {openWeek === weekIndex && (
                    <motion.div
                      key={i18n.language} // Re-animate content on language change
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 pb-6">
                        <h4>{t(`curriculum.weeks.${weekIndex}.learningTitle`)}</h4>
                        <ul>
                          {Array.from({ length: 3 }).map((_, learningIndex) => (
                            <li key={learningIndex}>
                              {t(`curriculum.weeks.${weekIndex}.learnings.${learningIndex}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

**Key points in this example:**
- `openWeek` state lives in component WITHOUT key prop (state preserved)
- ScrollReveal and StaggerContainer get `animationKey` for initial animations
- AnimatePresence content gets `key={i18n.language}` for expand/collapse re-animation
- Nested array access: `curriculum.weeks.${weekIndex}.learnings.${learningIndex}`

### Example 4: Hero Section with Multiple Animations

```typescript
// src/components/landing/HeroSection.tsx
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative min-h-screen">
      {/* Background effects - NO key prop (no re-animation needed) */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badges - WITH key prop (re-animate text change) */}
          <motion.div
            key={`badges-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mb-8"
          >
            <Badge variant="outline">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {t('hero.badge.virtual')}
            </Badge>
            <Badge variant="outline">
              {t('hero.badge.duration')}
            </Badge>
          </motion.div>

          {/* Title - WITH key prop (re-animate on language change) */}
          <motion.h1
            key={`title-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('hero.title.line1')} <br />
            <span className="text-gradient">{t('hero.title.line2')}</span> <br />
            {t('hero.title.line3')}
          </motion.h1>

          {/* Subtitles - WITH key prop */}
          <motion.p
            key={`subtitle1-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {t('hero.subtitle.problem')}
          </motion.p>

          <motion.p
            key={`subtitle2-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg font-medium mb-10"
          >
            {t('hero.subtitle.solution')}
          </motion.p>

          {/* CTAs - WITH key prop */}
          <motion.div
            key={`ctas-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button size="lg">
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>

          {/* Urgency text - WITH key prop */}
          <motion.p
            key={`urgency-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            {t('hero.urgency')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
```

**Pattern notes:**
- Background gradient effects: no key prop (static decoration)
- All text content: key prop with descriptive prefix (`badges-`, `title-`, etc.)
- Staggered delays preserved (0.1s, 0.2s, 0.3s) - animations cascade naturally
- Each motion element gets unique key to prevent React warning about duplicate keys

## Migration Order Strategy

Components ranked by complexity (migrate in this order):

### Phase 2.1: Simple Components (No Arrays, No Complex State)
1. **Footer** - Simple links and copyright text
2. **Navbar** - Links and CTA button
3. **HeroSection** - Multiple text elements, simple animations

**Estimated time:** 1-2 hours
**Testing:** Visual inspection, browser console language switching

### Phase 2.2: Array-Based Components (Map Iterations)
4. **PainPointsSection** - 3 items array
5. **TransformationSection** - 4 items array
6. **TestimonialsSection** - 3 items array
7. **EcosystemSection** - Stats array, partners array
8. **AudienceFitSection** - Two arrays (forYou, notForYou)
9. **MethodSection** - Steps array
10. **PricingSection** - Includes array

**Estimated time:** 3-4 hours
**Testing:** Verify item counts match between languages

### Phase 2.3: Complex Components (Nested Arrays, State Management)
11. **CurriculumSection** - Nested arrays (weeks → learnings), accordion state
12. **FAQSection** - Array with accordion, multi-line answers

**Estimated time:** 2-3 hours
**Testing:** Verify state preservation, nested translations work

### Phase 2.4: Components with Trans (JSX Interpolation)
13. **FinalCTASection** - May have links in copy

**Estimated time:** 1 hour
**Testing:** Verify links render correctly, formatting preserved

**Total estimated time:** 7-10 hours for all 13 components

## Testing Workflow for Language Switching

### Development Testing Pattern

**Setup:**
```typescript
// Add to App.tsx or root component temporarily
import { useTranslation } from 'react-i18next';

function DevLanguageSwitcher() {
  const { i18n } = useTranslation();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
      <button
        onClick={() => i18n.changeLanguage('es')}
        style={{ padding: '8px', margin: '4px', background: i18n.language === 'es' ? 'blue' : 'gray' }}
      >
        ES
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        style={{ padding: '8px', margin: '4px', background: i18n.language === 'en' ? 'blue' : 'gray' }}
      >
        EN
      </button>
    </div>
  );
}
```

**Browser Console Testing (No UI needed):**
```javascript
// Switch to English
i18n.changeLanguage('en')

// Switch to Spanish
i18n.changeLanguage('es')

// Check current language
i18n.language

// Check resolved language
i18n.resolvedLanguage

// Enable cimode (shows translation keys instead of values)
i18n.changeLanguage('cimode')
```

**Visual Inspection Checklist:**
- [ ] All text changes to target language
- [ ] No translation keys visible (e.g., "hero.title.line1")
- [ ] Animations replay smoothly
- [ ] Layout doesn't break (English text longer/shorter than Spanish)
- [ ] Links and bold formatting preserved
- [ ] Component state preserved (accordion stays open/closed)

**Console Warning Checks:**
- [ ] No "missing translation" warnings
- [ ] No "i18n is not defined" errors
- [ ] No React duplicate key warnings

### Testing Each Component Type

**Simple component testing:**
1. Open page with component visible
2. Run `i18n.changeLanguage('en')` in console
3. Verify text changes and animations replay
4. Run `i18n.changeLanguage('es')` to switch back
5. Check for layout breaks (different text lengths)

**Array component testing:**
1. Count items in Spanish vs English translation files
2. Switch language and verify same number of items render
3. Check for any "undefined" or translation key strings
4. Verify animations stagger correctly in both languages

**Stateful component testing:**
1. Open accordion/interactive element
2. Switch language via console
3. Verify state preserved (accordion still open)
4. Verify content inside interactive element updated
5. Check animations replay within interactive element

### Automated Testing Considerations

**Not required for Phase 2 success criteria** (manual console testing sufficient), but for future:

```typescript
// Example: Testing language switching
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import i18n from '@/i18n/config';
import { HeroSection } from './HeroSection';

test('updates text when language changes', async () => {
  render(<HeroSection />);

  // Initially Spanish
  expect(screen.getByText(/Construye Agentes IA/i)).toBeInTheDocument();

  // Switch to English
  await act(async () => {
    await i18n.changeLanguage('en');
  });

  await waitFor(() => {
    expect(screen.getByText(/Build AI Agents/i)).toBeInTheDocument();
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Conditional rendering based on language state | `key={i18n.language}` for re-animation | Framer Motion v4+ (2021) | Simpler code, React handles remounting automatically |
| Manual Trans with indexed components `<0>`, `<1>` | Named components pattern `components={{ link: <Link /> }}` | react-i18next v11.6.0 (2020) | More readable translations, easier for translators |
| `t('key', { returnObjects: true })` everywhere | Index-based template literals `t(\`key.${i}\`)` | Community best practice (2023+) | Better type safety, explicit about structure |
| Custom animation re-trigger logic with useEffect | Declarative key prop pattern | Community adoption (2022+) | Less code, more performant, clearer intent |
| ScrollReveal.js library | Custom Framer Motion scroll reveal components | React ecosystem shift (2020+) | Better React integration, TypeScript support, smaller bundle |

**Deprecated/outdated:**
- `withTranslation` HOC: Use `useTranslation()` hook instead
- `i18n.t()` in components: Use `const { t } = useTranslation()` instead
- AnimatePresence mode="wait": Use mode="popLayout" for smoother transitions (Motion v10+)
- ScrollReveal.js: Not React-friendly, use intersection observer + Framer Motion

## Open Questions

### Question 1: Animation Performance at Scale

**What we know:** Adding `key={i18n.language}` to every motion.div causes remounting
**What's unclear:** Performance impact with 100+ animated elements on page at once
**Evidence:** Community reports acceptable performance for language switching (infrequent action)
**Recommendation:** Start with key prop on all animated text elements. If React DevTools Profiler shows >200ms commit time during language switch, optimize by removing key from non-critical animations (background effects, subtle hover states)

### Question 2: Trans Component for Multiline FAQ Answers

**What we know:** Translation files have multiline strings with \n for FAQ answers
**What's unclear:** Whether `\n` in translation strings works with `t()` or requires `<Trans>` with `<br/>` tags
**Evidence:** i18next preserves \n in strings, React renders them as-is (no line break in HTML)
**Recommendation:**
- Option A: Replace \n with `<br/>` in translation files, use `<Trans>` component
- Option B: Use `t()` and CSS white-space: pre-line to preserve line breaks
- Prefer Option B (simpler, no Trans needed)

### Question 3: ScrollReveal "once" Prop Behavior with Key Remounting

**What we know:** ScrollReveal has `once: true` prop (animation plays once)
**What's unclear:** Does remounting via key prop reset the "once" flag, causing animation replay?
**Evidence:** Key prop forces full remount, resetting all component state including refs
**Recommendation:** Test this early. If `once: true` prevents re-animation on language change, may need to conditionally set `once={false}` when animationKey prop provided:
```typescript
const shouldAnimateOnce = !animationKey;
const isInView = useInView(ref, { once: shouldAnimateOnce, margin: "-100px" });
```

### Question 4: TypeScript Type Safety for Array Indices

**What we know:** Translation files use numeric string keys: "0", "1", "2"
**What's unclear:** TypeScript type augmentation handles this correctly for autocomplete
**Evidence:** Type augmentation in Phase 1 uses Spanish JSON as source of truth
**Recommendation:** Test TypeScript autocomplete for `t('painPoints.items.0.title')` - if no autocomplete, may need to adjust type definitions or accept this limitation (runtime still works)

## Sources

### Primary (HIGH confidence)
- [Trans Component - react-i18next documentation](https://react.i18next.com/latest/trans-component) - Official patterns for JSX interpolation
- [Objects and Arrays - i18next documentation](https://www.i18next.com/translation-function/objects-and-arrays) - Array access and returnObjects
- [The Power of Keys in Framer Motion](https://www.nan.fyi/keys-in-framer-motion) - Key prop re-animation pattern
- [API - i18next documentation](https://www.i18next.com/overview/api) - changeLanguage function reference
- [Testing - react-i18next documentation](https://react.i18next.com/misc/testing) - Test patterns for language switching

### Secondary (MEDIUM confidence)
- [How to re-animate a Framer Motion component based on state](https://markadamfoster.com/framer-motion-reanimate/) - Community key prop patterns
- [React Key Prop Best Practices - Medium](https://medium.com/@chanukachandrayapa/react-key-prop-best-practices-from-state-mismanagement-to-optimized-rendering-cb85c62287f6) - Performance implications
- [A Guide to React Localization with i18next - Phrase](https://phrase.com/blog/posts/localizing-react-apps-with-i18next/) - Migration patterns verified
- [Scroll Reveal Animation in React using Framer Motion](https://victoreke.com/blog/scroll-reveal-animation-in-react-using-framer-motion) - ScrollReveal implementation patterns
- [Method for iterating over an array - i18next GitHub Issue #231](https://github.com/i18next/react-i18next/issues/231) - Community array iteration patterns

### Tertiary (LOW confidence - marked for validation)
- [jscodeshift-react-i18next GitHub](https://github.com/BartoszJarocki/jscodeshift-react-i18next) - Automated extraction (not needed for 13 components)
- [React i18next change language - CodeSandbox](https://codesandbox.io/s/react-i18next-change-language-2971x) - Language switcher examples

## Metadata

**Confidence breakdown:**
- Basic string replacement (useTranslation hook): HIGH - Official docs, well-established pattern
- Trans component usage: HIGH - Official docs with clear examples
- Array iteration: HIGH - Official docs plus verified community patterns
- Framer Motion key prop: HIGH - Authoritative blog post plus official Framer Motion docs
- ScrollReveal modification: MEDIUM - Custom pattern (not in docs), but follows standard React patterns
- Testing workflow: MEDIUM - Combination of official docs and community practices

**Research date:** 2026-01-23
**Valid until:** 2026-03-23 (60 days - component integration patterns stable, Framer Motion/react-i18next APIs mature)
