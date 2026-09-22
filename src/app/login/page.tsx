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
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0e0e11] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#121215] rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mb-4 text-brand shadow-brand shadow-[0_8px_20px_-8px_#F0531C]">
            <IconKey size={30} className="text-brand" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">
            Studio CMS
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-mono">
            Masukkan email dan kata sandi admin Anda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="asep.syaepul95@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm dark:text-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div className="relative">
              <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_10px_22px_-8px_#F0531C] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Memverifikasi..." : "Masuk ke Studio CMS"}</span>
            <IconArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
