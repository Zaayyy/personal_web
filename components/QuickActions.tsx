"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import { useSoundFX } from "./useSoundFX";

interface QuickActionsProps {
  onOpenTerminal: () => void;
}

export default function QuickActions({ onOpenTerminal }: QuickActionsProps) {
  const [showTop, setShowTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { playClickSound } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.round((currentScroll / totalHeight) * 100);
        setScrollPercent(progress);
        setShowTop(currentScroll > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* CLI Terminal Floating Trigger */}
      <motion.button
        id="quick-terminal-btn"
        onClick={() => {
          playClickSound();
          onOpenTerminal();
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0,212,255,0.6)" }}
        whileTap={{ scale: 0.9 }}
        title="Open CLI Terminal"
        className="w-12 h-12 rounded-full glass border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative"
      >
        <Terminal size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-cyan-300 border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          CLI Terminal
        </span>
      </motion.button>

      {/* Back to Top Button */}
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
            title={`Back to top (${scrollPercent}%)`}
            className="w-12 h-12 rounded-full glass border border-violet-400/40 text-violet-300 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span className="absolute right-14 px-2.5 py-1 rounded-md text-xs font-mono bg-black/90 text-violet-300 border border-violet-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Top ({scrollPercent}%)
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
