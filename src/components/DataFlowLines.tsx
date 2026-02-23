"use client";

import { useEffect, useRef, useState } from "react";

// Connection topology between 6 system panels (indices in 3×2 grid)
// 0=ERP, 1=CRM, 2=Finance, 3=Inventory, 4=Analytics, 5=Comms
const connections = [
  { from: 0, to: 2 }, // ERP → Finance
  { from: 0, to: 3 }, // ERP → Inventory
  { from: 1, to: 4 }, // CRM → Analytics
  { from: 1, to: 5 }, // CRM → Comms
  { from: 2, to: 4 }, // Finance → Analytics
  { from: 3, to: 0 }, // Inventory → ERP
  { from: 4, to: 2 }, // Analytics → Finance
  { from: 5, to: 1 }, // Comms → CRM
];

interface Dot {
  connectionIdx: number;
  progress: number; // 0-1 along the path
  speed: number;
}

interface DataFlowLinesProps {
  active: boolean;
}

export default function DataFlowLines({ active }: DataFlowLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const [, setTick] = useState(0);
  const animRef = useRef<number>(0);

  // Panel centers as percentages (matching 3×2 grid layout)
  const panelCenters = [
    { x: 16.7, y: 30 },  // ERP (col 0, row 0)
    { x: 50, y: 30 },    // CRM (col 1, row 0)
    { x: 83.3, y: 30 },  // Finance (col 2, row 0)
    { x: 16.7, y: 70 },  // Inventory (col 0, row 1)
    { x: 50, y: 70 },    // Analytics (col 1, row 1)
    { x: 83.3, y: 70 },  // Comms (col 2, row 1)
  ];

  useEffect(() => {
    if (!active) return;

    // Initialize dots
    dotsRef.current = connections.map((_, i) => ({
      connectionIdx: i,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    const animate = () => {
      for (const dot of dotsRef.current) {
        dot.progress += dot.speed;
        if (dot.progress > 1) dot.progress = 0;
      }
      setTick((t) => t + 1);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {connections.map((conn, i) => {
        const from = panelCenters[conn.from];
        const to = panelCenters[conn.to];
        const dot = dotsRef.current[i];
        if (!dot) return null;

        // Curved path via control point
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const offsetX = (to.y - from.y) * 0.15;
        const offsetY = (from.x - to.x) * 0.15;
        const cpX = midX + offsetX;
        const cpY = midY + offsetY;

        // Calculate dot position on quadratic bezier
        const t = dot.progress;
        const dotX = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x;
        const dotY = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y;

        return (
          <g key={i}>
            <path
              d={`M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`}
              fill="none"
              stroke="rgba(59,130,246,0.08)"
              strokeWidth="0.3"
            />
            <circle
              cx={dotX}
              cy={dotY}
              r="0.8"
              fill="rgba(59,130,246,0.5)"
            />
            {/* Trail dot */}
            <circle
              cx={(1 - (t - 0.05)) * (1 - (t - 0.05)) * from.x + 2 * (1 - (t - 0.05)) * (t - 0.05) * cpX + (t - 0.05) * (t - 0.05) * to.x}
              cy={(1 - (t - 0.05)) * (1 - (t - 0.05)) * from.y + 2 * (1 - (t - 0.05)) * (t - 0.05) * cpY + (t - 0.05) * (t - 0.05) * to.y}
              r="0.5"
              fill="rgba(59,130,246,0.2)"
            />
          </g>
        );
      })}
    </svg>
  );
}
