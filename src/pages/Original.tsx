import { Navbar } from "@/components/landing-original/Navbar";
import { HeroSection } from "@/components/landing-original/HeroSection";
import { PainPointsSection } from "@/components/landing-original/PainPointsSection";
import { TransformationSection } from "@/components/landing-original/TransformationSection";
import { MethodSection } from "@/components/landing-original/MethodSection";
import { CurriculumSection } from "@/components/landing-original/CurriculumSection";
import { EcosystemSection } from "@/components/landing-original/EcosystemSection";
import { TestimonialsSection } from "@/components/landing-original/TestimonialsSection";
import { AudienceFitSection } from "@/components/landing-original/AudienceFitSection";
import { PricingSection } from "@/components/landing-original/PricingSection";
import { FAQSection } from "@/components/landing-original/FAQSection";
import { FinalCTASection } from "@/components/landing-original/FinalCTASection";
import { Footer } from "@/components/landing-original/Footer";

const Original = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <PainPointsSection />
        <TransformationSection />
        <MethodSection />
        <CurriculumSection />
        <EcosystemSection />
        <TestimonialsSection />
        <AudienceFitSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Original;
