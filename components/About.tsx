"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiTailwindcss, SiGit, SiMysql, SiPostgresql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Shield, Database, Globe, Brain, Cloud } from "lucide-react";

const skillGroups = [
  {
    title: "Web Development",
    icon: <Globe size={20} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-400/20",
    glow: "hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 85 },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: 75 },
      { name: "React.js", icon: <SiReact className="text-cyan-400" />, level: 80 },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" />, level: 75 },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: 85 },
      { name: "Python", icon: <SiPython className="text-yellow-300" />, level: 78 },
    ],
  },
  {
    title: "Data Science & NLP",
    icon: <Brain size={20} className="text-violet-400" />,
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-400/20",
    glow: "hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]",
    skills: [
      { name: "Data Crawling", icon: <Database size={16} className="text-violet-400" />, level: 80 },
      { name: "NLP Processing", icon: <Brain size={16} className="text-violet-300" />, level: 70 },
      { name: "TF-IDF", icon: <Brain size={16} className="text-violet-300" />, level: 72 },
      { name: "SVD/LSA", icon: <Brain size={16} className="text-purple-400" />, level: 65 },
      { name: "MySQL", icon: <SiMysql className="text-orange-400" />, level: 78 },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-300" />, level: 65 },
    ],
  },
  {
    title: "Cloud & Security",
    icon: <Cloud size={20} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-400/20",
    glow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    skills: [
      { name: "AWS (CCP)", icon: <FaAws className="text-orange-400" />, level: 60 },
      { name: "Arsitektur Cloud", icon: <Cloud size={16} className="text-emerald-400" />, level: 60 },
      { name: "OWASP Top 10", icon: <Shield size={16} className="text-red-400" />, level: 70 },
      { name: "Mitigasi SQLi/XSS", icon: <Shield size={16} className="text-yellow-400" />, level: 68 },
      { name: "Git & GitHub", icon: <SiGit className="text-orange-500" />, level: 82 },
      { name: "Web Security", icon: <Shield size={16} className="text-emerald-400" />, level: 65 },
    ],
  },
];

function SkillBar({ level, color }: { level: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && barRef.current) {
            barRef.current.style.width = `${level}%`;
          }
        });
      },
      { threshold: 0.1 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color}`}
        style={{ width: "0%" }}
      />
    </div>
  );
}

function useScrollReveal() {
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
}

export default function About() {
  useScrollReveal();

  return (
    <section id="about" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// TENTANG SAYA</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack &{" "}
            <span className="gradient-text">Keahlian</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Mahasiswa IT yang antusias membangun proyek nyata, selalu belajar teknologi terkini, dan berkomitmen menghadirkan solusi yang berdampak.
          </p>
        </div>

        {/* Bio card */}
        <div className="w-full max-w-4xl mx-auto glass gradient-border rounded-2xl p-8 mb-16 animate-on-scroll">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)] relative group transition-transform duration-300 hover:scale-105">
                <Image
                  src="/Profile pic.jpeg"
                  alt="Marcellinus Alfrits Sorongan"
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Marcellinus Alfrits Sorongan</h3>
              <p className="text-cyan-400 font-mono text-sm mb-4">IT Student · Web Developer · Data Enthusiast</p>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                Saya adalah mahasiswa S-1 Sistem Informasi di Universitas Amikom Yogyakarta yang memiliki minat mendalam dalam pengembangan web modern, analitik data, dan keamanan cloud. 
                Saya percaya bahwa teknologi yang baik harus memecahkan masalah nyata — itulah mengapa setiap proyek yang saya kerjakan selalu berfokus pada dampak dan kualitas.
                Saat ini saya aktif mempersiapkan sertifikasi AWS Cloud Practitioner dan terus mengasah kemampuan dalam ekosistem JavaScript modern.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Next.js", "Python", "Data Mining", "NLP", "AWS", "UI/UX"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono glass border border-white/10 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gIdx) => (
            <div
              key={group.title}
              className={`animate-on-scroll glass gradient-border rounded-2xl p-6 transition-all duration-300 ${group.glow}`}
              style={{ animationDelay: `${gIdx * 0.15}s` }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} border ${group.border} flex items-center justify-center`}>
                  {group.icon}
                </div>
                <h3 className="font-semibold text-white text-base">{group.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{skill.icon}</span>
                        <span className="text-sm text-white/80 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs text-white/40 font-mono">{skill.level}%</span>
                    </div>
                    <SkillBar
                      level={skill.level}
                      color={
                        gIdx === 0
                          ? "from-cyan-500 to-blue-500"
                          : gIdx === 1
                          ? "from-violet-500 to-purple-600"
                          : "from-emerald-500 to-teal-600"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
