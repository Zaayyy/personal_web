"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          {/* Resume Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0b0f19] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.15)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d1322]/90 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs md:text-sm font-mono text-white/80 font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-cyan-400" />
                  Curriculum Vitae — Marcellinus Alfrits Sorongan
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  title="Print / Simpan PDF"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all duration-200 cursor-pointer"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">Cetak / Unduh PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="p-6 md:p-10 overflow-y-auto space-y-8 print:p-0 print:bg-white print:text-black" id="printable-resume">
              {/* Header Profile */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Marcellinus Alfrits Sorongan
                  </h1>
                  <p className="text-cyan-400 font-mono text-sm md:text-base mt-1 font-semibold">
                    Full-Stack Web Developer & Data/NLP Enthusiast
                  </p>
                  <p className="text-white/60 text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
                    Mahasiswa Sistem Informasi Universitas Amikom Yogyakarta dengan fokus pada pengembangan web modern, arsitektur aplikasi berbasis LLM/NLP, serta keamanan sistem web.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-xs font-mono text-white/70 bg-white/5 p-4 rounded-xl border border-white/10 min-w-[240px]">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={14} className="text-cyan-400" />
                    <span>Yogyakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Mail size={14} className="text-violet-400" />
                    <a href="mailto:soronganmarcell@gmail.com" className="hover:text-cyan-300 transition-colors">
                      soronganmarcell@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <FiGithub size={14} className="text-emerald-400" />
                    <a href="https://github.com/Zaayyy" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
                      github.com/Zaayyy
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <FaLinkedinIn size={14} className="text-blue-400" />
                    <a href="https://www.linkedin.com/in/marcell-sorongan-36070a299" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
                      linkedin.com/in/marcell-sorongan
                    </a>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-cyan-300">
                  <GraduationCap size={18} />
                  Pendidikan
                </h2>
                <div className="space-y-4 border-l-2 border-cyan-400/30 pl-4 ml-1">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="font-semibold text-white text-sm md:text-base">
                        Universitas Amikom Yogyakarta
                      </h3>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full w-fit mt-1 sm:mt-0">
                        2023 — Sekarang (Aktif)
                      </span>
                    </div>
                    <p className="text-white/70 text-xs md:text-sm">Sarjana (S-1) Sistem Informasi</p>
                    <p className="text-white/50 text-xs mt-1">
                      Fokus: Web Development, Database Management, Data Mining, Software Engineering, & Cloud Computing.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-400" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="font-semibold text-white text-sm">
                        SMA Rex Mundi Manado
                      </h3>
                      <span className="text-xs font-mono text-white/50">2020 — 2023</span>
                    </div>
                    <p className="text-white/70 text-xs">MIPA (Matematika & Ilmu Pengetahuan Alam)</p>
                  </div>
                </div>
              </div>

              {/* Key Projects */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-violet-300">
                  <Briefcase size={18} />
                  Proyek & Portofolio Unggulan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PintarTube */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-white text-sm">PintarTube — AI SaaS Learning</h3>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                        Live Project
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed mb-3">
                      Platform SaaS pengubah video YouTube menjadi materi belajar interaktif, kuis otomatis, dan ringkasan cerdas via OpenAI API & NLP.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {["Next.js", "TypeScript", "Python", "OpenAI API", "PostgreSQL"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Analytics */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-violet-400/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-white text-sm">Social Media NLP Analytics</h3>
                      <span className="text-[10px] font-mono text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                        Research
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed mb-3">
                      Data mining crawling 2.000+ komentar media sosial, pemodelan topik dengan TF-IDF & SVD/LSA, serta visualisasi sentimen.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {["Python", "Scikit-Learn", "TF-IDF", "SVD/LSA", "Pandas"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Web Security Scanner */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-white text-sm">Web Security Scanner</h3>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        Security
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed mb-3">
                      Tool audit kerentanan web berbasis OWASP Top 10 (SQL Injection & XSS detection) dengan pembuatan laporan otomatis.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {["Python", "OWASP Top 10", "Security Testing", "AWS"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Database Management System */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-white text-sm">Database Management System</h3>
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                        Full-Stack
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed mb-3">
                      Web aplikasi CRUD relasional komprehensif, visual query builder, authentication role-based, dan data export CSV/Excel.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {["React", "Node.js", "Express", "MySQL", "Tailwind"].map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-emerald-300">
                  <Code2 size={18} />
                  Keahlian Teknis (Tech Stack)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <p className="font-bold text-cyan-400 mb-2">Frontend & Web</p>
                    <p className="text-white/70 leading-relaxed">
                      Next.js 16, React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3, Responsive UI/UX.
                    </p>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <p className="font-bold text-violet-400 mb-2">Data, NLP & Backend</p>
                    <p className="text-white/70 leading-relaxed">
                      Python, Pandas, Scikit-learn, TF-IDF, SVD, Node.js, Express, MySQL, PostgreSQL, RESTful API.
                    </p>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <p className="font-bold text-emerald-400 mb-2">Cloud, Security & Tools</p>
                    <p className="text-white/70 leading-relaxed">
                      AWS (CCP Prep), OWASP Top 10, Git & GitHub, Linux CLI, Web Application Security Auditing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Focus */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-300">
                  <Award size={18} />
                  Sertifikasi & Minat Riset
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <CheckCircle2 size={16} className="text-orange-400 flex-shrink-0" />
                    <span><strong>AWS Certified Cloud Practitioner (CCP)</strong> — Persiapan Fondasi Cloud Computing & Arsitektur AWS</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <CheckCircle2 size={16} className="text-violet-400 flex-shrink-0" />
                    <span><strong>Web Application Security & OWASP Top 10</strong> — Mitigasi Kerentanan Web & Keamanan Data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#0d1322] text-xs text-white/50">
              <span className="font-mono">
                Marcellinus Alfrits Sorongan &copy; {new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Download size={14} /> Unduh Format Cetak
                </button>
                <span>·</span>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
