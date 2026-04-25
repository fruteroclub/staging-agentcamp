import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";

export function EcosystemSection() {
  const { t, i18n } = useTranslation();

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

          {/* Closing line */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="text-center">
            <p className="text-xl font-semibold text-foreground">
              {t('outcomes.closingLine')}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
