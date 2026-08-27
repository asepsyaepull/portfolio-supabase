"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useClock } from "@/hooks/use-clock";
import { FigmaTag, FrameLabel } from "@/components/ui/figma-tag";
import { PricingModal } from "@/components/sections/pricing/pricing-modal";

const MAILTO = "mailto:mail.asepsyaepul@gmail.com";

export function CtaSection() {
  const now = useClock();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="relative z-[1] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          {/* Frame Label */}
          <div className="mb-4 flex items-center justify-between px-2">
            <FrameLabel name="CONTACT.FRAME" className="!text-brand" />
            <span className="font-mono text-[11px] font-bold text-ink-faint">
              1280 × 520
            </span>
          </div>

          {/* Figma Artboard Card Wrapper */}
          <div className="omd-sel relative my-6">
            <span className="omd-h tl" aria-hidden />
            <span className="omd-h tr" aria-hidden />
            <span className="omd-h bl" aria-hidden />
            <span className="omd-h br" aria-hidden />

            <FigmaTag variant="blue" className="-top-3 left-6 z-20">
              contact.fig
            </FigmaTag>

            {/* Inner card with overflow-hidden for gradients/grid */}
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-[#14202B] to-[#1C2E3D] p-8 text-white shadow-card md:p-16">
              {/* Subtle grid accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="font-mono text-xs font-bold uppercase italic tracking-[0.22em] text-brand"
              >
                golden hour in jakarta
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="heading-display mt-5 text-[clamp(44px,8vw,96px)] font-bold uppercase leading-[0.95] tracking-tight text-white"
              >
                Still building<span className="text-brand">.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg"
              >
                Jam {now} di studio. Punya project — atau posisi yang cocok? Ceritakan sekarang, besok masuk antrian.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              >
                <a
                  href={MAILTO}
                  className="omd-btn-primary !px-8 !py-3.5 text-sm shadow-[0_12px_26px_-8px_#F0531C]"
                >
                  Talk with me
                </a>
                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="group inline-flex items-center gap-2 font-mono text-[13px] font-bold text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white cursor-pointer"
                >
                  <span>Estimasi Biaya Proyek</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Pricing & Cost Estimation Modal with Slide Animation */}
    <PricingModal
      isOpen={isPricingModalOpen}
      onClose={() => setIsPricingModalOpen(false)}
    />
  </>
);
}

export default CtaSection;
