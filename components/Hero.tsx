"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ChevronDown, Terminal, Code2, Zap, Award, Sparkles, Clock, Layers } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiPython, SiTailwindcss, SiMysql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Shield, Database } from "lucide-react";
import CyberClouds from "./CyberClouds";
import ResumeModal from "./ResumeModal";
import { useSoundFX } from "./useSoundFX";
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

/* ─────────────── Counter hook ─────────────── */
function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─────────────── Terminal lines ─────────────── */
const TERMINAL_LINES = [
  { text: "$ whoami", color: "text-cyan-400", delay: 0 },
  { text: "  marcellinus_alfrits_sorongan", color: "text-white/80", delay: 500 },
  { text: "$ cat skills.json", color: "text-cyan-400", delay: 1000 },
  { text: '  ["Next.js", "Python", "AWS", "NLP", "Security"]', color: "text-emerald-400", delay: 1500 },
  { text: "$ python train_model.py --epochs 100", color: "text-cyan-400", delay: 2200 },
  { text: "  ✓ accuracy: 96.8% · loss: 0.018 · f1: 0.94", color: "text-yellow-300", delay: 2800 },
  { text: "$ git commit -m 'feat: ship something great'", color: "text-cyan-400", delay: 3500 },
  { text: "  ✓ deployed to production 🚀", color: "text-green-400", delay: 4200 },
];

/* ─────────────── Orbit icons ─────────────── */
const ORBIT_ICONS = [
  { icon: <SiReact className="text-cyan-400" />,       label: "React",      radius: 130, startAngle: 0,    speed: 18 },
  { icon: <SiNextdotjs className="text-white" />,      label: "Next.js",    radius: 130, startAngle: 72,   speed: 18 },
  { icon: <SiPython className="text-yellow-300" />,    label: "Python",     radius: 130, startAngle: 144,  speed: 18 },
  { icon: <FaAws className="text-orange-400" />,       label: "AWS",        radius: 130, startAngle: 216,  speed: 18 },
  { icon: <Shield className="text-emerald-400" size={18}/>, label: "Security", radius: 130, startAngle: 288, speed: 18 },
  { icon: <SiJavascript className="text-yellow-400" />,label: "JS",         radius: 175, startAngle: 36,   speed: 26 },
  { icon: <SiTypescript className="text-blue-400" />,  label: "TS",         radius: 175, startAngle: 108,  speed: 26 },
  { icon: <SiTailwindcss className="text-cyan-300" />, label: "Tailwind",   radius: 175, startAngle: 180,  speed: 26 },
  { icon: <SiMysql className="text-orange-400" />,     label: "MySQL",      radius: 175, startAngle: 252,  speed: 26 },
  { icon: <Database className="text-violet-400" size={18}/>, label: "DB",   radius: 175, startAngle: 324,  speed: 26 },
];

function OrbitSystem({ paused }: { paused: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [angles, setAngles] = useState(ORBIT_ICONS.map((o) => o.startAngle));
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animateRef = useRef<(ts: number) => void>(() => {});

  const animate = useCallback((ts: number) => {
    if (lastRef.current === 0) lastRef.current = ts;
    const dt = (ts - lastRef.current) / 1000;
    lastRef.current = ts;
    if (!paused) {
      setAngles((prev) =>
        prev.map((a, i) => (a + (360 / ORBIT_ICONS[i].speed) * dt) % 360)
      );
    }
    rafRef.current = requestAnimationFrame((t) => animateRef.current(t));
  }, [paused]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    if (!mounted) return;
    rafRef.current = requestAnimationFrame((t) => animateRef.current(t));
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[260px] h-[260px] rounded-full border border-white/[0.08]" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-white/[0.05]" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" suppressHydrationWarning>
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[260px] h-[260px] rounded-full border border-white/[0.08] orbit-ring-1" />
        <div className="absolute w-[350px] h-[350px] rounded-full border border-white/[0.05] orbit-ring-2" />
      </div>

      {/* Orbit icons */}
      {ORBIT_ICONS.map((orbit, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const x = Math.cos(rad) * orbit.radius;
        const y = Math.sin(rad) * orbit.radius;
        const isHovered = hoveredIdx === i;

        return (
          <div
            key={i}
            className="absolute pointer-events-auto"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <motion.div
              whileHover={{ scale: 1.3 }}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-300 cursor-default
                ${isHovered
                  ? "bg-white/20 shadow-[0_0_20px_rgba(0,212,255,0.6)] border border-cyan-400/50"
                  : "bg-[#0c1222]/90 border border-white/10 shadow-lg"
                }`}
            >
              {orbit.icon}
              {isHovered && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/95 text-cyan-300 whitespace-nowrap border border-cyan-400/40 shadow-xl z-30">
                  {orbit.label}
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── Terminal widget ─────────────── */
function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 25px 70px rgba(0,0,0,0.8)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-sm mx-auto lg:mx-0 bg-[#090e1a]/90 backdrop-blur-md border border-white/12 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <span className="text-[11px] font-mono text-white/50 flex items-center gap-1.5">
          <Terminal size={12} className="text-cyan-400" />
          terminal@marcell:~
        </span>
        <div className="w-10" />
      </div>

      {/* Lines */}
      <div className="p-4 font-mono text-xs space-y-1.5 min-h-[190px]">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 leading-relaxed ${
              visibleLines.includes(i)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1"
            } ${line.color}`}
          >
            {line.text}
          </div>
        ))}
        {visibleLines.length === TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse mt-0.5" />
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────── Stats Card ─────────────── */
function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  triggered,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  triggered: boolean;
}) {
  const count = useCounter(value, 1800, triggered);
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 350 }}
      className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 cursor-default shadow-sm min-w-[76px] sm:min-w-[90px]"
    >
      <div className="flex items-center gap-1 mb-1">
        <Icon size={14} className={color} />
        <div className={`text-xl sm:text-2xl font-bold font-mono ${color}`}>
          {count}{suffix}
        </div>
      </div>
      <div className="text-[10px] sm:text-[11px] text-white/50 tracking-wider uppercase font-mono font-medium">
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────── Particles ─────────────── */
const PARTICLES = [
  { w: 3, h: 3, top: "12%", left: "8%",  delay: "0s",   dur: "7s",  color: "rgba(0,212,255,0.6)" },
  { w: 5, h: 5, top: "22%", left: "88%", delay: "1.2s", dur: "9s",  color: "rgba(139,92,246,0.6)" },
  { w: 2, h: 2, top: "65%", left: "4%",  delay: "2s",   dur: "6s",  color: "rgba(255,255,255,0.8)" },
  { w: 4, h: 4, top: "72%", left: "93%", delay: "0.6s", dur: "8s",  color: "rgba(236,72,153,0.6)" },
  { w: 3, h: 3, top: "45%", left: "97%", delay: "3.2s", dur: "10s", color: "rgba(0,212,255,0.5)" },
  { w: 2, h: 2, top: "82%", left: "18%", delay: "1.8s", dur: "7s",  color: "rgba(139,92,246,0.7)" },
  { w: 5, h: 5, top: "8%",  left: "55%", delay: "4s",   dur: "9s",  color: "rgba(236,72,153,0.5)" },
  { w: 3, h: 3, top: "55%", left: "48%", delay: "2.8s", dur: "8s",  color: "rgba(255,255,255,0.6)" },
];

/* ─────────────── Main Hero ─────────────── */
export default function Hero() {
  const headline = useTypewriter(HEADLINE_TEXTS);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [orbitPaused, setOrbitPaused] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const { playClickSound, playHoverSound } = useSoundFX();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToAbout = () => {
    playClickSound();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenResume = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();
    setIsResumeOpen(true);
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 bg-[#020205] overflow-hidden">
          {/* Cyber Clouds layer */}
          <CyberClouds mouseX={mousePos.x} mouseY={mousePos.y} />

          {/* Starfield + gradient parallax */}
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: "transform 0.12s ease-out",
              zIndex: 1,
            }}
          >
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="stars-small absolute inset-0" />
            <div className="stars-medium absolute inset-0" />
            <div className="stars-large absolute inset-0" />
          </div>

          {/* Cockpit Grid */}
          <div
            className="absolute inset-0 cockpit-grid opacity-[0.12]"
            style={{
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
              transition: "transform 0.1s ease-out",
              zIndex: 2,
            }}
          />

          {/* Nebula glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
              transition: "transform 0.18s ease-out",
              zIndex: 2,
            }}
          >
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/12 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px]" />
          </div>

          {/* Meteors */}
          <div className="meteors-container" style={{ zIndex: 3 }}>
            {[
              { top: "5%",  right: "15%", dur: "7s",  delay: "0.2s"  },
              { top: "18%", right: "30%", dur: "10s", delay: "3.5s"  },
              { top: "32%", right: "8%",  dur: "6s",  delay: "1.8s"  },
              { top: "45%", right: "25%", dur: "9s",  delay: "5.2s"  },
              { top: "12%", right: "45%", dur: "8s",  delay: "0s"    },
              { top: "60%", right: "60%", dur: "11s", delay: "7s"    },
            ].map((m, i) => (
              <div key={i} className="meteor" style={{ top: m.top, right: m.right, animationDuration: m.dur, animationDelay: m.delay }} />
            ))}
          </div>

          {/* Horizontal neon line accents */}
          <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" style={{ zIndex: 3 }} />
          <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent pointer-events-none" style={{ zIndex: 3 }} />
        </div>

        {/* ── Floating particles ── */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.w * 2,
              height: p.h * 2,
              top: p.top,
              left: p.left,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              animation: `float ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* ── Main Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono mb-6 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="neon-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400" />
              </span>
              Available for Opportunities · Yogyakarta, ID
            </motion.div>

            {/* Name heading with TextScramble decode effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-4"
            >
              <TextScramble text="Marcellinus" className="text-white" delay={400} speed={45} />
              <br />
              <TextScramble text="Alfrits" className="gradient-text" delay={900} speed={45} />{" "}
              <TextScramble text="Sorongan" className="text-white/90" delay={1300} speed={45} />
            </motion.h1>

            {/* Typewriter line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-2 mb-5 h-10"
            >
              <Code2 size={20} className="text-cyan-400 flex-shrink-0 animate-pulse" />
              <p className="text-base sm:text-lg md:text-xl text-white/85 font-light font-mono">
                <span className="typing-cursor">{headline}</span>
              </p>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mb-8"
            >
              Crafting meaningful digital experiences — from full-stack web apps
              and NLP pipelines to cloud infrastructure and cybersecurity.
              Passionate about turning complex problems into elegant, scalable,
              and impactful solutions.
            </motion.p>

            {/* Stats section */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-9 w-full max-w-md"
            >
              <StatCard value={18} suffix="+" label="Projects" icon={Layers} color="text-cyan-400" triggered={statsVisible} />
              <StatCard value={10} suffix="+" label="Certif." icon={Award} color="text-violet-400" triggered={statsVisible} />
              <StatCard value={97} suffix="%" label="Dedication" icon={Sparkles} color="text-pink-400" triggered={statsVisible} />
              <StatCard value={3} suffix="yr" label="Exp." icon={Clock} color="text-emerald-400" triggered={statsVisible} />
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
                  onMouseEnter={playHoverSound}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-neon flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                    bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white
                    shadow-[0_0_20px_rgba(0,212,255,0.25)]
                    transition-all duration-300 cursor-pointer"
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
                  playClickSound();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={playHoverSound}
                whileHover={{ scale: 1.04, borderColor: "rgba(0,212,255,0.5)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                  glass border border-white/15 text-white/80 hover:text-white
                  transition-all duration-300 cursor-pointer"
              >
                View Projects
              </motion.a>

              <div className="flex items-center gap-2.5">
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
                    onMouseEnter={playHoverSound}
                    whileHover={{ scale: 1.15, rotate: 4, boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center
                      glass border border-white/10 text-white/70 hover:text-white
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
              {["Next.js 16", "TypeScript", "Python", "AWS", "NLP", "PostgreSQL", "MySQL", "OWASP", "Security"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/60 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center gap-6"
          >
            {/* Avatar + Orbit system */}
            <div
              className="relative w-[190px] h-[190px] sm:w-[210px] sm:h-[210px]"
              onMouseEnter={() => setOrbitPaused(true)}
              onMouseLeave={() => setOrbitPaused(false)}
            >
              {/* Outer glow rings */}
              <div className="absolute inset-[-25px] rounded-full border border-cyan-400/20 animate-spin-slow" />
              <div className="absolute inset-[-45px] rounded-full border border-violet-400/15 animate-spin-reverse" />

              {/* Orbit icon system */}
              <div className="absolute inset-[-100px] md:inset-[-110px]">
                <OrbitSystem paused={orbitPaused} />
              </div>

              {/* Avatar circle */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="avatar-shimmer relative w-full h-full rounded-full overflow-hidden
                  border-2 border-white/20
                  shadow-[0_0_0_4px_rgba(0,212,255,0.15),0_0_50px_rgba(139,92,246,0.5),0_0_90px_rgba(0,212,255,0.25)]
                  group cursor-default"
              >
                <Image
                  src="/Profile pic.jpeg"
                  alt="Marcellinus Alfrits Sorongan"
                  fill
                  sizes="210px"
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${avatarLoaded ? "opacity-100" : "opacity-0"}`}
                  priority
                  onLoad={() => setAvatarLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-[11px] font-semibold
                  shadow-[0_4px_25px_rgba(0,212,255,0.5)] cursor-default z-10"
              >
                <Zap size={12} className="text-yellow-300" />
                Open to Work
              </motion.div>
            </div>

            {/* Terminal widget */}
            <div className="w-full max-w-[320px]">
              <TerminalWidget />
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/80 transition-colors group z-10 cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.25em]">SCROLL</span>
          <ChevronDown size={18} className="group-hover:text-cyan-400 transition-colors" />
        </motion.button>
      </section>

      {/* ── Resume Modal ── */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
