import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import ProvenOperatorImpactSection from "@/components/ProvenOperatorImpactSection";
import TierSelector from "@/components/TierSelector";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

interface TrackAiopsPageProps {
  initialIndustryOverride?: string | null;
}

export default function TrackAiopsPage({ initialIndustryOverride = null }: TrackAiopsPageProps) {
  return (
    <>
      <Navbar />
      <ChaosToOrderExperience />
      <ProvenOperatorImpactSection />
      <TierSelector
        initialTierOverride="aiops"
        initialIndustryOverride={initialIndustryOverride}
      />
      <Contact />
      <Footer />
    </>
  );
}