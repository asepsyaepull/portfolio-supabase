"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Hide public navbar and footer on admin / login routes
  const isAdminOrLogin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      {!isAdminOrLogin && <Navbar />}
      <main id="main-content" className="flex-1">{children}</main>
      {!isAdminOrLogin && <Footer />}
    </div>
  );
}

export default AppShell;
