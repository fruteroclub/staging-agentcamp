import {
  Zap,
  Brain,
  Link2,
  Settings,
  Rocket,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Clock,
  Users,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const weekIcons = [Zap, Brain, Link2, Settings, Rocket];

/* ─────────────────────── HEADER ─────────────────────── */

function CurriculumHeader() {
  const { t, i18n } = useTranslation();

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-mono text-primary mb-4"
          >
            AgentCamp 2026
          </motion.p>

          <motion.h1
            key={`h-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-[-0.01em] mb-6"
          >
            {t("curriculumPage.header.title")}
          </motion.h1>

          <motion.p
            key={`sub-${i18n.language}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-foreground-body leading-relaxed mb-8"
          >
            {t("curriculumPage.header.description")}
          </motion.p>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {t("curriculumPage.header.facts.duration")}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {t("curriculumPage.header.facts.sessions")}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              {t("curriculumPage.header.facts.effort")}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              {t("curriculumPage.header.facts.format")}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── WHY THIS PROGRAM ─────────────────────── */

function WhyThisProgramSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animationKey={i18n.language}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              {t("curriculumPage.why.title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.05}>
            <p className="text-foreground-body leading-relaxed mb-4">
              {t("curriculumPage.why.p1")}
            </p>
          </ScrollReveal>
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <p className="text-foreground-body leading-relaxed mb-4">
              {t("curriculumPage.why.p2")}
            </p>
          </ScrollReveal>
          <ScrollReveal animationKey={i18n.language} delay={0.15}>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("curriculumPage.why.prereq")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── WEEK SECTION (reusable) ─────────────────────── */

function WeekSection({ weekIndex }: { weekIndex: number }) {
  const { t, i18n } = useTranslation();
  const Icon = weekIcons[weekIndex];
  const isEven = weekIndex % 2 === 0;

  return (
    <section className={`py-16 ${isEven ? "bg-background" : "bg-card/50"}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Week heading */}
          <ScrollReveal animationKey={i18n.language}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-sm font-mono text-primary">
                  {t(`curriculumPage.weeks.${weekIndex}.number`)}
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                  {t(`curriculumPage.weeks.${weekIndex}.title`)}
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Session 1 */}
          <ScrollReveal animationKey={i18n.language} delay={0.05}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  S1
                </span>
                <h3 className="text-lg font-semibold">
                  {t(`curriculumPage.weeks.${weekIndex}.s1.name`)}
                </h3>
              </div>
              <p className="text-foreground-body leading-relaxed mb-4">
                {t(`curriculumPage.weeks.${weekIndex}.s1.description`)}
              </p>
              <div className="ml-0">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("curriculumPage.labels.concepts")}
                </h4>
                <ul className="space-y-1.5">
                  {(t(`curriculumPage.weeks.${weekIndex}.s1.concepts`, { returnObjects: true }) as string[]).map(
                    (concept: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {concept}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Session 2 */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  S2
                </span>
                <h3 className="text-lg font-semibold">
                  {t(`curriculumPage.weeks.${weekIndex}.s2.name`)}
                </h3>
              </div>
              <p className="text-foreground-body leading-relaxed mb-4">
                {t(`curriculumPage.weeks.${weekIndex}.s2.description`)}
              </p>
              <div className="ml-0">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("curriculumPage.labels.concepts")}
                </h4>
                <ul className="space-y-1.5">
                  {(t(`curriculumPage.weeks.${weekIndex}.s2.concepts`, { returnObjects: true }) as string[]).map(
                    (concept: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {concept}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Deliverable + Professional application */}
          <ScrollReveal animationKey={i18n.language} delay={0.15}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 border border-border/50 p-5">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("curriculumPage.labels.deliverable")}
                </h4>
                <p className="text-warning font-medium text-sm leading-relaxed">
                  {t(`curriculumPage.weeks.${weekIndex}.deliverable`)}
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10 p-5">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("curriculumPage.labels.professionalApplication")}
                </h4>
                <p className="text-foreground text-sm leading-relaxed">
                  {t(`curriculumPage.weeks.${weekIndex}.application`)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── COMPETENCIES ─────────────────────── */

function CompetenciesSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animationKey={i18n.language}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {t("curriculumPage.competencies.title")}
              </h2>
            </div>
            <p className="text-foreground-body leading-relaxed mb-8">
              {t("curriculumPage.competencies.subtitle")}
            </p>
          </ScrollReveal>

          <StaggerContainer animationKey={i18n.language} className="space-y-3">
            {(t("curriculumPage.competencies.items", { returnObjects: true }) as string[]).map(
              (item: string, index: number) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="flex items-start gap-3 py-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </motion.div>
              )
            )}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PEDAGOGICAL APPROACH ─────────────────────── */

function ApproachSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animationKey={i18n.language}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              {t("curriculumPage.approach.title")}
            </h2>
          </ScrollReveal>

          <StaggerContainer animationKey={i18n.language} className="space-y-4">
            {(t("curriculumPage.approach.principles", { returnObjects: true }) as Array<{ title: string; body: string }>).map(
              (principle, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 p-5"
                >
                  <h4 className="font-semibold mb-1">{principle.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.body}
                  </p>
                </motion.div>
              )
            )}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER CTA ─────────────────────── */

function CurriculumFooterCTA() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-card/50 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              {t("curriculumPage.footer.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("curriculumPage.footer.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              className="bg-primary hover:bg-primary-hover transition-all duration-300 rounded-[10px] font-semibold"
              asChild
            >
              <a href="https://tally.so/r/aQ2D0b" target="_blank" rel="noopener noreferrer">
                {t("curriculumPage.footer.cta")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <a href="/">{t("curriculumPage.footer.back")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <CurriculumHeader />
        <WhyThisProgramSection />
        {Array.from({ length: 5 }).map((_, i) => (
          <WeekSection key={i} weekIndex={i} />
        ))}
        <CompetenciesSection />
        <ApproachSection />
        <CurriculumFooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Curriculum;
