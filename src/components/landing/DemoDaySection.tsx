import { CalendarCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function DemoDaySection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <CalendarCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('demoDay.title')}
            </h2>
          </ScrollReveal>

          {/* Body */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 group">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('demoDay.body1')}
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {t('demoDay.body2')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('demoDay.body3')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
