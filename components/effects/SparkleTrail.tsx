"use client";

import { useRef, useEffect } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
}

export function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.6) return;
      sparklesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 2 + 1,
        life: 1,
        maxLife: Math.random() * 15 + 10,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life++;
        const progress = s.life / s.maxLife;
        if (progress >= 1) return false;

        const alpha = (1 - progress) * 0.7;
        const scale = 1 - progress * 0.5;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 195, 59, ${alpha})`;
        ctx.fill();

        // Cross sparkle
        const arm = s.size * scale * 2.5;
        ctx.strokeStyle = `rgba(217, 188, 133, ${alpha * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y);
        ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm);
        ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();

        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
