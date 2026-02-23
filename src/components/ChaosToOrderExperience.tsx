"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ChaosCanvas from "./ChaosCanvas";
import LivingDashboard from "./LivingDashboard";

export default function ChaosToOrderExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dashboardActive, setDashboardActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track when dashboard should become active
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDashboardActive(v > 0.5);
  });

  // === Scroll-derived transforms ===

  // Canvas progress: 0-1 maps to chaos → convergence → settled
  const canvasProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  // Canvas fades out as dashboard fades in
  const canvasOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
  // Dashboard fades in
  const dashboardOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  // Background: dark navy → light
  const bgR = useTransform(scrollYProgress, [0, 0.4, 0.6], [15, 30, 248]);
  const bgG = useTransform(scrollYProgress, [0, 0.4, 0.6], [23, 45, 250]);
  const bgB = useTransform(scrollYProgress, [0, 0.4, 0.6], [42, 80, 252]);
  const bgColor = useTransform(
    [bgR, bgG, bgB] as const,
    ([r, g, b]) => `rgb(${r}, ${g}, ${b})`
  );

  // Tagline: fades in through chaos, fades out before dashboard
  const taglineOpacity = useTransform(scrollYProgress, [0.03, 0.12, 0.3, 0.42], [0, 1, 1, 0]);
  const taglineBlur = useTransform(scrollYProgress, [0.03, 0.12], [12, 0]);
  const taglineFilter = useTransform(taglineBlur, (v) => `blur(${v}px)`);
  const taglineY = useTransform(scrollYProgress, [0.03, 0.12], [30, 0]);

  // CTA buttons: appear with tagline
  const ctaOpacity = useTransform(scrollYProgress, [0.1, 0.18, 0.3, 0.42], [0, 1, 1, 0]);

  // Scroll indicator: visible only at start
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Hot gradient orbs fade out
  const hotOrbOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  // Cool gradient orbs fade in
  const coolOrbOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.5]);

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0: Background color */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        />

        {/* Hot gradient orbs (chaos phase) */}
        <motion.div className="absolute inset-0" style={{ opacity: hotOrbOpacity }}>
          <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-[rgba(249,115,22,0.15)] blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] h-[400px] w-[400px] rounded-full bg-[rgba(239,68,68,0.12)] blur-[100px]" />
          <div className="absolute bottom-[20%] left-[40%] h-[350px] w-[350px] rounded-full bg-[rgba(217,70,239,0.1)] blur-[80px]" />
          <div className="absolute top-[60%] right-[30%] h-[200px] w-[200px] rounded-full bg-[rgba(251,191,36,0.12)] blur-[60px]" />
        </motion.div>

        {/* Cool gradient orbs (dashboard phase) */}
        <motion.div className="absolute inset-0" style={{ opacity: coolOrbOpacity }}>
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-ocean-500/8 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] h-[300px] w-[300px] rounded-full bg-[rgba(14,165,233,0.06)] blur-[100px]" />
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

          <h1 className="max-w-4xl text-center text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            We Know Your Business.{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-gradient-x">
              We Build Your Future.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/70 sm:text-xl">
            From scattered systems to unified dashboards.
          </p>

          {/* Scroll hint */}
          <motion.p
            className="mt-8 text-sm text-white/40"
            style={{ opacity: ctaOpacity }}
          >
            Scroll to see the transformation
          </motion.p>
        </motion.div>

        {/* Layer 3: Living Dashboard */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: dashboardOpacity }}
        >
          <LivingDashboard active={dashboardActive} />
        </motion.div>

        {/* Layer 4: Scroll indicator */}
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
    </div>
  );
}
