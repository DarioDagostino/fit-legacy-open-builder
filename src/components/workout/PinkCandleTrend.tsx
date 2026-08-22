import type { CSSProperties } from 'react';

const CANDLE_PROFILES = [
  [40, 58, 48, 69, 55, 74, 62, 48, 57, 81, 68, 88, 73, 60, 52, 71, 63, 47, 58, 76, 67, 92],
  [54, 46, 65, 72, 58, 49, 64, 77, 67, 55, 83, 71, 62, 75, 50, 59, 70, 86, 61, 73, 82, 95],
  [45, 64, 56, 75, 66, 52, 61, 47, 72, 80, 69, 58, 76, 64, 49, 67, 79, 57, 70, 84, 74, 90],
  [60, 48, 72, 57, 66, 81, 59, 75, 51, 69, 85, 63, 78, 56, 71, 88, 65, 50, 74, 82, 68, 94],
] as const;

interface PinkCandleTrendProps {
  variant?: number;
  label: string;
  kind?: 'standard' | 'result';
}

export function PinkCandleTrend({ variant = 0, label, kind = 'standard' }: PinkCandleTrendProps) {
  const profile = CANDLE_PROFILES[Math.abs(variant) % CANDLE_PROFILES.length];
  const staggerMs = kind === 'result' ? 24 : 30;

  if (kind === 'result') {
    return (
      <div className="tool-pink-candles tool-pink-candles--result tool-pink-candles--split" aria-label={label}>
        {profile.map((height, index) => {
          const previous = profile[Math.max(0, index - 1)] ?? height;
          const lowerHeight = Math.max(18, Math.min(66, Math.abs(height - previous) * 2.15 + height * 0.22));

          return (
            <span
              className={`tool-pink-candles__split-candle${index === profile.length - 1 ? ' is-live' : ''}`}
              key={`${variant}-${index}`}
              style={{ '--candle-delay': `${index * staggerMs}ms` } as CSSProperties}
            >
              <i className="tool-pink-candles__upper" style={{ height: `${height}%` }} />
              <i className="tool-pink-candles__lower" style={{ height: `${lowerHeight}%` }} />
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`tool-pink-candles tool-pink-candles--${kind}`} aria-label={label}>
      {profile.map((height, index) => (
        <i
          key={`${variant}-${index}`}
          style={{ height: `${height}%`, '--candle-delay': `${index * staggerMs}ms` } as CSSProperties}
        />
      ))}
    </div>
  );
}


