# AgentCamp: Remove Floating Mobile CTA + Stripe Checkout & Convex Backend

## Context

The AgentCamp landing page is a pure frontend SPA (React 18 + Vite + TypeScript) with no backend. All CTA buttons link to a Tally form. We need to:

1. **Remove the floating mobile CTA** — it's a fixed-bottom button that looks terrible on mobile
2. **Add Convex backend + Stripe Checkout** — replace all remaining Tally links with a real payment flow that tracks registrations and manages spot availability

**Pricing**: $5,000 MXN early bird (first 20) / $7,500 MXN regular / 50 spots total
**Org context**: Convex is already used in `godinez-ai` and `poktapok`; Stripe integration exists in `godinez-studio`. We replicate those patterns.

---

## Part 1: Remove Floating Mobile CTA

### Files to modify

| File | Lines | Change |
|------|-------|--------|
| `src/components/landing/Navbar.tsx` | L130-137 | Delete the `{/* Floating Mobile CTA */}` block entirely |
| `src/components/landing-original/Navbar.tsx` | L130-137 | Same deletion |
| `src/locales/en/translation.json` | `navbar.ctaMobile` key | Remove (optional cleanup — won't break if left) |
| `src/locales/es/translation.json` | `navbar.ctaMobile` key | Same |

The floating CTA is a `<div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">` wrapping a full-width Button. Deleting it removes the persistent bottom bar on mobile. The mobile hamburger menu already has its own CTA button (L117-125), so mobile users still have a path to checkout.

After removal, the Navbar CTA count drops from 3 to 2 (desktop CTA + mobile menu CTA).

---

## Part 2: Convex Backend

### New files

| File | Purpose |
|------|---------|
| `convex/schema.ts` | `registrations` table: email, name, tier, amount, currency, stripeSessionId, paymentStatus, createdAt. Indexes: by_email, by_paymentStatus, by_stripeSessionId |
| `convex/registrations.ts` | Queries: `getAvailableSpots`, `countByTier`. Mutations: `create`, `updatePaymentStatus` |
| `convex/stripe.ts` | `"use node"` actions: `createCheckoutSession` (determines tier from spot count, calls Stripe API, inserts pending registration), `verifyWebhook` (validates Stripe signature) |
| `convex/http.ts` | HTTP routes: `POST /checkout` → creates session + returns URL, `POST /webhook` → verifies + updates payment status |
| `convex/tsconfig.json` | Convex TypeScript config |

### Schema (`convex/schema.ts`) — follows `godinez-ai/convex/schema.ts` pattern

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    tier: v.union(v.literal("early_bird"), v.literal("regular")),
    amount: v.number(),
    currency: v.literal("mxn"),
    stripeSessionId: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    paymentStatus: v.union(
      v.literal("pending"), v.literal("paid"),
      v.literal("failed"), v.literal("refunded")
    ),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_paymentStatus", ["paymentStatus"])
    .index("by_stripeSessionId", ["stripeSessionId"]),
});
```

### Spot counting (`convex/registrations.ts`) — follows `godinez-ai/convex/waitlist.ts` pattern

- `getAvailableSpots` → `{ earlyBird: { total: 20, sold, available }, regular: { total: 30, sold, available }, soldOut: boolean }`
- `create` mutation → insert new registration
- `updatePaymentStatus` mutation → find by stripeSessionId, update status

### Stripe actions (`convex/stripe.ts`) — follows `poktapok/convex/luma/syncAction.ts` + `godinez-studio` billing patterns

- `createCheckoutSession`: queries spot count → determines tier/price → `stripe.checkout.sessions.create()` → inserts pending registration → returns session URL
- `verifyWebhook`: `stripe.webhooks.constructEvent()` signature verification

### HTTP routes (`convex/http.ts`)

- `POST /checkout` → calls `createCheckoutSession`, returns `{ url }`
- `POST /webhook` → calls `verifyWebhook`, updates registration via `updatePaymentStatus`

---

## Part 3: Frontend Checkout Flow

### New files

| File | Purpose |
|------|---------|
| `src/lib/checkout.ts` | `initiateCheckout()` — calls Convex HTTP `/checkout`, redirects to Stripe |
| `src/hooks/useCheckout.ts` | Shared hook wrapping `initiateCheckout()` with loading/error/toast state |
| `src/pages/PaymentSuccess.tsx` | Thank-you page after successful payment |
| `src/pages/PaymentCancel.tsx` | "Payment cancelled" page with retry link |

### `src/lib/checkout.ts`

```typescript
const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL;

export async function initiateCheckout() {
  const res = await fetch(`${CONVEX_SITE_URL}/checkout`, { method: "POST" });
  const { url, error } = await res.json();
  if (error) throw new Error(error);
  window.location.href = url;
}
```

### `src/hooks/useCheckout.ts` — shared hook to DRY up 5 files

```typescript
import { useState } from "react";
import { initiateCheckout } from "@/lib/checkout";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await initiateCheckout();
    } catch (error) {
      toast({
        title: t("checkout.errorTitle"),
        description: t("checkout.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCheckout, isLoading };
}
```

---

## Part 4: CTA Button Swap (Tally → Stripe)

After removing the floating mobile CTA, **6 instances across 5 files** remain:

| File | Lines | Instances | Notes |
|------|-------|-----------|-------|
| `src/components/landing/HeroSection.tsx` | L83-92 | 1 | |
| `src/components/landing/Navbar.tsx` | L71-75, L117-125 | 2 | Desktop CTA + mobile menu CTA (floating CTA deleted in Part 1) |
| `src/components/landing/PricingSection.tsx` | L68-77 | 1 | Also add live spot count via `useQuery(api.registrations.getAvailableSpots)` |
| `src/components/landing/FinalCTASection.tsx` | L51-60 | 1 | |
| `src/pages/Curriculum.tsx` | L345-353 | 1 | Footer CTA |

### Pattern for each swap

**Before:**
```tsx
<Button size="lg" className="..." asChild>
  <a href="https://tally.so/r/aQ2D0b" target="_blank" rel="noopener noreferrer">
    {t('section.cta')}
    <ArrowRight className="ml-2 w-5 h-5 ..." />
  </a>
</Button>
```

**After:**
```tsx
<Button size="lg" className="..." onClick={handleCheckout} disabled={isLoading}>
  {isLoading ? <Loader2 className="mr-2 w-5 h-5 animate-spin" /> : null}
  {isLoading ? t('checkout.loading') : t('section.cta')}
  {!isLoading && <ArrowRight className="ml-2 w-5 h-5 ..." />}
</Button>
```

Key changes per button: remove `asChild`, remove `<a>`, add `onClick={handleCheckout}` from `useCheckout()`, add `disabled={isLoading}`, add `Loader2` spinner import.

---

## Part 5: App Shell Wiring

| File | Change |
|------|--------|
| `src/App.tsx` | Wrap app in `<ConvexProvider>`, add routes `/payment/success` and `/payment/cancel` |
| `src/main.tsx` | Import + instantiate `ConvexReactClient` |
| `package.json` | Add `convex`, `stripe` dependencies |

---

## Part 6: Translations

Add to both `src/locales/en/translation.json` and `src/locales/es/translation.json`:

- `checkout.loading`, `checkout.errorTitle`, `checkout.errorDescription`
- `paymentSuccess.title`, `paymentSuccess.description`
- `paymentCancel.title`, `paymentCancel.description`, `paymentCancel.retry`
- `pricing.spotsRemaining`, `pricing.soldOut`

Remove: `navbar.ctaMobile` (no longer used after Part 1)

---

## Part 7: Environment & Stripe Dashboard

### `.env.local` (gitignored)
- `VITE_CONVEX_URL` — from `npx convex dev`
- `VITE_CONVEX_SITE_URL` — Convex HTTP endpoint URL

### Convex Dashboard env vars
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_EARLY_BIRD_PRICE_ID`, `STRIPE_REGULAR_PRICE_ID`
- `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`

### Stripe Dashboard (manual)
1. Create Product: **"AgentCamp 2.0"**
2. Two Prices: `$5,000 MXN` one-time (Early Bird) + `$7,500 MXN` one-time (Regular)
3. Webhook endpoint → `https://<convex-site-url>/webhook` listening for `checkout.session.completed`, `checkout.session.expired`

---

## Implementation Order

1. Remove floating mobile CTA (Part 1) — quick win, ship immediately
2. `npx convex init`, write schema, deploy
3. Stripe actions (`convex/stripe.ts`)
4. HTTP routes (`convex/http.ts`)
5. Registration queries/mutations (`convex/registrations.ts`)
6. Frontend checkout function (`src/lib/checkout.ts`) + shared hook (`src/hooks/useCheckout.ts`)
7. Swap all 6 CTA instances (Part 4)
8. Success/Cancel pages + routes
9. PricingSection live spot counter
10. App.tsx wiring (ConvexProvider + routes)
11. Translations (en + es)

---

## Verification

1. `npx convex dev` — schema deploys, functions register
2. Mobile: confirm floating CTA is gone, hamburger menu CTA still works
3. Click any CTA → loading state → redirect to Stripe Checkout with correct MXN amount
4. Complete test payment (`4242 4242 4242 4242`) → redirect to `/payment/success`
5. Cancel payment → redirect to `/payment/cancel`
6. Convex Dashboard → `registrations` table shows record with `paymentStatus: "paid"`
7. PricingSection spot counter updates after payment
8. Both English and Spanish for success/cancel pages
9. Sold-out flow: insert 50 paid records → CTA shows error
10. Stripe Dashboard → Events tab shows webhook delivery
