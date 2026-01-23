import { RefreshCw, StopCircle, Dices } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const painPoints = [
  {
    icon: RefreshCw,
    title: "Prompts Sueltos",
    description: "Cada conversación empieza de cero. No hay sistema. No hay memoria. No hay flujo.",
  },
  {
    icon: StopCircle,
    title: "Demos Que Mueren",
    description: "Funciona en tu laptop. Lo muestras emocionado. Nunca llega a producción.",
  },
  {
    icon: Dices,
    title: "Cero Control",
    description: "El agente alucina. Hace cosas random. Y no tienes idea de cómo debuggearlo.",
  },
];

export function PainPointsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            El problema no es la IA.{" "}<br />
            <span className="text-muted-foreground">Es la brecha entre demo y producción.</span>
          </h2>
        </motion.div>

        {/* Pain points grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={staggerItem}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 shadow-[0_0_50px_-12px_hsl(var(--destructive)/0.1)] hover:border-destructive/30 hover:shadow-[0_0_60px_-12px_hsl(var(--destructive)/0.2)] transition-all duration-500"
            >
              {/* Subtle gradient orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <point.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
