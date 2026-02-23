"use client";

import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const footerLinks = {
  Company: ["Our Work", "Contact"],
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-light">
      {/* Animated wave layers at top edge */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          className="absolute top-0 w-[200%] animate-wave-drift"
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0 30 C200 10 400 50 600 30 C800 10 1000 50 1200 30 C1400 10 1600 50 1800 30 C2000 10 2200 50 2400 30 V60 H0 Z"
            fill="rgba(59,130,246,0.06)"
          />
        </svg>
        <svg
          className="absolute top-1 w-[200%] animate-wave-drift"
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
          style={{ height: "50px", animationDelay: "-8s", animationDuration: "30s" }}
        >
          <path
            d="M0 35 C300 15 500 55 700 35 C900 15 1100 55 1300 35 C1500 15 1700 55 1900 35 C2100 15 2300 55 2400 35 V60 H0 Z"
            fill="rgba(250,204,21,0.04)"
          />
        </svg>
      </div>

      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-lg shadow-yellow-400/20">
                {/* Coral reef SVG logo */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  strokeWidth={1.8}
                >
                  <motion.path
                    d="M12 21c0-4 0-6-1-9s-3-5-3-8c0-1.5 1-2 2-1.5s2 2 2 4"
                    stroke="white"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M12 12c1-2 3-3.5 5-4.5 1-.5 2 0 1.5 1s-2 2.5-3.5 3.5"
                    stroke="white"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                  />
                  <motion.path
                    d="M10 14c-1.5-1-3.5-1.5-5-1-.8.3-.5 1.2.3 1.5s3 .5 4.2-.5"
                    stroke="white"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                  />
                  <circle cx="8" cy="4" r="1" fill="white" />
                  <circle cx="17.5" cy="8" r="1" fill="white" />
                  <circle cx="5.5" cy="13.5" r="0.8" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                TheAcropora
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              CPA-led technology consulting that combines deep industry
              expertise with cutting-edge custom application development. We
              know your business inside out.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:hello@theacropora.com"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <HiOutlineMail size={16} />
                hello@theacropora.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <HiOutlinePhone size={16} />
                (123) 456-7890
              </a>
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={fadeUp}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        title === "Company"
                          ? `#${link.toLowerCase().replace(/\s/g, "-")}`
                          : "#services"
                      }
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TheAcropora. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
