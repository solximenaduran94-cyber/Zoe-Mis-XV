import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, CreditCard } from 'lucide-react';
import { ButterflyStarCorner, MarkedEightPointStar, MarkedButterfly } from './CelestialDecorations';

interface GiftAliasCardProps {
  onShowToast: (message: string) => void;
}

export const GiftAliasCard: React.FC<GiftAliasCardProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const alias = 'zoe.michell.mp';

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(alias);
    setCopied(true);
    onShowToast(`¡Alias "${alias}" copiado con éxito!`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4">
      <div className="relative p-6 sm:p-9 rounded-3xl silver-card overflow-hidden">
        <ButterflyStarCorner position="top-right" />
        <ButterflyStarCorner position="bottom-left" />

        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900/90 border border-slate-300/40 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] mb-3">
            <Gift className="w-7 h-7 text-cyan-300" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
            Presentes & Buenos Deseos
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Mesa de Regalos
          </h3>
          <div className="silver-divider max-w-xs mx-auto my-3" />
        </div>

        <p className="text-center text-slate-100 text-sm sm:text-base font-body max-w-md mx-auto leading-relaxed font-medium">
          El mejor regalo que puedo recibir es tu presencia y tu cariño en esta noche tan soñada.
          Si deseas hacerme un presente para ayudarme a cumplir mis sueños, podés hacerlo a través de transferencia:
        </p>

        {/* Mercado Pago Alias Showcase Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-300/35 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300 font-body block">
                  Mercado Pago / Transferencia
                </span>
                <p className="font-mono text-lg sm:text-xl font-extrabold text-white tracking-wide select-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {alias}
                </p>
                <p className="text-xs text-slate-300 font-body font-medium mt-0.5">
                  Titular: <span className="text-white font-semibold">Zoe</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyAlias}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-cinzel text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Alias</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-300/35 text-cyan-200 hover:text-white transition-colors cursor-pointer"
                title="Mostrar u ocultar código QR"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collapsible QR Code view */}
          {showQr && (
            <div className="mt-4 pt-4 border-t border-slate-300/20 flex flex-col items-center justify-center animate-fadeIn">
              <p className="text-xs text-cyan-200 font-cinzel tracking-wider uppercase mb-3 font-semibold">
                Escaneá desde tu app bancaria o Mercado Pago
              </p>
              <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 inline-block">
                {/* Generated QR code URL using public qr generator API */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    `https://link.mercadopago.com.ar/${alias}`
                  )}`}
                  alt={`Código QR Alias ${alias}`}
                  className="w-40 h-40 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-slate-300 mt-2 font-mono">
                Alias: <strong className="text-white">{alias}</strong>
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-300 font-body mt-4 flex items-center justify-center gap-1.5">
          <MarkedEightPointStar size={12} />
          <span>¡Muchas gracias por acompañarme con tanto amor!</span>
          <MarkedEightPointStar size={12} />
        </p>
      </div>
    </div>
  );
};
