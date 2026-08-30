"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PipelineConfig } from "./workspace-types";

interface AgentPipelineFlowProps {
  pipeline?: PipelineConfig;
  className?: string;
}

const DEFAULT_PIPELINE: PipelineConfig = {
  headerTag: "WORKSPACE · CRAFT PIPELINE",
  headerStatus: "Live · Ready",
  node1: {
    tag: "BRIEF & SCOPE",
    title: "User Goals",
    subtext: "discovery.fig",
  },
  node2: {
    tag: "DESIGN SYSTEM",
    title: "Tokens & Patterns",
    subtext: "reusable-ui",
  },
  node3: {
    tag: "FRONTEND CRAFT",
    title: "Interactive Code",
    subtext: "next.js · typescript",
    isActive: true,
  },
  branches: [
    { label: "Production App", statusColor: "green" },
    { label: "Tested UX Flow", statusColor: "green" },
    { label: "Lighthouse 98+", statusColor: "green" },
  ],
  terminalLine: "> Craft: build verified -> reusable components & live stages active.",
  stats: {
    workflows: "4 tracks",
    tokens: "140+ vars",
    avgLatency: "60fps",
    stack: "Figma · Next.js",
  },
};

export function AgentPipelineFlow({
  pipeline = DEFAULT_PIPELINE,
  className,
}: AgentPipelineFlowProps) {
  const cfg = pipeline || DEFAULT_PIPELINE;

  return (
    <div
      className={cn(
        "relative flex flex-col w-full overflow-hidden select-none font-sans",
        className
      )}
    >
      {/* Flowchart Canvas Stage */}
      <div className="relative w-full overflow-x-auto py-2 no-scrollbar">
        <div className="relative min-w-[580px] max-w-[660px] h-[160px] flex items-center justify-between">
          {/* SVG Connector Layer with Animated Particles */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 660 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Particle Glow Filter */}
              <filter id="flow-particle-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static Dashed Connector Paths */}
            <g
              stroke="currentColor"
              className="text-line-2 dark:text-white/20"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            >
              {/* Path 1: Node 1 -> Node 2 */}
              <line x1="126" y1="80" x2="168" y2="80" />

              {/* Path 2: Node 2 -> Node 3 */}
              <line x1="298" y1="80" x2="340" y2="80" />

              {/* Path 3A: Node 3 -> Branch 1 (Top) */}
              <path d="M 495 80 C 516 80, 516 32, 538 32" />

              {/* Path 3B: Node 3 -> Branch 2 (Middle) */}
              <line x1="495" y1="80" x2="538" y2="80" />

              {/* Path 3C: Node 3 -> Branch 3 (Bottom) */}
              <path d="M 495 80 C 516 80, 516 128, 538 128" />
            </g>

            {/* Framer Motion Animated Glowing Blue Particles */}
            {/* Wave 1: Particle Stream 1 */}
            {/* Segment 1: Node 1 -> Node 2 */}
            <motion.circle
              r="2.75"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [126, 168],
                cy: [80, 80],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            />

            {/* Segment 2: Node 2 -> Node 3 */}
            <motion.circle
              r="2.75"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [298, 340],
                cy: [80, 80],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            />

            {/* Segment 3A: Node 3 -> Branch 1 */}
            <motion.circle
              r="2.75"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 506, 516, 528, 538],
                cy: [80, 68, 52, 38, 32],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            />

            {/* Segment 3B: Node 3 -> Branch 2 */}
            <motion.circle
              r="2.75"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 538],
                cy: [80, 80],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            />

            {/* Segment 3C: Node 3 -> Branch 3 */}
            <motion.circle
              r="2.75"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 506, 516, 528, 538],
                cy: [80, 92, 108, 122, 128],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            />

            {/* Wave 2: Staggered Particle Stream for Continuous Fluid Motion */}
            <motion.circle
              r="2.2"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [126, 168],
                cy: [80, 80],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            />

            <motion.circle
              r="2.2"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [298, 340],
                cy: [80, 80],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.3,
              }}
            />

            <motion.circle
              r="2.2"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 506, 516, 528, 538],
                cy: [80, 68, 52, 38, 32],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />

            <motion.circle
              r="2.2"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 538],
                cy: [80, 80],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />

            <motion.circle
              r="2.2"
              fill="#F0531C"
              filter="url(#flow-particle-glow)"
              animate={{
                cx: [495, 506, 516, 528, 538],
                cy: [80, 92, 108, 122, 128],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </svg>

          {/* Node 1: TRIGGER / User Query */}
          <div className="relative z-10 w-[126px] rounded-[6px] border border-line-2 dark:border-white/10 bg-white/95 dark:bg-[#14202B]/95 p-2.5 shadow-[2px_3px_0_0_rgba(20,32,43,0.06)] dark:shadow-none backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-faint dark:text-white/45">
              {cfg.node1.tag}
            </div>
            <div className="mt-0.5 text-[12.5px] font-semibold text-ink dark:text-white/90 truncate">
              {cfg.node1.title}
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] text-ink-soft dark:text-white/40">
              {cfg.node1.subtext}
            </div>
          </div>

          {/* Node 2: VECTOR DB / Semantic Search */}
          <div className="relative z-10 w-[130px] rounded-[6px] border border-line-2 dark:border-white/10 bg-white/95 dark:bg-[#14202B]/95 p-2.5 shadow-[2px_3px_0_0_rgba(20,32,43,0.06)] dark:shadow-none backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-faint dark:text-white/45">
              {cfg.node2.tag}
            </div>
            <div className="mt-0.5 text-[12.5px] font-semibold text-ink dark:text-white/90 truncate">
              {cfg.node2.title}
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] text-ink-soft dark:text-white/40">
              {cfg.node2.subtext}
            </div>
          </div>

          {/* Node 3 (Active): LLM AGENT / Processing claude-3-sonnet */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 1px rgba(240, 83, 28, 0.35), 0 2px 10px rgba(240, 83, 28, 0.12)",
                "0 0 0 1.5px rgba(240, 83, 28, 0.85), 0 4px 18px rgba(240, 83, 28, 0.28)",
                "0 0 0 1px rgba(240, 83, 28, 0.35), 0 2px 10px rgba(240, 83, 28, 0.12)",
              ],
              borderColor: [
                "rgba(240, 83, 28, 0.45)",
                "rgba(240, 83, 28, 0.95)",
                "rgba(240, 83, 28, 0.45)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-[155px] rounded-[6px] border border-brand bg-white/95 dark:bg-[#1E1715]/95 p-3 shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center justify-between font-mono text-[9.5px] font-bold uppercase tracking-wider text-brand">
              <span>{cfg.node3.tag}</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            </div>

            {/* Title with 3 Animated Loading Dots */}
            <div className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink dark:text-white">
              <span>{cfg.node3.title}</span>
              <span className="flex items-center gap-0.5 ml-0.5">
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                  className="h-1 w-1 rounded-full bg-brand inline-block"
                />
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  className="h-1 w-1 rounded-full bg-brand inline-block"
                />
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  className="h-1 w-1 rounded-full bg-brand inline-block"
                />
              </span>
            </div>

            <div className="mt-1 font-mono text-[10px] font-medium text-brand">
              {cfg.node3.subtext}
            </div>
          </motion.div>

          {/* Node Cabang (Output): 3 Vertical Cards */}
          <div className="relative z-10 flex flex-col gap-2 w-[118px]">
            {cfg.branches.map((branch, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-[6px] border border-line-2 dark:border-white/10 bg-white/95 dark:bg-[#14202B]/95 px-2.5 py-1.5 shadow-[2px_3px_0_0_rgba(20,32,43,0.04)] dark:shadow-none backdrop-blur-sm transition-all hover:border-brand"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full animate-pulse",
                    branch.statusColor === "green"
                      ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                      : branch.statusColor === "yellow"
                      ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                      : "bg-brand shadow-[0_0_6px_rgba(240,83,28,0.5)]"
                  )}
                />
                <span className="text-[11px] font-medium text-ink dark:text-white/90 truncate">
                  {branch.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentPipelineFlow;

