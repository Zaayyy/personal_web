"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Terminal, Mail, Check } from "lucide-react";

interface QuickActionsProps {
  onOpenTerminal: () => void;
}

export default function QuickActions({ onOpenTerminal }: QuickActionsProps) {
  const [showTop, setShowTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("soronganmarcell@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Radial progress calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2.5">
      {/* Copy Email Quick Action */}
      <motion.button
        id="quick-copy-email-btn"
        onClick={handleCopyEmail}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Copy Email Address"
        className="w-10 h-10 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-white/[0.08] text-white/70 hover:text-white hover:border-white/20 flex items-center justify-center shadow-lg group relative cursor-pointer"
      >
        {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
        <span className="absolute right-12 px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/90 text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          {copiedEmail ? "Email Disalin! 📋" : "Salin Email"}
        </span>
      </motion.button>

      {/* CLI Terminal Floating Trigger */}
      <motion.button
        id="quick-terminal-btn"
        onClick={onOpenTerminal}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Open CLI Terminal"
        className="w-10 h-10 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-blue-500/30 text-blue-400 hover:border-blue-400 flex items-center justify-center shadow-lg group relative cursor-pointer"
      >
        <Terminal size={17} className="group-hover:rotate-6 transition-transform duration-200" />
        <span className="absolute right-12 px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/90 text-blue-300 border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          CLI Terminal (Ctrl+K)
        </span>
      </motion.button>

      {/* Back to Top Button with Radial Scroll Progress */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            title={`Kembali ke atas (${scrollPercent}%)`}
            className="w-10 h-10 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-white/[0.08] text-white/70 hover:text-blue-400 flex items-center justify-center shadow-lg group relative cursor-pointer"
          >
            {/* SVG Progress Circle Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-white/[0.06]"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-blue-500 transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10" />
            <span className="absolute right-12 px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/90 text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
              Atas ({scrollPercent}%)
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
