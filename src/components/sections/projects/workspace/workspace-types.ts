import type { Project } from "@/types/database";

export type StickyTheme = "yellow" | "lavender" | "sky" | "coral" | "mint";

export interface StickyData1 {
  lines: string[];
  theme: StickyTheme;
}

export interface StickyData2 {
  line1: string;
  line2: string;
  theme: StickyTheme;
}

export interface ChatConfig {
  title: string;
  user: string;
  ai: string;
  file: string;
}

export interface WorkspaceTrack {
  id: string;
  label: string;
  gp: string;
  stageLabel: string;
  stageTag: string;
  sticky1: StickyData1;
  sticky2: StickyData2;
  chat: ChatConfig;
  tags: string[];
  nodeCount: number;
}

export interface LogMessage {
  cls: "k-note" | "k-cmd" | "k-step" | "k-ok" | "k-err";
  b: string;
  text: string;
}

export interface Waypoint {
  l: number;
  t: number;
}

export interface WorkspaceConsoleProps {
  projects?: Project[];
}

export interface DiagramProps {
  highlightIndex?: number;
}
