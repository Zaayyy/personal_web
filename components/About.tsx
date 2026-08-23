"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiTailwindcss, SiGit, SiMysql, SiPostgresql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Shield, Database, Globe, Brain, Cloud, Sparkles, Search, X, MapPin, GraduationCap, Code2, Target } from "lucide-react";
import { useSoundFX } from "./useSoundFX";

const skillGroups = [
  {
    id: "web",
    title: "Web Development",
    icon: <Globe size={20} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-400/25",
    glow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]",
    barColor: "from-cyan-400 via-blue-500 to-indigo-500",
    skills: [
      { name: "JavaScript (ES6+)", icon: <SiJavascript className="text-yellow-400" />, level: 88, tier: "Advanced" },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: 82, tier: "Proficient" },
      { name: "React.js 19", icon: <SiReact className="text-cyan-400" />, level: 85, tier: "Advanced" },
      { name: "Next.js 16", icon: <SiNextdotjs className="text-white" />, level: 84, tier: "Advanced" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: 90, tier: "Expert" },
      { name: "Python", icon: <SiPython className="text-yellow-300" />, level: 82, tier: "Proficient" },
    ],
  },
  {
    id: "data",
    title: "Data Science & NLP",
    icon: <Brain size={20} className="text-violet-400" />,
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-400/25",
    glow: "hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]",
    barColor: "from-violet-400 via-purple-500 to-pink-500",
    skills: [
      { name: "Data Crawling & Scraping", icon: <Database size={16} className="text-violet-400" />, level: 82, tier: "Proficient" },
      { name: "NLP & Text Processing", icon: <Brain size={16} className="text-violet-300" />, level: 75, tier: "Proficient" },
      { name: "TF-IDF & Feature Extraction", icon: <Brain size={16} className="text-violet-300" />, level: 78, tier: "Proficient" },
      { name: "SVD / LSA Topic Modeling", icon: <Brain size={16} className="text-purple-400" />, level: 70, tier: "Intermediate" },
      { name: "MySQL Relational DB", icon: <SiMysql className="text-orange-400" />, level: 80, tier: "Proficient" },
      { name: "PostgreSQL & Prisma", icon: <SiPostgresql className="text-blue-300" />, level: 72, tier: "Intermediate" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Security",
    icon: <Cloud size={20} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-400/25",
    glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]",
    barColor: "from-emerald-400 via-teal-500 to-cyan-500",
    skills: [
      { name: "AWS Cloud (CCP Prep)", icon: <FaAws className="text-orange-400" />, level: 70, tier: "Intermediate" },
      { name: "Arsitektur Cloud & Scalability", icon: <Cloud size={16} className="text-emerald-400" />, level: 68, tier: "Intermediate" },
      { name: "OWASP Top 10 Security", icon: <Shield size={16} className="text-red-400" />, level: 78, tier: "Proficient" },
      { name: "Mitigasi SQLi / XSS", icon: <Shield size={16} className="text-yellow-400" />, level: 76, tier: "Proficient" },
      { name: "Git & CI/CD Workflows", icon: <SiGit className="text-orange-500" />, level: 88, tier: "Advanced" },
      { name: "Web Security Auditing", icon: <Shield size={16} className="text-emerald-400" />, level: 72, tier: "Intermediate" },
    ],
  },
];

const SKILL_TABS = [
  { id: "all", label: "Semua Skill" },
  { id: "web", label: "Web Development" },
  { id: "data", label: "Data & NLP" },
  { id: "cloud", label: "Cloud & Security" },
];

function SkillBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full rounded-full bg-gradient-to-r ${color} shadow-[0_0_12px_rgba(0,212,255,0.4)]`}
      />
    </div>
  );
}

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { playClickSound, playHoverSound } = useSoundFX();

  // Filter skills based on active tab and search query
  const filteredGroups = skillGroups
    .filter((group) => activeTab === "all" || group.id === activeTab)
    .map((group) => {
      const matchingSkills = group.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      return { ...group, skills: matchingSkills };
    })
    .filter((group) => group.skills.length > 0);

  const totalSkillMatches = filteredGroups.reduce((acc, g) => acc + g.skills.length, 0);

  const handleTabChange = (id: string) => {
    playClickSound();
    setActiveTab(id);
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-cyan-400/50" />
            {"// TENTANG SAYA"}
            <span className="w-6 h-px bg-cyan-400/50" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack &{" "}
            <span className="gradient-text">Keahlian</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Mahasiswa IT yang antusias membangun proyek nyata, mendalami arsitektur modern, dan berkomitmen menghadirkan solusi digital yang berkinerja tinggi.
          </p>
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl mx-auto bg-[#090e1a]/85 backdrop-blur-xl border border-white/12 rounded-2xl p-6 sm:p-8 mb-8 shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col md:flex-row gap-7 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(0,212,255,0.3)] relative group cursor-default"
              >
                <Image
                  src="/Profile pic.jpeg"
                  alt="Marcellinus Alfrits Sorongan"
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </motion.div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Marcellinus Alfrits Sorongan</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
                  Open to Opportunities
                </span>
              </div>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mb-4 flex items-center justify-center md:justify-start gap-1.5 font-medium">
                <Sparkles size={14} /> IT Student · Web Developer · Data Enthusiast
              </p>
              <p className="text-white/65 leading-relaxed text-xs sm:text-sm mb-5">
                Saya adalah mahasiswa S-1 Sistem Informasi di Universitas Amikom Yogyakarta yang memiliki minat mendalam dalam pengembangan web modern, analitik data, dan keamanan siber. 
                Saya percaya bahwa teknologi yang baik harus memecahkan masalah nyata — itulah mengapa setiap proyek yang saya kerjakan selalu berfokus pada dampak, kualitas kode, dan performa tinggi.
              </p>

              {/* Highlights mini matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/8 flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] uppercase">Lokasi</span>
                  <span className="text-white/90 font-medium flex items-center gap-1">
                    <MapPin size={12} className="text-cyan-400" /> Yogyakarta
                  </span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/8 flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] uppercase">Kampus</span>
                  <span className="text-white/90 font-medium flex items-center gap-1">
                    <GraduationCap size={12} className="text-violet-400" /> Amikom
                  </span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/8 flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] uppercase">Spesialisasi</span>
                  <span className="text-white/90 font-medium flex items-center gap-1">
                    <Code2 size={12} className="text-emerald-400" /> Full-Stack
                  </span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/8 flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] uppercase">Sertifikasi</span>
                  <span className="text-white/90 font-medium flex items-center gap-1">
                    <Target size={12} className="text-amber-400" /> AWS & OWASP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Search & Filter Toolbar */}
        <div className="w-full max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SKILL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari skill (cth: Next.js, Python)..."
              className="w-full pl-9 pr-9 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-mono placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Skill groups grid */}
        {totalSkillMatches > 0 ? (
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGroups.map((group, gIdx) => (
                <motion.div
                  layout
                  key={group.title}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200, delay: gIdx * 0.1 }}
                  className={`bg-[#090e1a]/85 backdrop-blur-md border ${group.border} rounded-2xl p-6 transition-all duration-300 ${group.glow}`}
                >
                  {/* Group header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} border border-white/10 flex items-center justify-center shadow-md`}>
                        {group.icon}
                      </div>
                      <h3 className="font-semibold text-white text-base">{group.title}</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-white/60">
                      {group.skills.length} skills
                    </span>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="group/item">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{skill.icon}</span>
                            <span className="text-xs sm:text-sm text-white/80 font-medium group-hover/item:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">
                              {skill.tier}
                            </span>
                            <span className="text-xs text-cyan-300/80 font-mono font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <SkillBar level={skill.level} color={group.barColor} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 max-w-xl mx-auto">
            <p className="text-white/60 text-sm mb-2">
              Tidak ada skill yang cocok dengan pencarian &quot;<span className="text-cyan-400">{searchTerm}</span>&quot;
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
              className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Pencarian & Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
