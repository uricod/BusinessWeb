"use client";

import { useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineCode,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLightningBolt,
  HiOutlineEye,
  HiOutlineDesktopComputer,
} from "react-icons/hi";

const services = [
  {
    icon: HiOutlineCode,
    title: "Custom Application Development",
    description:
      "Tailored software solutions built from the ground up to solve your specific business challenges.",
    color: "#3b82f6",
    connections: [2, 4],
  },
  {
    icon: HiOutlineChartBar,
    title: "Business Intelligence & Analytics",
    description:
      "Custom BI dashboards and reporting tools that transform your raw data into actionable insights.",
    color: "#8b5cf6",
    connections: [0, 5],
  },
  {
    icon: HiOutlineCog,
    title: "Systems Integration",
    description:
      "Connect disparate systems into a unified ecosystem — ERPs, CRMs, financial systems, and operational tools.",
    color: "#2563eb",
    connections: [0, 3],
  },
  {
    icon: HiOutlineLightningBolt,
    title: "AI Agents & Automation",
    description:
      "Intelligent automation agents that handle routine processes, flag exceptions, and take action.",
    color: "#f97316",
    connections: [2, 5],
  },
  {
    icon: HiOutlineEye,
    title: "Backend Process Visibility",
    description:
      "Turn invisible backend operations into transparent, monitorable dashboards.",
    color: "#10b981",
    connections: [0, 5],
  },
  {
    icon: HiOutlineDesktopComputer,
    title: "Front-End BI Dashboards",
    description:
      "Beautiful, intuitive dashboards your team will actually use. Custom-built for your metrics.",
    color: "#f59e0b",
    connections: [1, 3],
  },
];

// Constellation positions for desktop (percentage-based)
const nodePositions = [
  { x: 15, y: 20 },  // Custom App Dev - top left
  { x: 85, y: 15 },  // BI & Analytics - top right
  { x: 8, y: 55 },   // Systems Integration - mid left
  { x: 92, y: 55 },  // AI Agents - mid right
  { x: 25, y: 88 },  // Backend Visibility - bottom left
  { x: 75, y: 90 },  // Front-End BI - bottom right
];

export default function Services() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const isConnected = useCallback(
    (nodeIndex: number) => {
      if (hoveredNode === null) return true;
      if (nodeIndex === hoveredNode) return true;
      return services[hoveredNode].connections.includes(nodeIndex);
    },
    [hoveredNode]
  );

  const isLineHighlighted = useCallback(
    (fromIdx: number, toIdx: number) => {
      if (hoveredNode === null) return false;
      return (
        (fromIdx === hoveredNode &&
          services[hoveredNode].connections.includes(toIdx)) ||
        (toIdx === hoveredNode &&
          services[hoveredNode].connections.includes(fromIdx))
      );
    },
    [hoveredNode]
  );

  // Build connection lines from node positions
  const connectionLines: { from: number; to: number }[] = [];
  services.forEach((s, i) => {
    s.connections.forEach((j) => {
      if (j > i) connectionLines.push({ from: i, to: j });
    });
  });

  return (
    <section id="services" ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-700">
            The Ecosystem
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Solutions Built for How{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
              Business Actually Works
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our services form an interconnected ecosystem — each one strengthening the others
            to give you complete operational visibility.
          </p>
        </motion.div>

        {/* Desktop: Constellation network graph */}
        <div className="relative mt-16 hidden lg:block" style={{ height: "600px" }}>
          {/* SVG Connection lines */}
          <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
            {connectionLines.map(({ from, to }, i) => (
              <motion.line
                key={`${from}-${to}`}
                x1={`${nodePositions[from].x}%`}
                y1={`${nodePositions[from].y}%`}
                x2={`${nodePositions[to].x}%`}
                y2={`${nodePositions[to].y}%`}
                stroke={
                  isLineHighlighted(from, to)
                    ? services[from].color
                    : "rgba(148,163,184,0.15)"
                }
                strokeWidth={isLineHighlighted(from, to) ? 2 : 1}
                strokeDasharray={isLineHighlighted(from, to) ? "none" : "6 6"}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="absolute"
              style={{
                left: `${nodePositions[i].x}%`,
                top: `${nodePositions[i].y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: 0.2 + i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <div
                className={`group relative cursor-pointer transition-all duration-300 ${
                  hoveredNode !== null && !isConnected(i) ? "opacity-25" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow ring on hover */}
                <div
                  className="absolute -inset-3 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
                  style={{ backgroundColor: service.color }}
                />
                <div className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ width: "220px" }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}
                  >
                    <service.icon size={22} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical stack with connection lines */}
        <div className="mt-16 space-y-4 lg:hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
            >
              {/* Connection line between cards */}
              {i > 0 && (
                <div className="mx-auto mb-4 h-8 w-px bg-gradient-to-b from-slate-200 to-slate-100" />
              )}
              <div className="gradient-border group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}
                  >
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
