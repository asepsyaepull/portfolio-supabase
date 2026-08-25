"use client";

import { motion } from "framer-motion";
import { memo } from "react";

const FigmaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      d="M8 3a3 3 0 100 6h3V3H8zm0 6a3 3 0 000 6h3V9H8zm0 6a3 3 0 103 3v-3H8zm6-12v6h3a3 3 0 100-6h-3z"
      opacity=".95"
    />
  </svg>
);

const Hero = () => {
  return (
    <section className="relative z-[1] mx-auto w-full max-w-[1160px] px-6 pb-10 pt-16 md:pt-20">
      {/* Frame label */}
      <p className="figma-frame-label mb-2.5 flex items-center gap-2 font-display text-[13px] font-semibold text-[var(--accent)]">
        <FigmaIcon />
        Frame 01 — Hero
      </p>

      {/* Hero frame */}
      <div className="relative overflow-hidden rounded-[14px] border-[1.5px] border-[#D9D4C7] bg-white outline outline-[1.5px] outline-offset-5 outline-[var(--accent)]">
        {/* Selection chip */}
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-6 top-6 z-10 rounded-md bg-[var(--accent)] px-2.5 py-1 font-display text-xs font-semibold text-white md:right-7 md:top-7"
        >
          ⌘ selected · 1440 × 900
        </motion.span>

        <div className="p-8 sm:p-12 lg:p-16">
          {/* Availability badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#86EFAC] bg-[#DCFCE7] px-3.5 py-1.5 text-[13px] font-semibold text-[#166534]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            Available for fulltime &amp; freelance
          </div>

          {/* Display heading */}
          <h1 className="font-display font-bold uppercase leading-[1.02] tracking-tight text-[clamp(44px,7.5vw,88px)] text-[#16150F]">
            UI/UX Designer
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #16150F" }}
            >
              yang ngoding.
            </span>
            <br />
            Desain{" "}
            <span className="relative whitespace-nowrap text-[var(--accent)]">
              interaktif
              <svg
                className="absolute -bottom-1 left-0 h-[10px] w-full md:-bottom-1.5 md:h-[13px]"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10 Q 50 2 100 8 T 198 6"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            nya.
          </h1>

          {/* Sub copy */}
          <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-[#6E6A5E] md:text-[17px]">
            7+ tahun merancang &amp; membangun produk digital — dari ERP
            enterprise sampai mobile app redesign. Desain yang saya buat bukan
            cuma mockup: hidup di production, terukur, dan enak dipakai.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-xl border-[1.5px] border-[#16150F] bg-[#16150F] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[4px_4px_0_var(--accent)] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_var(--accent)]"
            >
              Lihat Karya
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2.5 rounded-xl border-[1.5px] border-[#16150F] bg-transparent px-6 py-3.5 text-[15px] font-semibold text-[#16150F] transition-colors duration-150 hover:bg-[var(--accent-soft)]"
            >
              Hitung Estimasi Proyek
            </a>
          </div>
        </div>

        {/* Collaborator cursor */}
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -30, 0], y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-14 hidden items-start gap-0.5 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] md:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B" stroke="#16150F" strokeWidth="1.5">
            <path d="M5 3l14 7-6 2-2 6z" />
          </svg>
          <span className="mt-3.5 rounded-[4px_10px_10px_10px] bg-[#F59E0B] px-2.5 py-0.5 font-display text-xs font-bold text-[#16150F]">
            Asep
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
