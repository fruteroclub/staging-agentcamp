import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PartnerCTASection() {
  const { t, i18n } = useTranslation();

  return (
    <section id="partner" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animationKey={i18n.language}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {t('partnerCta.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.1}>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {t('partnerCta.body')}
            </p>
          </ScrollReveal>

          <ScrollReveal animationKey={i18n.language} delay={0.2}>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 px-[30px] py-[15px] text-[17px] font-semibold group rounded-[10px]"
              asChild
            >
              <a href="mailto:mel@frutero.club">
                {t('partnerCta.cta')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
