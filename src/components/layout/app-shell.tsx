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
      {!isAdminOrLogin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminOrLogin && <Footer />}
    </div>
  );
}

export default AppShell;
