import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheAcropora | Custom Business Applications & Consulting",
  description:
    "We combine deep industry expertise with cutting-edge technology to build custom applications that give you complete visibility into your entire operation.",
  keywords: [
    "custom software",
    "business consulting",
    "app development",
    "business intelligence",
    "AI automation",
    "healthcare software",
    "manufacturing software",
    "real estate software",
    "ecommerce solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
