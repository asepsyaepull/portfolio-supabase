"use client";

import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Animated dot-grid + floating particle canvas
   Always #F8FAFC background, orange on hover
───────────────────────────────────────────── */
export interface DotGridBackgroundProps {
  isFixed?: boolean;
  mode?: "fixed" | "sticky" | "absolute";
  className?: string;
  transparentBg?: boolean;
}

export function DotGridBackground({
  isFixed = true,
  mode,
  className = "",
  transparentBg = false,
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentMode = mode || (isFixed ? "fixed" : "absolute");
  const isSticky = currentMode === "sticky";
  const isFixedMode = currentMode === "fixed";
  const isViewportCanvas = isSticky || isFixedMode;

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
      canvas.width = isViewportCanvas
        ? window.innerWidth
        : parent
        ? parent.clientWidth
        : window.innerWidth;
      canvas.height = isSticky
        ? window.innerHeight + 160
        : isViewportCanvas
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
      if (isFixedMode) {
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

    const onScroll = () => {
      if (!isViewportCanvas && !prefersReducedMotion) {
        // Redraw on scroll for absolute canvas
        draw();
      }
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

      // 2. Batch-draw calm, static slate dot-grid with visible viewport culling
      ctx.fillStyle = DEFAULT_COLOR;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.beginPath();

      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const windowH = typeof window !== "undefined" ? window.innerHeight : 800;
      const minY = isViewportCanvas
        ? 0
        : Math.max(0, Math.floor((scrollY - 120) / SPACING) * SPACING);
      const maxY = isViewportCanvas
        ? canvas.height
        : Math.min(canvas.height, Math.ceil((scrollY + windowH + 120) / SPACING) * SPACING);

      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = minY; y <= maxY; y += SPACING) {
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
        const hoverMinY = Math.max(0, Math.floor((mouseY - HOVER_R) / SPACING) * SPACING);
        const hoverMaxY = Math.min(canvas.height, Math.ceil((mouseY + HOVER_R) / SPACING) * SPACING);

        for (let x = minX; x <= maxX; x += SPACING) {
          for (let y = hoverMinY; y <= hoverMaxY; y += SPACING) {
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const parent = canvas.parentElement;
    let resizeObserver: ResizeObserver | null = null;
    if (parent && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resize();
        draw();
      });
      resizeObserver.observe(parent);
    }

    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [currentMode, isViewportCanvas, isFixedMode]);

  return (
    <div
      className={className}
      style={{
        position: isSticky ? "sticky" : isFixedMode ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: isSticky ? "calc(100vh + 160px)" : "100%",
        marginBottom: isSticky ? "calc(-100vh - 160px)" : undefined,
        inset: isSticky ? undefined : 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        background: transparentBg ? "transparent" : "#F8FAFC",
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
