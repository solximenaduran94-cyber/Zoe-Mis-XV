import React, { useState, useEffect } from 'react';
import { MarkedEightPointStar, MarkedFourPointStar } from './CelestialDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let targetYear = now.getFullYear();

      // Target: 14 November at 21:00:00
      let targetDate = new Date(targetYear, 10, 14, 21, 0, 0);

      // If Nov 14 21:00 has already passed this year, target next year
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(targetYear + 1, 10, 14, 21, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4">
      <div className="relative p-6 sm:p-8 rounded-3xl silver-card overflow-hidden">
        {/* Luminous accents */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <MarkedEightPointStar size={14} />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-cyan-200 uppercase font-bold">
              Cuenta Regresiva
            </p>
            <MarkedEightPointStar size={14} />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-300/35 shadow-inner group hover:border-cyan-300/50 transition-colors"
              >
                <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white tabular-nums leading-none tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan-200 font-cinzel">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-100 font-body italic font-medium">
            {timeLeft.isPast
              ? '¡El gran día ha llegado! ¡A celebrar!'
              : 'Falta muy poco para compartir esta noche mágica'}
          </p>
        </div>
      </div>
    </div>
  );
};
