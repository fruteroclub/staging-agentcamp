import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { SponsorshipDeckNavbar } from "@/components/landing/SponsorshipDeckNavbar";
import { SponsorIntakeForm } from "@/components/landing/SponsorIntakeForm";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Users,
  Server,
  Globe,
  Brain,
  Fingerprint,
  Wallet,
  Award,
  Sparkles,
  Calendar,
  Check,
  Minus,
  Crown,
  Building2,
  Rocket,
  Heart,
  Mail,
  ChevronDown,
  Zap,
  Link2,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";

/* ─────────────────────── 1. HERO ─────────────────────── */

function DeckHero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.hero.overline")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6"
          >
            {t("sponsorDeck.hero.title")}{" "}
            <span className="text-primary font-serif italic text-[1.1em]">
              {t("sponsorDeck.hero.titleAccent")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground-body max-w-2xl mx-auto mb-4"
          >
            {t("sponsorDeck.hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10"
          >
            {t("sponsorDeck.hero.proof")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover transition-all duration-300 px-[30px] py-[15px] text-[17px] font-semibold group rounded-[10px]"
              asChild
            >
              <a href="#tiers">
                {t("sponsorDeck.hero.ctaPrimary")}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground px-[30px] py-[15px] text-[17px]"
              asChild
            >
              <a href="#contact">
                {t("sponsorDeck.hero.ctaSecondary")}
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            {t("sponsorDeck.hero.cohortLine")}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ─────────────────────── 2. THE OPPORTUNITY ─────────────────────── */

function OpportunitySection() {
  const { t } = useTranslation();

  const opportunityStats = [
    {
      value: t("sponsorDeck.opportunity.stats.0.value"),
      label: t("sponsorDeck.opportunity.stats.0.label"),
      description: t("sponsorDeck.opportunity.stats.0.description"),
    },
    {
      value: t("sponsorDeck.opportunity.stats.1.value"),
      label: t("sponsorDeck.opportunity.stats.1.label"),
      description: t("sponsorDeck.opportunity.stats.1.description"),
    },
    {
      value: t("sponsorDeck.opportunity.stats.2.value"),
      label: t("sponsorDeck.opportunity.stats.2.label"),
      description: t("sponsorDeck.opportunity.stats.2.description"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.opportunity.overline")}
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.opportunity.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                {t("sponsorDeck.opportunity.titleAccent")}
              </span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {opportunityStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 p-8 hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-semibold text-warning mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                    {stat.label}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {stat.description}
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

/* ─────────────────────── 3. WHAT IS AGENTCAMP ─────────────────────── */

const weekIcons = [Zap, Brain, Link2, Settings, Rocket];

function WhatIsSection() {
  const { t } = useTranslation();
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  const weekData = [
    {
      num: t("sponsorDeck.whatIs.weeks.0.num"), title: t("sponsorDeck.whatIs.weeks.0.title"), tagline: t("sponsorDeck.whatIs.weeks.0.tagline"),
      learnings: t("sponsorDeck.whatIs.weeks.0.learnings", { returnObjects: true }) as string[],
      project: { name: t("sponsorDeck.whatIs.weeks.0.projectName"), input: t("sponsorDeck.whatIs.weeks.0.projectInput"), output: t("sponsorDeck.whatIs.weeks.0.projectOutput") },
    },
    {
      num: t("sponsorDeck.whatIs.weeks.1.num"), title: t("sponsorDeck.whatIs.weeks.1.title"), tagline: t("sponsorDeck.whatIs.weeks.1.tagline"),
      learnings: t("sponsorDeck.whatIs.weeks.1.learnings", { returnObjects: true }) as string[],
      project: { name: t("sponsorDeck.whatIs.weeks.1.projectName"), input: t("sponsorDeck.whatIs.weeks.1.projectInput"), output: t("sponsorDeck.whatIs.weeks.1.projectOutput") },
    },
    {
      num: t("sponsorDeck.whatIs.weeks.2.num"), title: t("sponsorDeck.whatIs.weeks.2.title"), tagline: t("sponsorDeck.whatIs.weeks.2.tagline"),
      learnings: t("sponsorDeck.whatIs.weeks.2.learnings", { returnObjects: true }) as string[],
      project: { name: t("sponsorDeck.whatIs.weeks.2.projectName"), input: t("sponsorDeck.whatIs.weeks.2.projectInput"), output: t("sponsorDeck.whatIs.weeks.2.projectOutput") },
    },
    {
      num: t("sponsorDeck.whatIs.weeks.3.num"), title: t("sponsorDeck.whatIs.weeks.3.title"), tagline: t("sponsorDeck.whatIs.weeks.3.tagline"),
      learnings: t("sponsorDeck.whatIs.weeks.3.learnings", { returnObjects: true }) as string[],
      project: { name: t("sponsorDeck.whatIs.weeks.3.projectName"), input: t("sponsorDeck.whatIs.weeks.3.projectInput"), output: t("sponsorDeck.whatIs.weeks.3.projectOutput") },
    },
    {
      num: t("sponsorDeck.whatIs.weeks.4.num"), title: t("sponsorDeck.whatIs.weeks.4.title"), tagline: t("sponsorDeck.whatIs.weeks.4.tagline"),
      learnings: t("sponsorDeck.whatIs.weeks.4.learnings", { returnObjects: true }) as string[],
      project: { name: t("sponsorDeck.whatIs.weeks.4.projectName"), input: t("sponsorDeck.whatIs.weeks.4.projectInput"), output: t("sponsorDeck.whatIs.weeks.4.projectOutput") },
    },
  ];

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.whatIs.overline")}
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.whatIs.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                {t("sponsorDeck.whatIs.titleAccent")}
              </span>
            </h2>
          </ScrollReveal>

          {/* Curriculum accordion */}
          <StaggerContainer className="space-y-4">
            {weekData.map((week, weekIndex) => {
              const Icon = weekIcons[weekIndex];
              const weekNumber = weekIndex + 1;

              return (
                <motion.div
                  key={weekIndex}
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                          <span className="text-sm font-mono text-primary">{week.num}</span>
                          <span className="text-xl font-semibold">{week.title}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{week.tagline}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
                        openWeek === weekNumber && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openWeek === weekNumber && (
                      <motion.div
                        key={`content-${weekIndex}`}
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
                                {t("sponsorDeck.whatIs.whatYouLearn")}
                              </h4>
                              <ul className="space-y-3">
                                {week.learnings.map((learning, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span className="text-foreground">{learning}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Project */}
                            <div className="rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 border border-border/50 p-5">
                              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                                {t("sponsorDeck.whatIs.whatYouBuild")}
                              </h4>
                              <p className="text-primary font-semibold mb-3">→ {week.project.name}</p>
                              <p className="text-sm text-muted-foreground">
                                <span className="text-foreground/70">{t("sponsorDeck.whatIs.input")}</span> {week.project.input}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="text-foreground/70">{t("sponsorDeck.whatIs.output")}</span> {week.project.output}
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

          {/* Graduation callout */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />
              <div className="relative z-10 text-center">
                <p className="text-lg md:text-xl text-foreground-body leading-relaxed">
                  {t("sponsorDeck.whatIs.graduation")}{" "}
                  <span className="font-semibold text-foreground">
                    {t("sponsorDeck.whatIs.graduationBold")}
                  </span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 4. THE AUDIENCE ─────────────────────── */

const audienceIcons = [Crown, Brain, Globe, Users];

function AudienceSection() {
  const { t } = useTranslation();

  const audienceTraits = [
    {
      icon: audienceIcons[0],
      title: t("sponsorDeck.audience.traits.0.title"),
      desc: t("sponsorDeck.audience.traits.0.desc"),
    },
    {
      icon: audienceIcons[1],
      title: t("sponsorDeck.audience.traits.1.title"),
      desc: t("sponsorDeck.audience.traits.1.desc"),
    },
    {
      icon: audienceIcons[2],
      title: t("sponsorDeck.audience.traits.2.title"),
      desc: t("sponsorDeck.audience.traits.2.desc"),
    },
    {
      icon: audienceIcons[3],
      title: t("sponsorDeck.audience.traits.3.title"),
      desc: t("sponsorDeck.audience.traits.3.desc"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.audience.overline")}
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.audience.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                {t("sponsorDeck.audience.titleAccent")}
              </span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {audienceTraits.map((trait, index) => {
              const Icon = trait.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{trait.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{trait.desc}</p>
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

/* ─────────────────────── 5. HOW SPONSORSHIP WORKS ─────────────────────── */

const layerIcons = [Fingerprint, Wallet, Award, Brain, Server];

function HowItWorksSection() {
  const { t } = useTranslation();

  const sponsorshipLayers = [
    { icon: layerIcons[0], layer: t("sponsorDeck.howItWorks.layers.0.layer"), when: t("sponsorDeck.howItWorks.layers.0.when"), what: t("sponsorDeck.howItWorks.layers.0.what") },
    { icon: layerIcons[1], layer: t("sponsorDeck.howItWorks.layers.1.layer"), when: t("sponsorDeck.howItWorks.layers.1.when"), what: t("sponsorDeck.howItWorks.layers.1.what") },
    { icon: layerIcons[2], layer: t("sponsorDeck.howItWorks.layers.2.layer"), when: t("sponsorDeck.howItWorks.layers.2.when"), what: t("sponsorDeck.howItWorks.layers.2.what") },
    { icon: layerIcons[3], layer: t("sponsorDeck.howItWorks.layers.3.layer"), when: t("sponsorDeck.howItWorks.layers.3.when"), what: t("sponsorDeck.howItWorks.layers.3.what") },
    { icon: layerIcons[4], layer: t("sponsorDeck.howItWorks.layers.4.layer"), when: t("sponsorDeck.howItWorks.layers.4.when"), what: t("sponsorDeck.howItWorks.layers.4.what") },
  ];

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.howItWorks.overline")}
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.howItWorks.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">{t("sponsorDeck.howItWorks.titleAccent")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("sponsorDeck.howItWorks.subtitle")}
            </p>
          </ScrollReveal>

          <StaggerContainer className="space-y-3">
            {sponsorshipLayers.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-start gap-5 p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1">{item.layer}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.what}</p>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex items-center">
                      <span className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                        {item.when}
                      </span>
                    </div>
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

/* ─────────────────────── 6–9. TIER CARDS ─────────────────────── */

interface TierProps {
  overline: string;
  price: string;
  subtitle: string;
  perks: string[];
  icon: React.ElementType;
  featured?: boolean;
  note?: string;
}

function TierCard({ overline, price, subtitle, perks, icon: Icon, featured, note }: TierProps) {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm shadow-2xl ${
          featured
            ? "border border-primary/30 shadow-primary/10"
            : "border border-border/50"
        }`}
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        {/* Header */}
        <div className="relative z-10 px-10 pt-10 pb-8 border-b border-white/5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
            {overline}
          </span>
          <div className="mt-3 mb-2">
            <span className="text-4xl md:text-5xl font-semibold text-warning">{price}</span>
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Perks */}
        <div className="relative z-10 px-10 py-8">
          <ul className="space-y-3">
            {perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground-body text-sm leading-relaxed">{perk}</span>
              </li>
            ))}
          </ul>
          {note && (
            <p className="text-xs text-muted-foreground mt-6 italic">{note}</p>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

function TiersSection() {
  const { t } = useTranslation();

  return (
    <section id="tiers" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase block mb-4">
              {t("sponsorDeck.tiers.overline")}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.tiers.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">{t("sponsorDeck.tiers.titleAccent")}</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <TierCard
              overline={t("sponsorDeck.tiers.founding.overline")}
              price={t("sponsorDeck.tiers.founding.price")}
              subtitle={t("sponsorDeck.tiers.founding.subtitle")}
              icon={Crown}
              featured
              perks={t("sponsorDeck.tiers.founding.perks", { returnObjects: true }) as string[]}
            />
            <TierCard
              overline={t("sponsorDeck.tiers.infrastructure.overline")}
              price={t("sponsorDeck.tiers.infrastructure.price")}
              subtitle={t("sponsorDeck.tiers.infrastructure.subtitle")}
              icon={Building2}
              perks={t("sponsorDeck.tiers.infrastructure.perks", { returnObjects: true }) as string[]}
            />
            <TierCard
              overline={t("sponsorDeck.tiers.startup.overline")}
              price={t("sponsorDeck.tiers.startup.price")}
              subtitle={t("sponsorDeck.tiers.startup.subtitle")}
              icon={Rocket}
              perks={t("sponsorDeck.tiers.startup.perks", { returnObjects: true }) as string[]}
            />
            <TierCard
              overline={t("sponsorDeck.tiers.community.overline")}
              price={t("sponsorDeck.tiers.community.price")}
              subtitle={t("sponsorDeck.tiers.community.subtitle")}
              icon={Heart}
              perks={t("sponsorDeck.tiers.community.perks", { returnObjects: true }) as string[]}
              note={t("sponsorDeck.tiers.community.note")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 10. TIER COMPARISON ─────────────────────── */

type CellValue = boolean | string;

function ComparisonSection() {
  const { t } = useTranslation();
  const features = t("sponsorDeck.comparison.features", { returnObjects: true }) as string[];
  const coMarketing = {
    founding: t("sponsorDeck.comparison.coMarketing.founding"),
    infra: t("sponsorDeck.comparison.coMarketing.infra"),
    startup: t("sponsorDeck.comparison.coMarketing.startup"),
    community: t("sponsorDeck.comparison.coMarketing.community"),
  };

  const comparisonRows: { feature: string; founding: CellValue; infra: CellValue; startup: CellValue; community: CellValue }[] = [
    { feature: features[0], founding: true, infra: false, startup: false, community: false },
    { feature: features[1], founding: true, infra: true, startup: false, community: false },
    { feature: features[2], founding: true, infra: true, startup: false, community: false },
    { feature: features[3], founding: true, infra: false, startup: false, community: false },
    { feature: features[4], founding: true, infra: true, startup: true, community: true },
    { feature: features[5], founding: true, infra: true, startup: true, community: true },
    { feature: features[6], founding: coMarketing.founding, infra: coMarketing.infra, startup: coMarketing.startup, community: coMarketing.community },
    { feature: features[7], founding: true, infra: true, startup: false, community: false },
    { feature: features[8], founding: true, infra: true, startup: true, community: true },
    { feature: features[9], founding: true, infra: false, startup: false, community: false },
  ];

  const renderCell = (value: CellValue) => {
    if (typeof value === "string") {
      return <span className="text-sm text-foreground-body">{value}</span>;
    }
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />
    );
  };

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">{t("sponsorDeck.comparison.title")}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-4 text-muted-foreground font-semibold" />
                    <th className="text-center py-4 px-3">
                      <span className="text-primary font-semibold">{t("sponsorDeck.comparison.founding")}</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$5,000</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">{t("sponsorDeck.comparison.infra")}</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$2,500</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">{t("sponsorDeck.comparison.startup")}</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$1,000</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">{t("sponsorDeck.comparison.community")}</span>
                      <br />
                      <span className="text-xs text-muted-foreground font-mono">{t("sponsorDeck.comparison.noFee")}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/50 hover:bg-card/30 transition-colors"
                    >
                      <td className="py-3.5 pr-4 text-foreground-body">{row.feature}</td>
                      <td className="py-3.5 px-3 text-center">{renderCell(row.founding)}</td>
                      <td className="py-3.5 px-3 text-center">{renderCell(row.infra)}</td>
                      <td className="py-3.5 px-3 text-center">{renderCell(row.startup)}</td>
                      <td className="py-3.5 px-3 text-center">{renderCell(row.community)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 11. TIMELINE ─────────────────────── */

function TimelineSection() {
  const { t } = useTranslation();

  const timelineItems = [
    { when: t("sponsorDeck.timeline.items.0.when"), what: t("sponsorDeck.timeline.items.0.what") },
    { when: t("sponsorDeck.timeline.items.1.when"), what: t("sponsorDeck.timeline.items.1.what") },
    { when: t("sponsorDeck.timeline.items.2.when"), what: t("sponsorDeck.timeline.items.2.what") },
    { when: t("sponsorDeck.timeline.items.3.when"), what: t("sponsorDeck.timeline.items.3.what") },
    { when: t("sponsorDeck.timeline.items.4.when"), what: t("sponsorDeck.timeline.items.4.what") },
    { when: t("sponsorDeck.timeline.items.5.when"), what: t("sponsorDeck.timeline.items.5.what") },
  ];

  return (
    <section id="timeline" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase block mb-4">
              {t("sponsorDeck.timeline.overline")}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold">{t("sponsorDeck.timeline.title")}</h2>
          </ScrollReveal>

          <StaggerContainer className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

            <div className="space-y-0">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative flex items-start gap-6 py-5 group"
                >
                  {/* Dot */}
                  <div className="relative z-10 w-[47px] flex-shrink-0 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 -mt-1">
                    <span className="text-sm font-mono text-primary">{item.when}</span>
                    <p className="text-foreground-body mt-0.5">{item.what}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 12. WHY COHORT 1 ─────────────────────── */

const whyCohort1Icons = [Globe, Sparkles, Users, Calendar];

function WhyCohort1Section() {
  const { t } = useTranslation();

  const whyCohort1 = [
    {
      icon: whyCohort1Icons[0],
      title: t("sponsorDeck.whyCohort1.items.0.title"),
      desc: t("sponsorDeck.whyCohort1.items.0.desc"),
    },
    {
      icon: whyCohort1Icons[1],
      title: t("sponsorDeck.whyCohort1.items.1.title"),
      desc: t("sponsorDeck.whyCohort1.items.1.desc"),
    },
    {
      icon: whyCohort1Icons[2],
      title: t("sponsorDeck.whyCohort1.items.2.title"),
      desc: t("sponsorDeck.whyCohort1.items.2.desc"),
    },
    {
      icon: whyCohort1Icons[3],
      title: t("sponsorDeck.whyCohort1.items.3.title"),
      desc: t("sponsorDeck.whyCohort1.items.3.desc"),
    },
  ];

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t("sponsorDeck.whyCohort1.overline")}
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("sponsorDeck.whyCohort1.title")}{" "}
              <span className="text-primary font-serif italic text-[1.05em]">{t("sponsorDeck.whyCohort1.titleAccent")}</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {whyCohort1.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
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

/* ─────────────────────── 13. CONTACT CTA ─────────────────────── */

function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6">
              {t("sponsorDeck.contact.title")}{" "}
              <span className="text-primary font-serif italic text-[1.1em]">
                {t("sponsorDeck.contact.titleAccent")}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-2">
              {t("sponsorDeck.contact.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              {t("sponsorDeck.contact.frutero")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <SponsorIntakeForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── DECK FOOTER ─────────────────────── */

function DeckFooter() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/godinez-logo.svg"
                alt="Godinez.AI"
                className="h-10 w-auto"
                width="120"
                height="40"
              />
              <span className="font-semibold text-foreground">AgentCamp</span>
              <span className="text-muted-foreground text-sm">{t("sponsorDeck.deckFooter.sponsorshipDeck")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("sponsorDeck.deckFooter.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

const SponsorshipDeck = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SponsorshipDeckNavbar />
      <main id="main-content">
        <DeckHero />
        <OpportunitySection />
        <WhatIsSection />
        <AudienceSection />
        <HowItWorksSection />
        <TiersSection />
        <ComparisonSection />
        <TimelineSection />
        <WhyCohort1Section />
        <ContactSection />
      </main>
      <DeckFooter />
    </div>
  );
};

export default SponsorshipDeck;
