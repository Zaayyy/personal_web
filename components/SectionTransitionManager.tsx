"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   Clean & Subtle Section Transition System
   - Smooth ambient color tint
   - Subtle top neon beam sweep on section switch
   - Minimalist vertical dot navigation on the right side
───────────────────────────────────────────────────────────────────────────── */

interface SectionConfig {
  id: string;
  label: string;
  color: string;
  accent: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero",      label: "Hero",      color: "#00d4ff", accent: "#a78bfa" },
  { id: "about",     label: "About",     color: "#00d4ff", accent: "#a78bfa" },
  { id: "projects",  label: "Projects",  color: "#a78bfa", accent: "#ec4899" },
  { id: "education", label: "Education", color: "#34d399", accent: "#00d4ff" },
  { id: "hobbies",   label: "Hobbies",   color: "#f59e0b", accent: "#ec4899" },
  { id: "gallery",   label: "Gallery",   color: "#ec4899", accent: "#a78bfa" },
  { id: "contact",   label: "Contact",   color: "#00d4ff", accent: "#34d399" },
];

export default function SectionTransitionManager() {
  const [activeSection, setActiveSection] = useState<SectionConfig>(SECTIONS[0]);
  const [showIndicator, setShowIndicator] = useState(false);
  const [beamTrigger, setBeamTrigger] = useState(0);
  const lastIdRef = useRef<string>("hero");

  const handleSectionChange = useCallback((cfg: SectionConfig) => {
    if (cfg.id === lastIdRef.current) return;
    lastIdRef.current = cfg.id;
    setActiveSection(cfg);
    setBeamTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowIndicator(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((cfg) => {
      const el = document.getElementById(cfg.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            handleSectionChange(cfg);
          }
        },
        { threshold: [0.3, 0.6] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [handleSectionChange]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── 1. Subtle top neon beam on section transition ── */}
      <AnimatePresence>
        {beamTrigger > 0 && (
          <motion.div
            key={beamTrigger}
            className="fixed top-0 left-0 right-0 h-[2px] pointer-events-none z-[9990]"
            initial={{ opacity: 0, scaleX: 0, originX: 0 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              scaleX: [0, 0.6, 1, 1],
              originX: [0, 0, 1, 1],
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `linear-gradient(90deg, transparent, ${activeSection.color}, ${activeSection.accent}, transparent)`,
              boxShadow: `0 0 12px ${activeSection.color}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── 2. Subtle ambient atmospheric glow that smoothly shifts color ── */}
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 blur-[140px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${activeSection.color} 0%, transparent 70%)`,
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* ── 3. Minimalist Section Dot Navigator on the Right Side ── */}
      <AnimatePresence>
        {showIndicator && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-[9950] hidden md:flex flex-col items-end gap-3 p-2 rounded-full glass border border-white/5 shadow-lg backdrop-blur-md"
            aria-label="Section Navigation"
          >
            {SECTIONS.map((s) => {
              const isActive = s.id === activeSection.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  aria-label={`Scroll to ${s.label}`}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none"
                >
                  {/* Tooltip Label */}
                  <span
                    className="absolute right-7 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider text-white/90 glass border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap shadow-md"
                    style={{
                      borderColor: isActive ? `${s.color}40` : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {s.label}
                  </span>

                  {/* Dot Indicator */}
                  <div
                    className="relative rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "8px" : "6px",
                      height: isActive ? "20px" : "6px",
                      backgroundColor: isActive ? s.color : "rgba(255,255,255,0.25)",
                      boxShadow: isActive ? `0 0 10px ${s.color}` : "none",
                    }}
                  />
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
