import { ArrowRight, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function TransformationSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <ScrollReveal animationKey={i18n.language} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('transformation.title')}
          </h2>
        </ScrollReveal>

        {/* Transformation table */}
        <div className="max-w-3xl mx-auto">
          <StaggerContainer animationKey={i18n.language} className="grid gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
              >
                {/* Before */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">{t(`transformation.items.${index}.before`)}</span>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* After */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">{t(`transformation.items.${index}.after`)}</span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
