import { useState } from "react";
import { ChevronDown, Zap, Brain, Link2, Settings, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";
import { Button } from "@/components/ui/button";

const icons = [Zap, Brain, Link2, Settings, Rocket];

export function CurriculumSection() {
  const { t, i18n } = useTranslation();
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <section id="curriculum" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t('curriculum.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('curriculum.subtitle')}
            </p>
          </ScrollReveal>

          {/* Curriculum accordion */}
          <StaggerContainer animationKey={i18n.language} className="space-y-4">
            {Array.from({ length: 5 }).map((_, weekIndex) => {
              const Icon = icons[weekIndex];
              const weekNumber = weekIndex + 1;

              return (
                <motion.div
                  key={weekIndex}
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500 group"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Week header */}
                  <button
                    onClick={() => setOpenWeek(openWeek === weekNumber ? null : weekNumber)}
                    className="relative z-10 w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-accent">{t(`curriculum.weeks.${weekIndex}.number`)}</span>
                          <span className="text-xl font-semibold">{t(`curriculum.weeks.${weekIndex}.title`)}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{t(`curriculum.weeks.${weekIndex}.description`)}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                        openWeek === weekNumber && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Week content */}
                  <AnimatePresence>
                    {openWeek === weekNumber && (
                      <motion.div
                        key={`content-${weekIndex}-${i18n.language}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 px-6 pb-6 border-t border-white/5">
                          <div className="grid md:grid-cols-2 gap-8 pt-6">
                            {/* What you learn */}
                            <div>
                              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                                {t('curriculum.labels.whatYouLearn')}
                              </h4>
                              <p className="text-foreground leading-relaxed">
                                {t(`curriculum.weeks.${weekIndex}.whatYouLearn`)}
                              </p>
                            </div>

                            {/* What you build */}
                            <div className="rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 border border-border/50 p-5">
                              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                                {t('curriculum.labels.whatYouBuild')}
                              </h4>
                              <p className="text-warning font-medium leading-relaxed">
                                {t(`curriculum.weeks.${weekIndex}.whatYouBuild`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </StaggerContainer>

          {/* Full curriculum link */}
          <ScrollReveal animationKey={i18n.language} delay={0.2} className="text-center mt-10">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground font-semibold group"
              asChild
            >
              <Link to="/curriculum">
                {t('curriculum.fullCurriculumCta')}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
