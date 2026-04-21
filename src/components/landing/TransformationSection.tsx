import { Hammer, Link2, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [Hammer, Link2, Trophy];

export function TransformationSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('whatIs.title')}
            </h2>
          </ScrollReveal>

          {/* Three-column framing */}
          <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-primary/40 hover:shadow-[0_0_60px_-12px_hsl(var(--primary)/0.2)] transition-all duration-500 text-center"
                >
                  {/* Subtle gradient orb */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t(`whatIs.columns.${index}.title`)}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t(`whatIs.columns.${index}.description`)}</p>
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
