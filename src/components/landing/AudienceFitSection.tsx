import { Check, X } from "lucide-react";

const forYou = [
  "Eres founder, marketer, ops lead, o creator",
  "Has usado ChatGPT/Claude por meses pero no tienes nada en producción",
  "Quieres sistemas automatizados, no prompts sueltos",
  "Tienes 5-7 horas por semana para dedicar",
  "Estás listo para construir, no solo consumir contenido",
];

const notForYou = [
  "Buscas un curso teórico de machine learning",
  "Esperas que la IA haga todo sin tu supervisión",
  "No puedes comprometer el tiempo semanal",
  "Ya eres senior developer buscando contenido avanzado",
  "Quieres resultados sin hacer el trabajo",
];

export function AudienceFitSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Agent Operators es para ti?
            </h2>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* For you */}
            <div className="bg-success/5 border border-success/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-success" />
                </div>
                Es para ti si...
              </h3>
              <ul className="space-y-4">
                {forYou.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not for you */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                No es para ti si...
              </h3>
              <ul className="space-y-4">
                {notForYou.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
