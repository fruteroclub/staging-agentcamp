import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/scroll-reveal";

export function FAQSection() {
  const { t, i18n } = useTranslation();

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <ScrollReveal animationKey={i18n.language} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('faq.title')}
            </h2>
          </ScrollReveal>

          {/* FAQ Accordion */}
          <StaggerContainer animationKey={i18n.language}>
            <Accordion type="single" collapsible className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 px-6 data-[state=open]:border-primary/30 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold py-6 hover:no-underline group">
                      <span className="group-hover:text-primary transition-colors duration-300">
                        {t(`faq.items.${index}.question`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                      {t(`faq.items.${index}.answer`)}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
