"use client";

import { motion } from "framer-motion";
import type { Tier } from "./TierSelector";
import LivingDashboard from "./LivingDashboard";

function PrecisionDashboard() {
  const modules = [
    {
      name: "Transaction Manager",
      color: "#3b82f6",
      rows: [
        { id: "TXN-4821", entity: "Portfolio A", amount: "$12,450.00", status: "Posted" },
        { id: "TXN-4822", entity: "Portfolio B", amount: "$8,200.00", status: "Pending" },
        { id: "TXN-4823", entity: "Portfolio C", amount: "$34,100.00", status: "Posted" },
        { id: "TXN-4824", entity: "Portfolio A", amount: "$5,675.00", status: "Reconciled" },
      ],
    },
    {
      name: "Invoice Generator",
      color: "#f59e0b",
      rows: [
        { id: "INV-1091", entity: "Client Alpha", amount: "$42,300.00", status: "Sent" },
        { id: "INV-1092", entity: "Client Beta", amount: "$18,750.00", status: "Draft" },
        { id: "INV-1093", entity: "Client Gamma", amount: "$67,200.00", status: "Paid" },
      ],
    },
    {
      name: "Reconciliation Engine",
      color: "#10b981",
      stats: [
        { label: "Auto-Matched", value: "94.2%" },
        { label: "Pending Review", value: "23" },
        { label: "Exceptions", value: "4" },
        { label: "Processing", value: "$2.4M" },
      ],
    },
  ];

  const statusColor: Record<string, string> = {
    Posted: "bg-emerald-50 text-emerald-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Reconciled: "bg-blue-50 text-blue-600",
    Sent: "bg-emerald-50 text-emerald-600",
    Draft: "bg-slate-100 text-slate-500",
    Paid: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-slate-300/40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
            <span className="text-[11px] text-slate-400">app.yourbusiness.com/dashboard</span>
          </div>
        </div>

        <div className="p-3 sm:p-5 space-y-4">
          {/* Transaction Manager & Invoice Generator */}
          <div className="grid gap-4 lg:grid-cols-2">
            {modules.slice(0, 2).map((mod) => (
              <motion.div
                key={mod.name}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 border-b border-slate-50 px-4 py-2.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: mod.color }} />
                  <span className="text-xs font-semibold text-slate-700">{mod.name}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-50 text-left text-slate-400">
                        <th className="px-4 py-2 font-medium">ID</th>
                        <th className="px-4 py-2 font-medium">Entity</th>
                        <th className="px-4 py-2 font-medium text-right">Amount</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mod.rows!.map((row, j) => (
                        <motion.tr
                          key={row.id}
                          className="border-b border-slate-50/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + j * 0.05 }}
                        >
                          <td className="px-4 py-2 font-mono text-slate-500">{row.id}</td>
                          <td className="px-4 py-2 text-slate-600">{row.entity}</td>
                          <td className="px-4 py-2 text-right font-semibold text-slate-700">{row.amount}</td>
                          <td className="px-4 py-2">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[row.status]}`}>
                              {row.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reconciliation Engine */}
          <motion.div
            className="rounded-xl border border-slate-100 bg-white p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: modules[2].color }} />
              <span className="text-xs font-semibold text-slate-700">{modules[2].name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {modules[2].stats!.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-lg border border-slate-50 bg-slate-50/50 p-3 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                >
                  <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                  <div className="mt-0.5 text-[10px] text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function VisibilityDashboard() {
  // Reuses LivingDashboard but without AI Process Layer and Agent Feed
  return <LivingDashboard active showAI={false} />;
}

function SmartAutomationDashboard() {
  const alerts = [
    {
      severity: "high",
      title: "GPS Mismatch Detected",
      description: "Caregiver #247 — clock-in location 3.2mi from patient address",
      time: "2 min ago",
      color: "#ef4444",
    },
    {
      severity: "medium",
      title: "Unusual Shift Pattern",
      description: "3 consecutive 12hr shifts flagged for Caregiver #189",
      time: "8 min ago",
      color: "#f59e0b",
    },
    {
      severity: "low",
      title: "Schedule Overlap",
      description: "Potential double-booking detected for Patient #412",
      time: "15 min ago",
      color: "#3b82f6",
    },
    {
      severity: "high",
      title: "Device Signature Anomaly",
      description: "Multiple caregivers clocking in from same device",
      time: "22 min ago",
      color: "#ef4444",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-slate-300/40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
            <span className="text-[11px] text-slate-400">monitor.yourbusiness.com/anomalies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
            <span className="text-[10px] font-medium text-purple-600">AI Monitoring</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left: Monitoring dashboard */}
          <div className="flex-1 p-3 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-700">AI Anomaly Detection</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time pattern analysis across all shifts</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">142 Active Shifts</span>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-500">4 Flags</span>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Scanned Today", value: "1,247", color: "#a78bfa" },
                { label: "Auto-Cleared", value: "98.4%", color: "#10b981" },
                { label: "Avg Response", value: "< 30s", color: "#3b82f6" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Activity visualization placeholder */}
            <motion.div
              className="rounded-xl border border-slate-100 bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Shift Activity Heatmap</span>
                <span className="text-[10px] text-slate-400">Last 24 hours</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 24 }, (_, i) => {
                  const intensity = [0.2, 0.3, 0.15, 0.1, 0.1, 0.2, 0.5, 0.8, 0.95, 1, 0.9, 0.85, 0.7, 0.75, 0.8, 0.9, 0.95, 0.7, 0.5, 0.3, 0.25, 0.2, 0.15, 0.2][i];
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: "24px",
                        backgroundColor: `rgba(139, 92, 246, ${intensity * 0.6})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-slate-300">12am</span>
                <span className="text-[9px] text-slate-300">6am</span>
                <span className="text-[9px] text-slate-300">12pm</span>
                <span className="text-[9px] text-slate-300">6pm</span>
                <span className="text-[9px] text-slate-300">Now</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Alert panel with human approval */}
          <div className="w-full border-t border-slate-100 bg-slate-50/80 p-3 sm:p-4 lg:w-80 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-600">Requires Your Review</h3>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">4 pending</span>
            </div>
            <div className="space-y-2.5">
              {alerts.map((alert, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg border border-slate-100 bg-white p-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: alert.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-slate-700">{alert.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{alert.description}</div>
                      <div className="text-[9px] text-slate-300 mt-1">{alert.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <button className="flex-1 rounded-md bg-emerald-50 py-1.5 text-[10px] font-semibold text-emerald-600 hover:bg-emerald-100 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 rounded-md bg-slate-50 py-1.5 text-[10px] font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
                      Dismiss
                    </button>
                    <button className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 hover:bg-slate-100 transition-colors">
                      Flag
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AIOpsDashboard() {
  const messages = [
    { from: "agent", text: "Good morning. I've processed overnight emails — 3 items need your attention, 47 were auto-filed.", time: "7:02 AM" },
    { from: "user", text: "What are the 3 items?", time: "7:15 AM" },
    { from: "agent", text: "1. Board meeting agenda from Sarah — needs your input by EOD\n2. Legal flagged a contract clause in the Meridian deal\n3. Q4 earnings draft is ready for your review", time: "7:15 AM" },
    { from: "user", text: "Draft a response to Sarah, I'll review the contract at 2pm", time: "7:18 AM" },
    { from: "agent", text: "Done. Response drafted and queued for your approval. I've blocked 2-3pm on your calendar for the Meridian contract review and pulled the relevant clauses.", time: "7:18 AM" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Phone mockup - WhatsApp style */}
        <motion.div
          className="mx-auto w-full max-w-[320px] lg:mx-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-slate-900 shadow-2xl">
            {/* Phone status bar */}
            <div className="flex items-center justify-between bg-slate-800 px-5 py-2">
              <span className="text-[10px] text-white/60">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-4 rounded-sm border border-white/40" />
              </div>
            </div>

            {/* Chat header */}
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">OpenClaw Agent</div>
                <div className="text-[10px] text-green-200">online</div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="bg-[#ece5dd] px-3 py-4 space-y-2" style={{ minHeight: "360px" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 ${
                      msg.from === "user"
                        ? "bg-[#dcf8c6] rounded-tr-none"
                        : "bg-white rounded-tl-none"
                    }`}
                  >
                    <p className="text-[11px] text-slate-800 whitespace-pre-line">{msg.text}</p>
                    <p className="text-[9px] text-slate-400 text-right mt-1">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Desktop agent workspace */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-slate-300/40">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 shadow-inner shadow-slate-100">
                <span className="text-[11px] text-slate-400">agent.openclaw.ai/workspace</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400" />
                <span className="text-[10px] font-medium text-pink-600">5 Agents Active</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Agent tasks */}
              {[
                { agent: "Email Triage", status: "Running", action: "Processing 47 new emails", color: "#3b82f6", progress: 72 },
                { agent: "News Monitor", status: "Complete", action: "Daily digest ready for review", color: "#10b981", progress: 100 },
                { agent: "Sentiment Tracker", status: "Running", action: "Scanning 3 brand mentions", color: "#8b5cf6", progress: 45 },
                { agent: "Report Builder", status: "Queued", action: "Q4 earnings summary scheduled", color: "#f59e0b", progress: 0 },
                { agent: "Calendar Manager", status: "Running", action: "Optimizing tomorrow's schedule", color: "#ef4444", progress: 88 },
              ].map((task, i) => (
                <motion.div
                  key={task.agent}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${task.color}15` }}
                  >
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: task.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-700">{task.agent}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        task.status === "Running" ? "bg-blue-50 text-blue-600" :
                        task.status === "Complete" ? "bg-emerald-50 text-emerald-600" :
                        "bg-slate-50 text-slate-400"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{task.action}</div>
                    {task.progress > 0 && (
                      <div className="mt-1.5 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: task.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface TierDashboardProps {
  tier: Tier;
}

export default function TierDashboard({ tier }: TierDashboardProps) {
  const dashboardComponents: Record<string, React.ReactNode> = {
    precision: <PrecisionDashboard />,
    visibility: <VisibilityDashboard />,
    automation: <SmartAutomationDashboard />,
    aiops: <AIOpsDashboard />,
  };

  const sectionTitles: Record<string, { badge: string; heading: string; subheading: string }> = {
    precision: {
      badge: "Precision Engineering",
      heading: "Software built exactly how your business works.",
      subheading: "No bloat. No unnecessary features. Just the tools your team needs, built around your actual workflows.",
    },
    visibility: {
      badge: "Total Visibility",
      heading: "Every metric, every system, one view.",
      subheading: "Connect your existing systems into a unified command center. See what's happening across your entire operation.",
    },
    automation: {
      badge: "Smart Automation",
      heading: "AI finds the patterns. You make the call.",
      subheading: "Intelligent monitoring and anomaly detection with human oversight. AI assists — you stay in control.",
    },
    aiops: {
      badge: "AI Operations",
      heading: "Your business, on autopilot.",
      subheading: "Autonomous agents that handle email triage, reporting, monitoring, and more — with full audit trails and security.",
    },
  };

  const config = sectionTitles[tier.id];

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background: `linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: tier.color }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-10 sm:mb-14"
        >
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur-sm"
            style={{
              borderColor: `${tier.color}30`,
              backgroundColor: `${tier.color}10`,
              color: tier.color,
            }}
          >
            {config.badge}
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {config.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            {config.subheading}
          </p>
        </motion.div>

        {dashboardComponents[tier.id]}
      </div>
    </section>
  );
}
