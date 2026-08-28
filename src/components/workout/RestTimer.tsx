import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, Plus, RotateCcw, Volume2, VolumeX, Activity, Award, Flame, Radio, Zap, Clock, Shield } from 'lucide-react';
import { recordBuilderRestTimerSession } from '../builderToolLedger';
import { UiIcon } from '../UiIcon';

export type RestTimerProps = {
  onRewardXp?: (xp: number) => void;
  onRecordSession?: (session: {
    durationSeconds: number;
    mode: 'single' | 'interval' | 'chrono';
    preset?: string;
    rounds?: number;
    xpEarned: number;
  }) => void;
};

type TimerTab = 'rest' | 'chrono' | 'intervals';

const INTERVAL_PRESETS = [
  { key: 'strength', label: 'Fuerza Pesada', description: 'Pausas largas para series pesadas a RPE 8-9', work: 180, rest: 300, rounds: 5, icon: 'dumbbell' as const, tag: 'ATP-CP' },
  { key: 'hypertrophy', label: 'Hipertrofia', description: 'Ritmo óptimo para acumulación de volumen', work: 45, rest: 90, rounds: 4, icon: 'datos' as const, tag: 'VOLUMEN' },
  { key: 'endurance', label: 'Resistencia HIIT', description: 'Cadencia continua y alta densidad metabólica', work: 30, rest: 60, rounds: 6, icon: 'rocket-launch-chart' as const, tag: 'METABÓLICO' },
  { key: 'power', label: 'Potencia Pura', description: 'Explosividad máxima con recuperación neuromuscular', work: 10, rest: 180, rounds: 8, icon: 'one-rm' as const, tag: 'NEUROMUSCULAR' },
] as const;

const QUICK_DURATIONS = [30, 45, 60, 90, 120, 180] as const;

type IntervalPreset = (typeof INTERVAL_PRESETS)[number];

function formatTime(total: number) {
  const minutes = Math.floor(Math.max(0, total) / 60);
  const seconds = Math.floor(Math.max(0, total) % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function splitMs(durationMs: number) {
  const safe = Math.max(0, durationMs);
  const minutes = Math.floor(safe / 60_000);
  const seconds = Math.floor((safe % 60_000) / 1_000);
  const centiseconds = Math.floor((safe % 1_000) / 10);
  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    centiseconds: centiseconds.toString().padStart(2, '0'),
  };
}

/* ─── Tech Grid Pattern ─── */
function TechGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="techGridRest" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGridRest)" />
    </svg>
  );
}

/* ─── Canonical Fit Legacy Chamfered CTA Button ─── */
function EliteChamferButton({
  children,
  onClick,
  variant = 'cyan',
  className = '',
  icon,
  type = 'button',
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'cyan' | 'white' | 'dark' | 'danger';
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const isCyan = variant === 'cyan';
  const isWhite = variant === 'white';
  const isDanger = variant === 'danger';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
      className={`group relative min-h-[44px] px-5 py-2.5 flex items-center justify-center gap-2 font-mono text-[11px] font-black uppercase tracking-wider select-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${className}`}
      style={{
        clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        background: isCyan
          ? 'linear-gradient(135deg, #00d2ee 0%, #0284c7 100%)'
          : isWhite
          ? 'linear-gradient(135deg, #ffffff 0%, #dbe0ea 100%)'
          : isDanger
          ? 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)'
          : 'linear-gradient(135deg, #16161b 0%, #0a0a0d 100%)',
        color: isCyan || isWhite ? '#000000' : '#ffffff',
        boxShadow: isCyan
          ? '-2px 2px 0px #71f6ff, 0 8px 24px rgba(0, 210, 238, 0.4)'
          : isWhite
          ? '-2px 2px 0px var(--builder-accent, #00d2ee), 0 8px 24px rgba(0, 210, 238, 0.25)'
          : isDanger
          ? '-1px 1px 0px #fda4af, 0 6px 20px rgba(244, 63, 94, 0.35)'
          : '-1px 1px 0px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      {(isCyan || isWhite) && (
        <span className="absolute inset-0 bg-gradient-to-t from-black/[0.06] to-white/40 pointer-events-none opacity-90" />
      )}
      {icon && <span className="relative z-10 shrink-0">{icon}</span>}
      {children && <span className="relative z-10">{children}</span>}
    </motion.button>
  );
}

export function RestTimer({ onRewardXp, onRecordSession }: RestTimerProps) {
  const [activeTab, setActiveTab] = useState<TimerTab>('rest');
  const [isScreenCalibrating, setIsScreenCalibrating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showXpAward, setShowXpAward] = useState(false);

  // --- REST TIMER STATE ---
  const [restDuration, setRestDuration] = useState(60);
  const [restSecondsLeft, setRestSecondsLeft] = useState(60);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [lastCompletedRest, setLastCompletedRest] = useState<number | null>(null);

  // --- CHRONOGRAPH STATE ---
  const [chronoElapsedMs, setChronoElapsedMs] = useState(0);
  const [isChronoRunning, setIsChronoRunning] = useState(false);
  const [chronoLaps, setChronoLaps] = useState<number[]>([]);
  const chronoAccumulatedMsRef = useRef(0);
  const chronoStartedAtRef = useRef(0);
  const chronoAnimFrameRef = useRef<number | null>(null);

  // --- INTERVALS STATE ---
  const [selectedInterval, setSelectedInterval] = useState<IntervalPreset>(INTERVAL_PRESETS[0]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [intervalSecondsLeft, setIntervalSecondsLeft] = useState(INTERVAL_PRESETS[0].work);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);

  // --- AUDIO SYNTHESIZER ---
  const audioContextRef = useRef<AudioContext | null>(null);

  const ensureAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;
    try {
      const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) return null;
      audioContextRef.current = new AudioContextConstructor();
      return audioContextRef.current;
    } catch {
      return null;
    }
  }, []);

  const playBeep = useCallback((freq = 880, duration = 0.35) => {
    if (!soundEnabled) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignorar restricciones
    }
  }, [ensureAudioContext, soundEnabled]);

  // Tab switch calibration
  useEffect(() => {
    setIsScreenCalibrating(true);
    const timer = window.setTimeout(() => setIsScreenCalibrating(false), 500);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  // ─── REST COUNTDOWN INTERVAL EFFECT ───
  useEffect(() => {
    if (!isRestRunning) return undefined;

    const interval = window.setInterval(() => {
      setRestSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Timer finished
        playBeep(980, 0.55);
        setIsRestRunning(false);
        setLastCompletedRest(Date.now());
        setShowXpAward(true);
        onRewardXp?.(1);

        const sessionPayload = { durationSeconds: restDuration, mode: 'single' as const, xpEarned: 1 };
        if (onRecordSession) {
          onRecordSession(sessionPayload);
        } else {
          recordBuilderRestTimerSession?.(sessionPayload);
        }

        window.setTimeout(() => setShowXpAward(false), 3200);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRestRunning, onRecordSession, onRewardXp, playBeep, restDuration]);

  // ─── CHRONOGRAPH ANIMATION FRAME EFFECT ───
  useEffect(() => {
    if (!isChronoRunning) return undefined;

    const tick = (timestamp: number) => {
      setChronoElapsedMs(chronoAccumulatedMsRef.current + timestamp - chronoStartedAtRef.current);
      chronoAnimFrameRef.current = window.requestAnimationFrame(tick);
    };

    chronoAnimFrameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (chronoAnimFrameRef.current !== null) window.cancelAnimationFrame(chronoAnimFrameRef.current);
    };
  }, [isChronoRunning]);

  // ─── INTERVALS TIMER EFFECT ───
  useEffect(() => {
    if (!isIntervalRunning) return undefined;

    const interval = window.setInterval(() => {
      setIntervalSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Phase finished: toggle work/rest or next round
        if (isWorkPhase) {
          playBeep(750, 0.45);
          setIsWorkPhase(false);
          return selectedInterval.rest;
        }

        const nextRound = currentRound + 1;
        if (nextRound >= selectedInterval.rounds) {
          // Finished all rounds
          playBeep(1050, 0.7);
          setIsIntervalRunning(false);
          setShowXpAward(true);
          onRewardXp?.(selectedInterval.rounds);

          const intervalPayload = {
            durationSeconds: selectedInterval.work * selectedInterval.rounds + selectedInterval.rest * (selectedInterval.rounds - 1),
            mode: 'interval' as const,
            preset: selectedInterval.label,
            rounds: selectedInterval.rounds,
            xpEarned: selectedInterval.rounds,
          };
          if (onRecordSession) {
            onRecordSession(intervalPayload);
          } else {
            recordBuilderRestTimerSession?.(intervalPayload);
          }

          window.setTimeout(() => setShowXpAward(false), 3500);
          return 0;
        }

        playBeep(880, 0.45);
        setCurrentRound(nextRound);
        setIsWorkPhase(true);
        return selectedInterval.work;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRound, isIntervalRunning, isWorkPhase, onRecordSession, onRewardXp, playBeep, selectedInterval]);

  // ─── HANDLERS ───
  const toggleRestTimer = () => {
    if (!isRestRunning && restSecondsLeft === 0) {
      setRestSecondsLeft(restDuration);
    }
    setIsRestRunning((v) => !v);
  };

  const resetRestTimer = () => {
    setIsRestRunning(false);
    setRestSecondsLeft(restDuration);
  };

  const addRestSeconds = (delta = 30) => {
    setRestSecondsLeft((v) => Math.max(5, v + delta));
    setRestDuration((v) => Math.max(5, v + delta));
  };

  const setPresetRest = (duration: number) => {
    setIsRestRunning(false);
    setRestDuration(duration);
    setRestSecondsLeft(duration);
  };

  // Chrono handlers
  const toggleChrono = () => {
    if (isChronoRunning) {
      chronoAccumulatedMsRef.current = chronoElapsedMs;
      setIsChronoRunning(false);
      return;
    }
    chronoStartedAtRef.current = performance.now();
    setIsChronoRunning(true);
  };

  const resetChrono = () => {
    setIsChronoRunning(false);
    chronoAccumulatedMsRef.current = 0;
    setChronoElapsedMs(0);
    setChronoLaps([]);
  };

  const recordChronoLap = () => {
    if (chronoElapsedMs > 0) {
      setChronoLaps((prev) => [chronoElapsedMs, ...prev]);
    }
  };

  // Interval handlers
  const selectIntervalProtocol = (preset: IntervalPreset) => {
    setIsIntervalRunning(false);
    setSelectedInterval(preset);
    setCurrentRound(0);
    setIsWorkPhase(true);
    setIntervalSecondsLeft(preset.work);
  };

  const toggleIntervalTimer = () => {
    if (!isIntervalRunning && intervalSecondsLeft === 0) {
      setCurrentRound(0);
      setIsWorkPhase(true);
      setIntervalSecondsLeft(selectedInterval.work);
    }
    setIsIntervalRunning((v) => !v);
  };

  const resetIntervalTimer = () => {
    setIsIntervalRunning(false);
    setCurrentRound(0);
    setIsWorkPhase(true);
    setIntervalSecondsLeft(selectedInterval.work);
  };

  // Math for rest ring
  const restProgress = restDuration > 0 ? Math.max(0, Math.min(100, (1 - restSecondsLeft / restDuration) * 100)) : 0;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const restDashoffset = circumference - (restSecondsLeft / Math.max(restDuration, 1)) * circumference;

  // Math for interval ring
  const activeIntervalTotal = isWorkPhase ? selectedInterval.work : selectedInterval.rest;
  const intervalProgress = activeIntervalTotal > 0 ? Math.max(0, Math.min(100, (1 - intervalSecondsLeft / activeIntervalTotal) * 100)) : 0;
  const intervalDashoffset = circumference - (intervalSecondsLeft / Math.max(activeIntervalTotal, 1)) * circumference;

  const chronoParts = splitMs(chronoElapsedMs);

  return (
    <section className="vanguard-tool vanguard-tool--phone" aria-labelledby="rest-timer-title">
      <div className="one-rm-phone" aria-label="Mock smartphone Timer">
        <div className="one-rm-phone__bezel !bg-[#030304] !border-[#15151a]">
          <div className="one-rm-phone__speaker" aria-hidden="true" />
          <div className="one-rm-phone__screen relative overflow-hidden !bg-[#000000]">
            
            {/* Ambient High-Tech Telemetry Scanline on Screen Load */}
            <AnimatePresence>
              {isScreenCalibrating && (
                <motion.div
                  initial={{ x: '-100%', opacity: 0.9 }}
                  animate={{ x: '200%', opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[var(--builder-accent,#00d2ee)]/25 to-transparent blur-sm z-30 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Scrollable Phone Viewport in Pure Matte Black */}
            <div
              className="one-rm-phone-page absolute inset-0 flex flex-col gap-3.5 p-4 pb-24 overflow-y-auto overscroll-contain !bg-[#000000]"
              style={{ scrollbarWidth: 'thin' }}
            >

              {/* Topbar: Canonical Vanguard Telemetry Header */}
              <header className="flex items-start justify-between shrink-0 pt-1">
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--builder-accent,#00d2ee)] shadow-[0_0_8px_var(--builder-accent,#00d2ee)] animate-pulse" />
                    VANGUARD TOOLS · RECOVERY
                  </span>
                  <h2 id="rest-timer-title" className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black italic tracking-tight text-[#F1F0F4] leading-none mt-1">
                    {activeTab === 'rest' ? 'Descanso' : activeTab === 'chrono' ? 'Cronógrafo' : 'Intervalos'}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSoundEnabled((v) => !v)}
                    className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
                      soundEnabled
                        ? 'bg-[var(--builder-accent,#00d2ee)]/15 border-[var(--builder-accent,#00d2ee)]/40 text-[var(--builder-accent,#00d2ee)] shadow-[0_0_12px_rgba(0,210,238,0.25)]'
                        : 'bg-white/[0.04] border-white/[0.08] text-[#6E6558]'
                    }`}
                    title={soundEnabled ? 'Silenciar avisos' : 'Activar avisos sonoros'}
                  >
                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>
              </header>

              {/* Segmented Screen Switcher with Smooth Pill */}
              <div className="flex items-center p-1 rounded-2xl bg-[#09090c] border border-white/[0.08] shrink-0 relative shadow-inner">
                {([
                  { key: 'rest' as TimerTab, iconName: 'date-time-setting' as const, label: 'Descanso' },
                  { key: 'chrono' as TimerTab, iconName: 'datos' as const, label: 'Cronógrafo' },
                  { key: 'intervals' as TimerTab, iconName: 'rocket-launch-chart' as const, label: 'Intervalos' },
                ] as const).map(({ key, iconName, label }) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key)}
                      className={`flex-1 py-2 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 relative z-10 ${
                        isActive
                          ? 'text-black font-black'
                          : 'text-[#6E6558] hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-timer-tab"
                          className="absolute inset-0 bg-[var(--builder-accent,#00d2ee)] rounded-xl shadow-[0_0_14px_rgba(0,210,238,0.4)] -z-10"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <UiIcon name={iconName} size={13} active={isActive} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ═══════════════════════════════════════════
                  SCREEN 1 — DESCANSO (The Giant Glowing Radar Screen)
                  ═══════════════════════════════════════════ */}
              {activeTab === 'rest' && (
                <motion.div
                  key="screen-rest"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-4"
                >
                  {/* Hero Radial Hologram Ring Card */}
                  <div className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
                    <TechGrid />

                    {/* Giant Radial SVG Ring */}
                    <div className="relative w-56 h-56 flex items-center justify-center my-3 select-none">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                        <defs>
                          <linearGradient id="cyanTechGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#71f6ff" />
                            <stop offset="45%" stopColor="#00d2ee" />
                            <stop offset="100%" stopColor="#0284c7" />
                          </linearGradient>
                        </defs>

                        {/* Outer Orbit Reticle Track */}
                        <circle cx="110" cy="110" r="106" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <circle cx="110" cy="110" r="102" fill="none" stroke="rgba(0,210,238,0.22)" strokeWidth="1" strokeDasharray="3 6" />

                        {/* 48 Radial Precision Scale Ticks */}
                        {Array.from({ length: 48 }, (_, i) => {
                          const angle = (i * 360) / 48;
                          const isCardinal = i % 12 === 0;
                          const isMajor = i % 4 === 0;
                          const active = i / 48 <= (restSecondsLeft / Math.max(1, restDuration));
                          return (
                            <line
                              key={i}
                              x1="110"
                              y1={isCardinal ? 6 : isMajor ? 9 : 12}
                              x2="110"
                              y2="17"
                              stroke={active ? (isCardinal ? '#71f6ff' : 'rgba(0, 210, 238, 0.85)') : 'rgba(255, 255, 255, 0.08)'}
                              strokeWidth={isCardinal ? 2.5 : isMajor ? 1.5 : 1}
                              transform={`rotate(${angle} 110 110)`}
                            />
                          );
                        })}

                        {/* Background Base Ring */}
                        <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />

                        {/* Animated Glowing Progress Ring */}
                        <motion.circle
                          cx="110"
                          cy="110"
                          r={radius}
                          fill="none"
                          stroke="url(#cyanTechGlow)"
                          strokeWidth="9"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          animate={{ strokeDashoffset: restDashoffset }}
                          transition={{ duration: isRestRunning ? 1.0 : 0.25, ease: 'linear' }}
                          style={{ filter: 'drop-shadow(0 0 14px rgba(0, 210, 238, 0.75))' }}
                        />
                      </svg>

                      {/* Center Readout Display in Angled High-Impact Style */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <motion.h3
                          key={restSecondsLeft}
                          initial={{ opacity: 0.8, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="font-['Big_Shoulders_Display',sans-serif] text-6xl font-black italic text-white tracking-tight leading-none"
                        >
                          {formatTime(restSecondsLeft)}
                        </motion.h3>
                        <span className="mt-1.5 font-mono text-[9px] font-black uppercase tracking-[0.24em] text-[var(--builder-accent,#00d2ee)]">
                          {isRestRunning ? (restSecondsLeft === 0 ? '¡LISTO!' : 'DESCANSO EN CURSO') : 'PREPARADO'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar & Telemetry Details */}
                    <div className="w-full space-y-1.5 relative z-10 pt-2 px-2">
                      <div className="flex items-center justify-between font-mono text-[8px] text-[#6E6558] font-bold uppercase tracking-wider">
                        <span>PROGRESO DEL DESCANSO</span>
                        <span className="text-[var(--builder-accent,#00d2ee)] font-black">{Math.round(restProgress)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden p-0.5 border border-white/[0.04]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--builder-accent,#00d2ee)] to-sky-300 shadow-[0_0_10px_rgba(0,210,238,0.6)]"
                          animate={{ width: `${restProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Deck with Canonical Fit Legacy Chamfer Buttons */}
                  <div className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-4 space-y-3.5 relative overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                    
                    {/* Primary 3-Button Control Bar */}
                    <div className="grid grid-cols-[50px_1fr_64px] gap-2.5 items-center">
                      {/* Reset / Stop Button */}
                      <EliteChamferButton
                        variant="dark"
                        onClick={resetRestTimer}
                        icon={<RotateCcw size={15} className="text-white/80" />}
                        className="!min-h-[46px] !px-0"
                        title="Reiniciar timer"
                      />

                      {/* Main Action Button in Vibrant Cyber Cyan */}
                      <EliteChamferButton
                        variant={isRestRunning ? 'cyan' : 'cyan'}
                        onClick={toggleRestTimer}
                        icon={isRestRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        className="!min-h-[46px] !text-[12px]"
                      >
                        {isRestRunning ? 'PAUSAR' : restSecondsLeft === 0 ? 'REINICIAR' : 'INICIAR'}
                      </EliteChamferButton>

                      {/* +30s Quick Increment */}
                      <EliteChamferButton
                        variant="dark"
                        onClick={() => addRestSeconds(30)}
                        icon={<Plus size={14} className="text-[var(--builder-accent,#00d2ee)]" />}
                        className="!min-h-[46px] !px-2 !text-[10px]"
                        title="Sumar 30 segundos"
                      >
                        30 S
                      </EliteChamferButton>
                    </div>

                    {/* Spacious Quick Presets (6-col Grid) */}
                    <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between px-1">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558]">
                          AJUSTE RÁPIDO
                        </span>
                        <span className="font-mono text-[8px] text-[var(--builder-accent-soft,#5ce1e6)] font-bold">
                          {restDuration}s objetivo
                        </span>
                      </div>

                      <div className="grid grid-cols-6 gap-1.5">
                        {QUICK_DURATIONS.map((duration) => {
                          const isSelected = restDuration === duration;
                          return (
                            <motion.button
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.92 }}
                              key={duration}
                              type="button"
                              onClick={() => setPresetRest(duration)}
                              className={`h-8 rounded-xl font-mono text-[10px] font-black transition-all flex items-center justify-center select-none ${
                                isSelected
                                  ? 'bg-[var(--builder-accent,#00d2ee)] text-black shadow-[0_0_12px_rgba(0,210,238,0.5)]'
                                  : 'bg-white/[0.03] border border-white/[0.07] text-[#9CA0A6] hover:text-white hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              {duration >= 60 ? `${duration / 60}m` : `${duration}s`}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fine Adjustment Row */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => addRestSeconds(-15)}
                        className="flex-1 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] font-mono text-[9px] font-bold text-[#9CA0A6] hover:text-white transition-colors"
                      >
                        −15 s
                      </button>
                      <button
                        type="button"
                        onClick={() => addRestSeconds(15)}
                        className="flex-1 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] font-mono text-[9px] font-bold text-[#9CA0A6] hover:text-white transition-colors"
                      >
                        +15 s
                      </button>
                      <button
                        type="button"
                        onClick={() => addRestSeconds(60)}
                        className="flex-1 py-1.5 rounded-lg bg-[var(--builder-accent,#00d2ee)]/10 border border-[var(--builder-accent,#00d2ee)]/30 font-mono text-[9px] font-bold text-[var(--builder-accent,#00d2ee)] hover:bg-[var(--builder-accent,#00d2ee)]/20 transition-colors"
                      >
                        +1 min
                      </button>
                    </div>
                  </div>

                  {/* XP Toast Notification */}
                  <AnimatePresence>
                    {showXpAward && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 shadow-lg"
                      >
                        <Award size={16} className="text-emerald-400 animate-bounce" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-white">
                          ¡Descanso completado! +1 XP Road
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Telemetry Last Session Card */}
                  {lastCompletedRest && (
                    <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Flame size={15} className="text-[var(--builder-accent,#00d2ee)]" />
                        <div>
                          <p className="font-mono text-[9px] font-bold text-white uppercase">Último Descanso</p>
                          <p className="font-mono text-[8px] text-[#6E6558]">{restDuration} segundos recuperados</p>
                        </div>
                      </div>
                      <time className="font-mono text-[9px] font-bold text-[var(--builder-accent-soft,#5ce1e6)]">
                        {new Date(lastCompletedRest).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </time>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ═══════════════════════════════════════════
                  SCREEN 2 — CRONÓGRAFO (Performance Timing)
                  ═══════════════════════════════════════════ */}
              {activeTab === 'chrono' && (
                <motion.div
                  key="screen-chrono"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-4"
                >
                  <div className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-6 space-y-4 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
                    <TechGrid />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5">
                        <Clock size={12} className="text-[var(--builder-accent,#00d2ee)]" />
                        PERFORMANCE TIMING
                      </span>
                      {isChronoRunning && (
                        <span className="font-mono text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                          EN CARRERA
                        </span>
                      )}
                    </div>

                    {/* Precision Digital Split HUD Display */}
                    <div className="flex items-baseline justify-center gap-2 py-5 relative z-10">
                      <div className="text-center">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-6xl font-black text-white tracking-tight">
                          {chronoParts.minutes}
                        </span>
                        <span className="block font-mono text-[8px] font-bold text-[#6E6558] uppercase">MIN</span>
                      </div>
                      <span className="font-['Big_Shoulders_Display',sans-serif] text-5xl font-black text-[var(--builder-accent,#00d2ee)]">:</span>
                      <div className="text-center">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-6xl font-black text-white tracking-tight">
                          {chronoParts.seconds}
                        </span>
                        <span className="block font-mono text-[8px] font-bold text-[#6E6558] uppercase">SEG</span>
                      </div>
                      <span className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black text-[var(--builder-accent,#00d2ee)]">.</span>
                      <div className="text-center">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-6xl font-black text-[var(--builder-accent-soft,#5ce1e6)] tracking-tight">
                          {chronoParts.centiseconds}
                        </span>
                        <span className="block font-mono text-[8px] font-bold text-[#6E6558] uppercase">1/100</span>
                      </div>
                    </div>

                    {/* Chrono Controls */}
                    <div className="grid grid-cols-[50px_1fr_64px] gap-2.5 relative z-10 pt-2 border-t border-white/[0.06]">
                      <EliteChamferButton
                        variant="dark"
                        onClick={resetChrono}
                        icon={<RotateCcw size={15} />}
                        disabled={chronoElapsedMs === 0}
                        className="!min-h-[46px] !px-0"
                        title="Reiniciar cronógrafo"
                      />

                      <EliteChamferButton
                        variant="cyan"
                        onClick={toggleChrono}
                        icon={isChronoRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        className="!min-h-[46px] !text-[12px]"
                      >
                        {isChronoRunning ? 'PAUSAR' : chronoElapsedMs > 0 ? 'CONTINUAR' : 'INICIAR'}
                      </EliteChamferButton>

                      <EliteChamferButton
                        variant="dark"
                        onClick={recordChronoLap}
                        disabled={!isChronoRunning}
                        className="!min-h-[46px] !px-2 !text-[10px]"
                        title="Guardar vuelta (lap)"
                      >
                        VUELTA
                      </EliteChamferButton>
                    </div>
                  </div>

                  {/* Laps Ledger Card */}
                  {chronoLaps.length > 0 && (
                    <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-4 space-y-2">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block">
                        TIEMPOS DE VUELTA REGISTRADOS
                      </span>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {chronoLaps.map((lapMs, idx) => {
                          const parts = splitMs(lapMs);
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                            >
                              <span className="font-mono text-[9px] font-bold text-[#6E6558]">
                                Vuelta #{chronoLaps.length - idx}
                              </span>
                              <span className="font-mono text-[11px] font-black text-white">
                                {parts.minutes}:{parts.seconds}.{parts.centiseconds}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ═══════════════════════════════════════════
                  SCREEN 3 — INTERVALOS (HIIT & Strength Cycles)
                  ═══════════════════════════════════════════ */}
              {activeTab === 'intervals' && (
                <motion.div
                  key="screen-intervals"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-4"
                >
                  <div className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
                    <TechGrid />

                    <div className="w-full flex items-center justify-between relative z-10 mb-1 px-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${isWorkPhase ? 'bg-[var(--builder-accent,#00d2ee)]' : 'bg-rose-500'} shadow-[0_0_8px_currentColor] animate-pulse`} />
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)]">
                          {selectedInterval.label} · Ronda {Math.min(currentRound + 1, selectedInterval.rounds)}/{selectedInterval.rounds}
                        </span>
                      </div>
                      <span className={`font-mono text-[8px] font-black px-2 py-0.5 rounded border ${
                        isWorkPhase ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                      }`}>
                        {isWorkPhase ? 'TRABAJO' : 'DESCANSO'}
                      </span>
                    </div>

                    {/* Radial SVG Ring */}
                    <div className="relative w-48 h-48 flex items-center justify-center my-3 select-none">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="intWorkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#71f6ff" />
                            <stop offset="100%" stopColor="#0284c7" />
                          </linearGradient>
                          <linearGradient id="intRestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fda4af" />
                            <stop offset="100%" stopColor="#f43f5e" />
                          </linearGradient>
                        </defs>

                        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />

                        <motion.circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="none"
                          stroke={isWorkPhase ? 'url(#intWorkGrad)' : 'url(#intRestGrad)'}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          animate={{ strokeDashoffset: intervalDashoffset }}
                          transition={{ duration: isIntervalRunning ? 1.0 : 0.25, ease: 'linear' }}
                          style={{
                            filter: isWorkPhase
                              ? 'drop-shadow(0 0 14px rgba(0, 210, 238, 0.75))'
                              : 'drop-shadow(0 0 14px rgba(244, 63, 94, 0.75))',
                          }}
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <motion.h3
                          key={intervalSecondsLeft}
                          initial={{ opacity: 0.8, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="font-['Big_Shoulders_Display',sans-serif] text-5xl font-black italic text-white tracking-tight leading-none"
                        >
                          {formatTime(intervalSecondsLeft)}
                        </motion.h3>
                        <span className={`mt-1 font-mono text-[9px] font-black uppercase tracking-widest ${
                          isWorkPhase ? 'text-cyan-400' : 'text-rose-400'
                        }`}>
                          {isWorkPhase ? '⚡ EMPUJE' : '🛑 RECUPERACIÓN'}
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="w-full grid grid-cols-[50px_1fr] gap-2.5 relative z-10 pt-2 border-t border-white/[0.06]">
                      <EliteChamferButton
                        variant="dark"
                        onClick={resetIntervalTimer}
                        icon={<RotateCcw size={15} />}
                        className="!min-h-[46px] !px-0"
                      />

                      <EliteChamferButton
                        variant={isIntervalRunning ? (isWorkPhase ? 'cyan' : 'danger') : 'cyan'}
                        onClick={toggleIntervalTimer}
                        icon={isIntervalRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        className="!min-h-[46px] !text-[12px]"
                      >
                        {isIntervalRunning ? 'PAUSAR' : 'INICIAR PROTOCOLO'}
                      </EliteChamferButton>
                    </div>
                  </div>

                  {/* Protocol Selector */}
                  <div className="space-y-2">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block px-1">
                      PROTOCOLOS VANGUARD DISPONIBLES
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {INTERVAL_PRESETS.map((preset) => {
                        const isSelected = selectedInterval.key === preset.key;
                        return (
                          <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            key={preset.key}
                            type="button"
                            onClick={() => selectIntervalProtocol(preset)}
                            className="p-3 text-left transition-all relative overflow-hidden select-none rounded-2xl"
                            style={{
                              clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                              background: isSelected
                                ? 'linear-gradient(135deg, rgba(0, 210, 238, 0.16) 0%, rgba(2, 132, 199, 0.1) 100%)'
                                : '#07070a',
                              border: isSelected
                                ? '1px solid var(--builder-accent, #00d2ee)'
                                : '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: isSelected
                                ? '-1px 1px 0px var(--builder-accent, #00d2ee), 0 4px 14px rgba(0, 210, 238, 0.25)'
                                : 'none',
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] font-bold text-white uppercase">{preset.label}</span>
                              <UiIcon name={preset.icon} size={13} active={isSelected} />
                            </div>
                            <p className="font-mono text-[9px] text-[var(--builder-accent-soft,#5ce1e6)] font-bold">
                              {formatTime(preset.work)} T / {formatTime(preset.rest)} D ({preset.rounds}r)
                            </p>
                            <p className="text-[9px] text-[#6E6558] mt-1 line-clamp-1">{preset.description}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
