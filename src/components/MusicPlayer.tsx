import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import photographSong from '../assets/photograph.mp3';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(photographSong);
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try autoplay immediately, or start on first click/touch if browser blocks initial autoplay
    const startOnFirstInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      if (audio.paused) {
        audio.play().catch(() => {
          // Ignore if still blocked
        });
      }
      window.removeEventListener('click', startOnFirstInteraction);
      window.removeEventListener('touchstart', startOnFirstInteraction);
    };

    audio.play().then(() => {
      hasInteractedRef.current = true;
    }).catch(() => {
      window.addEventListener('click', startOnFirstInteraction, { once: true });
      window.addEventListener('touchstart', startOnFirstInteraction, { once: true });
    });

    return () => {
      window.removeEventListener('click', startOnFirstInteraction);
      window.removeEventListener('touchstart', startOnFirstInteraction);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-300/35 text-slate-200 hover:text-white hover:border-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 group cursor-pointer"
      title={isPlaying ? 'Pausar Photograph - Ed Sheeran' : 'Escuchar Photograph - Ed Sheeran'}
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <span className="absolute -inset-1 rounded-full bg-cyan-400/20 animate-ping" />
            <Volume2 className="w-4 h-4 text-cyan-300 relative z-10" />
          </>
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200 relative z-10" />
        )}
      </div>
      <span className="text-xs font-cinzel tracking-wider text-slate-200 group-hover:text-white whitespace-nowrap">
        {isPlaying ? 'Música activa' : 'Música'}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
          <span className="w-0.5 h-2.5 bg-cyan-300 rounded-full animate-bounce" />
          <span className="w-0.5 h-3.5 bg-cyan-200 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-0.5 h-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:300ms]" />
        </span>
      )}
    </button>
  );
};
