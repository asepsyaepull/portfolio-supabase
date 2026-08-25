import Link from "next/link";
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const EMAIL = "mail.asepsyaepul@gmail.com";

const studioLinks = ["About", "Services", "Work", "Pricing", "FAQ"];

const connectLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/asepsyaepul" },
    { label: "GitHub", href: "https://github.com/asepsyaepull" },
    { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Footer() {
    return (
        <footer className="relative z-[1] bg-[var(--ink)] text-white">
            <div className="container mx-auto px-6 py-16 md:px-28">
                {/* Big serif email */}
                <a
                    href={`mailto:${EMAIL}`}
                    className="font-display block text-[clamp(26px,5vw,64px)] font-semibold leading-tight tracking-tight text-white transition-colors hover:text-[var(--brand)]"
                >
                    {EMAIL}
                </a>

                <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:max-w-xl">
                    <div>
                        <p className="omd-frame-label !text-[var(--ink-faint)]">Studio</p>
                        <ul className="mt-4 space-y-2">
                            {studioLinks.map((label) => (
                                <li key={label}>
                                    <Link
                                        href={`/#${label.toLowerCase() === "faq" ? "faq" : label.toLowerCase() === "about" ? "about" : label.toLowerCase() === "services" ? "services" : label.toLowerCase()}`}
                                        className="text-sm text-white/80 transition-colors hover:text-[var(--brand)]"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="omd-frame-label !text-[var(--ink-faint)]">Connect</p>
                        <ul className="mt-4 space-y-2">
                            {connectLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-[var(--brand)]"
                                    >
                                        {link.label === "LinkedIn" && (
                                            <IconBrandLinkedin className="h-4 w-4" aria-hidden />
                                        )}
                                        {link.label === "GitHub" && (
                                            <IconBrandGithub className="h-4 w-4" aria-hidden />
                                        )}
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-white/50">
                        © 2026 Asep Syaepul — designed in Figma, built with Next.js
                    </p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="omd-btn-ghost !border-white/20 !bg-transparent !text-white hover:!bg-white/10"
                    >
                        Back to top
                        <IconArrowUp className="h-4 w-4" aria-hidden />
                    </button>
                </div>
            </div>
        </footer>
    );
}
