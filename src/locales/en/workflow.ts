import { WorkflowDictionary } from "../types";

export const workflowEn: WorkflowDictionary = {
  tag: "how-it-works.frame",
  title: "Direct collaboration. Zero friction.",
  subtitle:
    "A dedicated, transparent workflow. From initial brief and interactive design to live production deployment.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "message <project-channel>",
  steps: [
    {
      label: "01 · KICKOFF",
      msgs: [
        {
          from: "you",
          text: "Hi Asep! Do you have an open slot for a new project? We need a dashboard redesign.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Hello! Yes, ready to roll 👋 Let's align on your primary goals — who is the target user and what is the key problem to solve?",
          time: "09.04",
        },
      ],
    },
    {
      label: "02 · BRIEF & RESEARCH",
      msgs: [
        {
          from: "you",
          text: "Here is our project brief and visual benchmarks. There are 3 core flows to overhaul.",
          time: "09.15",
          attach: "project-brief.fig",
        },
        {
          from: "asep",
          text: "Brief thoroughly reviewed! I'll conduct rapid flow benchmarking and deliver initial wireframes today.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · ITERATE",
      msgs: [
        {
          from: "asep",
          text: "Interactive wireframes are ready. Please review the checkout funnel — prioritized for conversion.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "Right on target. Let's refine the primary CTA proportions and give sections slightly more breathing room.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Noted! Revisions are fully covered — I'll push the updated layout today.",
          time: "15.05",
        },
      ],
    },
    {
      label: "04 · SHIP",
      msgs: [
        {
          from: "asep",
          text: "Successfully deployed and live in production! Lighthouse score 98, all user flows thoroughly validated. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Exceptional execution. Let's line up the next phase right away.",
          time: "10.44",
        },
      ],
    },
  ],
};
