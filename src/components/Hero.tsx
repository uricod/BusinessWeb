"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Deep layered gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(249,115,22,0.1),transparent)]" />

      {/* Animated grid with perspective */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
          }}
        />
      </div>

      {/* Animated floating orbs */}
      <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-ocean-500/20 blur-[120px] animate-float-slow" />
      <div className="absolute top-[40%] right-[10%] h-[400px] w-[400px] rounded-full bg-coral-500/15 blur-[100px] animate-float-slow-reverse" />
      <div className="absolute bottom-[10%] left-[40%] h-[350px] w-[350px] rounded-full bg-ocean-700/20 blur-[80px] animate-float-drift" />
      {/* Small accent orbs */}
      <div className="absolute top-[20%] right-[30%] h-[150px] w-[150px] rounded-full bg-purple-500/10 blur-[60px] animate-pulse-glow" />
      <div className="absolute bottom-[30%] left-[20%] h-[100px] w-[100px] rounded-full bg-coral-400/15 blur-[40px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral-500" />
            </span>
            <span className="text-sm font-medium text-white/80">
              CPA-Led Technology Consulting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We Know Your Business.{" "}
            <span className="bg-gradient-to-r from-ocean-400 via-ocean-300 to-coral-400 bg-clip-text text-transparent animate-gradient-x">
              We Build Your Future.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300/90 sm:text-xl"
          >
            From backend processes to beautiful dashboards &mdash; we build
            custom applications that give you complete visibility into your
            entire operation. Powered by AI agents, intelligent automation, and
            deep industry expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-coral-600 to-coral-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              See Our Work
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-8"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Trusted across
            </span>
            {[
              "Healthcare",
              "Manufacturing",
              "Real Estate",
              "E-Commerce",
            ].map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </section>
  );
}
