import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

const SABIAS_TIPS = [
  {
    text: 'Podés combinar ejercicios y comidas en un mismo plan para tener una visión completa de tu entrenamiento.',
    img: '/assets_coach_tips/athletic_woman_protein.webp',
  },
  {
    text: 'Tus rutinas se guardan automáticamente en el calendario con analytics en tiempo real.',
    img: '/assets_coach_tips/confident_athlete_standing.webp',
  },
  {
    text: 'Compartí tu rutina como un link .wir — quien lo abre puede verla completa sin descargar nada.',
    img: '/assets_coach_tips/dynamic_protein_celebration.webp',
  },
  {
    text: 'El coach Legacito analiza tu plan y te da recomendaciones personalizadas al instante.',
    img: '/assets_coach_tips/confident_coach_standing.webp',
  },
  {
    text: 'Podés personalizar el fondo del catálogo entre 5 presets visuales distintos.',
    img: '/assets_coach_tips/athletic_woman_confident_pose.webp',
  },
  {
    text: 'Cada ejercicio acepta notas personalizadas para recordar técnica, peso o series.',
    img: '/assets_coach_tips/athletic_woman_squat.webp',
  },
];

const DISMISSED_KEY = 'fl-sabias-que-dismissed-v1';
const INTERVAL_MS = 18000;

export function SabiasQueBanner({ className }: { className?: string }) {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(DISMISSED_KEY) === 'true'; } catch { return false; }
  });
  const [index, setIndex] = useState(0);

  const nextTip = useCallback(() => {
    setIndex((prev) => (prev + 1) % SABIAS_TIPS.length);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(nextTip, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [dismissed, nextTip]);

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(DISMISSED_KEY, 'true'); } catch {}
  };

  if (dismissed) return null;

  const tip = SABIAS_TIPS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className={className}
    >
      <div className="mx-auto max-w-md rounded-[1.25rem] border border-[#2A2520] bg-[#1E1A16]/90 px-3 py-2.5 backdrop-blur-lg">
        <div className="flex items-start gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#2A2520]">
            <img
              src={tip.img}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3 text-[#F2A468]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#F2A468]">
                ¿Sabías que?
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-0.5 text-[11px] font-semibold leading-snug text-[#A79A87]"
              >
                {tip.text}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            onClick={handleDismiss}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#6E6558] hover:bg-[#2A2520] hover:text-[#FAF5EC]"
            aria-label="Cerrar tip"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
