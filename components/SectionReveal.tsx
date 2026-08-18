"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;       // ms
  duration?: number;    // ms
  className?: string;
  threshold?: number;   // 0–1, visibility ratio
}

/**
 * Clean & lightweight scroll reveal wrapper.
 * Smoothly fades and slides sections into view when scrolling.
 */
export default function SectionReveal({
  children,
  delay = 0,
  duration = 600,
  className = "",
  threshold = 0.08,
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
          observer.disconnect(); // animate once
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
        transform: visible ? "none" : "translateY(28px)",
        transition: visible
          ? `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
          : "none",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
