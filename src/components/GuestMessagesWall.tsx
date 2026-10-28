import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { MessageSquareHeart, Send, Sparkles, Music2, User } from 'lucide-react';
import {
  ButterflyStarCorner,
  MarkedEightPointStar,
  MarkedButterfly,
} from './CelestialDecorations';

export interface GuestMessageDoc {
  id: string;
  authorName: string;
  message: string;
  song?: string;
  createdAt?: Timestamp | null;
}

export async function saveGuestMessageToPage(
  rawAuthorName: string,
  rawMessage: string,
  rawSong?: string
): Promise<void> {
  const authorName = rawAuthorName.trim().slice(0, 80);
  const message = rawMessage.trim().slice(0, 500);
  const song = rawSong ? rawSong.trim().slice(0, 120) : '';

  if (!authorName || !message) {
    return;
  }

  const payload: Record<string, unknown> = {
    authorName,
    message,
    createdAt: serverTimestamp(),
  };

  if (song) {
    payload.song = song;
  }

  try {
    await addDoc(collection(db, 'messages'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'messages');
  }
}

interface GuestMessagesWallProps {
  onShowToast: (message: string) => void;
}

export const GuestMessagesWall: React.FC<GuestMessagesWallProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<GuestMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: GuestMessageDoc[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              authorName: String(data.authorName || ''),
              message: String(data.message || ''),
              song: data.song ? String(data.song) : undefined,
              createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
            };
          })
          .filter((msg) => msg.authorName && msg.message && msg.authorName !== 'Test Node');
        setMessages(docs);
        setLoading(false);
      },
      (error) => {
        console.warn('Error reading messages:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      onShowToast('Por favor escribí tu nombre');
      return;
    }
    if (!messageText.trim()) {
      onShowToast('Por favor escribí tu mensaje para Zoe');
      return;
    }

    setSubmitting(true);
    try {
      await saveGuestMessageToPage(authorName, messageText);
      setMessageText('');
      onShowToast('¡Tu mensaje para Zoe quedó publicado en la página! 💙');
    } catch {
      onShowToast('No se pudo publicar el mensaje. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (ts?: Timestamp | null) => {
    if (!ts) return 'Recién publicado';
    try {
      return ts.toDate().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-10 px-4" id="mensajes-zoe">
      <div className="relative p-6 sm:p-8 rounded-3xl silver-card overflow-hidden">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/90 border border-slate-300/40 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] mb-2">
            <MessageSquareHeart className="w-6 h-6 text-cyan-300" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-cyan-200 font-semibold">
            <MarkedEightPointStar size={14} />
            <span>Libro de Recuerdos</span>
            <MarkedEightPointStar size={14} />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Mensajes para Zoe 💙
          </h3>

          <div className="silver-divider max-w-xs mx-auto my-3" />

          <p className="text-sm text-slate-100 font-body font-medium max-w-md mx-auto">
            Dejale tus deseos y dedicatorias a Zoe. ¡Todos los mensajes quedan guardados acá en su página!
          </p>
        </div>

        {/* Form to write a message directly on the page */}
        <form
          onSubmit={handlePostMessage}
          className="space-y-3 text-left bg-slate-950/75 p-4 sm:p-5 rounded-2xl border border-slate-300/30 mb-7 shadow-inner"
        >
          <div>
            <label
              htmlFor="wall-author-name"
              className="block text-xs font-cinzel tracking-wider uppercase text-cyan-200 font-bold mb-1"
            >
              Tu Nombre *
            </label>
            <input
              id="wall-author-name"
              type="text"
              required
              maxLength={80}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ej: Tía Laura / Familia Gómez"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-300/35 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="wall-message-text"
              className="block text-xs font-cinzel tracking-wider uppercase text-cyan-200 font-bold mb-1"
            >
              Tu Mensaje para Zoe *
            </label>
            <textarea
              id="wall-message-text"
              rows={2}
              required
              maxLength={500}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribile unas palabras lindas para sus 15 años..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-300/35 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Publicando...' : 'Publicar Mensaje en la Página'}</span>
          </button>
        </form>

        {/* Messages Wall List */}
        <div className="space-y-3.5 text-left max-h-[420px] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-8 text-slate-300 text-sm font-body">
              Cargando mensajes para Zoe...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl bg-slate-950/60 border border-slate-300/20">
              <div className="flex justify-center mb-2">
                <MarkedButterfly size={22} glow />
              </div>
              <p className="text-sm text-slate-200 font-body">
                ¡Sé la primera persona en dejarle un mensaje especial a Zoe! 💙
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className="relative p-4 rounded-2xl bg-slate-950/85 border border-cyan-300/30 shadow-[0_4px_20px_rgba(2,6,23,0.75)] transition-all hover:border-cyan-300/50"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-cyan-400/40 text-cyan-300 text-xs font-cinzel font-bold">
                      {item.authorName.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-cinzel text-sm font-bold text-cyan-200 tracking-wide">
                      {item.authorName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-body">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white font-body leading-relaxed pl-9">
                  “{item.message}”
                </p>

                {item.song && (
                  <div className="mt-2 pl-9 flex items-center gap-1.5 text-xs text-cyan-300/90 font-body">
                    <Music2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Tema sugerido: {item.song}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
