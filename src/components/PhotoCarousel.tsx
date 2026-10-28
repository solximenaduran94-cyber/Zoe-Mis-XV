import React, { useState, useEffect } from 'react';

import photo01 from '../assets/images/zoe_photo_01.jpg';
import photo02 from '../assets/images/zoe_photo_02.jpg';
import photo04 from '../assets/images/zoe_photo_04.jpg';
import photo06 from '../assets/images/zoe_photo_06.jpg';
import photo07 from '../assets/images/zoe_photo_07.jpg';
import photo08 from '../assets/images/zoe_photo_08.jpg';
import photo09 from '../assets/images/zoe_photo_09.jpg';
import photo10 from '../assets/images/zoe_photo_10.jpeg';

const CAROUSEL_PHOTOS: string[] = [
  photo01,
  photo02,
  photo04,
  photo06,
  photo07,
  photo08,
  photo09,
  photo10,
];

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const safeCurrentIndex = currentIndex % CAROUSEL_PHOTOS.length;
  const prevIndex = (safeCurrentIndex - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length;

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto my-10 aspect-square rounded-3xl overflow-hidden select-none border border-slate-300/35 shadow-[0_0_40px_rgba(0,0,0,0.85)] bg-slate-950 group">
      {/* Square Auto-Sliding Viewport - Images Only, Zero Text */}
      <div className="relative w-full h-full aspect-square overflow-hidden bg-slate-950">
        {CAROUSEL_PHOTOS.map((url, index) => {
          const isCurrent = index === safeCurrentIndex;
          const isPrev = index === prevIndex;

          let slidePositionClass = 'translate-x-full opacity-0 z-0 pointer-events-none';
          if (isCurrent) {
            slidePositionClass =
              'translate-x-0 opacity-100 z-20 transition-transform duration-1000 ease-in-out';
          } else if (isPrev) {
            slidePositionClass =
              '-translate-x-full opacity-100 z-10 transition-transform duration-1000 ease-in-out';
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-slate-950 ${slidePositionClass}`}
            >
              {/* Soft ambient backdrop so vertical and horizontal photos fill the square cleanly */}
              <img
                src={url}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-center blur-xl opacity-45 scale-110 pointer-events-none"
              />
              {/* Main crisp photo fully visible inside the square */}
              <img
                src={url}
                alt=""
                draggable={false}
                className="relative z-10 w-full h-full object-contain object-center pointer-events-none"
              />
            </div>
          );
        })}
      </div>

      {/* Subtle Minimalist Dot Indicators (No Text) */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 px-4 flex-wrap">
        {CAROUSEL_PHOTOS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Foto ${idx + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              idx === safeCurrentIndex
                ? 'w-7 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.9)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
