import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import HowItWorks from "@/components/home/HowItWorks";
import CoreFeatures from "@/components/home/CoreFeatures";
import PromptLibraryPreview from "@/components/home/PromptLibraryPreview";
import CallToAction from "@/components/home/CallToAction";
import SEOContentSection from "@/components/home/SEOContentSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <Hero />

      <FeatureSection />

      <HowItWorks />

      <PromptLibraryPreview />

      <CoreFeatures />

      <SEOContentSection />

      <FAQSection />

      <CallToAction />
    </div>
  );
}
