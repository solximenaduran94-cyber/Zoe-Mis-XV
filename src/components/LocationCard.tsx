import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Copy, Check, ExternalLink, CalendarPlus } from 'lucide-react';
import { ButterflyStarCorner, MarkedEightPointStar, MarkedButterfly } from './CelestialDecorations';

interface LocationCardProps {
  onShowToast: (message: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const address = 'Calle 29 entre 159 y 160, Villa Mitre';
  const venue = 'Salón Lo Soñado';
  const coordinates = '-34.76822, -58.18591';
  const fullLocationString = `${venue}, ${address} (${coordinates})`;
  const mapsUrl =
    "https://www.google.com/maps/place/34%C2%B046'05.6%22S+58%C2%B011'09.3%22W/@-34.76822,-58.18591,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-34.76822!4d-58.18591!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${fullLocationString} - ${mapsUrl}`);
    setCopied(true);
    onShowToast('¡Dirección y ubicación copiadas al portapapeles!');
    setTimeout(() => setCopied(false), 2500);
  };

  // 14 November 21:00 to 15 November 05:00
  const getEventYear = () => {
    const now = new Date();
    let year = now.getFullYear();
    const eventDate = new Date(year, 10, 14, 21, 0);
    if (now.getTime() > eventDate.getTime()) {
      year += 1;
    }
    return year;
  };

  const eventYear = getEventYear();
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Mis 15 Años - Zoe'
  )}&dates=${eventYear}1114T210000/${eventYear}1115T050000&details=${encodeURIComponent(
    `Celebración de los 15 años de Zoe. ¡Te espero para festejar una noche mágica e inolvidable!\nUbicación en Google Maps: ${mapsUrl}`
  )}&location=${encodeURIComponent(coordinates)}`;

  const handleDownloadIcs = () => {
    const year = getEventYear();

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Zoe//15 Anos//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${year}1114T210000`,
      `DTEND:${year}1115T050000`,
      `SUMMARY:Mis 15 Años - Zoe`,
      `DESCRIPTION:Celebración de los 15 años de Zoe en Salón Lo Soñado. Mapa: ${mapsUrl}`,
      `LOCATION:${fullLocationString}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `15-anos-zoe.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('¡Evento descargado para tu calendario!');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4">
      {/* High-contrast Card with transparent marked butterfly corners */}
      <div className="relative p-6 sm:p-9 rounded-3xl silver-card overflow-hidden">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900/90 border border-slate-300/40 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] mb-3">
            <MapPin className="w-7 h-7 text-cyan-300" />
          </div>
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
            ¿Cuándo y Dónde?
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Fecha y Lugar
          </h3>
          <div className="silver-divider max-w-xs mx-auto my-3" />
        </div>

        {/* Date & Time Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {/* Day block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-300/25">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-slate-300 block">
                Día del Evento
              </span>
              <span className="text-base sm:text-lg font-bold text-white font-cinzel block">
                14 de Noviembre
              </span>
              <span className="text-xs text-cyan-300 font-semibold font-body block">
                Sábado
              </span>
            </div>
          </div>

          {/* Time block */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-300/25">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-slate-300 block">
                Horario de Inicio
              </span>
              <span className="text-base sm:text-lg font-bold text-white font-cinzel block">
                21:00 hs
              </span>
              <span className="text-xs text-cyan-300 font-medium font-body block">
                Puntual
              </span>
            </div>
          </div>
        </div>

        {/* Venue Information - High Contrast & Crystal Clear Readability */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-300/35 text-center mb-6 shadow-inner">
          <div className="inline-flex items-center gap-2 text-cyan-300 mb-2">
            <MarkedEightPointStar size={16} />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-semibold text-cyan-200">
              Salón de Fiestas
            </span>
            <MarkedEightPointStar size={16} />
          </div>

          <h4 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {venue}
          </h4>

          <p className="font-body text-base sm:text-lg text-slate-100 font-medium mt-2 leading-relaxed">
            Calle 29 entre 159 y 160
          </p>
          <p className="font-cinzel text-sm text-cyan-200 font-semibold tracking-wider uppercase mt-0.5">
            Villa Mitre
          </p>

          {/* Embedded Google Maps Preview for exact coordinates */}
          <div className="mt-4 rounded-xl overflow-hidden border border-slate-300/30 shadow-lg bg-slate-900">
            <iframe
              title="Ubicación en Google Maps - Salón Lo Soñado"
              src="https://maps.google.com/maps?q=-34.76822,-58.18591&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-48 sm:h-56 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Copy Address Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="mt-4 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-300/30 text-white text-xs font-cinzel tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-cyan-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">¡Dirección Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-300" />
                <span>Copiar Dirección</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons: Google Maps & Add to Calendar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.35)] cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Cómo Llegar (Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-300/35 text-white font-cinzel text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:border-cyan-300"
          >
            <CalendarPlus className="w-4 h-4 text-cyan-300" />
            <span>Agendar en Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};
