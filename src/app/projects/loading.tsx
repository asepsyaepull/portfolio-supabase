export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        {/* Header Skeleton */}
        <div className="mb-20 text-start animate-pulse">
          <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-6"></div>
          <div className="h-16 md:h-20 w-3/4 max-w-lg bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-6"></div>
          <div className="h-6 w-full max-w-2xl bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
          <div className="h-6 w-4/5 max-w-xl bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>

        {/* Project Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="animate-pulse">
              <div className="relative h-[450px] w-full overflow-hidden rounded-[40px] bg-zinc-200 dark:bg-zinc-800 border border-black/5 dark:border-white/5">
                <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-3">
                  <div className="h-3 w-20 bg-white/20 dark:bg-black/20 rounded"></div>
                  <div className="h-8 w-4/5 bg-white/30 dark:bg-black/30 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-5 w-12 bg-white/20 dark:bg-black/20 rounded-full"></div>
                    <div className="h-5 w-16 bg-white/20 dark:bg-black/20 rounded-full"></div>
                    <div className="h-5 w-14 bg-white/20 dark:bg-black/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
