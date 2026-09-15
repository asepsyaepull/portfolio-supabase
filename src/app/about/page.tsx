import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Asep Syaepul",
  description:
    "Pelajari profil profesional, keahlian teknis, dan perjalanan karir Asep Syaepul sebagai UI/UX Designer & Frontend Developer dengan 7+ tahun pengalaman.",
  openGraph: {
    title: "About | Asep Syaepul",
    description:
      "Profil Asep Syaepul — UI/UX Designer & Frontend Developer. Menjembatani desain fidelitas tinggi dan rekayasa kode siap produksi.",
    url: "https://asyaepul.id/about",
    siteName: "Asep Syaepul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asep Syaepul - About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Asep Syaepul",
    description:
      "Profil Asep Syaepul — UI/UX Designer & Frontend Developer dengan 7+ tahun pengalaman.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
