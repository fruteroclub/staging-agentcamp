import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t, i18n } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline badges */}
          <motion.div
            key={`badges-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {t('hero.badge.virtual')}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground px-4 py-1.5">
              {t('hero.badge.duration')}
            </Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            key={`title-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {t('hero.title.line1')}{" "}<br />
            <span className="text-gradient">{t('hero.title.line2')}</span>{" "}<br />
            {t('hero.title.line3')}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            key={`subtitle1-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {t('hero.subtitle.problem')}
          </motion.p>
          <motion.p
            key={`subtitle2-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground font-medium mb-10"
          >
            {t('hero.subtitle.solution')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`ctas-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              className="gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold group"
              aria-label="Reservar lugar en Agentcamp cohorte 2"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg"
              aria-label="Ver programa del curso Agentcamp"
            >
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>

          {/* Urgency line */}
          <motion.p
            key={`urgency-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            {t('hero.urgency')}
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
