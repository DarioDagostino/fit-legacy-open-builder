import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cyanLogo from '@/assets/legacy-logo/cyan.svg';
import goldLogo from '@/assets/legacy-logo/gold.svg';
import goldenLogo from '@/assets/legacy-logo/golden.svg';
import roseLogo from '@/assets/legacy-logo/rose.svg';

type LogoVariant = 'gold' | 'golden' | 'cyan' | 'rose';

// Builder leads with cyan, then keeps the shared Legacy logo cycle. The logo
// variants live in src/assets so the header never depends on an optional
// public /logo directory during local or production builds.
const VARIANTS: LogoVariant[] = ['cyan', 'golden', 'rose', 'gold'];

const LOGO_MAP: Record<LogoVariant, string> = {
  gold: goldLogo,
  golden: goldenLogo,
  cyan: cyanLogo,
  rose: roseLogo,
};

const GLOW_MAP: Record<LogoVariant, string> = {
  golden: 'rgba(255, 210, 103, 0.5)',
  gold: 'rgba(244, 187, 76, 0.45)',
  cyan: 'rgba(83, 231, 255, 0.45)',
  rose: 'rgba(255, 135, 186, 0.45)',
};

const AURA_MAP: Record<LogoVariant, string> = {
  golden: 'rgba(255, 217, 122, 0.25)',
  gold: 'rgba(255, 196, 82, 0.2)',
  cyan: 'rgba(53, 224, 255, 0.2)',
  rose: 'rgba(255, 147, 191, 0.2)',
};

export function DynamicLogoIcon({ interactive = true }: { interactive?: boolean }) {
  const [index, setIndex] = useState(0);
  const [bursting, setBursting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!interactive) return;
    timerRef.current = setTimeout(() => {
      setIndex(i => (i + 1) % VARIANTS.length);
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, [index, interactive]);

  const handleBurst = () => {
    if (!interactive || bursting) return;
    setBursting(true);
    setIndex(i => (i + 1) % VARIANTS.length);
    setTimeout(() => setBursting(false), 600);
  };

  const active = VARIANTS[index];
  const src = LOGO_MAP[active];
  const glow = GLOW_MAP[active];
  const aura = AURA_MAP[active];

  return (
    <div
      className="relative flex h-full w-full items-center justify-center cursor-pointer"
      onClick={handleBurst}
      style={{ position: 'relative' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${aura} 0%, transparent 70%)`,
          filter: 'blur(6px)',
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0 rounded-[18%] transition-all duration-400"
        style={{
          border: '1px solid',
          borderColor: glow,
          boxShadow: `0 0 8px ${glow}, inset 0 0 3px ${glow}`,
          opacity: 0.15,
        }}
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={src}
          alt=""
          draggable={false}
          className="relative z-10 h-full w-full object-contain"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: 1,
            scale: bursting ? [1, 1.15, 0.95, 1] : 1,
            rotate: bursting ? [0, -5, 3, 0] : 0,
          }}
          transition={{ duration: bursting ? 0.55 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}
