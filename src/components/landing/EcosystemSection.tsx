import { Button } from "@/components/ui/button";

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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Infraestructura de Producción
            </h2>
            <p className="text-muted-foreground text-lg">
              Agent Operators corre sobre el mismo stack que usan equipos de Silicon Valley.
            </p>
          </div>

          {/* Partner logos grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="aspect-[3/1] bg-card border border-border rounded-lg flex items-center justify-center p-4 hover:border-primary/30 transition-colors"
              >
                <span className="text-sm text-muted-foreground font-medium text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          {/* Authority statement */}
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-2">
              Parte del ecosistema <span className="text-foreground font-semibold">Frutero</span>—la comunidad de builders más activa de LATAM.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center ${
                  index < stats.length - 1 ? "border-r border-border" : ""
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

          {/* Sponsor CTA */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Proyecto de infraestructura AI?
            </p>
            <Button variant="outline" size="sm" className="border-border hover:border-primary">
              Colabora con nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
