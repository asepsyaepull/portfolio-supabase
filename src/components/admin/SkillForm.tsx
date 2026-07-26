"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { IconDeviceFloppy, IconChevronDown } from "@tabler/icons-react";
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
  SiPython,
  SiGo,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiFigma,
} from "react-icons/si";

export interface SkillFormData {
  name: string;
  icon_name: string;
  color_class: string;
  order_index: number;
}

export const emptySkillData: SkillFormData = {
  name: "",
  icon_name: "",
  color_class: "text-zinc-500", // Default color
  order_index: 0,
};

interface SkillFormProps {
  initialData?: SkillFormData;
  onSubmit: (data: SkillFormData) => Promise<void>;
  submitLabel: string;
  loadingLabel: string;
}

// Tambah icon tech brands yang sering dipakai
const SKILL_ICONS = [
  { value: "SiJavascript", label: "JavaScript", icon: <SiJavascript size={20} /> },
  { value: "SiTypescript", label: "TypeScript", icon: <SiTypescript size={20} /> },
  { value: "SiReact", label: "React", icon: <SiReact size={20} /> },
  { value: "SiNextdotjs", label: "Next.js", icon: <SiNextdotjs size={20} /> },
  { value: "SiVuedotjs", label: "Vue.js", icon: <SiVuedotjs size={20} /> },
  { value: "SiTailwindcss", label: "Tailwind CSS", icon: <SiTailwindcss size={20} /> },
  { value: "SiFramer", label: "Framer Motion", icon: <SiFramer size={20} /> },
  { value: "SiThreedotjs", label: "Three.js", icon: <SiThreedotjs size={20} /> },
  { value: "SiNodedotjs", label: "Node.js", icon: <SiNodedotjs size={20} /> },
  { value: "SiPython", label: "Python", icon: <SiPython size={20} /> },
  { value: "SiGo", label: "Go", icon: <SiGo size={20} /> },
  { value: "SiSupabase", label: "Supabase", icon: <SiSupabase size={20} /> },
  { value: "SiPostgresql", label: "PostgreSQL", icon: <SiPostgresql size={20} /> },
  { value: "SiDocker", label: "Docker", icon: <SiDocker size={20} /> },
  { value: "SiGit", label: "Git", icon: <SiGit size={20} /> },
  { value: "SiFigma", label: "Figma", icon: <SiFigma size={20} /> },
];

const COLORS = [
  { value: "text-zinc-500", label: "Zinc (Default)" },
  { value: "text-yellow-400", label: "Yellow (JS/Python)" },
  { value: "text-blue-500", label: "Blue (React/TS/Go)" },
  { value: "text-sky-400", label: "Sky (Tailwind)" },
  { value: "text-emerald-500", label: "Emerald (Vue/Supabase)" },
  { value: "text-lime-500", label: "Lime" },
  { value: "text-red-500", label: "Red" },
  { value: "text-purple-500", label: "Purple (Framer)" },
  { value: "text-black dark:text-white", label: "Black/White (Next.js/Github)" },
];

export default function SkillForm({
  initialData,
  onSubmit,
  submitLabel,
  loadingLabel,
}: SkillFormProps) {
  const [formData, setFormData] = useState<SkillFormData>(initialData ?? emptySkillData);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setIsDirty(false);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-500/50 dark:text-white transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Skill Name <span className="text-red-400">*</span>
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={(e) => {
                setIsDirty(true);
                setFormData({ ...formData, name: e.target.value });
              }}
              className={inputClass}
              placeholder="e.g. React"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Icon <span className="text-red-400">*</span>
            </label>
            <SkillIconPicker
              value={formData.icon_name}
              onChange={(val) => {
                setIsDirty(true);
                setFormData({ ...formData, icon_name: val });
              }}
              inputClass={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Brand Color
            </label>
            <select
              name="color_class"
              value={formData.color_class}
              onChange={(e) => {
                setIsDirty(true);
                setFormData({ ...formData, color_class: e.target.value });
              }}
              className={inputClass}
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Sort Order
            </label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={(e) => {
                setIsDirty(true);
                setFormData({ ...formData, order_index: Number(e.target.value) });
              }}
              className={inputClass}
              placeholder="0"
            />
            <p className="text-xs text-zinc-400">Angka kecil tampil lebih dulu</p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Preview</p>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm min-w-[200px]">
            <div className={`p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl ${formData.color_class}`}>
              {SKILL_ICONS.find((i) => i.value === formData.icon_name)?.icon || <SiJavascript size={24} />}
            </div>
            <span className="font-bold text-zinc-900 dark:text-white">
              {formData.name || "Skill Name"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading || !isDirty}
          className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconDeviceFloppy size={20} />
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

function SkillIconPicker({
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = SKILL_ICONS.find((o) => o.value === value);
  const filtered = SKILL_ICONS.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      o.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputClass} flex items-center justify-between gap-2 text-left`}
      >
        <div className="flex items-center gap-3">
          {selected?.icon && <span className="text-zinc-700 dark:text-zinc-300">{selected.icon}</span>}
          <span className={value ? "text-zinc-900 dark:text-white" : "text-zinc-400"}>
            {selected?.label || "Pilih icon tech..."}
          </span>
        </div>
        <IconChevronDown size={16} className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden">
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
                <span className="w-6 flex justify-center shrink-0">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}