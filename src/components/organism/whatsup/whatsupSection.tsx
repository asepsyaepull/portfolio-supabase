"use client";

import { motion } from "framer-motion";

export function WhatsupSection() {
  return (
    <section id="whatsup" className="py-20 md:py-28 bg-[#F4F1EA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[20px] bg-[#16150F] text-[#F4F1EA] px-6 py-14 sm:px-10 sm:py-16 md:p-20"
          style={{ boxShadow: "8px 8px 0 rgba(22,21,15,.15)" }}
        >
          {/* ambient accent glow (live var) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--accent)" }}
          />
          {/* faint dot grid inside panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(244,241,234,.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* STATEMENT.TXT label */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-[0.16em]"
              style={{ backgroundColor: "var(--accent)", color: "#FFFFFF" }}
            >
              ✦ WHAT&apos;S UP
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-[#B9B5A9]">
              STATEMENT.TXT
            </span>
          </div>

          {/* Giant statement — last word italic + live accent */}
          <h2 className="relative z-10 mt-10 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.02] tracking-tight max-w-5xl">
            Engineering products that make people stop and{" "}
            <em className="italic normal-case" style={{ color: "var(--accent)" }}>
              stare.
            </em>
          </h2>

          {/* Supporting line */}
          <p className="relative z-10 mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[#B9B5A9]">
            A high-craft blend of design systems, frontend architecture, and obsessive attention to visual details. That reaction is the whole job.
          </p>

          {/* Sign-off row */}
          <div className="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#3A3830] pt-6">
            <span className="font-mono text-xs font-bold tracking-wider text-[#F4F1EA]">
              Asep Syaepul · Since 2018
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-bold lowercase"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
                backgroundColor: "var(--accent-soft)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </span>
              available for projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhatsupSection;
