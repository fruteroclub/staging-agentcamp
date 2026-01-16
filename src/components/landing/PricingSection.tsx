import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Calendar, Clock, Users, Video, MessageSquare, Headphones } from "lucide-react";

const includes = [
  { icon: Video, text: "8 sesiones en vivo + grabaciones" },
  { icon: Check, text: "4 proyectos con feedback" },
  { icon: Users, text: "Acceso a comunidad de Operators" },
  { icon: Headphones, text: "Office hours 2x por semana" },
  { icon: MessageSquare, text: "Soporte async durante el programa" },
];

export function PricingSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Cohorte 1 — Febrero 2026
            </h2>
            <p className="text-muted-foreground">
              Patrocinado por nuestros partners de infraestructura
            </p>
          </div>

          {/* Pricing card */}
          <div className="bg-card border-2 border-primary/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary/10 p-6 text-center border-b border-primary/20">
              <Badge className="gradient-primary text-primary-foreground mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                100% Patrocinado
              </Badge>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground line-through text-xl">$499 USD</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Valorado en $499 — gratis para la primera cohorte
              </p>
            </div>

            {/* Details */}
            <div className="p-8">
              {/* Program details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duración</p>
                    <p className="font-medium">4 semanas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sesiones</p>
                    <p className="font-medium">8 en vivo</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horario</p>
                    <p className="font-medium">[Por definir]</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cohorte</p>
                    <p className="font-medium">Máximo 50</p>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="border-t border-border pt-6 mb-8">
                <p className="font-semibold mb-4">Incluye:</p>
                <ul className="space-y-3">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 py-6 text-lg font-semibold group"
              >
                Asegura Tu Lugar
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Guarantee */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                <span className="text-success">Garantía Semana 1:</span> Si después de la primera semana 
                sientes que no es para ti, simplemente nos avisas. Sin preguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
