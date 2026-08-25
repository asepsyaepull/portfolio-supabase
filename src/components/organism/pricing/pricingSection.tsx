"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IconMinus, IconPlus, IconBolt } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types & config (logic unchanged)                                     */
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

const CARD = "rounded-[24px] border border-[#14202b12] bg-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]";
const SERIF = "[font-family:var(--font-display),'Fraunces',serif]";
const MONO = "[font-family:var(--font-mono),ui-monospace,monospace]";

/* Figma frame label per control group */
function FrameLabel({ name }: { name: string }) {
  return (
    <p className={cn(MONO, "mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8AA6B8]")}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 3a3 3 0 100 6h3V3H8zm0 6a3 3 0 000 6h3V9H8zm0 6a3 3 0 103 3v-3H8zm6-12v6h3a3 3 0 100-6h-3z" />
      </svg>
      {name}
    </p>
  );
}

/* Ohhmy-style lever switch */
function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300",
        on ? "border-[#F0531C] bg-[#F0531C]" : "border-[#14202b22] bg-[#F1F6FA]"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow-md",
          on && "translate-x-5"
        )}
      />
    </button>
  );
}

/* Option pill — line-2 border, active = brand border + brand/8% bg */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200",
        active
          ? "border-[#F0531C] bg-[#F0531C]/[0.08] font-bold text-[#14202B]"
          : "border-[#14202b22] bg-white text-[#4A6173] hover:border-[#14202B] hover:text-[#14202B]"
      )}
    >
      {children}
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

  return (
    <section id="pricing" className="relative z-[1] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className={cn(MONO, "mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F0531C]")}>
            pricing.fig
          </p>
          <h2 className={cn(SERIF, "text-[clamp(38px,6vw,72px)] font-semibold uppercase leading-[0.98] text-[#14202B]")}>
            Pick your plan.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[16px] text-[#4A6173]">
            hitung sendiri. transparan sebelum ngobrol.
          </p>
        </motion.div>

        {/* Big white panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={cn(CARD, "relative mx-auto max-w-3xl p-6 md:p-10")}
        >
          {/* panel frame label */}
          <div className="absolute -top-9 left-0 flex items-center gap-2 px-1">
            <span className={cn(MONO, "text-[11px] font-bold uppercase tracking-[0.14em] text-[#8AA6B8]")}>
              ▤ pricing.fig
            </span>
          </div>

          {/* project-type.frame */}
          <div className="mb-8">
            <FrameLabel name="project-type.frame" />
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((t) => (
                <Pill key={t} active={projectType === t} onClick={() => setProjectType(t)}>
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          {/* scope.frame */}
          <div className="mb-8">
            <FrameLabel name="scope.frame" />
            <div className="flex flex-wrap gap-2">
              {PAGE_SCOPES.map((s) => (
                <Pill key={s} active={pageScope === s} onClick={() => setPageScope(s)}>
                  {s}
                </Pill>
              ))}
            </div>
          </div>

          {/* add-ons.frame */}
          <div className="mb-9">
            <FrameLabel name="add-ons.frame" />
            <div className="flex flex-col divide-y divide-[#14202b12]">
              {/* Development */}
              <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                <div>
                  <p className="text-[14.5px] font-bold text-[#14202B]">
                    Development <span className="font-normal text-[#4A6173]">(Next.js/React)</span>
                  </p>
                  <p className={cn(MONO, "mt-0.5 text-[11px] text-[#8AA6B8]")}>+50% of design price</p>
                </div>
                <Switch on={withDev} onClick={() => setWithDev(!withDev)} label="Toggle development" />
              </div>

              {/* CMS */}
              <div className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-[14.5px] font-bold text-[#14202B]">CMS &amp; SEO setup</p>
                  <p className={cn(MONO, "mt-0.5 text-[11px] text-[#8AA6B8]")}>+Rp 1.5jt</p>
                </div>
                <Switch on={withCms} onClick={() => setWithCms(!withCms)} label="Toggle CMS & SEO" />
              </div>

              {/* Extra revisions */}
              <div className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-[14.5px] font-bold text-[#14202B]">Extra revision round</p>
                  <p className={cn(MONO, "mt-0.5 text-[11px] text-[#8AA6B8]")}>+Rp 500rb / round</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExtraRevs(Math.max(0, extraRevs - 1))}
                    aria-label="Decrease revisions"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#14202b22] text-[#4A6173] transition-colors hover:border-[#F0531C] hover:text-[#F0531C]"
                  >
                    <IconMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className={cn(SERIF, "w-4 text-center text-lg font-semibold text-[#14202B]")}>{extraRevs}</span>
                  <button
                    onClick={() => setExtraRevs(Math.min(5, extraRevs + 1))}
                    aria-label="Increase revisions"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#14202b22] text-[#4A6173] transition-colors hover:border-[#F0531C] hover:text-[#F0531C]"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Urgent */}
              <div className="flex items-center justify-between gap-4 pt-3.5 last:pb-0">
                <div>
                  <p className="text-[14.5px] font-bold text-[#14202B]">
                    Urgent delivery <IconBolt className="-mt-0.5 inline h-3.5 w-3.5 text-[#F0531C]" />
                  </p>
                  <p className={cn(MONO, "mt-0.5 text-[11px] text-[#8AA6B8]")}>+20%, priority slot</p>
                </div>
                <Switch on={urgent} onClick={() => setUrgent(!urgent)} label="Toggle urgent delivery" />
              </div>
            </div>
          </div>

          {/* Price display — big serif */}
          <div className="border-t border-dashed border-[#14202b22] pt-7 text-center">
            <p className={cn(MONO, "text-[11px] font-bold uppercase tracking-[0.16em] text-[#8AA6B8]")}>
              Estimated total
            </p>
            <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 overflow-hidden text-[#14202B]">
              <span className={cn(SERIF, "text-3xl font-semibold")}>Rp</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={price}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(SERIF, "text-[clamp(52px,8vw,84px)] font-semibold leading-none tabular-nums")}
                >
                  {fmtPrice(price)}
                </motion.span>
              </AnimatePresence>
              <span className={cn(SERIF, "text-3xl font-semibold")}>jt</span>
              <span className={cn(MONO, "ml-1 text-[12px] font-bold lowercase text-[#8AA6B8]")}>/start-from</span>
            </div>
            <p className={cn(MONO, "mt-3 text-[11px] text-[#8AA6B8]")}>
              {projectType} · {pageScope}
              {withDev ? " · with development" : " · design only"}
              {urgent ? " · urgent" : ""}
            </p>

            <Link
              href={`/contact?project=${encodeURIComponent(projectType)}&price=${fmtPrice(price)}jt`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0531C] px-6 py-[13px] text-white shadow-[0_12px_26px_-12px_#F0531C] transition-colors duration-200 hover:bg-[#D2410E]"
            >
              <span className={cn(MONO, "text-[13px] font-bold")}>
                Start today → {fmtPrice(price)}jt
              </span>
            </Link>
            <p className={cn(MONO, "mt-3 text-[11px] text-[#8AA6B8]")}>No contracts. Pause anytime.</p>
          </div>
        </motion.div>

        {/* Hourly note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <div className="flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-[#14202b22] bg-white/60 p-7 text-center">
            <p className={cn(MONO, "text-[11px] font-bold uppercase tracking-[0.16em] text-[#14202B]")}>
              Prefer hourly support?
            </p>
            <div className="flex items-baseline gap-2">
              <span className={cn(SERIF, "text-3xl font-semibold text-[#14202B]")}>Rp 200rb</span>
              <span className={cn(MONO, "text-[12px] text-[#8AA6B8]")}>/ hour</span>
            </div>
            <p className="text-sm text-[#4A6173]">UX audits, design reviews, or small tasks — minimum 10 hours.</p>
            <Link
              href="/contact"
              className={cn(
                MONO,
                "mt-1 inline-flex items-center gap-2 rounded-xl border border-[#14202b22] bg-white px-5 py-2.5 text-[13px] font-bold text-[#14202B] transition-colors hover:border-[#F0531C] hover:text-[#F0531C]"
              )}
            >
              Ask about hourly work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
