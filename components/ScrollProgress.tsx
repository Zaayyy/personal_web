"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SECTION_CHECKPOINTS = [
  { id: "hero", label: "Home", position: 0 },
  { id: "about", label: "About", position: 14 },
  { id: "projects", label: "Projects", position: 28 },
  { id: "education", label: "Education", position: 45 },
  { id: "hobbies", label: "Hobbies", position: 60 },
  { id: "gallery", label: "Gallery", position: 75 },
  { id: "contact", label: "Contact", position: 90 },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Spark position follows the leading edge of the progress bar
  const sparkLeft = useTransform(scaleX, (v: number) => `${v * 100}%`);
  const sparkOpacity = useTransform(scaleX, (v: number) =>
    v > 0.01 && v < 0.99 ? 1 : 0
  );

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_12px_rgba(0,212,255,0.8)] origin-left"
        style={{ scaleX }}
      />

      {/* Spark / Comet at leading edge */}
      <motion.div
        className="fixed top-0 z-[10000] pointer-events-none"
        style={{
          left: sparkLeft,
          opacity: sparkOpacity,
        }}
      >
        {/* Spark glow */}
        <div className="relative -top-[3px]">
          <div className="w-[8px] h-[8px] rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.9),0_0_30px_8px_rgba(0,212,255,0.7),0_0_50px_15px_rgba(139,92,246,0.4)] -translate-x-1/2" />
          {/* Comet tail */}
          <div className="absolute top-[2px] right-[4px] w-[40px] h-[4px] bg-gradient-to-l from-transparent via-cyan-400/60 to-transparent blur-[1px] -translate-y-1/2" />
        </div>
      </motion.div>

      {/* Section checkpoint markers */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9998] pointer-events-none">
        {SECTION_CHECKPOINTS.slice(1).map((cp) => (
          <div
            key={cp.id}
            className="absolute top-0 w-[2px] h-[6px] bg-white/20 rounded-full -translate-x-1/2"
            style={{ left: `${cp.position}%` }}
            title={cp.label}
          />
        ))}
      </div>
    </>
  );
}
