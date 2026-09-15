import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Asep Syaepul",
  description:
    "Hubungi Asep Syaepul untuk kolaborasi desain UI/UX, rekayasa frontend Next.js/React, atau konsultasi design system. Terbuka untuk proyek freelance dan peran full-time di Jakarta maupun remote.",
  alternates: {
    canonical: "https://asyaepul.id/contact",
  },
  openGraph: {
    title: "Contact | Asep Syaepul",
    description:
      "Hubungi Asep Syaepul — UI/UX Designer & Frontend Developer. Terbuka untuk diskusi proyek, konsultasi design system, dan peluang karir baru.",
    url: "https://asyaepul.id/contact",
    siteName: "Asep Syaepul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asep Syaepul - Contact & Inquiry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Asep Syaepul",
    description:
      "Hubungi Asep Syaepul untuk kolaborasi desain UI/UX dan rekayasa frontend siap produksi.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
