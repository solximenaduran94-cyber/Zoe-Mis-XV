import React from 'react';
import { Camera, UploadCloud, ExternalLink } from 'lucide-react';
import { ButterflyStarCorner, MarkedEightPointStar } from './CelestialDecorations';

const DRIVE_ALBUM_URL =
  'https://drive.google.com/drive/folders/1R8LUXI-L1mGSnQWz2jHYb-6SOftSRkxM?usp=sharing';

export const SharedAlbumCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto my-8 px-4">
      <div className="relative p-6 sm:p-8 rounded-3xl silver-card overflow-hidden text-center">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/90 border border-slate-300/40 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] mb-2">
          <Camera className="w-6 h-6 text-cyan-300" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
          <MarkedEightPointStar size={14} />
          <span>Recuerdos de la Noche</span>
          <MarkedEightPointStar size={14} />
        </div>

        <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Fotos y Videos de la Fiesta
        </h3>

        <div className="silver-divider max-w-xs mx-auto my-3" />

        <p className="text-sm sm:text-base text-slate-100 font-body font-medium max-w-md mx-auto leading-relaxed mb-6">
          ¡Capturá cada momento! Subí todas las fotos y videos que saques durante la fiesta a nuestro álbum compartido.
        </p>

        <a
          href={DRIVE_ALBUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-500 text-white font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.2em] border border-cyan-200/50 shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.75)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <UploadCloud className="w-5 h-5" />
          <span>Subir Fotos y Videos</span>
          <ExternalLink className="w-4 h-4 opacity-80" />
        </a>
      </div>
    </div>
  );
};
