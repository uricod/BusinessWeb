"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    quote:
      "TheAcropora didn't just build us an app — they understood our revenue cycle better than our own team. The visibility we have now into our billing operations is transformational.",
    name: "Dr. Sarah Mitchell",
    title: "CFO",
    company: "Regional Healthcare Network",
    rating: 5,
  },
  {
    quote:
      "We went from flying blind on our production floor to having real-time dashboards that our managers actually use every single day. The ROI was immediate.",
    name: "James Rodriguez",
    title: "VP of Operations",
    company: "Precision Manufacturing Co.",
    rating: 5,
  },
  {
    quote:
      "What sets TheAcropora apart is their business acumen. They speak our language — financial models, portfolio metrics, investor expectations. The reporting platform they built saved us weeks every quarter.",
    name: "Rachel Kim",
    title: "Managing Partner",
    company: "Atlas Property Group",
    rating: 5,
  },
  {
    quote:
      "The AI agents they built for our order management have virtually eliminated our overselling problem. We finally have a single source of truth across all our sales channels.",
    name: "Marcus Chen",
    title: "Director of E-Commerce",
    company: "MultiChannel Retail Inc.",
    rating: 5,
  },
  {
    quote:
      "As a CPA myself, I appreciate working with a tech firm that truly understands accounting and finance. They built integrations that our previous vendor said were impossible.",
    name: "Linda Foster",
    title: "Controller",
    company: "National Services Group",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % testimonials.length),
    []
  );
  const prev = () =>
    setCurrent(
      (p) => (p - 1 + testimonials.length) % testimonials.length
    );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-ocean-500/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-coral-500/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-400 backdrop-blur-sm">
            Testimonials
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative mt-16 mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <HiStar key={i} className="h-6 w-6 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-8">
                <svg className="mx-auto h-8 w-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mt-4 text-xl leading-relaxed text-slate-300 sm:text-2xl sm:leading-relaxed font-light">
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="mt-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-coral-500 text-xl font-bold text-white shadow-lg shadow-ocean-500/20">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="mt-4 text-base font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-10 bg-gradient-to-r from-ocean-500 to-coral-500"
                      : "w-2.5 bg-white/15 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Next testimonial"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
