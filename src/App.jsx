import React from "react";
import Hero from "./components/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import ResumeFloating from "./components/ResumeFloating";

export default function App() {
  return (
    <div>
      <Hero />
      <Projects />
      <About />
      <Contact />
      <ResumeFloating />

      {/* ...other sections */}
    </div>
  );
}
