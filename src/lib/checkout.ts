export type CheckoutLocale = "en" | "es";

export type CheckoutRequest = {
  cancelUrl: string;
  checkoutSource: string;
  locale: CheckoutLocale;
  referralCode?: string;
  successUrl: string;
};

type CheckoutResponse = {
  url: string;
};

export class CheckoutError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "CheckoutError";
    this.code = code;
  }
}

function getCheckoutUrl() {
  const checkoutUrl = import.meta.env.VITE_GODINEZ_STUDIO_CHECKOUT_URL;

  if (!checkoutUrl) {
    throw new CheckoutError(
      "not_configured",
      "VITE_GODINEZ_STUDIO_CHECKOUT_URL is not configured.",
    );
  }

  return checkoutUrl;
}

export async function createCheckoutSession(
  payload: CheckoutRequest,
): Promise<CheckoutResponse> {
  const response = await fetch(getCheckoutUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | { error?: string; message?: string; url?: string }
    | null;

  if (!response.ok) {
    throw new CheckoutError(
      data?.error ?? "checkout_failed",
      data?.message ?? "Unable to start checkout.",
    );
  }

  if (!data?.url) {
    throw new CheckoutError(
      "invalid_response",
      "Checkout response did not include a Stripe URL.",
    );
  }

  return { url: data.url };
}
