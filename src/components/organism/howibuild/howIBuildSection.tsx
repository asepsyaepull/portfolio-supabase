"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconSearch,
  IconPencilBolt,
  IconCode,
  IconRocket,
  IconRepeat,
} from "@tabler/icons-react";

const STEPS = [
  {
    n: "01",
    icon: IconSearch,
    label: "NGGAS",
    title: "Nggas & Riset",
    body: "Ngobrol santai dulu: goals, user, konteks bisnis. Gue riset kompetitor + pattern yang udah terbukti. Nol asumsi.",
    deliver: ["kickoff call", "competitor teardown", "success metrics"],
  },
  {
    n: "02",
    icon: IconPencilBolt,
    label: "DESIGN",
    title: "Wireframe → Hi-Fi",
    body: "Dari sketsa cepat ke mockup final di Figma. Lo lihat progres tiap fase — nggak ada kejutan di akhir.",
    deliver: ["wireframe", "hi-fi mockup", "interactive prototype"],
  },
  {
    n: "03",
    icon: IconCode,
    label: "BUILD",
    title: "Kode Production",
    body: "Desain gue hidupin sendiri: Next.js + TypeScript + Tailwind. Pixel-perfect, responsif, aksesibel — bukan hand-off, satu orang yang sama.",
    deliver: ["next.js build", "cms setup", "responsive qa"],
  },
  {
    n: "04",
    icon: IconRocket,
    label: "SHIP",
    title: "Launch & Ukur",
    body: "Deploy, Lighthouse hijau, monitoring pasca-launch. Desain yang bisa diukur itu desain yang selesai.",
    deliver: ["deploy", "lighthouse ≥ 95", "post-launch support"],
  },
];

export default function HowIBuildSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[var(--canvas)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5" ref={ref}>
        <p className="omd-frame-label mb-3">HOW-I-BUILD.FIG</p>
        <h2 className="font-display text-[clamp(38px,6vw,72px)] font-semibold leading-[1.02] tracking-tight text-[var(--ink)]">
          HOW I BUILD.
          <br />
          <span className="text-[var(--brand)]">NO MYSTERY.</span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-[15px] md:text-base text-[var(--ink-soft)]">
          Empat langkah, dari ngobrol pertama sampai live. Semua kelihatan,
          semua bisa lo ikuti.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
              className="omd-card relative flex flex-col p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                  <s.icon size={22} stroke={1.8} />
                </span>
                <span className="font-mono text-xs font-bold tracking-widest text-[var(--ink-faint)]">
                  {s.label}
                </span>
              </div>
              <p className="font-mono text-[11px] font-bold text-[var(--brand)]">
                STEP_{s.n}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                {s.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.deliver.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-[var(--line-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--ink-soft)]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[17px] top-1/2 hidden -translate-y-1/2 font-mono text-lg text-[var(--brand)] lg:block"
                >
                  →
                </span>
              )}
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-faint)]"
        >
          <IconRepeat size={14} /> iterate sampai “oh, ini dia” — revisi selalu
          bagian dari proses
        </motion.p>
      </div>
    </section>
  );
}
