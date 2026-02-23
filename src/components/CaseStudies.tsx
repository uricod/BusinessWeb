"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const caseStudies = [
  {
    industry: "Healthcare",
    title: "Revenue Cycle Visibility Platform",
    challenge:
      "A multi-location healthcare provider was losing revenue due to fragmented billing systems and lack of visibility into claim status across facilities.",
    solution:
      "Built a unified dashboard integrating three separate billing systems, providing real-time claim tracking, denial management workflows, and automated exception flagging.",
    results: [
      "32% reduction in claim denials",
      "Revenue visibility across all locations",
      "Automated daily exception reports",
    ],
    gradient: "from-rose-500 via-pink-500 to-rose-600",
    accent: "text-rose-400",
    dotColor: "bg-rose-500",
  },
  {
    industry: "Manufacturing",
    title: "Production Monitoring & ERP Integration",
    challenge:
      "A mid-size manufacturer relied on manual spreadsheets to track production across multiple lines, with no real-time visibility into throughput or quality metrics.",
    solution:
      "Developed a custom production monitoring application integrated with their existing ERP system, providing live dashboards for floor managers and executive leadership.",
    results: [
      "Real-time production visibility",
      "18% improvement in throughput",
      "Eliminated manual reporting",
    ],
    gradient: "from-ocean-500 via-blue-500 to-ocean-600",
    accent: "text-ocean-400",
    dotColor: "bg-ocean-500",
  },
  {
    industry: "Real Estate",
    title: "Portfolio Analytics & Investor Reporting",
    challenge:
      "A growing real estate firm managed 200+ properties using disconnected tools, making investor reporting a painful quarterly exercise.",
    solution:
      "Created a centralized portfolio management platform with automated financial rollups, investor-facing dashboards, and deal pipeline tracking.",
    results: [
      "Quarterly reporting cut from 3 weeks to 2 days",
      "Real-time portfolio performance metrics",
      "Investor self-service portal",
    ],
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    accent: "text-emerald-400",
    dotColor: "bg-emerald-500",
  },
  {
    industry: "E-Commerce",
    title: "Multi-Channel Operations Dashboard",
    challenge:
      "An e-commerce company selling across 5 channels had no unified view of inventory, orders, or customer data, leading to overselling and fulfillment delays.",
    solution:
      "Built an operations command center integrating all sales channels, warehouse systems, and customer service tools into a single pane of glass with AI-powered demand forecasting.",
    results: [
      "95% reduction in overselling",
      "Unified view across 5 channels",
      "AI-powered inventory forecasting",
    ],
    gradient: "from-coral-500 via-orange-500 to-coral-600",
    accent: "text-coral-400",
    dotColor: "bg-coral-500",
  },
];

export default function CaseStudies() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  };

  const next = () => navigate((current + 1) % caseStudies.length);
  const prev = () =>
    navigate((current - 1 + caseStudies.length) % caseStudies.length);

  const study = caseStudies[current];

  return (
    <section id="case-studies" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-coral-200 bg-coral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-600">
            Case Studies
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Real Problems.{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-coral-500 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: 80 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 * direction }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
            >
              <div className="grid lg:grid-cols-2">
                {/* Left: gradient panel */}
                <div
                  className={`relative flex flex-col justify-center bg-gradient-to-br ${study.gradient} p-8 text-white sm:p-12`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -left-8 -bottom-8 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

                  <div className="relative">
                    <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                      {study.industry}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold sm:text-3xl leading-tight">
                      {study.title}
                    </h3>
                    <div className="mt-8 space-y-4">
                      {study.results.map((result) => (
                        <div
                          key={result}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                            <svg
                              className="h-3 w-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white/90">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: details */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span className="h-px w-6 bg-slate-300" />
                      The Challenge
                    </h4>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span className="h-px w-6 bg-slate-300" />
                      Our Solution
                    </h4>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-ocean-300 hover:text-ocean-600 hover:shadow-md"
              aria-label="Previous case study"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex gap-2.5">
              {caseStudies.map((s, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? `w-10 ${s.dotColor}`
                      : "w-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to case study ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-ocean-300 hover:text-ocean-600 hover:shadow-md"
              aria-label="Next case study"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
