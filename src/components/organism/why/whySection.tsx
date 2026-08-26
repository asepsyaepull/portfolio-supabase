import Link from "next/link";
import { IconCheck, IconX } from "@tabler/icons-react";

const mostStudios = [
    "Pitched senior, dikerjain junior.",
    "Booking mingguan, deliver bulan depan.",
    "Retainer mahal + tagihan kejutan.",
    "Banyak meeting sebelum pixel pertama.",
    "Rapi semua… tapi gampang dilupain.",
];

const asep = [
    "Ngobrol langsung sama orang yang desain.",
    "First draft hari, bukan kuartal.",
    "Fixed scope, fixed price.",
    "Less meetings, more shipping.",
    "Custom, susah dilupain.",
];

export default function WhySection() {
    return (
        <section id="why" className="relative z-[1] px-4 py-24">
            <p className="omd-frame-label mb-4 text-center">the-difference.fig</p>
            <h2 className="heading-display mx-auto max-w-4xl text-center text-[clamp(34px,5.5vw,64px)] font-bold uppercase leading-[1.05] text-[var(--ink)]">
                Same brief.{" "}
                <span className="text-[var(--brand)]">Different studio.</span>
            </h2>

            <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
                {/* Most studios — faded */}
                <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-8 opacity-70 grayscale">
                    <p className="omd-frame-label !text-[var(--ink-faint)]">most studios</p>
                    <ul className="mt-6 space-y-4">
                        {mostStudios.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--ink-faint)]">
                                <IconX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Asep · selected */}
                <div className="omd-card omd-sel relative p-8">
                    <span className="absolute -top-5 right-6 z-[1] inline-flex items-center gap-1.5 rounded-full bg-[var(--tool)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white">
                        pick this one
                    </span>
                    <p className="omd-frame-label !text-[var(--tool)]">Asep · selected</p>
                    <ul className="mt-6 space-y-4">
                        {asep.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-[var(--ink)]">
                                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tool)]" aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="heading-display mt-16 text-center text-xl font-medium italic text-[var(--ink-soft)]">
                Same brief, same budget. Wildly different outcome.
            </p>

            <div className="mt-6 text-center">
                <a href="#work" className="omd-btn-primary">
                    See the work
                </a>
            </div>
        </section>
    );
}
