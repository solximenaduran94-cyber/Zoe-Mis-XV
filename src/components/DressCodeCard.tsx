import React from 'react';
import { Sparkles, Shirt } from 'lucide-react';
import { ButterflyStarCorner, MarkedEightPointStar } from './CelestialDecorations';

export const DressCodeCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto my-8 px-4">
      <div className="relative p-6 sm:p-7 rounded-3xl silver-card overflow-hidden text-center">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/90 border border-slate-300/40 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] mb-2">
          <Shirt className="w-6 h-6 text-cyan-300" />
        </div>

        <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
          Código de Vestimenta
        </span>

        <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Elegante Sport
        </h3>

        <div className="silver-divider max-w-xs mx-auto my-3" />

        <p className="text-sm sm:text-base text-slate-100 font-body font-medium max-w-md mx-auto leading-relaxed">
          Vení preparado para disfrutar, bailar y compartir una noche mágica.
        </p>

        {/* Carnaval Carioca - Camisetas de Fútbol Notice */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-950/85 border border-cyan-400/40 shadow-[0_0_20px_rgba(56,189,248,0.15)] max-w-md mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-cyan-300 mb-1.5">
            <MarkedEightPointStar size={14} />
            <span className="text-xs font-cinzel uppercase tracking-[0.25em] font-bold text-cyan-200">
              Carnaval Carioca
            </span>
            <MarkedEightPointStar size={14} />
          </div>
          <p className="text-sm sm:text-base text-white font-body font-semibold leading-relaxed">
            ¡No te olvides de traer tu <span className="text-cyan-300 font-bold">camiseta de fútbol</span> para el Carnaval Carioca! ⚽👕
          </p>
        </div>
      </div>
    </div>
  );
};
