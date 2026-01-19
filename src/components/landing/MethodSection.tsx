import { Layers, Bot, Eye, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

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
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              El Método: <span className="text-gradient">Orchestration-First</span>
            </h2>
          </ScrollReveal>

          {/* Method explanation */}
          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 mb-12 group">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
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
            </div>
          </ScrollReveal>

          {/* Visual diagram */}
          <StaggerContainer className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            {steps.map((step, index) => (
              <motion.div key={step.label} variants={staggerItem} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-18 h-18 p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-3 hover:from-primary/25 hover:to-primary/10 hover:border-primary/40 hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/5">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-center">{step.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{step.description}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 mx-4" />
                )}
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
