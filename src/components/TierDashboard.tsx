"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    {
      from: "agent",
      text: "This is what your calendar looks like. You have 5 meetings today at 8:30 AM, 10:00 AM, 12:30 PM, 2:00 PM, and 4:15 PM.",
      time: "6:50 AM",
    },
    {
      from: "agent",
      text: "I reviewed your census and it looks like Building Main Facility dropped to 90% occupancy yesterday, with 125 residents. I see chatter in Slack and Teams that the intake coordinator was fired. Should I start an email to Admin?",
      time: "7:03 AM",
    },
    {
      from: "user",
      text: "Yes.",
      time: "7:05 AM",
    },
    {
      from: "agent",
      text: "I have been researching your idea about a tech spinoff and this is what I found. Should I turn it into a podcast and send it to your Spotify for your morning walk?",
      time: "7:11 AM",
    },
  ];

  const scenes = [
    {
      id: "calendar",
      focusLabel: "Current Focus",
      focusTitle: "Calendar briefing assembled",
      focusStatus: "Reviewing",
      focusBody: "AcroporaAgent summarizes the day before the executive team logs in and flags schedule compression early.",
      syncTime: "Last sync 6:52 AM",
      automationCards: [
        { label: "Meetings Today", value: "05", detail: "Stacked across operations, census review, and investor prep.", accent: "#38bdf8" },
        { label: "First Briefing", value: "8:30", detail: "Leadership standup is first on deck this morning.", accent: "#22c55e" },
        { label: "Focus Gaps", value: "02", detail: "Two open windows remain for urgent follow-up.", accent: "#f59e0b" },
      ],
      activityItems: [
        { title: "Calendar parsed", detail: "Pulled meetings from Outlook and grouped by decision priority.", status: "Live" },
        { title: "Travel buffers checked", detail: "No site-to-site conflict detected for the afternoon meetings.", status: "Clear" },
        { title: "Executive brief drafted", detail: "Morning summary prepared for approval and send-out.", status: "Ready" },
      ],
    },
    {
      id: "occupancy",
      focusLabel: "Risk Signal",
      focusTitle: "Occupancy dipped at Building Main Facility",
      focusStatus: "Escalation Suggested",
      focusBody: "The agent correlates census movement with team chatter and surfaces the likely operational cause before occupancy falls further.",
      syncTime: "Last sync 7:04 AM",
      automationCards: [
        { label: "Occupancy", value: "90%", detail: "Building Main Facility closed the day below target occupancy.", accent: "#f97316" },
        { label: "Resident Count", value: "125", detail: "Down from the previous day and outside the normal band.", accent: "#38bdf8" },
        { label: "Source Alerts", value: "02", detail: "Slack and Teams both reference intake disruption.", accent: "#ef4444" },
      ],
      activityItems: [
        { title: "Census anomaly detected", detail: "Yesterday's move-outs exceeded normal intake replacement velocity.", status: "Flagged" },
        { title: "Internal chatter matched", detail: "Staff communication points to intake coordinator termination.", status: "Correlated" },
        { title: "Admin draft recommended", detail: "Escalation path prepared but still waiting on approval.", status: "Pending" },
      ],
    },
    {
      id: "approval",
      focusLabel: "Action Queue",
      focusTitle: "Admin escalation approved",
      focusStatus: "Queued",
      focusBody: "Once leadership approves, AcroporaAgent moves directly from signal detection to drafted communication with the necessary context attached.",
      syncTime: "Last sync 7:06 AM",
      automationCards: [
        { label: "Draft Status", value: "Ready", detail: "Email to Admin is staged with occupancy data and staffing context.", accent: "#22c55e" },
        { label: "Recipients", value: "03", detail: "Admin, COO, and regional operations included in the draft.", accent: "#38bdf8" },
        { label: "Attachments", value: "02", detail: "Census trend and message excerpts attached for context.", accent: "#a78bfa" },
      ],
      activityItems: [
        { title: "Approval captured", detail: "Executive response logged and linked to the escalation request.", status: "Logged" },
        { title: "Email draft assembled", detail: "Occupancy trend, resident count, and staffing cause included in one thread.", status: "Ready" },
        { title: "Follow-up timer armed", detail: "Agent will check for Admin response before the noon review.", status: "Scheduled" },
      ],
    },
    {
      id: "podcast",
      focusLabel: "New Opportunity",
      focusTitle: "Tech spinoff research prepared",
      focusStatus: "Ready To Send",
      focusBody: "AcroporaAgent pivots from operations into research synthesis, then offers the best delivery format for the executive's routine.",
      syncTime: "Last sync 7:12 AM",
      automationCards: [
        { label: "Research Memos", value: "04", detail: "Market comps, buyer interest, compliance, and staffing model summarized.", accent: "#38bdf8" },
        { label: "Audio Draft", value: "08m", detail: "Estimated podcast runtime for a morning walk briefing.", accent: "#22c55e" },
        { label: "Delivery", value: "Spotify", detail: "Ready to publish privately to the executive listening feed.", accent: "#f59e0b" },
      ],
      activityItems: [
        { title: "Spinoff research synthesized", detail: "Combined internal notes with market and operational benchmarks.", status: "Compiled" },
        { title: "Audio outline generated", detail: "Structured as a short narrative briefing with next-step recommendations.", status: "Drafted" },
        { title: "Distribution ready", detail: "Private Spotify upload can be triggered after one response.", status: "Waiting" },
      ],
    },
  ];

  const [visibleMessageCount, setVisibleMessageCount] = useState(1);

  useEffect(() => {
    const delay = visibleMessageCount < messages.length ? 2400 : 5200;
    const timeout = window.setTimeout(() => {
      setVisibleMessageCount((current) => (current < messages.length ? current + 1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [messages.length, visibleMessageCount]);

  const currentScene =
    visibleMessageCount >= 4
      ? scenes[3]
      : visibleMessageCount >= 3
        ? scenes[2]
        : visibleMessageCount >= 2
          ? scenes[1]
          : scenes[0];

  const visibleMessages = messages.slice(0, visibleMessageCount);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <motion.div
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 sm:px-6">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">
            <span className="block truncate text-[11px] text-slate-400 sm:text-xs">agent.acropora.ai/workspace</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200 sm:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            AcroporaAgent Online
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)] lg:p-8">
          <motion.div
            className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#f3ecdf] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 bg-[#0d6b63] px-4 py-4 sm:px-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-100 ring-1 ring-inset ring-white/15">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16h-11A2.5 2.5 0 014 13.5v-7z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-semibold text-white sm:text-lg">AcroporaAgent</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-emerald-100/80">Executive operations assistant</div>
              </div>
              <div className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                Live
              </div>
            </div>

            <div className="space-y-3 px-3 py-4 sm:px-5 sm:py-5" style={{ minHeight: "420px" }}>
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={`${msg.time}-${i}`}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  initial={i === visibleMessages.length - 1 ? { opacity: 0, y: 14, scale: 0.98 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28 }}
                  layout="position"
                >
                  <div
                    className={`max-w-[88%] rounded-[1.25rem] px-4 py-3 shadow-sm sm:max-w-[80%] ${
                      msg.from === "user"
                        ? "rounded-tr-md bg-[#d9fdd3] text-slate-900"
                        : "rounded-tl-md bg-white text-slate-800"
                    }`}
                  >
                    <p className="whitespace-pre-line text-[13px] leading-6 sm:text-sm">{msg.text}</p>
                    <p className="mt-2 text-right text-[10px] text-slate-400">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 sm:gap-5"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="rounded-[1.6rem] border border-cyan-400/20 bg-cyan-400/10 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">{currentScene.focusLabel}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{currentScene.focusTitle}</h3>
                </div>
                <div className="rounded-full border border-cyan-300/20 bg-slate-950/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                  {currentScene.focusStatus}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {currentScene.focusBody}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {currentScene.automationCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.04 }}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{card.label}</div>
                  <div className="mt-3 text-3xl font-semibold text-white" style={{ color: card.accent }}>{card.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{card.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Agent Activity</h3>
                <span className="text-[11px] text-slate-500">{currentScene.syncTime}</span>
              </div>
              <div className="mt-4 space-y-3">
                {currentScene.activityItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="rounded-2xl border border-white/8 bg-slate-950/40 p-4"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04 }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <span className="rounded-full bg-white/6 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
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
