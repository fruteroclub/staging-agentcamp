import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SocialProofSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animationKey={i18n.language}>
            <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-foreground font-semibold text-center">
                {t('socialProof.foundingCohort')}
              </p>
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
