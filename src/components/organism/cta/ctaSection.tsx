"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MAILTO = "mailto:mail.asepsyaepul@gmail.com";
const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function CtaSection() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(timeFmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F9C97C 0%, #F0531C 100%)" }}
    >
      {/* sun */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[18%] h-56 w-56 -translate-x-1/2 rounded-full md:h-72 md:w-72"
        style={{
          background: "radial-gradient(circle, rgba(255,241,181,.95) 0%, rgba(255,196,92,.55) 55%, transparent 72%)",
          filter: "blur(2px)",
        }}
      />
      {/* clouds */}
      <div
        aria-hidden
        className="absolute left-[8%] top-[22%] h-16 w-40 rounded-full bg-white/50 blur-xl md:h-20 md:w-56"
      />
      <div
        aria-hidden
        className="absolute right-[6%] top-[38%] h-14 w-32 rounded-full bg-white/40 blur-xl md:h-16 md:w-44"
      />
      <div
        aria-hidden
        className="absolute bottom-[12%] left-[18%] h-12 w-28 rounded-full bg-white/30 blur-lg md:w-36"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-mono text-xs font-bold uppercase italic tracking-[0.22em] text-white/85"
        >
          golden hour in jakarta
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-5 font-display text-[clamp(54px,10vw,140px)] font-bold uppercase leading-[0.95] tracking-tight text-[#14202B]"
        >
          Still building.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-7 max-w-md text-base leading-relaxed text-[#14202B]/80 sm:text-lg"
        >
          Jam {now ?? "--:--:--"} di studio gue. Ada ide? Cerita sekarang, besok udah masuk antrian.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href={MAILTO}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wide text-[#14202B] shadow-[0_20px_50px_-32px_rgba(20,19,16,.45)] transition-transform duration-150 ease-out hover:-translate-y-[2px]"
          >
            Talk with me
          </a>
          <a
            href={MAILTO}
            className="font-mono text-[13px] font-bold text-white underline decoration-white/60 underline-offset-4 transition-colors hover:decoration-white"
          >
            or book a call
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection;
