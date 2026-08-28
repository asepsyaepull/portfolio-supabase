"use client";

import { DotGridBackground } from "@/components/ui/dot-grid-background";
import React, { useState } from "react";
import StatusBadge from "./badge";

export { DotGridBackground };

/* ─────────────────────────────────────────────
   All styles inlined — no Tailwind, no CSS file
   Background is ALWAYS light (#F8FAFC) regardless of
   the host page's color scheme.
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&display=swap');

  /* Hard-reset: force light palette on the entire component */
  .qhero-shell,
  .qhero-shell *,
  .qhero-shell *::before,
  .qhero-shell *::after {
    box-sizing: border-box;
  }

  .qhero-shell {
    font-family: 'Space Grotesk', sans-serif;
    color-scheme: light;          /* tells the browser: render ME in light */
    background: transparent;
    color: #0f172a;
  }

  /* ── Navbar ── */
  .qhero-nav-wrap {
    position: fixed;
    top: 16px;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 0 16px;
  }

  .qhero-nav-pill {
    width: 100%;
    max-width: 56rem;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(251,146,60,0.25);
    border-radius: 9999px;
    box-shadow: 0 8px 32px rgba(234,88,12,0.07);
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 300ms;
  }

  /* Logo SVG */
  .qhero-logo-svg {
    width: 7rem;
    height: auto;
    flex-shrink: 0;
  }

  /* Desktop nav links */
  .qhero-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .qhero-nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    transition: color 200ms, transform 200ms;
  }
  .qhero-nav-link:hover { color: #ea580c; transform: scale(1.08); }

  /* CTA button in navbar */
  .qhero-nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 4px 14px rgba(15,23,42,0.15);
    white-space: nowrap;
  }
  .qhero-nav-cta:hover { background: #ea580c; transform: scale(1.05); box-shadow: 0 6px 18px rgba(234,88,12,0.3); }

  /* Mobile hamburger */
  .qhero-hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #0f172a;
    flex-direction: column;
    gap: 5px;
    z-index: 110;
    position: relative;
  }
  .qhero-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 250ms, opacity 250ms;
  }

  /* Mobile overlay */
  .qhero-mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
  }
  .qhero-mobile-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
  .qhero-mobile-link {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    text-decoration: none;
    transition: color 200ms;
  }
  .qhero-mobile-link:hover { color: #ea580c; }
  .qhero-mobile-cta {
    margin-top: 2rem;
    padding: 12px 32px;
    font-size: 1.125rem;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms;
  }
  .qhero-mobile-cta:hover { background: #ea580c; }

  @media (max-width: 767px) {
    .qhero-nav-links,
    .qhero-nav-cta { display: none; }
    .qhero-hamburger { display: flex; }
  }

  /* ── Hero ── */

  /* Glitch on "BUSINESS" */
  .qhero-glitch {
    position: relative;
    display: inline-block;
    font-weight: 900;
    color: #0f172a;                   /* start dark */
    animation: qhero-color-toggle 7s infinite step-end;
  }
  .qhero-glitch::before,
  .qhero-glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0;
    background: #F8FAFC;             /* match the white bg */
  }
  .qhero-glitch::before { animation: qhero-glitch-1 7s infinite linear; z-index: 2; }
  .qhero-glitch::after  { animation: qhero-glitch-2 7s infinite linear; z-index: 3; }

  @keyframes qhero-color-toggle {
    0%,  44%   { color: #0f172a; text-shadow: none; }
    42.1%, 44.9% { text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff; }
    45%,  94%  { color: #f97316; text-shadow: none; }
    92.1%, 94.9% { text-shadow: -2px 0 #a3e635, 2px 0 #ef4444; }
    95%, 100%  { color: #0f172a; text-shadow: none; }
  }

  @keyframes qhero-glitch-1 {
    0%,   42%  { opacity: 0; transform: translate(0); }
    42.1%      { opacity: 1; color: #00ffff; clip-path: polygon(0 0,100% 0,100% 45%,0 45%); transform: translate(-10px,-5px) skew(20deg); }
    43%        { color: #ff00ff; transform: translate(10px,5px) skew(-20deg); clip-path: polygon(0 10%,100% 0,100% 30%,0 35%); }
    44%        { color: #f97316; transform: translate(-10px,5px); clip-path: polygon(0 40%,100% 50%,100% 80%,0 90%); }
    44.9%      { opacity: 1; }
    45%        { opacity: 0; }
    45.1%, 92% { opacity: 0; transform: translate(0); }
    92.1%      { opacity: 1; color: #00ffff; clip-path: polygon(0 60%,100% 55%,100% 100%,0 100%); transform: translate(10px,-5px) skew(10deg); }
    93%        { color: #ff00ff; transform: translate(-5px,5px) skew(-10deg); clip-path: polygon(0 20%,100% 20%,100% 100%,0 80%); }
    94.9%      { opacity: 1; }
    95%        { opacity: 0; }
  }
  @keyframes qhero-glitch-2 {
    0%,   42%  { opacity: 0; transform: translate(0); }
    42.1%      { opacity: 1; color: #a3e635; clip-path: polygon(0 55%,100% 55%,100% 100%,0 100%); transform: translate(10px,5px); }
    43%        { color: #ef4444; transform: translate(-10px,-5px) skew(10deg); clip-path: polygon(0 20%,100% 20%,100% 100%,0 80%); }
    45%        { opacity: 0; }
    45.1%, 92% { opacity: 0; transform: translate(0); }
    92.1%      { opacity: 1; color: #a3e635; clip-path: polygon(0 0,100% 0,100% 45%,0 45%); transform: translate(-10px,-5px); }
    93%        { color: #ef4444; transform: translate(10px,5px) skew(-20deg); clip-path: polygon(0 10%,100% 0,100% 30%,0 35%); }
    95%        { opacity: 0; }
  }

  /* Tagline pulse */
  @keyframes qhero-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.6; }
  }
  .qhero-tagline-pulse { animation: qhero-pulse 2s ease-in-out infinite; }

  /* Hero CTA button */
  .qhero-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 9999px;
    background: #ea580c;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 10px 30px rgba(234,88,12,0.25);
    position: relative;
    z-index: 30;
  }
  .qhero-btn:hover { background: #c2410c; transform: scale(1.05); box-shadow: 0 14px 36px rgba(234,88,12,0.35); }
  .qhero-btn:active { transform: scale(0.96); }
  .qhero-btn svg { transition: transform 200ms; }
  .qhero-btn:hover svg { transform: translateX(4px); }

  /* Secondary ghost button */
  .qhero-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(15, 23, 42, 0.15);
    color: #0f172a;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    transition: all 200ms;
    backdrop-filter: blur(8px);
    position: relative;
    z-index: 30;
  }
  .qhero-btn-ghost:hover {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
    transform: scale(1.05);
  }
`;

/* ─────────────────────────────────────────────
   Inline Quordix logo SVG (no image file needed)
───────────────────────────────────────────── */
export function QuordixLogo() {
  return (
    <svg
      viewBox="0 0 669 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="qhero-logo-svg"
      role="img"
      aria-label="Quordix"
    >
      <path
        fill="#0f172a"
        d="M392.152 86.976H370.136V136H352.6V72H367.064L370.136 77.248L379.224 72H392.152V86.976ZM419.823 71.36H436.591L445.679 76.608V42.56H463.215V136.64H448.751L445.679 131.392L436.591 136.64H419.823L404.975 128.064V79.936L419.823 71.36ZM445.679 121.664V86.336H422.511V121.664H445.679ZM500.011 72V136H482.475V72H500.011ZM481.835 60.096V42.56H500.651V60.096H481.835ZM511.545 136L534.841 103.36L512.313 72H531.385L543.929 90.048L556.473 72H575.545L552.889 103.36L576.313 136H557.497L543.929 116.8L530.361 136H511.545Z"
      />
      <path
        fill="#0f172a"
        d="M28.8 63.12V123.28H62.72V63.12H28.8ZM46.592 138.64H25.728L10.88 130.064V56.336L25.728 47.76H65.792L80.64 56.336V130.064L65.792 138.64L80.256 163.6H60.672L46.592 138.64ZM101.1 130.064V74H118.636V123.664H140.524V74H158.06V138.64H143.596L140.524 133.392L131.436 138.64H115.948L101.1 130.064Z"
      />
      <path
        stroke="#F97316"
        d="M237.18 47L188 92.7119L237.18 140"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="#F97316"
        d="M271 140L320.18 94.2881L271 47"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="#F97316"
        d="M602 128H661"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Navbar (self-contained, no Next.js deps)
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function QuordixNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="qhero-nav-wrap">
        <div className="qhero-nav-pill">
          {/* Logo */}
          <a href="#" style={{ display: "block", textDecoration: "none" }}>
            <QuordixLogo />
          </a>

          {/* Desktop links */}
          <nav aria-label="Main Navigation">
            <ul className="qhero-nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="qhero-nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="#contact" className="qhero-nav-cta">
              Let's Talk
            </a>
            <button
              className="qhero-hamburger"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                style={{
                  transform: open ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span
                style={{
                  transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`qhero-mobile-overlay${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="qhero-mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="qhero-mobile-cta" onClick={() => setOpen(false)}>
          Let's Talk
        </a>
      </div>
    </>
  );
}

export interface QuordixHeroProps {
  tagline?: string;
  titleTop?: string;
  titleGlitch?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showNavbar?: boolean;
  showBackground?: boolean;
  isFixedBackground?: boolean;
  className?: string;
}

/* ─────────────────────────────────────────────
   Root export
───────────────────────────────────────────── */
export default function QuordixHero({
  tagline = "Designer / Developer",
  titleTop = "UI/UX Designer",
  titleGlitch = "Developer",
  subtitle = "I design and build fast websites, secure database systems, and custom mobile apps. Simple plans, direct communication, and reliable execution.",
  ctaText = "Start Project",
  ctaHref = "#work",
  secondaryCtaText,
  secondaryCtaHref,
  showNavbar = true,
  showBackground = true,
  isFixedBackground = false,
  className = "",
}: QuordixHeroProps) {
  return (
    <div
      className={`qhero-shell ${className}`}
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: showBackground ? "#F8FAFC" : "transparent",
        colorScheme: "light" as React.CSSProperties["colorScheme"],
      }}
    >
      <style>{STYLES}</style>

      {/* Layer 0: dot-grid background */}
      {showBackground && <DotGridBackground isFixed={isFixedBackground} />}

      {/* Layer 1: Navbar */}
      {showNavbar && <QuordixNavbar />}

      {/* Layer 2: Hero content */}
      <main
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: showNavbar ? "6rem 1rem 3rem" : "1rem 1rem 8rem",
          width: "100%",
          maxWidth: "64rem",
          margin: "0 auto",
        }}
      >
        <div className="mb-4">
          <StatusBadge status="available">available now</StatusBadge>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              userSelect: "none",
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Orange tagline */}
            {tagline && (
              <span
                className="qhero-tagline-pulse"
                style={{
                  fontSize: "clamp(0.65rem, 2vw, 1.05rem)",
                  fontWeight: 900,
                  letterSpacing: "0.28em",
                  color: "#ea580c",
                  marginBottom: "1.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span style={{ opacity: 0.6 }}>&lt;</span>
                <span>{tagline}</span>
                <span style={{ opacity: 0.6 }}>/&gt;</span>
              </span>
            )}

            {/* Large split title */}
            <div
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                position: "relative",
              }}
            >
              {/* Line 1 */}
              {titleTop && <span style={{ color: "#0f172a", opacity: 0.9 }}>{titleTop}</span>}

              {/* Line 2 with brackets directly aligned horizontally and vertically */}
              {titleGlitch && (
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Left bracket < aligned with Line 2 */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: "100%",
                      marginRight: "0.2em",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.05em",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "#ea580c",
                      opacity: 0.18,
                      userSelect: "none",
                      pointerEvents: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    &lt;
                  </span>

                  <span className="qhero-glitch" data-text={titleGlitch}>
                    {titleGlitch}
                  </span>

                  {/* Right bracket /> aligned with Line 2 and optically balanced */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "100%",
                      marginLeft: "0.2em",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.05em",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "#ea580c",
                      opacity: 0.18,
                      userSelect: "none",
                      pointerEvents: "none",
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76em",
                        transform: "scaleY(0.82) translateY(-12%)",
                        display: "inline-block",
                        fontWeight: 900,
                      }}
                    >
                      /
                    </span>
                    <span>&gt;</span>
                  </span>
                </div>
              )}
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              fontWeight: 400,
              color: "#64748b",
              maxWidth: "38rem",
              lineHeight: 1.7,
              margin: "0 0 3rem",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          {ctaText && (
            <a href={ctaHref} className="qhero-btn">
              <span>{ctaText}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </a>
          )}
          {secondaryCtaText && (
            <a href={secondaryCtaHref || "#"} className="qhero-btn-ghost">
              <span>{secondaryCtaText}</span>
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
