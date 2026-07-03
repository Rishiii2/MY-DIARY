"use client";

import { useEffect, useRef } from "react";

// Three bodies, mutually gravitating in a bounded phase space, drawn like an
// analog oscilloscope trace: slow phosphor decay instead of a hard clear.
// This is the page's signature element — a physical simulation, not a
// decorative particle field.

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
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

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const G = 900;
    const bodies: Body[] = [
      { x: width * 0.42, y: height * 0.4, vx: 0.15, vy: 0.42, mass: 14, color: "255,180,84" }, // amber
      { x: width * 0.58, y: height * 0.62, vx: -0.28, vy: -0.1, mass: 10, color: "94,234,212" }, // cyan
      { x: width * 0.5, y: height * 0.28, vx: 0.1, vy: -0.3, mass: 7, color: "155,140,255" }, // violet
    ];

    function step() {
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
        // soft bounds so the system stays on-canvas indefinitely
        const margin = 40;
        if (a.x < margin || a.x > width - margin) a.vx *= -1;
        if (a.y < margin || a.y > height - margin) a.vy *= -1;
        a.x = Math.min(Math.max(a.x, margin), width - margin);
        a.y = Math.min(Math.max(a.y, margin), height - margin);
      }
    }

    let raf = 0;
    function draw() {
      // phosphor decay trail instead of hard clear
      ctx!.fillStyle = "rgba(11,14,20,0.09)";
      ctx!.fillRect(0, 0, width, height);

      step();

      for (const a of bodies) {
        const glow = ctx!.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.mass * 4);
        glow.addColorStop(0, `rgba(${a.color},0.9)`);
        glow.addColorStop(1, `rgba(${a.color},0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.mass * 4, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${a.color},1)`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, Math.max(a.mass * 0.35, 2), 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    if (reduceMotion) {
      // draw a single static frame, no animation loop
      ctx.fillStyle = "rgba(11,14,20,1)";
      ctx.fillRect(0, 0, width, height);
      step();
      for (const a of bodies) {
        ctx.fillStyle = `rgba(${a.color},1)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, Math.max(a.mass * 0.35, 2), 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      draw();
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
