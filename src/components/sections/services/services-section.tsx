"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";

const SERVICES = [
  {
    num: "01",
    title: "Dashboard &\nWeb App",
    titleAccent: "Design",
    tool: "Figma → Next.js",
    work: "Dashboard, admin panel, dan SaaS UI — kompleks tapi tetap nyaman dipakai. Flow data yang masuk akal, komponen yang scalable, dan handoff yang tidak bikin developer nanya dua kali.",
    deliverables: ["Wireframe", "User flow", "Hi-fi mockup", "Prototype", "Design system"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="4" rx="1" />
        <rect x="14" y="10" width="7" height="11" rx="1" />
        <rect x="3" y="13" width="7" height="8" rx="1" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Web\nDevelopment",
    titleAccent: "Production",
    tool: "Next.js & React",
    work: "Desain saya wujudkan jadi produk nyata — cepat, responsif, SEO-ready. TypeScript ketat, Tailwind rapi, CMS bila diperlukan. Satu orang dari awal sampai deploy.",
    deliverables: ["Next.js / React", "TypeScript", "Tailwind CSS", "CMS setup", "Deploy & domain"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Brand &\nDesign System",
    titleAccent: "",
    tool: "",
    work: "Bukan cuma logo. Moodboard, sistem visual utuh, dan guideline ringkas agar brand konsisten — dari Figma variables sampai investor deck.",
    deliverables: ["Moodboard", "Logo suite", "Color & type system", "Brand guideline", "Design system"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

function ServiceCard({ s, index }: { s: (typeof SERVICES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group relative w-[85vw] shrink-0 snap-center sm:w-[60%] lg:w-[32%]"
    >
      <Card variant="white" className="relative flex h-full flex-col overflow-hidden p-0 transition-shadow duration-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-brand to-brand-deep" />

        <div className="flex flex-1 flex-col p-7 md:p-8">
          {/* Number + icon row */}
          <div className="mb-6 flex items-center justify-between">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              {s.icon}
            </span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-ink-faint">
              {s.num}
            </span>
          </div>

          {/* Title */}
          <h3 className="heading-display text-[28px] font-semibold leading-[1.1] text-ink md:text-[32px]">
            {s.title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
            {s.titleAccent && (
              <span className="text-brand"> {s.titleAccent}</span>
            )}
          </h3>

          {s.tool && (
            <p className="mt-2 font-mono text-[12px] font-bold tracking-wide text-ink-faint">
              {s.tool}
            </p>
          )}

          {/* Divider */}
          <div className="my-5 h-px bg-line" />

          {/* Description */}
          <FrameLabel name="The work" className="!text-brand-deep" />
          <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
            {s.work}
          </p>

          {/* Deliverables */}
          <FrameLabel name="Deliverables" className="mt-6 !text-brand-deep" />
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {s.deliverables.map((d) => (
              <li
                key={d}
                className="rounded-full border border-line-2 bg-grid px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-soft transition-colors group-hover:border-brand/30 group-hover:text-ink"
              >
                {d}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#process"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wide text-ink transition-colors hover:text-brand"
          >
            See how it works
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Card>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section className="relative z-[1] overflow-hidden py-24 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          tag="services.fig"
          title="Capabilities"
          subtitle="Tiga layanan yang paling sering diminta."
        />
      </div>

      {/* Horizontal scroll track */}
      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 pt-2 [scrollbar-width:none] md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] [&::-webkit-scrollbar]:hidden">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.num} s={s} index={i} />
        ))}

        {/* End cap */}
        <div className="flex w-[85vw] shrink-0 snap-center items-center justify-center sm:w-[40%] lg:w-[25%]">
          <div className="text-center">
            <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-ink-faint">
              Mau lihat prosesnya?
            </p>
            <a
              href="#process"
              className="omd-btn-primary mt-5 inline-flex"
            >
              Lihat workflow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
