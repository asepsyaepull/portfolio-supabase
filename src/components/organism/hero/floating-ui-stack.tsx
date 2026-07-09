"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingUIStack = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[500px] h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Card 1: Large Base Layer (Analytics/Grid) */}
        <motion.div
          initial={{ opacity: 0, rotateY: -10, x: -20 }}
          animate={{ 
            opacity: 1,
            rotateY: -15,
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { duration: 1 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-full aspect-[4/3] bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl z-10 origin-right"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              <div className="h-2.5 w-24 bg-zinc-800 rounded-full" />
              <div className="h-5 w-40 bg-white/90 rounded-full" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-sm border-2 border-lime-500" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-[1px] w-full bg-white/5" />
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="space-y-2">
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
                    <div className="h-12 w-full bg-zinc-800/50 rounded-lg" />
                 </div>
               ))}
            </div>
            <div className="h-24 w-full bg-zinc-800/30 rounded-xl border border-white/5 mt-4" />
          </div>
        </motion.div>

        {/* Card 2: Floating Action/Metric (Middle) */}
        <motion.div
          initial={{ opacity: 0, z: 50, x: 40 }}
          animate={{ 
            opacity: 1,
            z: 100,
            y: [0, 15, 0],
            rotateX: [5, 0, 5]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.2 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-[300px] bg-white rounded-2xl p-6 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] z-20 right-[-10%] top-[25%]"
        >
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center">
                   <div className="w-5 h-5 border-2 border-white rounded-md" />
                </div>
                <div>
                   <div className="h-3 w-20 bg-zinc-900 rounded-full mb-1.5" />
                   <div className="h-2 w-12 bg-zinc-300 rounded-full" />
                </div>
             </div>
             <div className="h-2 w-8 bg-zinc-100 rounded-full" />
          </div>
          <div className="h-1.5 w-full bg-zinc-100 rounded-full mb-4 overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "75%" }}
               transition={{ duration: 1.5, delay: 1 }}
               className="h-full bg-lime-500" 
             />
          </div>
          <div className="flex justify-between items-center">
             <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Efficiency</div>
             <div className="text-sm font-black text-zinc-900">75%</div>
          </div>
        </motion.div>

        {/* Card 3: Small Component/Badge (Top) */}
        <motion.div
          initial={{ opacity: 0, z: 100, x: -60 }}
          animate={{ 
            opacity: 1,
            z: 150,
            y: [0, -20, 0],
            rotateZ: [-2, 2, -2]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-[180px] bg-lime-500 rounded-xl p-4 shadow-[0_20px_40px_-10px_rgba(132,204,22,0.4)] z-30 left-[-15%] bottom-[20%]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            </div>
            <div>
              <div className="text-[9px] font-black text-black/40 uppercase mb-0.5">Deployment</div>
              <div className="text-xs font-black text-white">Live Success</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
