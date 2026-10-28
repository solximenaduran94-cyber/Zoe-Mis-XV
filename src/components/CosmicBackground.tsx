import React, { useEffect, useRef } from 'react';
import nebulaImg from '../assets/images/cosmic_blue_nebula_1790352636849.jpg';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface CosmicDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initDust();
    };

    window.addEventListener('resize', handleResize);

    // Stars
    let stars: Star[] = [];
    const colors = ['#ffffff', '#bae6fd', '#93c5fd', '#60a5fa', '#c084fc', '#e0e7ff'];

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 4500); // Responsive star density
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Cosmic Dust / Floating Luminous Particles
    let dustParticles: CosmicDust[] = [];
    const initDust = () => {
      dustParticles = [];
      const dustCount = Math.floor(Math.min(width, 1000) / 20);
      for (let i = 0; i < dustCount; i++) {
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.4 - 0.1, // gently float upward
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(147, 197, 253, ',
        });
      }
    };

    // Shooting Stars
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // diagonal downwards
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 110 + 60,
        speed: Math.random() * 7 + 10,
        angle,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 25 + 30,
      });
    };

    initStars();
    initDust();

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic nebula glow points drawn on canvas
      const glowGrad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(time * 0.5) * 40,
        height * 0.35 + Math.cos(time * 0.4) * 30,
        10,
        width * 0.25,
        height * 0.35,
        width * 0.6
      );
      glowGrad1.addColorStop(0, 'rgba(30, 64, 175, 0.28)');
      glowGrad1.addColorStop(0.5, 'rgba(14, 116, 144, 0.15)');
      glowGrad1.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = glowGrad1;
      ctx.fillRect(0, 0, width, height);

      const glowGrad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.3) * 50,
        height * 0.7 + Math.sin(time * 0.5) * 40,
        20,
        width * 0.8,
        height * 0.7,
        width * 0.55
      );
      glowGrad2.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
      glowGrad2.addColorStop(0.6, 'rgba(2, 132, 199, 0.12)');
      glowGrad2.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = glowGrad2;
      ctx.fillRect(0, 0, width, height);

      // Render Stars with twinkling
      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha + Math.sin(star.phase) * 0.35;
        const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();

        // 4-point sparkle for larger stars
        if (star.size > 1.6 && clampedAlpha > 0.7) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2.5, star.y);
          ctx.lineTo(star.x + star.size * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2.5);
          ctx.lineTo(star.x, star.y + star.size * 2.5);
          ctx.stroke();
        }
      }

      // Render Floating Dust
      for (const dust of dustParticles) {
        dust.x += dust.vx;
        dust.y += dust.vy;

        if (dust.y < -10) {
          dust.y = height + 10;
          dust.x = Math.random() * width;
        }
        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = `${dust.color}${dust.alpha})`;
        ctx.globalAlpha = dust.alpha;
        ctx.fill();
      }

      // Shooting stars management
      const now = Date.now();
      if (now - lastShootingStarTime > 4500 && Math.random() < 0.35) {
        spawnShootingStar();
        lastShootingStarTime = now;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const lifeRatio = s.life / s.maxLife;
        s.alpha = Math.max(0, 1 - lifeRatio);

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
        grad.addColorStop(0.3, `rgba(186, 230, 253, ${s.alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Deep Nebula Image Base with soft looping animation */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55 mix-blend-screen scale-105 animate-pulse-subtle filter contrast-125"
        style={{
          backgroundImage: `url(${nebulaImg})`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Vignette & Contrast gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-transparent to-[#020617]/90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-radial from-transparent via-[#030712]/50 to-[#020617]/95"
        aria-hidden="true"
      />

      {/* Real-time interactive Star & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
};
