"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Deep industry knowledge",
  },
  {
    value: 50,
    suffix: "+",
    label: "Solutions Delivered",
    description: "Custom applications built",
  },
  {
    value: 4,
    suffix: "",
    label: "Industries Served",
    description: "Specialized expertise",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    description: "Long-term partnerships",
  },
];

export default function Stats() {
  return (
    <section className="relative -mt-20 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gradient-to-br from-ocean-500/20 to-coral-500/20 shadow-2xl shadow-slate-200/60 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white p-6 text-center sm:p-10"
          >
            <div className="bg-gradient-to-br from-ocean-600 to-coral-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800 sm:text-base">
              {stat.label}
            </div>
            <div className="mt-1 text-xs text-slate-500 sm:text-sm">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
