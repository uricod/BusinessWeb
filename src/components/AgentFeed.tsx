"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineFlag,
  HiOutlineRefresh,
  HiOutlineDocumentReport,
  HiOutlineExclamation,
  HiOutlineCheck,
  HiOutlineLightningBolt,
  HiOutlineCash,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const agentActions = [
  { icon: HiOutlineCash, text: "Auto-posting 47 transactions across 12 bank accounts", color: "#10b981", status: "Running" },
  { icon: HiOutlineFlag, text: "Flagging revenue exception: Claim #4821 denied — resubmitting", color: "#ef4444", status: "Alert" },
  { icon: HiOutlineRefresh, text: "Reconciling inter-portfolio transfers across 3 entities", color: "#3b82f6", status: "Running" },
  { icon: HiOutlineDocumentReport, text: "Generating weekly census report for all facilities", color: "#0ea5e9", status: "Complete" },
  { icon: HiOutlineExclamation, text: "Anomaly: Payroll hours +22% vs forecast — flagged for review", color: "#f59e0b", status: "Alert" },
  { icon: HiOutlineCheck, text: "Auto-reconciled 847 transactions — 0 exceptions", color: "#10b981", status: "Complete" },
  { icon: HiOutlineLightningBolt, text: "Routing cash inflows to correct GL accounts across 6 banks", color: "#8b5cf6", status: "Running" },
  { icon: HiOutlineClipboardCheck, text: "Demand forecast updated — 3 SKUs flagged for reorder", color: "#0ea5e9", status: "Complete" },
];

export default function AgentFeed() {
  const [visibleActions, setVisibleActions] = useState<number[]>([0, 1, 2, 3]);

  useEffect(() => {
    let nextIndex = 4;
    const timer = setInterval(() => {
      setVisibleActions((prev) => {
        const next = [...prev.slice(1), nextIndex % agentActions.length];
        nextIndex++;
        return next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            AI Agents
          </span>
        </div>
        <span className="rounded-full bg-ocean-50 px-2 py-0.5 text-[8px] font-bold text-ocean-600">
          8 Active
        </span>
      </div>

      {/* Mini activity graph */}
      <div className="mb-2 rounded-lg bg-slate-100/80 p-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-slate-400">Activity (24h)</span>
          <span className="text-[8px] font-bold text-emerald-600">↑ 23%</span>
        </div>
        <div className="mt-1 flex items-end gap-px" style={{ height: "20px" }}>
          {[30, 45, 35, 60, 50, 75, 65, 80, 70, 85, 78, 92, 88, 95, 82, 90].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ backgroundColor: i >= 14 ? "#10b981" : "#3b82f620" }}
              initial={{ height: 0 }}
              animate={{ height: `${h * 0.2}px` }}
              transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {visibleActions.map((actionIdx, i) => {
          const action = agentActions[actionIdx];
          return (
            <motion.div
              key={`${actionIdx}-${i}`}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1 - i * 0.1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-2 rounded-lg border border-slate-100 bg-white p-2 shadow-sm"
            >
              <div
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <action.icon
                  size={12}
                  className="flex-shrink-0"
                  style={{ color: action.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] leading-tight text-slate-600">
                  {action.text}
                </span>
                <span
                  className="mt-0.5 inline-block rounded-full px-1.5 py-0 text-[7px] font-bold uppercase"
                  style={{
                    backgroundColor: `${action.color}15`,
                    color: action.color,
                  }}
                >
                  {action.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
