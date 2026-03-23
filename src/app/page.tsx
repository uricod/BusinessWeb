import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import ProvenOperatorImpactSection from "@/components/ProvenOperatorImpactSection";
import TierSelector from "@/components/TierSelector";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChaosToOrderExperience />
      <ProvenOperatorImpactSection />
      <TierSelector />
      <Contact />
      <Footer />
    </>
  );
}
