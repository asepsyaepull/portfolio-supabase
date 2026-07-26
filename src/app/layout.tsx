import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import AppShell from "@/components/layouts/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asepsyaepul.com"),
  title: "Asep Syaepul | Software Developer",
  description: "A portfolio showcasing my skills and projects as a software developer and engineer.",
  openGraph: {
    title: "Asep Syaepul | Software Developer",
    description: "A portfolio showcasing my skills and projects as a software developer and engineer.",
    url: "https://asepsyaepul.com",
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
    title: "Asep Syaepul | Software Developer",
    description: "A portfolio showcasing my skills and projects as a software developer and engineer.",
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
      <body className={`${inter.className} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
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
