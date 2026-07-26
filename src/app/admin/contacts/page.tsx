import { createClient } from "@/lib/supabase/server";
import { IconMail, IconCalendar, IconArrowBackUp } from "@tabler/icons-react";
import DeleteContactButton from "@/components/admin/DeleteContactButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminContactsPage() {
  const supabase = await createClient();
  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Inbox
        </h1>
        <span className="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-500 px-3 py-1 rounded-full text-sm font-bold">
          {contacts?.length || 0} messages
        </span>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          <p className="font-bold">Gagal memuat pesan:</p>
          <p className="text-sm font-mono mt-1">{error.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {contacts?.map((msg) => (
          <div
            key={msg.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                  {msg.subject}
                </h3>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="font-medium text-zinc-900 dark:text-zinc-300">
                    {msg.name}
                  </span>
                  <span>•</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="flex items-center gap-1 hover:text-lime-600 dark:hover:text-lime-500 transition-colors"
                  >
                    <IconMail size={14} />
                    {msg.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <IconCalendar size={14} />
                  {new Date(msg.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700"></div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                    className="p-2 text-lime-600 hover:text-lime-700 bg-lime-50 hover:bg-lime-100 dark:text-lime-500 dark:bg-lime-950/30 dark:hover:bg-lime-900/50 rounded-lg transition-colors"
                    title="Reply"
                  >
                    <IconArrowBackUp size={16} />
                  </a>
                  <DeleteContactButton id={msg.id} name={msg.name} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed border border-zinc-100 dark:border-zinc-800">
              {msg.message}
            </div>
          </div>
        ))}

        {(!contacts || contacts.length === 0) && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-2">
              <IconMail size={32} />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Belum ada pesan masuk
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
