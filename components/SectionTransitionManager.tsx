"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   Clean Section Transition System
   - Smooth ambient color tint (subtle)
   - Minimalist vertical dot navigation on the right side
   - NO laser beam sweep (removed for professional feel)
───────────────────────────────────────────────────────────────────────────── */

interface SectionConfig {
  id: string;
  label: string;
  color: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero",      label: "Hero",      color: "#3b82f6" },
  { id: "about",     label: "About",     color: "#3b82f6" },
  { id: "projects",  label: "Projects",  color: "#6366f1" },
  { id: "education", label: "Education", color: "#3b82f6" },
  { id: "hobbies",   label: "Hobbies",   color: "#6366f1" },
  { id: "gallery",   label: "Gallery",   color: "#3b82f6" },
  { id: "contact",   label: "Contact",   color: "#3b82f6" },
];

export default function SectionTransitionManager() {
  const [activeSection, setActiveSection] = useState<SectionConfig>(SECTIONS[0]);
  const [showIndicator, setShowIndicator] = useState(false);
  const lastIdRef = useRef<string>("hero");

  const handleSectionChange = useCallback((cfg: SectionConfig) => {
    if (cfg.id === lastIdRef.current) return;
    lastIdRef.current = cfg.id;
    setActiveSection(cfg);
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
      {/* ── Subtle ambient atmospheric glow that smoothly shifts ── */}
      <div
        className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-[1500ms] blur-[140px] opacity-[0.08]"
        style={{
          background: `radial-gradient(circle, ${activeSection.color} 0%, transparent 70%)`,
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* ── Minimalist Section Dot Navigator ── */}
      <AnimatePresence>
        {showIndicator && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[9950] hidden md:flex flex-col items-end gap-2.5 p-2 rounded-full backdrop-blur-md bg-black/30 border border-white/[0.06]"
            aria-label="Section Navigation"
          >
            {SECTIONS.map((s) => {
              const isActive = s.id === activeSection.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  aria-label={`Scroll to ${s.label}`}
                  className="group relative flex items-center justify-center p-1 focus:outline-none"
                >
                  {/* Tooltip Label */}
                  <span
                    className="absolute right-7 px-2 py-1 rounded text-[10px] font-mono tracking-wider text-white/80 bg-black/80 border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap"
                  >
                    {s.label}
                  </span>

                  {/* Dot Indicator */}
                  <div
                    className="relative rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "6px" : "4px",
                      height: isActive ? "16px" : "4px",
                      backgroundColor: isActive ? s.color : "rgba(255,255,255,0.2)",
                      boxShadow: isActive ? `0 0 8px ${s.color}60` : "none",
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
