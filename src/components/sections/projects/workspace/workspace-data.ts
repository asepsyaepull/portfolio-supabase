import type { LogMessage, Waypoint, WorkspaceTrack } from "./workspace-types";

export const WORKSPACE_TRACKS: WorkspaceTrack[] = [
  {
    id: "workspace",
    label: "Workspace",
    gp: "Bench · Live",
    stageLabel: "Workspace",
    stageTag: "Bench · Live",
    nodeCount: 4,
    pipeline: {
      headerTag: "WORKSPACE · CRAFT PIPELINE",
      headerStatus: "Live · Ready",
      node1: {
        tag: "BRIEF & SCOPE",
        title: "User Goals",
        subtext: "discovery.fig",
      },
      node2: {
        tag: "DESIGN SYSTEM",
        title: "Tokens & Patterns",
        subtext: "reusable-ui",
      },
      node3: {
        tag: "FRONTEND CRAFT",
        title: "Interactive Code",
        subtext: "next.js · typescript",
        isActive: true,
      },
      branches: [
        { label: "Production App", statusColor: "green" },
        { label: "Tested UX Flow", statusColor: "green" },
        { label: "Lighthouse 98+", statusColor: "green" },
      ],
      terminalLine: "> Craft: build verified -> reusable components & live stages active.",
      stats: {
        workflows: "4 tracks",
        tokens: "140+ vars",
        avgLatency: "60fps",
        stack: "Figma · Next.js",
      },
    },
    sticky1: {
      lines: [
        "Reuse before you add.",
        "Every new pattern is",
        "a thing somebody",
        "has to maintain.",
      ],
      theme: "lavender",
    },
    sticky2: {
      line1: "Empty state?",
      line2: "ask design",
      theme: "sky",
    },
    chat: {
      title: "Design & Code Sync",
      user: "Make the rail crop the second card.",
      ai: "On it — 24px reveal on the second card.",
      file: "Editing WorkRail.tsx",
    },
    tags: ["figma", "next.js", "tailwind", "typescript"],
  },
  {
    id: "design-system",
    label: "Design System",
    gp: "Library · 12 parts",
    stageLabel: "Design System",
    stageTag: "Library · 12 parts",
    nodeCount: 4,
    pipeline: {
      headerTag: "DESIGN SYSTEM · TOKENS",
      headerStatus: "Synced · 0 drift",
      node1: {
        tag: "SOURCE TOKENS",
        title: "Figma Variables",
        subtext: "color · type · space",
      },
      node2: {
        tag: "TOKEN BRIDGE",
        title: "Semantic CSS",
        subtext: "tokens.json sync",
      },
      node3: {
        tag: "UI LIBRARY",
        title: "Accessible Kit",
        subtext: "radix · tailwind",
        isActive: true,
      },
      branches: [
        { label: "Storybook Docs", statusColor: "green" },
        { label: "WCAG AA Tested", statusColor: "green" },
        { label: "NPM / Lib Export", statusColor: "green" },
      ],
      terminalLine: "> Tokens: exported 142 variables -> CSS semantic variables synchronized.",
      stats: {
        workflows: "940",
        tokens: "142 vars",
        avgLatency: "64ms",
        stack: "Figma · Radix",
      },
    },
    sticky1: {
      lines: [
        "Single source of truth.",
        "One token,",
        "one value.",
        "Zero duplicates.",
      ],
      theme: "sky",
    },
    sticky2: {
      line1: "Dark mode?",
      line2: "auto from semantic tokens",
      theme: "lavender",
    },
    chat: {
      title: "System Token Bot",
      user: "Add warning color token scale.",
      ai: "Generated warning-50 through warning-900.",
      file: "Updating tokens.json",
    },
    tags: ["tokens", "figma-variables", "radix", "accessibility"],
  },
  {
    id: "product-design",
    label: "Product Design",
    gp: "End to end · 7+ yrs",
    stageLabel: "Product Design",
    stageTag: "End to end · 7+ yrs",
    nodeCount: 4,
    pipeline: {
      headerTag: "PRODUCT UX · LIFECYCLE",
      headerStatus: "Validated · Ready",
      node1: {
        tag: "USER RESEARCH",
        title: "Interviews & Needs",
        subtext: "user discovery",
      },
      node2: {
        tag: "WIREFRAMING",
        title: "Flow & Information",
        subtext: "lo-fi architecture",
      },
      node3: {
        tag: "PROTOTYPING",
        title: "Hi-Fi Validation",
        subtext: "interactive figma",
        isActive: true,
      },
      branches: [
        { label: "Usability Pass", statusColor: "green" },
        { label: "Design Specs", statusColor: "green" },
        { label: "Production Ready", statusColor: "green" },
      ],
      terminalLine: "> UX: prototype usability score 94/100 -> ready for development handoff.",
      stats: {
        workflows: "520",
        tokens: "28 screens",
        avgLatency: "4.2 days",
        stack: "Figma · Prototype",
      },
    },
    sticky1: {
      lines: [
        "Talk to users.",
        "Then talk to",
        "users again.",
        "Never assume.",
      ],
      theme: "yellow",
    },
    sticky2: {
      line1: "Ship date?",
      line2: "when it's validated",
      theme: "mint",
    },
    chat: {
      title: "Product UX Flow",
      user: "Onboarding flow has too many steps.",
      ai: "Reduced 5 → 3 steps. Here is the new flow.",
      file: "Editing onboarding.fig",
    },
    tags: ["research", "wireframing", "usability", "metrics"],
  },
  {
    id: "frontend-dev",
    label: "Frontend Dev",
    gp: "Next.js · TypeScript",
    stageLabel: "Frontend Dev",
    stageTag: "Code · Production",
    nodeCount: 4,
    pipeline: {
      headerTag: "FRONTEND DEV · PIPELINE",
      headerStatus: "Production · 0 errors",
      node1: {
        tag: "CODE & UI",
        title: "TypeScript Spec",
        subtext: "typed components",
      },
      node2: {
        tag: "BUILD ENGINE",
        title: "Next.js Turbopack",
        subtext: "app router · ssr",
      },
      node3: {
        tag: "OPTIMIZATION",
        title: "Performance Tuning",
        subtext: "memo & edge cache",
        isActive: true,
      },
      branches: [
        { label: "Edge Bundle", statusColor: "green" },
        { label: "Zero CLS / INP", statusColor: "green" },
        { label: "Vercel Deploy", statusColor: "green" },
      ],
      terminalLine: "> Build: compiled 48 modules in 184ms -> edge deployed successfully.",
      stats: {
        workflows: "3,890",
        tokens: "128KB",
        avgLatency: "184ms",
        stack: "Next.js · Tailwind",
      },
    },
    sticky1: {
      lines: [
        "Type safety first.",
        "Write clean code,",
        "build scalable apps.",
        "Ship with confidence.",
      ],
      theme: "coral",
    },
    sticky2: {
      line1: "Performance target?",
      line2: "Lighthouse 98+",
      theme: "yellow",
    },
    chat: {
      title: "Frontend Engineering",
      user: "Optimize component re-renders and cache data fetching.",
      ai: "Implemented SWR caching and memoized component tree.",
      file: "Editing useProjects.ts",
    },
    tags: ["react", "next.js", "typescript", "tailwind"],
  },
];

export const INITIAL_BOOT_LOGS: LogMessage[] = [
  { cls: "k-note", b: "·", text: "the portfolio — type `help`, or click a shortcut below" },
  { cls: "k-cmd", b: "❯", text: "open workspace" },
  { cls: "k-step", b: "·", text: "opening interactive bench..." },
  { cls: "k-note", b: "·", text: "↳ Ask for it, design it, code it, ship it." },
  { cls: "k-step", b: "·", text: "restoring canvas — diagrams, notes, active stage" },
  { cls: "k-ok", b: "✓", text: "workspace live — ready for exploration" },
];

export const POINTER_WAYPOINTS: Waypoint[] = [
  { l: 200, t: 88 },
  { l: 450, t: 95 },
  { l: 190, t: 220 },
  { l: 390, t: 230 },
  { l: 480, t: 180 },
];

export const QUICK_SHORTCUTS = ["next", "help", "clear", "projects"] as const;
