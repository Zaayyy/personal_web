"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Sparkles, CornerDownLeft } from "lucide-react";
import { useSoundFX } from "./useSoundFX";

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
            Welcome to Marcell&apos;s Interactive CLI Terminal v2.5! 🚀
          </p>
          <p className="text-white/70">
            Ketik <span className="text-yellow-300 font-mono font-semibold">&quot;help&quot;</span> untuk melihat daftar perintah yang tersedia.
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
  const { playClickSound } = useSoundFX();

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

    playClickSound();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-white/80">
              <p><span className="text-yellow-300">whoami</span> - Profil ringkas Marcellinus</p>
              <p><span className="text-yellow-300">skills</span> - Daftar keahlian & tech stack</p>
              <p><span className="text-yellow-300">projects</span> - Proyek-proyek utama</p>
              <p><span className="text-yellow-300">contact</span> - Kontak & email resmi</p>
              <p><span className="text-yellow-300">socials</span> - Tautan sosial media</p>
              <p><span className="text-yellow-300">matrix</span> - Saklar efek Matrix rain</p>
              <p><span className="text-yellow-300">date</span> - Waktu & tanggal lokal</p>
              <p><span className="text-yellow-300">clear</span> - Bersihkan layar konsol</p>
              <p><span className="text-yellow-300">help</span> - Tampilkan menu bantuan ini</p>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-xs font-mono text-white/90">
            <p className="text-cyan-300 font-bold">Marcellinus Alfrits Sorongan</p>
            <p>🎓 Mahasiswa S-1 Sistem Informasi @ Universitas Amikom Yogyakarta</p>
            <p>💻 Specialization: Full-Stack Web Dev · Data & NLP · Cloud Security</p>
            <p>📍 Location: Yogyakarta, Indonesia 🇮🇩</p>
            <p>🎯 Goal: Building high-performance, secure & scalable web applications</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">💻 Tech Stack & Proficiency:</p>
            <div className="space-y-1 text-white/80">
              <p>• <span className="text-yellow-300 font-semibold">Frontend:</span> React.js (82%), Next.js (78%), TypeScript (78%), Tailwind CSS (88%), JavaScript (87%)</p>
              <p>• <span className="text-violet-400 font-semibold">Backend & Data:</span> Python (80%), NLP/TF-IDF (72%), Data Crawling (80%), MySQL (78%), PostgreSQL (65%)</p>
              <p>• <span className="text-emerald-400 font-semibold">Cloud & Security:</span> AWS CCP (65%), OWASP Top 10 (75%), Web Security (68%), Git & GitHub (85%)</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-semibold">🚀 Proyek Unggulan:</p>
            <div className="space-y-1 text-white/80">
              <p>1. <span className="text-emerald-300">Pintartube</span> - SaaS Learning Platform with LLM Integration</p>
              <p>2. <span className="text-violet-300">Social Media Analytics</span> - Data Mining & NLP Sentiment Research (2000+ data)</p>
              <p>3. <span className="text-amber-300">Web Security Scanner</span> - OWASP Vulnerability Detector (SQLi/XSS)</p>
              <p>4. <span className="text-cyan-300">Portfolio Website</span> - Modern Next.js 15 App with Space Aesthetics</p>
            </div>
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
        output = (
          <div className="space-y-1 text-xs font-mono text-white/90">
            <p className="text-cyan-400 font-semibold">🔗 Media Sosial:</p>
            <p>• GitHub: <a href="https://github.com/Zaayyy" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">github.com/Zaayyy</a></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/marcell-sorongan-36070a299" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">linkedin.com/in/marcell-sorongan</a></p>
            <p>• Instagram: <a href="https://www.instagram.com/aceeeelllllll" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">@aceeeelllllll</a></p>
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
            ❌ Command tidak ditemukan: &quot;{trimmed}&quot;. Ketik <span className="text-yellow-300">&quot;help&quot;</span> untuk bantuan.
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`w-full glass border border-white/15 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-300 ${
              isMaximized
                ? "max-w-7xl h-[90vh]"
                : "max-w-3xl h-[540px]"
            } ${matrixActive ? "bg-black/95 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]" : "bg-[#0b0f19]/90"}`}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
                  title="Close"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
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
                  className="text-white/40 hover:text-white transition-colors"
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
                  placeholder="Ketik command ('help')..."
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-white/20"
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="text-white/40 hover:text-cyan-300 transition-colors"
                  title="Run command"
                >
                  <CornerDownLeft size={14} />
                </button>
              </div>
              <div ref={terminalEndRef} />
            </div>

            {/* Footer help bar */}
            <div className="px-4 py-2 border-t border-white/10 bg-white/3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-white/40">
              <div className="flex items-center gap-2">
                <span>Try typing:</span>
                {["whoami", "skills", "projects", "contact", "matrix"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-white/60 transition-colors"
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
