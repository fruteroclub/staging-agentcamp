import { useState } from "react";
import { ChevronDown, FileCode2, Bot, Link2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [FileCode2, Bot, Link2, Cloud];

export function CurriculumSection() {
  const { t, i18n } = useTranslation();
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('curriculum.title')}
            </h2>
          </ScrollReveal>

          {/* Curriculum accordion */}
          <StaggerContainer animationKey={i18n.language} className="space-y-4">
            {Array.from({ length: 4 }).map((_, weekIndex) => {
              const Icon = icons[weekIndex];
              const weekNumber = weekIndex + 1;

              return (
                <motion.div
                  key={weekIndex}
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Week header */}
                  <button
                    onClick={() => setOpenWeek(openWeek === weekNumber ? null : weekNumber)}
                    className="relative z-10 w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-primary">{t(`curriculum.weeks.${weekIndex}.number`)}</span>
                          <span className="text-xl font-semibold">{t(`curriculum.weeks.${weekIndex}.title`)}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{t(`curriculum.weeks.${weekIndex}.tagline`)}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
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
                            {/* Learnings */}
                            <div>
                              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                                {t(`curriculum.weeks.${weekIndex}.learningTitle`)}
                              </h4>
                              <ul className="space-y-3">
                                {Array.from({ length: 3 }).map((_, learningIndex) => (
                                  <li key={learningIndex} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span className="text-foreground">{t(`curriculum.weeks.${weekIndex}.learnings.${learningIndex}`)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Project */}
                            <div className="rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 border border-white/5 p-5">
                              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                                {t(`curriculum.weeks.${weekIndex}.projectTitle`)}
                              </h4>
                              <p className="text-primary font-semibold mb-3">→ {t(`curriculum.weeks.${weekIndex}.project.name`)}</p>
                              <p className="text-sm text-muted-foreground">
                                <span className="text-foreground/70">Input:</span> {t(`curriculum.weeks.${weekIndex}.project.input`)}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="text-foreground/70">Output:</span> {t(`curriculum.weeks.${weekIndex}.project.output`)}
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

          {/* Supporting text */}
          <ScrollReveal animationKey={i18n.language} delay={0.2}>
            <div className="mt-12 text-center rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 p-8">
              <p className="text-xl font-semibold mb-2">{t('curriculum.supportText.title')}</p>
              <p className="text-muted-foreground whitespace-pre-line">
                {t('curriculum.supportText.description')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
