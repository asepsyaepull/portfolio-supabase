"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCheck,
  IconCopy,
  IconMinus,
  IconPlus,
  IconBolt,
  IconAdjustmentsHorizontal,
  IconClock,
  IconSparkles,
  IconArrowRight,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconLayoutDashboard,
  IconBrowser,
} from "@tabler/icons-react";
import { toast } from "sonner";
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

const PROJECT_TYPES: {
  type: ProjectType;
  icon: React.ElementType;
  tagId: string;
  tagEn: string;
  descId: string;
  descEn: string;
}[] = [
  {
    type: "Landing Page",
    icon: IconBrowser,
    tagId: "Single Page",
    tagEn: "Single Page",
    descId: "Halaman konversi produk, marketing & peluncuran cepat",
    descEn: "High-converting single product or campaign page",
  },
  {
    type: "Full Website",
    icon: IconDeviceDesktop,
    tagId: "Multi-Page",
    tagEn: "Multi-Page",
    descId: "Situs korporat / produk multi-halaman komprehensif",
    descEn: "Comprehensive multi-page corporate or product site",
  },
  {
    type: "App UI/UX",
    icon: IconDeviceMobile,
    tagId: "Mobile App",
    tagEn: "Mobile App",
    descId: "Desain sistem antarmuka aplikasi iOS & Android",
    descEn: "End-to-end iOS & Android mobile interface design",
  },
  {
    type: "Custom Dashboard / SaaS",
    icon: IconLayoutDashboard,
    tagId: "Web Platform",
    tagEn: "Web Platform",
    descId: "Portal data, web application & sistem dashboard",
    descEn: "Complex data dashboards, portals & web platforms",
  },
];

const PAGE_SCOPES: PageScope[] = [
  "1–3 Halaman",
  "4–8 Halaman",
  "9–15 Halaman",
  "15+ Halaman",
];

export interface AppliedEstimateData {
  projectType: ProjectType;
  pageScope: PageScope;
  withDev: boolean;
  withCms: boolean;
  withMotion: boolean;
  extraRevs: number;
  urgent: boolean;
  timeline: string;
  summaryText: string;
}

interface ProjectEstimatorTabProps {
  onApplyEstimate: (data: AppliedEstimateData) => void;
}

export function ProjectEstimatorTab({ onApplyEstimate }: ProjectEstimatorTabProps) {
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

  // Delivery package change handler
  const handleSelectPackage = (dev: boolean) => {
    setWithDev(dev);
    if (!dev) {
      setWithCms(false);
      setWithMotion(false);
    } else {
      setWithCms(true);
      setWithMotion(true);
    }
  };

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

  // Formatted summary without raw prices (pure RFP)
  const summaryText = useMemo(() => {
    const formattedScope = pageScope.replace("Halaman", locale === "en" ? "Pages" : "Halaman");
    const yesText = locale === "en" ? "Yes" : "Ya";
    const noText = locale === "en" ? "No" : "Tidak";

    return `${locale === "id" ? "Halo Asep, saya ingin mengajukan kebutuhan proyek dengan rincian berikut:" : "Hi Asep, I would like to inquire about a project with the following requirements:"}

• ${locale === "id" ? "Tipe Proyek" : "Project Type"}: ${projectType}
• ${locale === "id" ? "Skala Halaman" : "Page Scope"}: ${formattedScope}
• ${locale === "id" ? "Paket Layanan" : "Package"}: ${withDev ? (locale === "id" ? "Desain Figma + Kode Frontend (Next.js & Tailwind)" : "Figma Design + Frontend Code (Next.js & Tailwind)") : (locale === "id" ? "Hanya Desain Figma (Tokens & Prototype)" : "Figma Design Only")}
${withDev ? `• ${locale === "id" ? "Integrasi CMS" : "CMS Integration"}: ${withCms ? yesText : noText}
• ${locale === "id" ? "Animasi & Interaktivitas" : "Motion & Animations"}: ${withMotion ? yesText : noText}\n` : ""}${extraRevs > 0 ? `• ${locale === "id" ? "Revisi Tambahan" : "Extra Revisions"}: ${extraRevs} ${locale === "id" ? "putaran" : "rounds"}\n` : ""}${urgent ? `• ${locale === "id" ? "Slot Prioritas Express" : "Express Priority SLA"}: ${locale === "id" ? "Ya (Fast-track)" : "Yes (Fast-track)"}\n` : ""}• ${locale === "id" ? "Estimasi Durasi Pengerjaan" : "Estimated Timeline"}: ${timeline}

• ${locale === "id" ? "Permintaan Penawaran" : "Quotation Request"}: ${locale === "id" ? "Mohon kirimkan estimasi investasi & proposal resmi ke email balasan saya." : "Please send the official investment proposal and breakdown to my email reply."}

${locale === "id" ? "Catatan Tambahan & Detail Kebutuhan:" : "Additional Project Notes & Goals:"}
(Tuliskan visi produk, target peluncuran, atau referensi desain Anda di sini...)`;
  }, [projectType, pageScope, withDev, withCms, withMotion, extraRevs, urgent, timeline, locale]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast.success(locale === "id" ? "Rincian kebutuhan proyek berhasil disalin!" : "Project requirements copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = () => {
    onApplyEstimate({
      projectType,
      pageScope,
      withDev,
      withCms: withDev ? withCms : false,
      withMotion: withDev ? withMotion : false,
      extraRevs,
      urgent,
      timeline,
      summaryText,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP BESPOKE PROPOSAL TICKET HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 via-zinc-100/50 to-brand/10 dark:from-brand/10 dark:via-zinc-900/60 dark:to-brand/5 p-4 sm:p-5 backdrop-blur-md shadow-sm">

        {/* Middle: Title & Narrative */}
        <div className="space-y-1">
          <h3 className="heading-display text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {locale === "id" ? "Kalkulator Kebutuhan & Penawaran Proyek" : "Custom Project Scope & Quotation"}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            {locale === "id"
              ? "Pilih spesifikasi teknis di bawah. Rincian penawaran biaya resmi & estimasi timeline dikirimkan langsung ke email Anda."
              : "Select your project specifications below. Official investment breakdown and timeline proposal will be sent directly to your reply email."}
          </p>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-3.5 pt-3 border-t border-brand/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <IconClock className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                {locale === "id" ? "Estimasi Durasi:" : "Est. Timeline:"}
              </span>
              <strong className="text-zinc-900 dark:text-white text-xs">
                {timeline}
              </strong>
            </div>
          </div>

          {/* <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <IconCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
              {locale === "id" ? "Penawaran Resmi via Email Balasan" : "Official Quote via Email Reply"}
            </span>
          </div> */}
        </div>
      </div>

      {/* 2. PARAMETERS: PROJECT TYPE & SCOPE */}
      <div className="space-y-4">
        {/* Project Type */}
        <div>
          <label className="block font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            01 // {t.pricing.projectTypeLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PROJECT_TYPES.map(({ type, icon: Icon, tagId, tagEn, descId, descEn }) => {
              const isSelected = projectType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 cursor-pointer group",
                    isSelected
                      ? "border-brand bg-brand/[0.04] dark:bg-brand/[0.08] ring-1 ring-brand/30 shadow-sm"
                      : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-colors mt-0.5 shrink-0",
                      isSelected
                        ? "bg-brand text-white shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-brand"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <p
                        className={cn(
                          "font-mono text-xs font-bold leading-tight truncate",
                          isSelected ? "text-brand" : "text-zinc-900 dark:text-zinc-100"
                        )}
                      >
                        {type}
                      </p>
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase font-bold shrink-0 px-1.5 py-0.5 rounded",
                          isSelected
                            ? "bg-brand/15 text-brand"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        )}
                      >
                        {locale === "en" ? tagEn : tagId}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {locale === "en" ? descEn : descId}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Scope */}
        <div>
          <label className="block font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            02 // {t.pricing.pageScopeLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAGE_SCOPES.map((s) => {
              const isSelected = pageScope === s;
              const displayScope = s.replace("Halaman", locale === "en" ? "Pages" : "Halaman");
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPageScope(s)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-center font-mono text-xs font-bold transition-all duration-150 cursor-pointer select-none",
                    isSelected
                      ? "border-brand bg-brand text-white shadow-sm shadow-brand/20"
                      : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <span className="truncate whitespace-nowrap">{displayScope}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Package (Design Only vs Design + Code) */}
        <div>
          <label className="block font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            03 // {locale === "id" ? "PAKET DELIVERABLES" : "DELIVERY PACKAGE"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Design Only */}
            <button
              type="button"
              onClick={() => handleSelectPackage(false)}
              className={cn(
                "p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1.5",
                !withDev
                  ? "border-brand bg-brand/[0.04] dark:bg-brand/[0.08] ring-1 ring-brand/30 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white truncate">
                  {t.pricing.slider.justDesign}
                </span>
                {!withDev && <IconCheck className="w-4 h-4 text-brand stroke-[2.5] shrink-0" />}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {locale === "id"
                  ? "File Figma rapi (Auto-Layout, Tokens, Komponen & Prototipe interaktif)"
                  : "Clean Figma system (Auto-Layout, Design Tokens, Components & Clickable Prototype)"}
              </p>
            </button>

            {/* Design + Dev */}
            <button
              type="button"
              onClick={() => handleSelectPackage(true)}
              className={cn(
                "p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1.5 relative",
                withDev
                  ? "border-brand bg-brand/[0.04] dark:bg-brand/[0.08] ring-1 ring-brand/30 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                  <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                    {t.pricing.slider.designAndDev}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] bg-brand text-white font-mono font-bold uppercase tracking-wider shrink-0">
                    {t.pricing.slider.mostPicked}
                  </span>
                </div>
                {withDev && <IconCheck className="w-4 h-4 text-brand stroke-[2.5] shrink-0" />}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {locale === "id"
                  ? "Desain Figma + Source Code Turnkey Next.js, TypeScript & Tailwind CSS"
                  : "Figma Design + Turnkey Next.js, TypeScript & Tailwind CSS Production Repository"}
              </p>
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Add-ons */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 sm:p-3.5">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-full flex items-center justify-between font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-brand transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <IconAdjustmentsHorizontal className="w-4 h-4 text-brand shrink-0" />
              <span className="truncate">{showOptions ? t.pricing.hideAdvanced : t.pricing.showAdvanced}</span>
            </div>
            <span className="text-[11px] text-brand underline font-normal shrink-0 ml-1">
              {showOptions ? (locale === "id" ? "Tutup" : "Collapse") : (locale === "id" ? "Sesuaikan" : "Customize")}
            </span>
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {/* CMS (Disabled on Design Only) */}
                  <div
                    onClick={() => {
                      if (withDev) setWithCms((prev) => !prev);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2.5 p-2.5 rounded-lg border transition-all select-none",
                      withDev
                        ? "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 cursor-pointer hover:border-brand/40"
                        : "border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/30 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {t.pricing.addons.cmsTitle}
                        </p>
                      </div>
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {!withDev
                          ? (locale === "id" ? "Khusus pada paket Desain + Kode" : "Requires Design + Code package")
                          : (locale === "id" ? "Integrasi CMS headless untuk kelola konten mandiri" : "Headless CMS integration for dynamic content")}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Switch
                        checked={withDev ? withCms : false}
                        disabled={!withDev}
                        onCheckedChange={() => {
                          if (withDev) setWithCms((prev) => !prev);
                        }}
                        label="Toggle CMS"
                      />
                    </div>
                  </div>

                  {/* Motion (Disabled on Design Only) */}
                  <div
                    onClick={() => {
                      if (withDev) setWithMotion((prev) => !prev);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2.5 p-2.5 rounded-lg border transition-all select-none",
                      withDev
                        ? "border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 cursor-pointer hover:border-brand/40"
                        : "border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/30 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {t.pricing.addons.motionTitle}
                        </p>
                      </div>
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {!withDev
                          ? (locale === "id" ? "Khusus pada paket Desain + Kode" : "Requires Design + Code package")
                          : (locale === "id" ? "Micro-motion halus & interaktivitas interaktif modern" : "Polished micro-motion & smooth scroll triggers")}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Switch
                        checked={withDev ? withMotion : false}
                        disabled={!withDev}
                        onCheckedChange={() => {
                          if (withDev) setWithMotion((prev) => !prev);
                        }}
                        label="Toggle Motion"
                      />
                    </div>
                  </div>

                  {/* Urgent / Express (Available for both Design Only and Design + Code) */}
                  <div
                    onClick={() => setUrgent((prev) => !prev)}
                    className="flex items-center justify-between gap-2.5 p-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 cursor-pointer hover:border-brand/40 transition-all select-none"
                  >
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 leading-tight">
                        <span>{t.pricing.addons.urgentTitle}</span>
                        <IconBolt className="w-3 h-3 text-brand shrink-0" />
                      </p>
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {locale === "id" ? "Prioritas pengerjaan 40% lebih cepat (Fast-track)" : "40% faster delivery turnaround time"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Switch
                        checked={urgent}
                        onCheckedChange={() => setUrgent((prev) => !prev)}
                        label="Toggle Urgent"
                      />
                    </div>
                  </div>

                  {/* Extra Revisions (Available for both Design Only and Design + Code) */}
                  <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80">
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {t.pricing.addons.revisionsTitle}
                      </p>
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {extraRevs > 0
                          ? `+${extraRevs} ${locale === "id" ? "putaran tambahan" : "extra rounds"}`
                          : (locale === "id" ? "2x putaran termasuk standar" : "2 rounds included")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                        className="h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-brand hover:text-brand cursor-pointer shrink-0"
                      >
                        <IconMinus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center text-zinc-900 dark:text-white shrink-0">
                        {extraRevs}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                        className="h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-brand hover:text-brand cursor-pointer shrink-0"
                      >
                        <IconPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. ACTION BUTTONS & FLOW */}
      <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
        {/* Main CTA: Apply to Form */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 bg-brand hover:bg-brand-deep text-white shadow-[0_12px_26px_-8px_#F0531C] active:scale-98 cursor-pointer text-center"
        >
          <span className="leading-tight sm:hidden">
            {locale === "id" ? "Ajukan Rincian Ini" : "Apply This Scope"}
          </span>
          <span className="leading-tight hidden sm:inline">
            {locale === "id"
              ? "Gunakan Rincian Ini untuk Minta Penawaran"
              : "Apply This Scope to Request Proposal"}
          </span>
          <IconArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
        </button>

        {/* Secondary: Copy Summary */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand dark:hover:text-brand transition-colors cursor-pointer py-1"
          >
            {copied ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                <span className="text-emerald-500">{t.pricing.cta.copied}</span>
              </>
            ) : (
              <>
                <IconCopy className="w-3.5 h-3.5" />
                <span>{locale === "id" ? "Salin Rincian Kebutuhan" : "Copy Scope Details"}</span>
              </>
            )}
          </button>
        </div>

        {/* Footnote */}
        <p className="font-mono text-[9.5px] sm:text-[10px] text-zinc-400 dark:text-zinc-500 text-center leading-relaxed px-2">
          {locale === "id"
            ? "Kebutuhan proyek di atas akan dianalisis untuk menyusun penawaran investasi & proposal resmi yang dikirimkan ke email Anda."
            : "Your project specifications will be reviewed to prepare a formal customized proposal sent to your email."}
        </p>
      </div>
    </div>
  );
}
