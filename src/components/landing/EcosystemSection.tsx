import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const partners = [
  { name: "Partner Framework" },
  { name: "LLM Provider" },
  { name: "Integration Platform" },
  { name: "Cloud" },
  { name: "Monitoring" },
];

const stats = [
  { value: "+1,000", label: "builders entrenados" },
  { value: "32.7%", label: "completion rate" },
  { value: "69%", label: "deployment rate" },
];

export function EcosystemSection() {
  return (
    <section id="resultados" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Infraestructura de Producción
            </h2>
            <p className="text-muted-foreground text-lg">
              Agentcamp corre sobre el mismo stack que usan equipos de Silicon Valley.
            </p>
          </ScrollReveal>

          {/* Partner logos grid - bento style */}
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-16">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={staggerItem}
                className="aspect-[3/1] rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 flex items-center justify-center p-4 hover:border-primary/30 hover:bg-card/60 transition-all duration-500 group"
              >
                <span className="text-sm text-muted-foreground font-medium text-center group-hover:text-foreground transition-colors duration-300">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Authority statement */}
          <ScrollReveal className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-2">
              Parte del ecosistema <span className="text-foreground font-semibold">Frutero</span>—la comunidad de builders más activa de LATAM.
            </p>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border border-white/5 p-6 md:p-8 mb-12">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
              
              <div className="relative z-10 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      index < stats.length - 1 ? "border-r border-white/10" : ""
                    }`}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Sponsor CTA */}
          <ScrollReveal delay={0.2} className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Proyecto de infraestructura AI?
            </p>
            <Button variant="outline" size="sm" className="border-white/10 hover:border-primary/50 rounded-xl">
              Colabora con nosotros
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
