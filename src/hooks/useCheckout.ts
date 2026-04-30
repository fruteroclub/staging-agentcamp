import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createCheckoutSession, CheckoutError } from "@/lib/checkout";
import { useToast } from "@/hooks/use-toast";

type CheckoutNamespace = "original" | "translation";

function toCheckoutLocale(language: string) {
  return language.toLowerCase().startsWith("en") ? "en" : "es";
}

export function useCheckout(namespace: CheckoutNamespace = "translation") {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation(namespace);

  async function handleCheckout(checkoutSource: string) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const referralCode = new URLSearchParams(window.location.search).get("ref") ?? undefined;

    try {
      const { url } = await createCheckoutSession({
        checkoutSource,
        locale: toCheckoutLocale(i18n.language),
        referralCode,
        successUrl: new URL("/payment/success", window.location.origin).toString(),
        cancelUrl: new URL("/payment/cancel", window.location.origin).toString(),
      });

      window.location.assign(url);
    } catch (error) {
      const description =
        error instanceof CheckoutError && error.code === "sold_out"
          ? t("checkout.soldOut")
          : t("checkout.errorDescription");

      toast({
        title: t("checkout.errorTitle"),
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleCheckout,
    isLoading,
    loadingLabel: t("checkout.loading"),
  };
}
