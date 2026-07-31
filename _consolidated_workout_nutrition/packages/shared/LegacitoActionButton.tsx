import { motion } from 'framer-motion';
import { Legacito, LegacitoMood, LegacitoSkin } from './legacito';

interface LegacitoActionButtonProps {
  onClick?: () => void;
  mood?: LegacitoMood;
  size?: number;
  label?: string;
  className?: string;
  buttonSizeClass?: string;
  glowColor?: string;
  skinId?: LegacitoSkin;
}

export function LegacitoActionButton({
  onClick,
  mood = 'celebrating',
  size = 80,
  label = 'Abrir Legacito',
  className = '',
  buttonSizeClass = 'size-24',
  glowColor = 'rgba(53,87,125,0.12)',
  skinId = 'none',
}: LegacitoActionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08, rotate: 2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={[
        buttonSizeClass,
        'shrink-0 flex flex-col items-center justify-center relative cursor-pointer touch-manipulation',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl animate-pulse pointer-events-none"
        style={{ background: glowColor }}
      />
      <Legacito mood={mood} size={size} skinId={skinId} className="relative z-10" />
    </motion.button>
  );
}
