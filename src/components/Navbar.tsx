"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Our Work", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient bottom border when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean-500/30 to-transparent animate-gradient-x"
          style={{ backgroundSize: "200% 100%" }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-lg shadow-yellow-400/20 transition-shadow group-hover:shadow-yellow-400/40">
              {/* Coral reef SVG logo */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                strokeWidth={1.8}
              >
                {/* Main coral trunk */}
                <motion.path
                  d="M12 21c0-4 0-6-1-9s-3-5-3-8c0-1.5 1-2 2-1.5s2 2 2 4"
                  stroke="white"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                {/* Right branch */}
                <motion.path
                  d="M12 12c1-2 3-3.5 5-4.5 1-.5 2 0 1.5 1s-2 2.5-3.5 3.5"
                  stroke="white"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                />
                {/* Left branch */}
                <motion.path
                  d="M10 14c-1.5-1-3.5-1.5-5-1-.8.3-.5 1.2.3 1.5s3 .5 4.2-.5"
                  stroke="white"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Small polyp dots */}
                <motion.circle cx="8" cy="4" r="1" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
                <motion.circle cx="17.5" cy="8" r="1" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
                <motion.circle cx="5.5" cy="13.5" r="0.8" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
              </svg>
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              TheAcropora
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-100 hover:text-navy"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
              className="ml-4 rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-navy shadow-lg shadow-yellow-400/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-400/40"
            >
              Get Started
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-lg p-2 transition-colors md:hidden ${
              scrolled
                ? "text-navy hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl shadow-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-ocean-50 hover:text-ocean-600"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, type: "spring", stiffness: 300 }}
                className="mt-2 block rounded-full bg-yellow-400 px-6 py-3 text-center text-sm font-semibold text-navy"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
