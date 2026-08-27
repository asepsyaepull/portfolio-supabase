"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { LogMessage } from "./workspace-types";
import { QUICK_SHORTCUTS } from "./workspace-data";

interface WorkspaceTerminalProps {
  logs: LogMessage[];
  onCommand: (cmd: string) => void;
  onBootFinished: () => void;
  className?: string;
}

export function WorkspaceTerminal({
  logs,
  onCommand,
  onBootFinished,
  className,
}: WorkspaceTerminalProps) {
  const [typedInput, setTypedInput] = useState("");
  const [isBooted, setIsBooted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typedCurrentText, setTypedCurrentText] = useState("");
  const [isCurrentLineDone, setIsCurrentLineDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Finish initial boot sequence
  const handleBootComplete = () => {
    setIsBooted(true);
    setVisibleCount(logs.length);
    onBootFinished();
  };

  // Initial typewriter boot animation
  useEffect(() => {
    if (isBooted) {
      setVisibleCount(logs.length);
      return;
    }

    const currentLog = logs[visibleCount];
    if (!currentLog) {
      handleBootComplete();
      return;
    }

    let charIdx = 0;
    setTypedCurrentText("");
    setIsCurrentLineDone(false);

    const interval = setInterval(() => {
      if (charIdx < currentLog.text.length) {
        setTypedCurrentText(currentLog.text.slice(0, charIdx + 1));
        charIdx++;
      } else {
        setIsCurrentLineDone(true);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [visibleCount, logs, isBooted]);

  // Advance next line during initial typewriter boot
  useEffect(() => {
    if (!isBooted && isCurrentLineDone) {
      if (visibleCount < logs.length - 1) {
        const timer = setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
        }, 180);
        return () => clearTimeout(timer);
      } else {
        handleBootComplete();
      }
    }
  }, [isCurrentLineDone, visibleCount, logs.length, isBooted]);

  // Keep terminal in sync with dynamic logs after boot
  useEffect(() => {
    if (isBooted) {
      setVisibleCount(logs.length);
    }
  }, [logs, isBooted]);

  // Auto-scroll to bottom on new log content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, typedCurrentText, logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    onCommand(typedInput);
    setTypedInput("");
  };

  const getLogClass = (cls: LogMessage["cls"]) => {
    switch (cls) {
      case "k-ok":
        return "text-emerald-400";
      case "k-cmd":
        return "text-white font-semibold";
      case "k-step":
        return "text-cyan-300";
      case "k-err":
        return "text-rose-400";
      default:
        return "text-white/45";
    }
  };

  const currentLog = !isBooted ? logs[visibleCount] : null;

  return (
    <div className={cn("flex flex-col bg-[#0B1118] border-t border-white/10 font-mono select-none", className)}>
      {/* Log Output Screen */}
      <div
        ref={scrollRef}
        className="max-h-[140px] overflow-y-auto px-5 py-3 text-[11.5px] leading-[1.7] no-scrollbar"
      >
        {logs.slice(0, visibleCount).map((item, idx) => (
          <div key={idx} className={getLogClass(item.cls)}>
            <b className="mr-1.5 opacity-70">{item.b}</b>
            <span>{item.text}</span>
          </div>
        ))}

        {currentLog && !isCurrentLineDone && (
          <div className={getLogClass(currentLog.cls)}>
            <b className="mr-1.5 opacity-70">{currentLog.b}</b>
            <span>{typedCurrentText}</span>
            <span className="ml-1 inline-block h-3 w-[2px] animate-pulse bg-brand" />
          </div>
        )}
      </div>

      {/* Interactive Command Prompt & Shortcuts */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2.5 border-t border-white/10 bg-[#070B10] px-4 py-2"
      >
        <span className="text-[13px] font-bold text-brand">❯</span>

        <input
          type="text"
          value={typedInput}
          onChange={(e) => setTypedInput(e.target.value)}
          placeholder="try: open, next, projects, about..."
          className="flex-1 bg-transparent font-mono text-[12px] text-white/80 outline-none placeholder:text-white/20"
        />

        {/* Quick action buttons */}
        <div className="flex items-center gap-1.5">
          {QUICK_SHORTCUTS.map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => onCommand(sc)}
              className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-white/50 transition-all hover:border-brand/50 hover:bg-brand/10 hover:text-white"
            >
              {sc}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
