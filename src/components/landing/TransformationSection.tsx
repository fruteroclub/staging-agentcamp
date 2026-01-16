import { ArrowRight, Check, X } from "lucide-react";

const transformations = [
  { before: "Experimentas con prompts", after: "Operas workflows automatizados" },
  { before: "Demos locales", after: "Sistemas deployed en la nube" },
  { before: "Agentes que alucinan", after: "Agentes con control y oversight" },
  { before: '"Algún día aprendo"', after: "Agent Operator certificado" },
];

export function TransformationSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            En 4 semanas, esto cambia:
          </h2>
        </div>

        {/* Transformation table */}
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4">
            {transformations.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 md:p-6 rounded-xl bg-card border border-border"
              >
                {/* Before */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">{item.before}</span>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />

                {/* After */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
