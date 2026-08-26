"use client";

import { FigmaTag } from "@/components/ui/figma-tag";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo } from "react";

const TICKER_ITEMS = [
  "UI/UX",
  "NEXT.JS",
  "TYPESCRIPT",
  "FIGMA",
  "DESIGN SYSTEM",
  "SUPABASE",
  "MOTION",
];

export const HeroSection = () => {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const cx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const cy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  return (
    <section
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative z-[1] overflow-hidden bg-transparent"
    >

      <div className="relative mx-auto flex min-h-[90vh] max-w-[1280px] flex-col items-center justify-center px-6 pb-14 pt-20 text-center">
        {/* Status pill */}
        <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white/65 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(39,192,107,0.18)]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/80">
            Worked with enterprise &amp; startup teams
          </span>
        </div>

        {/* Headline wrapped in dashed Figma selection */}
        <span className="mb-12 inline-block font-mono text-sm md:text-md font-semibold uppercase tracking-[0.16em] text-ink/60">
          Hi! I'm Asep Syaepul
        </span>
        <div className="omd-sel relative px-5 py-4">
          <span className="omd-h tl" aria-hidden />
          <span className="omd-h tr" aria-hidden />
          <span className="omd-h bl" aria-hidden />
          <span className="omd-h br" aria-hidden />

          <FigmaTag variant="white" className="-top-9 -left-2">
            asep.fig
          </FigmaTag>
          <FigmaTag variant="blue" className="-bottom-9 -right-2">
            1440 × 900
          </FigmaTag>

          <h1 className="heading-display text-hero-headline font-bold uppercase text-brand">
            UI/UX Design
            <br />
            &amp;
            <span className="text-brand-deep">Developer.</span>
          </h1>
        </div>

        {/* Sub copy */}

        <p className="mt-12 max-w-3xl text-md leading-relaxed text-ink-soft md:text-lg">
          7+ tahun merancang dan membangun produk digital: ERP enterprise, POS retail, sampai mobile app. Bukan sekadar mockup — desain saya berjalan di production, terukur, dan dipakai pengguna nyata.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="mailto:mail.asepsyaepul@gmail.com?subject=Hiring%20inquiry"
            className="omd-btn-primary"
          >
            Hiring? Email saya
          </a>
          <a
            href="#work"
            className="omd-btn-ghost"
          >
            See the work
          </a>
        </div>
      </div>

      {/* Corner notes */}
      <p className="absolute bottom-24 left-8 hidden font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/60 md:block">
        Remote-first
        <br />
        Bekerja dari mana saja
      </p>
      <p className="absolute bottom-24 right-8 hidden text-right font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/60 md:block">
        Open to work — full-time &amp; project
        <br />
        Berbasis Jakarta (WIB) · respons &lt;24 jam
      </p>

      {/* Ticker marquee */}
      <div className="relative overflow-hidden border-y border-line-2 bg-white/45 py-4 backdrop-blur-sm">
        <div className="omd-track">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-[56px]"
              aria-hidden={dup === 1}
            >
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-[56px] whitespace-nowrap font-display text-2xl font-semibold text-ink/60"
                >
                  {item}
                  <span className="text-base text-brand">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Collaborator cursor — lerped follow, desktop only */}
      <motion.div
        aria-hidden="true"
        style={{ x: cx, y: cy }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#14202B"
          stroke="#fff"
          strokeWidth="1.5"
        >
          <path d="M5 3l14 7-6 2-2 6z" />
        </svg>
        <span className="absolute left-4 top-4 rounded-[5px] rounded-tl-none bg-ink px-2 py-0.5 font-mono text-[11px] font-bold text-white shadow-cursor">
          Asep
        </span>
      </motion.div>
    </section>
  );
};

export default memo(HeroSection);
