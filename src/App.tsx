import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import {
  CelestialMedallion,
  SilverButterflyStarDivider,
  FloatingCelestialButterflies,
  MarkedEightPointStar,
  MarkedButterfly,
  MarkedFourPointStar,
} from './components/CelestialDecorations';
import { TopPhotoBanner } from './components/TopPhotoBanner';
import { PhotoCarousel } from './components/PhotoCarousel';
import { CountdownTimer } from './components/CountdownTimer';
import { LocationCard } from './components/LocationCard';
import { DressCodeCard } from './components/DressCodeCard';
import { GiftAliasCard } from './components/GiftAliasCard';
import { SharedAlbumCard } from './components/SharedAlbumCard';
import { RsvpSection } from './components/RsvpSection';
import { GuestMessagesWall } from './components/GuestMessagesWall';
import { MusicPlayer } from './components/MusicPlayer';
import { ClickSparkles } from './components/ClickSparkles';
import { Toast } from './components/Toast';
import { DigitalPassModal } from './components/DigitalPassModal';
import { Sparkles, Heart, Share2, Ticket, MapPin, Calendar, Clock } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Zoe 💙';
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Zoe 💙',
          text: '¡Te invito a celebrar mis 15 años! Sábado 14 de Noviembre - 21:00 hs en Salón Lo Soñado.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('¡Enlace de la invitación copiado!');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100 font-body selection:bg-cyan-500/30 selection:text-white">
      {/* Interactive Click/Tap Celestial Sparkles */}
      <ClickSparkles />

      {/* Dynamic Cosmic Blue Nebula Animated Canvas */}
      <CosmicBackground />

      {/* Floating Marked Butterflies & Radiant Constellation Stars */}
      <FloatingCelestialButterflies />

      {/* Floating Ambient Celestial Music Player */}
      <MusicPlayer />

      {/* Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Digital VIP Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        onShowToast={showToast}
      />

      {/* FULL WIDTH TOP PHOTO SPACE - Cubre todo el ancho arriba de todo */}
      <TopPhotoBanner onShowToast={showToast} />

      {/* Main Invitation Layout */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-2 sm:pt-6 pb-24 text-center">

        {/* HERO SECTION */}
        <header className="relative flex flex-col items-center justify-center pt-2 pb-6">
          {/* Subtle Silver Sparkle Indicator with Marked Star */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cyan-200 font-cinzel font-bold mb-3">
            <MarkedEightPointStar size={16} />
            <span>Te Invito a Celebrar</span>
            <MarkedEightPointStar size={16} />
          </div>

          {/* Celestial Medallion with Marked Butterflies & 15 Monogram */}
          <div className="my-2">
            <CelestialMedallion className="w-44 h-44 sm:w-56 sm:h-56">
              <span className="font-display text-5xl sm:text-6xl text-white font-black tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                15
              </span>
              <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-cyan-200 font-bold mt-1">
                Años
              </span>
            </CelestialMedallion>
          </div>

          {/* Calligraphic Script Header */}
          <p className="font-script text-4xl sm:text-6xl text-silver-foil leading-tight mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Mis Quince Años
          </p>

          {/* Celebrant Name in Polished Silver Typography - Strictly ZOE */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-[0.12em] uppercase mt-2 mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            ZOE
          </h1>

          {/* Silver Butterfly & Star Divider */}
          <SilverButterflyStarDivider className="my-4" />

          {/* Emotional Quote - High Readability */}
          <div className="max-w-lg mx-auto px-4 mt-1 mb-6">
            <p className="font-serif-luxury italic text-base sm:text-xl text-slate-100 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-normal">
              "Hay momentos en la vida que soñamos desde siempre, pero compartirlos con las
              personas que más queremos los convierte en recuerdos inolvidables."
            </p>
            <p className="text-xs sm:text-sm text-cyan-200 font-cinzel tracking-widest mt-2 uppercase font-bold">
              ¡Quiero que seas parte de esta noche mágica!
            </p>
          </div>

          {/* Key Date & Place Quick Summary Pills - High Contrast (Sábado 14) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-2 text-xs sm:text-sm font-cinzel text-white">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 border border-slate-300/35 backdrop-blur-md shadow-md">
              <Calendar className="w-4 h-4 text-cyan-300" />
              <strong className="font-semibold">Sábado 14 Noviembre</strong>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 border border-slate-300/35 backdrop-blur-md shadow-md">
              <Clock className="w-4 h-4 text-cyan-300" />
              <strong className="font-semibold">21:00 hs</strong>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 border border-slate-300/35 backdrop-blur-md shadow-md">
              <MapPin className="w-4 h-4 text-cyan-300" />
              <strong className="font-semibold">Salón Lo Soñado</strong>
            </span>
          </div>
        </header>

        {/* COUNTDOWN TIMER */}
        <section aria-label="Cuenta regresiva del evento">
          <CountdownTimer />
        </section>

        {/* CARRUSEL DE FOTOS AUTOMÁTICO */}
        <section aria-label="Carrusel de fotos de Zoe">
          <PhotoCarousel />
        </section>

        {/* LOCATION & VENUE SECTION */}
        <section aria-label="Ubicación y horario del evento">
          <LocationCard onShowToast={showToast} />
        </section>

        {/* DRESS CODE SECTION (Simplified) */}
        <section aria-label="Código de vestimenta">
          <DressCodeCard />
        </section>

        {/* GIFT & MERCADO PAGO ALIAS SECTION */}
        <section aria-label="Información de regalos y alias de transferencia">
          <GiftAliasCard onShowToast={showToast} />
        </section>

        {/* SHARED PARTY PHOTOS & VIDEOS ALBUM SECTION */}
        <section aria-label="Subir fotos y videos de la fiesta">
          <SharedAlbumCard />
        </section>

        {/* RSVP CONFIRMATION FORM */}
        <section aria-label="Confirmación de asistencia">
          <RsvpSection onShowToast={showToast} />
        </section>

        {/* GUESTBOOK MESSAGES WALL FOR ZOE */}
        <section aria-label="Mensajes y dedicatorias para Zoe">
          <GuestMessagesWall onShowToast={showToast} />
        </section>

        {/* FOOTER */}
        <footer className="mt-14 pt-8 border-t border-slate-300/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MarkedButterfly size={24} glow />
            <MarkedEightPointStar size={16} />
            <MarkedButterfly size={24} glow className="scale-x-[-1]" />
          </div>
          <p className="font-script text-3xl sm:text-4xl text-silver-foil leading-none drop-shadow-md">
            ¡Te espero para festejar juntos!
          </p>
          <p className="font-cinzel text-xl sm:text-2xl text-white font-extrabold tracking-widest uppercase mt-1">
            ZOE · 15 AÑOS
          </p>
          <p className="text-[11px] text-cyan-200 uppercase tracking-widest font-cinzel mt-2 font-semibold">
            Sábado 14 de Noviembre · Salón Lo Soñado · Villa Mitre
          </p>
        </footer>
      </main>
    </div>
  );
}
