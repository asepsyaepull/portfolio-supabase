import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const services = [
    {
        num: "01",
        title: "UI/UX",
        titleLast: "Design",
        tool: "Figma.",
        work: "Dari wireframe kasar sampai pixel-final. Flow-nya masuk akal, interface-nya enak dipandang, handoff-nya nggak bikin developer bingung.",
        deliverables: ["Wireframe", "User flow", "Hi-fi mockup", "Prototype", "Design system"],
    },
    {
        num: "02",
        title: "Web",
        titleLast: "Development",
        tool: "Next.js & React.",
        work: "Desain lo gue hidupin jadi produk beneran: cepat, responsif, SEO-ready. TypeScript ketat, Tailwind rapi, CMS kalau perlu.",
        deliverables: ["Next.js / React", "TypeScript", "Tailwind CSS", "CMS setup", "Deploy & domain"],
    },
    {
        num: "03",
        title: "Brand",
        titleLast: "Identity",
        tool: "",
        work: "Logo doang nggak cukup. Lo dapet moodboard, sistem visual yang utuh, dan guideline singkat biar brand-nya konsisten di mana pun muncul.",
        deliverables: ["Moodboard", "Logo suite", "Color & type system", "Brand guideline"],
    },
];

export default function ServicesSection() {
    return (
        <section className="relative z-[1] px-4 py-24">
            <p className="omd-frame-label mb-4 text-center">services.fig</p>
            <h2 className="heading-display text-center text-[clamp(38px,6vw,72px)] font-bold uppercase text-[var(--ink)]">
                What we make
            </h2>
            <p className="mt-3 text-center font-mono text-sm uppercase tracking-widest text-[var(--ink-soft)]">
                Tiga hal yang paling sering dipesan.
            </p>

            <div className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
                {services.map((s) => (
                    <article key={s.num} className="omd-card flex w-[85vw] shrink-0 snap-center flex-col p-8 md:w-auto">
                        {/* Number pill */}
                        <span className="inline-flex w-fit items-center rounded-full border border-[var(--line-2)] bg-[var(--grid)] px-3 py-1 font-mono text-xs font-bold text-[var(--ink)]">
                            {s.num}
                        </span>

                        <h3 className="heading-display mt-6 text-3xl font-semibold leading-tight text-[var(--ink)]">
                            {s.title}{" "}
                            <span className="text-[var(--brand)]">{s.titleLast}</span>
                            {s.tool && (
                                <>
                                    {" "}
                                    <span className="font-body text-base font-normal text-[var(--ink-soft)]">
                                        {s.tool}
                                    </span>
                                </>
                            )}
                        </h3>

                        <p className="omd-frame-label mt-8 !text-[var(--brand-deep)]">The work</p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.work}</p>

                        <p className="omd-frame-label mt-8 !text-[var(--brand-deep)]">Deliverables</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                                <li
                                    key={d}
                                    className="rounded-full border border-[var(--line-2)] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--ink)]"
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>

                        <Link href="/#process" className="omd-btn-ghost mt-10 w-fit">
                            See process
                            <IconArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
