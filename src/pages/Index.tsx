import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { MethodSection } from "@/components/landing/MethodSection";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { EcosystemSection } from "@/components/landing/EcosystemSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { DemoDaySection } from "@/components/landing/DemoDaySection";
import { AudienceFitSection } from "@/components/landing/AudienceFitSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TransformationSection />
        <PainPointsSection />
        <MethodSection />
        <CurriculumSection />
        <EcosystemSection />
        <TestimonialsSection />
        <DemoDaySection />
        <AudienceFitSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
