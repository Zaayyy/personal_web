"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2, Code2, Database } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { useSoundFX } from "./useSoundFX";

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  status: string;
  statusColor: string;
  description: string;
  details: string[];
  techStack: string[];
  icon: React.ReactNode;
  gradient: string;
  border: string;
  tagColor: string;
  github: string;
  demo: string | null;
  category: string;
};

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { playClickSound } = useSoundFX();

  if (!project) return null;

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#090d1a] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 my-8"
          >
            {/* Header Banner */}
            <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${project.gradient} border-b border-white/10`}>
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-2">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border ${project.border} flex items-center justify-center text-3xl shadow-lg`}>
                  {project.emoji}
                </div>
                <div>
                  <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-mono border ${project.statusColor} mb-1.5`}>
                    {project.status}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="text-cyan-400 font-mono text-xs sm:text-sm">{project.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono text-white/40 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-cyan-400" /> Deskripsi Proyek
                </h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white/40 tracking-wider uppercase mb-3">
                  Highlight & Implementasi Fitur
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-white/75"
                    >
                      <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white/40 tracking-wider uppercase mb-3">
                  Teknologi Digunakan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-mono border ${project.tagColor} shadow-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 
                  text-white/80 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                <FiGithub size={16} />
                GitHub Repository
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                    bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium
                    hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] text-xs sm:text-sm transition-all duration-300 cursor-pointer"
                >
                  <ExternalLink size={16} />
                  Live Preview
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
