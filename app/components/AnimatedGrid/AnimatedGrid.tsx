"use client";

import { useEffect, useRef } from "react";
import styles from "./animatedGrid.module.css";

interface Point {
  x: number;
  y: number;
  value: number;
  hoverIntensity: number;
  rotation: number;
  scale: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

class StippledTerrain {
  private width: number;
  private height: number;
  private terrain: Point[][];
  private currentColor: RGB;
  private targetColor: RGB;
  private secondaryColor: RGB = { r: 10, g: 10, b: 10 };
  private colorTransitionSpeed: number = 0.01;
  private mouseX: number = -1;
  private mouseY: number = -1;
  private hoverRadius: number = 8;
  private time: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.currentColor = this.generateRandomColor();
    this.targetColor = this.generateRandomColor();
    this.terrain = Array.from({ length: width }, (_, x) =>
      Array.from({ length: height }, (_, y) => ({
        x,
        y,
        value: 0,
        hoverIntensity: 0,
        rotation: 0,
        scale: 1,
      }))
    );
    this.generateTerrain();
  }

  private generateRandomColor(): RGB {
    const hue = Math.random() * 360;
    const saturation = 90 + Math.random() * 10;
    const lightness = 55 + Math.random() * 10;

    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  public updateMousePosition(x: number, y: number): void {
    this.mouseX = x;
    this.mouseY = y;
  }

  private updateColor(): void {
    const dx = this.targetColor.r - this.currentColor.r;
    const dy = this.targetColor.g - this.currentColor.g;
    const dz = this.targetColor.b - this.currentColor.b;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < 1) {
      this.targetColor = this.generateRandomColor();
    } else {
      this.currentColor.r += dx * this.colorTransitionSpeed;
      this.currentColor.g += dy * this.colorTransitionSpeed;
      this.currentColor.b += dz * this.colorTransitionSpeed;
    }
  }

  private noise(x: number, y: number): number {
    return (
      Math.sin(x + y) * 0.5 +
      Math.sin(x * 1.5 + y * 2) * 0.3 +
      Math.cos(x * 2 + y * 1.5) * 0.2
    );
  }

  private generateTerrain(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const nx = x / this.width - 0.5;
        const ny = y / this.height - 0.5;
        this.terrain[x][y].value = this.noise(nx * 5, ny * 5);
      }
    }
  }

  public animate(time: number): void {
    this.time = time;
    this.updateColor();

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const timeOffset = Math.sin(time * 0.001 + x * 0.1 + y * 0.1);
        this.terrain[x][y].value = this.noise(
          x * 0.01 + timeOffset,
          y * 0.01 + timeOffset
        );

        if (this.mouseX >= 0 && this.mouseY >= 0) {
          const dx = x - this.mouseX;
          const dy = y - this.mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const hoverEffect = Math.max(0, 1 - distance / this.hoverRadius);

          this.terrain[x][y].hoverIntensity +=
            (hoverEffect - this.terrain[x][y].hoverIntensity) * 0.1;

          this.terrain[x][y].rotation =
            Math.atan2(dy, dx) + Math.sin(time * 0.001) * hoverEffect * Math.PI;

          this.terrain[x][y].scale =
            1 + Math.sin(time * 0.002 + distance * 0.1) * hoverEffect * 0.5;
        } else {
          this.terrain[x][y].hoverIntensity *= 0.95;
          this.terrain[x][y].rotation *= 0.95;
          this.terrain[x][y].scale = 1 + (this.terrain[x][y].scale - 1) * 0.95;
        }
      }
    }
  }

  private getColor(height: number, hoverIntensity: number): string {
    const intensity = Math.abs(height);

    const hoverColor = {
      r: Math.round(255 * Math.sin(this.time * 0.001)),
      g: Math.round(255 * Math.sin(this.time * 0.001 + (Math.PI * 2) / 3)),
      b: Math.round(255 * Math.sin(this.time * 0.001 + (Math.PI * 4) / 3)),
    };

    const r = Math.round(
      this.currentColor.r * (1 - hoverIntensity) + hoverColor.r * hoverIntensity
    );
    const g = Math.round(
      this.currentColor.g * (1 - hoverIntensity) + hoverColor.g * hoverIntensity
    );
    const b = Math.round(
      this.currentColor.b * (1 - hoverIntensity) + hoverColor.b * hoverIntensity
    );

    const finalColor = [
      Math.round(r * (1 - intensity) + this.secondaryColor.r * intensity),
      Math.round(g * (1 - intensity) + this.secondaryColor.g * intensity),
      Math.round(b * (1 - intensity) + this.secondaryColor.b * intensity),
    ];

    return `rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const cellWidth = canvasWidth / this.width;
    const cellHeight = canvasHeight / this.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const point = this.terrain[x][y];
        const centerX = x * cellWidth + cellWidth / 2;
        const centerY = y * cellHeight + cellHeight / 2;
        const baseRadius = cellWidth * (0.1 + Math.abs(point.value) * 0.1);
        const radius = baseRadius * point.scale;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(point.rotation);

        ctx.beginPath();
        ctx.fillStyle = this.getColor(point.value, point.hoverIntensity);
        ctx.globalAlpha = 0.8;
        ctx.arc(0, 0, Math.round(radius), 0, Math.PI * 2);
        ctx.fill();

        if (point.hoverIntensity > 0.1) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${point.hoverIntensity * 0.3})`;
          ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }
  }
}

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terrainRef = useRef<StippledTerrain | null>(null);

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

    terrainRef.current = new StippledTerrain(50, 50);

    let animationFrameId: number;

    const animate = (time: number) => {
      if (!ctx || !terrainRef.current) return;

      terrainRef.current.animate(time);
      terrainRef.current.draw(ctx, rect.width, rect.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!terrainRef.current || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 50;
      const y = ((event.clientY - rect.top) / rect.height) * 50;

      terrainRef.current.updateMousePosition(x, y);
    };

    const handleMouseLeave = () => {
      if (!terrainRef.current) return;
      terrainRef.current.updateMousePosition(-1, -1);
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
