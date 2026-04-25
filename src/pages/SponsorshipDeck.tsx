import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
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
              AgentCamp 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6"
          >
            Partner with the first{" "}
            <span className="text-primary font-serif italic text-[1.1em]">
              agent operator program in Latin America.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground-body max-w-2xl mx-auto mb-4"
          >
            Your infrastructure powers the agents they build.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10"
          >
            50 operators across Latin America, building on your stack.
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
                View Sponsorship Tiers
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
                Get in Touch
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            Cohort 1 · May–June 2026 · frutero.club
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

const opportunityStats = [
  {
    value: "50",
    label: "operators per cohort",
    description:
      "Professionals, founders, and business owners who decide what tools their teams adopt",
  },
  {
    value: "100%",
    label: "powered by your infra",
    description:
      "Your technology runs under the hood — every agent uses your stack through the platform",
  },
  {
    value: "1st",
    label: "in LATAM · in Spanish",
    description:
      "No comparable program exists. You define the category, not compete in it",
  },
];

function OpportunitySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              The Opportunity
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Category leadership in the emerging{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                LATAM AI agent operator market.
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
const weekData = [
  {
    num: "Week 1", title: "Activate", tagline: '"Your first agent, running from day one"',
    learnings: ["Agent environment setup & first run", "Prompt engineering fundamentals", "Context and instruction design"],
    project: { name: "First Working Agent", input: "your use case + AI-assisted setup", output: "an active agent solving a real task" },
  },
  {
    num: "Week 2", title: "Architect", tagline: '"How your agent thinks and learns new skills"',
    learnings: ["Bootstrap, memory, and context layers", "Skills framework with OpenClaw", "The difference between a chatbot and a real agent"],
    project: { name: "Agent with Architecture", input: "functional skills + memory", output: "an agent with its own architecture" },
  },
  {
    num: "Week 3", title: "Connect", tagline: '"Your agent touches the real world"',
    learnings: ["Integration with real tools and files", "Persistent identity setup", "Workspace and environment configuration"],
    project: { name: "Live Integrations", input: "tools, files, identity layer", output: "real integrations + active identity" },
  },
  {
    num: "Week 4", title: "Automate", tagline: '"Workflows that run without you"',
    learnings: ["Workflow design and automation", "Agent economics and payment rails", "Human-in-the-loop patterns"],
    project: { name: "Autonomous Workflow", input: "real case + economic capability", output: "a workflow solving real work" },
  },
  {
    num: "Week 5", title: "Launch", tagline: '"Iterate, prove, and present"',
    learnings: ["Evaluation and iteration", "Reputation and public track record", "Demo Day preparation"],
    project: { name: "Capstone at Demo Day", input: "recorded demo + real metrics", output: "documented case + public reputation" },
  },
];

function WhatIsSection() {
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              What Is AgentCamp
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              A 5-week practical program where{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                participants build real AI agents.
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
                                What you learn
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
                                What you build
                              </h4>
                              <p className="text-primary font-semibold mb-3">→ {week.project.name}</p>
                              <p className="text-sm text-muted-foreground">
                                <span className="text-foreground/70">Input:</span> {week.project.input}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                <span className="text-foreground/70">Output:</span> {week.project.output}
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
                  Every graduate leaves with:{" "}
                  <span className="font-semibold text-foreground">
                    a working agent with its own identity, workflows that transact, and a verified track record.
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

const audienceTraits = [
  {
    icon: Crown,
    title: "Operators & decision-makers",
    desc: "Managers, consultants, founders, business owners — the people who decide what tools their teams adopt.",
  },
  {
    icon: Brain,
    title: "AI-active, not AI-curious",
    desc: "They've tried ChatGPT and Claude. They're frustrated nothing sticks. They're ready to invest in learning.",
  },
  {
    icon: Globe,
    title: "Spanish-speaking LATAM",
    desc: "The fastest-growing market for AI adoption. No comparable program exists in Spanish.",
  },
  {
    icon: Users,
    title: "Downstream influence",
    desc: "These aren't junior developers — they bring tools back to their teams, companies, and clients.",
  },
];

function AudienceSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              The Audience
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              50 high-intent operators who will{" "}
              <span className="text-primary font-serif italic text-[1.05em]">
                actively build on your infrastructure.
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

const sponsorshipLayers = [
  { icon: Fingerprint, layer: "Identity", when: "Week 3", what: "Every agent gets persistent identity — your wallet infrastructure powers it" },
  { icon: Wallet, layer: "Payments", when: "Week 4", what: "Every workflow gets an economic layer — your payment rails handle settlement" },
  { icon: Award, layer: "Reputation", when: "Week 5", what: "Agent track records verified at Demo Day — your protocol is the proof layer" },
  { icon: Brain, layer: "Intelligence", when: "W1–5", what: "Your models power every agent built in the program — 50 agents running daily" },
  { icon: Server, layer: "Environment", when: "W1–5", what: "The platform where participants live for 5 weeks — your brand is the workspace" },
];

function HowItWorksSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              How Sponsorship Works
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Your technology powers{" "}
              <span className="text-primary font-serif italic text-[1.05em]">what they build.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Participants don't configure your infrastructure directly — the platform abstracts that.
              Every agent they build runs on your stack. Your brand is associated with the capabilities
              that make their agents real.
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
  return (
    <section id="tiers" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase block mb-4">
              Sponsorship Tiers
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Choose your level of{" "}
              <span className="text-primary font-serif italic text-[1.05em]">partnership.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <TierCard
              overline="Founding Partner"
              price="$5,000 USD"
              subtitle="2–3 slots available · Category exclusive"
              icon={Crown}
              featured
              perks={[
                "Category exclusivity — only one identity partner, one payments partner, one intelligence partner",
                "Your technology powers the agent infrastructure every participant uses throughout the program",
                "Named in curriculum materials and sessions — participants learn what your tech enables",
                "Demo Day presenting sponsor — your brand introduces the capstone presentations",
                "Co-marketing rights: case studies, testimonials, video content from Demo Day",
                "Logo on all materials: landing page, emails, recordings, certificates",
                "Post-program: graduates continue on the platform, which continues running on your stack",
                "First right of refusal for future cohorts",
              ]}
            />
            <TierCard
              overline="Infrastructure Partner"
              price="$2,500 USD"
              subtitle="3–5 slots available"
              icon={Building2}
              perks={[
                "Named in curriculum — your technology referenced as infrastructure powering agent capabilities",
                "Demo Day access — attend, network, evaluate capstones",
                "Logo on landing page, emails, and recordings",
                "Community access — direct channel to AgentCamp graduates",
                "Co-marketing: shared social content and participant highlights",
                "Post-program: graduates continue on the platform running on your stack",
              ]}
            />
            <TierCard
              overline="Startup Partner"
              price="$1,000 USD"
              subtitle="Open slots · Credits and in-kind support do not count toward the fee"
              icon={Rocket}
              perks={[
                "Named as supporting partner in program materials",
                "Demo Day access — attend, network, evaluate capstones",
                "Logo on landing page and recordings",
                "Community access — direct channel to AgentCamp graduates",
                "Co-marketing: shared social content and participant highlights",
                "Optional: provide API credits or tooling for participants (in addition to fee, not instead of)",
              ]}
            />
            <TierCard
              overline="Community Partner"
              price="No fee"
              subtitle="For communities, DAOs, collectives, and ecosystem groups — not companies"
              icon={Heart}
              perks={[
                "Cross-promote AgentCamp to your community — we promote yours to ours",
                "Co-host a session, AMA, or workshop during the program",
                "Logo on landing page as community partner",
                "Demo Day invitation for your community leads",
                "Shared content: social co-promotion, recaps, highlights",
              ]}
              note="This tier is for builder communities, DAOs, developer collectives, and ecosystem groups that want to cross-pollinate audiences. Companies and startups should see the paid tiers."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 10. TIER COMPARISON ─────────────────────── */

type CellValue = boolean | string;

const comparisonRows: { feature: string; founding: CellValue; infra: CellValue; startup: CellValue; community: CellValue }[] = [
  { feature: "Category exclusivity", founding: true, infra: false, startup: false, community: false },
  { feature: "Powers agent infrastructure", founding: true, infra: true, startup: false, community: false },
  { feature: "Named in curriculum", founding: true, infra: true, startup: false, community: false },
  { feature: "Demo Day presenting sponsor", founding: true, infra: false, startup: false, community: false },
  { feature: "Demo Day access", founding: true, infra: true, startup: true, community: true },
  { feature: "Logo on all materials", founding: true, infra: true, startup: true, community: true },
  { feature: "Co-marketing rights", founding: "Full", infra: "Social", startup: "Social", community: "Cross-promo" },
  { feature: "Post-program platform", founding: true, infra: true, startup: false, community: false },
  { feature: "Community cross-promotion", founding: true, infra: true, startup: true, community: true },
  { feature: "First refusal future cohorts", founding: true, infra: false, startup: false, community: false },
];

function ComparisonSection() {
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
            <h2 className="text-3xl md:text-4xl font-semibold">Tier Comparison</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-4 text-muted-foreground font-semibold" />
                    <th className="text-center py-4 px-3">
                      <span className="text-primary font-semibold">Founding</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$5,000</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">Infra</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$2,500</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">Startup</span>
                      <br />
                      <span className="text-xs text-warning font-mono">$1,000</span>
                    </th>
                    <th className="text-center py-4 px-3">
                      <span className="font-semibold">Community</span>
                      <br />
                      <span className="text-xs text-muted-foreground font-mono">No fee</span>
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

const timelineItems = [
  { when: "Now", what: "Partner commitments confirmed" },
  { when: "April 25", what: "Partner logos and materials finalized" },
  { when: "May 4", what: "Cohort 1 starts — 50 participants begin building" },
  { when: "May–Jun", what: "5 weeks of live sessions — your tech powers the infrastructure" },
  { when: "June 7", what: "Demo Day — capstone presentations, sponsor judges, public event" },
  { when: "June 17", what: "Godínez.AI public launch — graduates arrive with working agents" },
  { when: "June+", what: "Post-program: case studies, testimonials, pipeline activation" },
];

function TimelineSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase block mb-4">
              Timeline
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold">Key dates</h2>
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

const whyCohort1 = [
  {
    icon: Globe,
    title: "First-mover in LATAM AI agents",
    desc: "No comparable program exists in Spanish. You're defining the category, not competing in it.",
  },
  {
    icon: Sparkles,
    title: "Curriculum integration, not afterthought",
    desc: "Cohort 1 partners co-design how their technology is taught. Later cohorts inherit your structure.",
  },
  {
    icon: Users,
    title: "50 operators → organic growth",
    desc: "Each graduate becomes an advocate in their team, company, and network. 50 operators seed hundreds of users.",
  },
  {
    icon: Calendar,
    title: "Godínez.AI launch alignment",
    desc: "Cohort 1 graduates arrive on launch day (June 17) with working agents. Your infrastructure is what they're built on.",
  },
];

function WhyCohort1Section() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              Why Cohort 1
            </span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Founding partners shape{" "}
              <span className="text-primary font-serif italic text-[1.05em]">the program.</span>
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
              Let's build the first generation{" "}
              <span className="text-primary font-serif italic text-[1.1em]">
                of agent operators together.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-2">
              AgentCamp Cohort 1 · May–June 2026
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              frutero.club
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-hover transition-all duration-300 hover:-translate-y-1 px-[30px] py-[15px] text-[17px] font-semibold group animate-pulse-glow rounded-[10px]"
                  asChild
                >
                  <a href="mailto:mel@frutero.club">
                    <Mail className="mr-2 w-5 h-5" />
                    Get in Touch
                  </a>
                </Button>
              </motion.div>
              <Button
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground px-[30px] py-[15px] text-[17px]"
                asChild
              >
                <a href="https://frutero.club" target="_blank" rel="noopener noreferrer">
                  Visit frutero.club
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── DECK FOOTER ─────────────────────── */

function DeckFooter() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/godinez-logo.svg"
                alt="Godínez.AI"
                className="h-10 w-auto"
                width="120"
                height="40"
              />
              <span className="font-semibold text-foreground">AgentCamp</span>
              <span className="text-muted-foreground text-sm">· Sponsorship Deck</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Frutero. All rights reserved.
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
    <div className="min-h-screen bg-background">
      <main>
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
