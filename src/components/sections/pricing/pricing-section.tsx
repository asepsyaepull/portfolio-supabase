"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMinus, IconPlus, IconBolt } from "@tabler/icons-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { FrameLabel } from "@/components/ui/figma-tag";
import { Switch, OptionPill } from "@/components/ui/switch";

type ProjectType = "Landing Page" | "Full Website" | "App UI/UX";
type PageScope = "1–3 pages" | "4–8 pages" | "8+ pages";

const BASE_PRICE: Record<ProjectType, number> = {
  "Landing Page": 3.5,
  "Full Website": 8,
  "App UI/UX": 15,
};

const PAGE_ADDON: Record<PageScope, number> = {
  "1–3 pages": 0,
  "4–8 pages": 2,
  "8+ pages": 5,
};

const PROJECT_TYPES: ProjectType[] = ["Landing Page", "Full Website", "App UI/UX"];
const PAGE_SCOPES: PageScope[] = ["1–3 pages", "4–8 pages", "8+ pages"];

const fmtPrice = (n: number) => {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded.toFixed(1)}`;
};

export function PricingSection() {
  const [projectType, setProjectType] = useState<ProjectType>("Full Website");
  const [pageScope, setPageScope] = useState<PageScope>("4–8 pages");
  const [withDev, setWithDev] = useState(true);
  const [withCms, setWithCms] = useState(true);
  const [extraRevs, setExtraRevs] = useState(0);
  const [urgent, setUrgent] = useState(false);

  const price = useMemo(() => {
    const base = BASE_PRICE[projectType];
    const pages = PAGE_ADDON[pageScope];
    const dev = withDev ? Math.round(base * 0.5 * 10) / 10 : 0;
    const cms = withCms ? 1.5 : 0;
    const revs = extraRevs * 0.5;
    const rush = urgent ? Math.round((base + dev + cms) * 0.2 * 10) / 10 : 0;
    return Math.round((base + pages + dev + cms + revs + rush) * 10) / 10;
  }, [projectType, pageScope, withDev, withCms, extraRevs, urgent]);

  return (
    <section id="pricing" className="relative z-[1] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          tag="pricing.fig"
          title="Estimasi biaya."
          subtitle="Hitung sendiri — transparan sebelum kita ngobrol, tanpa “hubungi kami untuk harga”."
        />

        {/* Big white panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl"
        >
          <Card variant="white" className="p-6 md:p-10">
            {/* Panel frame label */}
            <div className="absolute -top-9 left-0 flex items-center gap-2 px-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                ▤ pricing.fig
              </span>
            </div>

            {/* Project type selector */}
            <div className="mb-8">
              <FrameLabel name="project-type.frame" withIcon className="mb-3" />
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <OptionPill
                    key={t}
                    active={projectType === t}
                    onClick={() => setProjectType(t)}
                  >
                    {t}
                  </OptionPill>
                ))}
              </div>
            </div>

            {/* Scope selector */}
            <div className="mb-8">
              <FrameLabel name="scope.frame" withIcon className="mb-3" />
              <div className="flex flex-wrap gap-2">
                {PAGE_SCOPES.map((s) => (
                  <OptionPill
                    key={s}
                    active={pageScope === s}
                    onClick={() => setPageScope(s)}
                  >
                    {s}
                  </OptionPill>
                ))}
              </div>
            </div>

            {/* Add-ons frame */}
            <div className="mb-9">
              <FrameLabel name="add-ons.frame" withIcon className="mb-3" />
              <div className="flex flex-col divide-y divide-line">
                {/* Development */}
                <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                  <div>
                    <p className="text-[14.5px] font-bold text-ink">
                      Development{" "}
                      <span className="font-normal text-ink-soft">
                        (Next.js/React)
                      </span>
                    </p>
                    <p className="font-mono mt-0.5 text-[11px] text-ink-faint">
                      +50% of design price
                    </p>
                  </div>
                  <Switch
                    checked={withDev}
                    onCheckedChange={() => setWithDev(!withDev)}
                    label="Toggle development"
                  />
                </div>

                {/* CMS */}
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-[14.5px] font-bold text-ink">
                      CMS &amp; SEO setup
                    </p>
                    <p className="font-mono mt-0.5 text-[11px] text-ink-faint">
                      +Rp 1.5jt
                    </p>
                  </div>
                  <Switch
                    checked={withCms}
                    onCheckedChange={() => setWithCms(!withCms)}
                    label="Toggle CMS & SEO"
                  />
                </div>

                {/* Extra revisions */}
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-[14.5px] font-bold text-ink">
                      Extra revision round
                    </p>
                    <p className="font-mono mt-0.5 text-[11px] text-ink-faint">
                      +Rp 500rb / round
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                      aria-label="Decrease revisions"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-line-2 text-ink-soft transition-colors hover:border-brand hover:text-brand"
                    >
                      <IconMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="heading-display w-4 text-center text-lg font-semibold text-ink">
                      {extraRevs}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                      aria-label="Increase revisions"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-line-2 text-ink-soft transition-colors hover:border-brand hover:text-brand"
                    >
                      <IconPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Urgent */}
                <div className="flex items-center justify-between gap-4 pt-3.5 last:pb-0">
                  <div>
                    <p className="text-[14.5px] font-bold text-ink">
                      Urgent delivery{" "}
                      <IconBolt className="-mt-0.5 inline h-3.5 w-3.5 text-brand" />
                    </p>
                    <p className="font-mono mt-0.5 text-[11px] text-ink-faint">
                      +20%, priority slot
                    </p>
                  </div>
                  <Switch
                    checked={urgent}
                    onCheckedChange={() => setUrgent(!urgent)}
                    label="Toggle urgent delivery"
                  />
                </div>
              </div>
            </div>

            {/* Price display */}
            <div className="border-t border-dashed border-line-dashed pt-7 text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                Estimated total
              </p>
              <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 overflow-hidden text-ink">
                <span className="heading-display text-3xl font-semibold">Rp</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={price}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="heading-display text-[clamp(52px,8vw,84px)] font-semibold leading-none tabular-nums"
                  >
                    {fmtPrice(price)}
                  </motion.span>
                </AnimatePresence>
                <span className="heading-display text-3xl font-semibold">jt</span>
                <span className="font-mono ml-1 text-[12px] font-bold lowercase text-ink-faint">
                  /start-from
                </span>
              </div>
              <p className="font-mono mt-3 text-[11px] text-ink-faint">
                {projectType} · {pageScope}
                {withDev ? " · with development" : " · design only"}
                {urgent ? " · urgent" : ""}
              </p>

              <Link
                href={`/contact?project=${encodeURIComponent(
                  projectType
                )}&price=${fmtPrice(price)}jt`}
                className="omd-btn-primary mt-6 w-full justify-center"
              >
                Start today → {fmtPrice(price)}jt
              </Link>
              <p className="font-mono mt-3 text-[11px] text-ink-faint">
                Tanpa biaya tersembunyi. Scope fixed.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Hourly note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Card variant="dashed" className="flex flex-col items-center gap-3 p-7 text-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
              Prefer hourly support?
            </p>
            <div className="flex items-baseline gap-2">
              <span className="heading-display text-3xl font-semibold text-ink">
                Rp 200rb
              </span>
              <span className="font-mono text-[12px] text-ink-faint">/ hour</span>
            </div>
            <p className="text-sm text-ink-soft">
              UX audits, design reviews, or small tasks — minimum 10 hours.
            </p>
            <Link href="/contact" className="omd-btn-ghost mt-1">
              Ask about hourly work
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
