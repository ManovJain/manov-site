"use client";

import { useEffect, useRef } from "react";
import styles from "./particleFlow.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

class FlowField {
  private particles: Particle[];
  private mouseX: number = -1;
  private mouseY: number = -1;
  private time: number = 0;
  private readonly maxParticles = 1000;
  private readonly particleLife = 100;
  private readonly baseSpeed = 2;
  private readonly fieldScale = 0.005;
  private readonly colorPalette: string[];

  constructor() {
    this.particles = [];
    // Create a sophisticated color palette
    this.colorPalette = [
      "hsla(280, 80%, 60%, 0.8)",
      "hsla(320, 90%, 65%, 0.8)",
      "hsla(360, 85%, 70%, 0.8)",
      "hsla(40, 90%, 65%, 0.8)",
      "hsla(180, 80%, 60%, 0.8)",
    ];
  }

  private noise(x: number, y: number, time: number): number {
    const t = time * 0.0005;
    return (
      Math.sin(x * this.fieldScale + t) * Math.cos(y * this.fieldScale + t) +
      Math.sin((x + y) * this.fieldScale - t) * 0.5
    );
  }

  public updateMousePosition(x: number, y: number): void {
    this.mouseX = x;
    this.mouseY = y;
    // Create burst of particles at mouse position
    if (x >= 0 && y >= 0) {
      for (let i = 0; i < 10; i++) {
        this.addParticle(x, y);
      }
    }
  }

  private addParticle(x: number, y: number): void {
    if (this.particles.length >= this.maxParticles) return;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * this.baseSpeed;

    this.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: this.particleLife,
      color:
        this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)],
    });
  }

  public animate(time: number): void {
    this.time = time;

    // Add new particles randomly
    if (Math.random() < 0.3) {
      this.addParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }

    // Update particles
    this.particles = this.particles.filter((particle) => {
      // Update position based on flow field
      const angle = this.noise(particle.x, particle.y, time) * Math.PI * 2;
      const speed =
        this.baseSpeed * (0.5 + Math.abs(Math.sin(time * 0.001)) * 0.5);

      particle.vx += Math.cos(angle) * 0.1;
      particle.vy += Math.sin(angle) * 0.1;

      // Apply velocity limits
      const velocity = Math.sqrt(
        particle.vx * particle.vx + particle.vy * particle.vy
      );
      if (velocity > speed) {
        particle.vx = (particle.vx / velocity) * speed;
        particle.vy = (particle.vy / velocity) * speed;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      // Wrap around edges
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;

      return particle.life > 0;
    });
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.particles.forEach((particle) => {
      const alpha = particle.life / this.particleLife;
      ctx.beginPath();
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 2 * alpha;
      ctx.lineCap = "round";
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x - particle.vx * 4, particle.y - particle.vy * 4);
      ctx.stroke();
    });
  }
}

export default function ParticleFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowFieldRef = useRef<FlowField | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup high-DPI canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    flowFieldRef.current = new FlowField();

    let animationFrameId: number;

    const animate = (time: number) => {
      if (!ctx || !flowFieldRef.current) return;

      flowFieldRef.current.animate(time);
      flowFieldRef.current.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!flowFieldRef.current || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      flowFieldRef.current.updateMousePosition(x, y);
    };

    const handleMouseLeave = () => {
      if (!flowFieldRef.current) return;
      flowFieldRef.current.updateMousePosition(-1, -1);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
