import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Heart, Music2, Users, Utensils, MessageSquare } from 'lucide-react';
import { ButterflyStarCorner, MarkedEightPointStar, MarkedButterfly } from './CelestialDecorations';
import { saveGuestMessageToPage } from './GuestMessagesWall';

interface RsvpSectionProps {
  onShowToast: (message: string) => void;
}

interface SavedRsvp {
  name: string;
  attending: boolean;
  guests: number;
  diet: string;
  song: string;
  message: string;
  date: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState('1');
  const [diet, setDiet] = useState('Ninguna (Menú tradicional)');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [savedRsvp, setSavedRsvp] = useState<SavedRsvp | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zoe_15_rsvp');
      if (stored) {
        setSavedRsvp(JSON.parse(stored));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const WHATSAPP_PHONE = '5491159695451';
  const WHATSAPP_DISPLAY = '+54 9 11 5969-5451';

  const buildWhatsAppUrl = (data: SavedRsvp) => {
    const attendingText =
      data.attending ? '¡Sí, confirmo mi asistencia! 🎉' : 'Lamentablemente no podré asistir 🥺';
    let waText = `✨ *CONFIRMACIÓN DE ASISTENCIA - 15 AÑOS DE ZOE* ✨\n\n`;
    waText += `👤 *Nombre:* ${data.name}\n`;
    waText += `💌 *Asistencia:* ${attendingText}\n`;
    if (data.attending && data.song) {
      waText += `🎵 *Canción sugerida:* ${data.song}\n`;
    }
    if (data.message) {
      waText += `💬 *Dedicatoria para Zoe:* "${data.message}"\n`;
    }
    waText += `\n📅 *Evento:* Sábado 14 de Noviembre - 21:00 hs - Salón Lo Soñado (Villa Mitre)`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
  };

  const openWhatsAppLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor escribe tu nombre y apellido');
      return;
    }

    const rsvpData: SavedRsvp = {
      name: name.trim(),
      attending: attending === 'yes',
      guests: attending === 'yes' ? parseInt(guests, 10) || 1 : 0,
      diet,
      song: song.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('es-AR'),
    };

    if (rsvpData.message) {
      saveGuestMessageToPage(rsvpData.name, rsvpData.message, rsvpData.song).catch(() => {});
    }

    localStorage.setItem('zoe_15_rsvp', JSON.stringify(rsvpData));
    setSavedRsvp(rsvpData);
    onShowToast('¡Mensaje guardado en la página y redirigiendo a WhatsApp!');

    const waUrl = buildWhatsAppUrl(rsvpData);
    openWhatsAppLink(waUrl);
  };

  const handleReset = () => {
    localStorage.removeItem('zoe_15_rsvp');
    setSavedRsvp(null);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="rsvp">
      <div className="relative p-6 sm:p-9 rounded-3xl silver-card overflow-hidden">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="text-center mb-6">
          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
            Acompañame en mi Noche
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Confirmar Asistencia
          </h3>
          <div className="silver-divider max-w-xs mx-auto my-3" />
          <p className="text-sm text-slate-100 font-body font-medium">
            Por favor, confirmá antes del <strong>1 de Noviembre</strong> por WhatsApp al{' '}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                '¡Hola! Quiero confirmar mi asistencia a los 15 años de Zoe ✨'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 font-semibold underline decoration-cyan-400/50 hover:text-cyan-200"
            >
              {WHATSAPP_DISPLAY}
            </a>
            .
          </p>
        </div>

        {savedRsvp ? (
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-300/35 text-center animate-fadeIn shadow-xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-xl text-white font-bold mb-1">
              ¡Gracias, {savedRsvp.name}!
            </h4>
            <p className="text-sm text-slate-200 font-body mb-4">
              {savedRsvp.attending
                ? 'Confirmaste tu asistencia. ¡Nos vemos para celebrar los 15 de Zoe!'
                : 'Lamentamos que no puedas asistir. ¡Gracias por avisarnos!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={buildWhatsAppUrl(savedRsvp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Enviar a WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-300/30 text-slate-200 hover:text-white font-cinzel text-xs tracking-wider cursor-pointer"
              >
                <span>Modificar Respuesta</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-xs font-cinzel tracking-wider uppercase text-cyan-200 font-bold mb-1.5"
              >
                Nombre y Apellido *
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Camila González"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-300/35 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>

            {/* Attendance Radio Buttons */}
            <div>
              <span className="block text-xs font-cinzel tracking-wider uppercase text-cyan-200 font-bold mb-1.5">
                ¿Vas a asistir? *
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    attending === 'yes'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'bg-slate-950/90 text-slate-200 border-slate-300/30 hover:border-slate-200'
                  }`}
                >
                  ¡Sí, asisto! ✨
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    attending === 'no'
                      ? 'bg-slate-800 text-white border-slate-400 shadow-md'
                      : 'bg-slate-950/90 text-slate-200 border-slate-300/30 hover:border-slate-200'
                  }`}
                >
                  No puedo ir 🥺
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <>

                {/* Song recommendation */}
                <div>
                  <label
                    htmlFor="rsvp-song"
                    className="flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-cyan-200 font-bold mb-1.5"
                  >
                    <Music2 className="w-3.5 h-3.5" />
                    ¿Qué tema no puede faltar en la fiesta?
                  </label>
                  <input
                    id="rsvp-song"
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder="Ej: Bohemian Rhapsody / Shakira"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-300/35 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-cinzel text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar por WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
