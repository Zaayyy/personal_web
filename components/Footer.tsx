"use client";

import { Mail, Heart } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  { id: "footer-github", href: "https://github.com/Zaayyy", icon: <FiGithub size={18} />, label: "GitHub" },
  { id: "footer-linkedin", href: "https://www.linkedin.com/in/marcell-sorongan-36070a299", icon: <FaLinkedinIn size={18} />, label: "LinkedIn" },
  { id: "footer-instagram", href: "https://www.instagram.com/aceeeelllllll", icon: <FiInstagram size={18} />, label: "Instagram" },
  { id: "footer-email", href: "mailto:soronganmarcell@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-10 overflow-hidden w-full flex flex-col items-center">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p className="font-mono text-cyan-400 text-lg font-semibold">
              <span className="text-violet-400">&lt;</span>
              MAS
              <span className="text-violet-400"> /&gt;</span>
            </p>
            <p className="text-white/30 text-xs mt-1">Marcellinus Alfrits Sorongan</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center
                  text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)]
                  transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            © {currentYear} — Dibuat dengan{" "}
            <Heart size={12} className="text-red-400 fill-red-400" />{" "}
            menggunakan Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
