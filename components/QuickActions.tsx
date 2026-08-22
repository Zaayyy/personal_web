"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Terminal, Volume2, VolumeX, Mail, Check } from "lucide-react";
import { useSoundFX } from "./useSoundFX";

interface QuickActionsProps {
  onOpenTerminal: () => void;
}

export default function QuickActions({ onOpenTerminal }: QuickActionsProps) {
  const [showTop, setShowTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isMuted, toggleMute, playClickSound, playHoverSound } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
        setScrollPercent(progress);
        setShowTop(currentScroll > 200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText("soronganmarcell@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Radial progress calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Sound FX Toggle Button */}
      <motion.button
        id="quick-sound-toggle-btn"
        onClick={() => {
          toggleMute();
          playClickSound();
        }}
        onMouseEnter={playHoverSound}
        whileHover={{ scale: 1.1, boxShadow: isMuted ? "0 0 20px rgba(239,68,68,0.4)" : "0 0 20px rgba(16,185,129,0.4)" }}
        whileTap={{ scale: 0.9 }}
        title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
        className={`w-11 h-11 rounded-full glass border flex items-center justify-center shadow-lg transition-colors duration-300 group relative ${
          isMuted ? "border-red-500/40 text-red-400" : "border-emerald-500/40 text-emerald-400"
        }`}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {isMuted ? "Sound: OFF" : "Sound: ON"}
        </span>
      </motion.button>

      {/* Copy Email Quick Action */}
      <motion.button
        id="quick-copy-email-btn"
        onClick={handleCopyEmail}
        onMouseEnter={playHoverSound}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(168,85,247,0.5)" }}
        whileTap={{ scale: 0.9 }}
        title="Copy Email Address"
        className="w-11 h-11 rounded-full glass border border-purple-400/40 text-purple-300 flex items-center justify-center shadow-lg group relative"
      >
        {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Mail size={18} />}
        <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-purple-300 border border-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {copiedEmail ? "Email Copied! 📋" : "Copy Email"}
        </span>
      </motion.button>

      {/* CLI Terminal Floating Trigger */}
      <motion.button
        id="quick-terminal-btn"
        onClick={() => {
          playClickSound();
          onOpenTerminal();
        }}
        onMouseEnter={playHoverSound}
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0,212,255,0.6)" }}
        whileTap={{ scale: 0.9 }}
        title="Open CLI Terminal"
        className="w-12 h-12 rounded-full glass border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative"
      >
        <Terminal size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-cyan-300 border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          CLI Terminal (Ctrl+K)
        </span>
      </motion.button>

      {/* Back to Top Button with Radial Scroll Progress */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(139,92,246,0.6)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            title={`Back to top (${scrollPercent}%)`}
            className="w-12 h-12 rounded-full glass border border-violet-400/40 text-violet-300 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative"
          >
            {/* SVG Progress Circle Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r={radius}
                className="stroke-violet-950/40"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="25"
                cy="25"
                r={radius}
                className="stroke-cyan-400 transition-all duration-150 ease-out"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
            <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-violet-300 border border-violet-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Top ({scrollPercent}%)
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
