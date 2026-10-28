import React from 'react';
import { X, Share2, Printer, Ticket } from 'lucide-react';
import { MarkedEightPointStar, MarkedButterfly, MarkedFourPointStar } from './CelestialDecorations';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Mis 15 Años · Zoe',
          text: '¡Estás invitado a mis 15 años! Sábado 14 de Noviembre - 21:00 hs en Salón Lo Soñado.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('¡Enlace de la invitación copiado!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-slate-300/40 text-center shadow-[0_0_50px_rgba(0,0,0,0.95)]">
        <button
          onClick={onClose}
          aria-label="Cerrar tarjeta digital"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-300/30 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ornate Pass Header */}
        <div className="inline-flex items-center gap-2 text-cyan-300 mb-2">
          <MarkedEightPointStar size={14} />
          <span className="text-[11px] font-cinzel uppercase tracking-[0.35em] font-bold">
            Pase de Invitación VIP
          </span>
          <MarkedEightPointStar size={14} />
        </div>

        {/* Central Monogram with Marked Butterflies and Stars */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-slate-900 border border-slate-300/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.25)] relative">
            <span className="font-display text-4xl text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              15
            </span>
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-cyan-200 font-semibold">
              Años
            </span>

            {/* Perched Butterflies */}
            <div className="absolute -top-3 -left-3 -rotate-25">
              <MarkedButterfly size={28} glow />
            </div>
            <div className="absolute -top-3 -right-3 rotate-25 scale-x-[-1]">
              <MarkedButterfly size={28} glow />
            </div>
          </div>
        </div>

        <p className="font-script text-3xl sm:text-4xl text-silver-foil leading-none drop-shadow-md">
          Mis Quince Años
        </p>

        {/* Strictly Zoe */}
        <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white tracking-[0.1em] mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          ZOE
        </h2>

        <div className="silver-divider my-4 max-w-xs mx-auto" />

        <div className="space-y-2 text-xs font-body text-slate-100">
          <p className="font-cinzel text-sm text-cyan-200 font-bold">
            Sábado 14 de Noviembre · 21:00 hs
          </p>
          <p className="text-slate-200 font-medium">
            Salón Lo Soñado · Calle 29 e/ 159 & 160 (Villa Mitre)
          </p>
          <p className="text-cyan-300 font-cinzel text-[11px] font-semibold tracking-wider uppercase">
            Vestimenta: Elegante Sport
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-300/20">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-300/35 text-slate-100 hover:text-white hover:bg-slate-800 font-cinzel text-xs font-semibold tracking-wider cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-300" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
