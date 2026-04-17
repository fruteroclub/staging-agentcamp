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
        <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">
            {t('transformation.title')}
          </h2>
        </ScrollReveal>

        {/* Column headers */}
        <div className="max-w-4xl mx-auto mb-4 grid grid-cols-[1fr_40px_1fr] gap-4 px-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">Hoy</p>
          <div />
          <p className="text-sm font-semibold text-primary uppercase tracking-widest text-center">Con AgentCamp</p>
        </div>

        {/* Transformation rows */}
        <div className="max-w-4xl mx-auto">
          <StaggerContainer animationKey={i18n.language} className="grid gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="grid grid-cols-[1fr_40px_1fr] items-center gap-4"
              >
                {/* Before */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-muted/50 border border-border h-full">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground text-base leading-snug">
                    {t(`transformation.items.${index}.before`)}
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* After */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/20 h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-semibold text-base leading-snug">
                    {t(`transformation.items.${index}.after`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
