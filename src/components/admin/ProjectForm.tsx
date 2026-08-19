"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  IconDeviceFloppy,
  IconChevronDown,
  IconRefresh,
  IconUpload,
  IconX,
  IconInfoCircle,
  IconCircleCheck,
  IconCircleDashed,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconFileCode,
  IconEye,
} from "@tabler/icons-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiSupabase,
  SiThreedotjs,
  SiNodedotjs,
  SiVuedotjs,
  SiJavascript,
} from "react-icons/si";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import MarkdownPreviewModal from "@/components/admin/MarkdownPreviewModal";

export interface ProjectFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tech_stack: string;
  is_featured: boolean;
  role: string;
  timeline: string;
  tags: string;
  tools: string;
  long_description: string;
  link: string;
  problem: string;
  solution: string;
  icon_name: string;
  order_index: number;
}

export const emptyFormData: ProjectFormData = {
  name: "",
  slug: "",
  category: "",
  description: "",
  image: "",
  tech_stack: "",
  is_featured: false,
  role: "",
  timeline: "",
  tags: "",
  tools: "",
  long_description: "",
  link: "",
  problem: "",
  solution: "",
  icon_name: "",
  order_index: 0,
};

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel: string;
  loadingLabel: string;
}

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Desktop App",
  "API / Backend",
  "Other",
];

// Which sections are required for a "complete" project
type SectionKey = "basic" | "media" | "detail" | "casestudy" | "content";

const SECTIONS: { key: SectionKey; title: string; description: string }[] = [
  { key: "basic", title: "Informasi Dasar", description: "Nama, kategori, dan deskripsi singkat" },
  { key: "media", title: "Media & Link", description: "Cover image dan link demo" },
  { key: "detail", title: "Detail Project", description: "Tech stack, role, timeline, tags, tools" },
  { key: "casestudy", title: "Case Study", description: "Problem & solution — opsional" },
  { key: "content", title: "Konten Lengkap", description: "Full case study dalam Markdown" },
];

export default function ProjectForm({
  initialData,
  onSubmit,
  submitLabel,
  loadingLabel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData ?? emptyFormData
  );
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set<SectionKey>(["basic"])
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // Open all sections that have data
      const open = new Set<SectionKey>(["basic"]);
      if (initialData.image || initialData.link) open.add("media");
      if (initialData.tech_stack || initialData.role || initialData.timeline)
        open.add("detail");
      if (initialData.problem || initialData.solution) open.add("casestudy");
      if (initialData.long_description) open.add("content");
      setOpenSections(open);
    }
  }, [initialData]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      setIsDirty(true);
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "number"
            ? Number(value)
            : value,
      }));
    },
    []
  );

  const handleEditorChange = useCallback((field: string, value: string) => {
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const generateSlug = () => {
    if (!formData.name) return;
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setIsDirty(false);
    } catch (err: any) {
      const msg = err?.message || JSON.stringify(err);
      // ponytail: use dynamic import to avoid hard dep — swap for toast provider if needed
      const { toast } = await import("sonner");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Section completion check
  const sectionComplete = (key: SectionKey): boolean => {
    switch (key) {
      case "basic":
        return !!(formData.name && formData.slug && formData.category && formData.description);
      case "media":
        return !!formData.image;
      case "detail":
        return !!formData.tech_stack;
      case "casestudy":
        return !!(formData.problem && formData.solution);
      case "content":
        return !!formData.long_description;
    }
  };

  const completedCount = SECTIONS.filter((s) => sectionComplete(s.key)).length;

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white transition-colors";

  const labelClass = "text-sm font-semibold text-zinc-700 dark:text-zinc-300";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-24">
      {/* Progress bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Kelengkapan
          </span>
          <span className="text-sm font-bold text-lime-600 dark:text-lime-500">
            {completedCount}/{SECTIONS.length} section
          </span>
        </div>
        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-500 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* === Section: Basic === */}
      <SectionAccordion
        section={SECTIONS[0]}
        open={openSections.has("basic")}
        complete={sectionComplete("basic")}
        onToggle={() => toggleSection("basic")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Project Name <Required />
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={generateSlug}
              className={inputClass}
              placeholder="e.g. E-Commerce App"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Slug (URL) <Required />
            </label>
            <div className="flex gap-2">
              <input
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`flex-1 ${inputClass}`}
                placeholder="e-commerce-app"
              />
              <button
                type="button"
                onClick={generateSlug}
                title="Generate dari nama"
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <IconRefresh size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Category <Required />
            </label>
            <select
              required
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Pilih kategori...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formData.category === "Other" && (
              <input
                name="category"
                value={formData.category === "Other" ? "" : formData.category}
                onChange={handleChange}
                className={`mt-1 ${inputClass}`}
                placeholder="Tulis kategori custom..."
              />
            )}
          </div>

          <div className="flex items-end gap-4 pb-1">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-5 h-5 rounded text-lime-600 focus:ring-lime-500 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />
              <span className={labelClass}>⭐ Featured (tampil di homepage)</span>
            </label>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className={labelClass}>
              Short Description <Required />
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="Ringkasan singkat project untuk card..."
              maxLength={300}
            />
            <span className="text-xs text-zinc-400 text-right">
              {formData.description.length}/300
            </span>
          </div>
        </div>
      </SectionAccordion>

      {/* === Section: Media & Link === */}
      <SectionAccordion
        section={SECTIONS[1]}
        open={openSections.has("media")}
        complete={sectionComplete("media")}
        onToggle={() => toggleSection("media")}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Cover Image</label>
            <ImageUploadField
              value={formData.image}
              onChange={(url) => {
                setIsDirty(true);
                setFormData((prev) => ({ ...prev, image: url }));
              }}
              inputClass={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Project Link / Demo URL</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://myproject.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Icon Name</label>
              <IconPicker
                value={formData.icon_name}
                onChange={(val) => {
                  setIsDirty(true);
                  setFormData((prev) => ({ ...prev, icon_name: val }));
                }}
                inputClass={inputClass}
              />
            </div>
          </div>
        </div>
      </SectionAccordion>

      {/* === Section: Detail === */}
      <SectionAccordion
        section={SECTIONS[2]}
        open={openSections.has("detail")}
        complete={sectionComplete("detail")}
        onToggle={() => toggleSection("detail")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className={labelClass}>Tech Stack</label>
            <input
              type="text"
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              className={inputClass}
              placeholder="Next.js, React, Tailwind CSS"
            />
            <Hint>Pisahkan dengan koma</Hint>
            {formData.tech_stack && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {formData.tech_stack
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. May 2022 → Nov 2022"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Redesign, UI/UX"
            />
            <Hint>Pisahkan dengan koma</Hint>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Tools</label>
            <input
              type="text"
              name="tools"
              value={formData.tools}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Figma, Jira"
            />
            <Hint>Pisahkan dengan koma</Hint>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Sort Order</label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={handleChange}
              className={inputClass}
              placeholder="0"
            />
            <Hint>Angka kecil tampil lebih dulu</Hint>
          </div>
        </div>
      </SectionAccordion>

      {/* === Section: Case Study === */}
      <SectionAccordion
        section={SECTIONS[3]}
        open={openSections.has("casestudy")}
        complete={sectionComplete("casestudy")}
        onToggle={() => toggleSection("casestudy")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Problem</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Masalah apa yang diselesaikan project ini?"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Solution</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Bagaimana project ini menyelesaikannya?"
            />
          </div>
        </div>
      </SectionAccordion>

      {/* === Section: Content === */}
      <SectionAccordion
        section={SECTIONS[4]}
        open={openSections.has("content")}
        complete={sectionComplete("content")}
        onToggle={() => toggleSection("content")}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-bold transition-colors"
            >
              <IconEye size={16} />
              Preview Markdown
            </button>
          </div>
          <MarkdownEditor
            value={formData.long_description}
            onChange={(val) => handleEditorChange("long_description", val)}
          />
        </div>
      </SectionAccordion>

      {/* Preview Modal */}
      <MarkdownPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        markdownContent={formData.long_description}
      />

      {/* Sticky submit bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {isDirty ? (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                ● Perubahan belum disimpan
              </span>
            ) : (
              <span className="text-zinc-400">Tidak ada perubahan</span>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !isDirty}
            className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDeviceFloppy size={20} />
            {loading ? loadingLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

// --- Sub-components ---

function Required() {
  return <span className="text-red-400 ml-0.5">*</span>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
      <IconInfoCircle size={12} />
      {children}
    </p>
  );
}

function SectionAccordion({
  section,
  open,
  complete,
  onToggle,
  children,
}: {
  section: (typeof SECTIONS)[number];
  open: boolean;
  complete: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-3">
          {complete ? (
            <IconCircleCheck
              size={22}
              className="text-lime-500 dark:text-lime-400"
            />
          ) : (
            <IconCircleDashed
              size={22}
              className="text-zinc-300 dark:text-zinc-600"
            />
          )}
          <div className="text-left">
            <p className="font-bold text-zinc-900 dark:text-white text-sm">
              {section.title}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {section.description}
            </p>
          </div>
        </div>
        <IconChevronDown
          size={20}
          className={`text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          {children}
        </div>
      )}
    </div>
  );
}

// ponytail: inline image upload — extract to own file if more upload fields needed
function ImageUploadField({
  value,
  onChange,
  inputClass,
}: {
  value: string;
  onChange: (url: string) => void;
  inputClass: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", filePath);

      const res = await fetch("/api/storage", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onChange(data.publicUrl);
    } catch (err: any) {
      alert(`Upload gagal: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      {!value && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) upload(file);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
            dragOver
              ? "border-lime-500 bg-lime-50 dark:bg-lime-900/10"
              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
          }`}
        >
          <IconUpload
            size={32}
            className="text-zinc-400 dark:text-zinc-500"
          />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            {uploading
              ? "Mengunggah..."
              : "Drag & drop gambar di sini, atau"}
          </p>
          <label className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl cursor-pointer transition-colors text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Pilih File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 ${inputClass}`}
          placeholder="Atau paste URL gambar..."
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Hapus"
            className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors"
          >
            <IconX size={18} />
          </button>
        )}
      </div>

      {/* Preview */}
      {value && (
        <div className="relative group">
          <img
            src={value}
            alt="Cover preview"
            className="w-full max-h-48 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm font-semibold">Ganti Gambar</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// Icon options — synced with src/lib/icon-mapper.tsx
const ICON_OPTIONS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: "", label: "Tidak ada", icon: null },
  // Tabler Icons
  { value: "IconClipboardCopy", label: "Clipboard Copy", icon: <IconClipboardCopy size={20} /> },
  { value: "IconFileBroken", label: "File Broken", icon: <IconFileBroken size={20} /> },
  { value: "IconSignature", label: "Signature", icon: <IconSignature size={20} /> },
  { value: "IconTableColumn", label: "Table Column", icon: <IconTableColumn size={20} /> },
  { value: "IconArrowWaveRightUp", label: "Arrow Wave", icon: <IconArrowWaveRightUp size={20} /> },
  { value: "IconBoxAlignRightFilled", label: "Box Right", icon: <IconBoxAlignRightFilled size={20} /> },
  { value: "IconBoxAlignTopLeft", label: "Box Top Left", icon: <IconBoxAlignTopLeft size={20} /> },
  { value: "IconFileCode", label: "File Code", icon: <IconFileCode size={20} /> },
  // Simple Icons (tech brands)
  { value: "SiReact", label: "React", icon: <SiReact size={20} /> },
  { value: "SiNextdotjs", label: "Next.js", icon: <SiNextdotjs size={20} /> },
  { value: "SiTailwindcss", label: "Tailwind CSS", icon: <SiTailwindcss size={20} /> },
  { value: "SiTypescript", label: "TypeScript", icon: <SiTypescript size={20} /> },
  { value: "SiFramer", label: "Framer", icon: <SiFramer size={20} /> },
  { value: "SiSupabase", label: "Supabase", icon: <SiSupabase size={20} /> },
  { value: "SiThreedotjs", label: "Three.js", icon: <SiThreedotjs size={20} /> },
  { value: "SiNodedotjs", label: "Node.js", icon: <SiNodedotjs size={20} /> },
  { value: "SiVuedotjs", label: "Vue.js", icon: <SiVuedotjs size={20} /> },
  { value: "SiJavascript", label: "JavaScript", icon: <SiJavascript size={20} /> },
];

function IconPicker({
  value,
  onChange,
  inputClass,
}: {
  value: string;
  onChange: (val: string) => void;
  inputClass: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = ICON_OPTIONS.find((o) => o.value === value);
  const filtered = ICON_OPTIONS.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      o.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputClass} flex items-center justify-between gap-2 text-left`}
      >
        <div className="flex items-center gap-3">
          {selected?.icon && (
            <span className="text-zinc-700 dark:text-zinc-300">{selected.icon}</span>
          )}
          <span className={value ? "text-zinc-900 dark:text-white" : "text-zinc-400"}>
            {selected?.label || "Pilih icon..."}
          </span>
        </div>
        <IconChevronDown
          size={16}
          className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari icon..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="overflow-y-auto">
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                  value === option.value
                    ? "bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="w-6 flex justify-center shrink-0">
                  {option.icon ?? <span className="text-zinc-300">—</span>}
                </span>
                <span>{option.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-sm text-zinc-400 text-center">
                Tidak ditemukan
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
