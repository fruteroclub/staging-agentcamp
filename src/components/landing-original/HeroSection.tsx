import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Users, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCheckout } from "@/hooks/useCheckout";

export function HeroSection() {
  const { t, i18n } = useTranslation('original');
  const { handleCheckout, isLoading, loadingLabel } = useCheckout("original");
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">


          {/* Context label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              Programa intensivo · 5 semanas · En español
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            key={`title-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6"
          >
            {t('hero.title.line1')}{" "}
            {t('hero.title.line2')}{" "}
            <span className="text-warning italic">{t('hero.title.line3')}</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            key={`subtitle1-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground-body max-w-xl mx-auto mb-10"
          >
            {t('hero.subtitle.problem')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`ctas-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover transition-all duration-300 px-[30px] py-[15px] text-[17px] font-semibold group rounded-[10px]"
              disabled={isLoading}
              onClick={() => handleCheckout("original.hero")}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {isLoading ? loadingLabel : t('hero.cta.primary')}
              {!isLoading ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : null}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground px-[30px] py-[15px] text-[17px]"
              aria-label="Ver programa del curso Agentcamp"
            >
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>

          {/* Program details strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              5 semanas
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              Máximo 100 lugares
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              Certificación incluida
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
