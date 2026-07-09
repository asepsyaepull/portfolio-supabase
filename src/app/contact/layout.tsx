import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Asep Syaepul",
  description: "Get in touch for freelance work, full-time opportunities, or any project inquiries.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
