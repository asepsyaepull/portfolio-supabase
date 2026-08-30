import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WorkspaceTrack, Waypoint } from "./workspace-types";
import { AgentPipelineFlow } from "./agent-pipeline-flow";
import { WorkspaceStickyNote } from "./workspace-sticky";
import { WorkspaceChatCard } from "./workspace-chat-card";
import { WorkspacePointer } from "./workspace-pointer";

interface WorkspaceCanvasProps {
  track: WorkspaceTrack;
  trackIndex: number;
  highlightNodeIndex?: number;
  pointerWaypoint: Waypoint;
  className?: string;
}

export function WorkspaceCanvas({
  track,
  trackIndex,
  highlightNodeIndex,
  pointerWaypoint,
  className,
}: WorkspaceCanvasProps) {
  return (
    <div
      className={cn(
        "relative flex-1 overflow-hidden bg-[#FAFAF9] dark:bg-[#0E1720] select-none",
        className
      )}
      style={{ minHeight: 460 }}
    >
      {/* Subtle Dot Grid Background Pattern */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink, #14202B) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Stage Label & Tag Top Left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`stage-${trackIndex}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="absolute left-5 top-5 z-10 flex items-center gap-3 font-mono text-[11px]"
        >
          <span className="font-bold text-ink dark:text-white/90">{track.stageLabel}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-soft dark:text-white/60">{track.stageTag}</span>
        </motion.div>
      </AnimatePresence>

      {/* Main Flow Canvas - AI Agent Pipeline Flow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`pipeline-${track.id}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="absolute left-4 top-14 w-[92%] sm:w-[85%] md:w-[72%] max-w-[620px]"
        >
          <AgentPipelineFlow pipeline={track.pipeline} />
        </motion.div>
      </AnimatePresence>

      {/* Sticky Note 1 */}
      <AnimatePresence mode="wait">
        <WorkspaceStickyNote
          key={`sticky1-${trackIndex}`}
          theme={track.sticky1.theme}
          className="left-6 top-64 md:left-14 md:top-60"
        >
          {track.sticky1.lines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < track.sticky1.lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </WorkspaceStickyNote>
      </AnimatePresence>

      {/* Sticky Note 2 */}
      <AnimatePresence mode="wait">
        <WorkspaceStickyNote
          key={`sticky2-${trackIndex}`}
          theme={track.sticky2.theme}
          className="left-44 top-72 md:left-72 md:top-68"
        >
          <span>{track.sticky2.line1}</span>
          <br />
          <span className="font-bold">{track.sticky2.line2}</span>
        </WorkspaceStickyNote>
      </AnimatePresence>

      {/* Live AI / Sync Chat Card */}
      <AnimatePresence mode="wait">
        <WorkspaceChatCard
          key={`chat-${trackIndex}`}
          chat={track.chat}
          className="right-4 bottom-14 md:right-8 md:bottom-12"
        />
      </AnimatePresence>

      {/* Figma Collaborative Pointer */}
      <WorkspacePointer waypoint={pointerWaypoint} name="Asep" />

      {/* Bottom Tool Badges */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 border-t border-line-2/40 pt-2 font-mono text-[10.5px]">
        <div className="flex flex-wrap items-center gap-1.5">
          {track.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[4px] border border-line bg-white/70 dark:bg-white/5 px-2 py-0.5 text-ink-soft dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="hidden sm:inline text-ink-faint">
          live · perpetual craft
        </span>
      </div>
    </div>
  );
}

