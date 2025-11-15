import React, { useMemo } from "react";
import { motion } from "framer-motion";

// ADD THIS BELOW THE IMPORTS
const ConnectorLine = ({ isLeft }) => (
  <motion.div
    className={`absolute top-[38px] h-[2px] 
      ${isLeft ? "left-[50%]" : "right-[50%]"} 
      w-[40%] bg-gradient-to-r from-cyan-400/60 to-transparent`}
    animate={{ opacity: [0.25, 0.75, 0.25] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

// Icons (Heroicons)
const icons = {
  Education: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M21 10v6" />
      <path d="M3 10v6" />
      <path d="M3 16l9 4 9-4" />
    </svg>
  ),
  Skills: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 15l8-4-8-4-8 4 8 4z" />
      <path d="M12 15v6" />
      <path d="M4 11v6" />
      <path d="M20 11v6" />
    </svg>
  ),
  Experience: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 7h16v13H4z" />
      <path d="M16 3H8v4h8V3z" />
    </svg>
  ),
  Leadership: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3 7h7l-5.5 4.3L18 21l-6-4-6 4 1.5-7.7L2 9h7l3-7z" />
    </svg>
  ),
  default: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

// category theming
const CATEGORY_STYLES = {
  Education: {
    badge: "bg-violet-500 text-white",
    line: "violet",
    glow: "shadow-violet-400/40",
  },
  Skills: {
    badge: "bg-cyan-400 text-black",
    line: "cyan",
    glow: "shadow-cyan-400/40",
  },
  Experience: {
    badge: "bg-amber-400 text-black",
    line: "amber",
    glow: "shadow-amber-400/40",
  },
  Leadership: {
    badge: "bg-slate-300 text-black",
    line: "slate",
    glow: "shadow-slate-400/40",
  },
  default: {
    badge: "bg-slate-600 text-white",
    line: "slate",
    glow: "shadow-slate-400/40",
  },
};

// prettier date display
function formatDateRange(item) {
  const format = (d) => {
    if (!d) return null;
    const date = new Date(d);
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const s = item.start ? format(item.start) : null;
  const e = item.end
    ? item.end === null
      ? "Present"
      : format(item.end)
    : null;

  if (s && e) return `${s} — ${e}`;
  if (s && !e) return `${s}`;
  return item.title;
}

export default function ZigZagTimeline({ items = [] }) {
  // sort oldest → newest
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [items]);

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      {/* glowing vertical line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 rounded-full
    bg-gradient-to-b from-cyan-300/60 via-violet-400/50 to-cyan-300/30"
        style={{
          backgroundSize: "100% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="flex flex-col gap-20 relative z-10 py-6">
        {sorted.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const style =
            CATEGORY_STYLES[item.category] || CATEGORY_STYLES.default;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full relative"
            >
              <ConnectorLine isLeft={isLeft} />
              <div
                className={`flex w-full ${
                  isLeft ? "justify-start" : "justify-end"
                } relative`}
              >
                {/* card */}
                <div className="w-full md:w-[45%] p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-lg shadow-black/50">
                  {/* top row */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${style.badge} flex items-center justify-center`}
                    >
                      {icons[item.category] || icons.default}
                    </div>
                    <span className="text-sm text-slate-400">
                      {formatDateRange(item)}
                    </span>
                  </div>

                  {/* title */}
                  <p className="text-slate-200 font-semibold text-lg mt-2">
                    {item.title}
                  </p>

                  {/* details */}
                  {item.details && (
                    <ul className="mt-3 ml-4 text-slate-400 list-disc text-sm">
                      {item.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}

                  {/* category label */}
                  <p className="mt-3 text-xs text-slate-400">{item.category}</p>
                </div>
              </div>

              {/* neon dot */}
              <div className="absolute left-1/2 -translate-x-1/2 top-6">
                <motion.div
                  className={`w-5 h-5 rounded-full bg-cyan-300 border border-white/10 
    shadow-[0_0_16px_rgba(34,211,238,0.9)]`}
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
