"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
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
import AccentSwitcher from "@/components/accent/AccentSwitcher";

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
        on ? "bg-[var(--accent)]" : "bg-white/20"
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
    <section id="pricing" className="relative z-[1] py-24">
      <div className="container mx-auto px-4 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
        >
          <div>
            <p className="figma-frame-label mb-2.5 flex items-center gap-2 font-display text-[13px] font-semibold text-[var(--accent)]">
              <IconStack className="h-3.5 w-3.5" />
              Component — PricingConfigurator
            </p>
            <h2 className="font-display text-[clamp(30px,4.5vw,46px)] font-bold tracking-tight text-[#16150F]">
              Hitung estimasi proyekmu.
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-[#6E6A5E]">
              Configurator interaktif ala Figma: pilih tipe proyek, scope halaman,
              dan add-on — estimasi muncul real-time. Transparan sebelum chat pertama.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-[#D9D4C7] bg-white/70 p-4">
            <AccentSwitcher />
            <p className="mt-2 max-w-[230px] text-xs leading-snug text-[#6E6A5E]">
              pilih aksen favoritmu — seluruh situs ikut berganti ✦
            </p>
          </div>
        </motion.div>

        {/* Ink panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[20px] border-[1.5px] border-[#16150F] bg-[#16150F] text-[#F4F1EA] shadow-[8px_8px_0_rgba(var(--accent-rgb),0.35)]"
        >
          {/* accent glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--accent-rgb), 0.35), transparent 70%)",
            }}
          />

          {/* Fake Figma toolbar */}
          <div className="relative flex items-center justify-between gap-4 border-b border-white/10 bg-black/20 px-4 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <FigmaDots />
              <span className="hidden items-center gap-1.5 text-[11px] font-medium text-[#9D9DA8] sm:flex">
                <span className="text-[var(--accent)]">▦</span> pricing.fig
              </span>
            </div>
            <div className="hidden items-center gap-2 text-[11px] text-[#9D9DA8] md:flex">
              <IconAdjustments className="h-3.5 w-3.5" />
              <span>100%</span>
            </div>
          </div>

          <div className="relative flex">
            {/* Fake layers panel */}
            <div className="hidden w-52 shrink-0 border-r border-white/10 bg-black/20 p-3 lg:block">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#9D9DA8]">
                  Layers
                </span>
                <IconChevronDown className="h-3 w-3 text-[#9D9DA8]" />
              </div>
              <div className="flex flex-col gap-0.5">
                {layers.map((l, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] transition-colors",
                      l.active
                        ? "bg-[rgba(var(--accent-rgb),0.18)] font-semibold text-white"
                        : "text-[#9D9DA8] hover:bg-white/5"
                    )}
                    style={{ paddingLeft: `${8 + l.depth * 12}px` }}
                  >
                    {l.icon ?? <span className="flex h-3 w-3 items-center justify-center text-[#9D9DA8]">▸</span>}
                    {l.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive pricing frame */}
            <div className="flex-1 p-5 md:p-10">
              <div className="mx-auto max-w-md">
                {/* Project type selector */}
                <div className="mb-8">
                  <p className="mb-2.5 flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-[#9D9DA8]">
                    <IconMouse className="h-3 w-3" /> 01 · Project type
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setProjectType(t)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-xs font-bold transition-all duration-300",
                          projectType === t
                            ? "border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.15)] text-white shadow-lg shadow-black/20"
                            : "border-white/15 text-[#B9B5A9] hover:border-[rgba(var(--accent-rgb),0.5)] hover:text-white"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page scope */}
                <div className="mb-8">
                  <p className="mb-2.5 font-display text-[10px] font-bold uppercase tracking-widest text-[#9D9DA8]">
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
                            ? "border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.15)] text-white"
                            : "border-white/15 text-[#B9B5A9] hover:border-[rgba(var(--accent-rgb),0.5)] hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-8">
                  <p className="mb-2.5 font-display text-[10px] font-bold uppercase tracking-widest text-[#9D9DA8]">
                    03 · Add-ons
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">
                          Development <span className="font-normal text-[#9D9DA8]">(Next.js/React)</span>
                        </p>
                        <p className="text-[11px] text-[#9D9DA8]">+50% of design price</p>
                      </div>
                      <Switch on={withDev} onClick={() => setWithDev(!withDev)} label="Toggle development" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">CMS &amp; SEO setup</p>
                        <p className="text-[11px] text-[#9D9DA8]">+Rp 1.5jt</p>
                      </div>
                      <Switch on={withCms} onClick={() => setWithCms(!withCms)} label="Toggle CMS & SEO" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">Extra revision round</p>
                        <p className="text-[11px] text-[#9D9DA8]">+Rp 500rb / round</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                          aria-label="Decrease revisions"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[#B9B5A9] transition-colors hover:border-[var(--accent)] hover:text-white"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center font-display text-sm font-bold text-white">
                          {extraRevs}
                        </span>
                        <button
                          onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                          aria-label="Increase revisions"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[#B9B5A9] transition-colors hover:border-[var(--accent)] hover:text-white"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">
                          Urgent delivery <IconBolt className="-mt-0.5 inline h-3.5 w-3.5 text-[#F59E0B]" />
                        </p>
                        <p className="text-[11px] text-[#9D9DA8]">+20%, priority slot</p>
                      </div>
                      <Switch on={urgent} onClick={() => setUrgent(!urgent)} label="Toggle urgent delivery" />
                    </div>
                  </div>
                </div>

                {/* Price widget — white card on ink panel */}
                <div className="rounded-[14px] border-[1.5px] border-[#16150F] bg-white p-6 text-center text-[#16150F] shadow-[6px_6px_0_rgba(var(--accent-rgb),0.45)]">
                  <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-widest text-[#6E6A5E]">
                    Estimated total
                  </p>
                  <div className="flex items-baseline justify-center gap-2 overflow-hidden">
                    <span className="font-display text-xl font-bold text-[var(--accent)]">Rp</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={price}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="font-display text-5xl font-bold tabular-nums text-[var(--accent)]"
                      >
                        {fmtPrice(price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm font-medium text-[#6E6A5E]">jt</span>
                  </div>
                  <p className="mt-2 text-[11px] text-[#6E6A5E]">
                    {projectType} · {pageScope}
                    {withDev ? " · with development" : " · design only"}
                    {urgent ? " · urgent" : ""}
                  </p>

                  <Link
                    href={`/contact?project=${encodeURIComponent(projectType)}&price=${fmtPrice(price)}jt`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#16150F] bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-[3px_3px_0_#16150F] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#16150F]"
                  >
                    <IconSparkles className="h-4 w-4" />
                    <span>Let&apos;s Talk — {fmtPrice(price)}jt</span>
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-[10px] text-[#6E6A5E]">
                    Fixed price · milestone payment available · negotiable
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fake Figma status bar */}
          <div className="relative flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-1.5 text-[10px] text-[#9D9DA8]">
            <span className="flex items-center gap-1.5">
              <IconStack className="h-3 w-3" /> Frame 1 · 1280 × auto
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
          className="mx-auto mt-14 max-w-3xl"
        >
          <div className="inline-flex w-full flex-col items-center gap-3 rounded-[20px] border-[1.5px] border-dashed border-[#D9D4C7] bg-white/60 p-6 text-center md:p-8">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-[#16150F]">
              Prefer hourly support?
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[var(--accent)]">Rp 200rb</span>
              <span className="text-sm text-[#6E6A5E]">/ hour</span>
            </div>
            <p className="text-xs text-[#6E6A5E]">
              UX audits, design reviews, or small tasks — minimum 10 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#16150F] bg-transparent px-6 py-3 text-sm font-bold text-[#16150F] transition-colors hover:bg-[var(--accent-soft)]"
            >
              <span>Ask about hourly work</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
