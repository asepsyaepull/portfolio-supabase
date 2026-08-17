"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Smooth-scroll ke target (fallback ke native smooth scroll jika Lenis nonaktif). */
export function scrollToTarget(target: string | HTMLElement) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80, duration: 1.2 });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Lenis smooth-scroll (gaya azizkhaldi.com) yang tersinkron dengan GSAP ScrollTrigger.
 * Nonaktif di halaman admin/login dan untuk pengguna prefers-reduced-motion.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Jangan aktifkan di area admin (editor markdown punya scroll internal sendiri)
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    // Sinkronkan posisi scroll Lenis → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Driver raf Lenis lewat ticker GSAP (satu loop, performa lebih baik)
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh trigger setelah semua aset (font/gambar) selesai dimuat
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [pathname]);

  return <>{children}</>;
}
