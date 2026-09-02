"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Sparkles, CornerDownLeft, Copy } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveTerminal({ isOpen, onClose }: InteractiveTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => [
    {
      command: "welcome",
      timestamp: typeof window !== "undefined" ? new Date().toLocaleTimeString() : "",
      output: (
        <div className="space-y-2 text-xs md:text-sm">
          <p className="text-cyan-400 font-bold">
            Welcome to Marcell&apos;s Interactive CLI Terminal v3.0! 🚀
          </p>
          <p className="text-white/70">
            Ketik <span className="text-yellow-300 font-mono font-semibold">&quot;help&quot;</span> atau <span className="text-cyan-300 font-mono font-semibold">&quot;neofetch&quot;</span> untuk melihat ringkasan sistem.
          </p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add to raw command history for Up/Down arrow navigation
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    const now = new Date().toLocaleTimeString();
    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-cyan-400 font-semibold mb-2">⚡ Perintah yang tersedia:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-white/80">
              <p><span className="text-yellow-300 font-bold">neofetch</span> - Tampilkan info sistem & ASCII art</p>
              <p><span className="text-yellow-300 font-bold">whoami</span> - Profil ringkas Marcellinus</p>
              <p><span className="text-yellow-300 font-bold">skills</span> - Daftar keahlian & tech stack</p>
              <p><span className="text-yellow-300 font-bold">projects</span> - Proyek-proyek unggulan</p>
              <p><span className="text-yellow-300 font-bold">education</span> - Riwayat pendidikan & kampus</p>
              <p><span className="text-yellow-300 font-bold">contact</span> - Kontak & email resmi</p>
              <p><span className="text-yellow-300 font-bold">socials</span> - Tautan sosial media & GitHub</p>
              <p><span className="text-yellow-300 font-bold">quote</span> - Kutipan developer hari ini</p>
              <p><span className="text-yellow-300 font-bold">matrix</span> - Saklar efek Matrix rain</p>
              <p><span className="text-yellow-300 font-bold">date</span> - Waktu & tanggal lokal</p>
              <p><span className="text-yellow-300 font-bold">clear</span> - Bersihkan layar konsol</p>
              <p><span className="text-yellow-300 font-bold">help</span> - Tampilkan menu bantuan ini</p>
            </div>
          </div>
        );
        break;

      case "neofetch":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono py-1">
            <div className="text-cyan-400 font-mono text-[11px] leading-tight select-none">
              <pre>{`
  __  __                         _ _ 
 |  \\/  |                       | | |
 | \\  / | __ _ _ __ ___ ___  ___| | |
 | |\\/| |/ _\` | '__/ __/ _ \\/ __| | |
 | |  | | (_| | | | (_|  __/ (__| | |
 |_|  |_|\\__,_|_|  \\___\\___|\\___|_|_|
              `}</pre>
            </div>
            <div className="space-y-1 text-white/80">
              <p><span className="text-cyan-300 font-bold">marcell</span>@<span className="text-violet-400 font-bold">portfolio</span></p>
              <p className="text-white/40">-----------------------------</p>
              <p><span className="text-yellow-300 font-bold">OS:</span> Next.js 16 (Turbopack) x React 19</p>
              <p><span className="text-yellow-300 font-bold">Host:</span> Universitas Amikom Yogyakarta</p>
              <p><span className="text-yellow-300 font-bold">Kernel:</span> S-1 Sistem Informasi (Active)</p>
              <p><span className="text-yellow-300 font-bold">Uptime:</span> 3+ Years of Continuous Coding</p>
              <p><span className="text-yellow-300 font-bold">Shell:</span> TypeScript 5.0 / Zsh</p>
              <p><span className="text-yellow-300 font-bold">Theme:</span> Space Cyberpunk Glassmorphism</p>
              <p><span className="text-yellow-300 font-bold">CPU:</span> Coffee & Deep Work @ 4.20GHz</p>
              <p><span className="text-yellow-300 font-bold">Memory:</span> 18+ Projects / 10+ Certifications</p>
              <div className="flex gap-1.5 pt-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-blue-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-violet-500" />
                <span className="w-3.5 h-3.5 rounded-full bg-pink-500" />
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-white/90">
            <p className="text-cyan-300 font-bold text-sm">Marcellinus Alfrits Sorongan</p>
            <p>🎓 Mahasiswa S-1 Sistem Informasi @ Universitas Amikom Yogyakarta</p>
            <p>💻 Specialization: Full-Stack Web Dev · Data & NLP · Cloud Security</p>
            <p>📍 Location: Yogyakarta, Indonesia 🇮🇩</p>
            <p>🎯 Mission: Membangun web application berkinerja tinggi, aman, dan memecahkan masalah nyata</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">💻 Tech Stack & Kemampuan:</p>
            <div className="space-y-1 text-white/80">
              <p>• <span className="text-yellow-300 font-semibold">Frontend:</span> Next.js 16 (84%), React 19 (85%), TypeScript (82%), Tailwind CSS (90%), JavaScript (88%)</p>
              <p>• <span className="text-violet-400 font-semibold">Backend & Data:</span> Python (82%), NLP/TF-IDF (78%), Data Crawling (82%), MySQL (80%), PostgreSQL (72%)</p>
              <p>• <span className="text-emerald-400 font-semibold">Cloud & Security:</span> AWS CCP Prep (70%), OWASP Top 10 (78%), Web Security (72%), Git & GitHub (88%)</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">🚀 Proyek-Proyek Unggulan:</p>
            <div className="space-y-1 text-white/80">
              <p>1. <span className="text-emerald-300 font-semibold">PintarTube</span> - SaaS AI Learning Platform (YouTube transcript to Quiz & Summary via LLM)</p>
              <p>2. <span className="text-violet-300 font-semibold">Social Media Analytics</span> - Data Mining & NLP Sentiment Research (2.000+ data)</p>
              <p>3. <span className="text-amber-300 font-semibold">Web Security Scanner</span> - OWASP Vulnerability Detector (SQLi/XSS Detection)</p>
              <p>4. <span className="text-blue-300 font-semibold">Database Management System</span> - Full-Stack Relational Management App</p>
              <p>5. <span className="text-pink-300 font-semibold">Customer Support Chatbot</span> - Contextual NLP Assistant (IndoBERT)</p>
            </div>
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-white/90">
            <p className="text-cyan-400 font-semibold">🎓 Riwayat Pendidikan:</p>
            <p>1. <strong>Universitas Amikom Yogyakarta</strong> (2023 — Sekarang) — S-1 Sistem Informasi [Aktif]</p>
            <p>2. <strong>SMA Rex Mundi Manado</strong> (2020 — 2023) — MIPA [Lulus]</p>
            <p>3. <strong>SMP Pax Christi Manado</strong> (2017 — 2020) [Lulus]</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono text-white/90">
            <p className="text-cyan-400 font-semibold">📬 Informasi Kontak:</p>
            <p>📧 Email: <a href="mailto:soronganmarcell@gmail.com" className="text-cyan-300 underline">soronganmarcell@gmail.com</a></p>
            <p>📍 Lokasi: Yogyakarta, Indonesia</p>
            <p>⚡ Response Time: Dalam 24 Jam</p>
          </div>
        );
        break;

      case "socials":
      case "github":
      case "repo":
        output = (
          <div className="space-y-1 text-xs font-mono text-white/90">
            <p className="text-cyan-400 font-semibold">🔗 Media Sosial & Kode:</p>
            <p>• GitHub: <a href="https://github.com/Zaayyy" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">github.com/Zaayyy</a></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/marcell-sorongan-36070a299" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">linkedin.com/in/marcell-sorongan</a></p>
            <p>• Instagram: <a href="https://www.instagram.com/aceeeelllllll" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">@aceeeelllllll</a></p>
          </div>
        );
        break;

      case "quote":
        output = (
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-cyan-300">
            <p className="italic">&quot;First, solve the problem. Then, write the code.&quot; — John Johnson</p>
          </div>
        );
        break;

      case "date":
        output = (
          <p className="text-xs font-mono text-emerald-300">
            🕒 {new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" })}
          </p>
        );
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        output = (
          <p className="text-xs font-mono text-green-400">
            💚 Matrix Mode toggled: {!matrixActive ? "ENABLED" : "DISABLED"}
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-xs font-mono text-red-400">
            ❌ Command tidak ditemukan: &quot;{trimmed}&quot;. Ketik <span className="text-yellow-300">&quot;help&quot;</span> untuk melihat daftar command.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: trimmed, output, timestamp: now },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setCmdIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIdx = cmdIndex - 1;
        setCmdIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`w-full glass border border-white/15 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-300 ${
              isMaximized
                ? "max-w-7xl h-[90vh]"
                : "max-w-3xl h-[540px]"
            } ${matrixActive ? "bg-black/95 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.25)]" : "bg-[#0b0f19]/95"}`}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group cursor-pointer"
                  title="Close"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group cursor-pointer"
                  title="Toggle size"
                >
                  {isMaximized ? (
                    <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                  ) : (
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                  )}
                </button>
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-white/60 flex items-center gap-1.5">
                  <TerminalIcon size={12} className="text-cyan-400" /> marcell@dev-cli:~
                </span>
              </div>
              <div className="flex items-center gap-3">
                {matrixActive && (
                  <span className="text-[10px] font-mono text-emerald-400 animate-pulse flex items-center gap-1">
                    <Sparkles size={10} /> MATRIX RAIN ACTIVE
                  </span>
                )}
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-4 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  {item.command !== "welcome" && (
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <span>marcell@portfolio:~$</span>
                      <span className="text-white">{item.command}</span>
                      <span className="text-[10px] text-white/30 ml-auto">{item.timestamp}</span>
                    </div>
                  )}
                  <div className="pl-2 border-l border-cyan-500/20">{item.output}</div>
                </div>
              ))}

              {/* Prompt Input Line */}
              <div className="flex items-center gap-2 text-cyan-400 font-semibold pt-1">
                <span>marcell@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik command ('neofetch', 'help')..."
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-white/25"
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="text-white/40 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Run command"
                >
                  <CornerDownLeft size={14} />
                </button>
              </div>
              <div ref={terminalEndRef} />
            </div>

            {/* Footer help bar */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-white/3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-white/40">
              <div className="flex flex-wrap items-center gap-1.5">
                <span>Suggestions:</span>
                {["neofetch", "whoami", "skills", "projects", "education", "contact", "matrix"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-white/70 transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
              <span>Press [Enter] to run</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
