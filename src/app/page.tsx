import Navbar from "@/components/Navbar";
import ChaosToOrderExperience from "@/components/ChaosToOrderExperience";
import TrustStrip from "@/components/TrustStrip";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChaosToOrderExperience />
      <TrustStrip />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
