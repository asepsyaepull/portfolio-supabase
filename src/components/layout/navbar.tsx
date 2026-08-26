"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconMail, IconMenu2, IconX } from "@tabler/icons-react";
import { ScrollRuler } from "./scroll-ruler";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "About", link: "/#about" },
  { name: "Services", link: "/#services" },
  { name: "Work", link: "/#work" },
  { name: "Process", link: "/#how-i-build" },
  { name: "Pricing", link: "/#pricing" },
  { name: "Contact", link: "/#contact" },
];

const EMAIL = "mail.asepsyaepul@gmail.com";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <ScrollRuler />
      <div className="sticky top-0 z-50 px-4 pt-4">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-line bg-white/80 px-5 py-2 shadow-card backdrop-blur-md"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="A.SYA Home"
            className="font-mono text-base font-bold tracking-tight text-ink"
          >
            A.SYA<span className="text-brand">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="rounded-full px-3 py-1.5 font-mono text-[13px] font-bold uppercase tracking-wide text-ink-soft transition-colors hover:bg-grid hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2">
            <a
              href="/cv/CV-Asep-Syaepul-Rohman.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="omd-btn-primary hidden truncate !py-2.5 md:inline-flex"
            >
              <IconMail className="h-4 w-4" aria-hidden />
              Download CV
            </a>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition-colors hover:bg-grid lg:hidden"
            >
              {isMobileMenuOpen ? (
                <IconX className="h-4 w-4" />
              ) : (
                <IconMenu2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        <div
          className={cn(
            "mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-line bg-white/95 shadow-card backdrop-blur-md transition-all duration-200 lg:hidden",
            isMobileMenuOpen
              ? "max-h-[28rem] opacity-100"
              : "max-h-0 border-transparent opacity-0 shadow-none"
          )}
        >
          <div className="flex flex-col p-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 font-mono text-sm font-bold uppercase text-ink hover:bg-grid"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="omd-btn-primary mt-2 justify-center"
            >
              <IconMail className="h-4 w-4" aria-hidden /> Email me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
