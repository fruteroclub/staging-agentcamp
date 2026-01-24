import { RefreshCw, StopCircle, Dices } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

const icons = [RefreshCw, StopCircle, Dices];

export function PainPointsSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('painPoints.title.line1')}{" "}<br />
            <span className="text-muted-foreground">{t('painPoints.title.line2')}</span>
          </h2>
        </motion.div>

        {/* Pain points grid */}
        <StaggerContainer animationKey={i18n.language} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 shadow-[0_0_50px_-12px_hsl(var(--destructive)/0.1)] hover:border-destructive/30 hover:shadow-[0_0_60px_-12px_hsl(var(--destructive)/0.2)] transition-all duration-500"
              >
                {/* Subtle gradient orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t(`painPoints.items.${index}.title`)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(`painPoints.items.${index}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
