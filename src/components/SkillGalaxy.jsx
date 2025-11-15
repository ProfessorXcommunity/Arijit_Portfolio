import React, { useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const categories = [
  {
    name: "Core",
    radius: 80,
    speed: 0.0014,
    color: "#06b6d4",
    skills: ["JavaScript", "Python", "Java", "SQL"],
  },
  {
    name: "Frontend",
    radius: 120,
    speed: -0.001,
    color: "#7c3aed",
    skills: ["React", "Tailwind", "HTML", "CSS"],
  },
  {
    name: "Backend",
    radius: 160,
    speed: 0.0007,
    color: "#8b5cf6",
    skills: ["Node.js", "Express", "Spring Boot"],
  },
  {
    name: "Data Engineering",
    radius: 200,
    speed: -0.0006,
    color: "#a855f7",
    skills: ["Kafka", "Airflow", "Spark", "ETL"],
  },
  {
    name: "Cloud & DevOps",
    radius: 240,
    speed: 0.0005,
    color: "#22d3ee",
    skills: ["AWS", "Docker", "Linux"],
  },
  {
    name: "AI/ML",
    radius: 280,
    speed: -0.0004,
    color: "#c084fc",
    skills: ["TensorFlow", "Pandas", "NumPy"],
  },
];

export default function SkillGalaxy() {
  const [t, setT] = useState(0);

  useAnimationFrame((time) => {
    setT(time);
  });

  return (
    <div className="relative w-full flex justify-center py-10">
      <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px]">
        {/* CENTER NODE */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       text-center"
        >
          <div
            className="w-32 h-32 rounded-full 
                          bg-gradient-to-br from-cyan-400/20 to-violet-500/20 
                          backdrop-blur-lg shadow-xl border border-cyan-400/30 
                          flex items-center justify-center text-slate-100 font-semibold"
          >
            Skills
          </div>
        </div>

        {/* ORBITS */}
        {categories.map((cat, idx) => {
          const rotation = t * cat.speed;

          return (
            <motion.g
              key={idx}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
              }}
              animate={{ rotate: rotation }}
            >
              {/* Orbit Circle */}
              <div
                className="absolute rounded-full border border-slate-700/50"
                style={{
                  width: `${cat.radius}px`,
                  height: `${cat.radius}px`,
                  top: `-${cat.radius / 2}px`,
                  left: `-${cat.radius / 2}px`,
                }}
              />

              {/* Skill nodes */}
              {cat.skills.map((skill, i) => {
                const angle = (i / cat.skills.length) * Math.PI * 2;
                const x = Math.cos(angle) * (cat.radius / 2);
                const y = Math.sin(angle) * (cat.radius / 2);

                return (
                  <motion.div
                    key={skill}
                    className="absolute text-xs font-mono text-slate-200"
                    style={{
                      top: `${y - 6}px`,
                      left: `${x - 6}px`,
                    }}
                    whileHover={{
                      scale: 1.2,
                      filter: "drop-shadow(0 0 8px rgba(6,182,212,0.7))",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    ></div>

                    <span className="ml-1">{skill}</span>
                  </motion.div>
                );
              })}
            </motion.g>
          );
        })}
      </div>
    </div>
  );
}
