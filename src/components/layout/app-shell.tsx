"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { DotGridBackground } from "@/components/ui/dot-grid-background";

import { HelloPreloader } from "@/components/ui/hello-preloader";

import { LanguageProvider } from "@/context/language-context";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Hide public navbar and footer on admin / login routes
  const isAdminOrLogin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <LanguageProvider>
      <div className="relative flex min-h-screen flex-col bg-[#F8FAFC] overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        {/* First-load Multilingual Hello Preloader */}
        {!isAdminOrLogin && <HelloPreloader />}

        {!isAdminOrLogin && <Navbar />}

        {!isAdminOrLogin ? (
          <div className="relative z-10 w-full -mt-24 md:-mt-24 [filter:drop-shadow(0_20px_35px_rgba(15,23,42,0.12))]">
            <main
              id="main-content"
              className="relative w-full bg-[#F8FAFC] [clip-path:inset(0_0_0_0_round_0_0_2.5rem_2.5rem)] sm:[clip-path:inset(0_0_0_0_round_0_0_3.5rem_3.5rem)] md:[clip-path:inset(0_0_0_0_round_0_0_4.5rem_4.5rem)]"
            >
              {/* Global interactive dot-grid background with mouse particles across all sections */}
              <DotGridBackground mode="sticky" transparentBg={true} />
              <div className="relative z-10 pt-24 md:pt-24 pb-12 sm:pb-16 md:pb-20">{children}</div>
            </main>
          </div>
        ) : (
          <main id="main-content" className="relative z-10 flex-1 bg-transparent">
            {children}
          </main>
        )}

        {!isAdminOrLogin && <Footer />}
      </div>
    </LanguageProvider>
  );
}

export default AppShell;
