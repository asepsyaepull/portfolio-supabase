"use client";

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FrameLabel } from "@/components/ui/figma-tag";

const FAQS = [
  {
    label: "hiring.frame",
    q: "Saya recruiter — ada posisi full-time yang cocok?",
    a: (
      <>
        Bisa banget. Selain freelance, saya <strong>terbuka untuk full-time</strong> sebagai UI/UX Designer atau
        UX Engineer di Jabodetabek. Langsung email ke{" "}
        <a href="mailto:mail.asepsyaepul@gmail.com" className="font-semibold underline underline-offset-2 hover:text-brand">
          mail.asepsyaepul@gmail.com
        </a>{" "}
        — CV siap dikirim, respons &lt;24 jam.
      </>
    ),
  },
  {
    label: "how-it-works.frame",
    q: "Gimana cara kerjanya — langganan atau per project?",
    a: (
      <>
        Dua-duanya bisa. <strong>Project-based</strong> untuk scope jelas (landing page, redesign),{" "}
        <strong>retainer bulanan</strong> kalau butuh design/dev terus-menerus tanpa mikir ulang kontrak.
        Diskusi dulu, kita pilih format yang paling sesuai.
      </>
    ),
  },
  {
    label: "speed.frame",
    q: "Secepat apa draft pertama jadi?",
    a: (
      <>
        Umumnya <strong>hari, bukan minggu</strong> — first draft UI datang dalam 2–4 hari kerja setelah brief
        lengkap. Revisi berikutnya rata-rata 1–2 hari, tergantung panjang feedback kamu.
      </>
    ),
  },
  {
    label: "queue.frame",
    q: "Berapa banyak project yang dihandle barengan?",
    a: (
      <>
        Maksimal <strong>2–3 aktif sekaligus</strong>. Sengaja dibikin sempit biar kualitas nggak ditawar dan
        respon tetap &lt;24 jam. Kalau penuh, kamu dapet slot antrian dengan estimasi jelas.
      </>
    ),
  },
  {
    label: "scope.fig",
    q: "Design doang atau sekalian full-build?",
    a: (
      <>
        Bisa dua-duanya. <strong>Design-only</strong> (Figma sampai handoff) atau{" "}
        <strong>design + development</strong> pakai Next.js/React — desain dan kode dari satu orang, jadi
        nggak ada drama &ldquo;kok di Figma beda sama di browser?&rdquo;
      </>
    ),
  },
  {
    label: "revisions.frame",
    q: "Kalau draft pertama kurang oke gimana?",
    a: (
      <>
        Bilang apa adanya — itu normal. <strong>Setiap paket termasuk revisi</strong>, dan arah desain baru
        dikunci bareng sebelum eksekusi lanjut. Nggak ada biaya siluman buat “ubah arah” di awal.
      </>
    ),
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative z-[1] px-4 py-24">
      <SectionHeader
        tag="faq.fig"
        title="The nosy section"
        subtitle="Semua yang ingin ditanya, tanpa perlu call dulu."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {FAQS.map((item, i) => {
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
                    maxHeight: isOpen ? "220px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">
                    {item.a}
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
