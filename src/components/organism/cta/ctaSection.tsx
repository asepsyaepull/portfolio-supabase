"use client";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

export function CtaSection() {
  return (
    <section className="py-28 md:py-40 bg-[#F4F1EA] text-[#16150F] relative overflow-hidden">
      {/* canvas dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(22,21,15,.09) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-mono text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--accent)" }}
        >
          ✦ Frame Final — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight"
        >
          Punya ide?
          <br />
          <span style={{ color: "var(--accent)" }}>Gas kita wujudkan.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[#6E6A5E]"
        >
          Terbuka untuk posisi fulltime UI/UX / Frontend maupun proyek freelance. Balasan &lt; 24 jam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="mailto:mail.asepsyaepul@gmail.com"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#16150F] px-8 py-4 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-[2px]"
            style={{ boxShadow: "4px 4px 0 var(--accent)" }}
          >
            Let&apos;s Talk
            <IconArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection;
