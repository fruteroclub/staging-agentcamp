import { useState } from "react";
import { ChevronDown, FileCode2, Bot, Link2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              4 Semanas. 8 Sesiones. 4 Proyectos Reales.
            </h2>
          </div>

          {/* Curriculum accordion */}
          <div className="space-y-4">
            {weeks.map((week) => (
              <div
                key={week.number}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* Week header */}
                <button
                  onClick={() => setOpenWeek(openWeek === week.number ? null : week.number)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <week.icon className="w-6 h-6 text-primary" />
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
                      "w-5 h-5 text-muted-foreground transition-transform",
                      openWeek === week.number && "rotate-180"
                    )}
                  />
                </button>

                {/* Week content */}
                {openWeek === week.number && (
                  <div className="px-6 pb-6 border-t border-border">
                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                      {/* Learnings */}
                      <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                          Lo que aprendes
                        </h4>
                        <ul className="space-y-3">
                          {week.learnings.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Project */}
                      <div className="bg-surface rounded-lg p-5">
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
                )}
              </div>
            ))}
          </div>

          {/* Supporting text */}
          <div className="mt-12 text-center bg-card border border-border rounded-xl p-8">
            <p className="text-xl font-semibold mb-2">¿No sabes programar? No importa.</p>
            <p className="text-muted-foreground">
              Usas AI coding assistants (Cursor, Claude Code) para generar código.
              <br />
              Tú diriges. La IA escribe. Nosotros te enseñamos a orquestar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
