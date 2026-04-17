import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function EcosystemSection() {
  const { t, i18n } = useTranslation();

  return (
    <section id="resultados" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('outcomes.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-12">
            <p className="text-muted-foreground text-lg">
              {t('outcomes.intro')}
            </p>
          </ScrollReveal>

          {/* Outcomes list */}
          <StaggerContainer animationKey={i18n.language} className="space-y-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-base leading-relaxed">
                  {t(`outcomes.items.${index}`)}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
