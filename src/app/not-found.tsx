import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-zinc-50 dark:bg-gray-950 relative flex items-center justify-center overflow-hidden px-4 transition-colors duration-300">
      {/* Subtle background grid, same language as the hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-lime-600 dark:text-lime-500 font-mono tracking-widest text-xs md:text-sm uppercase mb-6 transition-colors">
          / 404 — Page Not Found
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95] uppercase mb-6 transition-colors">
          Lost in <span className="text-lime-600 dark:text-lime-500 italic font-serif normal-case">&</span> Space.
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-md leading-relaxed mb-10 transition-colors">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to the work.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-lime-500 text-black font-bold text-sm tracking-tighter hover:bg-lime-400 transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
