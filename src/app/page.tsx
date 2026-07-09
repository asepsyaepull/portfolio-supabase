import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Asep Syaepul | Frontend Developer",
  description: "Portfolio of Asep Syaepul, a Frontend Developer specialized in React, Next.js, and Modern Web UI.",
};

export default function Home() {
  return <HomeClient />;
}
