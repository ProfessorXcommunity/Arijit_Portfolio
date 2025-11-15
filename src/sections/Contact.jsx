import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate async transmission
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-500/5 to-violet-600/10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold neon mb-12">Contact</h2>

        <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-6 md:p-10 card backdrop-blur-md">
          <div className="font-mono text-cyan-300/90 text-sm sm:text-base">
            <p className="mb-4">
              <span className="text-cyan-400">{">"}</span> Initiating
              communication channel...
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-slate-400">
                  {">"} Enter your name:
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Arijit"
                  className="w-full bg-slate-950/60 border border-slate-700/40 rounded-md px-3 py-2 text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400">
                  {">"} Enter your email:
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. arijit@example.com"
                  className="w-full bg-slate-950/60 border border-slate-700/40 rounded-md px-3 py-2 text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400">
                  {">"} Message:
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full bg-slate-950/60 border border-slate-700/40 rounded-md px-3 py-2 text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-primary text-black font-semibold rounded-md shadow-neon"
              >
                <span>{sent ? "Transmitting..." : "Send Message"}</span>
                {!sent && (
                  <motion.span
                    className="inline-block w-2 h-2 bg-black rounded-full"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </motion.button>
            </form>

            {/* Transmission Animation */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative mt-10 text-cyan-400"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="h-[2px] bg-cyan-400/60"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="mt-4 text-sm"
                  >
                    {">"} Message packet transmitted successfully. Awaiting
                    response...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
