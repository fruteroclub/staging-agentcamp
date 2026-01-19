import { useState } from "react";
import { ChevronDown, FileCode2, Bot, Link2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const weeks = [
  {
    number: 1,
    title: "Orchestration Foundations",
    tagline: '"Control antes de inteligencia"',
    icon: FileCode2,
    learnings: [
      "Event-driven workflow design",
      "State management para agentes",
      "Tu primer workflow sin LLMs",
    ],
    project: {
      name: "Smart Content Processor",
      input: "texto, URLs, documentos",
      output: "datos clasificados, extraídos, ruteados",
    },
  },
  {
    number: 2,
    title: "From Workflows to Agents",
    tagline: '"Los agentes viven dentro de workflows"',
    icon: Bot,
    learnings: [
      "Anatomía de un agente: rol, objetivos, herramientas",
      "Multi-agent collaboration patterns",
      "El patrón Researcher → Analyst → Writer",
    ],
    project: {
      name: "Content Generation Pipeline",
      input: "3 agentes trabajando en equipo",
      output: "contenido listo para publicar",
    },
  },
  {
    number: 3,
    title: "Real-World Integration",
    tagline: '"Agentes que conectan con el mundo real"',
    icon: Link2,
    learnings: [
      "Integración con email, calendar, messaging",
      "Human-in-the-loop patterns",
      "Approval workflows y feedback loops",
    ],
    project: {
      name: "Personal Assistant con Human Oversight",
      input: "Triage de inbox, drafts con aprobación",
      output: "Acciones reales, supervisión humana",
    },
  },
  {
    number: 4,
    title: "Production & Operations",
    tagline: '"De tu laptop a la nube"',
    icon: Cloud,
    learnings: [
      "Cloud deployment y arquitectura",
      "Monitoring y observability",
      "Debugging en producción",
    ],
    project: {
      name: "Tu Agente en Producción",
      input: "Deployed, monitoreado, documentado",
      output: "Con runbook operacional completo",
    },
  },
];

export function CurriculumSection() {
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              4 Semanas. 8 Sesiones. 4 Proyectos Reales.
            </h2>
          </ScrollReveal>

          {/* Curriculum accordion */}
          <StaggerContainer className="space-y-4">
            {weeks.map((week) => (
              <motion.div
                key={week.number}
                variants={staggerItem}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Week header */}
                <button
                  onClick={() => setOpenWeek(openWeek === week.number ? null : week.number)}
                  className="relative z-10 w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <week.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-primary">Semana {week.number}</span>
                        <span className="text-xl font-semibold">{week.title}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">{week.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300",
                      openWeek === week.number && "rotate-180"
                    )}
                  />
                </button>

                {/* Week content */}
                <AnimatePresence>
                  {openWeek === week.number && (
                    <motion.div
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
                              Lo que aprendes
                            </h4>
                            <ul className="space-y-3">
                              {week.learnings.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  <span className="text-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Project */}
                          <div className="rounded-xl bg-gradient-to-br from-surface/80 to-surface/40 border border-white/5 p-5">
                            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                              Lo que construyes
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
            ))}
          </StaggerContainer>

          {/* Supporting text */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 p-8">
              <p className="text-xl font-semibold mb-2">¿No sabes programar? No importa.</p>
              <p className="text-muted-foreground">
                Usas AI coding assistants (Cursor, Claude Code) para generar código.
                <br />
                Tú diriges. La IA escribe. Nosotros te enseñamos a orquestar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
