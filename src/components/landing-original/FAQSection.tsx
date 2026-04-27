import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer } from "@/components/ui/scroll-reveal";
import { staggerItem } from "@/components/ui/scroll-reveal-variants";

function FormattedAnswer({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => {
        if (para.startsWith("•")) {
          const items = para.split("\n").filter(l => l.startsWith("•"));
          return (
            <ul key={i} className="space-y-1.5">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>{item.replace("• ", "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{para}</p>;
      })}
    </div>
  );
}

export function FAQSection() {
  const { t, i18n } = useTranslation('original');

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              {t('faq.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('faq.subtitle')}
            </p>
          </ScrollReveal>

          {/* FAQ Accordion */}
          <StaggerContainer animationKey={i18n.language}>
            <Accordion type="single" collapsible className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="overflow-hidden rounded-2xl bg-card/40 border border-border/50 px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-card/70 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline group">
                      <span className="group-hover:text-primary transition-colors duration-300 pr-4">
                        {t(`faq.items.${index}.question`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      <FormattedAnswer text={t(`faq.items.${index}.answer`)} />
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </StaggerContainer>

          {/* CTA de cierre */}
          <ScrollReveal animationKey={i18n.language} className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              {t('faq.footer')}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
