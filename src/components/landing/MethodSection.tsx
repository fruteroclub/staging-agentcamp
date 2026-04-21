import { Zap, Brain, Link2, Settings, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [Zap, Brain, Link2, Settings, Rocket];

export function MethodSection() {
  const { t, i18n } = useTranslation();

  return (
    <section id="programa" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('method.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-16">
            <p className="text-muted-foreground text-lg">
              {t('method.subtitle')}
            </p>
          </ScrollReveal>

          {/* 5-week timeline */}
          <StaggerContainer animationKey={i18n.language} className="relative space-y-6">
            {/* Vertical line connector */}
            <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 hidden md:block" />

            {Array.from({ length: 5 }).map((_, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Icon node */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 group-hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-primary">{t(`method.weeks.${index}.number`)}</span>
                      <span className="text-xl font-semibold">{t(`method.weeks.${index}.title`)}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`method.weeks.${index}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
