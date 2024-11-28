"use client";

import { useEffect, useRef } from "react";
import styles from "./ParticleWave.module.css";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  size: number;
  color: string;
  phase: number;
}

class ParticleWaveSystem {
  private particles: Particle[] = [];
  private width: number;
  private height: number;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private ripples: Array<{
    x: number;
    y: number;
    size: number;
    alpha: number;
  }> = [];
  private hue: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initializeParticles();
  }

  private initializeParticles() {
    const particleCount = Math.floor((this.width * this.height) / 3000);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseY: Math.random() * this.height,
        speed: 0.2 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        color: `hsl(${Math.random() * 60 + 180}, 80%, 50%)`,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  public updateMousePosition(x: number, y: number) {
    const dx = x - this.mouseX;
    const dy = y - this.mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      this.mouseX = x;
      this.mouseY = y;
      this.createRipple(x, y);
    }
  }

  private createRipple(x: number, y: number) {
    this.ripples.push({
      x,
      y,
      size: 0,
      alpha: 1,
    });
  }

  public animate(time: number) {
    this.hue = (this.hue + 0.1) % 360;

    // Update particles
    this.particles.forEach((particle) => {
      // Wave motion
      particle.y =
        particle.baseY +
        Math.sin(time * 0.001 * particle.speed + particle.phase) * 20;

      // Horizontal movement
      particle.x += particle.speed;
      if (particle.x > this.width) {
        particle.x = 0;
      }

      // Ripple effect
      this.ripples.forEach((ripple) => {
        const dx = particle.x - ripple.x;
        const dy = particle.y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleEffect =
          Math.sin(distance * 0.3 - ripple.size * 0.2) *
          (1 - ripple.size / 100) *
          10;

        if (distance < ripple.size) {
          particle.y += rippleEffect;
        }
      });
    });

    // Update ripples
    this.ripples = this.ripples.filter((ripple) => {
      ripple.size += 2;
      ripple.alpha -= 0.01;
      return ripple.alpha > 0;
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw ripples
    this.ripples.forEach((ripple) => {
      ctx.strokeStyle = `hsla(${this.hue}, 80%, 50%, ${ripple.alpha})`;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw particles
    this.particles.forEach((particle) => {
      ctx.fillStyle = `hsla(${this.hue}, 80%, 50%, 0.8)`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw particle glow
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      );
      gradient.addColorStop(0, `hsla(${this.hue}, 80%, 50%, 0.3)`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleWaveSystem | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    systemRef.current = new ParticleWaveSystem(rect.width, rect.height);

    let animationFrameId: number;

    const animate = (time: number) => {
      if (!ctx || !systemRef.current) return;

      systemRef.current.animate(time);
      systemRef.current.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!systemRef.current || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * dpr;
      const y = (event.clientY - rect.top) * dpr;

      systemRef.current.updateMousePosition(x, y);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
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
