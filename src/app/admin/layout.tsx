"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconLayoutDashboard, IconLogout, IconFolder, IconSettings, IconMail, IconCode, IconPhoto } from "@tabler/icons-react";
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
    { name: "Dashboard", href: "/admin", icon: <IconLayoutDashboard size={20} /> },
    { name: "Projects", href: "/admin/projects", icon: <IconFolder size={20} /> },
    { name: "Skills", href: "/admin/skills", icon: <IconCode size={20} /> },
    { name: "Media", href: "/admin/media", icon: <IconPhoto size={20} /> },
    { name: "Inbox", href: "/admin/contacts", icon: <IconMail size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <IconSettings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full hidden md:flex shrink-0 transition-colors">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <span className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">Admin CMS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-lime-500/10 text-lime-600 dark:text-lime-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <IconLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0 md:hidden z-10 transition-colors">
            <span className="font-bold text-lg text-zinc-900 dark:text-white">Admin CMS</span>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button onClick={handleLogout} className="p-2 text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <IconLogout size={20} />
              </button>
            </div>
        </header>

        {/* Desktop Header */}
        <header className="h-16 hidden md:flex items-center justify-end px-8 shrink-0">
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
