"use client";

import { motion } from "framer-motion";
import LivingDashboard from "./LivingDashboard";

export default function DashboardShowcaseSection() {
  return (
    <section
      id="dashboard-showcase"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_30%,#ffffff_100%)] py-18 sm:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-ocean-500/10 blur-3xl sm:h-[520px] sm:w-[520px]" />
        <div className="absolute bottom-10 left-[10%] h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl sm:h-60 sm:w-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-ocean-200 bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-700 shadow-sm">
            Unified Dashboard
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            A clearer view of how the business runs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            One place to see the workflows, metrics, and exceptions that actually run your business.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <LivingDashboard active />
        </div>

        <motion.a
          href="#testimonials"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-ocean-700"
          aria-label="Scroll to What We Build"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            What we build
          </span>
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}