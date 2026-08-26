"use client";

import { motion } from "framer-motion";

const CARD = "rounded-[24px] border border-[#14202b12] bg-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]";
const SERIF = "[font-family:var(--font-display),'Fraunces',serif]";
const MONO = "[font-family:var(--font-mono),ui-monospace,monospace]";

type Msg = {
  from: "you" | "asep";
  text: string;
  time: string;
  attach?: string;
  reaction?: string;
};

type Step = {
  label: string;
  msgs: Msg[];
};

const STEPS: Step[] = [
  {
    label: "01 · SUBSCRIBE",
    msgs: [
      { from: "you", text: "gas. masih ada slot bulan ini kan?", time: "09.02" },
      { from: "asep", text: "ada, aman 👋 cerita visi nya dulu yuk", time: "09.04" },
    ],
  },
  {
    label: "02 · SEND IT OVER",
    msgs: [
      { from: "you", text: "nih brief plus referensi, santai aja dibacanya", time: "09.15", attach: "project-brief.fig" },
      { from: "asep", text: "udah gue baca semua. oke, gue racik dulu 🔥", time: "09.20" },
    ],
  },
  {
    label: "03 · REFINE",
    msgs: [
      { from: "asep", text: "v1 jadi. cek ya", time: "14.30", attach: "homepage-v1.png", reaction: "🔥 2" },
      { from: "you", text: "cepet amat 😳 tombol primary nya kecilin dikit", time: "15.02", reaction: "👍 1" },
      { from: "asep", text: "beres. revisi masuk paket, santai", time: "15.05" },
    ],
  },
  {
    label: "04 · SHIP IT",
    msgs: [
      { from: "asep", text: "udah live 🚀 lighthouse 98 btw", time: "10.41" },
      { from: "you", text: "gila. project selanjutnya sini lagi ya 🔥", time: "10.44" },
    ],
  },
];

/* Flat message list for stagger indexing */
const ALL_MSGS = STEPS.flatMap((s) => s.msgs);

function Avatar({ from }: { from: "you" | "asep" }) {
  return (
    <span
      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${MONO} text-[12px] font-bold ${
        from === "asep" ? "bg-[#F0531C] text-white" : "bg-[#14202B] text-white"
      }`}
    >
      {from === "asep" ? "O" : "Y"}
    </span>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const mine = msg.from === "you";
  return (
    <div className={`flex gap-2.5 ${mine ? "flex-row-reverse" : ""}`}>
      <Avatar from={msg.from} />
      <div className={`max-w-[78%] ${mine ? "items-end text-right" : ""} flex flex-col`}>
        <div
          className={`inline-block rounded-2xl px-4 py-2.5 text-left text-[14.5px] leading-snug ${
            mine
              ? "rounded-tr-sm bg-[#14202B] text-white"
              : "rounded-tl-sm border border-[#14202b12] bg-[#F1F6FA] text-[#14202B]"
          }`}
        >
          {msg.text}
          {msg.attach && (
            <span
              className={`mt-2 flex w-fit items-center gap-2 rounded-lg border px-2.5 py-1.5 ${MONO} text-[11px] font-bold ${
                mine ? "border-white/20 bg-white/10 text-white/90" : "border-[#14202b22] bg-white text-[#4A6173]"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              {msg.attach}
            </span>
          )}
        </div>
        <div className={`mt-1 flex items-center gap-2 ${mine ? "flex-row-reverse" : ""}`}>
          <span className={`${MONO} text-[10.5px] text-[#8AA6B8]`}>{msg.time}</span>
          {msg.reaction && (
            <span className="rounded-full border border-[#14202b12] bg-white px-1.5 py-px text-[11px]">
              {msg.reaction}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkflowSection() {
  let msgIndex = -1;

  return (
    <section id="process" className="relative z-[1] overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className={`${MONO} mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F0531C]`}>
            how-it-works.frame
          </p>
          <h2 className={`${SERIF} mx-auto max-w-[16ch] text-[clamp(38px,6vw,72px)] font-semibold uppercase leading-[0.98] text-[#14202B]`}>
            No forms. No hoops. Just this.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16px] text-[#4A6173]">
            Satu thread, zero chaos. Begini jalannya.
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={`${CARD} mx-auto max-w-3xl overflow-hidden`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between gap-4 border-b border-[#14202b12] px-5 py-3.5 md:px-7">
            <div className="flex items-center gap-3">
              <span className="flex -space-x-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#F0531C] text-[11px] font-bold text-white">
                  O
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#14202B] text-[11px] font-bold text-white">
                  Y
                </span>
              </span>
              <span className={`${MONO} text-[13px] font-bold text-[#14202B]`}>&lt;project-channel&gt;</span>
            </div>
            <span className="flex items-center gap-2 [font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold text-[#4A6173]">
              <span className="h-2 w-2 rounded-full bg-[#27c06b] shadow-[0_0_0_3px_rgba(39,192,107,0.18)]" />
              3 online
            </span>
          </div>

          {/* Messages — staggered on inview */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.32 } } }}
            className="flex flex-col gap-4 bg-[#FAFCFE] px-5 py-7 md:px-7"
          >
            {STEPS.map((step) => (
              <div key={step.label}>
                {/* step divider */}
                <div className="my-5 flex items-center gap-3 first:mt-0">
                  <span className="h-px flex-1 bg-[#14202b12]" />
                  <span className={`${MONO} text-[11px] font-bold uppercase tracking-[0.16em] text-[#F0531C]`}>
                    {step.label}
                  </span>
                  <span className="h-px flex-1 bg-[#14202b12]" />
                </div>
                <div className="flex flex-col gap-4">
                  {step.msgs.map((msg) => {
                    msgIndex += 1;
                    return (
                      <motion.div
                        key={`${step.label}-${msg.time}-${msgIndex}`}
                        variants={{
                          hidden: { opacity: 0, y: 16, scale: 0.98 },
                          show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <Bubble msg={msg} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
            </motion.div>

          {/* Fake input */}
          <div className="flex items-center gap-3 border-t border-[#14202b12] px-5 py-3.5 md:px-7">
            <div className={`${MONO} flex-1 rounded-full border border-[#14202b22] px-4 py-2.5 text-[12px] text-[#8AA6B8]`}>
              message &lt;project-channel&gt;
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0531C] text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WorkflowSection;
