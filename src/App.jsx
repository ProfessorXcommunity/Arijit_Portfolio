import React from "react";
import Hero from "./components/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import ResumeDownloadButton from "./components/ResumeDownloadButton";

export default function App() {
  return (
    <div>
      <Hero />
      <Projects />
      <About />
      <Contact />
      <ResumeDownloadButton />

      {/* ...other sections */}
    </div>
  );
}
