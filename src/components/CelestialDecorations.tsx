import React from 'react';

/**
 * Detailed Marked Butterfly with crisp wings, veins, antenna and silver gradient
 */
export const MarkedButterfly: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 32, glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'filter drop-shadow-[0_0_10px_rgba(200,230,255,0.75)]' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silverWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>

        <linearGradient id="wingHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="wingGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body & Antenna */}
      <path
        d="M50 30 C49 42 49 58 50 72 C51 58 51 42 50 30 Z"
        fill="url(#silverWingGrad)"
        stroke="#ffffff"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="27" r="3.2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      {/* Left antenna */}
      <path
        d="M49 25 C45 16 38 12 34 14"
        stroke="#e2e8f0"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="14" r="1.5" fill="#38bdf8" />
      {/* Right antenna */}
      <path
        d="M51 25 C55 16 62 12 66 14"
        stroke="#e2e8f0"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="66" cy="14" r="1.5" fill="#38bdf8" />

      {/* Top Left Forewing */}
      <path
        d="M48 35 C38 20 18 18 8 28 C-1 38 4 58 24 58 C38 58 46 48 48 35 Z"
        fill="url(#wingGlow)"
      />
      <path
        d="M48 35 C38 20 18 18 8 28 C-1 38 4 58 24 58 C38 58 46 48 48 35 Z"
        fill="url(#silverWingGrad)"
        fillOpacity="0.28"
        stroke="url(#silverWingGrad)"
        strokeWidth="1.6"
      />
      {/* Inner Forewing Marked Veins (Left) */}
      <path
        d="M48 35 C36 34 22 36 12 30"
        stroke="#e2e8f0"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M48 37 C34 40 22 45 14 42"
        stroke="#cbd5e1"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M48 40 C36 46 28 52 22 54"
        stroke="#94a3b8"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="16" cy="32" r="1.8" fill="#ffffff" />
      <circle cx="12" cy="40" r="1.4" fill="#38bdf8" />

      {/* Top Right Forewing */}
      <path
        d="M52 35 C62 20 82 18 92 28 C101 38 96 58 76 58 C62 58 54 48 52 35 Z"
        fill="url(#wingGlow)"
      />
      <path
        d="M52 35 C62 20 82 18 92 28 C101 38 96 58 76 58 C62 58 54 48 52 35 Z"
        fill="url(#silverWingGrad)"
        fillOpacity="0.28"
        stroke="url(#silverWingGrad)"
        strokeWidth="1.6"
      />
      {/* Inner Forewing Marked Veins (Right) */}
      <path
        d="M52 35 C64 34 78 36 88 30"
        stroke="#e2e8f0"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M52 37 C66 40 78 45 86 42"
        stroke="#cbd5e1"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M52 40 C64 46 72 52 78 54"
        stroke="#94a3b8"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="84" cy="32" r="1.8" fill="#ffffff" />
      <circle cx="88" cy="40" r="1.4" fill="#38bdf8" />

      {/* Bottom Left Hindwing */}
      <path
        d="M48 52 C36 55 18 64 22 78 C25 89 42 86 47 70 C48 64 48 56 48 52 Z"
        fill="url(#wingHighlight)"
        fillOpacity="0.22"
        stroke="url(#silverWingGrad)"
        strokeWidth="1.4"
      />
      <path
        d="M48 58 C38 64 28 72 26 77"
        stroke="#cbd5e1"
        strokeWidth="0.9"
      />
      <circle cx="28" cy="74" r="1.5" fill="#ffffff" />

      {/* Bottom Right Hindwing */}
      <path
        d="M52 52 C64 55 82 64 78 78 C75 89 58 86 53 70 C52 64 52 56 52 52 Z"
        fill="url(#wingHighlight)"
        fillOpacity="0.22"
        stroke="url(#silverWingGrad)"
        strokeWidth="1.4"
      />
      <path
        d="M52 58 C62 64 72 72 74 77"
        stroke="#cbd5e1"
        strokeWidth="0.9"
      />
      <circle cx="72" cy="74" r="1.5" fill="#ffffff" />
    </svg>
  );
};

/**
 * Marked 8-pointed star with sharp rays and bright core
 */
export const MarkedEightPointStar: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      {/* 4 Primary Large Rays */}
      <polygon
        points="50,2 57,38 98,50 57,62 50,98 43,62 2,50 43,38"
        fill="url(#starGrad)"
        stroke="#ffffff"
        strokeWidth="1"
      />
      {/* 4 Diagonal Rays */}
      <polygon
        points="50,20 54,42 76,28 58,46 80,50 58,54 76,72 54,58 50,80 46,58 24,72 42,54 20,50 42,46 24,28 46,42"
        fill="#ffffff"
        opacity="0.9"
      />
      {/* Center brilliant core */}
      <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
      <circle cx="50" cy="50" r="8" fill="#38bdf8" opacity="0.3" />
    </svg>
  );
};

/**
 * Marked 4-pointed diamond star
 */
export const MarkedFourPointStar: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] ${className}`}
      aria-hidden="true"
    >
      <polygon
        points="50,5 57,43 95,50 57,57 50,95 43,57 5,50 43,43"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="5" fill="#38bdf8" opacity="0.6" />
      <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
    </svg>
  );
};

/**
 * Replaces the flower wreath with an exquisite Celestial Medallion framed by
 * marked silver butterflies, radiant 8-pointed stars and concentric silver filigree rings.
 */
export const CelestialMedallion: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Pulsing cosmic aura */}
      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute inset-3 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />

      {/* Main circular frame */}
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center">
        {/* Outer Filigree Ring SVG with Compass Stars */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer dashed halo ring */}
          <circle
            cx="120"
            cy="120"
            r="112"
            stroke="rgba(226, 232, 240, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Solid precision silver ring */}
          <circle
            cx="120"
            cy="120"
            r="104"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="1.5"
          />

          {/* Inner accent ring */}
          <circle
            cx="120"
            cy="120"
            r="92"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="1"
          />

          {/* Inner dotted stardust track */}
          <circle
            cx="120"
            cy="120"
            r="82"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
        </svg>

        {/* Marked Stars at compass positions */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <MarkedEightPointStar size={24} />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <MarkedEightPointStar size={24} />
        </div>
        <div className="absolute top-1/2 -left-3 -translate-y-1/2">
          <MarkedFourPointStar size={18} />
        </div>
        <div className="absolute top-1/2 -right-3 -translate-y-1/2">
          <MarkedFourPointStar size={18} />
        </div>

        {/* Flanking Marked Butterflies perched on outer ring */}
        <div className="absolute top-4 -left-4 sm:top-6 sm:-left-6 -rotate-25 transition-transform hover:scale-110">
          <MarkedButterfly size={42} glow />
        </div>
        <div className="absolute top-4 -right-4 sm:top-6 sm:-right-6 rotate-25 scale-x-[-1] transition-transform hover:scale-110">
          <MarkedButterfly size={42} glow />
        </div>
        <div className="absolute -bottom-2 -left-2 rotate-12 scale-75">
          <MarkedButterfly size={32} glow />
        </div>
        <div className="absolute -bottom-2 -right-2 -rotate-12 scale-x-[-1] scale-75">
          <MarkedButterfly size={32} glow />
        </div>

        {/* Central dark luminous chamber for 100% text readability */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-slate-950/90 border border-slate-300/40 shadow-[0_0_30px_rgba(2,6,23,0.95)] flex flex-col items-center justify-center text-center p-3 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Replaces the murky floral corners with crisp, transparent marked Butterfly & Star corner filigrees.
 * No image artifacts, 100% transparent vector SVG!
 */
export const ButterflyStarCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transformClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 scale-x-[-1]',
    'bottom-left': 'bottom-2 left-2 scale-y-[-1]',
    'bottom-right': 'bottom-2 right-2 scale-[-1]',
  };

  return (
    <div
      className={`absolute pointer-events-none z-10 ${transformClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Corner framing lines */}
        <path
          d="M6 35 L6 14 C6 9.5 9.5 6 14 6 L35 6"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 28 L10 14 C10 11.8 11.8 10 14 10 L28 10"
          stroke="rgba(56, 189, 248, 0.5)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Corner 8-pointed star */}
        <g transform="translate(4, 4) scale(0.24)">
          <polygon
            points="50,2 57,38 98,50 57,62 50,98 43,62 2,50 43,38"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1"
          />
        </g>

        {/* Marked small diamond star along top border */}
        <g transform="translate(42, 3) scale(0.12)">
          <polygon points="50,5 57,43 95,50 57,57 50,95 43,57 5,50 43,43" fill="#ffffff" />
        </g>
        {/* Marked small diamond star along left border */}
        <g transform="translate(3, 42) scale(0.12)">
          <polygon points="50,5 57,43 95,50 57,57 50,95 43,57 5,50 43,43" fill="#ffffff" />
        </g>

        {/* Constellation arc */}
        <path
          d="M18 45 C28 32 38 28 55 24"
          stroke="rgba(226, 232, 240, 0.4)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* Perched Marked Butterfly */}
        <g transform="translate(24, 20) scale(0.48) rotate(-15)">
          {/* Wings */}
          <path
            d="M50 35 C38 20 18 18 8 28 C-1 38 4 58 24 58 C38 58 46 48 48 35 Z"
            fill="rgba(255, 255, 255, 0.25)"
            stroke="#ffffff"
            strokeWidth="1.8"
          />
          <path
            d="M52 35 C62 20 82 18 92 28 C101 38 96 58 76 58 C62 58 54 48 52 35 Z"
            fill="rgba(56, 189, 248, 0.25)"
            stroke="#ffffff"
            strokeWidth="1.8"
          />
          <path
            d="M48 52 C36 55 18 64 22 78 C25 89 42 86 47 70 C48 64 48 56 48 52 Z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="#cbd5e1"
            strokeWidth="1.4"
          />
          <path
            d="M52 52 C64 55 82 64 78 78 C75 89 58 86 53 70 C52 64 52 56 52 52 Z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="#cbd5e1"
            strokeWidth="1.4"
          />
          {/* Body */}
          <path d="M50 30 C49 42 49 58 50 72 C51 58 51 42 50 30 Z" fill="#ffffff" />
          <circle cx="50" cy="27" r="3.2" fill="#ffffff" />
          <path d="M49 25 C45 16 38 12 34 14" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M51 25 C55 16 62 12 66 14" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Replaces botanical divider with an ornate silver butterfly & stars divider
 */
export const SilverButterflyStarDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-14 sm:w-28 bg-gradient-to-r from-transparent via-slate-300/50 to-slate-100" />
      <MarkedFourPointStar size={14} className="text-cyan-200" />
      <MarkedEightPointStar size={18} />
      
      {/* Central Marked Silver Butterfly */}
      <div className="relative px-1 -my-2 transform hover:scale-110 transition-transform">
        <MarkedButterfly size={34} glow />
      </div>

      <MarkedEightPointStar size={18} />
      <MarkedFourPointStar size={14} className="text-cyan-200" />
      <div className="h-px w-14 sm:w-28 bg-gradient-to-l from-transparent via-slate-300/50 to-slate-100" />
    </div>
  );
};

/**
 * Ambient floating butterflies that gently flutter across the page
 */
export const FloatingCelestialButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
      {/* Butterfly 1 - Top Left */}
      <div className="absolute top-[12%] left-[4%] sm:left-[8%] opacity-75 animate-float-slow">
        <MarkedButterfly size={38} glow />
      </div>

      {/* Butterfly 2 - Mid Right */}
      <div className="absolute top-[38%] right-[5%] sm:right-[10%] opacity-80 scale-x-[-1] animate-float-medium">
        <MarkedButterfly size={44} glow />
      </div>

      {/* Butterfly 3 - Mid Left */}
      <div className="absolute top-[62%] left-[3%] sm:left-[7%] opacity-70 animate-float-reverse">
        <MarkedButterfly size={34} glow />
      </div>

      {/* Butterfly 4 - Bottom Right */}
      <div className="absolute top-[85%] right-[6%] sm:right-[12%] opacity-75 scale-x-[-1] animate-float-slow">
        <MarkedButterfly size={40} glow />
      </div>

      {/* Marked ambient bright stars */}
      <div className="absolute top-[22%] right-[18%] opacity-90 animate-pulse">
        <MarkedEightPointStar size={22} />
      </div>
      <div className="absolute top-[48%] left-[12%] opacity-90 animate-pulse" style={{ animationDelay: '1.2s' }}>
        <MarkedEightPointStar size={20} />
      </div>
      <div className="absolute top-[75%] right-[22%] opacity-85 animate-pulse" style={{ animationDelay: '2.4s' }}>
        <MarkedFourPointStar size={18} />
      </div>
      <div className="absolute top-[92%] left-[18%] opacity-85 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <MarkedEightPointStar size={24} />
      </div>
    </div>
  );
};
