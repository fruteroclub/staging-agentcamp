import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito saber programar?",
    answer: `No. Usamos AI coding assistants (Cursor, Claude Code) para generar código. Tú aprendes a dirigir y orquestar, no a escribir Python desde cero.

Requisito real: saber usar una computadora y estar dispuesto a aprender herramientas nuevas.`,
  },
  {
    question: "¿Cuánto tiempo necesito dedicar por semana?",
    answer: `5-7 horas semanales:
• 3-4 horas en sesiones live
• 2-3 horas de trabajo independiente y proyectos

El programa está diseñado para gente con trabajo full-time.`,
  },
  {
    question: "¿Qué herramientas voy a usar?",
    answer: `El stack incluye:
• IDE con AI assistant (Cursor o VS Code + Copilot)
• Framework de agentes (definido con sponsors)
• Claude API para LLM calls
• Composio para integraciones
• Cloud platform para deployment

Todo se configura en el pre-work antes de empezar.`,
  },
  {
    question: "¿Las sesiones son en vivo o grabadas?",
    answer: `En vivo con Q&A interactivo. Las grabaciones quedan disponibles para repaso, pero el valor está en participar live.`,
  },
  {
    question: "¿Qué pasa si me atraso?",
    answer: `Tienes office hours 2x por semana para ponerte al día. Soporte async en la comunidad para dudas específicas. Acceso a grabaciones para repasar.

El programa tiene ritmo, pero hay red de apoyo.`,
  },
  {
    question: "¿Qué tipo de agentes puedo construir después?",
    answer: `El programa te da las bases para construir:
• Asistentes de email y calendario
• Pipelines de contenido automatizado
• Agentes de research y análisis
• Workflows de customer support
• Automatizaciones operativas internas

El límite es tu caso de uso, no el conocimiento técnico.`,
  },
  {
    question: "¿Hay comunidad después del programa?",
    answer: `Sí. Acceso permanente a la comunidad de Agent Operators. Networking con otros graduados. Actualizaciones de contenido.`,
  },
  {
    question: "¿Por qué es gratis?",
    answer: `El programa es patrocinado por empresas de infraestructura AI que quieren que más builders en LATAM aprendan a construir con su tecnología. Tú aprendes gratis, ellos ganan adopción. Win-win.`,
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Preguntas Frecuentes
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-semibold py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
