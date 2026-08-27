"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconSparkles, IconFileCode } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { ChatConfig } from "./workspace-types";

interface WorkspaceChatCardProps {
  chat: ChatConfig;
  className?: string;
  style?: React.CSSProperties;
}

export function WorkspaceChatCard({ chat, className, style }: WorkspaceChatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "absolute z-10 w-[240px] md:w-[260px] rounded-[6px] border border-line-2 bg-white/95 dark:bg-[#14202B]/95 p-3.5 shadow-[3px_5px_0_0_rgba(20,32,43,0.06)] backdrop-blur-sm",
        className
      )}
      style={style}
    >
      {/* Header / Title */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-faint">
          {chat.title}
        </span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-brand">
          <IconSparkles className="h-2.5 w-2.5" />
          Live
        </span>
      </div>

      {/* User prompt */}
      <div className="rounded-[4px] bg-slate-50 dark:bg-white/5 p-2 border border-line">
        <p className="text-[11.5px] font-medium leading-snug text-ink-soft">
          {chat.user}
        </p>
      </div>

      {/* AI / Agent response */}
      <div className="mt-2.5 flex items-start gap-2">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <span className="font-mono text-[9px] font-bold">AI</span>
        </div>
        <div className="flex-1">
          <p className="text-[12px] font-semibold leading-snug text-ink">
            {chat.ai}
          </p>
          <div className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-ink-faint">
            <IconFileCode className="h-3 w-3 text-tool" />
            <span className="truncate">{chat.file}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
