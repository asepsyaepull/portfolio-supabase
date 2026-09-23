"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { IconDownload, IconMenu2, IconX } from "@tabler/icons-react";
import { ScrollRuler } from "./scroll-ruler";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { LanguageToggle } from "@/components/ui/language-toggle";

const EMAIL = "mail.asepsyaepul@gmail.com";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { name: t.common.nav.home, link: "/" },
    { name: t.common.nav.about, link: "/about" },
    { name: t.common.nav.work, link: "/projects" },
    { name: t.common.nav.contact, link: "/contact" },
  ];

  const isItemActive = (link: string) => {
    if (link === "/") return pathname === "/";
    if (link.startsWith("/#")) return false;
    return pathname === link || (link !== "/" && pathname.startsWith(link));
  };

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
          className="relative z-50 mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-line bg-white/80 px-5 py-2.5 shadow-card backdrop-blur-md"
        >
          {/* 1. Left: Logo (Balanced flex-1 to mirror right side) */}
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              aria-label="A.SYA Home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 group inline-flex items-center font-mono text-base font-bold tracking-tight text-ink transition-colors hover:text-brand"
            >
              A.SYA<span className="text-brand">.</span>
            </Link>
          </div>

          {/* 2. Center: Desktop Nav Links (Mathematically centered) */}
          <div className="hidden items-center justify-center lg:flex">
            <LayoutGroup id="navbar-desktop-nav">
              <div className="flex items-center gap-0.5">
                {navItems.map((item) => {
                  const active = isItemActive(item.link);
                  return (
                    <Link
                      key={item.link}
                      href={item.link}
                      className={cn(
                        "relative rounded-full px-3 py-1.5 font-mono text-[12px] font-bold uppercase tracking-wider transition-colors",
                        active
                          ? "text-white"
                          : "text-ink-soft hover:bg-grid/80 hover:text-ink"
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-ink shadow-xs"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* 3. Right: Actions (Balanced flex-1 to mirror left side) */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2.5">
            <LanguageToggle id="navbar-toggle" />

            <a
              href="/cv/CV-Asep-Syaepul-Rohman.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-[34px] items-center justify-center gap-1.5 rounded-full bg-brand px-3.5 font-mono text-[11.5px] font-bold uppercase tracking-wider text-white shadow-brand transition-all duration-200 hover:bg-brand-deep hover:shadow-lg active:scale-95 md:inline-flex"
            >
              <IconDownload className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{t.common.buttons.downloadCv}</span>
            </a>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line-2 bg-white text-ink transition-colors hover:bg-grid lg:hidden"
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
              ? "max-h-[32rem] opacity-100 pointer-events-auto translate-y-0"
              : "max-h-0 border-transparent opacity-0 pointer-events-none -translate-y-2 shadow-none"
          )}
        >
          <div className="flex flex-col p-3">
            {navItems.map((item) => {
              const active = isItemActive(item.link);
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 font-mono text-sm font-bold uppercase transition-colors",
                    active
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-grid"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <a
              href="/cv/CV-Asep-Syaepul-Rohman.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-brand font-mono text-xs font-bold uppercase tracking-wider text-white shadow-brand transition-all hover:bg-brand-deep"
            >
              <IconDownload className="h-4 w-4" aria-hidden />
              <span>{t.common.buttons.downloadCv}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
