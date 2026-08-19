"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function AdminSettingsPage() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
        Settings
      </h1>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
          Account
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Email
            </label>
            <p className="text-zinc-900 dark:text-white font-medium mt-1">
              {user?.email ?? "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
          Info
        </h2>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
          <p>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Database:</span>{" "}
            PostgreSQL 16 (self-hosted)
          </p>
          <p>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Framework:</span>{" "}
            Next.js
          </p>
          <p>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Storage:</span>{" "}
            Local filesystem (/public/uploads)
          </p>
        </div>
      </div>
    </div>
  );
}
