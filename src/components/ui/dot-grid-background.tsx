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
    const BASE_R = 1.5;
    const HOVER_R = 100;
    const SCAN_DUR = 2500;
    const SCAN_PAUSE = 4000;
    const DEFAULT_COLOR = "rgba(148,163,184,0.4)";
    const ACTIVE_COLOR = "#ff5500";

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
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
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
        c.fillStyle = "rgba(249,115,22,0.15)";
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
      const n = isMobile ? 12 : 40;
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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      const loopTime = performance.now() % (SCAN_DUR + SCAN_PAUSE);
      const scanY = isMobile
        ? Math.min(loopTime / SCAN_DUR, 1) * (canvas.height + HOVER_R * 2) -
          HOVER_R
        : 0;

      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = 0; y < canvas.height; y += SPACING) {
          const dx = x - mouseX,
            dy = y - mouseY;
          const dist = isMobile
            ? Math.abs(y - scanY)
            : Math.sqrt(dx * dx + dy * dy);

          if (dist < HOVER_R) {
            const scale = 1 - dist / HOVER_R;
            ctx.fillStyle = ACTIVE_COLOR;
            ctx.shadowBlur = isMobile ? 0 : 15;
            ctx.shadowColor = isMobile ? "transparent" : "rgba(255,85,0,0.4)";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R + scale * (isMobile ? 2 : 3), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
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
