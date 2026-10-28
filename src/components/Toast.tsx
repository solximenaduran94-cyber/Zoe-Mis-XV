import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 text-slate-100 border border-cyan-400/40 shadow-2xl backdrop-blur-md animate-bounce-subtle pointer-events-none">
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-xs font-cinzel tracking-wider text-slate-100 whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};
