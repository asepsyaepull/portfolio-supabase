import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Asep Syaepul",
  description:
    "Get in touch with Asep Syaepul for UI/UX design partnerships, Next.js/React frontend engineering, or design system consultations. Available for freelance projects and full-time roles.",
  alternates: {
    canonical: "https://asyaepul.id/contact",
  },
  openGraph: {
    title: "Contact | Asep Syaepul",
    description:
      "Contact Asep Syaepul — UI/UX Designer & Frontend Developer. Open for project collaborations, design system consultations, and new career opportunities.",
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
      "Connect with Asep Syaepul for UI/UX design and production-ready frontend engineering collaborations.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
