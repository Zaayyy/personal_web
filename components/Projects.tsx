"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Database, Brain, Globe, MessageSquare, Sparkles } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import ProjectModal, { ProjectItem } from "@/components/ProjectModal";

const projects: ProjectItem[] = [
  {
    id: "pintartube",
    title: "PintarTube",
    subtitle: "SaaS Learning Platform",
    emoji: "🎓",
    status: "Live Project",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    description:
      "Platform SaaS yang memanfaatkan Large Language Model (LLM) untuk mengubah video YouTube menjadi materi belajar interaktif — quiz otomatis, ringkasan cerdas, dan catatan terstruktur.",
    details: [
      "Integrasi LLM (OpenAI API) untuk pemrosesan transkrip video",
      "Parser YouTube transcript dengan preprocessing NLP",
      "Generate quiz, flashcard, dan mindmap otomatis dari konten video",
      "Dashboard pengguna dengan riwayat belajar dan progress tracking",
    ],
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Python", "PostgreSQL", "Tailwind CSS"],
    icon: <Globe size={24} className="text-cyan-400" />,
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    border: "border-cyan-400/20",
    tagColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
  {
    id: "data-mining",
    title: "Social Media Analytics",
    subtitle: "Data Mining & NLP Research",
    emoji: "📊",
    status: "Research Project",
    statusColor: "text-violet-400 bg-violet-400/10 border-violet-400/30",
    description:
      "Proyek riset data mining menggunakan teknik crawling untuk mengumpulkan dan menganalisis lebih dari 2.000 komentar media sosial, menghasilkan insight sentimen dan tren topik menggunakan NLP.",
    details: [
      "Web scraping & crawling 2.000+ komentar dari platform media sosial",
      "Preprocessing data: tokenisasi, stop-word removal, stemming",
      "Analisis sentimen menggunakan TF-IDF dan algoritma SVD/LSA",
      "Visualisasi data: wordcloud, distribusi sentimen, topic modeling",
    ],
    techStack: ["Python", "BeautifulSoup", "Scikit-learn", "TF-IDF", "SVD", "Pandas", "Matplotlib"],
    icon: <Brain size={24} className="text-violet-400" />,
    gradient: "from-violet-500/20 via-purple-600/10 to-transparent",
    border: "border-violet-400/20",
    tagColor: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "data",
  },
  {
    id: "web-security",
    title: "Web Security Scanner",
    subtitle: "Security & OWASP",
    emoji: "🛡️",
    status: "In Progress",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    description:
      "Tool keamanan web berbasis Python yang mendeteksi kerentanan umum seperti SQL Injection dan XSS berdasarkan panduan OWASP Top 10, dilengkapi laporan detail dan rekomendasi mitigasi.",
    details: [
      "Scanner otomatis untuk SQL Injection dan XSS vulnerabilities",
      "Implementasi OWASP Top 10 checklist sebagai standar pengujian",
      "Report generator dalam format HTML/PDF yang mudah dipahami",
      "Integrasi dengan arsitektur AWS untuk deployment yang aman",
    ],
    techStack: ["Python", "OWASP", "AWS", "HTML/CSS", "Security Testing"],
    icon: <Layers size={24} className="text-amber-400" />,
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    border: "border-amber-400/20",
    tagColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "security",
  },
  {
    id: "db-management",
    title: "Database Management System",
    subtitle: "Full-Stack Web App",
    emoji: "🗄️",
    status: "Completed",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    description:
      "Aplikasi manajemen database berbasis web dengan fitur CRUD lengkap, manajemen relasi antar tabel, dan antarmuka yang intuitif menggunakan teknologi modern full-stack.",
    details: [
      "CRUD operations dengan validasi data frontend dan backend",
      "Manajemen relasi tabel dengan query builder visual",
      "Authentication & authorization berbasis role",
      "Export data ke CSV/Excel dengan filtering dan sorting",
    ],
    techStack: ["React.js", "Node.js", "MySQL", "Express.js", "Tailwind CSS"],
    icon: <Database size={24} className="text-blue-400" />,
    gradient: "from-blue-500/20 via-indigo-600/10 to-transparent",
    border: "border-blue-400/20",
    tagColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
  {
    id: "nlp-chatbot",
    title: "Customer Support Chatbot",
    subtitle: "NLP & AI Engineering",
    emoji: "🤖",
    status: "Completed",
    statusColor: "text-pink-400 bg-pink-400/10 border-pink-400/30",
    description:
      "Chatbot layanan pelanggan berbasis NLP menggunakan model Transformer untuk memahami intent pengguna dan memberikan respons otomatis yang kontekstual dengan akurasi tinggi.",
    details: [
      "Fine-tuning model BERT/IndoBERT untuk klasifikasi intent bahasa Indonesia",
      "Pipeline preprocessing teks: tokenisasi, normalisasi, dan entity extraction",
      "REST API dengan FastAPI untuk integrasi ke berbagai platform chat",
      "Evaluasi performa dengan F1-score 89% pada dataset domain spesifik",
    ],
    techStack: ["Python", "FastAPI", "Hugging Face", "BERT", "PyTorch", "PostgreSQL"],
    icon: <MessageSquare size={24} className="text-pink-400" />,
    gradient: "from-pink-500/20 via-rose-600/10 to-transparent",
    border: "border-pink-400/20",
    tagColor: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "data",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Personal Branding & Dev",
    emoji: "✨",
    status: "Live",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    description:
      "Website portofolio personal yang dibangun dari nol dengan desain premium bertema space/dark — menampilkan animasi orbit, aurora blobs, terminal widget interaktif, dan scroll-triggered animations.",
    details: [
      "Desain UI premium dengan glassmorphism, neon glow, dan parallax",
      "Animasi berbasis rAF: orbit sistem icon, meteor, aurora blobs",
      "Scroll-triggered reveal animations dengan spring cubic-bezier",
      "Fully responsive dengan mobile-first approach menggunakan Tailwind CSS",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide Icons"],
    icon: <Globe size={24} className="text-emerald-400" />,
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    border: "border-emerald-400/20",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    github: "https://github.com/Zaayyy",
    demo: null,
    category: "web",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
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
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">{"// PORTOFOLIO"}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proyek{" "}
            <span className="gradient-text">Unggulan</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap proyek adalah bukti nyata dari kemampuan dan dedikasi saya dalam memecahkan masalah dengan teknologi.
          </p>
        </motion.div>

        {/* Category filter tabs with Framer Motion layoutId */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 rounded-full shadow-[0_0_25px_rgba(0,212,255,0.4)] z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === cat.id ? "text-white font-semibold" : "text-white/60 hover:text-white"}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid with Framer Motion layout & staggered entrance */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 25 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                id={`project-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="group glass gradient-border animated-border card-glow-hover rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Card header */}
                <div className={`relative p-6 bg-gradient-to-br ${project.gradient}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl glass border ${project.border} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {project.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300">{project.title}</h3>
                        <p className="text-white/50 text-sm font-mono">{project.subtitle}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Process details */}
                  <ul className="space-y-2 mb-5">
                    {project.details.slice(0, 3).map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <span className="text-cyan-400 mt-0.5 flex-shrink-0">▹</span>
                        <span className="line-clamp-1">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono border ${project.tagColor}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 group-hover:underline">
                      <Sparkles size={12} /> Detail & Insight
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        id={`github-${project.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 
                          text-white/60 hover:text-white hover:border-white/30 text-xs transition-all duration-300"
                      >
                        <FiGithub size={14} />
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
                            bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30
                            text-cyan-400 hover:border-cyan-400/60 text-xs transition-all duration-300"
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Zaayyy"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-projects-btn"
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,212,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm
              glass gradient-border text-white/80 hover:text-white
              transition-all duration-300"
          >
            <FiGithub size={18} />
            Lihat Semua Proyek di GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Interactive Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
