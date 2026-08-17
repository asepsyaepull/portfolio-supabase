"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconStack,
  IconMinus,
  IconMouse,
  IconPlus,
  IconAdjustments,
  IconSparkles,
  IconBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/* ------------------------------------------------------------------ */
/* Fake Figma chrome                                                    */
/* ------------------------------------------------------------------ */

const FigmaDots = () => (
  <div className="flex items-center gap-1.5">
    <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
    <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
    <span className="w-3 h-3 rounded-full bg-[#28C840]" />
  </div>
);

/* ------------------------------------------------------------------ */
/* Types & config                                                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Switch                                                               */
/* ------------------------------------------------------------------ */

function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-lime-500" : "bg-zinc-200 dark:bg-zinc-800"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md",
          on && "translate-x-5"
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                         */
/* ------------------------------------------------------------------ */

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

  const layers = [
    { icon: <IconStack className="w-3 h-3" />, name: "pricing.fig", active: true, depth: 0 },
    { icon: null, name: "Project Type", active: false, depth: 1 },
    { icon: null, name: "Page Scope", active: false, depth: 1 },
    { icon: null, name: "Add-ons", active: false, depth: 1 },
    { icon: null, name: "Price Display", active: false, depth: 1 },
    { icon: null, name: "CTA Button", active: false, depth: 1 },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight transition-colors">
            Build your <span className="text-lime-600 dark:text-lime-500 italic">own</span> quote.
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            No menu of fixed packages — configure the scope below and watch the price
            adjust in real time. What you see is what you pay.
          </p>
        </motion.div>

        {/* Figma Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-2xl shadow-zinc-900/5 dark:shadow-black/40 overflow-hidden bg-white dark:bg-[#1E1E1E] transition-colors"
        >
          {/* Fake Figma toolbar */}
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/60 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <FigmaDots />
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <span className="text-lime-500">▦</span> pricing.fig
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
              <IconAdjustments className="w-3.5 h-3.5" />
              <span>100%</span>
            </div>
          </div>

          <div className="flex">
            {/* Fake layers panel */}
            <div className="hidden lg:block w-52 shrink-0 border-r border-zinc-200 dark:border-white/[0.06] p-3 bg-zinc-50/50 dark:bg-zinc-950/40 transition-colors">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Layers
                </span>
                <IconChevronDown className="w-3 h-3 text-zinc-400" />
              </div>
              <div className="flex flex-col gap-0.5">
                {layers.map((l, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] transition-colors",
                      l.active
                        ? "bg-lime-500/15 text-lime-700 dark:text-lime-400 font-semibold"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                    )}
                    style={{ paddingLeft: `${8 + l.depth * 12}px` }}
                  >
                    {l.icon ?? <span className="w-3 h-3 flex items-center justify-center text-zinc-400">▸</span>}
                    {l.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive pricing frame */}
            <div className="flex-1 p-5 md:p-10">
              <div className="max-w-md mx-auto">
                {/* Project type selector */}
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2.5 flex items-center gap-1.5">
                    <IconMouse className="w-3 h-3" /> 01 · Project type
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setProjectType(t)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-xs font-bold transition-all duration-300",
                          projectType === t
                            ? "border-lime-500 bg-lime-500/10 text-lime-700 dark:text-lime-400 shadow-lg shadow-lime-500/10"
                            : "border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:border-lime-500/40 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page scope */}
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2.5">
                    02 · Scope
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PAGE_SCOPES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPageScope(s)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300",
                          pageScope === s
                            ? "border-lime-500 bg-lime-500/10 text-lime-700 dark:text-lime-400"
                            : "border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:border-lime-500/40"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2.5">
                    03 · Add-ons
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
                          Development <span className="font-normal text-zinc-400">(Next.js/React)</span>
                        </p>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">+50% of design price</p>
                      </div>
                      <Switch on={withDev} onClick={() => setWithDev(!withDev)} label="Toggle development" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
                          CMS & SEO setup
                        </p>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">+Rp 1.5jt</p>
                      </div>
                      <Switch on={withCms} onClick={() => setWithCms(!withCms)} label="Toggle CMS & SEO" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
                          Extra revision round
                        </p>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">+Rp 500rb / round</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                          aria-label="Decrease revisions"
                          className="w-7 h-7 rounded-full border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-lime-500/50 hover:text-lime-500 transition-colors"
                        >
                          <IconMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-black text-zinc-900 dark:text-white transition-colors">
                          {extraRevs}
                        </span>
                        <button
                          onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                          aria-label="Increase revisions"
                          className="w-7 h-7 rounded-full border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-lime-500/50 hover:text-lime-500 transition-colors"
                        >
                          <IconPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
                          Urgent delivery <IconBolt className="inline w-3.5 h-3.5 text-amber-500 -mt-0.5" />
                        </p>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">+20%, priority slot</p>
                      </div>
                      <Switch on={urgent} onClick={() => setUrgent(!urgent)} label="Toggle urgent delivery" />
                    </div>
                  </div>
                </div>

                {/* Price display */}
                <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-950/60 p-6 text-center transition-colors">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    Estimated total
                  </p>
                  <div className="flex items-baseline justify-center gap-2 overflow-hidden">
                    <span className="text-xl font-bold text-lime-600 dark:text-lime-500">Rp</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={price}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-5xl font-black text-zinc-900 dark:text-white tabular-nums transition-colors"
                      >
                        {fmtPrice(price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">jt</span>
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
                    {projectType} · {pageScope}
                    {withDev ? " · with development" : " · design only"}
                    {urgent ? " · urgent" : ""}
                  </p>

                  <Link href={`/contact?project=${encodeURIComponent(projectType)}&price=${fmtPrice(price)}jt`} className="mt-5 block w-full">
                    <HoverBorderGradient
                      containerClassName="rounded-full w-full"
                      as="div"
                      className="w-full flex items-center justify-center gap-2 bg-lime-500 text-black px-6 py-3.5 text-sm font-bold transition-all"
                    >
                      <IconSparkles className="w-4 h-4" />
                      <span>Let's Talk — {fmtPrice(price)}jt</span>
                      <IconArrowRight className="w-4 h-4" />
                    </HoverBorderGradient>
                  </Link>
                  <p className="mt-3 text-[10px] text-zinc-400 dark:text-zinc-500">
                    Fixed price · milestone payment available · negotiable
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fake Figma status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/60 text-[10px] text-zinc-400 dark:text-zinc-500 transition-colors">
            <span className="flex items-center gap-1.5">
              <IconStack className="w-3 h-3" /> Frame 1 · 1280 × auto
            </span>
            <span className="hidden sm:block">Made in Figma, built in Next.js</span>
          </div>
        </motion.div>

        {/* Hourly note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 p-6 md:p-8 rounded-3xl border border-dashed border-zinc-300 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 transition-colors w-full">
            <p className="text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 transition-colors">
              Prefer hourly support?
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-zinc-900 dark:text-white transition-colors">Rp 200rb</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors">/ hour</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors">
              UX audits, design reviews, or small tasks — minimum 10 hours.
            </p>
            <Link href="/contact">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 py-3 text-sm font-bold transition-colors"
              >
                <span>Ask about hourly work</span>
              </HoverBorderGradient>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
