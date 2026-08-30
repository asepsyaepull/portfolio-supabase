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

export interface PipelineNode {
  tag: string;
  title: string;
  subtext: string;
  isActive?: boolean;
}

export interface PipelineBranch {
  label: string;
  statusColor: "green" | "yellow" | "blue";
  detail?: string;
}

export interface PipelineConfig {
  headerTag: string;
  headerStatus: string;
  node1: PipelineNode;
  node2: PipelineNode;
  node3: PipelineNode;
  branches: PipelineBranch[];
  terminalLine: string;
  stats: {
    workflows: string;
    tokens: string;
    avgLatency: string;
    stack: string;
  };
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
  pipeline?: PipelineConfig;
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
  pipeline?: PipelineConfig;
}

