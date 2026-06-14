"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const HEADLINE_TEXTS = [
  "Web Developer & Data Enthusiast",
  "IT Student @ Amikom Yogyakarta",
  "Cloud & Security Learner",
  "Builder of Digital Experiences",
];

function useTypewriter(texts: string[], speed = 80, pause = 2000) {
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
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

// Floating particle component
const PARTICLE_COLORS = [
  "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)", // pink glow
  "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)", // violet glow
  "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)", // cyan glow
  "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)", // star white
];

function Particle({ style, colorIdx }: { style: React.CSSProperties; colorIdx: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: PARTICLE_COLORS[colorIdx % PARTICLE_COLORS.length],
        ...style,
      }}
    />
  );
}

const PARTICLES = [
  { width: 4, height: 4, top: "15%", left: "10%", animationDelay: "0s", animationDuration: "7s" },
  { width: 6, height: 6, top: "25%", left: "85%", animationDelay: "1s", animationDuration: "9s" },
  { width: 3, height: 3, top: "60%", left: "5%", animationDelay: "2s", animationDuration: "6s" },
  { width: 5, height: 5, top: "70%", left: "90%", animationDelay: "0.5s", animationDuration: "8s" },
  { width: 4, height: 4, top: "40%", left: "95%", animationDelay: "3s", animationDuration: "10s" },
  { width: 3, height: 3, top: "80%", left: "20%", animationDelay: "1.5s", animationDuration: "7s" },
  { width: 6, height: 6, top: "10%", left: "60%", animationDelay: "4s", animationDuration: "9s" },
  { width: 4, height: 4, top: "50%", left: "50%", animationDelay: "2.5s", animationDuration: "8s" },
];

export default function Hero() {
  const headline = useTypewriter(HEADLINE_TEXTS);
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#020205]">
        <div className="absolute inset-0 bg-hero-gradient" />
        
        {/* Twinkling starfield layers */}
        <div className="stars-small absolute inset-0" />
        <div className="stars-medium absolute inset-0" />
        <div className="stars-large absolute inset-0" />
        
        {/* Cockpit HUD grid pattern */}
        <div className="absolute inset-0 cockpit-grid opacity-[0.3]" />
        
        {/* Nebula glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Particle
          key={i}
          colorIdx={i}
          style={{
            width: p.width * 2,
            height: p.height * 2,
            top: p.top,
            left: p.left,
            animation: `float ${p.animationDuration} ease-in-out infinite`,
            animationDelay: p.animationDelay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/20 text-cyan-400 text-sm font-mono mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Mahasiswa S-1 Sistem Informasi · Amikom Yogyakarta
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <span className="text-white">Marcellinus</span>
          <br />
          <span className="gradient-text">Alfrits Sorongan</span>
        </h1>

        {/* Typewriter headline */}
        <div className="h-12 flex items-center justify-center mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <p className="text-xl md:text-2xl text-white/70 font-light">
            <span className="text-cyan-400 font-mono">&gt;</span>{" "}
            <span className="typing-cursor">{headline}</span>
          </p>
        </div>

        {/* Bio */}
        <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          Membangun solusi digital yang bermakna — dari web development penuh-tumpukan hingga analitik data dan keamanan cloud. Setiap baris kode adalah langkah menuju dampak nyata.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up mb-12" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <a
            id="download-resume-btn"
            href="/resume-placeholder.pdf"
            download
            className="btn-neon flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-base
              bg-gradient-to-r from-cyan-500 to-violet-600 text-white
              hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105
              transition-all duration-300"
          >
            <Download size={18} />
            Unduh Resume
          </a>

          <a
            id="github-profile-btn"
            href="https://github.com/Zaayyy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-base
              glass border border-white/10 text-white/80
              hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]
              hover:scale-105 transition-all duration-300"
          >
            <FiGithub size={18} />
            GitHub
          </a>

          <a
            id="linkedin-profile-btn"
            href="https://www.linkedin.com/in/marcell-sorongan-36070a299"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-base
              glass border border-white/10 text-white/80
              hover:border-violet-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]
              hover:scale-105 transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
            LinkedIn
          </a>

          <a
            id="instagram-profile-btn"
            href="https://www.instagram.com/aceeeelllllll"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-base
              glass border border-white/10 text-white/80
              hover:border-pink-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]
              hover:scale-105 transition-all duration-300"
          >
            <FiInstagram size={18} />
            Instagram
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="mx-auto mt-20 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <ChevronDown size={20} className="animate-bounce group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>
    </section>
  );
}
