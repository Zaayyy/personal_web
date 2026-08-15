"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Zap, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useSoundFX } from "@/components/useSoundFX";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { theme, cycleTheme } = useTheme();
  const { isMuted, toggleMute, playClickSound, playThemeSound, playHoverSound } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    playClickSound();
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleThemeToggle = () => {
    cycleTheme();
    playThemeSound();
  };

  const handleSoundToggle = () => {
    toggleMute();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          onMouseEnter={playHoverSound}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300">
            M
          </div>
          <span className="hidden sm:block text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 font-mono">
            marcell<span className="text-cyan-400">.dev</span>
          </span>
        </motion.a>

        {/* Desktop nav with floating Framer Motion spring pill */}
        <ul className="hidden md:flex items-center gap-2 glass border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  onMouseEnter={playHoverSound}
                  className={`relative z-10 px-4 py-1.5 block text-xs font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>

                {/* Animated active pill */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-violet-600/40 to-pink-500/30 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.3)] z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Actions: Sound, Theme Toggle & Contact CTA */}
        <div className="flex items-center gap-3">
          {/* Sound FX Toggle Button */}
          <motion.button
            id="sound-toggle-btn"
            onClick={handleSoundToggle}
            onMouseEnter={playHoverSound}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
            className={`w-9 h-9 rounded-full flex items-center justify-center glass border transition-all duration-300 ${
              isMuted
                ? "border-red-500/30 text-red-400/70 hover:text-red-400 hover:border-red-400/60"
                : "border-cyan-400/30 text-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]"
            }`}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>

          {/* Theme Switcher Button */}
          <motion.button
            id="theme-switcher-btn"
            onClick={handleThemeToggle}
            onMouseEnter={playHoverSound}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`Current Theme: ${theme.toUpperCase()} (Click to switch)`}
            className="w-9 h-9 rounded-full flex items-center justify-center glass border border-white/15 text-white/80 hover:text-cyan-400 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300"
            aria-label="Switch Theme"
          >
            {theme === "dark" && <Moon size={16} className="text-cyan-400" />}
            {theme === "light" && <Sun size={16} className="text-amber-400" />}
            {theme === "cyberpunk" && <Zap size={16} className="text-pink-400" />}
          </motion.button>

          {/* Contact CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            onMouseEnter={playHoverSound}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,212,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full text-xs font-semibold
              bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 border border-cyan-400/40 
              text-white hover:border-cyan-400 shadow-sm
              transition-all duration-300"
          >
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            Contact Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="ml-1 md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => { setMobileOpen(!mobileOpen); playClickSound(); }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass border-t border-white/10"
          >
            <div className="px-6 py-5">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className={`block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                        activeSection === link.href.slice(1)
                          ? "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
