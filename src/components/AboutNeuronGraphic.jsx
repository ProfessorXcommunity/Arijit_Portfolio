import React from "react";

export default function AboutNeuronGraphic() {
  const categories = [
    {
      x: 300,
      y: 120,
      label: "Data Eng",
      color: "#06b6d4",
      skills: ["Kafka", "Spark", "Airflow", "ETL", "S3"],
    },
    {
      x: 480,
      y: 260,
      label: "Backend",
      color: "#8b5cf6",
      skills: ["Java", "Spring", "Microservices"],
    },
    {
      x: 420,
      y: 450,
      label: "ML / AI",
      color: "#f472b6",
      skills: ["TensorFlow", "Pandas", "NumPy"],
    },
    {
      x: 180,
      y: 450,
      label: "DevOps",
      color: "#22d3ee",
      skills: ["AWS", "Docker", "Linux"],
    },
    {
      x: 120,
      y: 260,
      label: "Full Stack",
      color: "#7c3aed",
      skills: ["React", "Node.js", "MongoDB"],
    },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto animate-pulse-slow">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-auto drop-shadow-[0_0_18px_rgba(0,255,255,0.12)]"
        fill="none"
      >
        {/* Center Node */}
        <circle
          cx="300"
          cy="300"
          r="45"
          fill="#0d1228"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        <text
          x="300"
          y="305"
          textAnchor="middle"
          fontSize="14"
          fill="#e2e8f0"
          fontWeight="600"
        >
          Skills
        </text>

        {/* Categories + Skills */}
        {categories.map((cat, idx) => (
          <g key={idx}>
            {/* Line from center */}
            <line
              x1="300"
              y1="300"
              x2={cat.x}
              y2={cat.y}
              stroke={cat.color}
              strokeWidth="1.4"
              strokeOpacity="0.3"
            />

            {/* Category Node */}
            <circle
              cx={cat.x}
              cy={cat.y}
              r="40"
              fill="#0d1228"
              stroke={cat.color}
              strokeWidth="2"
            />
            <text
              x={cat.x}
              y={cat.y + 5}
              textAnchor="middle"
              fontSize="16"
              fill="#e2e8f0"
              fontWeight="500"
            >
              {cat.label}
            </text>

            {/* Skill Nodes */}
            {cat.skills.map((skill, i) => {
              const angle = (i / cat.skills.length) * Math.PI * 2;
              const sx = cat.x + Math.cos(angle) * 95;
              const sy = cat.y + Math.sin(angle) * 95;

              return (
                <g key={i}>
                  {/* Line to skill */}
                  <line
                    x1={cat.x}
                    y1={cat.y}
                    x2={sx}
                    y2={sy}
                    stroke={cat.color}
                    strokeWidth="1"
                    strokeOpacity="0.2"
                  />

                  {/* Skill pill */}
                  <rect
                    x={sx - 35}
                    y={sy - 14}
                    width="70"
                    height="28"
                    rx="12"
                    ry="12"
                    fill="#0e1425"
                    stroke={cat.color}
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />

                  <text
                    x={sx}
                    y={sy + 4}
                    textAnchor="middle"
                    fontSize="14"
                    fill="#e2e8f0"
                    fontFamily="monospace"
                  >
                    {skill}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
