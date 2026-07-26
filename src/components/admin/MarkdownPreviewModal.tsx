"use client";

import { IconX } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdownContent: string;
}

export default function MarkdownPreviewModal({ isOpen, onClose, markdownContent }: MarkdownPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl h-full bg-white dark:bg-zinc-950 rounded-[32px] md:rounded-[48px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-10 md:py-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Live Preview</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Tampilan konten sesuai di halaman detail project
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            <IconX size={20} className="text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {/* Content Area - matches the styling of [slug]/page.tsx */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white dark:bg-zinc-950">
          <div className="prose prose-zinc dark:prose-invert prose-p:leading-relaxed prose-a:text-lime-600 dark:prose-a:text-lime-500 prose-img:rounded-2xl prose-img:shadow-lg max-w-none text-zinc-600 dark:text-zinc-400">
            {markdownContent ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ node, ...props }) => {
                    const src = props.src?.replace(/ /g, '%20');
                    return <img {...props} src={src} loading="lazy" alt={props.alt || ""} />;
                  }
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            ) : (
              <div className="text-center py-20 text-zinc-400 italic">
                Konten markdown masih kosong.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}