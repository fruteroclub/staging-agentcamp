import { Layers, Bot, Eye, Rocket } from "lucide-react";

const steps = [
  { icon: Layers, label: "Orchestration Layer", description: "Control del flujo" },
  { icon: Bot, label: "Agent Capabilities", description: "Inteligencia" },
  { icon: Eye, label: "Human Oversight", description: "Supervisión" },
  { icon: Rocket, label: "Production", description: "Deploy real" },
];

export function MethodSection() {
  return (
    <section id="programa" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              El Método: <span className="text-gradient">Orchestration-First</span>
            </h2>
          </div>

          {/* Method explanation */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-muted-foreground text-lg mb-6">
              La mayoría de cursos enseñan: "construye un agente, luego intenta controlarlo."
            </p>
            <p className="text-xl font-semibold mb-6">
              Nosotros invertimos el modelo:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gradient mb-8">
              Primero control. Después inteligencia.
            </p>
            <p className="text-muted-foreground text-lg">
              Empiezas con workflows y state management. La autonomía del agente 
              viene después—dentro de límites que tú defines.
            </p>
            <p className="text-foreground font-medium mt-6">
              Así es como los equipos de producción realmente construyen.
            </p>
          </div>

          {/* Visual diagram */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {steps.map((step, index) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 hover:bg-primary/20 transition-colors">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-center">{step.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">{step.description}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
