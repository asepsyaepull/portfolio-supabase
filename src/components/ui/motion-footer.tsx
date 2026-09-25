"use client";

import { cn } from "@/lib/utils";
import {
  IconArrowUp,
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconFileText,
  IconMail,
  IconSparkles,
} from "@tabler/icons-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useEffect, useRef } from "react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  /* Dynamic Variables using standard shadcn/tailwind tokens with HSL fallbacks */
  --pill-bg-1: color-mix(in srgb, hsl(var(--foreground)) 6%, transparent);
  --pill-bg-2: color-mix(in srgb, hsl(var(--foreground)) 3%, transparent);
  --pill-shadow: color-mix(in srgb, hsl(var(--background)) 50%, transparent);
  --pill-highlight: color-mix(in srgb, hsl(var(--foreground)) 14%, transparent);
  --pill-inset-shadow: color-mix(in srgb, hsl(var(--background)) 80%, transparent);
  --pill-border: color-mix(in srgb, hsl(var(--foreground)) 12%, transparent);

  --pill-bg-1-hover: color-mix(in srgb, hsl(var(--foreground)) 14%, transparent);
  --pill-bg-2-hover: color-mix(in srgb, hsl(var(--foreground)) 7%, transparent);
  --pill-border-hover: color-mix(in srgb, hsl(var(--foreground)) 32%, transparent);
  --pill-shadow-hover: color-mix(in srgb, hsl(var(--background)) 70%, transparent);
  --pill-highlight-hover: color-mix(in srgb, hsl(var(--foreground)) 32%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px color-mix(in srgb, hsl(var(--destructive)) 50%, transparent)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 10px color-mix(in srgb, hsl(var(--destructive)) 85%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, color-mix(in srgb, hsl(var(--foreground)) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, hsl(var(--foreground)) 4%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in srgb, var(--brand, #F0531C) 20%, transparent) 0%,
    color-mix(in srgb, hsl(var(--primary)) 12%, transparent) 35%,
    color-mix(in srgb, hsl(var(--secondary)) 15%, transparent) 60%,
    transparent 75%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  background-color: color-mix(in srgb, hsl(var(--foreground)) 5%, transparent);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: hsl(var(--foreground));
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: clamp(60px, 14vw, 260px);
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, hsl(var(--foreground)) 8%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, hsl(var(--foreground)) 14%, transparent) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, hsl(var(--foreground)) 0%, color-mix(in srgb, hsl(var(--foreground)) 50%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px color-mix(in srgb, hsl(var(--foreground)) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (High Performance & Touch Safe)
// -------------------------------------------------------------------------
type MagneticButtonProps = {
  className?: string;
  children?: React.ReactNode;
  as?: any;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  [key: string]: any;
};

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      // Disable magnetic tracking on touch devices for zero lag and clean tapping
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.4)",
            duration: 0.8,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
interface MarqueeItemProps {
  items?: string[];
}

const DEFAULT_MARQUEE_ITEMS = [
  "Accountability Redefined",
  "UI/UX Engineering",
  "Product Design",
  "Full-Stack Web",
  "Design Systems",
  "Pixel Perfection",
  "Motion & Interaction",
];

const MarqueeItem: React.FC<MarqueeItemProps> = ({ items = DEFAULT_MARQUEE_ITEMS }) => (
  <div className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6 shrink-0">
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        <span>{item}</span>
        <span className={idx % 2 === 0 ? "text-primary/60" : "text-brand/80"}>✦</span>
      </React.Fragment>
    ))}
  </div>
);

export interface CinematicFooterProps {
  heading?: string;
  giantText?: string;
  marqueeItems?: string[];
  email?: string;
  cvUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  creatorName?: string;
  contactBtnText?: string;
  cvBtnText?: string;
  navLinks?: {
    projects?: string;
    about?: string;
    contact?: string;
  };
}

export function CinematicFooter({
  heading = "Ready to begin?",
  giantText = "ASEP SYAEPUL",
  marqueeItems = DEFAULT_MARQUEE_ITEMS,
  email = "mail.asepsyaepul@gmail.com",
  cvUrl = "/cv/CV-Asep-Syaepul-Rohman.pdf",
  githubUrl = "https://github.com/asepsyaepull",
  linkedinUrl = "https://linkedin.com/in/asepsyaepul",
  creatorName = "Asep Syaepul",
  contactBtnText = "Get in Touch",
  cvBtnText = "Download CV",
  navLinks = {
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
}: CinematicFooterProps) {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!footerRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // 1. Background Parallax for Giant Text (Shifted to center-right)
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { xPercent: -50, y: "15%", opacity: 0.35 },
          {
            xPercent: -50,
            y: "-8%",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // 2. Reliable Content Reveal:
      // Uses "once: true" and trigger at top 85% so buttons ALWAYS appear and stay visible.
      // Never stuck at opacity 0 even if user doesn't scroll to the exact bottom pixel!
      const targets = [headingRef.current, linksRef.current].filter(Boolean);
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    // Refresh ScrollTrigger positions when page transitions or dynamic content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={footerRef}
        className="relative z-20 flex min-h-[auto] lg:min-h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper py-10 md:py-16"
      >
        {/* Ambient Light & Grid Background */}
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Giant background text */}
        <div
          ref={giantTextRef}
          className="footer-giant-bg-text absolute left-1/2 -bottom-[5vh] text-center whitespace-nowrap z-0 pointer-events-none select-none tracking-tighter"
        >
          {giantText}
        </div>

        {/* 1. Diagonal Sleek Marquee (Top of footer) */}
        <div className="pt-12 md:pt-20">
          <div className="relative left-0 w-full overflow-hidden border-y border-border/50 bg-background/70 backdrop-blur-md py-3 md:py-4 z-10 -rotate-1 scale-102 shadow-sm">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-muted-foreground uppercase">
              <MarqueeItem items={marqueeItems} />
              <MarqueeItem items={marqueeItems} />
            </div>
          </div>
        </div>

        {/* 2. Main Center Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-6 my-auto w-full max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tighter mb-8 md:mb-10 text-center opacity-100"
          >
            {heading}
          </h2>

          {/* Interactive Magnetic Pills Layout */}
          <div ref={linksRef} className="flex flex-col items-center gap-4 md:gap-6 w-full opacity-100">
            {/* Primary Action Links */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
              <MagneticButton
                as="a"
                href={`mailto:${email}`}
                className="footer-glass-pill px-6 md:px-10 py-3.5 md:py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
              >
                <IconMail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span>{contactBtnText || "Get in Touch"}</span>
                <IconSparkles className="w-4 h-4 text-brand opacity-80 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-6 md:px-10 py-3.5 md:py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
              >
                <IconFileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span>{cvBtnText || "Download CV"}</span>
                <IconExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>
            </div>

            {/* Secondary Social / Quick Links */}
            <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-1">
              <MagneticButton
                as="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-5 md:px-6 py-2.5 md:py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground flex items-center gap-2"
              >
                <IconBrandGithub className="w-4 h-4" />
                <span>GitHub</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-5 md:px-6 py-2.5 md:py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground flex items-center gap-2"
              >
                <IconBrandLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/projects"
                className="footer-glass-pill px-5 md:px-6 py-2.5 md:py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
              >
                {navLinks.projects || "Projects"}
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/about"
                className="footer-glass-pill px-5 md:px-6 py-2.5 md:py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
              >
                {navLinks.about || "About"}
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/contact"
                className="footer-glass-pill px-5 md:px-6 py-2.5 md:py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
              >
                {navLinks.contact || "Contact"}
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar / Credits */}
        <div className="relative z-20 w-full pt-8 md:pt-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-auto">
          {/* Copyright */}
          <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} {creatorName}. All rights reserved.
          </div>

          {/* Back to top */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-3"
          >
            <IconArrowUp className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
          </MagneticButton>
        </div>
      </footer>
    </>
  );
}

export default CinematicFooter;
