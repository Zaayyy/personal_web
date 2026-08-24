"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  radius = 200,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothInnerX = useSpring(innerX, springConfig);
  const smoothInnerY = useSpring(innerY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
      innerX.set(distanceX * (strength * 0.5));
      innerY.set(distanceY * (strength * 0.5));
    } else {
      x.set(0);
      y.set(0);
      innerX.set(0);
      innerY.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      <motion.div style={{ x: smoothInnerX, y: smoothInnerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
