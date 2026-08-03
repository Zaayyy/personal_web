"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 h-[2px] z-[9999] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_8px_rgba(0,212,255,0.6)]"
      style={{ width: "0%", transition: "width 0.08s linear" }}
    />
  );
}
