"use client";

import { useState } from "react";
import Link from "next/link";
import {
    IconArrowRight,
    IconMenu2,
    IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import AccentSwitcher from "@/components/accent/AccentSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
    { name: "Kerja", link: "/#work" },
    { name: "Tentang", link: "/#about" },
    { name: "Harga", link: "/#pricing" },
];

export function NavbarMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 pt-4 px-4">
            <nav
                aria-label="Main navigation"
                className="mx-auto max-w-5xl flex items-center justify-between gap-3 rounded-full border-[1.5px] border-[var(--ink)] bg-white/80 backdrop-blur-md shadow-pop py-2 pl-5 pr-2"
            >
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="A.SYA Home"
                    className="font-display text-lg font-bold tracking-tight text-[var(--ink)]"
                >
                    A.SYA<span className="text-[var(--accent)]">.</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <AccentSwitcher className="hidden sm:flex" />
                    <ThemeToggle />
                    {/* CTA */}
                    <Link
                        href="/contact"
                        className="hidden md:inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)]"
                    >
                        Let&apos;s Talk
                        <IconArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    {/* Mobile toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-white text-[var(--ink)]"
                    >
                        {isMobileMenuOpen ? (
                            <IconX className="h-4 w-4" />
                        ) : (
                            <IconMenu2 className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn(
                    "mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border-[1.5px] border-[var(--ink)] bg-white/95 backdrop-blur-md shadow-pop transition-all duration-200 md:hidden",
                    isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0 shadow-none"
                )}
            >
                <div className="flex flex-col p-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-full px-4 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between px-2 py-3">
                        <AccentSwitcher />
                    </div>
                    <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[3px_3px_0_var(--ink)]"
                    >
                        Let&apos;s Talk
                        <IconArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavbarMenu;
