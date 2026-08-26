"use client";

import { useEffect, useState } from "react";

/**
 * Scroll progress ruler — ala ohhmydesign top bar.
 * Tick marks + angka (100..1300) + garis progress yang terisi mengikuti scroll.
 */
export default function ScrollRuler() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 13 ticks desktop; 6 ticks mobile (200..1200 step 200) biar muat di 390px
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const TICKS = isMobile
    ? Array.from({ length: 6 }, (_, i) => (i + 1) * 200)
    : Array.from({ length: 13 }, (_, i) => (i + 1) * 100);
  const denom = TICKS[TICKS.length - 1];

  return (
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 z-[60] flex h-7 items-end justify-between border-b border-[#14202b12] bg-[#f4f4f0]/80 px-4 pb-1 backdrop-blur-sm md:h-8 md:px-6"
    >
      {/* progress fill */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--brand)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      {TICKS.map((t) => (
        <div key={t} className="flex flex-col items-center">
          <span className="font-mono text-[9px] font-bold leading-none tracking-wide text-[#14202b66]">
            {t}
          </span>
          <span
            className={`mt-0.5 w-px ${progress >= (t - TICKS[0] + 100) / denom ? "bg-[var(--brand)]" : "bg-[#14202b33]"}`}
            style={{ height: t % 500 === 0 ? 10 : 5 }}
          />
        </div>
      ))}
    </div>
  );
}
