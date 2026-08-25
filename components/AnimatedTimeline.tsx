"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface AnimatedTimelineProps {
  children: React.ReactNode;
  className?: string;
}

interface CheckpointDotProps {
  progress: MotionValue<number>;
  threshold: number;
  top: string;
}

function CheckpointDot({ progress, threshold, top }: CheckpointDotProps) {
  const scale = useTransform(progress, (v: number) => (v >= threshold ? 1.25 : 1));
  const borderColor = useTransform(progress, (v: number) =>
    v >= threshold ? "#3b82f6" : "rgba(255, 255, 255, 0.2)"
  );
  const backgroundColor = useTransform(progress, (v: number) =>
    v >= threshold ? "rgba(59, 130, 246, 0.25)" : "#0a0a0f"
  );
  const boxShadow = useTransform(progress, (v: number) =>
    v >= threshold
      ? "0 0 12px rgba(59, 130, 246, 0.6), 0 0 24px rgba(59, 130, 246, 0.3)"
      : "none"
  );
  const innerDotOpacity = useTransform(progress, (v: number) => (v >= threshold ? 1 : 0));
  const innerDotScale = useTransform(progress, (v: number) => (v >= threshold ? 1 : 0.5));

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full border z-10 flex items-center justify-center pointer-events-none"
      style={{
        top,
        scale,
        borderColor,
        backgroundColor,
        boxShadow,
      }}
    >
      <motion.div
        className="w-[4px] h-[4px] rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]"
        style={{
          opacity: innerDotOpacity,
          scale: innerDotScale,
        }}
      />
    </motion.div>
  );
}

export default function AnimatedTimeline({ children, className = "" }: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const checkpoints = [
    { threshold: 0.15, top: "15%" },
    { threshold: 0.5, top: "50%" },
    { threshold: 0.85, top: "85%" },
  ];

  return (
    <div ref={containerRef} className={className}>
      <div className="relative flex">
        {/* Timeline track on the left */}
        <div className="relative w-8 flex-shrink-0 flex flex-col items-center">
          {/* Static track line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

          {/* Animated progress line */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3b82f6] via-[#6366f1] to-[#818cf8] rounded-full origin-top shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            style={{ scaleY }}
          />

          {/* Checkpoint dots */}
          {checkpoints.map((cp, idx) => (
            <CheckpointDot
              key={idx}
              progress={scaleY}
              threshold={cp.threshold}
              top={cp.top}
            />
          ))}
        </div>

        {/* Content on the right */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
