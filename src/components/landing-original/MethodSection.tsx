import { Layers, Bot, Eye, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [Layers, Bot, Eye, Rocket];

export function MethodSection() {
  const { t, i18n } = useTranslation('original');

  return (
    <section id="programa" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              {t('method.title.part1')} <span className="text-gradient">{t('method.title.part2')}</span>
            </h2>
          </ScrollReveal>

          {/* Method explanation */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 mb-12 group">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <p className="text-muted-foreground text-lg mb-6">
                  {t('method.explanation.problem')}
                </p>
                <p className="text-xl font-semibold mb-6">
                  {t('method.explanation.approach')}
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-gradient mb-8">
                  {t('method.explanation.philosophy')}
                </p>
                <p className="text-muted-foreground text-lg">
                  {t('method.explanation.details')}
                </p>
                <p className="text-foreground font-medium mt-6">
                  {t('method.explanation.reality')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Visual diagram */}
          <StaggerContainer animationKey={i18n.language} className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            {Array.from({ length: 4 }).map((_, index) => {
              const Icon = icons[index];
              return (
                <motion.div key={index} variants={staggerItem} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-18 h-18 p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-3 hover:from-primary/25 hover:to-primary/10 hover:border-primary/40 hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/5">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-center">{t(`method.steps.${index}.label`)}</span>
                    <span className="text-xs text-muted-foreground mt-1">{t(`method.steps.${index}.description`)}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 mx-4" />
                  )}
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
