import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  color: string;
  glowColor: string;
  shape: 'star4' | 'star8' | 'orb';
}

interface ShimmerRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const SPARKLE_PALETTE = [
  { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.95)' },
  { color: '#e0f2fe', glow: 'rgba(125, 211, 252, 0.95)' },
  { color: '#7dd3fc', glow: 'rgba(56, 189, 248, 0.9)' },
  { color: '#38bdf8', glow: 'rgba(14, 165, 233, 0.9)' },
  { color: '#60a5fa', glow: 'rgba(59, 130, 246, 0.9)' },
  { color: '#e2e8f0', glow: 'rgba(226, 232, 240, 0.85)' },
];

export const ClickSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    const particles: SparkleParticle[] = [];
    const rings: ShimmerRing[] = [];

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const drawFourPointStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      const inner = radius * 0.24;
      for (let i = 0; i < 4; i++) {
        const angleOuter = (i * Math.PI) / 2;
        const angleInner = angleOuter + Math.PI / 4;
        const ox = Math.cos(angleOuter) * radius;
        const oy = Math.sin(angleOuter) * radius;
        const ix = Math.cos(angleInner) * inner;
        const iy = Math.sin(angleInner) * inner;
        if (i === 0) {
          context.moveTo(ox, oy);
        } else {
          context.lineTo(ox, oy);
        }
        context.lineTo(ix, iy);
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawEightPointStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      rotation: number
    ) => {
      drawFourPointStar(context, x, y, radius, rotation);
      drawFourPointStar(context, x, y, radius * 0.65, rotation + Math.PI / 4);
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw subtle expanding rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += (r.maxRadius - r.radius) * 0.16;
        r.alpha -= 0.045;

        if (r.alpha <= 0.01) {
          rings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(125, 211, 252, ${r.alpha * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw sparkle particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy = p.vy * 0.95 + 0.06; // subtle float + gentle gravity
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        const twinkle = 0.75 + 0.25 * Math.sin(p.alpha * 22);
        const currentAlpha = Math.max(0, Math.min(1, p.alpha * twinkle));
        const currentSize = p.size * (0.4 + 0.6 * p.alpha);

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 12;

        if (p.shape === 'star8') {
          drawEightPointStar(ctx, p.x, p.y, currentSize, p.rotation);
        } else if (p.shape === 'star4') {
          drawFourPointStar(ctx, p.x, p.y, currentSize, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (particles.length > 0 || rings.length > 0) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    const spawnSparkleBurst = (x: number, y: number) => {
      rings.push({
        x,
        y,
        radius: 2,
        maxRadius: 38,
        alpha: 0.85,
      });

      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
        const speed = 1.4 + Math.random() * 4.6;
        const palette = SPARKLE_PALETTE[Math.floor(Math.random() * SPARKLE_PALETTE.length)];
        const randShape = Math.random();
        const shape: SparkleParticle['shape'] =
          randShape < 0.45 ? 'star4' : randShape < 0.78 ? 'star8' : 'orb';

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          size: shape === 'orb' ? 4 + Math.random() * 4 : 6 + Math.random() * 8,
          alpha: 1,
          decay: 0.016 + Math.random() * 0.016,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.12,
          color: palette.color,
          glowColor: palette.glow,
          shape,
        });
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnSparkleBurst(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
