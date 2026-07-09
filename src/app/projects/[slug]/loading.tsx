export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        
        <div className="inline-flex items-center gap-2 text-zinc-300 dark:text-zinc-700 mb-8 animate-pulse">
            <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>

        <div className="relative w-full bg-white dark:bg-zinc-900 rounded-[32px] md:rounded-[48px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300 flex flex-col">
          
          {/* Top - Hero Image Banner Skeleton */}
          <div className="relative w-full h-[40vh] md:h-[60vh] shrink-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse">
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col items-start justify-end">
                  <div className="h-4 w-24 bg-white/40 dark:bg-black/20 rounded mb-3"></div>
                  <div className="h-12 md:h-20 w-3/4 max-w-xl bg-white/40 dark:bg-black/20 rounded"></div>
              </div>
          </div>

          {/* Bottom - Content Skeleton */}
          <div className="w-full px-6 py-8 md:px-12 md:py-16 flex flex-col gap-10 bg-white dark:bg-zinc-900 animate-pulse">
              <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((idx) => (
                      <div key={idx} className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
                  {/* Left column - main details */}
                  <div className="md:col-span-2 flex flex-col gap-12">
                      {[1, 2, 3].map((section) => (
                        <section key={section} className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-800 rounded"></div> 
                                <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                                <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                                <div className="h-4 w-5/6 bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                            </div>
                        </section>
                      ))}
                  </div>

                  {/* Right column - sidebar */}
                  <div className="flex flex-col gap-8 md:pt-2">
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950/50 border border-black/5 dark:border-white/5 flex flex-col gap-4">
                            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                            <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
                            
                            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                            <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                        </div>
                        
                        <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
