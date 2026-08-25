"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo } from "react";

const TICKER_ITEMS = ["UI/UX", "NEXT.JS", "TYPESCRIPT", "FIGMA", "DESIGN SYSTEM", "MOTION"];

/* Scoped styles — keyframes/classes unique to this hero */
const heroCss = `
@keyframes omd-drift{from{transform:translateX(-46px)}to{transform:translateX(46px)}}
@keyframes omd-marquee{to{transform:translateX(-50%)}}
.omd-cloud{position:absolute;border-radius:9999px;background:radial-gradient(closest-side,#ffffff 58%,rgba(255,255,255,0));filter:blur(14px);animation:omd-drift 60s ease-in-out infinite alternate;will-change:transform}
.omd-track{display:flex;width:max-content;gap:56px;animation:omd-marquee 26s linear infinite}
.omd-sel::after{content:"";position:absolute;inset:-10px;border:1.5px dashed #0D99FF;border-radius:7px;pointer-events:none}
.omd-h{position:absolute;width:10px;height:10px;background:#fff;border:1.5px solid #0D99FF;border-radius:2px;pointer-events:none}
.omd-h.tl{top:-15px;left:-15px}.omd-h.tr{top:-15px;right:-15px}.omd-h.bl{bottom:-15px;left:-15px}.omd-h.br{bottom:-15px;right:-15px}
.omd-tag{position:absolute;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;z-index:5}
@media (prefers-reduced-motion:reduce){.omd-cloud,.omd-track{animation:none!important}}
`;

const Cloud = ({ style }: { style: React.CSSProperties }) => (
  <div aria-hidden className="omd-cloud" style={style} />
);

const Hero = () => {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const cx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const cy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  return (
    <section
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative z-[1] overflow-hidden bg-[#AFD8F0]"
    >
      <style dangerouslySetInnerHTML={{ __html: heroCss }} />

      {/* Drifting clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Cloud style={{ top: "10%", left: "-4%", width: 420, height: 150, opacity: 0.95 }} />
        <Cloud style={{ top: "34%", right: "-6%", width: 520, height: 190, opacity: 0.8, animationDuration: "74s", animationDelay: "-22s" }} />
        <Cloud style={{ bottom: "18%", left: "12%", width: 360, height: 130, opacity: 0.65, animationDuration: "88s", animationDelay: "-48s" }} />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1280px] flex-col items-center justify-center px-6 pb-14 pt-32 text-center">
        {/* Status pill */}
        <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-[#14202b22] bg-white/65 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#27c06b] shadow-[0_0_0_3px_rgba(39,192,107,0.18)]" />
          <span className="[font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold uppercase tracking-[0.14em] text-[#14202B]/80">
            Worked with enterprise &amp; startup teams
          </span>
        </div>

        {/* Headline wrapped in dashed Figma selection */}
        <div className="omd-sel relative px-5 py-4">
          <span className="omd-h tl" aria-hidden />
          <span className="omd-h tr" aria-hidden />
          <span className="omd-h bl" aria-hidden />
          <span className="omd-h br" aria-hidden />
          <span className="omd-tag -top-9 left-[-8px] rounded-md border border-[#14202b22] bg-white px-2 py-0.5 text-[#14202B]">
            asep.fig
          </span>
          <span className="omd-tag -bottom-9 right-[-8px] rounded-md bg-[#0D99FF] px-2 py-0.5 text-white">
            1440 × 900
          </span>

          <h1 className="uppercase [font-family:var(--font-display),'Fraunces',serif] font-semibold leading-[0.98] tracking-[-0.01em] text-[clamp(54px,11vw,140px)] text-[#F0531C]">
            Design &amp; Code
            <br />
            Yang Sulit{" "}
            <span className="hi text-[#D2410E]">Dilupakan.</span>
          </h1>
        </div>

        {/* Sub copy */}
        <p className="mt-14 max-w-[46ch] text-[16px] leading-relaxed text-[#4A6173] md:text-lg">
          7+ tahun merancang &amp; membangun produk digital — dari ERP enterprise sampai
          mobile app redesign. Desain yang hidup di production, terukur, dan enak dipakai.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="mailto:mail.asepsyaepul@gmail.com"
            className="rounded-xl bg-[#F0531C] px-6 py-[13px] [font-family:var(--font-mono),ui-monospace,monospace] text-[13px] font-bold text-white shadow-[0_12px_26px_-12px_#F0531C] transition-colors duration-200 hover:bg-[#D2410E]"
          >
            Book a call
          </a>
          <a
            href="#work"
            className="rounded-xl border border-[#14202b22] bg-white px-6 py-[13px] [font-family:var(--font-mono),ui-monospace,monospace] text-[13px] font-bold text-[#14202B] transition-colors duration-200 hover:border-[#14202B]"
          >
            See the work
          </a>
        </div>
      </div>

      {/* Corner notes */}
      <p className="absolute bottom-24 left-8 hidden [font-family:var(--font-mono),ui-monospace,monospace] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#14202B]/60 md:block">
        Working worldwide
        <br />
        No office, on purpose
      </p>
      <p className="absolute bottom-24 right-8 hidden text-right [font-family:var(--font-mono),ui-monospace,monospace] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#14202B]/60 md:block">
        Open for 2026
        <br />
        Your timezone, handled
      </p>

      {/* Ticker marquee */}
      <div className="relative overflow-hidden border-y border-[#14202b22] bg-white/45 py-4 backdrop-blur-sm">
        <div className="omd-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-[56px]" aria-hidden={dup === 1}>
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-[56px] whitespace-nowrap [font-family:var(--font-display),'Fraunces',serif] text-2xl font-semibold text-[#14202B]/60"
                >
                  {item}
                  <span className="text-base text-[#F0531C]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Collaborator cursor — lerped follow, desktop only */}
      <motion.div
        aria-hidden="true"
        style={{ x: cx, y: cy }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#14202B" stroke="#fff" strokeWidth="1.5">
          <path d="M5 3l14 7-6 2-2 6z" />
        </svg>
        <span className="absolute left-4 top-4 rounded-[5px] rounded-tl-none bg-[#14202B] px-2 py-0.5 [font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold text-white shadow-[0_6px_16px_-8px_rgba(20,32,43,0.6)]">
          Asep
        </span>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
