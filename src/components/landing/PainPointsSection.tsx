import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function PainPointsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('painPoints.title')}
            </h2>
          </ScrollReveal>

          {/* Body */}
          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-12">
            <p className="text-lg text-muted-foreground">
              {t('painPoints.body')}
            </p>
          </ScrollReveal>

          {/* Bullets */}
          <StaggerContainer animationKey={i18n.language} className="space-y-4 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5"
              >
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground text-lg">
                  {t(`painPoints.bullets.${index}`)}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Bridge line */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="text-center">
            <p className="text-xl font-semibold text-primary">
              {t('painPoints.bridge')}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
