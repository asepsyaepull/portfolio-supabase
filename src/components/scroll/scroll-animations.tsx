"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Parallax berbasis scroll (scrub) untuk semua elemen `[data-parallax]`
 * di dalam scope ref. Nilai atribut = kecepatan relatif (0.2 = 20% tinggi elemen).
 * Contoh: <div data-parallax="0.4" />
 */
export function useScrollParallax<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope || prefersReducedMotion()) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-parallax]", scope);
    if (!targets.length) return;

    const tweens = targets.map((el) => {
      const speed = parseFloat(el.dataset.parallax || "0.2");
      return gsap.fromTo(
        el,
        { yPercent: speed * 100 },
        {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [ref]);
}

/**
 * Reveal: fade + slide-in saat elemen masuk viewport (sekali).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * CountUp: angka berjalan 0 → target saat discroll ke elemen.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.value)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/**
 * ScrollProgress: garis tipis aksen di atas layar yang mengikuti progres halaman.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 pointer-events-none"
    />
  );
}
