"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Waypoint } from "./workspace-types";

interface WorkspacePointerProps {
  waypoint: Waypoint;
  name?: string;
}

export function WorkspacePointer({
  waypoint,
  name = "Asep",
}: WorkspacePointerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      animate={{ left: waypoint.l, top: waypoint.t }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Figma style cursor SVG */}
      <svg
        width="16"
        height="20"
        viewBox="0 0 12 17"
        className="drop-shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M0 0L0 13 3.2 9.8 5.6 15 8 14 5.6 9 10 8.6Z"
          fill="var(--ink, #14202B)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
      </svg>
      {/* Name badge */}
      <span
        className="absolute left-3.5 top-3.5 whitespace-nowrap rounded-[3px] bg-ink px-2 py-0.5 font-mono text-[9.5px] font-bold text-white shadow-sm"
      >
        {name}
      </span>
    </motion.div>
  );
}
