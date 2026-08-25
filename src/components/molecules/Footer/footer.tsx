import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

const socials = [
    { icon: IconBrandLinkedin, href: "https://linkedin.com/in/asepsyaepul", label: "LinkedIn" },
    { icon: IconBrandGithub, href: "https://github.com/asepsyaepull", label: "GitHub" },
];

export default function Footer() {
    return (
        <footer className="relative z-[1] border-t-[1.5px] border-[var(--ink)] bg-transparent py-6 text-[var(--ink)]">
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-28">
                <p className="text-xs font-medium text-[var(--muted)]">
                    © 2026 Asep Syaepul — Dirancang di Figma, dibangun dengan Next.js.
                </p>
                <div className="flex items-center gap-4">
                    {socials.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                        >
                            <social.icon className="h-4 w-4" aria-hidden />
                            {social.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
