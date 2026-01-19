import { ArrowRight, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const transformations = [
  { before: "Experimentas con prompts", after: "Operas workflows automatizados" },
  { before: "Demos locales", after: "Sistemas deployed en la nube" },
  { before: "Agentes que alucinan", after: "Agentes con control y oversight" },
  { before: '"Algún día aprendo"', after: "Agent Operator certificado" },
];

export function TransformationSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            En 4 semanas, esto cambia:
          </h2>
        </ScrollReveal>

        {/* Transformation table */}
        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="grid gap-4">
            {transformations.map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500 group"
              >
                {/* Before */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">{item.before}</span>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* After */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">{item.after}</span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
