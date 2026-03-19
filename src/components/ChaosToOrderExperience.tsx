"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChaosCanvas from "./ChaosCanvas";

export default function ChaosToOrderExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === Scroll-derived transforms ===

  // Canvas progress: 0-1 maps to chaos → convergence → settled
  const canvasProgress = useTransform(scrollYProgress, [0, 0.72], [0, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0.62, 0.82], [1, 0.18]);
  // Background: dark navy → light
  const bgR = useTransform(scrollYProgress, [0, 0.45, 0.82], [15, 30, 244]);
  const bgG = useTransform(scrollYProgress, [0, 0.45, 0.82], [23, 45, 248]);
  const bgB = useTransform(scrollYProgress, [0, 0.45, 0.82], [42, 80, 252]);
  const bgColor = useTransform(
    [bgR, bgG, bgB] as const,
    ([r, g, b]) => `rgb(${r}, ${g}, ${b})`
  );

  // Tagline: fades in through chaos, holds longer, then exits before next section
  const taglineOpacity = useTransform(scrollYProgress, [0.03, 0.12, 0.48, 0.68], [0, 1, 1, 0]);
  const taglineBlur = useTransform(scrollYProgress, [0.03, 0.12], [12, 0]);
  const taglineFilter = useTransform(taglineBlur, (v) => `blur(${v}px)`);
  const taglineY = useTransform(scrollYProgress, [0.03, 0.12], [30, 0]);

  // Scroll indicator: visible only at start
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroArrowOpacity = useTransform(scrollYProgress, [0.18, 0.26, 0.55, 0.72], [0, 1, 1, 0]);

  // Hot gradient orbs fade out
  const hotOrbOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  // Cool gradient orbs fade in
  const coolOrbOpacity = useTransform(scrollYProgress, [0.35, 0.78], [0, 0.45]);

  return (
    <section id="top" ref={containerRef} className="h-[220vh] sm:h-[260vh]">
      <div className="sticky top-0 h-svh overflow-hidden sm:h-screen">
        {/* Layer 0: Background color */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        />

        {/* Hot gradient orbs (chaos phase) */}
        <motion.div className="absolute inset-0" style={{ opacity: hotOrbOpacity }}>
          <div className="absolute top-[10%] left-[15%] h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[rgba(249,115,22,0.15)] blur-[80px] sm:blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-[rgba(239,68,68,0.12)] blur-[60px] sm:blur-[100px]" />
          <div className="absolute bottom-[20%] left-[40%] h-[180px] w-[180px] sm:h-[350px] sm:w-[350px] rounded-full bg-[rgba(217,70,239,0.1)] blur-[60px] sm:blur-[80px]" />
          <div className="absolute top-[60%] right-[30%] h-[120px] w-[120px] sm:h-[200px] sm:w-[200px] rounded-full bg-[rgba(251,191,36,0.12)] blur-[40px] sm:blur-[60px]" />
        </motion.div>

        {/* Cool gradient orbs (dashboard phase) */}
        <motion.div className="absolute inset-0" style={{ opacity: coolOrbOpacity }}>
          <div className="absolute top-[20%] left-[20%] h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-ocean-500/8 blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] rounded-full bg-[rgba(14,165,233,0.06)] blur-[60px] sm:blur-[100px]" />
        </motion.div>

        {/* Layer 1: ChaosCanvas */}
        <motion.div className="absolute inset-0" style={{ opacity: canvasOpacity }}>
          <ChaosCanvas scrollProgress={canvasProgress} />
        </motion.div>

        {/* Layer 2: Tagline overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{
            opacity: taglineOpacity,
            y: taglineY,
            filter: taglineFilter,
          }}
        >
          <motion.div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
            </span>
            <span className="text-sm font-medium text-white/90">
              CPA-Led Technology Consulting
            </span>
          </motion.div>

          <h1 className="max-w-4xl text-center text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            We Know Your Business.{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-gradient-x">
              We Build Your Future.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-center text-base leading-relaxed text-white/70 sm:mt-6 sm:text-xl">
            From scattered systems to unified dashboards.
          </p>

          <motion.p
            className="mt-8 text-sm text-white/40"
            style={{ opacity: heroArrowOpacity }}
          >
            Scroll to see proven operator impact
          </motion.p>
        </motion.div>

        <motion.a
          href="#proven-impact"
          aria-label="Scroll to Proven Operator Impact"
          className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition-colors hover:text-white/80"
          style={{ opacity: heroArrowOpacity }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            Proven impact
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

        {/* Layer 3: Initial scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs font-medium tracking-widest text-white/40 uppercase">
            Scroll
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
