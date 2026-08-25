import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AccentProvider } from "@/components/accent/AccentContext";
import { Toaster } from "sonner";
import AppShell from "@/components/layouts/AppShell";

const geist = localFont({
  src: [{ path: "./fonts/GeistVF.woff", style: "normal" }],
  variable: "--font-geist",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
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
      <body className={`${geist.variable} ${spaceGrotesk.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AccentProvider>
            <AppShell>{children}</AppShell>
            <Toaster position="bottom-right" richColors />
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
