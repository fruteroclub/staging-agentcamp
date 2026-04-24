import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PaymentCancel = () => {
  const { t } = useTranslation();
  const { handleCheckout, isLoading, loadingLabel } = useCheckout();

  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border/70 bg-card/70 px-8 py-12 text-center shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <XCircle className="mb-6 h-12 w-12 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
          {t("paymentCancel.title")}
        </h1>
        <p className="mb-8 max-w-xl text-muted-foreground">
          {t("paymentCancel.description")}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="rounded-[10px] bg-primary px-[30px] py-[15px] text-[17px] font-semibold hover:bg-primary-hover"
            disabled={isLoading}
            onClick={() => handleCheckout("payment.cancel.retry")}
          >
            {isLoading ? loadingLabel : t("paymentCancel.retry")}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-[10px] px-[30px] py-[15px] text-[17px] text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="/">{t("paymentCancel.back")}</a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancel;
