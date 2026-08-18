"use client";

import { useEffect, useRef, memo } from "react";

/* ──────────────────────────────────────────────
   Cloud shape definitions — each cloud is made
   up of SVG-style blob clusters rendered on canvas.
   We use pure canvas for max perf.
────────────────────────────────────────────── */

interface CloudDef {
  x: number;        // 0–1 (relative to canvas width)
  y: number;        // 0–1 (relative to canvas height)
  scale: number;
  speed: number;    // px per second horizontal drift
  color: [number, number, number]; // RGB
  glowColor: [number, number, number];
  opacity: number;
  glitchRate: number; // 0–1 probability per frame
  layer: number;    // 1=far, 2=mid, 3=near (parallax depth)
}

const CLOUD_DEFS: CloudDef[] = [
  // Layer 1 — far / slow / smaller
  { x: 0.05, y: 0.15, scale: 0.9, speed: 8,  color: [0, 180, 255],   glowColor: [0, 212, 255],   opacity: 0.18, glitchRate: 0.002, layer: 1 },
  { x: 0.55, y: 0.08, scale: 1.1, speed: 10, color: [80, 100, 255],  glowColor: [100, 120, 255], opacity: 0.14, glitchRate: 0.003, layer: 1 },
  { x: 0.80, y: 0.22, scale: 0.7, speed: 7,  color: [0, 200, 220],   glowColor: [0, 220, 255],   opacity: 0.12, glitchRate: 0.002, layer: 1 },

  // Layer 2 — mid / medium speed
  { x: 0.20, y: 0.30, scale: 1.4, speed: 18, color: [0, 212, 255],   glowColor: [0, 255, 255],   opacity: 0.22, glitchRate: 0.005, layer: 2 },
  { x: 0.65, y: 0.40, scale: 1.2, speed: 15, color: [120, 60, 255],  glowColor: [160, 80, 255],  opacity: 0.20, glitchRate: 0.004, layer: 2 },
  { x: 0.40, y: 0.55, scale: 1.6, speed: 20, color: [0, 180, 255],   glowColor: [0, 220, 255],   opacity: 0.16, glitchRate: 0.006, layer: 2 },
  { x: 0.88, y: 0.62, scale: 1.0, speed: 14, color: [200, 50, 255],  glowColor: [220, 80, 255],  opacity: 0.18, glitchRate: 0.003, layer: 2 },

  // Layer 3 — near / fast / larger / more visible
  { x: 0.10, y: 0.68, scale: 2.0, speed: 30, color: [0, 212, 255],   glowColor: [0, 255, 255],   opacity: 0.28, glitchRate: 0.008, layer: 3 },
  { x: 0.50, y: 0.75, scale: 2.4, speed: 35, color: [80, 50, 255],   glowColor: [120, 80, 255],  opacity: 0.24, glitchRate: 0.010, layer: 3 },
  { x: 0.75, y: 0.82, scale: 1.8, speed: 28, color: [0, 200, 240],   glowColor: [0, 230, 255],   opacity: 0.26, glitchRate: 0.007, layer: 3 },
  { x: 0.30, y: 0.88, scale: 2.8, speed: 40, color: [0, 160, 255],   glowColor: [0, 200, 255],   opacity: 0.20, glitchRate: 0.009, layer: 3 },
];

/* Draws a single cloud blob cluster at (cx, cy) with given scale */
function drawCloud(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: [number, number, number],
  glowColor: [number, number, number],
  opacity: number,
  glitching: boolean,
  time: number
) {
  ctx.save();

  // Glow shadow
  ctx.shadowBlur = 60 * scale;
  ctx.shadowColor = `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${opacity * 2})`;

  // Blob positions within cloud (relative offsets × scale)
  const blobs = [
    { ox: 0,       oy: 0,       r: 60 * scale },
    { ox: -70 * scale, oy: 15 * scale, r: 50 * scale },
    { ox: 70 * scale,  oy: 10 * scale, r: 55 * scale },
    { ox: -40 * scale, oy: -30 * scale, r: 40 * scale },
    { ox: 40 * scale,  oy: -25 * scale, r: 38 * scale },
    { ox: -110 * scale, oy: 30 * scale, r: 32 * scale },
    { ox: 110 * scale,  oy: 25 * scale, r: 30 * scale },
  ];

  blobs.forEach(({ ox, oy, r }) => {
    // Glitch offset
    const gx = glitching ? (Math.random() - 0.5) * 20 * scale : 0;
    const gy = glitching ? (Math.random() - 0.5) * 8 * scale : 0;

    const bx = cx + ox + gx;
    const by = cy + oy + gy;

    // Radial gradient per blob — electric neon look
    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
    grad.addColorStop(0,   `rgba(${color[0]},${color[1]},${color[2]},${opacity})`);
    grad.addColorStop(0.4, `rgba(${color[0]},${color[1]},${color[2]},${opacity * 0.7})`);
    grad.addColorStop(0.8, `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${opacity * 0.3})`);
    grad.addColorStop(1,   `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},0)`);

    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  });

  // Electric scanline streak on glitch
  if (glitching) {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},0.8)`;
    const numLines = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numLines; i++) {
      const lineY = cy + (Math.random() - 0.5) * 80 * scale;
      const lineW = (Math.random() * 180 + 40) * scale;
      const lineH = Math.random() * 2 + 0.5;
      ctx.fillRect(cx - lineW / 2, lineY, lineW, lineH);
    }
    ctx.globalAlpha = 1;
  }

  // Subtle inner pulse ring
  const pulseR = 50 * scale * (1 + 0.08 * Math.sin(time * 2.5));
  const ringGrad = ctx.createRadialGradient(cx, cy, pulseR * 0.7, cx, cy, pulseR);
  ringGrad.addColorStop(0, `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},0)`);
  ringGrad.addColorStop(1, `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${opacity * 0.4})`);
  ctx.beginPath();
  ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
  ctx.fillStyle = ringGrad;
  ctx.fill();

  ctx.restore();
}

/* ── Main canvas component ── */
interface CyberCloudsProps {
  mouseX?: number; // -0.5 to 0.5
  mouseY?: number;
}

function CyberClouds({ mouseX = 0, mouseY = 0 }: CyberCloudsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    clouds: CLOUD_DEFS.map((def) => ({ ...def, px: def.x, glitching: false })),
    raf: 0,
    lastTime: 0,
    mouseX,
    mouseY,
  });

  // Sync mouse from props
  useEffect(() => {
    stateRef.current.mouseX = mouseX;
    stateRef.current.mouseY = mouseY;
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function render(ts: number) {
      const st = stateRef.current;
      const dt = Math.min((ts - st.lastTime) / 1000, 0.05);
      st.lastTime = ts;
      const time = ts / 1000;

      const W = canvas!.width;
      const H = canvas!.height;

      ctx!.clearRect(0, 0, W, H);

      st.clouds.forEach((cloud) => {
        // Drift right, wrap around
        cloud.px += (cloud.speed * dt) / W;
        if (cloud.px > 1.2) cloud.px = -0.25;

        // Glitch toggle
        if (Math.random() < cloud.glitchRate) cloud.glitching = true;
        else if (cloud.glitching && Math.random() < 0.3) cloud.glitching = false;

        // Parallax offset per layer
        const parallaxFactor = cloud.layer === 1 ? 0.5 : cloud.layer === 2 ? 1.5 : 3.0;
        const px = cloud.px * W + st.mouseX * parallaxFactor * 30;
        const py = cloud.y * H + st.mouseY * parallaxFactor * 20;

        drawCloud(ctx!, px, py, cloud.scale, cloud.color, cloud.glowColor, cloud.opacity, cloud.glitching, time);
      });

      st.raf = requestAnimationFrame(render);
    }

    stateRef.current.raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

export default memo(CyberClouds);
