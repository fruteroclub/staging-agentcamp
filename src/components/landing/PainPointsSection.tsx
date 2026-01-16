import { RefreshCw, StopCircle, Dices } from "lucide-react";

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            El problema no es la IA.{" "}
            <span className="text-muted-foreground">Es el gap entre demo y producción.</span>
          </h2>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-6 group-hover:bg-destructive/20 transition-colors">
                <point.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
