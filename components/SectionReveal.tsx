"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "fade";

interface SectionRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;       // ms
  duration?: number;    // ms
  className?: string;
  threshold?: number;   // 0–1, how much of element visible before trigger
}

const INITIAL_TRANSFORMS: Record<Direction, string> = {
  up:    "translateY(60px)",
  left:  "translateX(-60px)",
  right: "translateX(60px)",
  scale: "scale(0.88)",
  fade:  "none",
};

/**
 * Wraps any section/block and animates it into view when it enters the viewport.
 * Uses native IntersectionObserver + CSS transitions — no extra library weight.
 */
export default function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.12,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : INITIAL_TRANSFORMS[direction],
        transition: visible
          ? `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          : "none",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
