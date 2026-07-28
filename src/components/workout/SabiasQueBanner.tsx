import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

type Tip = {
  text: string;
  focusY: number;
};

const SABIAS_TIPS: Tip[] = [
  {
    text: 'Podés combinar ejercicios y comidas en un mismo plan para tener una visión completa de tu entrenamiento.',
    focusY: 16,
  },
  {
    text: 'Tus rutinas se guardan automáticamente en el calendario con analytics en tiempo real.',
    focusY: 14,
  },
  {
    text: 'Compartí tu rutina como un link .wir — quien lo abre puede verla completa sin descargar nada.',
    focusY: 25,
  },
  {
    text: 'El coach Legacito analiza tu plan y te da recomendaciones personalizadas al instante.',
    focusY: 12,
  },
  {
    text: 'Podés personalizar el fondo del catálogo entre 5 presets visuales distintos.',
    focusY: 18,
  },
  {
    text: 'Cada ejercicio acepta notas personalizadas para recordar técnica, peso o series.',
    focusY: 20,
  },
];

type BuilderProfile = 'woman' | 'man';

const PROFILE_TIP_IMAGES: Record<BuilderProfile, string[]> = {
  woman: [
    '/assets_coach_tips/women_orange_energetico/athletic_woman_protein.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_confident_pose.webp',
    '/assets_coach_tips/women_orange_energetico/victory_jump_illustration.webp',
    '/assets_coach_tips/women_orange_energetico/confident_coach_standing.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_lunge_pose.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_squat.webp',
  ],
  man: [
    '/assets_coach_tips/man_orange_energetico/athletic_man_protein.webp',
    '/assets_coach_tips/man_orange_energetico/confident_athlete_standing.webp',
    '/assets_coach_tips/man_orange_energetico/dynamic_protein_celebration.webp',
    '/assets_coach_tips/man_orange_energetico/751897927_1376542741270294_1485225782041362540_n.webp',
    '/assets_coach_tips/man_orange_energetico/752514664_1665291831230549_680017816444529485_n.webp',
    '/assets_coach_tips/man_orange_energetico/759756342_1063792812889272_5857949442508654311_n.webp',
  ],
};

const DISMISSED_KEY = 'fl-sabias-que-dismissed-v2';
const INTERVAL_MS = 18000;

export function SabiasQueBanner({ className, profile }: { className?: string; profile: BuilderProfile }) {
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
  const tipImage = PROFILE_TIP_IMAGES[profile][index];

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
              key={`${profile}-${index}`}
              src={tipImage}
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
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'color-mix(in srgb, var(--builder-accent) 12%, transparent)' }}
          >
            <Lightbulb className="h-3.5 w-3.5 text-[var(--builder-accent-soft)]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--builder-accent-soft)]">
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
