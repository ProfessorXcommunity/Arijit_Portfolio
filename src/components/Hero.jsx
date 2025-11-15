import React from "react";
import { motion } from "framer-motion";
import TerminalIntro from "./TerminalIntro";
import NeonMesh from "./NeonMesh";

export default function Hero() {
  return (
    <header className="relative mb-16">
      {/* 3D canvas background (positioned behind content) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <NeonMesh />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 min-h-[56vh]">
          {/* Left content */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-6">
              {/* thin left nav/rail for desktop */}
              <nav className="hidden lg:flex flex-col items-center gap-4 pr-4">
                <div className="w-0.5 h-28 bg-gradient-to-b from-cyan-400/80 to-violet-400/40 rounded" />
                <div className="flex flex-col gap-2 items-center">
                  <button
                    aria-label="home"
                    className="p-2 rounded-md neon-icon"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-90"
                    >
                      <path
                        d="M3 11.5L12 4l9 7.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21V12h14v9"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </nav>

              <div>
                <TerminalIntro
                  lines={[
                    "Initializing...",
                    "Loading modules: data-pipelines, ML/AI, Infrastructure...",
                    "Building dependable data systems...",
                  ]}
                />

                <motion.h1
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold neon leading-tight"
                >
                  Arijit Kumar Sahu
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl"
                >
                  Data Engineer & Full-stack Developer — I build resilient data
                  pipelines and production-ready apps that scale.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 flex gap-3 flex-wrap"
                >
                  <a
                    href="#projects"
                    className="px-4 py-2 rounded-md bg-primary text-black font-semibold shadow-neon"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="px-4 py-2 rounded-md border border-slate-700 text-slate-100/90"
                  >
                    Contact
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right visual area (mesh). On small devices we keep it smaller/centered */}
          <div className="lg:col-span-7 flex justify-center items-center">
            {/* container controls the visible height of canvas */}
            <div className="w-full max-w-[680px] min-h-[260px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[520px] rounded-2xl overflow-hidden">
              {/* NeonMesh canvas will be responsive internally */}
              <div className="w-full h-full">
                <NeonMesh />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
