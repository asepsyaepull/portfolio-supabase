import { WorkflowDictionary } from "../types";

export const workflowId: WorkflowDictionary = {
  tag: "how-it-works.frame",
  title: "Tanpa birokrasi berbelit. Cukup ini.",
  subtitle:
    "Satu thread percakapan langsung jalan. Begini alur kerjanya dari brief awal hingga live di production.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "pesan <project-channel>",
  steps: [
    {
      label: "01 · MULAI",
      msgs: [
        {
          from: "you",
          text: "Halo, ada slot buat project baru? Saya butuh redesign dashboard.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Ada, aman 👋 Ceritain dulu goals-nya — target user siapa, masalah utamanya apa.",
          time: "09.04",
        },
      ],
    },
    {
      label: "02 · KIRIM BRIEF",
      msgs: [
        {
          from: "you",
          text: "Ini brief-nya plus referensi visual. Ada 3 flow utama yang perlu diperbaiki.",
          time: "09.15",
          attach: "project-brief.fig",
        },
        {
          from: "asep",
          text: "Sudah saya baca. Saya riset kompetitor dulu, lalu kirim wireframe hari ini.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · REVISI",
      msgs: [
        {
          from: "asep",
          text: "Wireframe jadi. Cek alur checkout-nya — saya prioritaskan di sini.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "Oke arahnya bener. Tombol primary kecilin dikit, sama spacing antar section longgarin.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Masuk. Revisi termasuk paket — saya update hari ini.",
          time: "15.05",
        },
      ],
    },
    {
      label: "04 · SHIP",
      msgs: [
        {
          from: "asep",
          text: "Sudah live. Lighthouse 98, semua flow tested. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Keren. Next project langsung lanjut ya.",
          time: "10.44",
        },
      ],
    },
  ],
};
