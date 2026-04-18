import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PainPointsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-6">
            <h2 className="text-[28px] md:text-[32px] font-semibold leading-[1.25]">
              {t('painPoints.title')}
            </h2>
          </ScrollReveal>

          {/* Body */}
          <ScrollReveal animationKey={i18n.language} delay={0.1} className="text-center mb-6">
            <p className="text-lg text-muted-foreground">
              {t('painPoints.body')}
            </p>
          </ScrollReveal>

          {/* Extended body */}
          <ScrollReveal animationKey={i18n.language} delay={0.15}>
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 mb-12">
              <p className="text-foreground/90 text-lg leading-relaxed">
                {t('painPoints.extendedBody')}
              </p>
            </div>
          </ScrollReveal>

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
