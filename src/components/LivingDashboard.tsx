"use client";

import { motion } from "framer-motion";
import AgentFeed from "./AgentFeed";
import DataFlowLines from "./DataFlowLines";

const systemPanels = [
  {
    label: "Yardi ERP",
    color: "#3b82f6",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    data: [
      { label: "Cap Rate Avg", value: "6.8%" },
      { label: "Occupancy", value: "94.2%" },
    ],
    sparkline: [35, 42, 38, 55, 48, 65, 58, 72, 68, 75, 80, 78],
    chartType: "area" as const,
    trend: "+2.4%",
    trendUp: true,
  },
  {
    label: "Salesforce CRM",
    color: "#8b5cf6",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    data: [
      { label: "Active Leads", value: "156" },
      { label: "Conversion", value: "12.4%" },
    ],
    sparkline: [20, 35, 28, 45, 52, 40, 58, 62, 55, 70, 65, 72],
    chartType: "bar" as const,
    trend: "+8.1%",
    trendUp: true,
  },
  {
    label: "Sage Intacct",
    color: "#10b981",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    data: [
      { label: "Auto-Reconciled", value: "98.7%" },
      { label: "Pending Posts", value: "23" },
    ],
    sparkline: [60, 65, 70, 68, 75, 82, 78, 85, 88, 92, 95, 98],
    chartType: "area" as const,
    trend: "+3.2%",
    trendUp: true,
  },
  {
    label: "PointClickCare",
    color: "#ef4444",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    data: [
      { label: "Patient Census", value: "1,247" },
      { label: "Dialysis Today", value: "84" },
    ],
    sparkline: [40, 38, 42, 45, 43, 48, 50, 47, 52, 55, 53, 56],
    chartType: "bar" as const,
    trend: "+4.7%",
    trendUp: true,
  },
  {
    label: "Analytics Engine",
    color: "#0ea5e9",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    data: [
      { label: "Reports Today", value: "32" },
      { label: "Anomalies", value: "3 flagged" },
    ],
    sparkline: [55, 62, 48, 70, 65, 80, 75, 85, 78, 90, 88, 92],
    chartType: "area" as const,
    trend: "+12.3%",
    trendUp: true,
  },
  {
    label: "Payroll System",
    color: "#f59e0b",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    data: [
      { label: "Hours Logged", value: "8,421" },
      { label: "Payroll Due", value: "$342K" },
    ],
    sparkline: [70, 65, 72, 68, 75, 80, 74, 82, 78, 85, 80, 84],
    chartType: "bar" as const,
    trend: "-1.2%",
    trendUp: false,
  },
];

const processSignals = [
  {
    label: "Intake",
    value: "184 files",
    color: "#3b82f6",
  },
  {
    label: "Review",
    value: "3 flagged",
    color: "#10b981",
  },
  {
    label: "Routing",
    value: "12 queues",
    color: "#8b5cf6",
  },
  {
    label: "Posting",
    value: "$2.4M staged",
    color: "#f59e0b",
  },
];

function MiniSparkline({
  data,
  color,
  type,
  active,
  delay,
}: {
  data: number[];
  color: string;
  type: "area" | "bar";
  active: boolean;
  delay: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 100;

  if (type === "bar") {
    const barW = w / data.length - 1;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-1.5 w-full" style={{ height: "32px" }}>
        {data.map((v, i) => {
          const barH = ((v - min) / range) * (h - 4) + 4;
          return (
            <motion.rect
              key={i}
              x={i * (barW + 1)}
              width={barW}
              rx={1}
              fill={`${color}${i === data.length - 1 ? "60" : "30"}`}
              initial={{ y: h, height: 0 }}
              animate={active ? { y: h - barH, height: barH } : {}}
              transition={{ delay: delay + i * 0.03, duration: 0.4 }}
            />
          );
        })}
      </svg>
    );
  }

  // Area chart
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 6) - 3,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-1.5 w-full" style={{ height: "32px" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#grad-${color.replace("#", "")})`}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
      />
      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2.5}
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 0.8, duration: 0.3 }}
      />
    </svg>
  );
}

interface LivingDashboardProps {
  active: boolean;
  showAI?: boolean;
}

export default function LivingDashboard({ active, showAI = true }: LivingDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Dashboard chrome frame */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-slate-300/40 backdrop-blur-sm"
        initial={{ y: 20 }}
        animate={active ? { y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 shadow-inner shadow-slate-100">
            <div className="flex items-center gap-2">
              <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] text-slate-400">dashboard.theacropora.com</span>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-600">Live</span>
          </div>
        </div>

        {/* Dashboard header strip */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/40 px-2 py-1.5 sm:px-4 sm:py-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-ocean-500"
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </motion.div>
            <span className="text-[9px] sm:text-[11px] font-semibold text-slate-700">Operations Command Center</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-ocean-50 px-2 py-0.5 text-[9px] font-semibold text-ocean-600 sm:inline">6 Systems Connected</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">All Healthy</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex flex-col lg:flex-row">
          {/* Main content: system panels */}
          <div className="relative flex-1 p-2 sm:p-3">
            {/* Data flow SVG overlay */}
            <DataFlowLines active={active} />

            <div className="grid grid-cols-2 gap-1.5 sm:gap-3 lg:grid-cols-3">
              {systemPanels.map((panel, i) => (
                <motion.div
                  key={panel.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-slate-100 bg-white p-2 sm:p-3 transition-shadow hover:shadow-md"
                  style={{
                    animation: active ? `breathe 4s ease-in-out ${i * 0.7}s infinite` : undefined,
                  }}
                >
                  {/* Subtle top accent line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-0.5 opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${panel.color}, transparent)` }}
                  />

                  {/* Panel header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${panel.color}12` }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke={panel.color}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={panel.icon} />
                        </svg>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600 sm:text-xs">
                        {panel.label}
                      </span>
                    </div>
                    {/* Trend badge */}
                    <motion.span
                      className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                        panel.trendUp
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={active ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      {panel.trend}
                    </motion.span>
                  </div>

                  {/* Mini data */}
                  <div className="mt-2 space-y-1">
                    {panel.data.map((d) => (
                      <div key={d.label} className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-400">{d.label}</span>
                        <span className="text-[10px] font-bold" style={{ color: panel.color }}>
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sparkline chart */}
                  <MiniSparkline
                    data={panel.sparkline}
                    color={panel.color}
                    type={panel.chartType}
                    active={active}
                    delay={0.3 + i * 0.1}
                  />
                </motion.div>
              ))}
            </div>

            {showAI && (
              <motion.div
                className="relative mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 p-2 sm:mt-3 sm:p-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.05),transparent_35%,transparent_65%,rgba(16,185,129,0.05))]" />
                <div className="relative flex flex-col gap-2 sm:gap-2.5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        AI Process Layer
                      </div>
                      <div className="mt-0.5 text-[11px] font-medium text-slate-600 sm:text-xs">
                        Live orchestration across intake, review, routing, and posting.
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 shadow-sm">
                      Avg cycle time down 63%
                    </span>
                  </div>

                  <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-4">
                    {processSignals.map((signal, i) => (
                      <motion.div
                        key={signal.label}
                        className="flex items-center justify-between rounded-lg border border-white/90 bg-white/95 px-3 py-2 shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={active ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.62 + i * 0.06, duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                              style={{ backgroundColor: signal.color }}
                            />
                            <span
                              className="relative inline-flex h-2 w-2 rounded-full"
                              style={{ backgroundColor: signal.color }}
                            />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            {signal.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-800 sm:text-xs">
                          {signal.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar: AI Agent Feed — hidden on small mobile, visible from sm up */}
          {showAI && (
            <div className="hidden sm:block w-full border-t border-slate-100 bg-slate-50/50 p-2.5 lg:w-64 lg:border-l lg:border-t-0">
              {active && <AgentFeed />}
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
