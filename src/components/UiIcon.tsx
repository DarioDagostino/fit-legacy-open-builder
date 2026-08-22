import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { localAssetUrl } from '../lib/cdn';

export type UiIconName =
  | 'ajustes' | 'alert' | 'cancel-2' | 'cloud-data-transfer' | 'date-time-setting'
  | 'datos' | 'dumbbell' | 'fuel_protein' | 'gallery' | 'graph-bar' | 'graph-pie'
  | 'historial' | 'key' | 'legacito' | 'legacito-2' | 'legacito-3' | 'low_protein'
  | 'mail' | 'one-rm' | 'on-off-1' | 'picture' | 'reward' | 'rocket-launch-chart'
  | 'send' | 'shaker' | 'gym-time' | 'change' | 'tips' | 'validation-1';

export type UiIconVariant = 'default' | 'duo' | 'rose' | 'green';

type UiIconProps = {
  name: UiIconName;
  size?: number;
  duo?: boolean;
  active?: boolean;
  variant?: UiIconVariant;
  className?: string;
};

export function UiIcon({ name, size = 20, duo = false, active, variant = 'default', className = '' }: UiIconProps) {
  const usesColorFamily = name === 'ajustes' || name === 'change' || name === 'datos' || name === 'fuel_protein'
    || name === 'gallery' || name === 'historial' || name === 'low_protein' || name === 'tips';
  const resolvedVariant = active === undefined
    ? (duo ? 'duo' : variant)
    : usesColorFamily ? (active ? 'green' : 'rose') : (active ? 'duo' : 'default');
  const suffix = resolvedVariant === 'duo' ? '-duo' : resolvedVariant === 'rose' || resolvedVariant === 'green' ? `_${resolvedVariant}` : '';
  const filename = name === 'alert'
    ? `alert${active ? '_on' : ''}.svg`
    : name === 'send'
      ? (active ? 'fluent-color_send-clock-32.svg' : 'fluent-color_send-48.svg')
      : name === 'dumbbell'
        ? (active ? 'dumbbell_pressed.webp' : 'dumbbell_sin_bordes.webp')
        : name === 'shaker'
          ? (active ? 'shaker_menos_pressed.webp' : 'shaker_protein_transparent.webp')
          : name === 'one-rm'
            ? (active ? 'dumbbell-1.svg' : 'dumbbell.svg')
            : name === 'gym-time'
              ? (active ? 'gym time-1.svg' : 'gym time.svg')
              : name === 'legacito'
                ? 'icon_legacito.svg'
                : name === 'legacito-2'
                  ? 'icon_legacito_2.svg'
                  : name === 'legacito-3'
                    ? 'icon_legacito_3.svg'
                    : `${name}${suffix}.svg`;

  // UI assets are grouped under public/icons in the canonical Builder repo.
  // The previous root-level path made every rail/header icon resolve to a
  // broken image after the source→mirror asset sync.
  const fallback = localAssetUrl('/assets/icons/workouts/icono_personalizado.svg');
  return (
    <img
      src={localAssetUrl(`/icons/iconos_ui/${filename}`)}
      alt=""
      aria-hidden="true"
      className={`ui-icon${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      onError={(event) => {
        const image = event.currentTarget;
        const fallbackUrl = new URL(fallback, window.location.href).href;
        if (image.src !== fallbackUrl) image.src = fallback;
      }}
    />
  );
}

const LEGACITO_VARIANTS: UiIconName[] = ['legacito', 'legacito-2', 'legacito-3'];

export function LegacitoUiIcon({ size = 20, className = '', intervalMs = 2400 }: { size?: number; className?: string; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % LEGACITO_VARIANTS.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [reduceMotion, intervalMs]);

  return <UiIcon name={LEGACITO_VARIANTS[index]} size={size} className={className} />;
}
