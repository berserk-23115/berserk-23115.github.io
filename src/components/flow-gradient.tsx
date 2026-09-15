"use client";

import { motion, useReducedMotion } from "motion/react";

interface FlowGradientProps {
  variant?: number;
  className?: string;
}

const palettes = [
  ["#ff3d71", "#7c3aed", "#06b6d4"],
  ["#ff7a18", "#ec4899", "#6366f1"],
  ["#22c55e", "#06b6d4", "#8b5cf6"],
  ["#f59e0b", "#ef4444", "#a855f7"],
  ["#38bdf8", "#2563eb", "#c026d3"],
  ["#84cc16", "#14b8a6", "#0ea5e9"],
  ["#fb7185", "#d946ef", "#3b82f6"],
  ["#f97316", "#eab308", "#10b981"],
  ["#2dd4bf", "#3b82f6", "#e879f9"],
  ["#f43f5e", "#f59e0b", "#6366f1"],
  ["#8b5cf6", "#06b6d4", "#22c55e"],
  ["#ef4444", "#8b5cf6", "#14b8a6"],
  ["#a3e635", "#f97316", "#d946ef"],
  ["#60a5fa", "#c026d3", "#fb7185"],
  ["#fbbf24", "#10b981", "#6366f1"],
] as const;

const patterns = [
  "radial-gradient(circle at 18% 30%, rgba(255,255,255,.3) 0 1px, transparent 1.5px)",
  "repeating-linear-gradient(118deg, rgba(255,255,255,.16) 0 1px, transparent 1px 12px)",
  "radial-gradient(ellipse at 70% 45%, transparent 0 26%, rgba(255,255,255,.16) 27% 28%, transparent 29% 42%)",
  "repeating-radial-gradient(circle at 30% 60%, transparent 0 12px, rgba(255,255,255,.12) 13px 14px)",
  "linear-gradient(145deg, transparent 0 42%, rgba(255,255,255,.15) 43% 44%, transparent 45% 100%)",
] as const;

const motions: Array<{ x: string[]; y: string[]; rotate: number[] }> = [
  { x: ["-8%", "14%", "-8%"], y: ["4%", "-12%", "4%"], rotate: [0, 12, 0] },
  { x: ["12%", "-10%", "12%"], y: ["-8%", "12%", "-8%"], rotate: [0, -16, 0] },
  { x: ["-14%", "8%", "-14%"], y: ["-4%", "14%", "-4%"], rotate: [0, 18, 0] },
  { x: ["8%", "-14%", "8%"], y: ["10%", "-8%", "10%"], rotate: [0, -12, 0] },
];

export function FlowGradient({ variant = 0, className = "" }: FlowGradientProps) {
  const reducedMotion = useReducedMotion();
  const palette = palettes[((variant % palettes.length) + palettes.length) % palettes.length];
  const pattern = patterns[((variant % patterns.length) + patterns.length) % patterns.length];
  const motionPreset = motions[((variant % motions.length) + motions.length) % motions.length];

  return (
    <div className={`flow-gradient ${className}`} aria-hidden="true">
      <motion.div
        className="flow-gradient-blob flow-gradient-blob-a"
        style={{ background: palette[0] }}
        animate={reducedMotion ? undefined : motionPreset}
        transition={{ duration: 13 + (variant % 4) * 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="flow-gradient-blob flow-gradient-blob-b"
        style={{ background: palette[1] }}
        animate={reducedMotion ? undefined : motionPreset}
        transition={{ duration: 16 + (variant % 3) * 2, repeat: Infinity, ease: "easeInOut", delay: -4 }}
      />
      <motion.div
        className="flow-gradient-blob flow-gradient-blob-c"
        style={{ background: palette[2] }}
        animate={reducedMotion ? undefined : { ...motionPreset, x: [...motionPreset.x].reverse(), y: [...motionPreset.y].reverse() }}
        transition={{ duration: 18 + (variant % 5), repeat: Infinity, ease: "easeInOut", delay: -7 }}
      />
      <motion.div
        className="flow-gradient-pattern"
        style={{ backgroundImage: pattern }}
        animate={reducedMotion ? undefined : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <div className="flow-gradient-wash" />
    </div>
  );
}
