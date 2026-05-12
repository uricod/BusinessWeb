import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import ProvenOperatorImpactSection from "@/components/ProvenOperatorImpactSection";
import TierSelector, { TierSelectorStatic } from "@/components/TierSelector";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChaosToOrderExperience />
      <ProvenOperatorImpactSection />
      <Suspense fallback={<TierSelectorStatic />}>
        <TierSelector />
      </Suspense>
      <Contact />
      <Footer />
    </>
  );
}
