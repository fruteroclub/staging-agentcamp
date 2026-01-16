import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              100% Gratis
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground px-4 py-1.5">
              Programa de 4 semanas
            </Badge>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Construye AI Agents.{" "}
            <span className="text-gradient">Deploy Real.</span>{" "}
            Sin Código.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Llevas meses jugando con ChatGPT y Claude. Copias prompts. Pruebas herramientas. 
            Pero no tienes nada en producción.
          </p>
          <p className="text-lg md:text-xl text-foreground font-medium mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Agent Operators te lleva de experimentar a operar en 4 semanas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold group"
            >
              Reserva Tu Lugar
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              Ver Programa
            </Button>
          </div>

          {/* Urgency line */}
          <p className="text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            Cohorte 1 · Solo 50 lugares · Patrocinado por nuestros partners
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
