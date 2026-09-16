import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Asep Syaepul",
  description:
    "Explore the professional background, technical expertise, and career journey of Asep Syaepul — UI/UX Designer & Frontend Developer with 7+ years of experience.",
  openGraph: {
    title: "About | Asep Syaepul",
    description:
      "Profile of Asep Syaepul — UI/UX Designer & Frontend Developer bridging high-fidelity design and production-ready code.",
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
      "Profile of Asep Syaepul — UI/UX Designer & Frontend Developer with 7+ years of experience.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
