"use client";

import React, { useCallback, useRef, useState } from "react";
import { FrameLabel } from "@/components/ui/figma-tag";

const COLORS = ["#F0531C", "#0D99FF", "#D2410E", "#14202B", "#AFD8F0", "#ffffff"];

type Confetto = {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  drift: number;
};

export function DropFunSection() {
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [pokes, setPokes] = useState(0);
  const idRef = useRef(0);

  const handlePoke = useCallback(() => {
    setPokes((n) => n + 1);
    const batch: Confetto[] = Array.from({ length: 12 }, () => {
      idRef.current += 1;
      return {
        id: idRef.current,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        drift: Math.round((Math.random() - 0.5) * 160),
      };
    });
    setConfetti((prev) => [...prev.slice(-60), ...batch]);

    // Cleanup after fall+fade completes
    const ids = new Set(batch.map((b) => b.id));
    setTimeout(() => {
      setConfetti((prev) => prev.filter((c) => !ids.has(c.id)));
    }, 2400);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-28 text-center">
      <FrameLabel name="dropfun.frame" className="mb-4" />
      <h2 className="heading-display mx-auto max-w-4xl text-[clamp(30px,5vw,58px)] font-bold uppercase leading-[1.05] text-ink">
        This button does absolutely nothing
      </h2>

      <div className="relative mt-10 inline-block">
        <button
          type="button"
          onClick={handlePoke}
          className="omd-btn-primary text-base"
        >
          Poke it anyway
        </button>

        {/* Confetti layer */}
        {confetti.map((c) => (
          <span
            key={c.id}
            aria-hidden
            className="omd-confetto pointer-events-none absolute top-0 block rounded-[2px]"
            style={
              {
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 0.6,
                background: c.color,
                "--drift": `${c.drift}px`,
                animationDelay: `${c.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink-faint">
        poked {pokes} times
      </p>
    </section>
  );
}

export default DropFunSection;
