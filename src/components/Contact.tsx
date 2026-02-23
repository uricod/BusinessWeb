"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
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
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ocean-50/30 to-white" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-coral-200 bg-coral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-600">
              Get In Touch
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Ready to Transform{" "}
              <span className="bg-gradient-to-r from-ocean-600 to-coral-500 bg-clip-text text-transparent">
                Your Operations?
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Let&apos;s talk about how custom technology can give you full
              visibility into your business. No pressure, no jargon &mdash;
              just a conversation about what&apos;s possible.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: HiOutlineMail,
                  label: "Email",
                  value: "hello@theacropora.com",
                  href: "mailto:hello@theacropora.com",
                },
                {
                  icon: HiOutlinePhone,
                  label: "Phone",
                  value: "(123) 456-7890",
                  href: "tel:+1234567890",
                },
                {
                  icon: HiOutlineLocationMarker,
                  label: "Location",
                  value: "United States",
                  href: undefined,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-100 to-ocean-50 text-ocean-600 transition-transform group-hover:scale-105">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-navy hover:text-ocean-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-navy">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-ocean-50 to-coral-50 p-12 text-center ring-1 ring-slate-100">
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-coral-500 shadow-lg">
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
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
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10"
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
                <div>
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
                </div>
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none"
                  >
                    <option value="">Select your industry</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
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
                    className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 transition-all focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/10 focus:outline-none resize-none"
                    placeholder="What challenges are you facing? What would you like to build?"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-coral-500/25 hover:brightness-110"
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
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
