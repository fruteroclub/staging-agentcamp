import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const PaymentSuccess = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-primary/20 bg-card/70 px-8 py-12 text-center shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <CheckCircle2 className="mb-6 h-12 w-12 text-primary" />
        <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
          {t("paymentSuccess.title")}
        </h1>
        <p className="mb-8 max-w-xl text-muted-foreground">
          {t("paymentSuccess.description")}
        </p>
        <Button
          size="lg"
          className="rounded-[10px] bg-primary px-[30px] py-[15px] text-[17px] font-semibold hover:bg-primary-hover"
          asChild
        >
          <a href="/">{t("paymentSuccess.cta")}</a>
        </Button>
      </div>
    </main>
  );
};

export default PaymentSuccess;
