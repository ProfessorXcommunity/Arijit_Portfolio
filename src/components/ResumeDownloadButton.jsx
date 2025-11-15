import React from "react";
import { Download } from "lucide-react";

export default function ResumeFloating() {
  return (
    <>
      {/* PC / Laptop View */}
      <a
        href="/resume.pdf"
        download="Arijit_Kumar_Sahu_Resume.pdf"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 
                   fixed top-6 right-6 z-50
                   bg-gradient-to-r from-cyan-500 to-violet-600
                   text-black font-semibold rounded-lg shadow-lg
                   hover:scale-105 transition-transform shadow-cyan-500/40"
      >
        <Download className="w-5 h-5" />
        <span>Download Resume</span>
      </a>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="group fixed bottom-6 right-6 z-50">
          <a
            href="/resume.pdf"
            download="Arijit_Kumar_Sahu_Resume.pdf"
            className="p-3 rounded-full 
                       bg-gradient-to-br from-cyan-500 to-violet-600
                       shadow-lg shadow-cyan-500/40 
                       hover:scale-110 transition-transform text-black"
          >
            <Download className="w-6 h-6" />
          </a>

          {/* Tooltip */}
          <span
            className="absolute right-full mr-3 bottom-1/2 translate-y-1/2
                       bg-slate-900 text-slate-200 text-xs px-2 py-1 rounded
                       opacity-0 group-hover:opacity-100 transition-opacity
                       shadow-md shadow-black/40"
          >
            Resume
          </span>
        </div>
      </div>
    </>
  );
}
