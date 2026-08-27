"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type Msg = {
  from: "you" | "asep";
  text: string;
  time: string;
  attach?: string;
  reaction?: string;
};

type Step = {
  label: string;
  msgs: Msg[];
};

const STEPS: Step[] = [
  {
    label: "01 · MULAI",
    msgs: [
      { from: "you", text: "Halo, ada slot buat project baru? Saya butuh redesign dashboard.", time: "09.02" },
      { from: "asep", text: "Ada, aman 👋 Ceritain dulu goals-nya — target user siapa, masalah utamanya apa.", time: "09.04" },
    ],
  },
  {
    label: "02 · KIRIM BRIEF",
    msgs: [
      {
        from: "you",
        text: "Ini brief-nya plus referensi visual. ada 3 flow utama yang perlu diperbaiki.",
        time: "09.15",
        attach: "project-brief.fig",
      },
      { from: "asep", text: "Sudah saya baca. Saya riset kompetitor dulu, lalu kirim wireframe hari ini.", time: "09.20" },
    ],
  },
  {
    label: "03 · REVISI",
    msgs: [
      {
        from: "asep",
        text: "Wireframe jadi. Cek alur checkout-nya — saya prioritaskan di sini.",
        time: "14.30",
        attach: "homepage-v1.png",
        reaction: "🔥 2",
      },
      { from: "you", text: "Oke arahnya bener. Tombol primary kecilin dikit, sama spacing antar section Longgarin.", time: "15.02", reaction: "👍 1" },
      { from: "asep", text: "Masuk. Revisi termasuk paket — saya update hari ini.", time: "15.05" },
    ],
  },
  {
    label: "04 · SHIP",
    msgs: [
      { from: "asep", text: "Sudah live. Lighthouse 98, semua flow tested. 🚀", time: "10.41" },
      { from: "you", text: "Keren. Next project langsung lanjut ya.", time: "10.44" },
    ],
  },
];

function Avatar({ from }: { from: "you" | "asep" }) {
  return (
    <span
      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold text-white ${
        from === "asep" ? "bg-brand" : "bg-ink"
      }`}
    >
      {from === "asep" ? "A" : "Y"}
    </span>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const mine = msg.from === "you";
  return (
    <div className={`flex gap-2.5 ${mine ? "flex-row-reverse" : ""}`}>
      <Avatar from={msg.from} />
      <div className={`max-w-[78%] ${mine ? "items-end text-right" : ""} flex flex-col`}>
        <div
          className={`inline-block rounded-2xl px-4 py-2.5 text-left text-[14.5px] leading-snug ${
            mine
              ? "rounded-tr-sm bg-ink text-white"
              : "rounded-tl-sm border border-line bg-[#F1F6FA] text-ink"
          }`}
        >
          {msg.text}
          {msg.attach && (
            <span
              className={`mt-2 flex w-fit items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-bold ${
                mine
                  ? "border-white/20 bg-white/10 text-white/90"
                  : "border-line-2 bg-white text-ink-soft"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              {msg.attach}
            </span>
          )}
        </div>
        <div className={`mt-1 flex items-center gap-2 ${mine ? "flex-row-reverse" : ""}`}>
          <span className="font-mono text-[10.5px] text-ink-faint">{msg.time}</span>
          {msg.reaction && (
            <span className="rounded-full border border-line bg-white px-1.5 py-px text-[11px]">
              {msg.reaction}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkflowSection() {
  let msgIndex = -1;

  return (
    <section id="process" className="relative z-[1] overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          tag="how-it-works.frame"
          title="No forms. No hoops. Just this."
          subtitle="Satu thread, langsung jalan. Begini workflow-nya dari awal sampai live."
        />

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <Card className="overflow-hidden !p-0">
            {/* Chat header */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 md:px-7">
              <div className="flex items-center gap-3">
                <span className="flex -space-x-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand text-[11px] font-bold text-white">
                    A
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink text-[11px] font-bold text-white">
                    Y
                  </span>
                </span>
                <span className="font-mono text-[13px] font-bold text-ink">
                  &lt;project-channel&gt;
                </span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink-soft">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(39,192,107,0.18)]" />
                3 online
              </span>
            </div>

            {/* Messages — staggered on inview */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.32 } } }}
              className="flex flex-col gap-4 bg-[#FAFCFE] px-5 py-7 md:px-7"
            >
              {STEPS.map((step) => (
                <div key={step.label}>
                  {/* Step divider */}
                  <div className="my-5 flex items-center gap-3 first:mt-0">
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                      {step.label}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <div className="flex flex-col gap-4">
                    {step.msgs.map((msg) => {
                      msgIndex += 1;
                      return (
                        <motion.div
                          key={`${step.label}-${msg.time}-${msgIndex}`}
                          variants={{
                            hidden: { opacity: 0, y: 16, scale: 0.98 },
                            show: { opacity: 1, y: 0, scale: 1 },
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                          <Bubble msg={msg} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Fake input */}
            <div className="flex items-center gap-3 border-t border-line px-5 py-3.5 md:px-7">
              <div className="flex-1 rounded-full border border-line-2 px-4 py-2.5 font-mono text-[12px] text-ink-faint">
                message &lt;project-channel&gt;
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default WorkflowSection;
