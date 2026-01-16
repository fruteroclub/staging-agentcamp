import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Deja de experimentar.{" "}
            <span className="text-gradient">Empieza a operar.</span>
          </h2>

          {/* Sub-text */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            En 4 semanas vas a tener un AI agent en producción 
            que trabaja para ti—no una carpeta más de prompts.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 px-10 py-7 text-lg font-semibold group animate-pulse-glow"
          >
            Únete a Agent Operators
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Final urgency */}
          <p className="text-sm text-muted-foreground mt-8">
            Cohorte 1 · 50 lugares · 100% Patrocinado
          </p>
        </div>
      </div>
    </section>
  );
}
