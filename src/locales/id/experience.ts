import { ExperienceDictionary } from "../types";

export const experienceId: ExperienceDictionary = {
  tag: "experience.fig",
  titlePrefix: "Work",
  titleHighlight: "Experience",
  subtitle:
    "7+ tahun merancang produk digital berdampak tinggi dan membangun arsitektur frontend skala enterprise.",
  items: [
    {
      id: "symbolix",
      company: "Symbolix.ai",
      role: "Lead UI/UX Developer",
      period: "Jan 2026 - Jul 2026",
      duration: "7 bln",
      type: "Kontrak",
      location: "Jakarta, ID",
      project: "Ekosistem ERP & POS",
      description:
        "Merancang ulang sistem transaksi POS dan alur kerja ERP terintegrasi untuk menyederhanakan operasional harian kasir dan tim manajemen.",
      contributions: [
        "Membangun arsitektur antarmuka berbasis Next.js dan TypeScript dengan sistem komponen modular.",
        "Merancang navigasi POS multi-cabang dengan alur checkout cepat dan ramah shortcut keyboard.",
        "Mengadakan usability testing berkala dengan pengguna kasir untuk memvalidasi efisiensi transaksi.",
      ],
      tech: ["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "korlantas",
      company: "Korlantas Polri",
      role: "Software Developer",
      period: "Jul 2025 - Feb 2026",
      duration: "8 bln",
      type: "Enterprise",
      location: "Jakarta, ID",
      project: "National Traffic Monitoring",
      description:
        "Mengembangkan aplikasi web pemantauan insiden lalu lintas nasional untuk Korps Lalu Lintas Polri dengan fokus pada stabilitas modul dan respons data real-time.",
      contributions: [
        "Mengimplementasikan komponen antarmuka berkinerja tinggi untuk visualisasi data berskala besar.",
        "Memastikan kompatibilitas modul dan kestabilan antarmuka di berbagai peramban internal institusi.",
        "Mengoptimalkan waktu render halaman pada tabel data dinamis dan pembaruan status operasional.",
      ],
      tech: ["React", "JavaScript", "PHP", "Laravel", "HTML5", "CSS3", "REST API", "Git"],
    },
    {
      id: "tractogo",
      company: "TRACtoGO (Astra SERA)",
      role: "UI/UX Designer",
      period: "Des 2024 - Mei 2025",
      duration: "6 bln",
      type: "Kontrak",
      location: "Jakarta, ID",
      project: "Fleet Rental Platform",
      description:
        "Memperbarui pengalaman pemesanan armada kendaraan pada aplikasi web dan mobile dengan standarisasi design system yang konsisten.",
      contributions: [
        "Membangun fondasi Design System terstruktur untuk menyelaraskan tim desain produk dan engineering.",
        "Menyederhanakan alur reservasi armada rental sehingga memangkas tahapan pemesanan pengguna.",
        "Menyusun spesifikasi interaksi mendalam untuk proses hand-off presisi ke tim React Native.",
      ],
      tech: ["Figma", "Design Systems", "Prototyping", "User Research"],
    },
    {
      id: "gizalab",
      company: "Gizalab",
      role: "Product Designer & Frontend",
      period: "Okt 2023 - Agu 2024",
      duration: "11 bln",
      type: "Full-time",
      location: "Bandung, ID (Remote)",
      project: "Healthcare & Diagnostic Platform",
      description:
        "Merancang alur produk digital dari tahap konsep wireframe hingga prototipe fidelitas tinggi untuk platform analitik laboratorium klinis dan data diagnostik kesehatan.",
      contributions: [
        "Merancang dashboard manajemen hasil laboratorium dan rekam medis dengan navigasi terarah.",
        "Menyusun spesifikasi token desain dan dokumentasi komponen untuk serah terima efisien ke tim engineering.",
        "Membangun prototipe interaktif untuk validasi alur kerja staf medis dan teknisi laboratorium.",
        "Mengoptimalkan keterbacaan data dan responsivitas tampilan pada monitor desktop maupun tablet klinik.",
      ],
      tech: ["Figma", "Design Tokens", "Prototyping", "User Research"],
    },
    {
      id: "crewdible",
      company: "Crewdible",
      role: "UI/UX Designer",
      period: "Mei 2022 - Apr 2023",
      duration: "1 thn",
      type: "Full-time",
      location: "Jakarta, ID",
      project: "Order Management System",
      description:
        "Merancang ulang antarmuka Order Management System (OMS) dan manajemen pergudangan untuk mendukung efisiensi ribuan merchant e-commerce.",
      contributions: [
        "Merancang ulang antarmuka pelacakan stok barang SKU dan otomatisasi status fulfillment pesanan.",
        "Menyusun prototipe interaktif untuk validasi alur kerja operasional sebelum sprint engineering.",
        "Menyelaraskan tata letak visual agar nyaman dan jelas diakses dari monitor gudang maupun perangkat bergerak.",
      ],
      tech: ["Figma", "Responsive Web", "Wireframing", "Prototyping"],
    },
    {
      id: "isuzu",
      company: "Isuzu Link (Astra Graphia)",
      role: "UI/UX Designer",
      period: "Jun 2019 - Apr 2022",
      duration: "2 thn 11 bln",
      type: "Full-time",
      location: "Jakarta, ID",
      project: "Automotive Telematics",
      description:
        "Merancang fitur dashboard telematika kendaraan komersial untuk pemantauan rute armada, jadwal servis, dan diagnostik performa mesin.",
      contributions: [
        "Merancang visualisasi pelacakan rute armada dan laporan konsumsi bahan bakar secara komprehensif.",
        "Mengelola pustaka aset visual dan panduan antarmuka untuk keselarasan beberapa squad produk paralel.",
        "Bekerja sama erat dengan tim engineer dalam pengujian fidelitas implementasi antarmuka dan data telemetri.",
      ],
      tech: ["Figma", "Information Architecture", "Prototyping", "Illustrator"],
    },
  ],
};
