"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  IconLayoutDashboard,
  IconLogout,
  IconFolder,
  IconSettings,
  IconMail,
  IconCode,
  IconPhoto,
  IconSparkles,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <IconLayoutDashboard size={19} /> },
    { name: "Projects", href: "/admin/projects", icon: <IconFolder size={19} /> },
    { name: "UI Gallery", href: "/admin/gallery", icon: <IconPhoto size={19} /> },
    { name: "Skills", href: "/admin/skills", icon: <IconCode size={19} /> },
    { name: "Media", href: "/admin/media", icon: <IconSparkles size={19} /> },
    { name: "Inbox", href: "/admin/contacts", icon: <IconMail size={19} /> },
    { name: "Settings", href: "/admin/settings", icon: <IconSettings size={19} /> },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#0e0e11] text-zinc-900 dark:text-white overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white dark:bg-[#121215] border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full hidden md:flex shrink-0 transition-colors">
        {/* Brand Studio Header */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs shadow-brand shadow-[0_4px_14px_-4px_#F0531C]">
              AS
            </div>
            <div>
              <span className="font-bold text-sm text-zinc-900 dark:text-white tracking-tight block leading-tight">
                Asep Studio
              </span>
              <span className="font-mono text-[10px] text-brand font-bold uppercase tracking-wider">
                Studio CMS
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-5 px-3.5 flex flex-col gap-1.5">
          <span className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Workspace
          </span>

          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-brand/10 text-brand border border-brand/20 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <span className={isActive ? "text-brand" : "text-zinc-500"}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {item.href === "/admin/gallery" && (
                  <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] bg-brand/20 text-brand font-mono font-bold uppercase">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Website</span>
            </span>
            <IconArrowUpRight size={14} className="text-zinc-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3.5 py-2.5 w-full rounded-xl text-xs font-mono font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <IconLogout size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0 md:hidden z-10 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center font-bold text-xs shadow-brand shadow-[0_2px_8px_-2px_#F0531C]">
              AS
            </div>
            <span className="font-bold text-sm text-zinc-900 dark:text-white">
              Studio CMS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 text-rose-600 bg-rose-50 dark:bg-rose-950/30 rounded-xl"
              title="Logout"
            >
              <IconLogout size={18} />
            </button>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="h-16 hidden md:flex items-center justify-between px-8 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-[#121215]/40 backdrop-blur-md shrink-0">
          <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            Asep Syaepul Studio &bull; Workspace Control Panel
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
