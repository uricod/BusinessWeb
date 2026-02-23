"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineHeart,
  HiOutlineOfficeBuilding,
  HiOutlineHome,
  HiOutlineShoppingCart,
} from "react-icons/hi";

const industries = [
  {
    icon: HiOutlineHeart,
    name: "Healthcare",
    description:
      "Patient management systems, compliance tracking, revenue cycle optimization, and clinical workflow automation. We understand HIPAA, billing codes, and the complexity of healthcare operations.",
    highlights: [
      "Revenue Cycle Management",
      "Patient Portals",
      "Compliance Dashboards",
      "Clinical Workflow Automation",
    ],
    color: "#e11d48",
    lightBg: "rgba(225,29,72,0.05)",
    tagBg: "bg-rose-50 text-rose-700",
  },
  {
    icon: HiOutlineOfficeBuilding,
    name: "Manufacturing",
    description:
      "Production monitoring, inventory management, ERP integrations, and quality control systems. Real-time visibility into every stage of your manufacturing process.",
    highlights: [
      "Production Monitoring",
      "Inventory Systems",
      "ERP Integration",
      "Quality Control Dashboards",
    ],
    color: "#2563eb",
    lightBg: "rgba(37,99,235,0.05)",
    tagBg: "bg-ocean-50 text-ocean-700",
  },
  {
    icon: HiOutlineHome,
    name: "Real Estate",
    description:
      "Portfolio analytics, property management platforms, deal pipeline tracking, and investor reporting. Complete visibility across your real estate portfolio.",
    highlights: [
      "Portfolio Analytics",
      "Property Management",
      "Deal Pipeline Tracking",
      "Investor Reporting",
    ],
    color: "#059669",
    lightBg: "rgba(5,150,105,0.05)",
    tagBg: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: HiOutlineShoppingCart,
    name: "E-Commerce",
    description:
      "Order management, multi-channel analytics, inventory synchronization, and customer behavior insights. Unify your e-commerce operations into one clear view.",
    highlights: [
      "Order Management",
      "Multi-Channel Analytics",
      "Inventory Sync",
      "Customer Insights",
    ],
    color: "#ea580c",
    lightBg: "rgba(234,88,12,0.05)",
    tagBg: "bg-orange-50 text-orange-700",
  },
];

// Card morph variant: circle → rounded rectangle
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    borderRadius: "50%",
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    borderRadius: "1rem",
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      type: "spring" as const,
      stiffness: 150,
      damping: 18,
    },
  }),
};

const tagVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.06,
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  }),
};

export default function Industries() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-32"
    >
      {/* Connected circles SVG pattern background */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
        <pattern id="circlePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="#0f172a" />
          <line x1="30" y1="30" x2="60" y2="30" stroke="#0f172a" strokeWidth="0.3" />
          <line x1="30" y1="30" x2="30" y2="60" stroke="#0f172a" strokeWidth="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circlePattern)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-700">
            Industries
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Deep Expertise{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
              Where It Matters
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our CPA-led team brings years of hands-on experience across these
            industries. We don&apos;t just build technology &mdash; we
            understand your operations, your compliance needs, and your bottom
            line.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative overflow-hidden border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: industry.lightBg }}
                />

                <div className="relative">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${industry.color}, ${industry.color}cc)`,
                    }}
                    whileHover={{ rotate: 5 }}
                  >
                    <industry.icon size={28} />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-bold text-navy">
                    {industry.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {industry.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {industry.highlights.map((h, j) => (
                      <motion.span
                        key={h}
                        custom={j + i * 4}
                        variants={tagVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${industry.tagBg}`}
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
