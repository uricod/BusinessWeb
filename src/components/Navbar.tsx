"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.08)] border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocean-500 to-coral-500 shadow-lg shadow-ocean-500/20 transition-shadow group-hover:shadow-ocean-500/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-white"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 3C8 3 4 7 4 12c0 3 1.5 5.5 4 7 1-2 2-5 4-5s3 3 4 5c2.5-1.5 4-4 4-7 0-5-4-9-8-9z" />
                <path d="M12 3c0 4-2 6-2 9s1 5 2 7c1-2 2-4 2-7s-2-5-2-9z" />
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-100 hover:text-navy"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral-500/20 transition-all hover:shadow-coral-500/40 hover:brightness-110"
            >
              Get Started
            </a>
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-ocean-50 hover:text-ocean-600"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
