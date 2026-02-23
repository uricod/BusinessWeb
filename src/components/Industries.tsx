"use client";

import { motion } from "framer-motion";
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
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-500/5",
    border: "hover:border-rose-200",
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
    gradient: "from-ocean-500 to-blue-600",
    bg: "bg-ocean-500/5",
    border: "hover:border-ocean-200",
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
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/5",
    border: "hover:border-emerald-200",
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
    gradient: "from-coral-500 to-orange-600",
    bg: "bg-coral-500/5",
    border: "hover:border-coral-200",
    tagBg: "bg-coral-50 text-coral-700",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0f172a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-coral-200 bg-coral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-600">
            Industries
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Deep Expertise{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-coral-500 bg-clip-text text-transparent">
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${industry.border}`}
            >
              {/* Subtle background glow on hover */}
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full ${industry.bg} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${industry.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <industry.icon size={28} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {industry.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {industry.highlights.map((h) => (
                    <span
                      key={h}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${industry.tagBg}`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
