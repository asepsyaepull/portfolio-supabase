"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { DotGridBackground } from "@/components/ui/dot-grid-background";

import { HelloPreloader } from "@/components/ui/hello-preloader";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Hide public navbar and footer on admin / login routes
  const isAdminOrLogin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F8FAFC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* First-load Multilingual Hello Preloader */}
      {!isAdminOrLogin && <HelloPreloader />}

      {/* Global interactive dot-grid background with mouse particles across all sections */}
      {!isAdminOrLogin && <DotGridBackground isFixed={true} />}

      {!isAdminOrLogin && <Navbar />}
      <main id="main-content" className="relative z-10 flex-1 bg-transparent">
        {children}
      </main>
      {!isAdminOrLogin && <Footer />}
    </div>
  );
}

export default AppShell;
