import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchRecentRepos } from "../api/github";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentRepos()
      .then(setRepos)
      .catch((err) => console.error("GitHub fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold neon mb-12">Recent Projects</h2>

        {loading ? (
          <p className="text-slate-400">Fetching your GitHub repositories...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {repos.slice(0, 6).map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard
                  project={{
                    title: repo.name,
                    description: repo.description,
                    link: repo.html_url,
                    stack: repo.language ? [repo.language] : [],
                    stars: repo.stargazers_count,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/projects"
            className="px-5 py-2 rounded-md bg-primary text-black font-semibold shadow-neon hover:scale-105 transition-transform"
          >
            View More Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
