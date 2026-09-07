"use client";

import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { FrameLabel } from "@/components/ui/figma-tag";
import { useLanguage } from "@/context/language-context";
import {
  IconArrowsRightLeft,
  IconBrandFigma,
  IconBrandReact,
  IconBrush,
  IconCode,
  IconMouse,
  IconPalette,
  IconQuote,
  IconSparkles,
  IconStack
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

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
                    <p className="mt-1.5 font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft leading-tight">
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
            <Card variant="white" className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <FrameLabel name={t.whatsup.capabilitiesTag} className="!text-ink-faint" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                    {t.whatsup.capabilities.length} Core Disciplines
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {t.whatsup.capabilities.map((cap) => (
                    <span
                      key={cap.label}
                      className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white px-3.5 py-1.5 font-mono text-[12px] font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                    >
                      {CAPABILITY_ICONS[cap.label.toLowerCase()] || <IconBrush className="h-4 w-4" />}
                      {cap.label}
                    </span>
                  ))}
                </div>
              </div>

              {t.whatsup.capabilitiesSummary && (
                <div className="mt-5 border-t border-line pt-3">
                  <p className="text-[12.5px] leading-relaxed text-ink-soft">
                    {t.whatsup.capabilitiesSummary}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* DESIGN-TO-CODE BRIDGE (DUAL CRAFT) */}
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
                  <FrameLabel name={t.whatsup.bridgeTag} className="!text-ink-faint" />
                </div>

                <div className="mt-4">
                  <h3 className="heading-display text-lg font-bold tracking-tight text-ink md:text-xl">
                    {t.whatsup.bridgeTitle}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                    {t.whatsup.bridgeSubtitle}
                  </p>
                </div>

                {/* Streamlined Bridge Flow Bar */}
                <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-line-2 bg-[#F8FAFC] p-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#E9D5FF] bg-[#FAF5FF] text-[#7C3AED]">
                      <IconBrandFigma className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <span className="text-[12px] font-bold text-ink">
                        {t.whatsup.bridgeDesignTitle}
                      </span>
                      <span className="block font-mono text-[9.5px] text-ink-soft">
                        Tokens & Flow
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-brand">
                    <IconArrowsRightLeft className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]">
                      <IconBrandReact className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <span className="text-[12px] font-bold text-ink">
                        {t.whatsup.bridgeCodeTitle}
                      </span>
                      <span className="block font-mono text-[9.5px] text-ink-soft">
                        React & Next.js
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees / Metrics Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 font-mono text-[11px]">
                {t.whatsup.bridgeMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-center gap-1.5 text-ink-soft">
                    <span className="font-bold text-ink">{metric.value}</span>
                    <span className="text-[10px] uppercase text-ink-faint">{metric.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhatsupSection;
