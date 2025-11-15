import React, { useEffect, useState } from "react";
import { fetchRecentRepos } from "../api/github";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AllProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRecentRepos()
      .then(setRepos)
      .catch((err) => console.error("GitHub fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold neon">All GitHub Projects</h2>
          <Link
            to="/"
            className="px-4 py-2 rounded-md border border-slate-700 text-slate-300 hover:text-cyan-300"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
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
      </div>
    </div>
  );
}
