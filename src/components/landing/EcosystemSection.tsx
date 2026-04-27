import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";
import { useCheckout } from "@/hooks/useCheckout";

export function EcosystemSection() {
  const { t, i18n } = useTranslation();
  const { handleCheckout, isLoading, loadingLabel } = useCheckout();

  return (
    <section id="resultados" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('outcomes.title')}
            </h2>
          </ScrollReveal>

          {/* Outcomes list */}
          <StaggerContainer animationKey={i18n.language} className="space-y-4 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground text-lg leading-relaxed">
                  {t(`outcomes.items.${index}`)}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>

          <ScrollReveal animationKey={i18n.language} delay={0.2}>
            <div className="relative overflow-hidden rounded-[32px] bg-card/50 px-8 py-12 md:px-12 md:py-16">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="absolute top-1/4 left-1/4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
              </div>

              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {t('outcomes.valueCta.eyebrow')}
                </div>
                <div className="mb-10">
                  <p className="mb-3 text-lg text-muted-foreground">
                    {t('outcomes.valueCta.intro')}
                  </p>
                  <h3 className="text-3xl font-semibold leading-[1.1] tracking-[-0.01em] md:text-5xl">
                    <span className="text-warning font-semibold">
                      {t('outcomes.valueCta.totalValue')}
                    </span>
                  </h3>
                  <p className="mt-4 text-2xl font-semibold leading-snug text-foreground md:text-3xl">
                    {t('outcomes.valueCta.outro')}{" "}
                    <span className="text-warning">{t('outcomes.valueCta.price')}</span>
                    <span className="text-muted-foreground"> {t('outcomes.valueCta.priceNote')}</span>
                  </p>
                </div>

                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t('outcomes.valueCta.title')}
                </div>
                <div className="mb-10 grid gap-3 text-left md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-background/40 px-5 py-4 text-sm text-foreground backdrop-blur-sm"
                    >
                      {t(`outcomes.valueCta.items.${index}`)}
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-300 hover:-translate-y-1 px-[30px] py-[15px] text-[17px] font-semibold group animate-pulse-glow rounded-[10px]"
                    disabled={isLoading}
                    onClick={() => handleCheckout("landing.results_value")}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    {isLoading ? loadingLabel : t('outcomes.valueCta.cta')}
                    {!isLoading ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : null}
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
