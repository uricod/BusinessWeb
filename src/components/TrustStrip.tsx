"use client";

import { motion } from "framer-motion";

const trustPoints = [
  { metric: "$10B+", label: "in combined client revenue" },
  { metric: "6", label: "industries served" },
  { metric: "10,000+", label: "hours saved for clients" },
];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12 lg:gap-20"
        >
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                {point.metric}
              </span>
              <span className="mt-1 text-sm font-medium text-slate-400">
                {point.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
