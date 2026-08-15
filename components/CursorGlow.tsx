"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block"
      style={{
        left: 0,
        top: 0,
      }}
    >
      <motion.div
        className="w-[450px] h-[450px] rounded-full absolute -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[90px]"
        style={{
          x: smoothX,
          y: smoothY,
          background:
            "radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
        }}
      />
    </motion.div>
  );
}
