import React, { useEffect, useState } from "react";

/**
 * TerminalIntro
 * props: lines: string[]  (each will be typed then move to next)
 */
export default function TerminalIntro({
  lines = [],
  typingSpeed = 40,
  pause = 700,
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    if (reduced) {
      // if reduced motion requested, show full text instantly
      setDisplayText(lines.join(" "));
      return;
    }

    setDisplayText("");
    setCharIndex(0);
    setCurrentLine(0);
  }, [lines, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (charIndex <= line.length) {
      const handle = setTimeout(() => {
        setDisplayText(line.slice(0, charIndex));
        setCharIndex((i) => i + 1);
      }, typingSpeed);
      return () => clearTimeout(handle);
    }
    // line finished, wait then move to next
    const wait = setTimeout(() => {
      setCurrentLine((c) => c + 1);
      setCharIndex(0);
    }, pause);
    return () => clearTimeout(wait);
  }, [charIndex, currentLine, lines, typingSpeed, pause, reduced]);

  // If finished all lines, show the last line permanently
  const visible = reduced
    ? lines.join(" ")
    : currentLine < lines.length
    ? displayText
    : lines[lines.length - 1];

  return (
    <div className="text-sm sm:text-base font-mono text-cyan-300/95">
      <div className="inline-block">
        {visible}
        <span aria-hidden="true" className="ml-1 inline-block animate-cursor">
          |
        </span>
      </div>
    </div>
  );
}
