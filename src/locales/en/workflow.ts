import { WorkflowDictionary } from "../types";

export const workflowEn: WorkflowDictionary = {
  tag: "how-it-works.frame",
  title: "No forms. No hoops. Just this.",
  subtitle:
    "One dedicated conversation thread. Here is the streamlined workflow from initial brief to live production.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "message <project-channel>",
  steps: [
    {
      label: "01 · START",
      msgs: [
        {
          from: "you",
          text: "Hey! Do you have an open slot for a new project? I need a dashboard redesign.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Yes, ready to roll 👋 Tell me about your primary goals — who is the target audience and what's the main challenge?",
          time: "09.04",
        },
      ],
    },
    {
      label: "02 · SEND BRIEF",
      msgs: [
        {
          from: "you",
          text: "Here is the project brief and visual references. There are 3 critical flows to revamp.",
          time: "09.15",
          attach: "project-brief.fig",
        },
        {
          from: "asep",
          text: "Got it, reviewed! I'll do competitive research and deliver initial wireframes today.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · REVISE",
      msgs: [
        {
          from: "asep",
          text: "Wireframes ready. Take a look at the checkout flow — that was the primary priority.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "Looks on point. Just make the primary button slightly more compact and loosen section spacing.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Noted. Revisions are included in the package — updates will be pushed today.",
          time: "15.05",
        },
      ],
    },
    {
      label: "04 · SHIP",
      msgs: [
        {
          from: "asep",
          text: "It's live! Lighthouse score 98, all user flows verified & tested. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Outstanding work. Let's line up the next project right away.",
          time: "10.44",
        },
      ],
    },
  ],
};
