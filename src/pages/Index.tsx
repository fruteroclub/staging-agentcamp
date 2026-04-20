import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { BuilderTestimonialsSection } from "@/components/landing/BuilderTestimonialsSection";
import { ProvenTrackRecordSection } from "@/components/landing/ProvenTrackRecordSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { MethodSection } from "@/components/landing/MethodSection";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { StackSection } from "@/components/landing/StackSection";
import { EcosystemSection } from "@/components/landing/EcosystemSection";
import { InstructorsSection } from "@/components/landing/InstructorsSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { AudienceFitSection } from "@/components/landing/AudienceFitSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { DemoDaySection } from "@/components/landing/DemoDaySection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { PartnerCTASection } from "@/components/landing/PartnerCTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <BuilderTestimonialsSection />
        <ProvenTrackRecordSection />
        <PainPointsSection />
        <TransformationSection />
        <MethodSection />
        <CurriculumSection />
        <StackSection />
        <EcosystemSection />
        <InstructorsSection />
        <SocialProofSection />
        <AudienceFitSection />
        <TestimonialsSection />
        <DemoDaySection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <PartnerCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
