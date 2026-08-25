"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ChevronDown, Code2, Award, Clock, Layers, GraduationCap, Shield, Database } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn, FaAws } from "react-icons/fa";
import {
  SiTypescript, SiReact, SiNextdotjs,
  SiPython, SiTailwindcss, SiMysql
} from "react-icons/si";
import ResumeModal from "./ResumeModal";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

/* ─────────────── Typewriter ─────────────── */
const HEADLINE_TEXTS = [
  "Full-Stack Web Developer",
  "Data & NLP Engineer",
  "Cloud & Security Enthusiast",
  "IT Student @ Amikom Yogyakarta",
  "Builder of High-Impact Web Apps",
];

function useTypewriter(texts: string[], speed = 70, pause = 2000) {
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2.2);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setTextIdx((i) => (i + 1) % texts.length);
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return texts[textIdx]?.slice(0, charIdx) || "";
}

/* ─────────────── Stats Card ─────────────── */
function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 350 }}
      className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 cursor-default shadow-sm min-w-[76px] sm:min-w-[90px]"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={14} className="text-blue-400" />
        <div className="text-xl sm:text-2xl font-bold font-mono text-white">
          {value}
        </div>
      </div>
      <div className="text-[10px] sm:text-[11px] text-white/50 tracking-wider uppercase font-mono font-medium">
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────── Main Hero ─────────────── */
export default function Hero() {
  const headline = useTypewriter(HEADLINE_TEXTS);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenResume = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 bg-[#09090b] overflow-hidden">
          {/* Single subtle gradient glow */}
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/80 text-xs font-mono mb-6"
            >
              <span className="relative flex w-2 h-2">
                <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
              </span>
              Available for Opportunities · Yogyakarta, ID
            </motion.div>

            {/* Name heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-4"
            >
              <TextScramble text="Marcellinus" className="text-white" delay={300} speed={45} />
              <br />
              <span className="text-blue-400">Alfrits</span>{" "}
              <span className="text-white/90">Sorongan</span>
            </motion.h1>

            {/* Typewriter line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-2 mb-5 h-10"
            >
              <Code2 size={20} className="text-blue-400 flex-shrink-0" />
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-light font-mono">
                <span className="typing-cursor">{headline}</span>
              </p>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed mb-8"
            >
              Crafting meaningful digital experiences — from full-stack web apps
              and NLP pipelines to cloud infrastructure and cybersecurity.
              Passionate about turning complex problems into elegant, scalable,
              and impactful solutions.
            </motion.p>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9 w-full max-w-md"
            >
              <StatCard value="18+" label="Projects" icon={Layers} />
              <StatCard value="10+" label="Certif." icon={Award} />
              <StatCard value="4.0" label="GPA" icon={GraduationCap} />
              <StatCard value="3yr" label="Exp." icon={Clock} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mb-9"
            >
              <MagneticButton strength={0.35}>
                <motion.button
                  id="download-resume-btn"
                  onClick={handleOpenResume}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm
                    bg-blue-600 hover:bg-blue-500 text-white
                    transition-colors duration-300 cursor-pointer"
                >
                  <Download size={16} />
                  Lihat & Unduh CV
                </motion.button>
              </MagneticButton>

              <motion.a
                id="view-projects-btn"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm
                  bg-white/[0.05] border border-white/[0.1] text-white/80 hover:text-white hover:border-white/20
                  transition-all duration-300 cursor-pointer"
              >
                View Projects
              </motion.a>

              <div className="flex items-center gap-2.5 ml-0 lg:ml-2 mt-2 sm:mt-0">
                {[
                  { id: "github-profile-btn",    href: "https://github.com/Zaayyy",                          icon: <FiGithub size={18} />,    tip: "GitHub" },
                  { id: "linkedin-profile-btn",  href: "https://www.linkedin.com/in/marcell-sorongan-36070a299", icon: <FaLinkedinIn size={16} />, tip: "LinkedIn" },
                  { id: "instagram-profile-btn", href: "https://www.instagram.com/aceeeelllllll",             icon: <FiInstagram size={18} />, tip: "Instagram" },
                ].map((s) => (
                  <motion.a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.tip}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center
                      bg-white/[0.05] border border-white/[0.1] text-white/70 hover:text-white hover:border-white/20
                      transition-all duration-300 cursor-pointer"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              {["Next.js", "TypeScript", "Python", "AWS", "NLP", "PostgreSQL", "MySQL", "OWASP", "Security"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-white/60 transition-colors duration-300 cursor-default hover:bg-white/[0.06] hover:text-white/80"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative w-[210px] h-[210px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-full h-full rounded-full overflow-hidden
                  border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  cursor-default"
              >
                <Image
                  src="/Profile pic.jpeg"
                  alt="Marcellinus Alfrits Sorongan"
                  fill
                  sizes="210px"
                  className={`object-cover transition-opacity duration-700 ${avatarLoaded ? "opacity-100" : "opacity-0"}`}
                  priority
                  onLoad={() => setAvatarLoaded(true)}
                />
              </motion.div>
            </div>

            {/* Tech Grid */}
            <div className="grid grid-cols-3 gap-3 w-[210px]">
              {[
                { icon: <SiReact size={18} />, label: "React" },
                { icon: <SiNextdotjs size={18} />, label: "Next.js" },
                { icon: <SiPython size={18} />, label: "Python" },
                { icon: <FaAws size={18} />, label: "AWS" },
                { icon: <SiTypescript size={18} />, label: "TS" },
                { icon: <SiTailwindcss size={18} />, label: "Tailwind" },
                { icon: <SiMysql size={18} />, label: "MySQL" },
                { icon: <Shield size={18} />, label: "Security" },
                { icon: <Database size={18} />, label: "Database" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center justify-center gap-1.5 aspect-square rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors cursor-default"
                >
                  <div className="text-white/70">{tech.icon}</div>
                  <span className="text-[9px] font-medium text-white/50">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors group z-10 cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.2em]">SCROLL</span>
          <ChevronDown size={16} className="group-hover:text-blue-400 transition-colors" />
        </motion.button>
      </section>

      {/* ── Resume Modal ── */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
