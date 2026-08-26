"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";

const SERVICES = [
  {
    num: "01",
    title: "UI/UX",
    titleLast: "Design",
    tool: "Figma.",
    work: "Dari riset dan wireframe sampai handoff yang tidak bikin developer bertanya. Flow jelas, interface nyaman dipakai, dokumentasi rapi.",
    deliverables: ["Wireframe", "User flow", "Hi-fi mockup", "Prototype", "Design system"],
  },
  {
    num: "02",
    title: "Web",
    titleLast: "Development",
    tool: "Next.js & React.",
    work: "Desain saya wujudkan menjadi produk nyata: cepat, responsif, SEO-ready. TypeScript ketat, Tailwind rapi, CMS bila diperlukan.",
    deliverables: ["Next.js / React", "TypeScript", "Tailwind CSS", "CMS setup", "Deploy & domain"],
  },
  {
    num: "03",
    title: "Brand",
    titleLast: "Identity",
    tool: "",
    work: "Logo saja tidak cukup. Anda mendapat moodboard, sistem visual utuh, dan guideline ringkas agar brand konsisten di semua media.",
    deliverables: ["Moodboard", "Logo suite", "Color & type system", "Brand guideline"],
  },
];

export function ServicesSection() {
  return (
    <section className="relative z-[1] px-4 py-24">
      <SectionHeader
        tag="services.fig"
        title="Capabilities"
        subtitle="Tiga layanan yang paling sering diminta."
      />

      <div className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
        {SERVICES.map((s) => (
          <Card
            key={s.num}
            variant="white"
            className="flex w-[85vw] shrink-0 snap-center flex-col p-8 md:w-auto"
          >
            {/* Number pill */}
            <span className="inline-flex w-fit items-center rounded-full border border-line-2 bg-grid px-3 py-1 font-mono text-xs font-bold text-ink">
              {s.num}
            </span>

            <h3 className="heading-display mt-6 text-3xl font-semibold leading-tight text-ink">
              {s.title} <span className="text-brand">{s.titleLast}</span>
              {s.tool && (
                <span className="font-body text-base font-normal text-ink-soft">
                  {" "}
                  {s.tool}
                </span>
              )}
            </h3>

            <FrameLabel name="The work" className="mt-8 !text-brand-deep" />
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.work}</p>

            <FrameLabel name="Deliverables" className="mt-8 !text-brand-deep" />
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-line-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink"
                >
                  {d}
                </li>
              ))}
            </ul>

            <Link href="/#process" className="omd-btn-ghost mt-10 w-fit">
              See process
              <IconArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
