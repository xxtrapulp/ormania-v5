"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  phase: number;
}

export function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollVelRef = useRef(0);
  const lastScrollRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 60 : 180;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        wobble: Math.random() * 20,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    initParticles();

    const onScroll = () => {
      const current = window.scrollY;
      scrollVelRef.current = Math.abs(current - lastScrollRef.current) * 0.05;
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let frame = 0;
    const animate = () => {
      frame++;
      if (frame % 2 !== 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scrollVelRef.current *= 0.95;

      particlesRef.current.forEach((p) => {
        p.phase += p.wobbleSpeed;
        p.y -= p.speedY + scrollVelRef.current * 0.3;
        p.x += Math.sin(p.phase) * p.wobble * 0.02;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const alpha = p.opacity * (0.7 + scrollVelRef.current * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 188, 133, ${Math.min(alpha, 0.6)})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
