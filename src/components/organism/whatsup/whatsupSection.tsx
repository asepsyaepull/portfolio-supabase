"use client";

import {
  IconBrush,
  IconCode,
  IconMouse,
  IconPalette,
  IconSparkles,
  IconStack,
} from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CARD = "rounded-[24px] border border-[#14202b12] bg-white p-6 shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)] md:p-7";
const LABEL = "[font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold uppercase tracking-[0.14em]";
const SERIF = "[font-family:var(--font-display),'Fraunces',serif]";

/* Count-up number when scrolled into view */
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* Live WIB clock */
function LiveClock() {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now} WIB</span>;
}

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
          <p className={`${LABEL} mb-3 text-[#F0531C]`}>live-feed.txt</p>
          <h2 className={`${SERIF} text-[clamp(38px,6vw,72px)] font-semibold uppercase leading-none text-[#14202B]`}>
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
            className="rounded-[24px] border border-transparent bg-[#14202B] p-7 text-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)] md:p-8 lg:col-span-2 lg:row-span-2"
          >
            <p className={`${LABEL} text-[#8AA6B8]`}>STATEMENT.TXT</p>
            <blockquote className={`${SERIF} mt-8 text-[clamp(26px,2.8vw,40px)] font-medium leading-[1.15]`}>
              &ldquo;Gue bikin desain yang bikin orang berhenti scroll — terus nanya,{" "}
              <span className="text-[#F0531C]">ini siapa yang bikin?</span>&rdquo;
            </blockquote>
            <p className={`${LABEL} mt-10 text-white/85`}>ASEP, SINCE 2018</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#27c06b]/50 bg-[#27c06b]/15 px-3.5 py-1.5 [font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold lowercase tracking-wide text-[#5fe39a]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27c06b] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#27c06b]" />
              </span>
              available now
            </span>
          </motion.div>

          {/* METRICS */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={`${CARD} md:col-span-2`}
          >
            <p className={`${LABEL} text-[#8AA6B8]`}>METRICS</p>
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                { to: 7, prefix: "", suffix: "+", label: "YEARS" },
                { to: 30, prefix: "", suffix: "+", label: "PROJECTS" },
                { to: 24, prefix: "<", suffix: "H", label: "RESPONSE" },
              ].map((m) => (
                <div key={m.label}>
                  <p className={`${SERIF} text-[clamp(30px,3.4vw,48px)] font-semibold leading-none text-[#14202B]`}>
                    <CountUp to={m.to} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className={`${LABEL} mt-2 text-[#4A6173]`}>{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* REVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className={CARD}
          >
            <p className="text-sm tracking-[0.2em] text-[#F0531C]">★★★★★</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#14202B]">
              &ldquo;Desainnya rapi, komunikasinya cepat. Jarang nemu desainer yang paham kode selevel ini.&rdquo;
            </p>
            <p className={`${LABEL} mt-5 text-[#8AA6B8]`}>— DIMAS, PRODUCT MANAGER</p>
          </motion.div>

          {/* CURRENTLY BUILDING IN */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className={CARD}
          >
            <p className={`${LABEL} text-[#8AA6B8]`}>CURRENTLY BUILDING IN</p>
            <ul className="mt-5 flex flex-col gap-3">
              {["Figma", "Next.js", "Tailwind"].map((tool, i) => (
                <li key={tool} className="flex items-center justify-between text-[15px] font-semibold text-[#14202B]">
                  {tool}
                  <span
                    className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#F0531C]" : i === 1 ? "bg-[#14202B]" : "bg-[#0D99FF]"}`}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CAPABILITIES */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${CARD} md:col-span-2`}
          >
            <p className={`${LABEL} text-[#8AA6B8]`}>CAPABILITIES</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((cap) => (
                <span
                  key={cap.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#14202b22] px-4 py-2 [font-family:var(--font-mono),ui-monospace,monospace] text-[12px] font-bold text-[#14202B] transition-colors hover:border-[#F0531C] hover:text-[#F0531C]"
                >
                  {cap.icon}
                  {cap.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CRAFT — hero.frame with live clock */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className={`${CARD} md:col-span-2`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className={`${LABEL} text-[#8AA6B8]`}>HERO.FRAME</p>
              <p className={`${LABEL} text-[#F0531C]`}>DESIGNED LIVE</p>
            </div>
            {/* mini frame mock */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#14202b22]">
              <div className="flex items-center gap-1.5 border-b border-[#14202b12] bg-[#F1F6FA] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
                <span className="h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
                <span className="h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
              </div>
              <div className="relative h-24 bg-[linear-gradient(#14202b0d_1px,transparent_1px),linear-gradient(90deg,#14202b0d_1px,transparent_1px)] [background-size:18px_18px]">
                <span className="absolute left-4 top-3 h-3 w-16 rounded-full bg-[#AFD8F0]" />
                <span className="absolute left-4 top-9 h-3 w-24 rounded-full bg-[#F0531C]" />
                <span className="absolute bottom-3 right-4 h-6 w-14 rounded-md bg-[#14202B]" />
                <span className="absolute left-4 top-16 h-2 w-20 rounded-full bg-[#EFEEE9]" />
              </div>
            </div>
            <p className={`${SERIF} mt-5 text-3xl font-semibold tabular-nums text-[#14202B]`}>
              <LiveClock />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhatsupSection;
