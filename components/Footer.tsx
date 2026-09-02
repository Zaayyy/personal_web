"use client";

import { Mail, Heart, ArrowUp, Code2 } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  { id: "footer-github", href: "https://github.com/Zaayyy", icon: <FiGithub size={16} />, label: "GitHub" },
  { id: "footer-linkedin", href: "https://www.linkedin.com/in/marcell-sorongan-36070a299", icon: <FaLinkedinIn size={16} />, label: "LinkedIn" },
  { id: "footer-instagram", href: "https://www.instagram.com/aceeeelllllll", icon: <FiInstagram size={16} />, label: "Instagram" },
  { id: "footer-email", href: "mailto:soronganmarcell@gmail.com", icon: <Mail size={16} />, label: "Email" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-14 pb-8 overflow-hidden w-full flex flex-col items-center">
      {/* Subtle top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                M
              </div>
              <span className="font-mono font-semibold text-white/90">
                marcell<span className="text-blue-400">.dev</span>
              </span>
            </div>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
              IT Student & Web Developer based in Yogyakarta, Indonesia. 
              Passionate about building high-performance digital experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/50 text-xs font-mono tracking-widest mb-4 uppercase">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/45 text-xs sm:text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-blue-400/0 group-hover:text-blue-400 transition-colors duration-200 text-xs">▹</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="text-white/50 text-xs font-mono tracking-widest mb-4 uppercase">Connect</p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="flex items-center gap-3 text-white/45 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-200">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs flex items-center gap-1.5 font-mono">
            © {currentYear} Marcellinus Alfrits Sorongan — Built with{" "}
            <Heart size={11} className="text-red-400 fill-red-400 mx-0.5" />
            using{" "}
            <Code2 size={11} className="text-blue-400 mx-0.5" />
            Next.js & Tailwind CSS
          </p>

          {/* Back to top */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/50 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200 text-xs font-mono group cursor-pointer"
          >
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
