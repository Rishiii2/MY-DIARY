"use client";

import { useEffect, useRef } from "react";

// Three stars, mutually gravitating in a bounded phase space, rendered like
// a real deep-space long-exposure capture: a twinkling starfield backdrop,
// a soft nebula wash, and the orbiting stars leaving true trajectory traces
// (like a long-exposure orbit photograph) instead of a decaying oscilloscope
// blip. This is the page's signature element — a physical simulation, not a
// decorative particle field.

type StarBody = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  // core: the near-white hot center every real star has.
  // halo: the color that reads at a distance (temperature).
  halo: string; // "r,g,b"
};

type BgStar = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  tint: string; // "r,g,b"
};

export default function OrbitScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Offscreen buffer that accumulates the orbit trajectories. It is never
    // hard-cleared, only faded a hair each frame, so the true path shape
    // (rosettes, near-misses, slow drift) becomes visible over time — the
    // same way a long-exposure photo of star trails works.
    const trailCanvas = document.createElement("canvas");
    const trailCtx = trailCanvas.getContext("2d")!;

    let bgStars: BgStar[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      trailCanvas.width = width * dpr;
      trailCanvas.height = height * dpr;
      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trailCtx.fillStyle = "rgba(4,6,12,1)";
      trailCtx.fillRect(0, 0, width, height);

      // regenerate the field for the new size
      const count = Math.floor((width * height) / 1800);
      bgStars = Array.from({ length: count }).map(() => {
        const t = Math.random();
        // realistic-ish star temperature distribution: mostly white/blue-white,
        // some yellow, a few warm red-orange
        const tint =
          t < 0.55 ? "214,224,255" : t < 0.8 ? "255,244,214" : t < 0.93 ? "255,214,170" : "255,170,150";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.1 + 0.2,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          tint,
        };
      });
    }
    resize();
    window.addEventListener("resize", resize);

    const G = 900;
    const bodies: StarBody[] = [
      { x: width * 0.42, y: height * 0.4, vx: 0.15, vy: 0.42, mass: 13, halo: "255,180,84" }, // amber giant
      { x: width * 0.58, y: height * 0.62, vx: -0.28, vy: -0.1, mass: 9, halo: "140,210,255" }, // blue-white
      { x: width * 0.5, y: height * 0.28, vx: 0.1, vy: -0.3, mass: 6.5, halo: "255,140,140" }, // red dwarf
    ];

    function stepPhysics() {
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const b = bodies[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = Math.max(dx * dx + dy * dy, 400);
          const dist = Math.sqrt(distSq);
          const force = (G * b.mass) / distSq;
          fx += (force * dx) / dist;
          fy += (force * dy) / dist;
        }
        a.vx += fx * 0.0025;
        a.vy += fy * 0.0025;
      }
      for (const a of bodies) {
        a.x += a.vx;
        a.y += a.vy;
        const margin = 44;
        if (a.x < margin || a.x > width - margin) a.vx *= -1;
        if (a.y < margin || a.y > height - margin) a.vy *= -1;
        a.x = Math.min(Math.max(a.x, margin), width - margin);
        a.y = Math.min(Math.max(a.y, margin), height - margin);
      }
    }

    function drawStar(c: CanvasRenderingContext2D, x: number, y: number, mass: number, halo: string, alpha = 1) {
      const r = mass * 1.05;
      // outer color halo
      const glow = c.createRadialGradient(x, y, 0, x, y, r * 5);
      glow.addColorStop(0, `rgba(${halo},${0.55 * alpha})`);
      glow.addColorStop(0.4, `rgba(${halo},${0.18 * alpha})`);
      glow.addColorStop(1, `rgba(${halo},0)`);
      c.fillStyle = glow;
      c.beginPath();
      c.arc(x, y, r * 5, 0, Math.PI * 2);
      c.fill();

      // diffraction spikes, like a real bright star through a lens
      c.save();
      c.globalAlpha = 0.35 * alpha;
      c.strokeStyle = `rgba(${halo},1)`;
      c.lineWidth = 0.6;
      const spike = r * 6;
      c.beginPath();
      c.moveTo(x - spike, y);
      c.lineTo(x + spike, y);
      c.moveTo(x, y - spike);
      c.lineTo(x, y + spike);
      c.stroke();
      c.restore();

      // hot white core
      const core = c.createRadialGradient(x, y, 0, x, y, r);
      core.addColorStop(0, `rgba(255,255,255,${alpha})`);
      core.addColorStop(0.5, `rgba(${halo},${0.95 * alpha})`);
      core.addColorStop(1, `rgba(${halo},${0.4 * alpha})`);
      c.fillStyle = core;
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
    }

    let raf = 0;
    let frame = 0;

    function drawFrame() {
      frame++;

      // 1. fade the trajectory buffer a hair — this is what turns dots into
      // visible orbit *paths* rather than a fading trail
      trailCtx.fillStyle = "rgba(4,6,12,0.035)";
      trailCtx.fillRect(0, 0, width, height);

      stepPhysics();

      // stamp each star's current position onto the trail buffer as a small
      // bright point — accumulates into the true orbit shape over time
      for (const a of bodies) {
        trailCtx.fillStyle = `rgba(${a.halo},0.9)`;
        trailCtx.beginPath();
        trailCtx.arc(a.x, a.y, 1.15, 0, Math.PI * 2);
        trailCtx.fill();
      }

      // 2. compose the visible frame: deep space base -> nebula wash ->
      // twinkling starfield -> accumulated orbit trails -> live glowing stars
      ctx!.fillStyle = "#04060c";
      ctx!.fillRect(0, 0, width, height);

      const neb1 = ctx!.createRadialGradient(width * 0.2, height * 0.15, 0, width * 0.2, height * 0.15, width * 0.55);
      neb1.addColorStop(0, "rgba(94,60,140,0.10)");
      neb1.addColorStop(1, "rgba(94,60,140,0)");
      ctx!.fillStyle = neb1;
      ctx!.fillRect(0, 0, width, height);

      const neb2 = ctx!.createRadialGradient(width * 0.85, height * 0.9, 0, width * 0.85, height * 0.9, width * 0.5);
      neb2.addColorStop(0, "rgba(30,90,120,0.10)");
      neb2.addColorStop(1, "rgba(30,90,120,0)");
      ctx!.fillStyle = neb2;
      ctx!.fillRect(0, 0, width, height);

      for (const s of bgStars) {
        const twinkle = 0.5 + 0.5 * Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
        ctx!.fillStyle = `rgba(${s.tint},${s.baseAlpha * (0.55 + 0.45 * twinkle)})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "lighter";
      ctx!.drawImage(trailCanvas, 0, 0, width, height);
      ctx!.globalCompositeOperation = "source-over";

      for (const a of bodies) {
        drawStar(ctx!, a.x, a.y, a.mass, a.halo);
      }

      raf = requestAnimationFrame(drawFrame);
    }

    if (reduceMotion) {
      // single static, fully-composed frame — no animation loop
      ctx.fillStyle = "#04060c";
      ctx.fillRect(0, 0, width, height);
      for (const s of bgStars) {
        ctx.fillStyle = `rgba(${s.tint},${s.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      stepPhysics();
      for (const a of bodies) {
        drawStar(ctx, a.x, a.y, a.mass, a.halo);
      }
    } else {
      drawFrame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full rounded-2xl border border-line bg-ink"
    />
  );
}
