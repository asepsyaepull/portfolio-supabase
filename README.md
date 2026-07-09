# Portfolio Supabase

Ini adalah proyek frontend untuk web portofolio personal yang dibangun menggunakan arsitektur modern dan interaktif. Proyek ini diinisiasi dengan `create-next-app` dan diintegrasikan dengan berbagai teknologi terkini untuk menghasilkan UI/UX yang menarik, responsif, dan dinamis.

## 🚀 Tech Stack

Proyek ini dibangun menggunakan kombinasi teknologi berikut:

- **Framework:** [Next.js](https://nextjs.org/) (Pages Router) v16+ & React 18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) dengan dukungan Dark/Light Mode (via `next-themes`)
- **Animasi & Interaksi:** 
  - [Framer Motion](https://www.framer.com/motion/) untuk transisi dan animasi halaman
  - [GSAP](https://gsap.com/) untuk animasi kompleks
- **3D Graphics:** [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) untuk elemen 3D interaktif
- **Komponen UI:** Dibangun dengan pendekatan [Radix UI](https://www.radix-ui.com/) Primitives, class-variance-authority, clsx, dan tailwind-merge (seperti arsitektur shadcn/ui)
- **Backend as a Service (BaaS):** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Bahasa:** TypeScript

## 📁 Struktur Direktori

Proyek ini mengimplementasikan pola **Atomic Design** pada penyusunan komponennya:

```text
portfolio-supabase/
├── doc/                        # Dokumen terkait (Resume/CV dll)
├── public/                     # Aset statis (gambar, font, dll)
├── src/
│   ├── components/             # Kumpulan komponen UI re-usable
│   │   ├── layouts/            # Komponen tata letak (misal: AppShell)
│   │   ├── organism/           # Komponen besar/kompleks (Hero, About, Projects, Skills)
│   │   ├── molecules/          # Gabungan beberapa UI/atom
│   │   └── ui/                 # Base komponen UI primitif
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Konfigurasi utilitas & library pihak ketiga (db.ts, utils.ts)
│   ├── pages/                  # Routing halaman Next.js (index, about, projects, contact)
│   ├── styles/                 # File global CSS (globals.css)
│   └── types/                  # Definisi global tipe TypeScript
├── tailwind.config.ts          # Konfigurasi Tailwind CSS
└── package.json                # Informasi dependensi dan skrip proyek
```

## ✨ Fitur Utama

- **Animasi Transisi Halus**: Menggunakan `AnimatePresence` dari Framer Motion di dalam `_app.tsx` untuk perpindahan halaman yang mulus.
- **Dukungan Tema Terang & Gelap**: Diintegrasikan menggunakan `<ThemeProvider>` pada level Root.
- **Arsitektur Modular**: Komponen UI dipisah menggunakan metode Atomic Design (organism, molecules, ui) memudahkan untuk reusability dan maintenance.
- **Siap Terhubung dengan Backend**: Memiliki inisiasi Supabase Client (`src/lib/db.ts`) yang dapat dipakai sewaktu-waktu untuk menyimpan pesan kontak atau project list yang dinamis.
- **Desain Modern (3D & Interaktif)**: Kesiapan _libraries_ 3D dan motion memungkinkan pengalaman portofolio yang tidak kaku/statis.

## 🛠️ Cara Menjalankan Secara Lokal

1. **Clone repository ini** (jika belum) atau masuk ke direktori proyek.
2. **Install dependensi**:
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```
3. **Konfigurasi Environment**:
   Buat file `.env.local` pada root directory dan isi dengan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Jalankan Development Server**:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

## 🤝 Dokumentasi Pribadi

Dokumentasi ini dibuat untuk mempermudah navigasi dari source code Portofolio ini. Apabila terdapat perubahan struktural atau penambahan fitur baru, jangan lupa untuk memperbarui berkas `README.md` ini.
