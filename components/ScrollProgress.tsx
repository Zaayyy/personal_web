"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle spark at leading edge
  const sparkLeft = useTransform(scaleX, (v: number) => `${v * 100}%`);
  const sparkOpacity = useTransform(scaleX, (v: number) =>
    v > 0.01 && v < 0.99 ? 1 : 0
  );

  return (
    <>
      {/* Main progress bar — clean 2px, single blue tone */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-gradient-to-r from-blue-500 to-blue-400 origin-left"
        style={{ scaleX }}
      />

      {/* Small clean spark at leading edge */}
      <motion.div
        className="fixed top-0 z-[10000] pointer-events-none"
        style={{
          left: sparkLeft,
          opacity: sparkOpacity,
        }}
      >
        <div className="relative -top-[1px]">
          <div className="w-[6px] h-[6px] rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.6)] -translate-x-1/2" />
        </div>
      </motion.div>
    </>
  );
}
