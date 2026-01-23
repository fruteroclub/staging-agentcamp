import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

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
    quote: "Pensé que necesitaba un developer. Agentcamp me demostró que no.",
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
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Lo que dicen los builders
            </h2>
          </ScrollReveal>

          {/* Testimonials grid */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm border border-white/5 p-6 hover:border-primary/20 transition-all duration-500 group"
              >
                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Quote icon with gradient */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <Quote className="w-6 h-6 text-primary/60" />
                  </div>
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t border-white/5 pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
