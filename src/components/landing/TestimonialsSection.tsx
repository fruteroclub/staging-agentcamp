import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Llevaba 6 meses jugando con GPT. En 4 semanas tenía un agente que procesa mis emails automáticamente.",
    name: "María González",
    role: "Founder",
    company: "Startup LATAM",
  },
  {
    quote: "El approach de orchestration-first cambió cómo pienso sobre automatización. Ahora todo tiene control.",
    name: "Carlos Ruiz",
    role: "Head of Ops",
    company: "Tech Company",
  },
  {
    quote: "Pensé que necesitaba un developer. Agent Operators me demostró que no.",
    name: "Ana López",
    role: "Content Creator",
    company: "Independent",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Lo que dicen los builders
            </h2>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
