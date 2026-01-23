import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FinalCTASection() {
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      {/* Background effects */}
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
          {/* Headline */}
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Deja de experimentar.{" "}
              <span className="text-gradient">Empieza a operar.</span>
            </h2>
          </ScrollReveal>

          {/* Sub-text */}
          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              En 4 semanas vas a tener un AI agent en producción 
              que trabaja para ti—no una carpeta más de prompts.
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 px-10 py-7 text-lg font-semibold group animate-pulse-glow rounded-2xl"
              >
                Únete a Agentcamp
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </ScrollReveal>

          {/* Final urgency */}
          <ScrollReveal delay={0.3}>
            <p className="text-sm text-muted-foreground mt-8">
              Cohorte 1 · 50 lugares · 100% Patrocinado
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
