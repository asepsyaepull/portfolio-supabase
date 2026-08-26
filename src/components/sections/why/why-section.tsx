"use client";

import React from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";

const MOST_STUDIOS = [
  "Pitched senior, dikerjain junior.",
  "Booking mingguan, deliver bulan depan.",
  "Retainer mahal + tagihan kejutan.",
  "Banyak meeting sebelum pixel pertama.",
  "Rapi semua… tapi gampang dilupain.",
];

const ASEP = [
  "Ngobrol langsung sama orang yang desain.",
  "First draft hari, bukan kuartal.",
  "Fixed scope, fixed price.",
  "Less meetings, more shipping.",
  "Custom, susah dilupain.",
];

export function WhySection() {
  return (
    <section id="why" className="relative z-[1] px-4 py-24">
      <SectionHeader
        tag="the-difference.fig"
        title={
          <>
            Same brief. <span className="text-brand">Beda hasil.</span>
          </>
        }
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
        {/* Most studios — faded */}
        <div className="rounded-[24px] border border-line bg-white/50 p-8 opacity-70 grayscale">
          <FrameLabel name="cara lain" className="!text-ink-faint" />
          <ul className="mt-6 space-y-4">
            {MOST_STUDIOS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] text-ink-faint"
              >
                <IconX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Asep · selected */}
        <div className="omd-sel relative">
          <Card variant="white" className="relative p-8">
            <span className="absolute -top-5 right-6 z-[1] inline-flex items-center gap-1.5 rounded-full bg-tool px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white">
              pick this one
            </span>
            <FrameLabel name="Asep · selected" className="!text-tool" />
            <ul className="mt-6 space-y-4">
              {ASEP.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] font-medium text-ink"
                >
                  <IconCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-tool"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <p className="heading-display mt-16 text-center text-xl font-medium italic text-ink-soft">
        Same brief, same budget. Hasilnya beda jauh.
      </p>

      <div className="mt-6 text-center">
        <a href="#work" className="omd-btn-primary">
          See the work
        </a>
      </div>
    </section>
  );
}

export default WhySection;
