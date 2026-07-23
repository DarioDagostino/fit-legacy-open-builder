import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

type Tip = {
  text: string;
  img: string;
  focusY: number;
};

const SABIAS_TIPS: Tip[] = [
  {
    text: 'Podés combinar ejercicios y comidas en un mismo plan para tener una visión completa de tu entrenamiento.',
    img: '/assets_coach_tips/athletic_woman_protein.webp',
    focusY: 16,
  },
  {
    text: 'Tus rutinas se guardan automáticamente en el calendario con analytics en tiempo real.',
    img: '/assets_coach_tips/confident_athlete_standing.webp',
    focusY: 14,
  },
  {
    text: 'Compartí tu rutina como un link .wir — quien lo abre puede verla completa sin descargar nada.',
    img: '/assets_coach_tips/dynamic_protein_celebration.webp',
    focusY: 25,
  },
  {
    text: 'El coach Legacito analiza tu plan y te da recomendaciones personalizadas al instante.',
    img: '/assets_coach_tips/confident_coach_standing.webp',
    focusY: 12,
  },
  {
    text: 'Podés personalizar el fondo del catálogo entre 5 presets visuales distintos.',
    img: '/assets_coach_tips/athletic_woman_confident_pose.webp',
    focusY: 18,
  },
  {
    text: 'Cada ejercicio acepta notas personalizadas para recordar técnica, peso o series.',
    img: '/assets_coach_tips/athletic_woman_squat.webp',
    focusY: 20,
  },
];

const DISMISSED_KEY = 'fl-sabias-que-dismissed-v2';
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
      <div className="builder-apple-card overflow-hidden">
        <div className="relative h-[120px] overflow-hidden sm:h-[140px]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={index}
              src={tip.img}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
              style={{ objectPosition: `50% ${tip.focusY}%` }}
            />
          </AnimatePresence>
        </div>
        <div className="flex items-start gap-3 p-3 sm:p-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2A468]/12">
            <Lightbulb className="h-3.5 w-3.5 text-[#F2A468]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#F2A468]">
              ¿Sabías que?
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-0.5 text-[12px] font-semibold leading-snug text-[#9CA0A6]"
              >
                {tip.text}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            onClick={handleDismiss}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#6E6558] hover:bg-[#2A2520] hover:text-[#F1F0F4]"
            aria-label="Cerrar tip"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
