import { IconHeart, IconPlayerPlayFilled } from "@tabler/icons-react";

// TODO: ganti testimoni asli — nama & metric di bawah fiktif/placeholder.
// Project (Crewdible/TRACtoGO) dipakai cuma sebagai konteks.
const videoCards = [
    {
        name: "Rizky Pratama",
        role: "Product Lead · Crewdible",
        metric: "+58%",
        metricLabel: "SIGNUPS",
        gradient: "linear-gradient(160deg,#1b2733 0%,#2c3e50 55%,#0d99ff33 130%)",
    },
    {
        name: "Dimas Anggara",
        role: "Engineering Manager · TRACtoGO",
        metric: "1.9s",
        metricLabel: "LOAD TIME",
        gradient: "linear-gradient(160deg,#14202b 0%,#24384a 60%,#f0531c33 130%)",
    },
    {
        name: "Sarah Wijaya",
        role: "Founder · D2C Brand",
        metric: "3.1x",
        metricLabel: "LEADS",
        gradient: "linear-gradient(160deg,#101c26 0%,#1e3245 55%,#0d99ff22 130%)",
    },
];

const textTestimonials = [
    // TODO: ganti testimoni asli
    {
        initials: "RP",
        color: "#0D99FF",
        name: "Rizky Pratama",
        role: "Product Lead · Crewdible",
        quote:
            "Onboarding lama kami bikin user kabur. Setelah redesign, signup naik 58% dan support ticket turun drastis. Komunikasinya cepat, draft pertama datang sebelum meeting kedua.",
        hearts: 214,
        badge: "RESOLVED",
    },
    {
        initials: "SW",
        color: "#F0531C",
        name: "Sarah Wijaya",
        role: "Founder · D2C Brand",
        quote:
            "Situs baru berasa beda dari kompetitor — dan konversinya ngikut. Fixed price artinya nggak ada kejutan di akhir bulan. Bakal balik lagi buat project berikutnya.",
        hearts: 168,
        badge: "VERIFIED",
    },
];

export default function ReviewsSection() {
    return (
        <section id="reviews" className="relative z-[1] px-4 py-24">
            <p className="omd-frame-label mb-4 text-center">reviews.fig</p>
            <h2 className="heading-display text-center text-[clamp(38px,6vw,72px)] font-bold uppercase text-[var(--ink)]">
                Don&apos;t take it from us
            </h2>
            <p className="mt-3 text-center font-mono text-sm uppercase tracking-widest text-[var(--ink-soft)]">
                real clients, real work.
            </p>

            {/* Video placeholder cards */}
            <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
                {videoCards.map((v) => (
                    <figure key={v.name} className="omd-card overflow-hidden p-0">
                        <div
                            className="relative flex aspect-[9/16] max-h-[420px] w-full items-center justify-center"
                            style={{ background: v.gradient }}
                        >
                            {/* Play button */}
                            <button
                                type="button"
                                aria-label={`Play testimonial video from ${v.name}`}
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
                            >
                                <IconPlayerPlayFilled className="ml-1 h-6 w-6 text-[var(--ink)]" aria-hidden />
                            </button>
                            {/* Metric overlay */}
                            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <p className="font-display text-4xl font-bold tracking-tight">{v.metric}</p>
                                <p className="omd-frame-label !text-white/70">{v.metricLabel}</p>
                            </figcaption>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-5">
                            <div>
                                <p className="text-sm font-semibold text-[var(--ink)]">{v.name}</p>
                                <p className="text-xs text-[var(--ink-faint)]">{v.role}</p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E7F6EC] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1B7A3D]">
                                Verified
                            </span>
                        </div>
                    </figure>
                ))}
            </div>

            {/* Text testimonials ala social post */}
            <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
                {textTestimonials.map((t) => (
                    <article key={t.name} className="omd-card p-7">
                        <header className="flex items-center gap-3">
                            <span
                                aria-hidden
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                                style={{ background: t.color }}
                            >
                                {t.initials}
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-[var(--ink)]">{t.name}</p>
                                <p className="omd-frame-label !normal-case !tracking-normal text-xs text-[var(--ink-faint)]">
                                    {t.role}
                                </p>
                            </div>
                        </header>
                        <blockquote className="mt-5 text-[15px] leading-relaxed text-[var(--ink)]">
                            “{t.quote}”
                        </blockquote>
                        <footer className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
                            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--ink-soft)]">
                                <IconHeart className="h-4 w-4 text-[var(--brand)]" aria-hidden />
                                {t.hearts}
                            </span>
                            <span className="rounded-full bg-[#E7F6EC] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1B7A3D]">
                                {t.badge}
                            </span>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}
