"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fieldVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: (i: number) => ({
    height: "auto",
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/xzdakogg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
      form.reset();
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ocean-50/30 to-white" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-700">
            Get In Touch
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Ready to Transform{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
              Your Operations?
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tell us about your project. No pressure, no jargon &mdash;
            just a conversation about what&apos;s possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-ocean-50 to-yellow-50 p-12 text-center ring-1 ring-slate-100"
              >
                <div>
                  <div className="relative mx-auto h-20 w-20">
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-400"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                      }}
                    />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(
                      (angle, i) => (
                        <motion.div
                          key={angle}
                          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-ocean-400"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((angle * Math.PI) / 180) * 60,
                            y: Math.sin((angle * Math.PI) / 180) * 60,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + i * 0.03,
                            ease: "easeOut",
                          }}
                        />
                      )
                    )}
                    <svg
                      className="relative z-10 h-full w-full p-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-navy">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-slate-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10"
              >
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="company"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none"
                    placeholder="Your Company"
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-2 block w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none"
                    placeholder="What challenges are you facing? What would you like to build?"
                  />
                </motion.div>

                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <button
                    type="submit"
                    className="group w-full rounded-xl bg-yellow-400 px-8 py-4 text-base font-semibold text-navy transition-all hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
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
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
