import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AppShell } from "@/components/layout/app-shell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
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
    "Portfolio of Asep Syaepul — UI/UX Designer & Frontend Developer based in Jakarta. 7+ years crafting and engineering production-grade digital products: enterprise ERP, retail POS, and modern mobile apps.",
  alternates: {
    canonical: "https://asyaepul.id",
  },
  openGraph: {
    title: "Asep Syaepul | UI/UX Designer & Frontend Developer",
    description:
      "Portfolio of Asep Syaepul — UI/UX Designer & Frontend Developer based in Jakarta. 7+ years crafting and engineering production-grade digital products: enterprise ERP, retail POS, and modern mobile apps.",
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
      "Portfolio of Asep Syaepul — UI/UX Designer & Frontend Developer based in Jakarta. 7+ years crafting and engineering production-grade digital products: enterprise ERP, retail POS, and modern mobile apps.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('asyaepul_portfolio_hello_v1')==='true'&&!location.search.includes('intro=true')){document.documentElement.classList.add('preloader-done');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${spaceMono.variable} font-sans antialiased bg-[var(--canvas)] text-[var(--ink)]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Asep Syaepul Rohman",
              jobTitle: "UI/UX Designer & Frontend Developer",
              url: "https://asyaepul.id",
              email: "mail.asepsyaepul@gmail.com",
              sameAs: [
                "https://linkedin.com/in/asepsyaepul",
                "https://github.com/asepsyaepull",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jakarta Selatan",
                addressCountry: "ID",
              },
              knowsAbout: [
                "UI/UX Design",
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript",
                "Figma",
                "Design Systems",
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
