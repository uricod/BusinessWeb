"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { TierId } from "./TierSelector";

interface CaseStory {
  industry: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  impact: { metric: string; label: string };
  accent: string;
  icon: string;
}

const caseStories: CaseStory[] = [
  {
    industry: "Healthcare — Skilled Nursing",
    title: "Cash Management Automation for Multi-Facility Nursing Home Group",
    problem:
      "A nursing home group operating across dozens of facilities was managing hundreds of bank accounts across 10+ banks. Cash was flowing in from Medicare, Medicaid, private pay, and insurance — but reconciliation was entirely manual.",
    solution:
      "We built a centralized cash management platform that automatically ingests daily transaction data from every bank account across all banks. The system intelligently routes each transaction to the correct person for posting based on entity, account type, and transaction category.",
    results: [
      "Hundreds of bank accounts unified in one view",
      "Automated posting & intelligent routing",
      "Cross-portfolio reconciliation in minutes, not weeks",
      "Full audit trail across 10+ banking relationships",
    ],
    impact: { metric: "2,400+", label: "hours saved annually" },
    accent: "#3b82f6",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    industry: "Manufacturing",
    title: "Multi-Layer Sales Analytics & Demand Forecasting Dashboard",
    problem:
      "A mid-market manufacturing company had sales data trapped across multiple systems — their ERP, separate CRM, distributor portals, and spreadsheets. Leadership couldn't answer basic questions without days of manual data assembly.",
    solution:
      "We built a Sales Intelligence Dashboard with layer upon layer of analysis — drill from company-wide revenue down to individual product SKUs. On top of this, we integrated an AI-powered demand forecasting engine that analyzes historical patterns.",
    results: [
      "Layer-by-layer drill-down from company → region → product → SKU",
      "AI demand forecasting with 30/60/90 day projections",
      "18% reduction in overproduction waste",
      "Real-time sales visibility across all channels",
    ],
    impact: { metric: "10%", label: "increase in sales revenue" },
    accent: "#10b981",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    industry: "Healthcare — Revenue Cycle",
    title: "Revenue Cycle Visibility & Claim Denial Management",
    problem:
      "A multi-location healthcare provider was losing significant revenue due to fragmented billing systems. Claim denials were piling up without anyone catching them in time.",
    solution:
      "We built a unified revenue cycle platform that integrates billing data from every facility into a single real-time view. The system automatically flags denied claims, routes them for resubmission, and tracks appeal timelines.",
    results: [
      "32% reduction in claim denials through automated resubmission",
      "Real-time AR aging across all locations",
      "Automated daily exception flagging & routing",
      "Revenue leakage reduced by $2.1M annually",
    ],
    impact: { metric: "20%", label: "faster collections — millions recovered" },
    accent: "#ef4444",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    industry: "Healthcare — Home Health",
    title: "EVV Fraud Detection & Real-Time Shift Monitoring Platform",
    problem:
      "A home health agency was struggling with clock-in fraud and compliance gaps in their EVV system. The agency's insurance carrier flagged them as high-risk.",
    solution:
      "We built a real-time monitoring platform that cross-references every EVV clock-in against GPS location, device signatures, and scheduled shift data to detect anomalies instantly. Pattern detection algorithms identify repeat offenders.",
    results: [
      "Insurance premiums cut by 50% within the first renewal cycle",
      "Real-time visibility into all active caregiver shifts",
      "Automated fraud detection with instant supervisor alerts",
      "Audit-ready compliance reports for insurers & regulators",
    ],
    impact: { metric: "50%", label: "cut in insurance premiums" },
    accent: "#8b5cf6",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    industry: "Healthcare — Dialysis",
    title: "Automated Billing & Invoice Generation Platform",
    problem:
      "A dialysis company was creating invoices entirely by hand — pulling treatment data, cross-referencing contracted rates, and assembling invoices in spreadsheets. The process took nearly two weeks every cycle.",
    solution:
      "We built an automated billing platform that syncs directly with the company's clinical and contract management systems. The app generates polished invoices with summary and detail pages — all in about 30 seconds.",
    results: [
      "Invoice cycle reduced from 2 weeks to 30 seconds",
      "Auto-generated summary & detail pages per client",
      "Direct sync with clinical system & contracted terms",
      "Invoices sent 5 days earlier — faster collections",
    ],
    impact: { metric: "500+", label: "hours saved per billing cycle" },
    accent: "#f59e0b",
    icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
  },
  {
    industry: "Real Estate — Investment Management",
    title: "Live LP & Investor Statement Portal",
    problem:
      "A real estate management firm was producing investor and LP statements manually every quarter. Statements were outdated by the time they reached investors.",
    solution:
      "We built a custom investor portal that connects directly to the firm's property management and accounting systems, giving LPs and investors real-time visibility into fund performance with personalized dashboards.",
    results: [
      "Real-time investor dashboards replacing quarterly PDF statements",
      "Live property-level performance metrics & fund analytics",
      "Investor inquiries reduced by 70% with self-service access",
      "One-click quarterly statement generation from live data",
    ],
    impact: { metric: "38%", label: "increase in investor retention" },
    accent: "#06b6d4",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2",
  },
  {
    industry: "Corporate Operations — Executive Enablement",
    title: "Secure OpenClaw Executive Agent Workspace",
    problem:
      "Executive teams were drowning in fragmented information across inboxes, internal updates, market headlines, and manually prepared briefing documents.",
    solution:
      "We designed a secure OpenClaw agent environment for corporate leadership that triages email, compiles automated news digests, monitors sentiment, and produces recurring reports with full audit trails.",
    results: [
      "Executive email triage prioritized automatically by urgency and context",
      "Daily internal news and company updates delivered in one briefing",
      "Public sentiment monitoring across brands, markets, and risk topics",
      "Automated reporting with secure workflows, permissions, and audit trails",
    ],
    impact: { metric: "60%", label: "less manual executive prep work" },
    accent: "#14b8a6",
    icon: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
  },
];

// Map each case story to its tier
const tierMapping: Record<TierId, number[]> = {
  precision: [0, 4, 5],    // Cash Mgmt, Billing, Investor Portal
  visibility: [1, 2],       // Sales Analytics, Revenue Cycle
  automation: [3],           // EVV Fraud Detection
  aiops: [6],                // OpenClaw Executive Agent
};

const AUTO_ADVANCE_MS = 8000;

interface TierCaseStudiesProps {
  tierId: TierId;
}

export default function TierCaseStudies({ tierId }: TierCaseStudiesProps) {
  const stories = tierMapping[tierId].map((i) => caseStories[i]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  // Reset when tier changes
  useEffect(() => {
    setCurrent(0);
    setMobileActive(0);
  }, [tierId]);

  const navigate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > current ? 1 : -1);
      setCurrent(newIndex);
    },
    [current]
  );

  const next = useCallback(
    () => navigate((current + 1) % stories.length),
    [current, navigate, stories.length]
  );

  // Auto-advance only if more than 1 story
  useEffect(() => {
    if (stories.length <= 1) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, stories.length]);

  // Track mobile scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.scrollWidth / stories.length;
      const idx = Math.round(scrollLeft / cardWidth);
      setMobileActive(Math.min(idx, stories.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [stories.length]);

  const story = stories[current];

  const tierColors: Record<TierId, string> = {
    precision: "#fbbf24",
    visibility: "#38bdf8",
    automation: "#a78bfa",
    aiops: "#f472b6",
  };

  const tierColor = tierColors[tierId];

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full blur-[80px] sm:blur-[150px] opacity-10"
          style={{ backgroundColor: tierColor }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full blur-[60px] sm:blur-[120px] opacity-10"
          style={{ backgroundColor: story.accent }}
        />
      </div>

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
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{
              borderColor: `${tierColor}30`,
              backgroundColor: `${tierColor}10`,
              color: tierColor,
            }}
          >
            Case Studies
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Real Results.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${tierColor}, white, ${tierColor})`,
              }}
            >
              Real Impact.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            See what we&apos;ve built for businesses on this track.
          </p>
        </motion.div>

        {/* Mobile: horizontal swipe cards */}
        <div className="mt-10 md:hidden">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {stories.map((s, i) => (
              <div key={i} className="w-[85vw] flex-shrink-0 snap-center">
                <CompactStoryCard story={s} />
              </div>
            ))}
          </div>
          {stories.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {stories.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === mobileActive ? "w-8" : "w-2 bg-white/20"
                  }`}
                  style={i === mobileActive ? { backgroundColor: tierColor } : undefined}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: animated carousel */}
        <div
          className="relative mt-16 hidden md:block"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${tierId}-${current}`}
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
              <FullStoryCard story={story} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {stories.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  navigate(
                    (current - 1 + stories.length) % stories.length
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Previous story"
              >
                <HiChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                {stories.map((_, i) => (
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
                          style={{ color: tierColor }}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: AUTO_ADVANCE_MS / 1000,
                            ease: "linear",
                          }}
                          key={`progress-${tierId}-${current}`}
                        />
                      </svg>
                    )}
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === current ? "w-10" : "w-2.5 bg-white/15 hover:bg-white/30"
                      }`}
                      style={i === current ? { backgroundColor: tierColor } : undefined}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigate((current + 1) % stories.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Next story"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center sm:mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
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
        </motion.div>
      </div>
    </section>
  );
}

function CompactStoryCard({ story }: { story: CaseStory }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-md h-full">
      <div className="flex flex-col">
        {/* Accent panel */}
        <div
          className="relative flex flex-col justify-between p-5"
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
            <h3 className="mt-3 text-base font-bold leading-tight text-white">
              {story.title}
            </h3>
          </div>

          {/* Impact */}
          <div
            className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5"
            style={{
              background: `linear-gradient(135deg, ${story.accent}15, ${story.accent}05)`,
              borderColor: `${story.accent}30`,
            }}
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke={story.accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold" style={{ color: story.accent }}>
                {story.impact.metric}
              </span>
              <span className="text-xs font-medium text-white/60">
                {story.impact.label}
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="mt-5 space-y-2.5">
            {story.results.map((result) => (
              <div key={result} className="flex items-start gap-2">
                <div
                  className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${story.accent}30` }}
                >
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-white/80">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="flex flex-col justify-center p-5">
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span className="h-px w-6" style={{ backgroundColor: `${story.accent}40` }} />
              The Problem
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{story.problem}</p>
          </div>
          <div className="mt-5">
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span className="h-px w-6" style={{ backgroundColor: `${story.accent}40` }} />
              What We Built
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{story.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FullStoryCard({ story }: { story: CaseStory }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-md h-full">
      <div className="grid lg:grid-cols-5">
        {/* Left: accent panel */}
        <div
          className="relative flex flex-col justify-between p-5 sm:p-10 lg:col-span-2"
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
            <h3 className="mt-3 text-lg font-bold leading-tight text-white sm:text-2xl">
              {story.title}
            </h3>
          </div>

          {/* Impact */}
          <div
            className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3"
            style={{
              background: `linear-gradient(135deg, ${story.accent}15, ${story.accent}05)`,
              borderColor: `${story.accent}30`,
            }}
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke={story.accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold sm:text-xl" style={{ color: story.accent }}>
                {story.impact.metric}
              </span>
              <span className="text-xs font-medium text-white/60 sm:text-sm">
                {story.impact.label}
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-2.5">
            {story.results.map((result) => (
              <div key={result} className="flex items-start gap-2">
                <div
                  className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${story.accent}30` }}
                >
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-white/80 sm:text-sm">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: problem/solution */}
        <div className="flex flex-col justify-center p-5 sm:p-10 lg:col-span-3">
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span className="h-px w-6" style={{ backgroundColor: `${story.accent}40` }} />
              The Problem
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{story.problem}</p>
          </div>
          <div className="mt-8">
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span className="h-px w-6" style={{ backgroundColor: `${story.accent}40` }} />
              What We Built
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{story.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
