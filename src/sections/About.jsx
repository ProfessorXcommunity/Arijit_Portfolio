// src/sections/About.jsx
import AboutNeuronGraphic from "../components/AboutNeuronGraphic";
import ZigZagTimeline from "../components/ZigZagTimeline";
import { timelineData } from "../data/timelineData";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 mb-20">
        <div className="flex justify-center md:justify-start">
          <AboutNeuronGraphic />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold neon mb-4">About Me</h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            I’m Arijit, a software engineer specializing in data engineering,
            backend systems, full-stack development and cloud-driven
            architectures.
          </p>

          <a
            href="#contact"
            className="px-5 py-3 rounded-md bg-cyan-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform w-fit"
          >
            Get In Touch →
          </a>
        </div>
      </div>

      <h3 className="text-center text-2xl font-bold mb-10 text-slate-200">
        My Journey
      </h3>

      <div
        className="relative max-w-5xl mx-auto h-[500px] md:h-[650px] 
                overflow-y-auto custom-timeline-scroll px-2"
      >
        <ZigZagTimeline items={timelineData} />
      </div>
    </section>
  );
}
