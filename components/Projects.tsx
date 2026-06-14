"use client";

import { useEffect } from "react";
import { ExternalLink, Layers, Database, Brain, Globe } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const projects = [
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
  },
];

export default function Projects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// PORTOFOLIO</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proyek{" "}
            <span className="gradient-text">Unggulan</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap proyek adalah bukti nyata dari kemampuan dan dedikasi saya dalam memecahkan masalah dengan teknologi.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className="animate-on-scroll group glass gradient-border rounded-2xl overflow-hidden
                hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-400"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {/* Card header */}
              <div className={`relative p-6 bg-gradient-to-br ${project.gradient}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl glass border ${project.border} flex items-center justify-center text-2xl`}>
                      {project.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{project.title}</h3>
                      <p className="text-white/50 text-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Process details */}
                <ul className="space-y-2 mb-5">
                  {project.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">▹</span>
                      {detail}
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
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`github-${project.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 
                      text-white/60 hover:text-white hover:border-white/30 text-sm transition-all duration-300"
                  >
                    <FiGithub size={15} />
                    Repository
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`demo-${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                        bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30
                        text-cyan-400 hover:border-cyan-400/60 text-sm transition-all duration-300"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects */}
        <div className="text-center mt-12 animate-on-scroll">
          <a
            href="https://github.com/Zaayyy"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-projects-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm
              glass gradient-border text-white/70 hover:text-white
              hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] hover:scale-105
              transition-all duration-300"
          >
            <FiGithub size={18} />
            Lihat Semua Proyek di GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
