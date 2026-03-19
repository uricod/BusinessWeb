"use client";

import { motion } from "framer-motion";
import TrustStrip from "./TrustStrip";

export default function ProvenOperatorImpactSection() {
  return (
    <section
      id="proven-impact"
      className="relative -mt-px overflow-hidden bg-[linear-gradient(180deg,#f0f7ff_0%,#eef6ff_28%,#ffffff_100%)] pt-8 pb-20 sm:pt-12 sm:pb-24"
    >
      <div className="absolute inset-0">
        <div className="absolute left-[8%] top-12 h-40 w-40 rounded-full bg-ocean-400/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 right-[10%] h-48 w-48 rounded-full bg-yellow-300/15 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-ocean-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-700 shadow-sm">
            Proven Operator Impact
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Operational credibility first.
          </h2>
        </motion.div>

        <div className="mt-8 w-full sm:mt-10">
          <TrustStrip active />
        </div>

        <motion.a
          href="#dashboard-showcase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-8 flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-ocean-700 sm:mt-10"
          aria-label="Scroll to dashboard"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            See the dashboard
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