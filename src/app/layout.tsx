import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import AppShell from "@/components/layouts/AppShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asyaepul.id"),
  title: "Asep Syaepul | UI/UX Designer & Frontend Developer",
  description:
    "Portfolio of Asep Syaepul — UI/UX designer & frontend developer with 7+ years crafting interactive digital products. Design systems, React/Next.js, motion.",
  openGraph: {
    title: "Asep Syaepul | UI/UX Designer & Frontend Developer",
    description:
      "Portfolio of Asep Syaepul — UI/UX designer & frontend developer with 7+ years crafting interactive digital products. Design systems, React/Next.js, motion.",
    url: "https://asyaepul.id",
    siteName: "Asep Syaepul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asep Syaepul Portfolio Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asep Syaepul | UI/UX Designer & Frontend Developer",
    description:
      "Portfolio of Asep Syaepul — UI/UX designer & frontend developer with 7+ years crafting interactive digital products. Design systems, React/Next.js, motion.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${hanken.variable} ${spaceMono.variable} font-body antialiased bg-[var(--canvas)] text-[var(--ink)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
