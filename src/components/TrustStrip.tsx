"use client";

import { motion } from "framer-motion";

const trustPoints = [
  { metric: "$10B+", label: "in combined client revenue" },
  { metric: "6", label: "industries served" },
  { metric: "10,000+", label: "hours saved for clients" },
];

interface TrustStripProps {
  active?: boolean;
}

export default function TrustStrip({ active = true }: TrustStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.65, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl px-4"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-navy shadow-[0_30px_80px_-35px_rgba(15,23,42,0.9)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative px-5 py-5 sm:px-8 sm:py-6">
          <div className="mb-4 flex items-center justify-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300 sm:text-[11px]">
              Proven Operator Impact
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-6">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 12 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75 + i * 0.08, duration: 0.35 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {point.metric}
                </span>
                <span className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-[11px]">
                  {point.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
