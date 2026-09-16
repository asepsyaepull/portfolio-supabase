import { WorkflowDictionary } from "../types";

export const workflowId: WorkflowDictionary = {
  tag: "how-it-works.frame",
  title: "Kolaborasi terarah tanpa friksi birokrasi.",
  subtitle:
    "Komunikasi langsung dalam satu saluran terpadu. Dari brief awal, eksplorasi desain, hingga rilis di production.",
  channelName: "<project-channel>",
  onlineStatus: "3 online",
  inputPlaceholder: "ketik pesan di <project-channel>",
  steps: [
    {
      label: "01 · INISIASI",
      msgs: [
        {
          from: "you",
          text: "Halo Asep, ada slot untuk proyek baru? Kami membutuhkan redesain dashboard sistem.",
          time: "09.02",
        },
        {
          from: "asep",
          text: "Halo! Slot tersedia 👋 Mari diskusikan objektif utama — siapa target pengguna dan kendala kunci yang ingin diselesaikan?",
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
          text: "Brief sudah saya pelajari. Saya lakukan riset alur kompetitor dan siapkan draf wireframe awal hari ini.",
          time: "09.20",
        },
      ],
    },
    {
      label: "03 · ITERASI",
      msgs: [
        {
          from: "asep",
          text: "Draf wireframe selesai. Silakan tinjau alur checkout yang menjadi prioritas konversi kita.",
          time: "14.30",
          attach: "homepage-v1.png",
          reaction: "🔥 2",
        },
        {
          from: "you",
          text: "Arahnya sudah sangat tepat. Tombol primary bisa dibuat sedikit lebih proporsional, serta spacing antar-section diperlonggar.",
          time: "15.02",
          reaction: "👍 1",
        },
        {
          from: "asep",
          text: "Dipahami. Masukan Anda langsung saya terapkan dalam iterasi hari ini.",
          time: "15.05",
        },
      ],
    },
    {
      label: "04 · DEPLOY",
      msgs: [
        {
          from: "asep",
          text: "Implementasi selesai dan live di production. Skor Lighthouse 98, seluruh flow teruji optimal. 🚀",
          time: "10.41",
        },
        {
          from: "you",
          text: "Hasilnya luar biasa. Kita jadwalkan sprint proyek berikutnya.",
          time: "10.44",
        },
      ],
    },
  ],
};
