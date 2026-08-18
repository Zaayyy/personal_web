"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   SectionTransitionManager
   ─────────────────────────────────────────────────────────────────────────────
   Watches all sections via IntersectionObserver. When a new section becomes
   dominant (≥ 40% visible), it fires a dramatic full-screen transition overlay.
   Each section has a UNIQUE effect style — no two sections share the same look.
───────────────────────────────────────────────────────────────────────────── */

type EffectType =
  | "horizontal-wipe"   // about
  | "glitch-flash"      // projects
  | "particle-burst"    // education
  | "grid-collapse"     // hobbies
  | "scanline-drop"     // gallery
  | "shockwave"         // contact
  | "none";             // hero (skip — it has its own loader)

interface SectionConfig {
  id: string;
  effect: EffectType;
  color: string;   // primary neon color for the effect
  accent: string;
  label: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero",      effect: "none",            color: "#00d4ff", accent: "#a78bfa", label: "HERO" },
  { id: "about",     effect: "horizontal-wipe", color: "#00d4ff", accent: "#a78bfa", label: "ABOUT" },
  { id: "projects",  effect: "glitch-flash",    color: "#a78bfa", accent: "#ec4899", label: "PROJECTS" },
  { id: "education", effect: "particle-burst",  color: "#34d399", accent: "#00d4ff", label: "EDUCATION" },
  { id: "hobbies",   effect: "grid-collapse",   color: "#f59e0b", accent: "#ec4899", label: "HOBBIES" },
  { id: "gallery",   effect: "scanline-drop",   color: "#ec4899", accent: "#a78bfa", label: "GALLERY" },
  { id: "contact",   effect: "shockwave",       color: "#00d4ff", accent: "#34d399", label: "CONTACT" },
];

/* ── Particle for burst effect ── */
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

/* ── Canvas-based particle burst ── */
function ParticleBurstCanvas({
  color,
  accent,
  active,
}: {
  color: string;
  accent: string;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const colors = [color, accent, "#ffffff"];

    // Spawn particles in all directions
    particlesRef.current = Array.from({ length: 120 }, (_, i) => {
      const angle = (i / 120) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 3 + Math.random() * 12;
      return {
        id: i,
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      };
    });

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const alive = particlesRef.current.filter((p) => p.life > 0);
      alive.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.15; // gravity
        p.life -= 0.022;
        ctx!.save();
        ctx!.globalAlpha = Math.max(0, p.life);
        ctx!.shadowBlur = 12;
        ctx!.shadowColor = p.color;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx!.fill();
        // Tail line
        ctx!.strokeStyle = p.color;
        ctx!.lineWidth = p.size * 0.4;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
        ctx!.stroke();
        ctx!.restore();
      });
      particlesRef.current = alive;
      if (alive.length > 0) rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, color, accent]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9990 }}
      aria-hidden
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Individual effect overlays
───────────────────────────────────────────────────────────────────────────── */

/* 1 ── HORIZONTAL WIPE — two bars sweep in from sides, collide, explode out */
function HorizontalWipeEffect({ color, accent }: { color: string; accent: string }) {
  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9980 }}>
      {/* Left bar */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-1/2"
        style={{ background: `linear-gradient(90deg, ${color}33, ${color}99)`, borderRight: `2px solid ${color}` }}
        initial={{ x: "-100%" }}
        animate={{ x: ["−100%", "0%", "-100%"] }}
        transition={{ duration: 0.55, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] }}
      />
      {/* Right bar */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2"
        style={{ background: `linear-gradient(270deg, ${accent}33, ${accent}99)`, borderLeft: `2px solid ${accent}` }}
        initial={{ x: "100%" }}
        animate={{ x: ["100%", "0%", "100%"] }}
        transition={{ duration: 0.55, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] }}
      />
      {/* Center flash on collision */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}66 0%, transparent 60%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 0.55, times: [0, 0.4, 0.5, 1] }}
      />
      {/* Section label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 0.55, times: [0, 0.38, 0.45, 0.55, 0.8] }}
      >
        <span
          className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${color}` }}
        >
          ABOUT
        </span>
      </motion.div>
    </motion.div>
  );
}

/* 2 ── GLITCH FLASH — rapid chromatic aberration + screen tear */
function GlitchFlashEffect({ color, accent }: { color: string; accent: string }) {
  const tears = Array.from({ length: 8 }, (_, i) => ({
    top: `${10 + i * 11}%`,
    height: `${3 + Math.random() * 8}%`,
    offset: (Math.random() - 0.5) * 60,
    delay: i * 0.03,
  }));

  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9980 }}>
      {/* Base flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `${color}22` }}
        animate={{ opacity: [0, 1, 0, 0.7, 0, 0.4, 0] }}
        transition={{ duration: 0.6, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
      />
      {/* Cyan layer offset */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `${color}18`, mixBlendMode: "screen" }}
        animate={{ x: [-8, 6, -4, 3, 0], opacity: [0.8, 0.6, 0.9, 0.3, 0] }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
      />
      {/* Pink layer offset */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `${accent}15`, mixBlendMode: "screen" }}
        animate={{ x: [6, -5, 3, -2, 0], opacity: [0.8, 0.6, 0.9, 0.3, 0] }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
      />
      {/* Screen tears */}
      {tears.map((t, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 overflow-hidden"
          style={{ top: t.top, height: t.height }}
          animate={{ x: [0, t.offset, 0, -t.offset * 0.5, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.35, delay: t.delay, times: [0, 0.15, 0.6, 1] }}
        >
          <div className="w-full h-full" style={{ background: `${color}30`, borderTop: `1px solid ${color}80` }} />
        </motion.div>
      ))}
      {/* Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: [0, 1, 1, 0], x: [-4, 4, -2, 0] }}
        transition={{ duration: 0.5, times: [0.1, 0.25, 0.6, 1] }}
      >
        <span className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color: accent, textShadow: `0 0 30px ${accent}, 0 0 60px ${color}` }}>
          PROJECTS
        </span>
      </motion.div>
    </motion.div>
  );
}

/* 3 ── GRID COLLAPSE — grid lines zoom in and collapse to center */
function GridCollapseEffect({ color, accent }: { color: string; accent: string }) {
  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9980 }}>
      {/* Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${color}40 1px, transparent 1px), linear-gradient(90deg, ${color}40 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: [3, 1, 0.3], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.65, times: [0, 0.4, 1], ease: "easeInOut" }}
      />
      {/* Radial flash from center */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}55 0%, ${accent}22 40%, transparent 70%)` }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [2, 1, 1, 1.05, 1], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 0.65, times: [0, 0.25, 0.6, 0.8, 1] }}
      >
        <span className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${color}` }}>
          HOBBIES
        </span>
      </motion.div>
    </motion.div>
  );
}

/* 4 ── SCANLINE DROP — scanlines cascade top→bottom like a monitor boot */
function ScanlineDropEffect({ color, accent }: { color: string; accent: string }) {
  const NUM_LINES = 20;
  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9980 }}>
      {/* Cascade scanlines */}
      {Array.from({ length: NUM_LINES }, (_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${(i / NUM_LINES) * 100}%`,
            height: `${100 / NUM_LINES}%`,
            background: i % 2 === 0
              ? `${color}28`
              : `${accent}18`,
            borderBottom: `1px solid ${i % 3 === 0 ? color : "transparent"}40`,
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: 0.6,
            delay: i * 0.018,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Bright leading edge */}
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, ${accent}, ${color}, transparent)`, boxShadow: `0 0 20px ${color}` }}
        initial={{ top: "-1%" }}
        animate={{ top: "101%" }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      />
      {/* Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 0.7, times: [0, 0.35, 0.45, 0.7, 1] }}
      >
        <span className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${accent}` }}>
          GALLERY
        </span>
      </motion.div>
    </motion.div>
  );
}

/* 5 ── SHOCKWAVE — ring expands from center like an EMP pulse */
function ShockwaveEffect({ color, accent }: { color: string; accent: string }) {
  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9980 }}>
      {/* Multiple expanding rings */}
      {[0, 0.08, 0.16].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            border: `${3 - i}px solid ${i % 2 === 0 ? color : accent}`,
            boxShadow: `0 0 ${20 + i * 10}px ${color}`,
          }}
          initial={{ width: 0, height: 0, x: "-50%", y: "-50%", opacity: 1 }}
          animate={{
            width: ["0px", "200vmax"],
            height: ["0px", "200vmax"],
            opacity: [1, 0],
          }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
      ))}
      {/* Central flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}88 0%, ${accent}33 30%, transparent 60%)` }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.45, times: [0, 0.15, 1] }}
      />
      {/* Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [0.5, 1.05, 1, 1, 1], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 0.75, times: [0, 0.2, 0.35, 0.7, 1] }}
      >
        <span className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${accent}` }}>
          CONTACT
        </span>
      </motion.div>
    </motion.div>
  );
}

/* 6 ── PARTICLE BURST (visual wrapper — canvas handles the actual particles) */
function ParticleBurstOverlay({ color, accent }: { color: string; accent: string }) {
  return (
    <motion.div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9980 }}>
      {/* Flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}55 0%, transparent 60%)` }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.35, times: [0, 0.1, 1] }}
      />
      {/* Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [0.8, 1, 1, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.65, times: [0, 0.15, 0.6, 1] }}
      >
        <span className="font-mono font-bold text-5xl tracking-[0.4em]"
          style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${accent}` }}>
          EDUCATION
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Section indicator pill — shows which section you're in
───────────────────────────────────────────────────────────────────────────── */
function SectionIndicator({
  label,
  color,
  visible,
}: {
  label: string;
  color: string;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={label}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-[9970] flex flex-col gap-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.35 }}
        >
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
            <motion.button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex items-center gap-2"
              whileHover={{ x: -4 }}
            >
              {/* Dot */}
              <div
                className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                  background: s.label === label ? s.color : "rgba(255,255,255,0.2)",
                  boxShadow: s.label === label ? `0 0 8px ${s.color}` : "none",
                }}
              />
              {/* Label on hover */}
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono tracking-widest"
                style={{ color: s.color }}
              >
                {s.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main manager
───────────────────────────────────────────────────────────────────────────── */
export default function SectionTransitionManager() {
  const [activeEffect, setActiveEffect] = useState<EffectType>("none");
  const [activeColor, setActiveColor] = useState("#00d4ff");
  const [activeAccent, setActiveAccent] = useState("#a78bfa");
  const [activeLabel, setActiveLabel] = useState("HERO");
  const [particleActive, setParticleActive] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const lastSectionRef = useRef<string>("hero");
  const cooldownRef = useRef(false);
  const effectKeyRef = useRef(0);
  const [effectKey, setEffectKey] = useState(0);

  const triggerEffect = useCallback((cfg: SectionConfig) => {
    if (cooldownRef.current || cfg.id === lastSectionRef.current || cfg.effect === "none") return;
    cooldownRef.current = true;
    lastSectionRef.current = cfg.id;

    effectKeyRef.current += 1;
    setEffectKey(effectKeyRef.current);
    setActiveEffect(cfg.effect);
    setActiveColor(cfg.color);
    setActiveAccent(cfg.accent);
    setActiveLabel(cfg.label);

    if (cfg.effect === "particle-burst") {
      setParticleActive(true);
      setTimeout(() => setParticleActive(false), 2000);
    }

    setTimeout(() => {
      setActiveEffect("none");
      cooldownRef.current = false;
    }, 900);
  }, []);

  useEffect(() => {
    // Show indicator after first scroll
    const onScroll = () => setIndicatorVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Section observer
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((cfg) => {
      const el = document.getElementById(cfg.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            triggerEffect(cfg);
            setActiveLabel(cfg.label);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [triggerEffect]);

  return (
    <>
      {/* Section dot navigation */}
      <SectionIndicator label={activeLabel} color={activeColor} visible={indicatorVisible} />

      {/* Particle canvas (education) */}
      <ParticleBurstCanvas color={activeColor} accent={activeAccent} active={particleActive} />

      {/* Effect overlays — keyed so AnimatePresence re-mounts on each trigger */}
      <AnimatePresence mode="wait">
        {activeEffect === "horizontal-wipe" && (
          <HorizontalWipeEffect key={`wipe-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
        {activeEffect === "glitch-flash" && (
          <GlitchFlashEffect key={`glitch-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
        {activeEffect === "particle-burst" && (
          <ParticleBurstOverlay key={`burst-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
        {activeEffect === "grid-collapse" && (
          <GridCollapseEffect key={`grid-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
        {activeEffect === "scanline-drop" && (
          <ScanlineDropEffect key={`scan-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
        {activeEffect === "shockwave" && (
          <ShockwaveEffect key={`shock-${effectKey}`} color={activeColor} accent={activeAccent} />
        )}
      </AnimatePresence>
    </>
  );
}
