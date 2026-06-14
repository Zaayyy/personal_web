"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#projects", label: "Proyek" },
  { href: "#education", label: "Pendidikan" },
  { href: "#hobbies", label: "Hobi" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between">


        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative text-sm font-medium tracking-wide transition-all duration-300 group ${
                  activeSection === link.href.slice(1)
                    ? "text-cyan-400"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Contact CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium 
            bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 
            text-cyan-400 hover:border-cyan-400/60 hover:text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
            transition-all duration-300"
        >
          Hubungi Saya
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="ml-auto md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass border-t border-white/5 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`block text-sm font-medium py-1 transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-cyan-400"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
