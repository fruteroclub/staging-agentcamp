import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function StackSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t('stack.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('stack.subtitle')}
            </p>
          </ScrollReveal>

          {/* Stack layers grid */}
          <StaggerContainer animationKey={i18n.language} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {Array.from({ length: 5 }).map((_, index) => {
              const partner = t(`stack.layers.${index}.partner`);
              const candidates = t(`stack.layers.${index}.candidates`, { defaultValue: '' });
              const isTBD = partner === 'TBD';

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 p-5 hover:border-primary/30 hover:bg-card/60 transition-all duration-500 group"
                >
                  <p className="text-sm text-muted-foreground mb-1">
                    {t(`stack.layers.${index}.layer`)}
                  </p>
                  <p className={`font-semibold group-hover:text-foreground transition-colors duration-300 ${isTBD ? 'text-muted-foreground/60' : 'text-foreground'}`}>
                    {partner}
                  </p>
                  {isTBD && candidates && (
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      {candidates}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </StaggerContainer>

          {/* Ecosystem + stats */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <p className="text-lg text-foreground font-medium mb-8">
              {t('stack.ecosystem')}
            </p>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-border/50 p-6 md:p-8 mb-12">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-50" />

              <div className="relative z-10 grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      index < 2 ? "border-r border-white/10" : ""
                    }`}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {t(`stack.stats.${index}.value`)}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {t(`stack.stats.${index}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Sponsor CTA */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {t('stack.partnerCta.question')}
            </p>
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 rounded-[10px]" asChild>
              <a href="/sponsorship-deck">
                {t('stack.partnerCta.link')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
