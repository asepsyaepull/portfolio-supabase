"use client";

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FrameLabel } from "@/components/ui/figma-tag";
import { useLanguage } from "@/context/language-context";

export function FaqSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative z-[1] px-4 py-24">
      <SectionHeader
        tag={t.faq.tag}
        title={t.faq.title}
        subtitle={t.faq.subtitle}
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.label} className={isOpen ? "omd-sel" : undefined}>
              <div
                className={`overflow-hidden rounded-2xl transition-shadow ${
                  isOpen ? "omd-card" : "border border-line bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span>
                    <FrameLabel name={item.label} className="!text-brand-deep" />
                    <span className="heading-display mt-1 block text-lg font-semibold text-ink">
                      {item.q}
                    </span>
                  </span>
                  <IconChevronDown
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">
                    {item.emailText ? (
                      <>
                        {item.a.split(item.emailText)[0]}
                        <a
                          href={`mailto:${item.emailText}`}
                          className="font-semibold underline underline-offset-2 hover:text-brand"
                        >
                          {item.emailText}
                        </a>
                        {item.a.split(item.emailText)[1]}
                      </>
                    ) : (
                      item.a
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;
