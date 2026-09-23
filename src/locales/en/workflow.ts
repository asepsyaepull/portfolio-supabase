import { WorkflowDictionary } from "../types";

export const workflowEn: WorkflowDictionary = {
  tag: "how-i-works.frame",
  title: "HOW I WORK",
  subtitle:
    "Direct communication in a single unified channel. From initial brief and design exploration to production release.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "type a message in <project-channel>",
  steps: [
    {
      label: "01 · INITIATION",
      msgs: [
        {
          from: "you",
          text: "Hi Asep, are you currently open for a new project? We need a system dashboard redesign.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Hello! Yes, I'm open for new projects. Let's discuss the main goals, target users, and key challenges you want to solve.",
          time: "09.04",
        },
      ],
    },
    {
      label: "02 · BRIEF & RESEARCH",
      msgs: [
        {
          from: "you",
          text: "Here's the project brief and visual references. There are 3 main flows that need optimization.",
          time: "09.15",
          attach: "project-brief.fig",
        },
        {
          from: "asep",
          text: "Got it, I've reviewed the brief. I'll do a quick UX competitive research, then prepare the initial wireframe draft.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · ITERATION",
      msgs: [
        {
          from: "asep",
          text: "The wireframe draft is ready. Please review the primary user flows prioritized for this project.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "The direction is spot on. I think the primary button could be slightly more proportional, and the spacing between sections could be a bit looser.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Understood, I've revised the design with adjusted primary buttons and looser section spacing. Please take another look.",
          time: "15.05",
        },
        {
          from: "you",
          text: "Perfect, the revisions match our expectations. Let's proceed to the implementation phase.",
          time: "16.10",
        },
      ],
    },
    {
      label: "04 · DEPLOY",
      msgs: [
        {
          from: "asep",
          text: "I've completed the implementation and it's live in production. All user flows have been tested and verified optimal. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Awesome! We can schedule the sprint for our next project.",
          time: "10.44",
        },
      ],
    },
  ],
};
