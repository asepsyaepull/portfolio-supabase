"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { IconArrowRight, IconMail, IconKey, IconLock } from "@tabler/icons-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 'otp-request' | 'otp-verify' | 'password'
  const [loginMode, setLoginMode] = useState<'otp-request' | 'otp-verify' | 'password'>('otp-request');
  const [token, setToken] = useState("");
  
  const supabase = createClient();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, 
      },
    });

    if (error) {
      if (error.message.includes("Rate limit") || error.status === 429) {
        toast.error("Terlalu banyak request (Limit OTP). Silakan gunakan mode Password.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Kode OTP telah dikirim ke email Anda!");
      setLoginMode('otp-verify');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      toast.error("Kode OTP salah atau kedaluwarsa!");
      setLoading(false);
    } else {
      toast.success("Login berhasil!");
      window.location.href = "/admin";
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Email atau Password salah!");
      setLoading(false);
    } else {
      toast.success("Login berhasil!");
      window.location.href = "/admin";
    }
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
            {loginMode === 'otp-verify'
              ? "Masukkan kode OTP yang dikirim ke email Anda." 
              : loginMode === 'password' 
                ? "Masukkan email dan kata sandi Anda."
                : "Masukkan email admin untuk menerima kode OTP."}
          </p>
        </div>

        {loginMode === 'otp-request' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
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
                  placeholder="admin@example.com"
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
              {loading ? "Mengirim..." : "Kirim OTP"} <IconArrowRight size={18} />
            </HoverBorderGradient>

            <button
              type="button"
              onClick={() => setLoginMode('password')}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mt-2"
            >
              Atau gunakan Password
            </button>
          </form>
        )}

        {loginMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
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
                  placeholder="admin@example.com"
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

            <button
              type="button"
              onClick={() => setLoginMode('otp-request')}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mt-2"
            >
              Kembali ke Login OTP
            </button>
          </form>
        )}

        {loginMode === 'otp-verify' && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Kode OTP
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white text-center text-2xl tracking-widest font-bold"
              />
            </div>
            
            <HoverBorderGradient
              containerClassName="rounded-xl w-full mt-2"
              as="button"
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white flex items-center justify-center gap-2 w-full py-3 font-semibold"
              disabled={loading}
            >
              {loading ? "Memverifikasi..." : "Masuk"} <IconArrowRight size={18} />
            </HoverBorderGradient>
            
            <button
              type="button"
              onClick={() => {
                setLoginMode('otp-request');
                setToken("");
              }}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mt-2"
            >
              Ubah Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
