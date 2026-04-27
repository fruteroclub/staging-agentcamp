import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";
import { useCheckout } from "@/hooks/useCheckout";

export function PainPointsSection() {
  const { t, i18n } = useTranslation();
  const { handleCheckout, isLoading, loadingLabel } = useCheckout();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-6">
            <h2 className="text-[30px] md:text-[42px] font-semibold leading-[1.15] tracking-[-0.01em]">
              {t('painPoints.title')}
            </h2>
          </ScrollReveal>

          {/* Body */}
          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-12">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('painPoints.body')}
            </p>
          </ScrollReveal>

          <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-card/85 to-card/45 p-6 backdrop-blur-sm"
              >
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-warning">
                    0{index + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t(`painPoints.items.${index}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`painPoints.items.${index}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <ScrollReveal animationKey={i18n.language} delay={0.2}>
            <div className="relative overflow-hidden rounded-[32px] bg-card/50 px-8 py-12 md:px-12 md:py-14">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="absolute top-1/4 left-1/4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {t('painPoints.close.eyebrow')}
                </div>
                <h3 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.01em] mb-5">
                  {t('painPoints.close.title')}
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  {t('painPoints.close.body')}
                </p>

                <div className="grid md:grid-cols-3 gap-3 mb-8 text-left">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-background/40 px-5 py-4 backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {t(`painPoints.validation.${index}`)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-hover transition-all duration-300 hover:-translate-y-1 px-[30px] py-[15px] text-[17px] font-semibold group rounded-[10px]"
                    disabled={isLoading}
                    onClick={() => handleCheckout("landing.problem_section")}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    {isLoading ? loadingLabel : t('hero.cta.primary')}
                    {!isLoading ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : null}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-muted-foreground hover:text-foreground px-[30px] py-[15px] text-[17px]"
                    asChild
                  >
                    <a href="#curriculum">
                      {t('hero.cta.secondary')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
