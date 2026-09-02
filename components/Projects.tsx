"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Database, Brain, Globe, MessageSquare, Sparkles, Code2, ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import ProjectModal, { ProjectItem } from "@/components/ProjectModal";
import TiltCard from "./TiltCard";
import GlowCard from "./GlowCard";
import MagneticButton from "./MagneticButton";

const projects: ProjectItem[] = [
  {
    id: "pintartube",
    title: "PintarTube",
    subtitle: "SaaS AI Video Learning Platform",
    emoji: "🎓",
    status: "Live Project",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description:
      "Platform SaaS berbasis AI yang mentransformasikan video YouTube menjadi materi belajar interaktif yang terstruktur — kuis otomatis, flashcard cerdas, dan rangkuman poin penting via LLM.",
    details: [
      "Integrasi OpenAI API untuk ekstraksi transkrip dan analisis kontekstual mendalam",
      "Generator kuis pilihan ganda, flashcard interaktif, dan rangkuman hierarkis",
      "Dashboard analitik pengguna untuk melacak pemahaman dan progress belajar",
      "Desain arsitektur microservices terukur dengan Next.js 15 dan PostgreSQL",
    ],
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Python", "PostgreSQL", "Tailwind CSS"],
    icon: <Globe size={24} className="text-blue-400" />,
    gradient: "from-blue-500/15 via-indigo-600/5 to-transparent",
    border: "border-blue-500/20",
    tagColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
  {
    id: "data-mining",
    title: "Social Media Analytics",
    subtitle: "Data Mining & NLP Sentiment Research",
    emoji: "📊",
    status: "Research Project",
    statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    description:
      "Riset data mining komprehensif menggunakan automated crawler untuk mengumpulkan 2.000+ komentar media sosial, melakukan pemodelan topik SVD/LSA, dan memvisualisasikan polaritas sentimen publik.",
    details: [
      "Automated web scraping & crawling 2.000+ komentar data publik",
      "Pipeline preprocessing teks: case folding, tokenizing, stopword removal, stemming",
      "Ekstraksi fitur TF-IDF dikombinasikan dengan Singular Value Decomposition (SVD)",
      "Visualisasi distribusi sentimen interaktif, word clouds, dan evaluasi klaster",
    ],
    techStack: ["Python", "BeautifulSoup", "Scikit-learn", "TF-IDF", "SVD/LSA", "Pandas", "Matplotlib"],
    icon: <Brain size={24} className="text-indigo-400" />,
    gradient: "from-indigo-500/15 via-purple-600/5 to-transparent",
    border: "border-indigo-500/20",
    tagColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "data",
  },
  {
    id: "web-security",
    title: "Web Security Scanner",
    subtitle: "OWASP Vulnerability Audit Tool",
    emoji: "🛡️",
    status: "In Progress",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description:
      "Tool otomatis berbasis Python untuk memindai kerentanan web standar OWASP Top 10 (SQL Injection, Cross-Site Scripting, CSRF) yang dilengkapi rekomendasi mitigasi dan generator laporan audit.",
    details: [
      "Scanner payload otomatis untuk deteksi kerentanan SQLi dan XSS",
      "Pemeriksaan header keamanan (CORS, CSP, X-Frame-Options, HSTS)",
      "Laporan audit keamanan otomatis dalam format HTML dan Markdown terstruktur",
      "Didesain untuk integrasi pipeline CI/CD dan simulasi penetrasi dasar",
    ],
    techStack: ["Python", "OWASP Top 10", "Requests", "Security Testing", "AWS"],
    icon: <Layers size={24} className="text-amber-400" />,
    gradient: "from-amber-500/15 via-orange-600/5 to-transparent",
    border: "border-amber-500/20",
    tagColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "security",
  },
  {
    id: "db-management",
    title: "Database Management System",
    subtitle: "Full-Stack Relational Management Web App",
    emoji: "🗄️",
    status: "Completed",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    description:
      "Aplikasi manajemen basis data relasional berbasis web dengan fitur CRUD lengkap, visual relationship mapper, role-based access control (RBAC), dan ekspor data multi-format.",
    details: [
      "Manajemen multi-tabel dengan visual relation mapper dan foreign key validation",
      "Authentication berbasis JWT & RBAC (Admin, Editor, Viewer)",
      "Export & import dataset ke CSV, JSON, dan Excel dengan filtering canggih",
      "Logging aktivitas transaksi basis data dan query optimizer",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "JWT"],
    icon: <Database size={24} className="text-blue-400" />,
    gradient: "from-blue-500/15 via-indigo-600/5 to-transparent",
    border: "border-blue-500/20",
    tagColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
  {
    id: "nlp-chatbot",
    title: "Customer Support Chatbot",
    subtitle: "Contextual AI & NLP Assistant",
    emoji: "🤖",
    status: "Completed",
    statusColor: "text-blue-300 bg-blue-400/10 border-blue-400/30",
    description:
      "Sistem asisten virtual berbasis NLP Transformer untuk klasifikasi intent multi-kelas dan penanganan otomatis pertanyaan pelanggan secara real-time dengan akurasi tinggi.",
    details: [
      "Fine-tuning model IndoBERT untuk klasifikasi intent percakapan bahasa Indonesia",
      "Pipeline Named Entity Recognition (NER) untuk ekstraksi informasi pelanggan",
      "FastAPI asynchronous backend server dengan latency respons di bawah 150ms",
      "Evaluasi model mencapai F1-score 89% pada benchmark data pelanggan",
    ],
    techStack: ["Python", "FastAPI", "Hugging Face", "IndoBERT", "PyTorch", "PostgreSQL"],
    icon: <MessageSquare size={24} className="text-blue-400" />,
    gradient: "from-blue-500/15 via-purple-600/5 to-transparent",
    border: "border-blue-500/20",
    tagColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "data",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio & Interactive CV",
    subtitle: "High-Performance Next.js 16 Web",
    emoji: "✨",
    status: "Live",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description:
      "Website portofolio interaktif berarsitektur modern dengan tema obsidian — dilengkapi interactive particle constellation, interactive CLI terminal, dan printable ATS resume modal.",
    details: [
      "Desain glassmorphism berestetika tinggi dengan Framer Motion physics",
      "Interactive CLI Terminal dengan dukungan perintah kustom",
      "Performa optimal dan fluid responsive transitions",
      "Optimalisasi Lighthouse 100% SEO, accessibility, dan responsivitas universal",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    icon: <Globe size={24} className="text-emerald-400" />,
    gradient: "from-emerald-500/15 via-teal-600/5 to-transparent",
    border: "border-emerald-500/20",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Proyek" },
  { id: "web", label: "Web Dev" },
  { id: "data", label: "Data / AI" },
  { id: "security", label: "Security" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-blue-400 text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-blue-400/40" />
            {"// PORTOFOLIO"}
            <span className="w-6 h-px bg-blue-400/40" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Proyek{" "}
            <span className="gradient-text">Unggulan</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap proyek adalah bukti nyata dari kemampuan dan dedikasi saya dalam memecahkan masalah dengan teknologi.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.35)] z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white font-semibold" : "text-white/60 hover:text-white"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <TiltCard key={project.id} tiltStrength={4} glareEnabled>
                <GlowCard className="h-full rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 15 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    id={`project-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="group flex flex-col h-full"
                  >
                    {/* Card header */}
                    <div className={`relative p-6 bg-gradient-to-br ${project.gradient} border-b border-white/[0.06]`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl bg-white/[0.04] border ${project.border} flex items-center justify-center text-xl group-hover:scale-108 transition-transform duration-300 shadow-md`}>
                            {project.emoji}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-white/50 text-xs font-mono">{project.subtitle}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Process details */}
                        <ul className="space-y-1.5 mb-5">
                          {project.details.slice(0, 3).map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                              <span className="text-blue-400 mt-0.5 flex-shrink-0">▹</span>
                              <span className="line-clamp-1">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${project.tagColor}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links & CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                          <span className="text-xs text-blue-400 font-mono flex items-center gap-1.5 group-hover:underline font-medium">
                            <Sparkles size={13} /> Detail & Insight <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="flex gap-2">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              id={`github-${project.id}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] 
                                text-white/70 hover:text-white hover:border-white/20 text-xs transition-all duration-200"
                            >
                              <FiGithub size={13} />
                              GitHub
                            </a>
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                id={`demo-${project.id}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                                  bg-blue-600/20 border border-blue-500/30
                                  text-blue-300 hover:border-blue-400 text-xs transition-all duration-200"
                              >
                                <ExternalLink size={13} />
                                Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </GlowCard>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <MagneticButton strength={0.2}>
            <a
              href="https://github.com/Zaayyy"
              target="_blank"
              rel="noopener noreferrer"
              id="view-all-projects-btn"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-xs sm:text-sm
                bg-white/[0.04] border border-white/[0.1] text-white/80 hover:text-white hover:border-white/25
                transition-all duration-200 shadow-md cursor-pointer"
            >
              <FiGithub size={16} />
              Lihat Semua Proyek di GitHub
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
