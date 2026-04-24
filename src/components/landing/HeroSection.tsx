import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCheckout } from "@/hooks/useCheckout";

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const { handleCheckout, isLoading, loadingLabel } = useCheckout();
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

          {/* Overline — amarillo, antes del headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-overline font-semibold text-warning tracking-[0.1em] uppercase">
              {t('hero.overline')}
            </span>
          </motion.div>

          {/* H1 — Jakarta extrabold line 1 + Playfair italic line 2 */}
          <motion.h1
            key={`title-${i18n.language}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6"
          >
            {t('hero.title.line1')}{" "}
            <span className="text-primary font-serif italic text-[1.1em]">{t('hero.title.line2')}</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            key={`subtitle-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground-body max-w-2xl mx-auto mb-6"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Proof line */}
          <motion.p
            key={`proof-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10"
          >
            {t('hero.proofLine')}
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
              onClick={() => handleCheckout("landing.hero")}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {isLoading ? loadingLabel : t('hero.cta.primary')}
              {!isLoading ? <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> : null}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground px-[30px] py-[15px] text-[17px]"
              aria-label="Ver currículum de AgentCamp"
              asChild
            >
              <a href="#curriculum">
                {t('hero.cta.secondary')}
              </a>
            </Button>
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
