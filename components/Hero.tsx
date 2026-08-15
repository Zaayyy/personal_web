"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ChevronDown, Terminal, Code2, Zap, Sparkles } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiPython, SiTailwindcss, SiMysql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Shield, Database } from "lucide-react";

/* ─────────────── Typewriter ─────────────── */
const HEADLINE_TEXTS = [
  "Full-Stack Web Developer",
  "Data & NLP Engineer",
  "Cloud & Security Enthusiast",
  "IT Student @ Amikom Yogyakarta",
  "Builder of Digital Experiences",
];

function useTypewriter(texts: string[], speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
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
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

/* ─────────────── Counter hook ─────────────── */
function useCounter(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─────────────── Terminal lines ─────────────── */
const TERMINAL_LINES = [
  { text: "$ whoami", color: "text-cyan-400", delay: 0 },
  { text: "  marcellinus_alfrits_sorongan", color: "text-white/80", delay: 600 },
  { text: "$ cat skills.json", color: "text-cyan-400", delay: 1200 },
  { text: '  ["Next.js", "Python", "AWS", "NLP", "Security"]', color: "text-emerald-400", delay: 1800 },
  { text: "$ python train_model.py --epochs 100", color: "text-cyan-400", delay: 2500 },
  { text: "  ✓ accuracy: 96.8% · loss: 0.018 · f1: 0.94", color: "text-yellow-300", delay: 3100 },
  { text: "$ git commit -m 'feat: ship something great'", color: "text-cyan-400", delay: 4000 },
  { text: "  ✓ deployed to production 🚀", color: "text-green-400", delay: 4800 },
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
  const [angles, setAngles] = useState(ORBIT_ICONS.map((o) => o.startAngle));
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const animate = useCallback((ts: number) => {
    if (lastRef.current === 0) lastRef.current = ts;
    const dt = (ts - lastRef.current) / 1000;
    lastRef.current = ts;
    if (!paused) {
      setAngles((prev) =>
        prev.map((a, i) => (a + (360 / ORBIT_ICONS[i].speed) * dt) % 360)
      );
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [paused]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <div className="absolute inset-0 pointer-events-none">
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
                  : "bg-white/5 border border-white/10"
                }`}
            >
              {orbit.icon}
              {isHovered && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/90 text-cyan-400 whitespace-nowrap border border-cyan-400/40 shadow-md">
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
      whileHover={{ y: -5, boxShadow: "0 25px 70px rgba(0,0,0,0.8)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-sm mx-auto lg:mx-0 glass border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] mt-8 lg:mt-0"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs font-mono text-white/40 flex items-center gap-1">
          <Terminal size={10} /> terminal@marcell:~
        </span>
      </div>
      {/* Lines */}
      <div className="p-4 font-mono text-xs space-y-1.5 min-h-[200px]">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${
              visibleLines.includes(i)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            } ${line.color}`}
          >
            {line.text}
          </div>
        ))}
        {visibleLines.length === TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400/80 animate-pulse mt-1" />
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────── Stats ─────────────── */
function StatCard({ value, suffix, label, color, triggered }: {
  value: number; suffix: string; label: string; color: string; triggered: boolean;
}) {
  const count = useCounter(value, 1800, triggered);
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="flex flex-col items-center gap-0.5 cursor-default"
    >
      <div className={`text-2xl md:text-3xl font-bold font-mono ${color}`}>
        {count}{suffix}
      </div>
      <div className="text-[11px] text-white/40 tracking-wide font-medium">{label}</div>
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
  const statsRef = useRef<HTMLDivElement>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

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
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#020205] overflow-hidden">
        {/* Starfield + gradient parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            transition: "transform 0.12s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="stars-small absolute inset-0" />
          <div className="stars-medium absolute inset-0" />
          <div className="stars-large absolute inset-0" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 cockpit-grid opacity-[0.18]"
          style={{
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />

        {/* Nebula glows — counter-parallax */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
            transition: "transform 0.18s ease-out",
          }}
        >
          {/* Aurora blobs */}
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/12 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px]" />
        </div>

        {/* Meteors */}
        <div className="meteors-container">
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
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent pointer-events-none" />
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Status badge with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/25 text-cyan-400 text-xs font-mono mb-7"
          >
            <span className="relative flex w-2 h-2">
              <span className="neon-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-cyan-400" />
            </span>
            Available for Opportunities · Yogyakarta, ID
          </motion.div>

          {/* Name heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-5"
          >
            <span className="text-white">Marcellinus</span>
            <br />
            <span className="gradient-text">Alfrits</span>{" "}
            <span className="text-white/90">Sorongan</span>
          </motion.h1>

          {/* Typewriter line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 mb-6 h-10"
          >
            <Code2 size={18} className="text-cyan-400 flex-shrink-0 animate-pulse" />
            <p className="text-lg md:text-xl text-white/80 font-light font-mono">
              <span className="typing-cursor">{headline}</span>
            </p>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed mb-8"
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
            className="flex items-center gap-8 mb-10"
          >
            <StatCard value={18}  suffix="+"  label="Projects"    color="text-cyan-400"   triggered={statsVisible} />
            <div className="w-px h-8 bg-white/10" />
            <StatCard value={10}  suffix="+"  label="Certif."     color="text-violet-400" triggered={statsVisible} />
            <div className="w-px h-8 bg-white/10" />
            <StatCard value={97}  suffix="%"  label="Dedication"  color="text-pink-400"   triggered={statsVisible} />
            <div className="w-px h-8 bg-white/10" />
            <StatCard value={3}   suffix="yr" label="Experience"  color="text-emerald-400" triggered={statsVisible} />
          </motion.div>

          {/* CTA Buttons with Framer Motion spring physics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <motion.a
              id="download-resume-btn"
              href="/resume-placeholder.pdf"
              download
              whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(0,212,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-neon flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm
                bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white
                shadow-[0_0_20px_rgba(0,212,255,0.3)]
                transition-all duration-300"
            >
              <Download size={16} />
              Download Resume
            </motion.a>

            <motion.a
              id="view-projects-btn"
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm
                glass border border-white/15 text-white/80 hover:text-white
                transition-all duration-300"
            >
              View Projects
            </motion.a>

            <div className="flex items-center gap-3">
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
                  whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                    glass border border-white/10 text-white/70 hover:text-white
                    transition-all duration-300"
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
            className="flex flex-wrap gap-2"
          >
            {["Next.js", "TypeScript", "Python", "AWS", "NLP", "PostgreSQL", "MySQL", "OWASP", "Security"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1 rounded-full text-[11px] font-mono glass border border-white/10 text-white/60 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 cursor-default"
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
            className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px]"
            onMouseEnter={() => setOrbitPaused(true)}
            onMouseLeave={() => setOrbitPaused(false)}
          >
            {/* Outer glow rings */}
            <div className="absolute inset-[-30px] rounded-full border border-cyan-400/20 animate-spin-slow" />
            <div className="absolute inset-[-50px] rounded-full border border-violet-400/15 animate-spin-reverse" />

            {/* Orbit icon system */}
            <div className="absolute inset-[-100px] md:inset-[-110px]">
              <OrbitSystem paused={orbitPaused} />
            </div>

            {/* Avatar circle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="avatar-shimmer relative w-full h-full rounded-full overflow-hidden
                border-2 border-white/20
                shadow-[0_0_0_4px_rgba(0,212,255,0.15),0_0_50px_rgba(139,92,246,0.5),0_0_90px_rgba(0,212,255,0.25)]
                group cursor-default"
            >
              {/* Avatar image */}
              <Image
                src="/Profile pic.jpeg"
                alt="Marcellinus Alfrits Sorongan"
                fill
                sizes="220px"
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${avatarLoaded ? "opacity-100" : "opacity-0"}`}
                priority
                onLoad={() => setAvatarLoaded(true)}
              />

              {/* Overlay shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-[11px] font-semibold
                shadow-[0_4px_25px_rgba(0,212,255,0.5)] cursor-default"
            >
              <Zap size={11} className="text-yellow-300" />
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/80 transition-colors group z-10 cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-[0.25em]">SCROLL</span>
        <ChevronDown size={18} className="group-hover:text-cyan-400 transition-colors" />
      </motion.button>
    </section>
  );
}
