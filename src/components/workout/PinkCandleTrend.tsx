import { useMemo } from 'react';
import { motion } from 'motion/react';

const CANDLE_BASE_PROFILES = [
  [38, 72, 48, 86, 52, 94, 62, 44, 76, 96, 68, 98, 74, 52, 60, 88, 66, 48, 80, 92, 86, 100],
  [65, 42, 84, 90, 56, 48, 78, 94, 68, 54, 96, 72, 58, 86, 50, 74, 90, 98, 70, 88, 94, 100],
  [42, 78, 55, 92, 65, 48, 74, 50, 88, 96, 70, 58, 90, 64, 46, 82, 96, 62, 86, 94, 92, 100],
  [70, 46, 88, 58, 76, 96, 60, 90, 52, 84, 98, 66, 92, 56, 82, 98, 68, 54, 88, 96, 92, 100],
] as const;

export interface PinkCandleTrendProps {
  variant?: number;
  label: string;
  kind?: 'standard' | 'result';
  weight?: number;
  reps?: number;
}

interface SpectralZone {
  name: 'green' | 'cyan' | 'golden' | 'rose';
  upperGradient: string;
  lowerGradient: string;
  glow: string;
  accent: string;
}

function getSpectralZone(index: number): SpectralZone {
  // 4 chromatic zones across the 22 bars:
  // 0-5 (Green) -> 6-11 (Cyan) -> 12-16 (Golden) -> 17-21 (Rose/Live)
  if (index <= 5) {
    return {
      name: 'green',
      upperGradient: 'linear-gradient(180deg, #34d399 0%, #059669 65%, #047857 100%)',
      lowerGradient: 'linear-gradient(180deg, #047857 0%, #064e3b 100%)',
      glow: '0 0 8px rgba(16, 185, 129, 0.45)',
      accent: '#10b981',
    };
  }
  if (index <= 11) {
    return {
      name: 'cyan',
      upperGradient: 'linear-gradient(180deg, #38bdf8 0%, #00d2ee 65%, #0284c7 100%)',
      lowerGradient: 'linear-gradient(180deg, #0284c7 0%, #0c4a6e 100%)',
      glow: '0 0 8px rgba(0, 210, 238, 0.5)',
      accent: '#00d2ee',
    };
  }
  if (index <= 16) {
    return {
      name: 'golden',
      upperGradient: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 65%, #b45309 100%)',
      lowerGradient: 'linear-gradient(180deg, #b45309 0%, #78350f 100%)',
      glow: '0 0 8px rgba(245, 158, 11, 0.45)',
      accent: '#f59e0b',
    };
  }
  return {
    name: 'rose',
    upperGradient: 'linear-gradient(180deg, #fb7185 0%, #f43f5e 65%, #be123c 100%)',
    lowerGradient: 'linear-gradient(180deg, #be123c 0%, #881337 100%)',
    glow: '0 0 10px rgba(244, 63, 94, 0.55)',
    accent: '#f43f5e',
  };
}

export function PinkCandleTrend({
  variant = 0,
  label,
  weight = 85,
  reps = 5,
}: PinkCandleTrendProps) {
  const baseProfile = CANDLE_BASE_PROFILES[Math.abs(Math.round(variant)) % CANDLE_BASE_PROFILES.length];

  // Dynamic load waveform with expressive peaks and harmonic rhythm
  const profile = useMemo(() => {
    const intensity = Math.min(1.22, Math.max(0.78, (weight / 100) * 0.7 + (reps / 10) * 0.3));
    return baseProfile.map((val, idx) => {
      const wave = Math.sin((idx / baseProfile.length) * Math.PI * 3.2 + reps * 0.45) * 8;
      const computed = (val * intensity + wave);
      const upperPct = Math.max(0.2, Math.min(0.96, (computed - 15) / 85));
      const lowerPct = Math.max(0.15, Math.min(0.85, upperPct * 0.65 + Math.cos(idx * 0.8) * 0.08));
      
      // Upper height: 10px to 38px
      const upperPx = Math.round(10 + upperPct * 28);
      // Lower height: 6px to 22px
      const lowerPx = Math.round(6 + lowerPct * 16);
      return { upperPx, lowerPx };
    });
  }, [baseProfile, weight, reps]);

  return (
    <div
      className="fl-candle-waveform relative w-full h-[68px] flex items-center justify-between gap-[3px] py-1 select-none overflow-hidden"
      aria-label={label}
    >
      {profile.map(({ upperPx, lowerPx }, index) => {
        const zone = getSpectralZone(index);
        const isTargetBeacon = index === 20; // Exact circle badge on the 21st bar (rose section)
        const pulseDuration = 2.4 + (index % 4) * 0.25;
        const pulseDelay = index * 0.04;

        return (
          <div
            key={`fl-candle-${index}`}
            className="flex-1 h-[64px] flex flex-col items-center justify-center relative min-w-0"
          >
            {/* Upper half: bar grows upwards from center baseline */}
            <div className="w-full h-[38px] flex items-end justify-center">
              <motion.div
                className="w-full max-w-[10px] rounded-t-[2px] relative"
                style={{
                  background: zone.upperGradient,
                  boxShadow: zone.glow,
                }}
                animate={{
                  height: [`${upperPx}px`, `${Math.min(37, upperPx + 2 * Math.sin(index * 1.1))}px`, `${upperPx}px`],
                  opacity: [0.92, 1, 0.92],
                }}
                transition={{
                  height: { duration: pulseDuration, repeat: Infinity, ease: 'easeInOut', delay: pulseDelay },
                  opacity: { duration: pulseDuration, repeat: Infinity, ease: 'easeInOut', delay: pulseDelay },
                }}
              />
            </div>

            {/* Tight Center Baseline (1px subtle divider) */}
            <div className="w-full h-[1px] bg-black/60 shrink-0" />

            {/* Lower half: reflection grows downwards from center baseline */}
            <div className="w-full h-[25px] flex items-start justify-center">
              <motion.div
                className="w-full max-w-[10px] rounded-b-[2px]"
                style={{
                  background: zone.lowerGradient,
                  opacity: 0.65,
                }}
                animate={{
                  height: [`${lowerPx}px`, `${Math.min(24, lowerPx + 1.5 * Math.cos(index * 1.1))}px`, `${lowerPx}px`],
                }}
                transition={{
                  height: { duration: pulseDuration, repeat: Infinity, ease: 'easeInOut', delay: pulseDelay },
                }}
              />
            </div>

            {/* Exact Circular Beacon Ring on Rose Section (as in screenshot) */}
            {isTargetBeacon && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.7)] pointer-events-none z-20" />
            )}
          </div>
        );
      })}
    </div>
  );
}
