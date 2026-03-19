import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import ProvenOperatorImpactSection from "@/components/ProvenOperatorImpactSection";
import DashboardShowcaseSection from "@/components/DashboardShowcaseSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChaosToOrderExperience />
      <ProvenOperatorImpactSection />
      <DashboardShowcaseSection />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
