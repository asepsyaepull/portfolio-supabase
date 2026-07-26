"use client";
import {
  IconClipboardData,
  IconCodeCircle2,
  IconPalette,
  IconRocket
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function WorkflowSection() {
  const content = [
    {
      step: "01",
      title: "Discovery & Architecture",
      description: "Every great product starts with understanding. I audit business requirements, map complex user flows, and blueprint a scalable frontend architecture before writing a single line of code.",
      icon: <IconClipboardData size={32} />,
      visual: (
        <div className="flex items-center justify-center w-full h-full p-6 lg:p-12">
          <div className="grid grid-cols-1 gap-4 w-full max-w-[320px]">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center border border-lime-500/20">
                <IconClipboardData className="text-lime-600 dark:text-lime-500" />
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-white block mb-0.5">UX Audits</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Research Phase</span>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4 shadow-xl ml-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-white block mb-0.5">System Blueprint</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Architecture</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "Design Systems",
      description: "I translate brand identity into robust Figma variables and React design tokens. This ensures absolute consistency across platforms and accelerates the development process.",
      icon: <IconPalette size={32} />,
      visual: (
        <div className="flex items-center justify-center w-full h-full p-6 lg:p-12">
          <div className="w-full max-w-[360px] bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-300 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
              <IconPalette className="w-24 h-24" />
            </div>
            <span className="text-pink-600 dark:text-pink-400">export const</span> theme = {"{"}<br />
            &nbsp;&nbsp;colors: {"{"}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;primary: <span className="text-lime-600 dark:text-lime-300">'#84cc16'</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;surface: <span className="text-lime-600 dark:text-lime-300">'#18181b'</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;border: <span className="text-lime-600 dark:text-lime-300">'rgba(255,255,255,0.1)'</span><br />
            &nbsp;&nbsp;{"}"},<br />
            &nbsp;&nbsp;spacing: <span className="text-blue-600 dark:text-blue-300">scaleBase</span>(1.5)<br />
            {"}"};
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Frontend Engineering",
      description: "This is where the magic happens. I build accessible, highly interactive interfaces using React, Next.js, and TypeScript, focusing on clean code and robust state management.",
      icon: <IconCodeCircle2 size={32} />,
      visual: (
        <div className="flex items-center justify-center w-full h-full p-6 lg:p-12">
          <div className="bg-gradient-to-br from-zinc-50 dark:from-zinc-900 to-zinc-100 dark:to-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center gap-6 shadow-2xl w-full max-w-[340px]">
            <div className="flex -space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#3178C6] flex items-center justify-center border-[3px] border-white dark:border-zinc-950 z-30 shadow-xl hover:-translate-y-2 transition-transform">
                <span className="text-sm font-black text-white">TS</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#61DAFB] flex items-center justify-center border-[3px] border-white dark:border-zinc-950 z-20 shadow-xl hover:-translate-y-2 transition-transform">
                <svg viewBox="0 0 118 113.6" className="w-8 h-8 text-black" fill="currentColor"><path d="M59.6 96.7c-15.3 0-29.2-2.1-40.4-5.8-13.4-4.5-20.9-10.4-16.7-13.2 2-1.3 6.9-1 13.9 1 11.2 3.2 25.4 5.1 40.8 5.1h4.8c15.4 0 29.6-1.9 40.8-5.1 7-2 11.9-2.3 13.9-1 4.2 2.8-3.3 8.7-16.7 13.2-11.2 3.7-25.1 5.8-40.4 5.8zM11.6 85.3c-2 0-3.6-.3-4.8-.9-4.2-2.8 1.9-11 13.9-18.7 10-6.4 23.3-11.6 36.9-14.4l1.3 4.6c-13.1 2.7-25.9 7.7-35.4 13.9-11.6 7.4-16.5 14-13.5 15.3 1.1.7 4.1.9 8.8.4l-.5 4.7c-2.3.2-4.5.3-6.7.3zM107.6 85.3c-2.2 0-4.4-.1-6.7-.3l-.5-4.7c4.7.5 7.7.3 8.8-.4 3-1.3-1.9-7.9-13.5-15.3-9.5-6.2-22.3-11.2-35.4-13.9l1.3-4.6c13.6 2.8 26.9 8 36.9 14.4 12 7.7 18.1 15.9 13.9 18.7-1.2.6-2.8.9-4.8.9zM59.6 57.5c-2.4 0-4.7-.2-7-.6-13.9-2.7-25.7-9.4-32.5-18.4-5.2-6.9-4.7-12.2-.4-14 3.2-1.3 9.4.5 17 4.9 9.3 5.4 19.9 13.5 28.5 22.1l-3.4 3.4c-8-8-17.9-15.5-26.6-20.5-7-4.1-12.4-5.6-14.7-4.7-2.1.8-2.5 4.3 1.6 9.8 5.8 7.7 16.3 13.7 28.6 16.1 10.7 2.1 21.8 1.4 31.4-1.9l1.6 4.5c-10.2 3.6-22 4.3-33.4 2.2-4 2.7-4.2 2.7-4.2 2.7l3.5-3.5v-.1zm30.3-33.8c-2.4 0-5.1.3-7.8.9-11.4 2.1-23.2 1.4-33.4-2.2l1.6-4.5c9.6 3.3 20.7 4 31.4 1.9 12.3-2.4 22.8-8.4 28.6-16.1 4.1-5.5 3.7-9-.4-9.8-2.3-.9-7.7.6-14.7 4.7-8.7 5-18.6 12.5-26.6 20.5l-3.4-3.4c8.6-8.6 19.2-16.7 28.5-22.1 7.6-4.4 13.8-6.2 17-4.9 4.3 1.8 4.8 7.1-.4 14-6.8 9-18.6 15.7-32.5 18.4-2.6.4-5.3.6-7.9.6zM59.6 63.8c-7.9 0-14.3-6.4-14.3-14.3S51.7 35.2 59.6 35.2 73.9 41.6 73.9 49.5 67.5 63.8 59.6 63.8z" /></svg>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#38BDF8] flex items-center justify-center border-[3px] border-white dark:border-zinc-950 z-10 shadow-xl hover:-translate-y-2 transition-transform">
                <svg viewBox="0 0 256 256" className="w-8 h-8 text-white" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a40,40,0,1,1-40-40A40,40,0,0,1,176,128Zm-16,0a24,24,0,1,0-24,24A24,24,0,0,0,160,128Z" /></svg>
              </div>
            </div>
            <div className="bg-lime-500/10 text-lime-600 dark:text-lime-500 border border-lime-500/20 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse" />
              Live Build
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "04",
      title: "Validation & Launch",
      description: "Rigorous testing, Core Web Vitals optimization, and continuous iteration. I don't just launch products; I ensure they perform exceptionally well in the real world.",
      icon: <IconRocket size={32} />,
      visual: (
        <div className="flex items-center justify-center w-full h-full p-6 lg:p-12">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[320px]">
            {[
              { score: 98, label: "Performance" },
              { score: 100, label: "Accessibility" },
              { score: 100, label: "Best Practices" },
              { score: 100, label: "SEO" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-xl hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-full border-[4px] border-lime-500/20 dark:border-lime-500/30 relative flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#84cc16" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - stat.score} strokeLinecap="round" />
                  </svg>
                  <span className="text-base font-bold text-zinc-900 dark:text-white">{stat.score}</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-lime-600 dark:text-lime-500 font-bold tracking-widest text-sm uppercase">/ THE PROCESS</span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mt-4 mb-6 tracking-tight">
            How I Build <br />
            <span className="text-zinc-500 dark:text-zinc-600 italic font-serif">Digital Realities.</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light max-w-xl mx-auto">
            A narrative of turning abstract problems into precise digital experiences.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="flex flex-col gap-8 md:gap-12">
          {content.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-black text-zinc-200 dark:text-zinc-800 tracking-tighter transition-colors">
                    {item.step}
                  </span>
                  <div className="p-3 bg-lime-500/10 text-lime-600 dark:text-lime-500 rounded-2xl border border-lime-500/20 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Visual Side */}
              <div className="w-full lg:w-1/2 bg-zinc-50 dark:bg-zinc-950/50 min-h-[300px] border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-white/5 relative overflow-hidden">
                {item.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}