"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconLayoutGrid,
  IconCode,
  IconComponents,
  IconSparkles,
  IconBrandReact,
  IconGauge,
  IconArrowUpRight,
  IconQuote,
  IconDeviceDesktop,
} from "@tabler/icons-react";

export function WhatsupSection() {
  return (
    <section
      id="whatsup"
      className="py-24 md:py-32 bg-zinc-50 dark:bg-[#08080a] text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-zinc-200/80 dark:border-zinc-900"
    >
      {/* Background Subtle Dot Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">
              What&apos;s up
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.95]">
            Engineering products that make people stop and{" "}
            <span className="text-lime-600 dark:text-lime-400 italic font-serif lowercase">
              stare.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A high-craft blend of design systems, frontend architecture, and
            obsessive attention to visual details.
          </p>
        </div>

        {/* Bento Grid (12-column layout inspired by OhhMyDesign) */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* ─────────────────────────────────────────────────────────────
              CELL 1: STATEMENT CARD (7 cols, 2 rows)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative md:col-span-6 lg:col-span-7 lg:row-span-2 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 md:p-10 shadow-xl flex flex-col justify-between overflow-hidden hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Corner Figma Registration Handles */}
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />

            {/* Figma Selection Tab */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800">
              STATEMENT.TXT
            </div>

            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 bg-lime-500/10 dark:bg-lime-500/5 rounded-full blur-3xl" />

            <div className="space-y-6 pt-4 sm:pt-2 relative z-10">
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center">
                <IconQuote className="w-5 h-5" />
              </div>

              {/* Big Statement Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
                I build digital products that make people stop and ask,{" "}
                <span className="text-lime-600 dark:text-lime-400 italic font-serif">
                  who built that?
                </span>
              </h3>

              {/* Sub-statement */}
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal">
                That reaction is the whole job. Over <strong>7+ years</strong>{" "}
                bridging UX architecture, design system precision, and
                high-performance frontend code for companies that refuse to look
                generic. No templates, ever.
              </p>
            </div>

            {/* Footer Sign-off */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-zinc-800/80 mt-8 relative z-10">
              <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Asep Syaepul · Since 2018
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-lime-700 dark:text-lime-400 bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-ping" />
                available for projects
              </span>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              CELL 2: METRICS CARD (5 cols)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative md:col-span-6 lg:col-span-5 rounded-2xl sm:rounded-3xl bg-zinc-900 dark:bg-[#0c0c0e] text-white border border-zinc-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Top Label */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                METRICS
              </span>
              <span className="font-mono text-[10px] text-lime-400">01 // STATS</span>
            </div>

            {/* Stat Rows */}
            <div className="divide-y divide-zinc-800/80 my-2">
              <div className="flex items-baseline justify-between py-3 sm:py-4">
                <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                  07<span className="text-lime-400">+</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 text-right">
                  Years of Experience
                </span>
              </div>

              <div className="flex items-baseline justify-between py-3 sm:py-4">
                <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                  40<span className="text-lime-400">+</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 text-right">
                  Shipped Projects
                </span>
              </div>

              <div className="flex items-baseline justify-between py-3 sm:py-4">
                <span className="font-mono text-3xl sm:text-4xl font-black text-lime-400 tracking-tight">
                  100<span className="text-xs text-zinc-400 font-sans">%</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 text-right">
                  Pixel Precision & Craft
                </span>
              </div>
            </div>

            <div className="pt-2 text-right font-mono text-[10px] text-zinc-500">
              VERIFIED PORTFOLIO METRICS
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              CELL 3: CAPABILITIES CARD (5 cols)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative md:col-span-6 lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Top Label */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                CAPABILITIES
              </span>
              <span className="font-mono text-[10px] text-lime-600 dark:text-lime-400">
                02 // DOMAINS
              </span>
            </div>

            {/* Interactive Capability Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 py-4">
              <SkillChip
                icon={<IconLayoutGrid className="w-4 h-4" />}
                label="UI/UX Design"
              />
              <SkillChip
                icon={<IconCode className="w-4 h-4" />}
                label="Frontend Architecture"
              />
              <SkillChip
                icon={<IconComponents className="w-4 h-4" />}
                label="Design Systems"
              />
              <SkillChip
                icon={<IconSparkles className="w-4 h-4" />}
                label="Motion & Interactions"
              />
              <SkillChip
                icon={<IconBrandReact className="w-4 h-4" />}
                label="React & Next.js"
              />
              <SkillChip
                icon={<IconGauge className="w-4 h-4" />}
                label="Performance & CWV"
              />
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              <span>Full-Stack UI Specialist</span>
              <span className="text-lime-600 dark:text-lime-400 font-bold">● Active</span>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              CELL 4: LIVE FIGMA STAGE CARD (4 cols)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative md:col-span-6 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-[#090e17] text-white border border-zinc-800 p-5 sm:p-6 shadow-xl overflow-hidden min-h-[220px] flex flex-col justify-between hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Dot Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/30">
                <IconDeviceDesktop className="w-3 h-3" />
                hero.frame
              </span>
              <span className="font-mono text-[9px] text-zinc-500">480 × 320</span>
            </div>

            {/* Animated Interactive Figma Artboard Canvas */}
            <div className="relative my-3 p-4 rounded-xl bg-[#131d2e] border border-lime-500/40 shadow-lg relative overflow-hidden group-hover:border-lime-400 transition-colors">
              {/* Corner Figma Selection Points */}
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-lime-500 rounded-sm" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-lime-500 rounded-sm" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-lime-500 rounded-sm" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-lime-500 rounded-sm" />

              {/* Floating Figma Cursor */}
              <motion.div
                animate={{
                  x: [0, 60, 20, 0],
                  y: [0, 15, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-3 right-6 z-20 pointer-events-none flex items-start gap-1"
              >
                <svg
                  className="w-4 h-4 text-lime-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] fill-lime-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3l14 7-6 2-2 6z" stroke="#000" strokeWidth="1.2" />
                </svg>
                <span className="bg-lime-500 text-zinc-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                  Asep.fig
                </span>
              </motion.div>

              {/* Mini Artboard Content */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  Next.js 15
                </div>
                <div className="text-lg font-black text-white leading-none tracking-tight">
                  Build <span className="text-lime-400">bold.</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-lime-400 pt-1">
                  <span>Interactive UI</span>
                  <IconArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 relative z-10">
              <span className="uppercase tracking-widest">DESIGNED LIVE</span>
              <span className="text-lime-400 font-bold">Figma ↔ Code</span>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              CELL 5: CURRENTLY BUILDING IN (4 cols)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="group relative md:col-span-6 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Top Label */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-lime-600 dark:text-lime-400">▶</span> CURRENT STACK
              </span>
              {/* Equalizer Wave Animation */}
              <div className="flex items-end gap-[3px] h-4">
                <motion.span
                  animate={{ height: ["4px", "16px", "6px", "14px", "4px"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[3px] bg-lime-500 rounded-full"
                />
                <motion.span
                  animate={{ height: ["12px", "4px", "16px", "8px", "12px"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-[3px] bg-lime-500 rounded-full"
                />
                <motion.span
                  animate={{ height: ["6px", "16px", "8px", "16px", "6px"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="w-[3px] bg-lime-500 rounded-full"
                />
                <motion.span
                  animate={{ height: ["14px", "8px", "16px", "4px", "14px"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  className="w-[3px] bg-lime-500 rounded-full"
                />
              </div>
            </div>

            {/* Core Tech Text */}
            <div className="my-3">
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                Next.js 15 & React 19
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Optimistic UI, Server Components & Fluid Motion
              </p>
            </div>

            {/* Tool Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["TypeScript", "TailwindCSS", "Supabase", "Motion"].map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              CELL 6: PHILOSOPHY CARD (4 cols)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative md:col-span-12 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-300"
          >
            {/* Top Label with Stars */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                PHILOSOPHY
              </span>
              <div className="text-lime-500 text-xs tracking-widest">★★★★★</div>
            </div>

            {/* Quote Body */}
            <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed my-3 italic">
              &ldquo;Design without engineering is just decoration. Engineering
              without design is just utility. The magic happens when both speak
              the exact same language.&rdquo;
            </p>

            {/* Author Footer */}
            <div className="pt-2 flex items-center gap-2.5 border-t border-zinc-100 dark:border-zinc-800/60">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Asep Syaepul
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  Design Technologist
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhatsupSection;

/* ─────────────────────────────────────────────────────────────
   Micro Component: Capability Skill Chip with interactive hover
   ───────────────────────────────────────────────────────────── */
function SkillChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-lime-500 hover:bg-lime-500 hover:text-zinc-950 dark:hover:bg-lime-500 dark:hover:text-zinc-950 transition-all duration-200 cursor-default shadow-sm group/chip">
      <span className="text-lime-600 dark:text-lime-400 group-hover/chip:text-zinc-950 transition-colors">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}
