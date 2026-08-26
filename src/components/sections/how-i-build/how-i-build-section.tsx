"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconSearch,
  IconPencilBolt,
  IconCode,
  IconRocket,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";

type Phase = {
  n: string;
  phase: string;
  title: string;
  duration: string;
  body: string;
  deliver: string[];
  progress: number;
};

const PHASES: Phase[] = [
  {
    n: "01",
    phase: "DISCOVER",
    title: "Ngobrol & Riset",
    duration: "HARI 1–2",
    body: "Kita mulai dari goals, user, dan konteks bisnis. Saya riset kompetitor dan pattern yang sudah terbukti. Nol asumsi.",
    deliver: ["kickoff call", "competitor teardown", "success metrics"],
    progress: 15,
  },
  {
    n: "02",
    phase: "DESIGN",
    title: "Wireframe → Hi-Fi",
    duration: "HARI 3–7",
    body: "Dari sketsa cepat ke mockup final di Figma. Kamu lihat progres tiap fase — nggak ada kejutan di akhir.",
    deliver: ["wireframe", "hi-fi mockup", "interactive prototype"],
    progress: 45,
  },
  {
    n: "03",
    phase: "BUILD",
    title: "Kode Production",
    duration: "HARI 8–14",
    body: "Desain saya hidupkan sendiri: Next.js + TypeScript + Tailwind. Pixel-perfect, responsif, aksesibel — bukan handoff, satu orang yang sama.",
    deliver: ["next.js build", "cms setup", "responsive qa"],
    progress: 75,
  },
  {
    n: "04",
    phase: "SHIP",
    title: "Launch & Ukur",
    duration: "HARI 15+",
    body: "Deploy, Lighthouse hijau, monitoring pasca-launch. Desain yang bisa diukur itu desain yang selesai.",
    deliver: ["deploy", "lighthouse ≥ 95", "post-launch support"],
    progress: 100,
  },
];

const ICONS = [IconSearch, IconPencilBolt, IconCode, IconRocket];

export function HowIBuildSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const cardW = () =>
    (trackRef.current?.children[0] as HTMLElement)?.offsetWidth + 20 || 400;

  const scrollTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(PHASES.length - 1, i));
    trackRef.current?.scrollTo({
      left: clamped * cardW(),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / cardW());
      setActive(Math.max(0, Math.min(PHASES.length - 1, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5" ref={headRef}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            align="left"
            tag="PROCESS.TIMELINE"
            title={
              <>
                FROM BRIEF
                <br />
                TO <span className="text-brand">LIVE.</span>
              </>
            }
            subtitle="Timeline tipikal satu project. Geser buat lihat tiap fase — termasuk kapan kamu bakal lihat draft pertama."
            className="mb-0"
          />

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-ink-faint">
              {PHASES[active].n} / 04
            </span>
            <button
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              aria-label="Fase sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <IconChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollTo(active + 1)}
              disabled={active === PHASES.length - 1}
              aria-label="Fase berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Timeline track */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 py-6 -mx-2 -my-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PHASES.map((ph, i) => {
            const Icon = ICONS[i];
            const isActive = i === active;
            return (
              <article
                key={ph.n}
                className={`omd-card relative flex w-[85vw] shrink-0 snap-start flex-col p-6 transition-all duration-300 sm:w-[46%] lg:w-[31%] ${
                  isActive ? "ring-2 ring-brand ring-offset-2 ring-offset-canvas" : ""
                }`}
              >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-brand/10 text-brand"
                    }`}
                  >
                    <Icon size={22} stroke={1.8} />
                  </span>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-ink-faint">
                    {ph.duration}
                  </span>
                </div>

                <p
                  className={`font-mono text-xs font-bold tracking-widest ${
                    isActive ? "text-brand" : "text-ink-faint"
                  }`}
                >
                  PHASE_{ph.n} · {ph.phase}
                </p>
                <h3 className="heading-display mt-1 text-xl font-semibold text-ink md:text-2xl">
                  {ph.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {ph.body}
                </p>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                    <span>progress</span>
                    <span>{ph.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-grid">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${ph.progress}%` } : {}}
                      transition={{
                        delay: 0.3 + i * 0.15,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full ${
                        ph.progress === 100 ? "bg-emerald-500" : "bg-brand"
                      }`}
                    />
                  </div>
                </div>

                {/* Deliverables */}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {ph.deliver.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          {/* End cap */}
          <div className="flex w-[60vw] shrink-0 snap-start items-center justify-center sm:w-[40%] lg:w-[25%]">
            <p className="text-center font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-faint">
              — dan ulangi untuk
              <br />
              <span className="text-brand">project berikutnya.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HowIBuildSection;
