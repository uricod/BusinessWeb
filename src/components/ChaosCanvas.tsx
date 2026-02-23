"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

// === Data pools ===
const currencyValues = ["$42,180", "$12,340", "$8,921", "$156K", "$3,750", "$67,200", "$890", "$24,100", "$5,430", "$99,800"];
const systemLabels = ["ERP", "CRM", "QuickBooks", "Yardi", "PCC", "Intacct", "Salesforce", "Xero", "NetSuite", "SAP"];
const statusChips = ["Pending", "Overdue", "Processing", "Approved", "Failed", "Syncing", "Delayed", "In Review", "Escalated", "Complete"];
const metrics = ["847 units", "23 orders", "156 tickets", "+12.4%", "-3.2%", "98.7%", "4.2 days", "1,247 SKUs", "89 clients", "32 locations"];
const invoiceIds = ["INV-4821", "PO-7734", "WO-1192", "RFQ-3301", "SO-8856", "GRN-2210", "CR-5543", "DN-1187", "AP-9920", "AR-6615"];
const industryTerms = ["Census", "Occupancy %", "Rent Roll", "Sales by Day", "Claim Denials", "AR Aging", "Throughput", "Yield Rate", "CAM Charges", "NOI", "RevPAR", "PMPM", "Days in AR", "Fill Rate", "Cycle Time", "Bed Census"];

type RGB = [number, number, number];

const hotColors: RGB[] = [
  [249, 115, 22],  // orange-500
  [239, 68, 68],   // red-500
  [244, 63, 94],   // rose-500
  [217, 70, 239],  // fuchsia-500
  [236, 72, 153],  // pink-500
  [251, 191, 36],  // amber-400
  [251, 146, 60],  // orange-400
  [248, 113, 113], // red-400
  [232, 121, 249], // fuchsia-400
  [244, 114, 182], // pink-400
];

const coolColors: RGB[] = [
  [59, 130, 246],  // blue-500
  [6, 182, 212],   // cyan-500
  [20, 184, 166],  // teal-500
  [14, 165, 233],  // sky-500
  [99, 102, 241],  // indigo-500
  [45, 212, 191],  // teal-400
];

type FragmentType = "currency" | "systemLabel" | "statusChip" | "metric" | "invoiceId" | "chartBar" | "industryTerm";

interface ChaosFragment {
  type: FragmentType;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  hotColor: RGB;
  coolColor: RGB;
  fontSize: number;
  baseOpacity: number;
  systemGroup: number; // 0-5
  targetX: number;
  targetY: number;
  barHeight: number; // for chartBar type
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lerpColor(
  hot: RGB,
  cool: RGB,
  t: number
): RGB {
  return [
    hot[0] + (cool[0] - hot[0]) * t,
    hot[1] + (cool[1] - hot[1]) * t,
    hot[2] + (cool[2] - hot[2]) * t,
  ];
}

function createFragments(count: number, w: number, h: number): ChaosFragment[] {
  const types: FragmentType[] = ["currency", "systemLabel", "statusChip", "metric", "invoiceId", "chartBar", "industryTerm"];
  const textPools: Record<string, string[]> = {
    currency: currencyValues,
    systemLabel: systemLabels,
    statusChip: statusChips,
    metric: metrics,
    invoiceId: invoiceIds,
    chartBar: [""],
    industryTerm: industryTerms,
  };

  // Target positions: 6 system groups arranged in 3×2 grid within center area
  const gridCols = 3;
  const gridRows = 2;
  const gridW = w * 0.6;
  const gridH = h * 0.4;
  const gridStartX = w * 0.2;
  const gridStartY = h * 0.25;

  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const systemGroup = i % 6;
    const gridCol = systemGroup % gridCols;
    const gridRow = Math.floor(systemGroup / gridCols);

    // Target position with some jitter within the cell
    const cellW = gridW / gridCols;
    const cellH = gridH / gridRows;
    const targetX = gridStartX + gridCol * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
    const targetY = gridStartY + gridRow * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4;

    return {
      type,
      text: pickRandom(textPools[type]),
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      hotColor: pickRandom(hotColors),
      coolColor: pickRandom(coolColors),
      fontSize: type === "systemLabel" ? 14 : type === "currency" ? 16 : 12,
      baseOpacity: 0.5 + Math.random() * 0.5,
      systemGroup,
      targetX,
      targetY,
      barHeight: 10 + Math.random() * 20,
    };
  });
}

interface ChaosCanvasProps {
  scrollProgress: MotionValue<number>;
  className?: string;
}

export default function ChaosCanvas({ scrollProgress, className = "" }: ChaosCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fragmentsRef = useRef<ChaosFragment[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 120;
    const connectionDist = isMobile ? 60 : 120;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    fragmentsRef.current = createFragments(count, w(), h());

    // Mouse tracking (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Visibility
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) return;

      const progress = scrollRef.current.get();
      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      const fragments = fragmentsRef.current;

      // Convergence factor: 0 = full chaos, 1 = fully settled
      const convergence = Math.max(0, Math.min(1, (progress - 0.15) / 0.5));
      // Color transition
      const colorT = Math.max(0, Math.min(1, (progress - 0.1) / 0.45));
      // Chaos intensity (for mouse repulsion, speed)
      const chaos = 1 - convergence;

      // Update fragments
      for (const f of fragments) {
        // Apply velocity (scaled by chaos)
        f.x += f.vx * chaos;
        f.y += f.vy * chaos;
        f.rotation += f.rotationSpeed * chaos;

        // Lerp toward target during convergence
        if (convergence > 0) {
          const lerpStrength = convergence * convergence * 0.08;
          f.x += (f.targetX - f.x) * lerpStrength;
          f.y += (f.targetY - f.y) * lerpStrength;
        }

        // Bounce off edges during chaos
        if (chaos > 0.1) {
          if (f.x < -50) f.x = width + 50;
          if (f.x > width + 50) f.x = -50;
          if (f.y < -50) f.y = height + 50;
          if (f.y > height + 50) f.y = -50;
        }

        // Mouse repulsion (desktop, chaos phase only)
        if (!isMobile && chaos > 0.3) {
          const dx = f.x - mouseRef.current.x;
          const dy = f.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = ((150 - dist) / 150) * 2 * chaos;
            f.vx += (dx / dist) * force * 0.3;
            f.vy += (dy / dist) * force * 0.3;
          }
        }

        // Clamp velocity
        const maxV = 4 * chaos + 0.05;
        const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy);
        if (speed > maxV) {
          f.vx = (f.vx / speed) * maxV;
          f.vy = (f.vy / speed) * maxV;
        }
      }

      // Draw connections (nearby fragments in same system group during convergence)
      if (convergence > 0.2) {
        for (let i = 0; i < fragments.length; i++) {
          for (let j = i + 1; j < fragments.length; j++) {
            if (fragments[i].systemGroup !== fragments[j].systemGroup) continue;
            const dx = fragments[i].x - fragments[j].x;
            const dy = fragments[i].y - fragments[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDist) {
              const alpha = (1 - dist / connectionDist) * 0.12 * convergence;
              const c = lerpColor(fragments[i].hotColor, fragments[i].coolColor, colorT);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(fragments[i].x, fragments[i].y);
              ctx.lineTo(fragments[j].x, fragments[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // During chaos: random proximity connections in hot colors
      if (chaos > 0.3) {
        for (let i = 0; i < fragments.length; i += 3) {
          for (let j = i + 1; j < fragments.length; j += 3) {
            const dx = fragments[i].x - fragments[j].x;
            const dy = fragments[i].y - fragments[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDist * 0.8) {
              const alpha = (1 - dist / (connectionDist * 0.8)) * 0.06 * chaos;
              const c = fragments[i].hotColor;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
              ctx.lineWidth = 0.3;
              ctx.moveTo(fragments[i].x, fragments[i].y);
              ctx.lineTo(fragments[j].x, fragments[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw fragments
      const font = "system-ui, sans-serif";
      for (const f of fragments) {
        const c = lerpColor(f.hotColor, f.coolColor, colorT);
        const r = c[0] | 0, g = c[1] | 0, b = c[2] | 0;
        const opacity = f.baseOpacity * (0.6 + chaos * 0.4);

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation * chaos); // rotation fades during convergence

        if (f.type === "chartBar") {
          // Mini bar
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity * 0.6})`;
          ctx.fillRect(-2, -f.barHeight / 2, 4, f.barHeight);
        } else if (f.type === "systemLabel") {
          // Chip: rounded rect background + text
          ctx.font = `bold ${f.fontSize}px ${font}`;
          const tm = ctx.measureText(f.text);
          const pw = 8, ph = 4;
          const bw = tm.width + pw * 2;
          const bh = f.fontSize + ph * 2;

          ctx.fillStyle = `rgba(${r},${g},${b},${opacity * 0.15})`;
          ctx.beginPath();
          ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
          ctx.fill();

          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(f.text, 0, 1);
        } else if (f.type === "statusChip") {
          // Status dot + text
          ctx.font = `${f.fontSize}px ${font}`;
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.beginPath();
          ctx.arc(-ctx.measureText(f.text).width / 2 - 8, 0, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(f.text, 0, 0);
        } else {
          // Currency, metric, invoiceId: just text
          const weight = f.type === "currency" ? "bold " : "";
          ctx.font = `${weight}${f.fontSize}px ${font}`;
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(f.text, 0, 0);
        }

        ctx.restore();
      }
    };

    animate();

    const onResize = () => {
      resize();
      // Recalculate targets on resize
      const newW = w();
      const newH = h();
      const gridW = newW * 0.6;
      const gridH = newH * 0.4;
      const gridStartX = newW * 0.2;
      const gridStartY = newH * 0.25;
      const cellW = gridW / 3;
      const cellH = gridH / 2;
      for (const f of fragmentsRef.current) {
        const col = f.systemGroup % 3;
        const row = Math.floor(f.systemGroup / 3);
        f.targetX = gridStartX + col * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
        f.targetY = gridStartY + row * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
