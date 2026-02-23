"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const caseStories = [
  {
    industry: "Healthcare — Skilled Nursing",
    title: "Cash Management Automation for Multi-Facility Nursing Home Group",
    problem:
      "A nursing home group operating across dozens of facilities was managing hundreds of bank accounts across 10+ banks. Cash was flowing in from Medicare, Medicaid, private pay, and insurance — but reconciliation was entirely manual. Each facility had its own accounts, and inter-portfolio transfers between entities made it nearly impossible to track where money was, who needed to post it, and what had been reconciled.",
    solution:
      "We built a centralized cash management platform that automatically ingests daily transaction data from every bank account across all banks. The system intelligently routes each transaction to the correct person for posting based on entity, account type, and transaction category. Automated posting handles 90%+ of routine transactions. The reconciliation engine matches transfers across portfolios and entities — catching what used to take weeks of manual work.",
    results: [
      "Hundreds of bank accounts unified in one view",
      "Automated posting & intelligent routing",
      "Cross-portfolio reconciliation in minutes, not weeks",
      "Full audit trail across 10+ banking relationships",
    ],
    accent: "#3b82f6",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    industry: "Manufacturing",
    title: "Multi-Layer Sales Analytics & Demand Forecasting Dashboard",
    problem:
      "A mid-market manufacturing company had sales data trapped across multiple systems — their ERP, separate CRM, distributor portals, and spreadsheets. Leadership couldn't answer basic questions like 'What's our best-selling product by region this quarter?' without days of manual data assembly. Demand forecasting was gut-feel at best, leading to overproduction of slow movers and stockouts of hot products.",
    solution:
      "We built a Sales Intelligence Dashboard with layer upon layer of analysis — drill from company-wide revenue down to individual product SKUs, by region, by customer, by time period. Every layer is interactive and cross-filterable. On top of this, we integrated an AI-powered demand forecasting engine that analyzes historical patterns, seasonality, and leading indicators to predict demand 30/60/90 days out.",
    results: [
      "Layer-by-layer drill-down from company → region → product → SKU",
      "AI demand forecasting with 30/60/90 day projections",
      "18% reduction in overproduction waste",
      "Real-time sales visibility across all channels",
    ],
    accent: "#10b981",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    industry: "Healthcare — Revenue Cycle",
    title: "Revenue Cycle Visibility & Claim Denial Management",
    problem:
      "A multi-location healthcare provider was losing significant revenue due to fragmented billing systems. Claim denials were piling up without anyone catching them in time. AR aging reports were stale by the time they were compiled, and there was zero visibility into the revenue pipeline across facilities.",
    solution:
      "We built a unified revenue cycle platform that integrates billing data from every facility into a single real-time view. The system automatically flags denied claims, routes them for resubmission, tracks appeal timelines, and provides daily exception reports. AR aging is live, not a monthly spreadsheet.",
    results: [
      "32% reduction in claim denials through automated resubmission",
      "Real-time AR aging across all locations",
      "Automated daily exception flagging & routing",
      "Revenue leakage reduced by $2.1M annually",
    ],
    accent: "#ef4444",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

const AUTO_ADVANCE_MS = 10000;

interface StoryCardProps {
  story: (typeof caseStories)[number];
  compact?: boolean;
}

function StoryCard({ story, compact }: StoryCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-md h-full">
      <div className={compact ? "flex flex-col" : "grid lg:grid-cols-5"}>
        {/* Left: accent panel */}
        <div
          className={`relative flex flex-col justify-between ${compact ? "p-5" : "p-5 sm:p-10 lg:col-span-2"}`}
          style={{
            background: `linear-gradient(135deg, ${story.accent}20, ${story.accent}08)`,
          }}
        >
          <div>
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${story.accent}20` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke={story.accent}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={story.icon} />
              </svg>
            </div>

            <div className="mt-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60"
                style={{ backgroundColor: `${story.accent}20` }}
              >
                {story.industry}
              </span>
            </div>
            <h3
              className={`mt-3 font-bold leading-tight text-white ${compact ? "text-base" : "text-lg sm:text-2xl"}`}
            >
              {story.title}
            </h3>
          </div>

          {/* Results */}
          <div className={`space-y-2.5 ${compact ? "mt-5" : "mt-8"}`}>
            {story.results.map((result) => (
              <div key={result} className="flex items-start gap-2">
                <div
                  className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${story.accent}30` }}
                >
                  <svg
                    className="h-2.5 w-2.5 text-white"
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
                <span className="text-xs font-medium text-white/80 sm:text-sm">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: problem/solution details */}
        <div
          className={`flex flex-col justify-center ${compact ? "p-5" : "p-5 sm:p-10 lg:col-span-3"}`}
        >
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span
                className="h-px w-6"
                style={{ backgroundColor: `${story.accent}40` }}
              />
              The Problem
            </h4>
            <p
              className={`mt-3 leading-relaxed text-slate-400 ${compact ? "text-xs" : "text-sm"}`}
            >
              {story.problem}
            </p>
          </div>
          <div className={compact ? "mt-5" : "mt-8"}>
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span
                className="h-px w-6"
                style={{ backgroundColor: `${story.accent}40` }}
              />
              What We Built
            </h4>
            <p
              className={`mt-3 leading-relaxed text-slate-400 ${compact ? "text-xs" : "text-sm"}`}
            >
              {story.solution}
            </p>
          </div>

          {/* CTA */}
          <div className={compact ? "mt-5" : "mt-8"}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              Build Something Like This
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  const navigate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > current ? 1 : -1);
      setCurrent(newIndex);
    },
    [current]
  );

  const next = useCallback(
    () => navigate((current + 1) % caseStories.length),
    [current, navigate]
  );
  const prev = () =>
    navigate((current - 1 + caseStories.length) % caseStories.length);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  // Track which card is visible in the mobile scroll container
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.scrollWidth / caseStories.length;
      const idx = Math.round(scrollLeft / cardWidth);
      setMobileActive(Math.min(idx, caseStories.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const story = caseStories[current];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-navy py-16 sm:py-24 lg:py-32"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-ocean-500/10 blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-ocean-400/8 blur-[60px] sm:blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-yellow-400/[0.03] blur-[100px] sm:blur-[200px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            Real Problems.{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-gradient-x">
              Real Solutions.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            We don&apos;t build generic software. Every solution is built for
            how your business actually operates.
          </p>
        </motion.div>

        {/* ===== Mobile: horizontal swipe cards ===== */}
        <div className="mt-10 md:hidden">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {caseStories.map((s, i) => (
              <div
                key={i}
                className="w-[85vw] flex-shrink-0 snap-center"
              >
                <StoryCard story={s} compact />
              </div>
            ))}
          </div>
          {/* Dot indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {caseStories.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === mobileActive
                    ? "w-8 bg-yellow-400"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== Desktop: animated carousel ===== */}
        <div
          className="relative mt-16 hidden md:block"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  rotateY: dir > 0 ? 3 : -3,
                  scale: 0.95,
                  opacity: 0,
                  filter: "blur(4px)",
                }),
                center: {
                  rotateY: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: (dir: number) => ({
                  rotateY: dir > 0 ? -3 : 3,
                  scale: 0.95,
                  opacity: 0,
                  filter: "blur(4px)",
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <StoryCard story={story} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Previous story"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              {caseStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className="relative"
                  aria-label={`Go to story ${i + 1}`}
                >
                  {i === current && (
                    <svg
                      className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)]"
                      viewBox="0 0 20 20"
                    >
                      <motion.circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-yellow-400"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: AUTO_ADVANCE_MS / 1000,
                          ease: "linear",
                        }}
                        key={`progress-${current}`}
                      />
                    </svg>
                  )}
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-10 bg-yellow-400"
                        : "w-2.5 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Next story"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
