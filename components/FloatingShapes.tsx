"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface ShapeConfig {
  id: number;
  type: "hexagon" | "triangle" | "circle" | "diamond" | "ring";
  size: number;
  color: string;
  opacity: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  clipPath?: string;
  animateY: [number, number, number] | [number, number];
  animateX: [number, number, number] | [number, number];
  animateRotate: number[];
  duration: number;
}

const SHAPES: readonly ShapeConfig[] = [
  {
    id: 1,
    type: "hexagon",
    size: 48,
    color: "#00d4ff",
    opacity: 0.05,
    top: "12%",
    left: "8%",
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    animateY: [0, -32, 0],
    animateX: [0, 12, 0],
    animateRotate: [0, 90, 0],
    duration: 22,
  },
  {
    id: 2,
    type: "ring",
    size: 56,
    color: "#8b5cf6",
    opacity: 0.06,
    top: "22%",
    right: "12%",
    animateY: [0, 28, 0],
    animateX: [0, -14, 0],
    animateRotate: [0, 180, 360],
    duration: 26,
  },
  {
    id: 3,
    type: "triangle",
    size: 36,
    color: "#ec4899",
    opacity: 0.04,
    top: "45%",
    left: "5%",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    animateY: [0, -25, 0],
    animateX: [0, -10, 0],
    animateRotate: [0, -120, 0],
    duration: 18,
  },
  {
    id: 4,
    type: "diamond",
    size: 42,
    color: "#3b82f6",
    opacity: 0.07,
    top: "60%",
    right: "8%",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    animateY: [0, 35, 0],
    animateX: [0, 15, 0],
    animateRotate: [45, 135, 45],
    duration: 24,
  },
  {
    id: 5,
    type: "circle",
    size: 28,
    color: "#00d4ff",
    opacity: 0.05,
    top: "35%",
    left: "28%",
    animateY: [0, -20, 0],
    animateX: [0, 8, 0],
    animateRotate: [0, 0, 0],
    duration: 16,
  },
  {
    id: 6,
    type: "hexagon",
    size: 52,
    color: "#8b5cf6",
    opacity: 0.04,
    top: "78%",
    left: "18%",
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    animateY: [0, -38, 0],
    animateX: [0, -12, 0],
    animateRotate: [0, -90, 0],
    duration: 28,
  },
  {
    id: 7,
    type: "ring",
    size: 38,
    color: "#ec4899",
    opacity: 0.06,
    top: "82%",
    right: "22%",
    animateY: [0, 24, 0],
    animateX: [0, 10, 0],
    animateRotate: [0, 180, 360],
    duration: 20,
  },
  {
    id: 8,
    type: "triangle",
    size: 44,
    color: "#3b82f6",
    opacity: 0.05,
    top: "18%",
    left: "62%",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    animateY: [0, 30, 0],
    animateX: [0, 12, 0],
    animateRotate: [0, 180, 0],
    duration: 25,
  },
  {
    id: 9,
    type: "diamond",
    size: 32,
    color: "#00d4ff",
    opacity: 0.04,
    top: "52%",
    right: "40%",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    animateY: [0, -22, 0],
    animateX: [0, -8, 0],
    animateRotate: [45, -45, 45],
    duration: 19,
  },
  {
    id: 10,
    type: "circle",
    size: 60,
    color: "#8b5cf6",
    opacity: 0.03,
    top: "68%",
    left: "48%",
    animateY: [0, 26, 0],
    animateX: [0, -15, 0],
    animateRotate: [0, 0, 0],
    duration: 30,
  },
];

interface FloatingShapesProps {
  className?: string;
}

function FloatingShapesComponent({ className = "" }: FloatingShapesProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}
    >
      {SHAPES.map((shape) => {
        const isRing = shape.type === "ring";
        const isCircle = shape.type === "circle";

        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              top: shape.top,
              bottom: shape.bottom,
              left: shape.left,
              right: shape.right,
              width: shape.size,
              height: shape.size,
              opacity: shape.opacity,
              backgroundColor: isRing ? "transparent" : shape.color,
              borderRadius: isCircle || isRing ? "9999px" : undefined,
              border: isRing ? `2px solid ${shape.color}` : undefined,
              clipPath: shape.clipPath,
            }}
            animate={{
              y: shape.animateY,
              x: shape.animateX,
              rotate: shape.animateRotate,
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

const FloatingShapes = memo(FloatingShapesComponent);

export default FloatingShapes;
