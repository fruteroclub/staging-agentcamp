import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useTranslation } from "react-i18next";

export function FinalCTASection() {
  const { t, i18n } = useTranslation();
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" 
        />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <ScrollReveal animationKey={i18n.language}>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6">
              {t('finalCta.title.line1')}{" "}
              <span className="text-primary font-serif italic text-[1.1em]">{t('finalCta.title.line2')}</span>
            </h2>
          </ScrollReveal>

          {/* Sub-text */}
          <ScrollReveal delay={0.1} animationKey={i18n.language}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              {t('finalCta.subtitle')}
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2} animationKey={i18n.language}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover transition-all duration-300 hover:-translate-y-1 px-[30px] py-[15px] text-[17px] font-semibold group animate-pulse-glow rounded-[10px]"
                asChild
              >
                <a href="https://tally.so/r/aQ2D0b" target="_blank" rel="noopener noreferrer">
                  {t('finalCta.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </ScrollReveal>

          {/* Final urgency */}
          <ScrollReveal delay={0.3} animationKey={i18n.language}>
            <p className="text-sm text-muted-foreground mt-8">
              {t('finalCta.urgency')}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
