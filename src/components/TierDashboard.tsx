"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

type AgentChannel = {
  id: string;
  name: string;
  subtitle: string;
  headerBg: string;
  accent: string;
  iconPath: string;
};

const AGENT_CHANNELS: Record<string, AgentChannel> = {
  acropora: {
    id: "acropora",
    name: "AcroporaAgent",
    subtitle: "Executive operations assistant",
    headerBg: "#0d6b63",
    accent: "#0d6b63",
    iconPath:
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16h-11A2.5 2.5 0 014 13.5v-7z",
  },
  finance: {
    id: "finance",
    name: "CFO + COO",
    subtitle: "Finance Ops · Contract Review",
    headerBg: "#1e3a8a",
    accent: "#1e3a8a",
    iconPath:
      "M9 17V7a2 2 0 012-2h2a2 2 0 012 2v10M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z",
  },
};

type CardItem = { name: string; detail: string; tag: string };
type InlineCardData = { title: string; accent: string; items: CardItem[] };

type AgentStep =
  | { kind: "message"; from: "agent" | "user"; text: string; time: string; card?: InlineCardData; delay: number }
  | { kind: "voice"; from: "user"; transcript: string; duration: string; time: string; delay: number }
  | { kind: "typing"; delay: number }
  | { kind: "channel-switch"; to: string; delay: number };

const AGENT_STEPS: AgentStep[] = [
  {
    kind: "message",
    from: "agent",
    text: "This is what your calendar looks like. You have 5 meetings today at 8:30 AM, 10:00 AM, 12:30 PM, 2:00 PM, and 4:15 PM.",
    time: "6:50 AM",
    delay: 500,
  },
  {
    kind: "message",
    from: "agent",
    text: "I reviewed your census and it looks like Building Main Facility dropped to 90% occupancy yesterday, with 125 residents. I see chatter in Slack and Teams that the intake coordinator was fired. Should I start an email to Admin?",
    time: "7:03 AM",
    delay: 2500,
  },
  { kind: "message", from: "user", text: "Yes.", time: "7:05 AM", delay: 4400 },
  {
    kind: "message",
    from: "agent",
    text: "I have been researching your idea about a tech spinoff and this is what I found. Should I turn it into a podcast and send it to your Spotify for your morning walk?",
    time: "7:11 AM",
    delay: 800,
  },
  { kind: "message", from: "user", text: "Yes.", time: "7:12 AM", delay: 3300 },
  {
    kind: "message",
    from: "agent",
    text: "Sending to Spotify — your morning briefing is queued for the walk.",
    time: "7:12 AM",
    delay: 700,
  },
  {
    kind: "voice",
    from: "user",
    transcript: "I am having a survey in main building today, show me all the deficiencies in Care plans.",
    duration: "0:07",
    time: "9:14 AM",
    delay: 1700,
  },
  { kind: "typing", delay: 1800 },
  {
    kind: "message",
    from: "agent",
    text: "Here's what I found in PCC:",
    time: "9:14 AM",
    delay: 900,
    card: {
      title: "Care Plan Deficiencies · 3 found",
      accent: "#ef4444",
      items: [
        { name: "John Smith", detail: "Wound care plan not updated", tag: "14d overdue" },
        { name: "Maria Hernandez", detail: "Fall risk reassessment missing", tag: "due yesterday" },
        { name: "Robert Chen", detail: "Medication review signature absent", tag: "unsigned" },
      ],
    },
  },
  { kind: "channel-switch", to: "finance", delay: 1600 },
  {
    kind: "message",
    from: "agent",
    text: "Overnight I found a few variances in contracts we're working on with a new supplier for ancillary services and outsourced agency staff.",
    time: "7:42 AM",
    delay: 1300,
    card: {
      title: "Contract Variances · 3 flagged",
      accent: "#f59e0b",
      items: [
        { name: "Vendor Alpha", detail: "Agency rate +$42K vs RFP", tag: "over budget" },
        { name: "Vendor Beta", detail: "Missing exclusivity clause", tag: "risk" },
        { name: "Vendor Gamma", detail: "Auto-renewal terms unclear", tag: "review" },
      ],
    },
  },
];

type AnnotatedStep = AgentStep & { channel: string };
const ANNOTATED_AGENT_STEPS: AnnotatedStep[] = (() => {
  let channel = "acropora";
  return AGENT_STEPS.map((step) => {
    if (step.kind === "channel-switch") channel = step.to;
    return { ...step, channel };
  });
})();

function InlineCard({ data }: { data: InlineCardData }) {
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200/70 bg-white">
      <div
        className="border-l-[3px] px-3 py-2"
        style={{ borderLeftColor: data.accent, backgroundColor: `${data.accent}0a` }}
      >
        <div className="text-[11px] font-semibold text-slate-700">{data.title}</div>
      </div>
      <div className="divide-y divide-slate-100">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-medium text-slate-800">{item.name}</div>
              <div className="truncate text-[10px] text-slate-500">{item.detail}</div>
            </div>
            <span
              className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
              style={{ backgroundColor: `${data.accent}15`, color: data.accent }}
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceNoteBubble({
  transcript,
  duration,
  time,
  accent,
}: {
  transcript: string;
  duration: string;
  time: string;
  accent: string;
}) {
  return (
    <div className="max-w-[88%] rounded-[1.25rem] rounded-tr-md bg-[#d9fdd3] px-3 py-2.5 shadow-sm sm:max-w-[80%]">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: accent }}
        >
          <svg className="ml-0.5 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="flex h-7 flex-1 items-center gap-[2px]">
          {Array.from({ length: 26 }).map((_, i) => {
            const base = 3 + ((i * 5) % 11);
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-full"
                style={{ backgroundColor: `${accent}55`, minWidth: 2 }}
                animate={{ height: [base, base + 8, base + 3, base + 10, base] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.04 }}
              />
            );
          })}
        </div>
        <span className="shrink-0 text-[10px] font-medium text-slate-600">{duration}</span>
      </div>
      <p className="mt-2 text-[12px] italic leading-5 text-slate-600">&ldquo;{transcript}&rdquo;</p>
      <p className="mt-1 text-right text-[10px] text-slate-400">{time}</p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="rounded-[1.25rem] rounded-tl-md bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-slate-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function Typewriter({
  text,
  speed = 16,
  onTick,
}: {
  text: string;
  speed?: number;
  onTick?: () => void;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setShown(0);
  }, [text]);

  useEffect(() => {
    if (shown >= text.length) return;
    const t = window.setTimeout(() => {
      setShown((s) => s + 1);
      onTick?.();
    }, speed);
    return () => window.clearTimeout(t);
  }, [shown, text, speed, onTick]);

  return <>{text.slice(0, shown)}</>;
}

function PhoneStatusBar() {
  return (
    <div className="relative z-10 flex shrink-0 items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-slate-900">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="2" height="3" rx="0.5" />
          <rect x="3" y="5" width="2" height="5" rx="0.5" />
          <rect x="6" y="3" width="2" height="7" rx="0.5" />
          <rect x="9" y="0" width="2" height="10" rx="0.5" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 5c3-3 9-3 12 0" strokeLinecap="round" />
          <path d="M4.5 7c2-2 5-2 7 0" strokeLinecap="round" />
          <circle cx="8" cy="9.2" r="1" fill="currentColor" />
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <rect x="0.5" y="0.5" width="18" height="9" rx="2" />
          <rect x="2" y="2" width="12" height="6" rx="1" fill="currentColor" />
          <rect x="19.5" y="3.25" width="1.5" height="3.5" rx="0.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function PhoneInputBar({ accent }: { accent: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-[#f0f2f5] px-2 py-2">
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm"
        aria-label="Attach"
        tabIndex={-1}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </button>
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
        <span className="text-[12px] text-slate-400">Message</span>
        <svg className="ml-auto h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-colors"
        style={{ backgroundColor: accent }}
        aria-label="Record voice"
        tabIndex={-1}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zm7 9a1 1 0 00-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7 7 0 006 6.92V20H9a1 1 0 000 2h6a1 1 0 000-2h-2v-2.08A7 7 0 0019 11z" />
        </svg>
      </button>
    </div>
  );
}

type IndustryId = "nursing" | "homecare" | "builders" | "lawfirm" | "supplychain" | "behavioralhealth";

function isIndustryId(value: string | null | undefined): value is IndustryId {
  return INDUSTRIES.some((industry) => industry.id === value);
}

const INDUSTRIES: {
  id: IndustryId;
  name: string;
  shortName: string;
  color: string;
  src: string;
  iconPath: string;
}[] = [
  {
    id: "nursing",
    name: "Nursing Homes",
    shortName: "Nursing",
    color: "#10b981",
    src: "/acropora-agent-loop-standalone.html",
    iconPath:
      "M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01",
  },
  {
    id: "homecare",
    name: "Home Care",
    shortName: "Home Care",
    color: "#f472b6",
    src: "/acropora-agent-loop-homecare.html",
    iconPath:
      "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10M10 14h4",
  },
  {
    id: "builders",
    name: "Builders",
    shortName: "Builders",
    color: "#f59e0b",
    src: "/acropora-agent-loop.builder.html",
    iconPath:
      "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  },
  {
    id: "lawfirm",
    name: "Law Firms",
    shortName: "Law",
    color: "#60a5fa",
    src: "/acropora-agent-loop.lawfirm.html",
    iconPath:
      "M12 3v18M3 21h18M3 7h18M6 7l-3 7c0 1.66 1.34 3 3 3s3-1.34 3-3L6 7zm12 0l-3 7c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-7z",
  },
  {
    id: "supplychain",
    name: "Supply Chain",
    shortName: "Supply",
    color: "#22d3ee",
    src: "/acropora-agent-loop-supplychain.html",
    iconPath:
      "M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.41 1.41M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.41-1.41",
  },
  {
    id: "behavioralhealth",
    name: "Behavioral Health",
    shortName: "Behavioral",
    color: "#a78bfa",
    src: "/acropora-agent-loop-behavorial-health.html",
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

function AIOpsDashboard({ initialIndustry = null }: { initialIndustry?: string | null }) {
  const [industry, setIndustry] = useState<IndustryId | null>(
    isIndustryId(initialIndustry) ? initialIndustry : null,
  );
  const selected = INDUSTRIES.find((i) => i.id === industry);
  const glowColor = selected?.color ?? "#10b981";
  const workspaceHeight = "clamp(28rem, 82svh, 54rem)";

  useEffect(() => {
    const links = INDUSTRIES.map((ind) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "document";
      link.href = ind.src;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((l) => l.remove());
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6">
      <div className="relative">
        <motion.div
          className="pointer-events-none absolute inset-x-[8%] top-1/2 -z-10 h-[78%] -translate-y-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: `${glowColor}33` }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10 backdrop-blur-sm sm:rounded-[2rem]"
        >
          {/* Header bar — same in both states, only content swaps */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5 sm:px-5 sm:py-3">
            {selected ? (
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: selected.color, boxShadow: `0 0 8px ${selected.color}` }}
                />
                <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-[11px] sm:tracking-[0.24em]">
                  {selected.name} · Live Agent
                </span>
              </div>
            ) : (
              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-[11px] sm:tracking-[0.24em]">
                Live Agent Workspace
              </span>
            )}
            <div className="flex shrink-0 items-center gap-1.5">
              {selected && (
                <div className="flex flex-wrap items-center justify-end gap-1 rounded-2xl border border-white/10 bg-slate-900/60 p-0.5 md:rounded-full md:flex-nowrap">
                  {INDUSTRIES.map((ind) => {
                    const isActive = ind.id === industry;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => setIndustry(ind.id)}
                        aria-pressed={isActive}
                        className="rounded-full px-2 py-1 text-[10px] font-semibold transition-all sm:px-2.5"
                        style={{
                          backgroundColor: isActive ? ind.color : "transparent",
                          color: isActive ? "#0f172a" : "#94a3b8",
                        }}
                        title={ind.name}
                      >
                        {ind.shortName}
                      </button>
                    );
                  })}
                </div>
              )}
              <span className="hidden rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300 ring-1 ring-inset ring-emerald-300/20 sm:inline">
                Scroll Inside
              </span>
            </div>
          </div>

          {/* Content area — fixed height; chooser OR iframe */}
          {selected ? (
            <iframe
              key={industry}
              src={selected.src}
              title={`${selected.name} Agent Loop`}
              className="block w-full border-0 bg-[#0c1612]"
              loading="lazy"
              style={{ height: workspaceHeight }}
            />
          ) : (
            <div
              className="flex w-full items-center justify-center bg-[#0c1612] px-4 py-8 sm:px-8"
              style={{ height: workspaceHeight }}
            >
              <div className="mx-auto w-full max-w-3xl text-center">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300 sm:text-[11px]"
                >
                  Choose Your Industry
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="mt-4 text-2xl font-bold text-white sm:text-3xl"
                >
                  Which agent loop do you want to see?
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mt-2 text-sm text-slate-400 sm:text-base"
                >
                  Each demo runs the agent against that industry&apos;s real workflows.
                </motion.p>

                <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                  {INDUSTRIES.map((ind, i) => (
                    <motion.button
                      key={ind.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIndustry(ind.id)}
                      className="group relative flex flex-col items-center rounded-xl border bg-white/[0.03] p-3 text-center backdrop-blur-sm transition-colors sm:p-4"
                      style={{ borderColor: `${ind.color}30` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 0 ${ind.color}33`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${ind.color}80`;
                        (e.currentTarget as HTMLElement).style.backgroundColor = `${ind.color}0d`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `none`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${ind.color}30`;
                        (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(255,255,255,0.03)`;
                      }}
                    >
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-11 sm:w-11"
                        style={{ backgroundColor: `${ind.color}20` }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke={ind.color}
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={ind.iconPath} />
                        </svg>
                      </div>
                      <h4 className="mt-2 text-xs font-bold sm:mt-3 sm:text-sm" style={{ color: ind.color }}>
                        {ind.name}
                      </h4>
                      <div
                        className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold transition-all group-hover:gap-1.5 sm:mt-3 sm:px-2.5 sm:text-[11px]"
                        style={{ backgroundColor: `${ind.color}20`, color: ind.color }}
                      >
                        Launch
                        <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {!selected && (
          <p className="mt-4 text-center text-sm text-slate-400 sm:text-base">
            Pick an industry above to launch the live AI agent demo.
          </p>
        )}
      </div>
    </div>
  );
}

interface TierDashboardProps {
  tier: Tier;
  initialIndustry?: string | null;
}

export default function TierDashboard({ tier, initialIndustry = null }: TierDashboardProps) {
  const dashboardComponents: Record<string, React.ReactNode> = {
    precision: <PrecisionDashboard />,
    visibility: <VisibilityDashboard />,
    automation: <SmartAutomationDashboard />,
    aiops: <AIOpsDashboard initialIndustry={initialIndustry} />,
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
      badge: "",
      heading: "",
      subheading: "",
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
        {tier.id !== "aiops" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
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
        )}

        {dashboardComponents[tier.id]}
      </div>
    </section>
  );
}
