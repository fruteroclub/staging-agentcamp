import { Server, Brain, Sparkles, Fingerprint, Wallet, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const layerIcons = [Server, Brain, Sparkles, Fingerprint, Wallet, Award];

export function StackSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('stack.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-16">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('stack.subtitle')}
            </p>
          </ScrollReveal>

          {/* Stack layers */}
          <StaggerContainer animationKey={i18n.language} className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => {
              const Icon = layerIcons[index];
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-start gap-5 p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1">
                        {t(`stack.layers.${index}.layer`)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`stack.layers.${index}.description`)}
                      </p>
                    </div>

                    {/* Partner badge */}
                    <div className="flex-shrink-0 hidden sm:flex items-center">
                      <span className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-lg border border-white/5">
                        {t(`stack.layers.${index}.partner`)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>

          {/* Ecosystem line + Partner CTA */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="mt-12 text-center space-y-4">
            <p className="text-muted-foreground">
              {t('stack.ecosystem')}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">{t('stack.partnerCta.question')}</span>{" "}
              <a
                href="#partner"
                className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                {t('stack.partnerCta.link')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
