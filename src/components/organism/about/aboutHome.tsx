"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getSimpleIcon } from "@/lib/icon-mapper";
import type { Project, Skill } from "@/types/database";

const FigmaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 3a3 3 0 100 6h3V3H8zm0 6a3 3 0 000 6h3V9H8zm0 6a3 3 0 103 3v-3H8zm6-12v6h3a3 3 0 100-6h-3z" />
  </svg>
);

const STATS = [
  { big: "7+", cap: "tahun pengalaman" },
  { big: "30+", cap: "proyek selesai" },
  { big: "ERP · POS · Gov", cap: "domain yang dikuasai" },
  { big: "Figma → Code", cap: "end-to-end, satu orang" },
];

export default function AboutHome({ skills }: { skills?: Skill[] }) {
  return (
    <section id="about" className="relative z-[1] py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-[1160px] items-start gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Copy */}
        <div>
          <p className="omd-frame-label mb-2.5 flex items-center gap-2 font-display text-[13px] font-semibold text-[var(--brand)]">
            <FigmaIcon />
            Page 03 — Tentang
          </p>
          <h2 className="font-display text-[clamp(30px,4.5vw,46px)] font-bold leading-[1.1] tracking-tight text-[#16150F]">
            Desainer yang paham kode,
            <br />
            developer yang peduli desain.
          </h2>

          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#6E6A5E] md:text-base">
            <p>
              Gue <strong className="text-[#16150F]">Asep Syaepul</strong>,
              UI/UX designer sekaligus frontend developer, 7+ tahun.
              Spesialisasi gue:{" "}
              <strong className="text-[#16150F]">
                design systems, frontend architecture (React/Next.js/TypeScript),
                dan micro-interactions
              </strong>{" "}
              yang bikin produk kerasa hidup.
            </p>
            <p>
              Pernah ngurusin ERP enterprise, POS retail, sampai aplikasi pemerintah —
              jadi gue paham desain itu bukan cuma soal cantik, tapi soal{" "}
              <strong className="text-[#16150F]">
                bisa di-build tepat waktu, scalable, dan enak dipakai
              </strong>
              .
            </p>
          </div>

          {/* Skill icons (fallback handled by mapper default) */}
          {skills && skills.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {skills.map((s) => (
                <span
                  key={s.id}
                  title={s.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9D4C7] bg-white shadow-[3px_3px_0_rgba(22,21,15,0.08)] ${s.color_class ?? ""}`}
                >
                  {getSimpleIcon(s.icon_name, "h-5 w-5")}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3.5">
          {STATS.map((stat) => (
            <motion.div
              key={stat.cap}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[14px] border-[1.5px] border-[#16150F] bg-white p-5 shadow-[4px_4px_0_rgba(22,21,15,0.1)]"
            >
              <b className="mb-1 block font-display text-[26px] font-bold leading-tight tracking-tight text-[var(--brand)] lg:text-[30px]">
                {stat.big}
              </b>
              <span className="text-[13px] font-medium text-[#6E6A5E]">
                {stat.cap}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
