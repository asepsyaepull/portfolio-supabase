"use client";

import { useState } from "react";
import { IconArrowRight, IconMail, IconLock, IconKey } from "@tabler/icons-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login gagal");
      } else {
        toast.success("Login berhasil!");
        window.location.href = "/admin";
      }
    } catch {
      toast.error("Terjadi kesalahan");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-2xl flex items-center justify-center mb-4">
            <IconKey className="text-lime-600 dark:text-lime-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Admin Area
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Masukkan email dan kata sandi Anda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@asyaepul.id"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div className="relative">
              <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white"
              />
            </div>
          </div>

          <HoverBorderGradient
            containerClassName="rounded-xl w-full mt-2"
            as="button"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white flex items-center justify-center gap-2 w-full py-3 font-semibold"
            disabled={loading}
          >
            {loading ? "Memverifikasi..." : "Masuk"} <IconArrowRight size={18} />
          </HoverBorderGradient>
        </form>
      </div>
    </div>
  );
}
