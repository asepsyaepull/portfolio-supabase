"use client";

import { motion, useTransform, MotionValue, useSpring } from "framer-motion";
import React from "react";

interface GlobalScrollLinePathProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export function GlobalScrollLinePath({
  scrollYProgress,
  className = "",
}: GlobalScrollLinePathProps) {
  // Smoother scroll-linked progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0.02, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 0.6, 0.6, 0]);

  // Glow effect - amber amber that pulses with scroll
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 3000"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* ── Glow filter ── */}
        <defs>
          <filter id="amber-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="amber-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="16" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Base path (dim, always visible) ── */}
        <motion.path
          d="M 640 0
             C 700 150 800 300 876.605 450
             C 850 580 750 650 691.836 720
             C 630 800 700 900 800 950
             C 900 1000 1050 980 1100 1050
             C 1150 1120 1100 1220 1000 1280
             C 900 1340 750 1360 680 1450
             C 610 1540 600 1650 640 1750
             C 680 1850 800 1920 880 2010
             C 960 2100 980 2220 920 2320
             C 860 2420 720 2480 640 2580
             C 560 2680 520 2800 540 2920
             C 560 3000 600 3050 640 3100"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ── Animated amber fill path ── */}
        <motion.path
          d="M 640 0
             C 700 150 800 300 876.605 450
             C 850 580 750 650 691.836 720
             C 630 800 700 900 800 950
             C 900 1000 1050 980 1100 1050
             C 1150 1120 1100 1220 1000 1280
             C 900 1340 750 1360 680 1450
             C 610 1540 600 1650 640 1750
             C 680 1850 800 1920 880 2010
             C 960 2100 980 2220 920 2320
             C 860 2420 720 2480 640 2580
             C 560 2680 520 2800 540 2920
             C 560 3000 600 3050 640 3100"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#amber-glow)"
          style={{
            pathLength,
            opacity,
          }}
        />

        {/* ── Strong glow overlay ── */}
        <motion.path
          d="M 640 0
             C 700 150 800 300 876.605 450
             C 850 580 750 650 691.836 720
             C 630 800 700 900 800 950
             C 900 1000 1050 980 1100 1050
             C 1150 1120 1100 1220 1000 1280
             C 900 1340 750 1360 680 1450
             C 610 1540 600 1650 640 1750
             C 680 1850 800 1920 880 2010
             C 960 2100 980 2220 920 2320
             C 860 2420 720 2480 640 2580
             C 560 2680 520 2800 540 2920
             C 560 3000 600 3050 640 3100"
          stroke="rgba(245, 158, 11, 0.3)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#amber-glow-strong)"
          style={{
            pathLength,
            opacity: glowOpacity,
          }}
        />
      </svg>
    </div>
  );
}
