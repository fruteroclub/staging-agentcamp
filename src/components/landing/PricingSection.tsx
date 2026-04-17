import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PricingSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-1">
              {t('pricing.cohortTitle')}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t('pricing.cohortSubtitle')}
            </p>
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

              {/* Header — precio + badge en horizontal */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-12 py-10 border-b border-white/5">
                <div>
                  <Badge className="bg-primary text-primary-foreground mb-3 px-4 py-1 rounded-full text-xs">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    {t('pricing.badge')}
                  </Badge>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-semibold text-warning">{t('pricing.price.current')}</span>
                    <span className="text-muted-foreground line-through text-lg">{t('pricing.price.original')}</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {t('pricing.price.note')}
                  </p>
                </div>

                {/* CTA lateral en desktop */}
                <div className="shrink-0 w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-300 px-[30px] py-[15px] text-[17px] font-semibold group rounded-[10px]"
                    asChild
                  >
                    <a href="https://tally.so/r/aQ2D0b" target="_blank" rel="noopener noreferrer">
                      {t('pricing.cta')}
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Includes + garantía */}
              <div className="relative z-10 px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{t(`pricing.includes.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground sm:max-w-[200px] sm:text-right shrink-0">
                  {t('pricing.guarantee')}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
