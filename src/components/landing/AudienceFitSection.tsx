import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const forYou = [
  "Eres founder, marketer, ops lead, o creator",
  "Has usado ChatGPT/Claude por meses pero no tienes nada en producción",
  "Quieres sistemas automatizados, no prompts sueltos",
  "Tienes 5-7 horas por semana para dedicar",
  "Estás listo para construir, no solo consumir contenido",
];

const notForYou = [
  "Buscas un curso teórico de machine learning",
  "Esperas que la IA haga todo sin tu supervisión",
  "No puedes comprometer el tiempo semanal",
  "Ya eres senior developer buscando contenido avanzado",
  "Quieres resultados sin hacer el trabajo",
];

export function AudienceFitSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Agent Operators es para ti?
            </h2>
          </ScrollReveal>

          {/* Two columns with asymmetric shapes */}
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {/* For you */}
            <motion.div
              variants={staggerItem}
              className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl bg-gradient-to-br from-success/10 via-success/5 to-transparent border border-success/20 p-8 group hover:border-success/40 transition-all duration-500"
            >
              {/* Decorative glow */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-success/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-success/30 to-success/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  Es para ti si...
                </h3>
                <ul className="space-y-4">
                  {forYou.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-success/20 transition-colors duration-300">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Not for you */}
            <motion.div
              variants={staggerItem}
              className="relative overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-2xl rounded-br-2xl bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent border border-destructive/20 p-8 group hover:border-destructive/40 transition-all duration-500"
            >
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-destructive/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-destructive/30 to-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  No es para ti si...
                </h3>
                <ul className="space-y-4">
                  {notForYou.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-destructive/20 transition-colors duration-300">
                        <X className="w-4 h-4 text-destructive" />
                      </div>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
