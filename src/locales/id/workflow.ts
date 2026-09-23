import { WorkflowDictionary } from "../types";

export const workflowId: WorkflowDictionary = {
  tag: "how-it-works.frame",
  title: "CARA SAYA BEKERJA",
  subtitle: "Komunikasi Langsung Dalam Satu Saluran Terpadu. Dari brief awal, eksplorasi desain, hingga rilis di production.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "ketik pesan di <project-channel>",
  steps: [
    {
      label: "01 · INISIASI",
      msgs: [
        {
          from: "you",
          text: "Halo Asep, apa kamu lagi terbuka untuk proyek baru? Kita perlu redesain dashboard sistem.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Halo! saya sedang terbuka untuk proyek baru. Mari kita diskusikan tujuan utama, target pengguna dan kendala yang ingin diselesaikan.",
          time: "09.04",
        },
      ],
    },
    {
      label: "02 · BRIEF & RISET",
      msgs: [
        {
          from: "you",
          text: "Ini dokumen brief dan referensi visualnya. Ada 3 flow utama yang perlu dioptimalkan.",
          time: "09.15",
          attach: "project-brief.fig",
        },
        {
          from: "asep",
          text: "Oke, brief sudah saya pelajari. Saya akan lakukan riset singkat terkait UX alur kompetitor, kemudian saya akan siapkan draf wireframe awal.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · ITERASI",
      msgs: [
        {
          from: "asep",
          text: "Draf wireframe selesai dibuat. Silahkan tinjau alur utama yang menjadi prioritas untuk proyek ini.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "Arahnya sudah sangat tepat. Saya rasa untuk tombol primary bisa dibuat sedikit lebih proporsional, serta spasi antar-section bisa dibuat sedikit lebih longgar.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Oke, design sudah saya revisi dengan penyesuaian tombol primary dan spasi antar-section. Silahkan tinjau kembali.",
          time: "15.05",
        },
        {
          from: "you",
          text: "Sempurna, revisi sudah sesuai. Kita lanjutkan ke tahap implementasi.",
          time: "16.10",
        },
      ],
    },
    {
      label: "04 · DEPLOY",
      msgs: [
        {
          from: "asep",
          text: "Saya sudah implementasi dan live di production. Seluruh flow sudah teruji optimal. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Mantap! Kita bisa jadwalkan sprint proyek berikutnya.",
          time: "10.44",
        },
      ],
    },
  ],
};
