"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { WorkspaceCanvas } from "./workspace/workspace-canvas";
import {
  INITIAL_BOOT_LOGS,
  POINTER_WAYPOINTS,
  WORKSPACE_TRACKS,
} from "./workspace/workspace-data";
import { WorkspaceFooter } from "./workspace/workspace-footer";
import { WorkspaceHeader } from "./workspace/workspace-header";
import { WorkspaceSidebar } from "./workspace/workspace-sidebar";
import { WorkspaceTerminal } from "./workspace/workspace-terminal";
import type { LogMessage, WorkspaceConsoleProps } from "./workspace/workspace-types";

export function WorkspaceConsole({ projects = [] }: WorkspaceConsoleProps) {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [pointerIndex, setPointerIndex] = useState(0);
  const [highlightNodeIndex, setHighlightNodeIndex] = useState<number>(0);
  const [logs, setLogs] = useState<LogMessage[]>(INITIAL_BOOT_LOGS);

  const activeTrack = WORKSPACE_TRACKS[selectedTrackIndex] || WORKSPACE_TRACKS[0];
  const activeWaypoint = POINTER_WAYPOINTS[pointerIndex] || POINTER_WAYPOINTS[0];

  // Collaborative pointer animation loop (continuous)
  useEffect(() => {
    const interval = setInterval(() => {
      setPointerIndex((prev) => (prev + 1) % POINTER_WAYPOINTS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Animated diagram node highlighting loop (scaled to active track nodeCount)
  useEffect(() => {
    setHighlightNodeIndex(0);
    const count = activeTrack.nodeCount || 4;
    let node = 0;
    const interval = setInterval(() => {
      node = (node + 1) % count;
      setHighlightNodeIndex(node);
    }, 1500);
    return () => clearInterval(interval);
  }, [selectedTrackIndex, activeTrack.nodeCount]);

  const addLog = (cls: LogMessage["cls"], b: string, text: string) => {
    setLogs((prev) => [...prev, { cls, b, text }]);
  };

  const handleSelectTrack = (index: number) => {
    setSelectedTrackIndex(index);
    addLog("k-step", "·", `switched track to "${WORKSPACE_TRACKS[index].label}"`);
  };

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    addLog("k-cmd", "❯", cmd);

    if (cmd === "help") {
      addLog("k-note", "·", "available commands: open, next, clear, projects, about, contact");
    } else if (cmd === "open workspace" || cmd === "open") {
      addLog("k-step", "·", "opening workspace bench");
      addLog("k-ok", "✓", "workspace live — canvas restored");
    } else if (cmd === "next") {
      const nextIndex = (selectedTrackIndex + 1) % WORKSPACE_TRACKS.length;
      setSelectedTrackIndex(nextIndex);
      addLog("k-step", "·", `switched to "${WORKSPACE_TRACKS[nextIndex].label}"`);
    } else if (cmd === "clear") {
      setLogs(INITIAL_BOOT_LOGS.slice(0, 2));
    } else if (cmd === "projects") {
      addLog("k-step", "·", `${projects.length} project artifact(s) loaded`);
      projects.forEach((p) => addLog("k-note", "·", `  → ${p.name} (${p.category || "Project"})`));
    } else if (cmd === "about") {
      addLog("k-note", "·", "Asep Syaepul — UI/UX Designer & Lead Frontend Developer");
      addLog("k-note", "·", "7+ years crafting intuitive product interfaces · Jakarta, ID");
    } else if (cmd === "contact") {
      addLog("k-note", "·", "email: mail.asepsyaepul@gmail.com");
      addLog("k-note", "·", "status: available for freelance & high-impact projects");
    } else {
      addLog("k-err", "!", `unknown command: "${cmd}". type 'help' for available commands.`);
    }
  };

  const onBootFinished = useCallback(() => {
    // Callback if needed for telemetry or outer state
  }, []);

  return (
    <section id="work" className="relative z-[1] overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          tag="WORK BENCH & EXPERTISE"
          tagColor="brand"
          title="Interactive Craft & System Console"
          subtitle="Explore real-time workflows, frontend engineering, design systems, and product delivery in an interactive canvas."
          align="center"
        />

        {/* Main Window Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-[10px] md:rounded-[14px] border border-line-2 bg-white dark:bg-[#121B24] shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]"
        >
          {/* macOS / Figma Window Header */}
          <WorkspaceHeader activeTrackLabel={activeTrack.label} />

          {/* Window Body: Sidebar + (Canvas & Terminal) */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{ minHeight: 600 }}>
            {/* Sidebar */}
            <WorkspaceSidebar
              tracks={WORKSPACE_TRACKS}
              selectedIndex={selectedTrackIndex}
              onSelectTrack={handleSelectTrack}
            />

            {/* Main Stage (Canvas + Terminal) */}
            <div className="flex flex-col">
              {/* Interactive Canvas */}
              <WorkspaceCanvas
                track={activeTrack}
                trackIndex={selectedTrackIndex}
                highlightNodeIndex={highlightNodeIndex}
                pointerWaypoint={activeWaypoint}
              />

              {/* Interactive Terminal */}
              <WorkspaceTerminal
                logs={logs}
                onCommand={handleCommand}
                onBootFinished={onBootFinished}
              />
            </div>
          </div>

          {/* Window Footer */}
          <WorkspaceFooter />
        </motion.div>
      </div>
    </section>
  );
}

export default WorkspaceConsole;
