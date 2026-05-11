"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TierDashboard from "./TierDashboard";
import TierCaseStudies from "./TierCaseStudies";

export type TierId = "precision" | "visibility" | "automation" | "aiops";

export interface Tier {
  id: TierId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
}

export const tiers: Tier[] = [
  {
    id: "precision",
    name: "Precision Engineering",
    tagline: "Custom software that just works. No AI buzzwords.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    color: "#fbbf24",
  },
  {
    id: "aiops",
    name: "Acropora",
    tagline: "Insightful, proactive AI chief of staff.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "#f472b6",
  },
];

export default function TierSelector() {
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelect = (tierId: TierId) => {
    setSelectedTier(tierId);
    // Wait for selector collapse (mode="wait" exit ~200ms) so document height
    // has settled before we scroll. Scrolling earlier overshoots the heading.
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  };

  const handleReset = () => {
    // Scroll first while content is still in the DOM, then clear selection
    selectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setSelectedTier(null);
    }, 600);
  };

  const handleSwitch = (tierId: TierId) => {
    setSelectedTier(tierId);
    // Content AnimatePresence mode="wait" — old exits ~200ms before new mounts.
    // Scroll after the new content has mounted so contentRef points to it.
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  };

  const selectedTierData = tiers.find((t) => t.id === selectedTier);

  return (
    <>
      {/* Tier Selector Section */}
      <section
        ref={selectorRef}
        id="tier-selector"
        className="relative overflow-hidden bg-navy py-16 sm:py-24"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-ocean-500/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-yellow-400/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
              What We Build
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-gradient-x">
                Track.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              Start with precision-built software or go straight to autonomous AI operations.
            </p>
          </motion.div>

          {/* Expanded Selector (when nothing selected) */}
          <AnimatePresence mode="wait">
            {!selectedTier ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-12"
              >
                {/* Desktop: 2 columns */}
                <div className="hidden gap-4 md:grid md:grid-cols-2">
                  {tiers.map((tier, i) => (
                    <motion.button
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(tier.id)}
                      className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                      style={{
                        boxShadow: `0 0 0 0 ${tier.color}00`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px 0 ${tier.color}15`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${tier.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${tier.color}00`;
                        (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.1)`;
                      }}
                    >
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${tier.color}15` }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7"
                          fill="none"
                          stroke={tier.color}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={tier.icon} />
                        </svg>
                      </div>
                      <h3
                        className="mt-5 text-lg font-bold"
                        style={{ color: tier.color }}
                      >
                        {tier.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {tier.tagline}
                      </p>
                      <div
                        className="mt-6 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all group-hover:gap-2.5"
                        style={{
                          backgroundColor: `${tier.color}15`,
                          color: tier.color,
                        }}
                      >
                        Explore
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Mobile: stacked panels */}
                <div className="flex flex-col gap-3 md:hidden">
                  {tiers.map((tier, i) => (
                    <motion.button
                      key={tier.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(tier.id)}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm"
                    >
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${tier.color}15` }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke={tier.color}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={tier.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold" style={{ color: tier.color }}>
                          {tier.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-400 truncate">
                          {tier.tagline}
                        </p>
                      </div>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Collapsed Mini-Nav (when a tier is selected) */
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-10"
              >
                {/* Desktop mini-nav */}
                <div className="hidden md:flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm">
                  {tiers.map((tier) => {
                    const isActive = tier.id === selectedTier;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => handleSwitch(tier.id)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "border border-white/10"
                            : "opacity-50 hover:opacity-80"
                        }`}
                        style={{
                          backgroundColor: isActive ? `${tier.color}15` : "transparent",
                          borderColor: isActive ? `${tier.color}40` : "transparent",
                          color: tier.color,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={tier.icon} />
                        </svg>
                        {tier.name}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile mini-nav */}
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 md:hidden">
                  {tiers.map((tier) => {
                    const isActive = tier.id === selectedTier;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => handleSwitch(tier.id)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                          isActive
                            ? "border border-white/10"
                            : "opacity-50"
                        }`}
                        style={{
                          backgroundColor: isActive ? `${tier.color}15` : "transparent",
                          borderColor: isActive ? `${tier.color}40` : "transparent",
                          color: tier.color,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={tier.icon} />
                        </svg>
                        <span className="truncate">{tier.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Tier Content (Dashboard + Case Studies) */}
      <AnimatePresence mode="wait">
        {selectedTier && selectedTierData && (
          <motion.div
            key={selectedTier}
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TierDashboard tier={selectedTierData} />
            <TierCaseStudies tierId={selectedTier} />

            {/* Explore Another Path */}
            <section className="relative bg-navy py-16 sm:py-20">
              <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <svg
                    className="h-5 w-5 text-yellow-400 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Explore Another Path
                </motion.button>
                <p className="mt-4 text-sm text-slate-500">
                  Compare both tracks
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
