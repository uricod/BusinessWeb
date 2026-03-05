import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      {children}
      <Footer />
    </>
  );
}
