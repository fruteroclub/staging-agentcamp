import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function AudienceFitSection() {
  const { t, i18n } = useTranslation('original');

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('audienceFit.title')}
            </h2>
          </ScrollReveal>

          {/* Two columns with asymmetric shapes */}
          <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-2 gap-6">
            {/* For you */}
            <motion.div
              variants={staggerItem}
              className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 group hover:border-primary/40 transition-all duration-500"
            >
              {/* Decorative glow */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  {t('audienceFit.forYou.title')}
                </h3>
                <ul className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors duration-300">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/90">{t(`audienceFit.forYou.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Not for you */}
            <motion.div
              variants={staggerItem}
              className="relative overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-2xl rounded-br-2xl bg-gradient-to-br from-muted/80 via-muted/40 to-transparent border border-border p-8 group hover:border-muted-foreground/30 transition-all duration-500"
            >
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-muted/50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/5 flex items-center justify-center">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {t('audienceFit.notForYou.title')}
                </h3>
                <ul className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-lg bg-muted-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-muted-foreground/20 transition-colors duration-300">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground/90">{t(`audienceFit.notForYou.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
