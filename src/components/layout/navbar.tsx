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

  // Close menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <ScrollRuler />
      <div className="relative px-4 pt-3">
        <nav
          aria-label="Main navigation"
          className="relative z-50 mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-line bg-white/80 px-5 py-2 shadow-card backdrop-blur-md"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="A.SYA Home"
            onClick={() => setIsMobileMenuOpen(false)}
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

        {/* Backdrop for closing when clicking outside */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile dropdown menu (Floating Overlay) */}
        <div
          className={cn(
            "absolute left-4 right-4 top-[calc(100%+8px)] z-50 mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-200 lg:hidden",
            isMobileMenuOpen
              ? "max-h-[28rem] opacity-100 pointer-events-auto translate-y-0"
              : "max-h-0 border-transparent opacity-0 pointer-events-none -translate-y-2 shadow-none"
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
              onClick={() => setIsMobileMenuOpen(false)}
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
