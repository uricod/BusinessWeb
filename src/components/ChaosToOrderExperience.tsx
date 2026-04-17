"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChaosCanvas from "./ChaosCanvas";

export default function ChaosToOrderExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Canvas animation plays through the first 60% of section scroll
  const canvasProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0.35]);

  // Overall overlay fades out near the end so Proven Operator Impact reveals
  // cleanly instead of sitting behind a faded chaos-end-state.
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 0.95], [1, 0]);

  // Background color: dark navy → near-white
  const bgR = useTransform(scrollYProgress, [0, 0.35, 0.75], [15, 30, 240]);
  const bgG = useTransform(scrollYProgress, [0, 0.35, 0.75], [23, 45, 247]);
  const bgB = useTransform(scrollYProgress, [0, 0.35, 0.75], [42, 80, 252]);
  const bgColor = useTransform(
    [bgR, bgG, bgB] as const,
    ([r, g, b]) => `rgb(${r}, ${g}, ${b})`
  );

  // Tagline
  const taglineOpacity = useTransform(scrollYProgress, [0.03, 0.1, 0.5, 0.7], [0, 1, 1, 0]);
  const taglineBlur = useTransform(scrollYProgress, [0.03, 0.1], [12, 0]);
  const taglineFilter = useTransform(taglineBlur, (v) => `blur(${v}px)`);
  const taglineY = useTransform(scrollYProgress, [0.03, 0.1], [30, 0]);

  // Arrows
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const heroArrowOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.55, 0.72], [0, 1, 1, 0]);

  // Orbs
  const hotOrbOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const coolOrbOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0, 0.45]);

  // Disable pointer events on fixed arrows when invisible so they never block
  // clicks on Proven Operator Impact below.
  const heroArrowPE = useTransform(heroArrowOpacity, (v) => (v > 0.05 ? "auto" : "none"));
  const scrollIndicatorPE = useTransform(scrollIndicatorOpacity, (v) => (v > 0.05 ? "auto" : "none"));

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-svh sm:h-screen"
    >
      {/* Fixed chaos overlay — pinned to viewport, fades out as section ends */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: overlayOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        />

        <motion.div className="absolute inset-0" style={{ opacity: hotOrbOpacity }}>
          <div className="absolute top-[10%] left-[15%] h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[rgba(249,115,22,0.15)] blur-[80px] sm:blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-[rgba(239,68,68,0.12)] blur-[60px] sm:blur-[100px]" />
          <div className="absolute bottom-[20%] left-[40%] h-[180px] w-[180px] sm:h-[350px] sm:w-[350px] rounded-full bg-[rgba(217,70,239,0.1)] blur-[60px] sm:blur-[80px]" />
          <div className="absolute top-[60%] right-[30%] h-[120px] w-[120px] sm:h-[200px] sm:w-[200px] rounded-full bg-[rgba(251,191,36,0.12)] blur-[40px] sm:blur-[60px]" />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: coolOrbOpacity }}>
          <div className="absolute top-[20%] left-[20%] h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-ocean-500/8 blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] rounded-full bg-[rgba(14,165,233,0.06)] blur-[60px] sm:blur-[100px]" />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: canvasOpacity }}>
          <ChaosCanvas scrollProgress={canvasProgress} />
        </motion.div>

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

          <motion.p
            className="mt-8 text-sm text-white/40"
            style={{ opacity: heroArrowOpacity }}
          >
            Scroll for results
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Fixed "See results" arrow */}
      <motion.a
        href="#proven-impact"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("proven-impact");
          if (!target) return;
          const prevBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          target.scrollIntoView({ block: "start" });
          document.documentElement.style.scrollBehavior = prevBehavior;
          history.replaceState(null, "", "#proven-impact");
        }}
        aria-label="Scroll to Proven Operator Impact"
        className="fixed bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition-colors hover:text-white/80"
        style={{ opacity: heroArrowOpacity, pointerEvents: heroArrowPE }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
          See results
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

      {/* Initial scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: scrollIndicatorOpacity, pointerEvents: scrollIndicatorPE }}
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
    </section>
  );
}
