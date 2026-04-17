import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function TestimonialsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t('testimonials.title')}
            </h2>
          </ScrollReveal>

          {/* Testimonials grid */}
          <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
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
                    "{t(`testimonials.items.${index}.quote`)}"
                  </p>

                  <div className="border-t border-white/5 pt-4">
                    <p className="font-semibold">{t(`testimonials.items.${index}.name`)}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(`testimonials.items.${index}.role`)} @ {t(`testimonials.items.${index}.company`)}
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
