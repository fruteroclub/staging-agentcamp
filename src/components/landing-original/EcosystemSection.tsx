import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";

export function EcosystemSection() {
  const { t, i18n } = useTranslation('original');

  return (
    <section id="resultados" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t('ecosystem.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('ecosystem.subtitle')}
            </p>
          </ScrollReveal>

          {/* Partner logos grid - bento style */}
          <StaggerContainer animationKey={i18n.language} className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-16">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="aspect-[3/1] rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 flex items-center justify-center p-4 hover:border-primary/30 hover:bg-card/60 transition-all duration-500 group"
              >
                <span className="text-sm text-muted-foreground font-medium text-center group-hover:text-foreground transition-colors duration-300">
                  {t(`ecosystem.partners.${index}`)}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Authority statement */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-2">
              {t('ecosystem.authority').split('Frutero')[0]}
              <span className="text-foreground font-semibold">Frutero</span>
              {t('ecosystem.authority').split('Frutero')[1]}
            </p>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-border/50 p-6 md:p-8 mb-12">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />

              <div className="relative z-10 grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      index < 2 ? "border-r border-white/10" : ""
                    }`}
                  >
                    <div className="text-2xl md:text-3xl font-semibold text-gradient mb-1">
                      {t(`ecosystem.stats.${index}.value`)}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {t(`ecosystem.stats.${index}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Sponsor CTA */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {t('ecosystem.sponsor.question')}
            </p>
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 rounded-[10px]">
              {t('ecosystem.sponsor.cta')}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
