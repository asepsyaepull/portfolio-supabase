import Image from "next/image";

export const dynamic = "force-static";

export default function OgPreviewPage() {
  return (
    <div
      id="og-canvas"
      style={{
        width: "1200px",
        height: "630px",
        backgroundColor: "#0D1117",
        color: "#C9D1D9",
      }}
      className="relative overflow-hidden font-sans flex flex-col justify-between p-12 select-none border-none m-0 box-border"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #hello-preloader-root, header, footer, nav, nextjs-portal, [data-nextjs-dev-tools-button], [data-nextjs-toast], #__next-build-watcher, button[aria-label*="Next.js"] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            html, body { margin: 0 !important; padding: 0 !important; width: 1200px !important; height: 630px !important; overflow: hidden !important; background: #0D1117 !important; }
          `,
        }}
      />

      {/* Subtle GitHub Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #30363D 1px, transparent 1px), linear-gradient(to bottom, #30363D 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top Header: GitHub Breadcrumb & Star Pill */}
      <div className="relative z-10 flex items-center justify-between w-full border-b border-[#30363D] pb-6">
        <div className="flex items-center gap-3.5">
          {/* Personal Brand Logo */}
          <div className="w-8 h-8 relative shrink-0">
            <Image
              src="/assets/images/Logo.png"
              alt="asyaepul.id logo"
              fill
              className="object-contain"
            />
          </div>

          {/* <svg
            height="36"
            viewBox="0 0 16 16"
            width="36"
            fill="#F0F6FC"
            aria-hidden="true"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg> */}

          <div className="flex items-center gap-2 font-mono text-[22px] tracking-tight">
            <span className="text-[#8B949E] font-medium">asepsyaepull</span>
            <span className="text-[#6E7681]">/</span>
            <span className="text-[#58A6FF] font-bold">asyaepul.id</span>
          </div>

          <span className="ml-2 text-xs font-semibold text-[#8B949E] border border-[#30363D] bg-[#161B22] px-3 py-0.5 rounded-full">
            Public
          </span>
        </div>

        {/* GitHub Action / Star Button Mockup */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center border border-[#30363D] rounded-md bg-[#21262D] text-xs font-medium overflow-hidden shadow-sm">
            <span className="px-3 py-1.5 text-[#C9D1D9] flex items-center gap-1.5 border-r border-[#30363D]">
              <span className="text-[#E3B341]">★</span> Star
            </span>
            <span className="px-3 py-1.5 text-[#8B949E] font-mono bg-[#161B22]">
              2026
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#238636] text-white text-xs font-bold px-3.5 py-1.5 rounded-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Open to Work</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-between gap-10 my-auto py-2">
        <div className="flex flex-col max-w-[760px]">
          {/* Role Eyebrow with Profile Inset */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#30363D] relative shrink-0 shadow-md">
              <Image
                src="/assets/images/profile.webp"
                alt="Asep Syaepul Rohman"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base tracking-tight leading-snug">
                Asep Syaepul Rohman
              </span>
              <span className="text-[#8B949E] text-xs font-mono">
                @asepsyaepull • UI/UX Designer &amp; Developer
              </span>
            </div>
          </div>

          {/* Large Title */}
          <h1 className="text-[44px] font-black leading-[1.08] tracking-[-0.03em] text-[#F0F6FC] mb-4">
            UI/UX Designer &amp; Developer
          </h1>

          {/* Description */}
          <p className="text-[17px] leading-relaxed text-[#8B949E] font-normal mb-6">
            Bridging the gap between UI/UX design and frontend engineering.
            7+ years crafting and engineering production-grade digital products:
            enterprise ERP ecosystems, retail POS, and modern web applications.
          </p>

          {/* GitHub Topics Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              "portfolio",
              "nextjs-16",
              "react-18",
              "typescript",
              "design-system",
              "tailwind-css",
              "figma",
              "postgresql",
            ].map((topic) => (
              <span
                key={topic}
                className="bg-[#121D2F] border border-[#1F6FEB]/40 text-[#58A6FF] hover:bg-[#388BFD]/20 font-mono text-[11px] font-medium px-3 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Right Metric Bento Card (GitHub Insights Style) */}
        <div className="w-[340px] bg-[#161B22] border border-[#30363D] rounded-xl p-5 flex flex-col gap-4 shadow-xl shrink-0">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B949E] font-mono">
              Craft &amp; Experience
            </span>
            <span className="text-[#3FB950] font-mono text-xs font-bold">
              Production
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white font-sans tracking-tight">
                7+ Yrs
              </span>
              <span className="text-[11px] text-[#8B949E] font-medium">Industry Exp</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white font-sans tracking-tight">
                Enterprise
              </span>
              <span className="text-[11px] text-[#8B949E] font-medium">SaaS &amp; POS</span>
            </div>
          </div>

          <div className="border-t border-[#30363D] pt-3 flex flex-col gap-2 font-mono text-xs text-[#8B949E]">
            <div className="flex items-center justify-between">
              <span>Location:</span>
              <span className="text-[#F0F6FC] font-medium">Jakarta, ID</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Website:</span>
              <span className="text-[#58A6FF] font-medium">asyaepul.id</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: GitHub Language Breakdown Bar */}
      <div className="relative z-10 w-full flex flex-col gap-3 pt-5 border-t border-[#30363D]">
        {/* Multi-Color Language Segment Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#21262D]">
          <div style={{ width: "40%" }} className="h-full bg-[#F0531C]" />
          <div style={{ width: "26%" }} className="h-full bg-[#61DAFB]" />
          <div style={{ width: "20%" }} className="h-full bg-[#3178C6]" />
          <div style={{ width: "14%" }} className="h-full bg-[#38BDF8]" />
        </div>

        {/* Language Legend & Stats (Clean without percentages) */}
        <div className="flex items-center justify-between font-mono text-xs text-[#8B949E]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0531C]" />
              <span className="text-[#F0F6FC] font-semibold">UI/UX Design</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#61DAFB]" />
              <span className="text-[#C9D1D9] font-medium">React / Next.js</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3178C6]" />
              <span className="text-[#C9D1D9] font-medium">TypeScript</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[#C9D1D9] font-medium">Tailwind CSS</span>
            </div>
          </div>

          <div className="text-[#8B949E]">
            https://asyaepul.id
          </div>
        </div>
      </div>
    </div>
  );
}
