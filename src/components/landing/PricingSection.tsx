import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Calendar, Clock, Users, Video, MessageSquare, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const includesIcons = [Video, Check, Users, Headphones, MessageSquare];

const detailsConfig = [
  { icon: Calendar, key: 'duration' },
  { icon: Video, key: 'sessions' },
  { icon: Clock, key: 'schedule' },
  { icon: Users, key: 'cohort' },
];

export function PricingSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t('pricing.cohortTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('pricing.cohortSubtitle')}
            </p>
          </ScrollReveal>

          {/* Pricing card - premium glassmorphism */}
          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-sm border-2 border-primary/40 shadow-2xl shadow-primary/10"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

              {/* Header */}
              <div className="relative z-10 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 p-8 text-center border-b border-primary/20">
                <Badge className="gradient-primary text-primary-foreground mb-4 px-4 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  {t('pricing.badge')}
                </Badge>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-5xl md:text-6xl font-bold">{t('pricing.price.current')}</span>
                  <span className="text-muted-foreground line-through text-xl">{t('pricing.price.original')}</span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {t('pricing.price.note')}
                </p>
              </div>

              {/* Details */}
              <div className="relative z-10 p-8">
                {/* Program details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {detailsConfig.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t(`pricing.details.${item.key}.label`)}</p>
                        <p className="font-medium">{t(`pricing.details.${item.key}.value`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Includes */}
                <div className="border-t border-white/5 pt-6 mb-8">
                  <p className="font-semibold mb-4">{t('pricing.includes.title')}</p>
                  <ul className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const Icon = includesIcons[index];
                      return (
                        <li key={index} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span>{t(`pricing.includes.items.${index}`)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-1 py-7 text-lg font-semibold group rounded-2xl"
                >
                  {t('pricing.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Guarantee */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  {t('pricing.guarantee')}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
