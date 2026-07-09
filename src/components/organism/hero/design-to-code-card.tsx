"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette } from "lucide-react";

export const DesignToCodeCard = () => {
  const [activeTab, setActiveTab] = useState<"design" | "code">("design");

  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-2xl mx-auto aspect-square md:aspect-[16/11] rounded-3xl overflow-hidden bg-zinc-900/60 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-lime-500/10 group"
    >
      {/* Mac Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-900/50">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex bg-zinc-950/50 rounded-xl p-1.5">
          <button
            onClick={() => setActiveTab("design")}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "design" ? "text-lime-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeTab === "design" && (
              <motion.div layoutId="tab-bg" className="absolute inset-0 bg-lime-500/10 rounded-lg" />
            )}
            <Palette className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Interface Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "code" ? "text-lime-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeTab === "code" && (
              <motion.div layoutId="tab-bg" className="absolute inset-0 bg-lime-500/10 rounded-lg" />
            )}
            <Code2 className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Production React</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full h-[calc(100%-68px)] overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "design" ? (
            <motion.div
              key="design"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-950/80"
            >
              {/* Complex UI Mockup - Mini Dashboard */}
              <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                {/* Dashboard Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
                      <div className="w-5 h-5 border-2 border-white rounded-md" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 leading-none mb-1">Nexus Dashboard</h4>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Live System</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 bg-gray-50/30">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Conversion</p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-black text-gray-900">12.4%</span>
                        <span className="text-[10px] font-bold text-lime-600 mb-0.5">↑ 2.1%</span>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Active Nodes</p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-black text-white">482</span>
                        <div className="w-8 h-4 flex items-end gap-0.5 mb-1">
                          {[40, 70, 50, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-lime-500 rounded-t-[1px]" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Chart Area */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group/chart">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h5 className="text-xs font-black text-gray-900 mb-0.5">Performance Overview</h5>
                        <p className="text-[10px] text-gray-400 font-medium">Real-time throughput (ms)</p>
                      </div>
                      <select className="text-[10px] font-bold bg-gray-50 border-none rounded-md px-2 py-1 outline-none">
                        <option>Last 24h</option>
                      </select>
                    </div>
                    
                    {/* SVG Area Chart */}
                    <div className="h-24 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,15"
                          fill="none"
                          stroke="#84cc16"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <motion.path
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,15 V40 H0 Z"
                          fill="url(#chartGradient)"
                        />
                      </svg>
                      
                      {/* Floating Tooltip Mockup */}
                      <motion.div 
                        animate={{ x: [60, 80, 60], y: [10, 5, 10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 right-12 bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl"
                      >
                        84ms
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rotate-45" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden`} />
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-lime-100 flex items-center justify-center text-[8px] font-black text-lime-700">+12</div>
                  </div>
                  <button className="px-5 py-2.5 bg-lime-500 text-black text-[11px] font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-lime-500/20">
                    Sync Project
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute inset-0 p-8 bg-[#0d1117] overflow-auto text-[13px] md:text-[14px] font-mono leading-relaxed selection:bg-lime-500/20"
            >
              <pre className="text-left">
                <span className="text-pink-400">export const</span> <span className="text-blue-400">NexusDashboard</span> <span className="text-pink-400">=</span> <span className="text-gray-300">()</span> <span className="text-pink-400">{`=>`}</span> <span className="text-gray-300">{`{`}</span>
                {"\n  "}<span className="text-pink-400">return</span> <span className="text-gray-300">(</span>
                {"\n    "}<span className="text-gray-400">{`<DashboardWrapper theme="nexus-dark">`}</span>
                {"\n      "}<span className="text-gray-400">{`<Header title="Nexus Dashboard" status="live" />`}</span>
                {"\n\n      "}<span className="text-gray-400">{`<div className="grid grid-cols-2 gap-4">`}</span>
                {"\n        "}<span className="text-gray-400">{`<StatCard label="Conversion" value="12.4%" trend="+2.1%" />`}</span>
                {"\n        "}<span className="text-gray-400">{`<StatCard label="Active Nodes" value="482" variant="dark" />`}</span>
                {"\n      "}<span className="text-gray-400">{`</div>`}</span>
                {"\n\n      "}<span className="text-gray-400">{`<ChartSection `}</span>
                {"\n        "}<span className="text-gray-400">{`type="area" `}</span>
                {"\n        "}<span className="text-gray-400">{`gradient={["#84cc16", "transparent"]} `}</span>
                {"\n        "}<span className="text-gray-400">{`showTooltip `}</span>
                {"\n      "}<span className="text-gray-400">{`/>`}</span>
                {"\n\n      "}<span className="text-gray-400">{`<Footer>`}</span>
                {"\n        "}<span className="text-gray-400">{`<TeamStack size="sm" limit={3} overflow={12} />`}</span>
                {"\n        "}<span className="text-gray-400">{`<Button variant="primary" color="lime">Sync Project</Button>`}</span>
                {"\n      "}<span className="text-gray-400">{`</Footer>`}</span>
                {"\n    "}<span className="text-gray-400">{`</DashboardWrapper>`}</span>
                {"\n  "}<span className="text-gray-300">)</span><span className="text-gray-300">;</span>
                {"\n"}<span className="text-gray-300">{`};`}</span>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Subtle Glass Glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
