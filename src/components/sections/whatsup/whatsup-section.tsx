"use client";

import React from "react";
import {
  IconBrush,
  IconCode,
  IconMapPin,
  IconMouse,
  IconPalette,
  IconQuote,
  IconSparkles,
  IconStack,
  IconWorld,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { LiveClock } from "@/components/ui/live-clock";
import { StatusBadge } from "@/components/ui/badge";
import { FrameLabel } from "@/components/ui/figma-tag";

const CAPABILITIES = [
  { icon: <IconPalette className="h-4 w-4" />, label: "UI/UX" },
  { icon: <IconCode className="h-4 w-4" />, label: "Web Dev" },
  { icon: <IconMouse className="h-4 w-4" />, label: "Prototyping" },
  { icon: <IconStack className="h-4 w-4" />, label: "Design Systems" },
  { icon: <IconSparkles className="h-4 w-4" />, label: "Motion" },
  { icon: <IconBrush className="h-4 w-4" />, label: "Brand" },
];

export function WhatsupSection() {
  return (
    <section id="whatsup" className="relative z-[1] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <FrameLabel name="about-me.txt" className="mb-3 !text-brand" />
          <h2 className="heading-display text-section-headline font-semibold uppercase text-ink">
            What&apos;s Up
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* STATEMENT.TXT — dark card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Card variant="dark" className="flex h-full flex-col justify-between p-7 md:p-8">
              <div>
                <FrameLabel name="STATEMENT.TXT" className="!text-ink-faint" />
                <blockquote className="heading-display mt-8 text-2xl font-medium">
                  &ldquo;I&apos;m Asep Syaepul — an UI/UX & Frontend Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision. specialize in developing SaaS platforms, and interactive web experiences using technologies like {" "}
                  <span className="text-brand">Next.js, Node.js, and Three.js.</span>&rdquo;
                </blockquote>
              </div>
              <div className=" flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
                  ASEP SYAEPUL, SINCE 2019
                </p>
                <div>
                  <StatusBadge status="available">available now</StatusBadge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* METRICS */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="md:col-span-2"
          >
            <Card variant="white">
              <FrameLabel name="METRICS" className="!text-ink-faint" />
              <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  { to: 7, prefix: "", suffix: "+", label: "Tahun merancang produk" },
                  { to: 30, prefix: "", suffix: "+", label: "Project shipped ke production" },
                  { to: 24, prefix: "<", suffix: "H", label: "Waktu respons email & pesan" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="heading-display text-[clamp(30px,3.4vw,48px)] font-semibold leading-none text-ink">
                      <CountUp to={m.to} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* QUOTE / PHILOSOPHY */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <Card variant="white" className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <FrameLabel name="PHILOSOPHY.TXT" className="!text-ink-faint" />
                  <IconQuote className="h-4 w-4 text-brand opacity-80" />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">
                  &ldquo;Desain bukan hanya tentang tampilan yang memikat, tapi bagaimana ia bekerja — menjembatani empati pengguna dengan presisi kode.&rdquo;
                </p>
              </div>
              <FrameLabel name="— UI/UX & Creative Dev" className="mt-5 !text-ink-faint" />
            </Card>
          </motion.div>

          {/* CURRENTLY BUILDING IN */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <Card variant="white" className="h-full">
              <FrameLabel name="CURRENTLY BUILDING IN" className="!text-ink-faint" />
              <ul className="mt-5 flex flex-col gap-3">
                {["Figma", "Next.js", "Tailwind"].map((tool, i) => (
                  <li
                    key={tool}
                    className="flex items-center justify-between text-[15px] font-semibold text-ink"
                  >
                    {tool}
                    <span
                      className={`h-2 w-2 rounded-full ${
                        i === 0 ? "bg-brand" : i === 1 ? "bg-ink" : "bg-tool"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* CAPABILITIES */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card variant="white" className="h-full">
              <FrameLabel name="CAPABILITIES" className="!text-ink-faint" />
              <div className="mt-5 flex flex-wrap gap-2.5">
                {CAPABILITIES.map((cap) => (
                  <span
                    key={cap.label}
                    className="inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 font-mono text-[12px] font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    {cap.icon}
                    {cap.label}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* LOCATION & LIVE STUDIO TIME */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="md:col-span-2"
          >
            <Card variant="white" className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <FrameLabel name="LOCATION & TIMEZONE" className="!text-ink-faint" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                    </span>
                    JAKARTA, ID
                  </span>
                </div>

                {/* Location & Studio Terminal Widget */}
                <div className="mt-5 overflow-hidden rounded-xl border border-line-2 bg-gradient-to-br from-white to-[#F8FAFC]">
                  <div className="flex items-center justify-between border-b border-line bg-[#F1F6FA] px-3.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
                      <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
                      <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      BASE_STATION.GEO
                    </span>
                  </div>

                  <div className="relative p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-[14px] font-bold text-ink">
                          <IconMapPin className="h-4 w-4 text-brand" />
                          <span>Jakarta & Bandung, Indonesia</span>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-ink-soft">
                          6°12&apos;S 106°49&apos;E • UTC+07:00 (WIB)
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                        <IconWorld className="h-3 w-3 text-tool" />
                        REMOTE READY
                      </span>
                    </div>

                    <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
                      Working across time zones with async workflows and real-time collaboration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Clock Footer */}
              <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                    LOCAL STUDIO CLOCK
                  </p>
                  <p className="heading-display mt-0.5 text-2xl font-semibold tabular-nums text-ink md:text-3xl">
                    <LiveClock suffix="WIB" />
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-grid/60 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-live animate-pulse" />
                    ACTIVE NOW
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhatsupSection;
