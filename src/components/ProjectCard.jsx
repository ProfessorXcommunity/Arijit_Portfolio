import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);

  const x = useMotionValue(0);
  const yTilt = useMotionValue(0);
  const rotateX = useTransform(yTilt, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const cardX = e.clientX - rect.left - rect.width / 2;
    const cardY = e.clientY - rect.top - rect.height / 2;
    x.set(cardX);
    yTilt.set(cardY);
  }

  function handleMouseLeave() {
    x.set(0);
    yTilt.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-6 rounded-2xl border border-slate-800 card backdrop-blur-md 
                 bg-gradient-to-br from-slate-900/70 to-slate-800/30 shadow-[0_0_25px_rgba(6,182,212,0.06)] 
                 transition-transform duration-300 ease-out hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
    >
      {/* Glow layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-violet-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="font-semibold text-lg sm:text-xl text-slate-100 neon mb-2">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-400 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md bg-slate-900/50 border border-slate-700/50 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-cyan-400 hover:text-cyan-200 text-sm"
          >
            View Repository →
          </a>
        )}
      </div>
    </motion.div>
  );
}
