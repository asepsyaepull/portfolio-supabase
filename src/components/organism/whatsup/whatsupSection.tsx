"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

const BlockLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 transition-colors">
    {children}
  </span>
);

const Pill = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors">
    {icon}
    {children}
  </span>
);

const CraftDot = () => (
  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
  </span>
);

/* ------------------------------------------------------------------ */
/* Main section                                                         */
/* ------------------------------------------------------------------ */

export function WhatsupSection() {
  const metrics = [
    { value: "50+", label: "Projects Shipped" },
    { value: "7+", label: "Years Experience" },
    { value: "24h", label: "Avg Response" },
  ];

  const capabilities = ["UI/UX", "Web Dev", "Brand", "Prototyping", "Motion", "Systems"];

  const tools = ["React & Next.js", "Figma", "TypeScript", "Tailwind"];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300 border-t border-zinc-200 dark:border-white/[0.04]">
      <div className="container mx-auto px-4 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none transition-colors">
              What's <span className="text-lime-600 dark:text-lime-500">up</span>
            </h2>

            <div className="mt-10">
              <BlockLabel>STATEMENT.TXT</BlockLabel>
              <h3 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-zinc-900 dark:text-white transition-colors">
                I make people stop and ask,{" "}
                <span className="italic font-serif text-lime-600 dark:text-lime-500 normal-case">
                  who built that?
                </span>
              </h3>
              <p className="mt-5 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg transition-colors">
                That reaction is the whole job. One person doing strategy, design, and
                engineering for products that refuse to look ordinary. No templates,
                ever — every pixel is designed and built to convert.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 transition-colors">
              <span>ASEP SYAEPUL, SINCE 2017</span>
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
                </span>
                AVAILABLE NOW
              </span>
              <span>design + code</span>
            </div>
          </motion.div>

          {/* RIGHT — Metric blocks */}
          <div className="flex flex-col gap-4">
            {/* METRICS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/40 p-6 transition-colors"
            >
              <BlockLabel>Metrics</BlockLabel>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tabular-nums transition-colors">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 transition-colors">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CAPABILITIES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/40 p-6 transition-colors"
            >
              <BlockLabel>Capabilities</BlockLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CRAFT — Figma frame mockup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/40 p-6 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <BlockLabel>craft</BlockLabel>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-lime-600 dark:text-lime-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-500" />
                    </span>
                    Designed Live
                  </span>
                </div>
                <div className="mt-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#1E1E1E] overflow-hidden transition-colors">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 dark:border-white/[0.06]">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                    <span className="ml-2 text-[9px] font-medium text-zinc-400 dark:text-zinc-500">
                      portfolio.fig
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <CraftDot />
                      <CraftDot />
                      <CraftDot />
                    </div>
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-lime-500/30 via-transparent to-blue-500/30 border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        1280 × 800
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* NOW PLAYING */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/40 p-6 transition-colors"
              >
                <BlockLabel>▶ Currently building in</BlockLabel>
                <div className="mt-4 flex flex-col gap-2">
                  {tools.map((t) => (
                    <div
                      key={t}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-900/60 px-3 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
                    >
                      {t}
                      <span className="text-lime-500 text-[10px]">●</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* REVIEW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/40 p-6 transition-colors"
            >
              <div className="flex items-center justify-between">
                <BlockLabel>Review_01</BlockLabel>
                <span className="flex items-center gap-0.5 text-lime-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </span>
              </div>
              <p className="mt-4 text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic transition-colors">
                "Asep doesn't just design — he builds it. One person who thinks like a
                designer and codes like an engineer. Rare combo, rare quality."
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 transition-colors">
                  — [Nama] · [Jabatan]
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
