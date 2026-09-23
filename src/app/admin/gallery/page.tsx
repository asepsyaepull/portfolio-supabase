import { from } from "@/lib/pg-client";
import Link from "next/link";
import { IconPlus, IconPhoto } from "@tabler/icons-react";
import SortableGalleryList from "@/components/admin/SortableGalleryList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminGalleryPage() {
  const { data: galleries, error } = await from("ui_gallery")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching ui_gallery in admin:", error);
  }

  // Fallback demo data if DB table is empty/unmigrated
  const fallbackGalleries = [
    {
      id: "g1",
      title: "Fintech Telemetry & Liquidity Dashboard",
      slug: "fintech-telemetry-dashboard",
      category: "Web Dashboard",
      description:
        "Eksplorasi antarmuka analitik keuangan dense-data dengan palet gelap, grafik real-time telemetry, dan panel liquiditas interaktif.",
      image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "AutoLayout", "Tailwind CSS", "Design Tokens"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
      order_index: 1,
    },
    {
      id: "g2",
      title: "AetherPay - Minimalist Mobile Wallet & Split Bill",
      slug: "aetherpay-mobile-wallet",
      category: "Mobile App",
      description:
        "Konsep aplikasi dompet digital iOS dengan interaksi split bill gestural, micro-haptics feedback, dan hierarki tipografi ultra-bersih.",
      image_url:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "iOS HIG", "Design System", "Prototyping"],
      aspect_ratio: "4/3",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
      order_index: 2,
    },
    {
      id: "g3",
      title: "Pulse AI - Developer Cloud Platform Landing Page",
      slug: "pulse-ai-cloud-landing",
      category: "Landing Page",
      description:
        "Desain halaman arahan developer tool modern beraksen gelap dengan glow aksen oranye, animated code terminal preview, dan bento feature grid.",
      image_url:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "Tailwind CSS", "Framer Motion"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: "https://pulse-ai.preview.com",
      is_featured: true,
      order_index: 3,
    },
  ];

  const displayGalleries =
    galleries && galleries.length > 0 ? galleries : fallbackGalleries;

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand/10 text-brand font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>/ CMS MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            UI Gallery & Visual Archive
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Kelola eksplorasi desain, mockup aplikasi, dan visual shots yang tampil di tab galeri publik.
          </p>
        </div>

        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-brand shadow-[0_10px_20px_-10px_#F0531C] active:scale-95 transition-all self-start sm:self-auto"
        >
          <IconPlus size={18} strokeWidth={2.5} />
          <span>Add UI Shot</span>
        </Link>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-2xl text-xs font-mono">
          <p className="font-bold">Info Koneksi Database:</p>
          <p className="mt-0.5">{error.message}. (Menampilkan fallback visual data).</p>
        </div>
      )}

      {/* Sortable Gallery List */}
      {displayGalleries && displayGalleries.length > 0 ? (
        <SortableGalleryList initialGalleries={displayGalleries as any[]} />
      ) : (
        <div className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 text-center text-zinc-500 flex flex-col items-center gap-3">
          <IconPhoto size={40} className="text-zinc-400 opacity-50" />
          <p className="font-mono text-sm">Belum ada item galeri. Tambahkan shot pertama Anda!</p>
        </div>
      )}
    </div>
  );
}
