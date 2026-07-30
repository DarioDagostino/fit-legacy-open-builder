import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type AppLoadingScreenProps = {
  name: string;
  description: string;
  logo: string;
  logoAlt: string;
  accent: string;
  eyebrow?: string;
  statusLines?: string[];
  onFinished: () => void;
  duration?: number;
};

/**
 * Pearl-paper boot screen shared by the standalone Builder deployment.
 * The visual language mirrors the workspace apps while keeping this repo self-contained.
 */
export function AppLoadingScreen({
  name,
  description,
  logo,
  logoAlt,
  accent,
  eyebrow = 'FIT LEGACY',
  statusLines = ['Cargando módulos', 'Sincronizando entorno', 'Listo para continuar'],
  onFinished,
  duration = 1800,
}: AppLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (statusLines.length < 2) return;
    const statusTimer = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % statusLines.length);
    }, 560);
    return () => window.clearInterval(statusTimer);
  }, [statusLines.length]);

  useEffect(() => {
    const startedAt = performance.now();
    let frame = 0;
    let finishTimer: number | undefined;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        finishTimer = window.setTimeout(onFinished, 280);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [duration, onFinished]);

  const style = {
    '--app-loading-accent': accent,
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    width: '100%',
    height: '100dvh',
    isolation: 'isolate',
    backgroundColor: '#f7f3eb',
    backgroundImage: [
      'radial-gradient(circle at 20% 18%, rgba(130, 97, 58, .12) 0 1px, transparent 1.3px)',
      'radial-gradient(circle at 78% 64%, rgba(130, 97, 58, .07) 0 1px, transparent 1.2px)',
      'linear-gradient(135deg, rgba(255,255,255,.78), rgba(246,238,227,.76))',
    ].join(','),
    backgroundSize: '22px 22px, 31px 31px, 100% 100%',
  } as CSSProperties;

  return (
    <motion.main
      className="fixed inset-0 z-[100] grid h-[100dvh] w-full place-items-center overflow-hidden px-6 text-[#241c15]"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.015 : 1 }}
      transition={{ duration: exiting ? 0.28 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,.42) 46%, transparent 52%)',
          backgroundSize: '180% 100%',
        }}
        animate={{ backgroundPosition: ['120% 0%', '-30% 0%'] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent}33, transparent 68%)` }}
          animate={{ scale: [0.9, 1.08, 0.96], opacity: [0.26, 0.48, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute left-1/2 top-[70px] size-40 -translate-x-1/2 rounded-[42px] border border-dashed"
          style={{ borderColor: `${accent}55` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute left-1/2 top-[60px] size-48 -translate-x-1/2 rounded-full border"
          style={{ borderColor: `${accent}22` }}
          animate={{ rotate: -360, scale: [0.96, 1.04, 0.96] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
          aria-hidden="true"
        />

        <motion.div
          className="relative grid place-items-center"
          style={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
            width: '7rem',
            height: '7rem',
          }}
          initial={{ opacity: 0, scale: 0.78, y: 12, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={logo}
            alt={logoAlt}
            className="relative z-10 size-[76px] object-contain"
            style={{ width: '92px', height: '92px', objectFit: 'contain' }}
            draggable={false}
            initial={{ opacity: 0, scale: 0.84, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="pointer-events-none absolute left-3 right-3 top-3 z-20 h-5 rounded-full opacity-35 blur-[3px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent}, transparent)` }}
            animate={{ y: [0, 58, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.p
          className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a7d6d]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-[#211a14] sm:text-5xl"
          style={{
            color: '#211a14',
            fontSize: 'clamp(2.25rem, 8vw, 3rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.055em',
            margin: '0.5rem 0 0',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mt-3 max-w-xs text-sm leading-relaxed text-[#766d62] sm:text-[15px]"
          style={{
            color: '#766d62',
            fontSize: 'clamp(0.875rem, 3.5vw, 0.9375rem)',
            lineHeight: 1.55,
            margin: '0.75rem 0 0',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {description}
        </motion.p>

        <div className="mt-6 flex min-h-4 items-center justify-center overflow-hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#a19483]" aria-live="polite">
          <motion.span
            key={statusIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            {statusLines[statusIndex % statusLines.length]}
          </motion.span>
        </div>

        <div className="mt-4 h-1 w-36 overflow-hidden rounded-full bg-[#e3d8c8]" aria-hidden="true">
          <motion.span
            className="block h-full origin-left rounded-full"
            style={{ backgroundColor: accent, width: `${progress}%` }}
            animate={{ opacity: progress >= 100 ? 0.8 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#a19483]">Preparando tu espacio</p>
      </div>
    </motion.main>
  );
}
