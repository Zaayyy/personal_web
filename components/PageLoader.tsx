"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Animated loading bar ── */
function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
        style={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      />
      {/* Glow trail */}
      <motion.div
        className="absolute top-0 h-full w-8 bg-white/60 blur-sm rounded-full"
        style={{ left: `calc(${progress}% - 16px)` }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      />
    </div>
  );
}

/* ── Glitch text ── */
function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative font-mono font-bold tracking-[0.3em] text-sm text-white/90 select-none">
      {text}
      {/* Cyan ghost */}
      <span
        className="absolute inset-0 text-cyan-400/60"
        style={{ clipPath: "inset(30% 0 50% 0)", transform: "translate(-2px, 1px)" }}
        aria-hidden
      >
        {text}
      </span>
      {/* Pink ghost */}
      <span
        className="absolute inset-0 text-pink-400/50"
        style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, -1px)" }}
        aria-hidden
      >
        {text}
      </span>
    </div>
  );
}

/* ── Scan lines overlay ── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
        zIndex: 2,
      }}
      aria-hidden
    />
  );
}

/* ── Corner brackets decoration ── */
function CornerBrackets() {
  const corners = [
    "top-8 left-8 border-t-2 border-l-2",
    "top-8 right-8 border-t-2 border-r-2",
    "bottom-8 left-8 border-b-2 border-l-2",
    "bottom-8 right-8 border-b-2 border-r-2",
  ];
  return (
    <>
      {corners.map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-10 h-10 border-cyan-400/50 ${cls}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
        />
      ))}
    </>
  );
}

/* ── Main PageLoader ── */
export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done" | "exit">("loading");
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEMS");

  const STATUS_TEXTS = [
    "INITIALIZING SYSTEMS",
    "LOADING MODULES",
    "COMPILING ASSETS",
    "ESTABLISHING LINK",
    "READY",
  ];

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 20, delay: 100,  dur: 350 },
      { target: 45, delay: 450,  dur: 300 },
      { target: 70, delay: 800,  dur: 400 },
      { target: 90, delay: 1200, dur: 250 },
      { target: 100, delay: 1500, dur: 300 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay, dur }, i) => {
      timers.push(
        setTimeout(() => {
          setProgress(target);
          if (STATUS_TEXTS[i]) setStatusText(STATUS_TEXTS[i]);
        }, delay)
      );
    });

    // After 100% → brief pause → exit animation
    timers.push(
      setTimeout(() => {
        setPhase("done");
      }, 1900)
    );

    timers.push(
      setTimeout(() => {
        setPhase("exit");
      }, 2200)
    );

    timers.push(
      setTimeout(() => {
        onComplete();
      }, 2900)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <ScanLines />
          <CornerBrackets />

          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/12 rounded-full blur-[100px] pointer-events-none" />

          {/* Logo / identity */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated logo mark */}
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl border border-cyan-400/30 flex items-center justify-center"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                style={{ borderStyle: "dashed" }}
              />
              <motion.div
                className="absolute inset-3 rounded-xl border border-violet-400/40 flex items-center justify-center"
                animate={{ rotate: [360, 270, 180, 90, 0] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono font-bold text-2xl text-white tracking-tight">
                  M<span className="text-cyan-400">A</span>
                </span>
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />
            </div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GlitchText text="MARCELLINUS ALFRITS" />
              <p className="mt-1 text-white/40 font-mono text-xs tracking-[0.5em]">PORTFOLIO.SYS</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LoadingBar progress={progress} />
              <div className="flex items-center gap-3">
                <span className="text-cyan-400/70 font-mono text-[10px] tracking-widest">
                  {statusText}
                </span>
                <span className="text-white/30 font-mono text-[10px]">{progress}%</span>
              </div>
            </motion.div>

            {/* Done checkmark */}
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <motion.path
                      d="M2 7L5.5 10.5L12 3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </svg>
                  SYSTEM READY
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom info */}
          <motion.div
            className="absolute bottom-10 font-mono text-[10px] text-white/20 tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            EST. 2026 · YOGYAKARTA, ID
          </motion.div>
        </motion.div>
      ) : (
        /* Curtain exit — two panels slide up/down */
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[9998] pointer-events-none"
        >
          {/* Top curtain */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#020205]"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020205]"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Neon split line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ opacity: 1, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
