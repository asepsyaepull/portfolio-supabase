"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

const faqs = [
    {
        label: "how-it-works.frame",
        q: "Gimana cara kerjanya — langganan atau per project?",
        a: (
            <>
                Dua-duanya bisa. <strong>Project-based</strong> untuk scope jelas (landing page, redesign),{" "}
                <strong>retainer bulanan</strong> kalau butuh design/dev terus-menerus tanpa mikir ulang kontrak.
                Ngobrol dulu, kita pilih format yang paling masuk akal.
            </>
        ),
    },
    {
        label: "speed.frame",
        q: "Secepat apa draft pertama jadi?",
        a: (
            <>
                Umumnya <strong>hari, bukan minggu</strong> — first draft UI datang dalam 2–4 hari kerja setelah brief
                lengkap. Revisi berikutnya rata-rata 1–2 hari, tergantung panjang feedback lo.
            </>
        ),
    },
    {
        label: "queue.frame",
        q: "Berapa banyak project yang lo handle barengan?",
        a: (
            <>
                Maksimal <strong>2–3 aktif sekaligus</strong>. Sengaja dibikin sempit biar kualitas nggak ditawar dan
                respon tetap &lt;24 jam. Kalau penuh, lo dapet slot antrian dengan estimasi jelas.
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
                nggak ada drama "kok di Figma beda sama di browser?"
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

export default function FaqSection() {
    const [open, setOpen] = useState(0);

    return (
        <section id="faq" className="relative z-[1] px-4 py-24">
            <p className="omd-frame-label mb-4 text-center">faq.fig</p>
            <h2 className="heading-display text-center text-[clamp(38px,6vw,72px)] font-bold uppercase text-[var(--ink)]">
                The nosy section
            </h2>
            <p className="mt-3 text-center font-mono text-sm uppercase tracking-widest text-[var(--ink-soft)]">
                semua yang mau lo tanya, tanpa call.
            </p>

            <div className="mx-auto mt-12 max-w-3xl space-y-4">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={item.label} className={isOpen ? "omd-sel" : undefined}>
                            <div className={`overflow-hidden rounded-2xl transition-shadow ${isOpen ? "omd-card" : "border border-[var(--line)] bg-white/60"}`}>
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span>
                                        <span className="omd-frame-label block !text-[var(--brand-deep)]">
                                            {item.label}
                                        </span>
                                        <span className="heading-display mt-1 block text-lg font-semibold text-[var(--ink)]">
                                            {item.q}
                                        </span>
                                    </span>
                                    <IconChevronDown
                                        className={`h-5 w-5 shrink-0 text-[var(--ink-soft)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                        aria-hidden
                                    />
                                </button>
                                <div
                                    className="transition-all duration-300 ease-in-out"
                                    style={{ maxHeight: isOpen ? "220px" : "0px", opacity: isOpen ? 1 : 0 }}
                                >
                                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
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
