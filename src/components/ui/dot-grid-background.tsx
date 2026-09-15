"use client";

import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Animated dot-grid + floating particle canvas
   Always #F8FAFC background, orange on hover
───────────────────────────────────────────── */
export interface DotGridBackgroundProps {
  isFixed?: boolean;
  className?: string;
}

export function DotGridBackground({
  isFixed = true,
  className = "",
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isMobile = false;

    const SPACING = 30;
    const BASE_R = 1.4;
    const HOVER_R = 90;
    const DEFAULT_COLOR = "rgba(148, 163, 184, 0.35)";
    const ACTIVE_COLOR = "#F0531C"; // Signature Flame Orange token

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 0;
      constructor(w: number, h: number) {
        this.reset(w, h);
      }
      reset(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8;
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = "rgba(240, 83, 28, 0.10)";
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = isFixed
        ? window.innerWidth
        : parent
        ? parent.clientWidth
        : window.innerWidth;
      canvas.height = isFixed
        ? window.innerHeight
        : parent
        ? parent.clientHeight
        : window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 10 : 35;
      for (let i = 0; i < n; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (isFixed) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      } else {
        const r = canvas.getBoundingClientRect();
        mouseX = e.clientX - r.left;
        mouseY = e.clientY - r.top;
      }
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw subtle ambient floating specks
      if (!prefersReducedMotion) {
        particles.forEach((p) => {
          p.update(canvas.width, canvas.height);
          p.draw(ctx);
        });
      }

      // 2. Batch-draw calm, static slate dot-grid (fast single path call)
      ctx.fillStyle = DEFAULT_COLOR;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = 0; y < canvas.height; y += SPACING) {
          // On desktop, skip dots within cursor hover radius so they can be highlighted
          if (!isMobile && mouseX >= 0 && mouseY >= 0) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            if (dx * dx + dy * dy < HOVER_R * HOVER_R) {
              continue;
            }
          }
          ctx.moveTo(x + BASE_R, y);
          ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 3. Desktop only: interactive hover highlight strictly around cursor
      // (Never on mobile, avoiding distracting automatic scanning lines)
      if (!isMobile && mouseX >= 0 && mouseY >= 0) {
        const minX = Math.max(0, Math.floor((mouseX - HOVER_R) / SPACING) * SPACING);
        const maxX = Math.min(canvas.width, Math.ceil((mouseX + HOVER_R) / SPACING) * SPACING);
        const minY = Math.max(0, Math.floor((mouseY - HOVER_R) / SPACING) * SPACING);
        const maxY = Math.min(canvas.height, Math.ceil((mouseY + HOVER_R) / SPACING) * SPACING);

        for (let x = minX; x <= maxX; x += SPACING) {
          for (let y = minY; y <= maxY; y += SPACING) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const distSq = dx * dx + dy * dy;
            if (distSq < HOVER_R * HOVER_R) {
              const dist = Math.sqrt(distSq);
              const scale = 1 - dist / HOVER_R;
              const opacity = 0.12 + scale * 0.4;
              ctx.fillStyle = `rgba(240, 83, 28, ${opacity.toFixed(2)})`;
              ctx.shadowBlur = 6 * scale;
              ctx.shadowColor = `rgba(240, 83, 28, ${(scale * 0.2).toFixed(2)})`;
              ctx.beginPath();
              ctx.arc(x, y, BASE_R + scale * 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, [isFixed]);

  return (
    <div
      className={className}
      style={{
        position: isFixed ? "fixed" : "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#F8FAFC",
        colorScheme: "light",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Soft slate glow — top-left */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: "rgba(203,213,225,0.4)",
          filter: "blur(120px)",
          borderRadius: "9999px",
        }}
      />
      {/* Soft slate glow — bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "40%",
          height: "40%",
          background: "rgba(203,213,225,0.4)",
          filter: "blur(120px)",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
}

export default DotGridBackground;
