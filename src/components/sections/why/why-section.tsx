"use client";

import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";
import { SectionHeader } from "@/components/ui/section-header";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useLanguage } from "@/context/language-context";

export function WhySection() {
  const { t } = useLanguage();

  return (
    <section id="why" className="relative z-[1] px-4 py-24">
      <SectionHeader
        tag={t.why.tag}
        title={
          <>
            {t.why.titlePrefix}{" "}
            <span className="text-brand">{t.why.titleHighlight}</span>
          </>
        }
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
        {/* Most studios — faded */}
        <div className="rounded-[24px] border border-line bg-white/50 p-8 opacity-70 grayscale">
          <FrameLabel name={t.why.studiosTag} className="!text-ink-faint" />
          <ul className="mt-6 space-y-4">
            {t.why.studiosItems.map((item) => (
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
              {t.why.asepBadge}
            </span>
            <FrameLabel name={t.why.asepTag} className="!text-tool" />
            <ul className="mt-6 space-y-4">
              {t.why.asepItems.map((item) => (
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
    </section>
  );
}

export default WhySection;
