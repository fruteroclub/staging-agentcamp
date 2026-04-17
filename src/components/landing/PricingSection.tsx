import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function PricingSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('pricing.title')}
            </h2>
          </ScrollReveal>

          {/* Pricing card */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-primary/30 shadow-2xl shadow-primary/10"
            >
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

              {/* Price display */}
              <div className="relative z-10 px-12 py-10 border-b border-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-4">
                  <div className="text-center">
                    <span className="text-5xl font-bold">{t('pricing.earlyBird.price')}</span>
                    <p className="text-sm text-primary mt-1">{t('pricing.earlyBird.label')}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-muted-foreground">{t('pricing.regular.price')}</span>
                    <p className="text-sm text-muted-foreground mt-1">{t('pricing.regular.label')}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm text-center">
                  {t('pricing.paymentLine')}
                </p>
              </div>

              {/* Includes */}
              <div className="relative z-10 px-12 py-8 border-b border-white/5">
                <p className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                  {t('pricing.includes.title')}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{t(`pricing.includes.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logistics + CTA */}
              <div className="relative z-10 px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{t('pricing.logistics.spots')}</p>
                  <p>{t('pricing.logistics.startDate')}</p>
                  <p>{t('pricing.logistics.deadline')}</p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-300 px-8 py-5 text-base font-semibold group rounded-2xl"
                    asChild
                  >
                    <a href="https://tally.so/r/aQ2D0b" target="_blank" rel="noopener noreferrer">
                      {t('pricing.cta')}
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
