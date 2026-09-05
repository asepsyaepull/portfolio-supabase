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
import { useLanguage } from "@/context/language-context";

const CAPABILITY_ICONS: Record<string, React.ReactNode> = {
  "ui/ux": <IconPalette className="h-4 w-4" />,
  "web dev": <IconCode className="h-4 w-4" />,
  "prototyping": <IconMouse className="h-4 w-4" />,
  "design systems": <IconStack className="h-4 w-4" />,
  "motion": <IconSparkles className="h-4 w-4" />,
  "brand": <IconBrush className="h-4 w-4" />,
};

export function WhatsupSection() {
  const { t } = useLanguage();

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
          <FrameLabel name={t.whatsup.tag} className="mb-3 !text-brand" />
          <h2 className="heading-display text-section-headline font-semibold uppercase text-ink">
            {t.whatsup.headline}
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
                <FrameLabel name={t.whatsup.statementTag} className="!text-ink-faint" />
                <blockquote className="heading-display mt-8 text-2xl font-medium">
                  &ldquo;{t.whatsup.statementQuote}{" "}
                  <span className="text-brand">{t.whatsup.statementHighlight}</span>&rdquo;
                </blockquote>
              </div>
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
                  {t.whatsup.statementSince}
                </p>
                <div>
                  <StatusBadge status="available">{t.common.status.availableNow}</StatusBadge>
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
              <FrameLabel name={t.whatsup.metricsTag} className="!text-ink-faint" />
              <div className="mt-5 grid grid-cols-3 gap-4">
                {t.whatsup.metrics.map((m) => (
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
                  <FrameLabel name={t.whatsup.philosophyTag} className="!text-ink-faint" />
                  <IconQuote className="h-4 w-4 text-brand opacity-80" />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">
                  &ldquo;{t.whatsup.philosophyQuote}&rdquo;
                </p>
              </div>
              <FrameLabel name={t.whatsup.philosophyAuthor} className="mt-5 !text-ink-faint" />
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
              <FrameLabel name={t.whatsup.currentlyBuildingTag} className="!text-ink-faint" />
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
              <FrameLabel name={t.whatsup.capabilitiesTag} className="!text-ink-faint" />
              <div className="mt-5 flex flex-wrap gap-2.5">
                {t.whatsup.capabilities.map((cap) => (
                  <span
                    key={cap.label}
                    className="inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 font-mono text-[12px] font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    {CAPABILITY_ICONS[cap.label.toLowerCase()] || <IconBrush className="h-4 w-4" />}
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
                  <FrameLabel name={t.whatsup.locationTag} className="!text-ink-faint" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                    </span>
                    {t.whatsup.cityBadge}
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
                      {t.whatsup.baseStationTag}
                    </span>
                  </div>

                  <div className="relative p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-[14px] font-bold text-ink">
                          <IconMapPin className="h-4 w-4 text-brand" />
                          <span>{t.whatsup.locationTitle}</span>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-ink-soft">
                          {t.whatsup.coordinates}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                        <IconWorld className="h-3 w-3 text-tool" />
                        {t.common.status.remoteReady}
                      </span>
                    </div>

                    <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
                      {t.whatsup.locationDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Clock Footer */}
              <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                    {t.whatsup.localClockTag}
                  </p>
                  <p className="heading-display mt-0.5 text-2xl font-semibold tabular-nums text-ink md:text-3xl">
                    <LiveClock suffix="WIB" />
                  </p>
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
