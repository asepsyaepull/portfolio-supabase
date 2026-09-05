"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconX,
  IconCheck,
  IconCopy,
  IconMinus,
  IconPlus,
  IconBolt,
  IconLock,
  IconLockOpen,
  IconMail,
  IconAdjustmentsHorizontal,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { FrameLabel, FigmaTag } from "@/components/ui/figma-tag";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export type ProjectType =
  | "Landing Page"
  | "Full Website"
  | "App UI/UX"
  | "Custom Dashboard / SaaS";

export type PageScope =
  | "1–3 Halaman"
  | "4–8 Halaman"
  | "9–15 Halaman"
  | "15+ Halaman";

const BASE_PRICE: Record<ProjectType, number> = {
  "Landing Page": 3.5,
  "Full Website": 8,
  "Custom Dashboard / SaaS": 12,
  "App UI/UX": 15,
};

const PAGE_ADDON: Record<PageScope, number> = {
  "1–3 Halaman": 0,
  "4–8 Halaman": 2,
  "9–15 Halaman": 5,
  "15+ Halaman": 8,
};

const PROJECT_TYPES: ProjectType[] = [
  "Landing Page",
  "Full Website",
  "App UI/UX",
  "Custom Dashboard / SaaS",
];

const PAGE_SCOPES: PageScope[] = [
  "1–3 Halaman",
  "4–8 Halaman",
  "9–15 Halaman",
  "15+ Halaman",
];

const fmtPrice = (n: number) => {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded.toFixed(1)}`;
};

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { t, locale } = useLanguage();
  const [projectType, setProjectType] = useState<ProjectType>("Full Website");
  const [pageScope, setPageScope] = useState<PageScope>("4–8 Halaman");
  const [withDev, setWithDev] = useState(true);
  const [withCms, setWithCms] = useState(true);
  const [withMotion, setWithMotion] = useState(true);
  const [extraRevs, setExtraRevs] = useState(0);
  const [urgent, setUrgent] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key press and lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Price Calculation
  const designPrice = useMemo(() => {
    const base = BASE_PRICE[projectType];
    const pages = PAGE_ADDON[pageScope];
    return Math.round((base + pages) * 10) / 10;
  }, [projectType, pageScope]);

  const price = useMemo(() => {
    const base = BASE_PRICE[projectType];
    const pages = PAGE_ADDON[pageScope];
    const dev = withDev ? Math.round(base * 0.5 * 10) / 10 : 0;
    const cms = withCms ? 1.5 : 0;
    const motionAddon = withMotion ? 1.5 : 0;
    const revs = extraRevs * 0.5;
    const subtotal = base + pages + dev + cms + motionAddon + revs;
    const rush = urgent ? Math.round(subtotal * 0.2 * 10) / 10 : 0;
    return Math.round((subtotal + rush) * 10) / 10;
  }, [projectType, pageScope, withDev, withCms, withMotion, extraRevs, urgent]);

  // Timeline estimation
  const timeline = useMemo(() => {
    let baseDays = 7;
    if (projectType === "Full Website") baseDays = 14;
    if (projectType === "Custom Dashboard / SaaS") baseDays = 21;
    if (projectType === "App UI/UX") baseDays = 28;

    if (pageScope === "4–8 Halaman") baseDays += 5;
    if (pageScope === "9–15 Halaman") baseDays += 10;
    if (pageScope === "15+ Halaman") baseDays += 16;

    if (withDev) baseDays += 7;
    if (urgent) baseDays = Math.max(5, Math.round(baseDays * 0.6));

    const dayUnit = locale === "en" ? "business days" : "hari kerja";
    return `${baseDays}–${baseDays + 5} ${dayUnit}`;
  }, [projectType, pageScope, withDev, urgent, locale]);

  // Summary Text for Email/Copy
  const summaryText = useMemo(() => {
    const s = t.pricing.summary;
    const formattedScope = pageScope.replace("Halaman", locale === "en" ? "Pages" : "Halaman");
    const yesText = locale === "en" ? "Yes (+Rp 1.5M)" : "Ya (+Rp 1.5jt)";
    const noText = locale === "en" ? "No" : "Tidak";

    return `${s.greeting}
• ${s.projectType}: ${projectType}
• ${s.pageScope}: ${formattedScope}
• ${s.package}: ${withDev ? s.packageDev : s.packageDesign}
• ${s.cmsSeo}: ${withCms ? yesText : noText}
• ${s.motion}: ${withMotion ? yesText : noText}
• ${s.extraRevs}: ${extraRevs} ${s.rounds} (+Rp ${extraRevs * 500}k)
• ${s.urgent}: ${urgent ? s.urgentYes : s.urgentRegular}
• ${s.timeline}: ${timeline}
• ${s.total}: Rp ${fmtPrice(price)}jt / start-from

${s.closing}`;
  }, [
    projectType,
    pageScope,
    withDev,
    withCms,
    withMotion,
    extraRevs,
    urgent,
    timeline,
    price,
    t,
    locale,
  ]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast.success(t.pricing.cta.copyToast);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(
      `${t.pricing.summary.emailSubject}: ${projectType} (${withDev ? "Design+Dev" : "Design Only"} ~Rp ${fmtPrice(price)}jt)`
    );
    const body = encodeURIComponent(summaryText);
    return `mailto:mail.asepsyaepul@gmail.com?subject=${subject}&body=${body}`;
  }, [projectType, withDev, price, summaryText, t]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c141c]/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Artboard with Slide Animation */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            initial={{ y: "100%", opacity: 0.7 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 32,
              stiffness: 320,
              mass: 0.95,
            }}
            className="omd-sel relative z-10 flex max-h-[94vh] sm:max-h-[92vh] w-full max-w-[960px] flex-col overflow-hidden rounded-t-[32px] sm:rounded-[36px] border border-white/40 bg-[#FFFFFF] text-ink shadow-[0_28px_80px_-20px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Figma Corner Handles */}
            <span className="omd-h tl hidden sm:block" aria-hidden />
            <span className="omd-h tr hidden sm:block" aria-hidden />
            <span className="omd-h bl hidden sm:block" aria-hidden />
            <span className="omd-h br hidden sm:block" aria-hidden />

            {/* Floating Top Tag */}
            <FigmaTag variant="blue" className="top-3 left-5 sm:left-7 z-20">
              {t.pricing.figmaTag}
            </FigmaTag>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal"
              className="absolute top-4 right-5 sm:right-7 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-ink hover:bg-black/20 transition-colors backdrop-blur-sm"
            >
              <IconX className="h-4 w-4" />
            </button>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 pt-14 sm:p-8 sm:pt-14 md:p-10 md:pt-14">
              {/* TOP SKY HERO BANNER */}
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-blue-200/60 bg-gradient-to-b from-[#589EF0] via-[#7BB3F6] to-[#A7D1FD] p-6 sm:p-8 md:p-10 text-ink shadow-sm">
                {/* Cloud shapes in background */}
                <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-85">
                  <div className="absolute -top-10 -left-10 h-44 w-72 rounded-full bg-white/70 blur-2xl" />
                  <div className="absolute top-4 left-1/3 h-36 w-80 rounded-full bg-white/80 blur-2xl" />
                  <div className="absolute -bottom-8 -right-10 h-52 w-96 rounded-full bg-white/90 blur-3xl" />
                  <div className="absolute bottom-2 left-10 h-28 w-60 rounded-full bg-white/60 blur-xl" />
                </div>

                {/* Banner Content Grid */}
                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  {/* Left Side: Big Price Typography */}
                  <div>
                    <div className="flex items-baseline gap-1 text-ink">
                      <span className="heading-display text-4xl sm:text-5xl font-bold text-[#F0531C]">
                        Rp
                      </span>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={price}
                          initial={{ y: 24, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -24, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                          }}
                          className="heading-display text-[clamp(48px,7vw,76px)] font-extrabold leading-none tracking-tight text-ink"
                        >
                          {fmtPrice(price)}
                        </motion.span>
                      </AnimatePresence>
                      <span className="heading-display text-2xl sm:text-3xl font-bold text-ink/80">
                        jt
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-ink/70">
                        {t.pricing.perProject}
                      </span>
                    </div>

                    {/* Subtitle / Package Tag */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs font-bold tracking-wider text-ink/80 uppercase">
                      <span>{withDev ? t.pricing.slider.designAndDev : t.pricing.slider.justDesign}</span>
                      <span>•</span>
                      <span>{t.pricing.fixedScope}</span>
                      <span className="text-ink/40 line-through">
                        Rp {fmtPrice(price * 1.35)}jt
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Badges, Bullets & Social Proof */}
                  <div className="flex flex-col items-start md:items-end gap-3">
                    {/* Founding Rate Pill */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1 text-xs font-medium text-ink shadow-sm backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-[#F0531C] animate-pulse" />
                      <span className="font-mono font-bold text-[11px]">
                        {urgent ? t.pricing.prioritySlot : t.pricing.specialRate}
                      </span>
                    </div>

                    {/* Check items */}
                    <ul className="space-y-1 text-right font-medium text-xs sm:text-[13px] text-ink/90">
                      <li className="flex items-center justify-end gap-2">
                        <span>{t.pricing.checkDirect}</span>
                        <IconCheck className="h-4 w-4 text-[#F0531C] shrink-0 stroke-[2.5]" />
                      </li>
                      <li className="flex items-center justify-end gap-2">
                        <span>{withDev ? t.pricing.checkDeliverablesWithDev : t.pricing.checkDeliverablesDesignOnly}</span>
                        <IconCheck className="h-4 w-4 text-[#F0531C] shrink-0 stroke-[2.5]" />
                      </li>
                      <li className="flex items-center justify-end gap-2">
                        <span>{t.pricing.checkTimelinePrefix} {timeline}</span>
                        <IconCheck className="h-4 w-4 text-[#F0531C] shrink-0 stroke-[2.5]" />
                      </li>
                    </ul>

                    {/* Social Proof Stack */}
                    <div className="mt-1 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px]">
                          🤩
                        </span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-[10px]">
                          👨‍💻
                        </span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px]">
                          🚀
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-soft">
                        {t.pricing.socialProofPrefix} <strong className="text-ink">{t.pricing.socialProofHighlight}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROJECT TYPE & SCOPE CUSTOMIZER TOOLBAR */}
              <div className="mt-7 rounded-2xl border border-line bg-zinc-50/80 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <FrameLabel
                    name={t.pricing.parametersTag}
                    withIcon
                    className="!text-ink-soft font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOptions(!showOptions)}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-brand hover:underline"
                  >
                    <IconAdjustmentsHorizontal className="h-3.5 w-3.5" />
                    {showOptions ? t.pricing.hideAdvanced : t.pricing.showAdvanced}
                  </button>
                </div>

                {/* Main Selectors: Project Type & Scope */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Type */}
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-faint block mb-1.5">
                      {t.pricing.projectTypeLabel}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setProjectType(t)}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 font-mono text-[12px] font-semibold transition-all",
                            projectType === t
                              ? "border-brand bg-brand text-white font-bold shadow-sm"
                              : "border-line bg-white text-ink hover:border-ink/40"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scope */}
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-faint block mb-1.5">
                      {t.pricing.pageScopeLabel}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PAGE_SCOPES.map((s) => {
                        const displayScope = s.replace("Halaman", locale === "en" ? "Pages" : "Halaman");
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setPageScope(s)}
                            className={cn(
                              "rounded-lg border px-3 py-1.5 font-mono text-[12px] font-semibold transition-all",
                              pageScope === s
                                ? "border-brand bg-brand text-white font-bold shadow-sm"
                                : "border-line bg-white text-ink hover:border-ink/40"
                            )}
                          >
                            {displayScope}
                            {PAGE_ADDON[s] > 0 && (
                              <span
                                className={cn(
                                  "ml-1 text-[10px]",
                                  pageScope === s ? "text-white/90" : "text-brand font-bold"
                                )}
                              >
                                +{PAGE_ADDON[s]}jt
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Collapsible Advanced Add-ons */}
                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* CMS */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-white">
                          <div>
                            <p className="text-xs font-bold text-ink">{t.pricing.addons.cmsTitle}</p>
                            <p className="font-mono text-[10px] text-ink-faint">{t.pricing.addons.cmsDesc}</p>
                          </div>
                          <Switch
                            checked={withCms}
                            onCheckedChange={() => setWithCms(!withCms)}
                            label="Toggle CMS"
                          />
                        </div>

                        {/* Motion */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-white">
                          <div>
                            <p className="text-xs font-bold text-ink">{t.pricing.addons.motionTitle}</p>
                            <p className="font-mono text-[10px] text-ink-faint">{t.pricing.addons.motionDesc}</p>
                          </div>
                          <Switch
                            checked={withMotion}
                            onCheckedChange={() => setWithMotion(!withMotion)}
                            label="Toggle Motion"
                          />
                        </div>

                        {/* Urgent */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-white">
                          <div>
                            <p className="text-xs font-bold text-ink flex items-center gap-1">
                              {t.pricing.addons.urgentTitle} <IconBolt className="h-3 w-3 text-brand" />
                            </p>
                            <p className="font-mono text-[10px] text-ink-faint">{t.pricing.addons.urgentDesc}</p>
                          </div>
                          <Switch
                            checked={urgent}
                            onCheckedChange={() => setUrgent(!urgent)}
                            label="Toggle Urgent"
                          />
                        </div>
                      </div>

                      {/* Extra revision counter */}
                      <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl border border-line bg-white">
                        <div>
                          <p className="text-xs font-bold text-ink">{t.pricing.addons.revisionsTitle}</p>
                          <p className="font-mono text-[10px] text-ink-faint">{t.pricing.addons.revisionsDesc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                            className="h-6 w-6 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-brand hover:text-brand"
                          >
                            <IconMinus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-sm font-bold w-4 text-center">{extraRevs}</span>
                          <button
                            type="button"
                            onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                            className="h-6 w-6 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-brand hover:text-brand"
                          >
                            <IconPlus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* INTERACTIVE SLIDER LEVER SECTION */}
              <div className="mt-8">
                {/* Labels above slider */}
                <div className="flex items-end justify-between px-2">
                  <div
                    onClick={() => setWithDev(false)}
                    className={cn(
                      "cursor-pointer transition-all",
                      !withDev ? "opacity-100" : "opacity-40 hover:opacity-75"
                    )}
                  >
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                      {t.pricing.slider.justDesign}
                    </p>
                    <p className="heading-display mt-0.5 text-lg font-bold text-ink">
                      Rp {fmtPrice(designPrice)}jt
                    </p>
                  </div>

                  <div
                    onClick={() => setWithDev(true)}
                    className={cn(
                      "cursor-pointer text-right transition-all",
                      withDev ? "opacity-100" : "opacity-40 hover:opacity-75"
                    )}
                  >
                    <div className="inline-flex rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                      {t.pricing.slider.mostPicked}
                    </div>
                    <p className="font-mono mt-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
                      {t.pricing.slider.designAndDev}
                    </p>
                    <p className="heading-display mt-0.5 text-lg font-bold text-[#F0531C]">
                      Rp {fmtPrice(price)}jt
                    </p>
                  </div>
                </div>

                {/* Dark Slider Track Container */}
                <div className="relative mt-3">
                  <div
                    onClick={() => setWithDev(!withDev)}
                    className="relative flex h-14 w-full cursor-pointer items-center justify-between rounded-full bg-[#182129] p-1.5 shadow-inner"
                  >
                    {/* Dashed Center Marker */}
                    <div className="pointer-events-none absolute inset-y-2 left-1/2 w-0 border-r border-dashed border-white/20 -translate-x-1/2" />

                    {/* Sliding Knob Button */}
                    <motion.div
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className={cn(
                        "relative z-10 flex h-11 w-20 sm:w-24 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-colors",
                        withDev ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div className="flex items-center gap-1 text-ink-soft">
                        <IconChevronLeft className="h-4 w-4" />
                        <IconChevronRight className="h-4 w-4" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating Figma "You" Cursor Badge */}
                  <motion.div
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className={cn(
                      "pointer-events-none absolute -bottom-5 sm:-bottom-6 z-20 flex items-center gap-1",
                      withDev ? "right-6 sm:right-8" : "left-6 sm:left-8"
                    )}
                  >
                    {/* Figma Cursor Triangle */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#0D99FF"
                      className="drop-shadow-sm -rotate-45"
                    >
                      <path d="M3 3l7 18 3-7 7-3L3 3z" />
                    </svg>
                    <span className="rounded-md bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
                      You
                    </span>
                  </motion.div>
                </div>

                {/* Subtitle Under Slider */}
                <p className="font-mono mt-7 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                  {t.pricing.slider.slideHint}
                </p>
              </div>

              {/* DELIVERABLES CHECKLIST GRID (3 COLUMNS) */}
              <div className="mt-9 space-y-7">
                {/* 1. Base Design Deliverables (Always Included) */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 text-left">
                  {t.pricing.deliverables.base.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-ink font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF1EB] text-[#F0531C]">
                        <IconCheck className="h-3.5 w-3.5 stroke-[2.5]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* 2. Divider Pill: DESIGN + DEV UNLOCKED */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setWithDev(!withDev)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all",
                      withDev
                        ? "border-[#F0531C]/40 bg-[#FFF5F0] text-[#F0531C] shadow-sm"
                        : "border-line bg-zinc-100 text-ink-faint hover:text-ink"
                    )}
                  >
                    {withDev ? (
                      <IconLockOpen className="h-3.5 w-3.5" />
                    ) : (
                      <IconLock className="h-3.5 w-3.5" />
                    )}
                    <span>{withDev ? t.pricing.divider.unlocked : t.pricing.divider.locked}</span>
                  </button>
                </div>

                {/* 3. Dev Capabilities & Engineering Deliverables */}
                <div
                  className={cn(
                    "grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 text-left transition-opacity duration-300",
                    withDev ? "opacity-100" : "opacity-35 pointer-events-none grayscale"
                  )}
                >
                  {t.pricing.deliverables.dev.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-ink font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF1EB] text-[#F0531C]">
                        <IconCheck className="h-3.5 w-3.5 stroke-[2.5]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM CTA BUTTON & ACTIONS */}
              <div className="mt-10 flex flex-col items-center justify-center border-t border-line pt-6 text-center">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
                  <a
                    href={mailtoUrl}
                    className="omd-btn-primary !w-full sm:!w-auto !px-9 !py-4 text-sm font-bold shadow-[0_12px_28px_-8px_#F0531C] !bg-[#F0531C] hover:!bg-[#D2410E] text-white"
                  >
                    <span>{t.pricing.cta.startPrefix} {fmtPrice(price)}jt</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="omd-btn-ghost !w-full sm:!w-auto !py-3.5 text-xs font-bold"
                  >
                    {copied ? (
                      <>
                        <IconCheck className="h-4 w-4 text-emerald-600" />
                        <span>{t.pricing.cta.copied}</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="h-4 w-4" />
                        <span>{t.pricing.cta.copyDetails}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-mono mt-4 text-[11px] text-ink-faint">
                  {t.pricing.cta.footnote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
