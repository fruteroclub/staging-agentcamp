# Local AgentCamp Checkout Manual Testing

This guide covers the local manual test flow for the AgentCamp landing checkout.

It uses:

- `agentcamp-landing` on `http://localhost:8080`
- `godinez-studio` API on `http://localhost:3001`
- Stripe CLI forwarding webhooks to your local API

You do not need the `godinez-studio` web app for this flow. Only the API server is required.

## Prerequisites

- `pnpm` installed
- `bun` installed for the local `godinez-studio` API only
- Stripe CLI installed and logged in to the Stripe sandbox you want to use
- Local PostgreSQL running
- Stripe sandbox keys and AgentCamp sandbox price IDs
- Clerk test credentials for `godinez-studio`

## 1. Install dependencies

Install dependencies inside each project, not at the `poktalabs` container root.

```bash
cd /Users/mel/code/poktalabs/agentcamp-landing
pnpm install
```

```bash
cd /Users/mel/code/poktalabs/godinez-studio
pnpm install
```

## 2. Configure `agentcamp-landing`

Create the local env file:

```bash
cd /Users/mel/code/poktalabs/agentcamp-landing
cp .env.example .env.local
```

Expected value:

```bash
VITE_GODINEZ_STUDIO_CHECKOUT_URL=http://localhost:3001/api/agentcamp/checkout
```

## 3. Configure `godinez-studio` API

Create or update the API env file:

```bash
cd /Users/mel/code/poktalabs/godinez-studio/apps/api
cp .env.example .env.local
```

At minimum, make sure these values exist in `apps/api/.env.local`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/godinez_studio
CLERK_SECRET_KEY=sk_test_...
CORS_ORIGIN=http://localhost:5173,http://localhost:8080
STRIPE_SECRET_KEY=sk_test_...
STRIPE_AGENTCAMP_WEBHOOK_SECRET=whsec_...
AGENTCAMP_EARLY_BIRD_PRICE_ID=price_...
AGENTCAMP_REGULAR_PRICE_ID=price_...
AGENTCAMP_EARLY_BIRD_CUTOFF_ISO=2026-05-15T23:59:59.000Z
AGENTCAMP_MAX_CAPACITY=50
AGENTCAMP_SALES_ENABLED=true
```

Notes:

- `AGENTCAMP_COHORT` is optional. If unset, the API defaults to `agentcamp_2026_q2`.
- `STRIPE_AGENTCAMP_WEBHOOK_SECRET` must match the signing secret printed by the Stripe CLI for your local listener.
- `BILLING_ENABLED` and the Studio billing URLs are not required for AgentCamp checkout testing.

## 4. Push the local database schema

From `godinez-studio`:

```bash
cd /Users/mel/code/poktalabs/godinez-studio
pnpm db:push
```

This should create the tables needed for the flow, including `agentcamp_registrations`.

## 5. Start the Stripe webhook forwarder

Open a dedicated terminal and run:

```bash
stripe listen \
  --events checkout.session.completed,checkout.session.expired \
  --forward-to localhost:3001/api/agentcamp/stripe/webhook
```

The CLI will print a signing secret like:

```bash
whsec_...
```

Copy that secret into `godinez-studio/apps/api/.env.local` as `STRIPE_AGENTCAMP_WEBHOOK_SECRET`.

If you changed the env file after the API was already running, restart the API server.

## 6. Start the `godinez-studio` API

Open another terminal:

```bash
cd /Users/mel/code/poktalabs/godinez-studio
pnpm dev:api
```

The API should be available at `http://localhost:3001`.

## 7. Start `agentcamp-landing`

Open another terminal:

```bash
cd /Users/mel/code/poktalabs/agentcamp-landing
pnpm dev
```

The landing app should be available at `http://localhost:8080`.

## 8. Run the manual checkout test

1. Open `http://localhost:8080`
2. Click any CTA wired to checkout
3. Confirm you are redirected to Stripe Checkout
4. Complete payment with a Stripe sandbox test card
5. Confirm you land on `http://localhost:8080/payment/success`
6. Confirm Stripe CLI logs a forwarded `checkout.session.completed` event
7. Confirm the API logs the AgentCamp reconciliation path

Recommended Stripe test card:

```text
4242 4242 4242 4242
```

## 9. Validate the database records

After Stripe redirects back and the API logs `agentcamp checkout reconciled`, verify the local database rows directly.

From `godinez-studio/apps/api`:

```bash
set -a && . ./.env.local && set +a && psql "$DATABASE_URL" -c "
select
  r.email,
  r.status,
  r.cohort,
  r.stripe_session_id,
  r.studio_user_id,
  r.studio_account_id,
  r.paid_at,
  u.clerk_id,
  a.owner_id,
  a.subscription_status,
  a.subscription_tier,
  a.current_period_end
from agentcamp_registrations r
left join users u on u.id = r.studio_user_id
left join accounts a on a.id = r.studio_account_id
where r.email = 'dev@frutero.club'
order by r.created_at desc
limit 1;
"
```

Expected result for a successful reconciliation:

- `status = 'paid'`
- `studio_user_id` is not `NULL`
- `studio_account_id` is not `NULL`
- `clerk_id` is not `NULL`
- `owner_id` matches `studio_user_id`

Expected result for platform access before the program start date of May 11, 2026:

- `subscription_status = 'free'`
- `subscription_tier` is `NULL`
- `current_period_end` is `NULL`

That is the current intended behavior in code: the AgentCamp webhook creates the Studio user and account now, but it does not activate paid platform access yet.

If you prefer a GUI instead of SQL:

```bash
cd /Users/mel/code/poktalabs/godinez-studio
pnpm db:studio
```

Inspect the latest row in:

- `agentcamp_registrations`
- `users`
- `accounts`

## 10. Optional API-only smoke test

If you want to verify session creation before opening the browser:

```bash
curl -X POST http://localhost:3001/api/agentcamp/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "checkoutSource": "manual.local.test",
    "locale": "es",
    "successUrl": "http://localhost:8080/payment/success",
    "cancelUrl": "http://localhost:8080/payment/cancel"
  }'
```

Expected result:

- HTTP `200`
- JSON response containing a Stripe Checkout `url`

## Troubleshooting

### `503 Billing not configured`

The API is missing Stripe config. Check:

- `STRIPE_SECRET_KEY`
- `AGENTCAMP_EARLY_BIRD_PRICE_ID`
- `AGENTCAMP_REGULAR_PRICE_ID`
- `AGENTCAMP_SALES_ENABLED=true`

### `400 Invalid signature`

The API is using the wrong webhook signing secret.

Fix:

1. Copy the latest `whsec_...` shown by `stripe listen`
2. Update `godinez-studio/apps/api/.env.local`
3. Restart `pnpm dev:api`

### CORS error from the landing page

Make sure `godinez-studio/apps/api/.env.local` includes:

```bash
CORS_ORIGIN=http://localhost:5173,http://localhost:8080
```

Then restart the API.

### Checkout opens, but payment does not update local state

That usually means the webhook was not forwarded or was rejected.

Check:

- `stripe listen` is still running
- the forward target is `localhost:3001/api/agentcamp/stripe/webhook`
- `STRIPE_AGENTCAMP_WEBHOOK_SECRET` matches the current CLI output

## Terminal Summary

Use three terminals:

```bash
# Terminal 1
cd /Users/mel/code/poktalabs/godinez-studio
pnpm dev:api
```

```bash
# Terminal 2
stripe listen \
  --events checkout.session.completed,checkout.session.expired \
  --forward-to localhost:3001/api/agentcamp/stripe/webhook
```

```bash
# Terminal 3
cd /Users/mel/code/poktalabs/agentcamp-landing
pnpm dev
```
