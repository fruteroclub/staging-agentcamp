import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function ProvenTrackRecordSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t('provenTrackRecord.title')}
            </h2>
            <p className="text-xl font-semibold text-foreground mb-4">
              {t('provenTrackRecord.subtitle')}
            </p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('provenTrackRecord.description')}
            </p>
          </ScrollReveal>

          {/* Stats title */}
          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('provenTrackRecord.statsTitle')}
            </p>
          </ScrollReveal>

          {/* Stats grid */}
          <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500 p-6 flex items-start gap-5"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-start gap-5">
                  {/* Number */}
                  <div className="text-3xl md:text-4xl font-semibold text-warning flex-shrink-0 min-w-[80px]">
                    {t(`provenTrackRecord.stats.${index}.value`)}
                  </div>

                  {/* Label */}
                  <p className="text-foreground-body leading-relaxed pt-1">
                    {t(`provenTrackRecord.stats.${index}.label`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
