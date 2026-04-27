import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function InstructorsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('instructors.title')}
            </h2>
          </ScrollReveal>

          {/* Founder card */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 group">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Founder photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-500">
                    <img
                      src="/mel-amc.jpg"
                      alt={t('instructors.founder.name')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Founder info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-1">
                    {t('instructors.founder.name')}
                  </h3>
                  <p className="text-accent font-medium mb-4">
                    {t('instructors.founder.role')}
                  </p>
                  <div className="grid gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-background/40 px-4 py-3 backdrop-blur-sm"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {t(`instructors.founder.proof.${index}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frutero attribution */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
                <p className="text-foreground leading-relaxed text-center md:text-left">
                  {t('instructors.footer')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
