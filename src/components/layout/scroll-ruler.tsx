"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useClock } from "@/hooks/use-clock";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Top canvas-based ruler bar indicating reading & scroll progress with live time.
 */
export function ScrollRuler() {
  const progress = useScrollProgress();
  const clock = useClock({ hour12: true });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const rulerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawRuler = useCallback(() => {
    const canvas = canvasRef.current;
    const container = rulerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const startVal = isMobile ? 200 : 100;
    const endVal = 1300;
    const majorStep = 100;
    const minorPerMajor = 10;
    const totalRange = endVal - startVal;

    const padL = 4;
    const padR = 4;
    const usableW = w - padL - padR;

    const majorH = isMobile ? 12 : 14;
    const midH = isMobile ? 8 : 10;
    const minorH = isMobile ? 5 : 6;
    const baseline = h;

    const tickDefault = "rgba(20, 32, 43, 0.25)";
    const tickActive = "rgba(20, 32, 43, 0.55)";
    const numDefault = "rgba(20, 32, 43, 0.35)";
    const progressColor = "#F0531C";

    const totalMinorTicks = (totalRange / majorStep) * minorPerMajor;

    for (let i = 0; i <= totalMinorTicks; i++) {
      const frac = i / totalMinorTicks;
      const x = padL + frac * usableW;
      const val = startVal + frac * totalRange;
      const isMajor = i % minorPerMajor === 0;
      const isMid = i % (minorPerMajor / 2) === 0 && !isMajor;

      let tickH = minorH;
      if (isMajor) tickH = majorH;
      else if (isMid) tickH = midH;

      const filled = frac <= progress;

      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, baseline);
      ctx.lineTo(Math.round(x) + 0.5, baseline - tickH);
      ctx.strokeStyle = filled ? progressColor : isMajor ? tickActive : tickDefault;
      ctx.lineWidth = isMajor ? 1.5 : 1;
      ctx.stroke();

      if (isMajor) {
        const label = Math.round(val).toString();
        ctx.font = `bold ${isMobile ? 8 : 9}px "Space Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = filled ? progressColor : numDefault;
        ctx.fillText(label, x, baseline - tickH - 3);
      }
    }

    const progressW = progress * usableW;
    if (progressW > 0) {
      ctx.save();
      ctx.globalAlpha = 0.09;
      ctx.fillStyle = progressColor;
      ctx.fillRect(padL, 0, progressW, h);
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(padL, baseline - 0.5);
      ctx.lineTo(padL + progressW, baseline - 0.5);
      ctx.strokeStyle = progressColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [progress, isMobile]);

  useEffect(() => {
    drawRuler();
    window.addEventListener("resize", drawRuler);
    return () => window.removeEventListener("resize", drawRuler);
  }, [drawRuler]);

  return (
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 z-[60] flex h-4 items-center overflow-hidden bg-white/90 md:h-8"
    >
      {/* Left: Brand tag */}
      <div className="flex shrink-0 items-center gap-1.5 pl-3 md:gap-2 md:pl-4">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink md:text-[11px]">
          A.SYA
        </span>
      </div>

      {/* Center: Ruler canvas */}
      <div ref={rulerRef} className="relative mx-2 flex-1 self-stretch md:mx-3">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Right: Live badge + time */}
      <div className="flex shrink-0 items-center gap-2 pr-3 md:gap-2.5 md:pr-4">
        <div className="flex items-center gap-1 rounded-full bg-ink/10 px-2 py-0.5 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/75 md:text-[10px]">
            LIVE
          </span>
        </div>

        <span className="hidden h-3 w-px bg-ink/15 md:inline-block" />

        <span className="hidden font-mono text-[10px] font-bold tabular-nums tracking-wider text-ink/60 md:inline-block">
          {clock}
        </span>
      </div>
    </div>
  );
}

export default ScrollRuler;
