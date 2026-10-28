import React, { useState } from 'react';
import {
  MarkedEightPointStar,
  MarkedButterfly,
  MarkedFourPointStar,
} from './CelestialDecorations';
import defaultHeroPortrait from '../assets/images/zoe_custom_hero.jpg';

interface TopPhotoBannerProps {
  onShowToast?: (msg: string) => void;
}

interface PhotoFraming {
  posX: number;
  posY: number;
  scale: number;
}

const DEFAULT_FRAMING: PhotoFraming = {
  posX: 50,
  posY: 25,
  scale: 1,
};

export const TopPhotoBanner: React.FC<TopPhotoBannerProps> = () => {
  const [photoUrl] = useState<string>(defaultHeroPortrait);

  const [framing] = useState<PhotoFraming>(() => {
    try {
      const saved = localStorage.getItem('zoe_top_photo_framing');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_FRAMING;
  });

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Full-width Hero Image Container */}
      <div className="relative w-full h-[58vh] min-h-[400px] sm:h-[70vh] sm:min-h-[500px] md:h-[80vh] md:min-h-[600px] max-h-[880px] bg-slate-950 overflow-hidden">
        {/* Full-Width Image with optimal focal point */}
        <img
          src={photoUrl}
          alt="Foto principal de Zoe - Mis 15 Años"
          draggable={false}
          style={{
            objectPosition: `${framing.posX}% ${framing.posY}%`,
            transform: `scale(${framing.scale})`,
            transformOrigin: `${framing.posX}% ${framing.posY}%`,
          }}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Top subtle vignette gradient */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030712]/80 via-[#030712]/30 to-transparent pointer-events-none" />

        {/* Bottom smooth fade into the cosmic starry background */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />

        {/* Radiant Stars accents */}
        <div className="absolute top-14 left-1/4 opacity-90 pointer-events-none animate-pulse">
          <MarkedEightPointStar size={20} />
        </div>
        <div
          className="absolute top-20 right-1/4 opacity-90 pointer-events-none animate-pulse"
          style={{ animationDelay: '1.5s' }}
        >
          <MarkedFourPointStar size={18} />
        </div>

        {/* Bottom Center Title Tag on Cover */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 border border-slate-300/30 backdrop-blur-md shadow-lg mb-2">
            <MarkedEightPointStar size={14} />
            <span className="font-cinzel text-xs uppercase tracking-[0.35em] text-cyan-200 font-bold">
              Mis Quince Años
            </span>
            <MarkedEightPointStar size={14} />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-[0.15em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            ZOE
          </h2>
        </div>
      </div>

      {/* Decorative Bottom Border Transition with Marked Butterfly and Stars */}
      <div className="relative -mt-4 mb-2 flex items-center justify-center gap-3 z-10 pointer-events-none">
        <div className="h-px w-20 sm:w-40 bg-gradient-to-r from-transparent via-slate-300/40 to-slate-100" />
        <MarkedEightPointStar size={18} />
        <div className="px-2">
          <MarkedButterfly size={32} glow />
        </div>
        <MarkedEightPointStar size={18} />
        <div className="h-px w-20 sm:w-40 bg-gradient-to-l from-transparent via-slate-300/40 to-slate-100" />
      </div>
    </div>
  );
};
