import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import ProvenOperatorImpactSection from "@/components/ProvenOperatorImpactSection";
import TierSelector, { TierSelectorStatic } from "@/components/TierSelector";
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
      <Suspense
        fallback={(
          <TierSelectorStatic
            initialTierOverride="aiops"
            initialIndustryOverride={initialIndustryOverride}
          />
        )}
      >
        <TierSelector
          initialTierOverride="aiops"
          initialIndustryOverride={initialIndustryOverride}
        />
      </Suspense>
      <Contact />
      <Footer />
    </>
  );
}