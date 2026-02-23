"use client";

import { motion } from "framer-motion";
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
      "Tailored software solutions built from the ground up to solve your specific business challenges. We architect scalable applications that grow with your company.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: HiOutlineChartBar,
    title: "Business Intelligence & Analytics",
    description:
      "Custom BI dashboards and reporting tools that transform your raw data into actionable insights. Front-end analytics designed for decision-makers.",
    gradient: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: HiOutlineCog,
    title: "Systems Integration",
    description:
      "Connect disparate systems into a unified ecosystem. We bridge ERPs, CRMs, financial systems, and operational tools into one seamless workflow.",
    gradient: "from-ocean-500 to-blue-600",
    glow: "group-hover:shadow-ocean-500/20",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "AI Agents & Automation",
    description:
      "Intelligent automation agents that handle routine processes, flag exceptions, and take action. AI that understands your business context.",
    gradient: "from-coral-500 to-rose-500",
    glow: "group-hover:shadow-coral-500/20",
  },
  {
    icon: HiOutlineEye,
    title: "Backend Process Visibility",
    description:
      "Turn invisible backend operations into transparent, monitorable dashboards. See every process, every status, every bottleneck in real-time.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: HiOutlineDesktopComputer,
    title: "Front-End BI Dashboards",
    description:
      "Beautiful, intuitive dashboards your team will actually use. Custom-built visualizations that surface the metrics that matter most to your business.",
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-coral-200 bg-coral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-600">
            What We Do
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Solutions Built for How{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
              Business Actually Works
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We don&apos;t just build software &mdash; we build the tools your
            team needs to see, understand, and act on what&apos;s happening
            across your entire operation.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`gradient-border group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${service.glow}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <service.icon size={24} />
              </div>
              <h3 className="mt-6 text-lg font-bold text-navy">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-semibold text-ocean-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
