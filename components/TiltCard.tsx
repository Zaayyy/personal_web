"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 5,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = (mouseX / rect.width - 0.5) * 2;
      const yPct = (mouseY / rect.height - 0.5) * 2;

      setRotateX(-yPct * tiltStrength);
      setRotateY(xPct * tiltStrength);

      if (glareEnabled) {
        setGlarePosition({
          x: (mouseX / rect.width) * 100,
          y: (mouseY / rect.height) * 100,
        });
      }
    },
    [tiltStrength, glareEnabled]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 800 }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : "rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.15s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className={`relative w-full h-full ${className}`}
      >
        {children}

        {glareEnabled && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit] overflow-hidden"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.03), transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
