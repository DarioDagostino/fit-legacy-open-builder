import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, Plus, Square, Volume2, VolumeX } from 'lucide-react';
import { recordBuilderRestTimerSession } from '../builderToolLedger';
import { PinkCandleTrend } from './PinkCandleTrend';
import { UiIcon } from '../UiIcon';

interface RestTimerProps {
  onRewardXp?: (xp: number) => void;
}

const INTERVAL_PRESETS = [
  { key: 'strength', label: 'Fuerza', description: 'Pausas largas para series pesadas', work: 180, rest: 300, rounds: 5 },
  { key: 'hypertrophy', label: 'Hipertrofia', description: 'Ritmo sostenible para volumen', work: 45, rest: 90, rounds: 4 },
  { key: 'endurance', label: 'Resistencia', description: 'Cadencia continua y controlada', work: 30, rest: 60, rounds: 6 },
  { key: 'power', label: 'Potencia', description: 'Explosividad con recuperación total', work: 10, rest: 180, rounds: 8 },
] as const;

const QUICK_DURATIONS = [30, 45, 60, 90, 120, 180] as const;

type IntervalPreset = (typeof INTERVAL_PRESETS)[number];

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function RestTimer({ onRewardXp }: RestTimerProps) {
  const [mode, setMode] = useState<'single' | 'interval'>('single');
  const [seconds, setSeconds] = useState(60);
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showXpAward, setShowXpAward] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<IntervalPreset | null>(null);
  const [lastCompletedRest, setLastCompletedRest] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const activeSeconds = useMemo(() => {
    if (mode === 'interval' && selectedPreset) return isWorkPhase ? selectedPreset.work : selectedPreset.rest;
    return initialSeconds;
  }, [initialSeconds, isWorkPhase, mode, selectedPreset]);

  const progress = activeSeconds > 0 ? Math.max(0, Math.min(100, (1 - seconds / activeSeconds) * 100)) : 0;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (seconds / Math.max(activeSeconds, 1)) * circumference;
  const innerRadius = 78;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerStrokeDashoffset = innerCircumference - (seconds / Math.max(activeSeconds, 1)) * innerCircumference;
  const ringTickCount = 48;
  const remainingRatio = seconds / Math.max(activeSeconds, 1);
  const phaseLabel = mode === 'interval' && selectedPreset ? (isWorkPhase ? 'Trabajo' : 'Descanso') : 'Descanso';
  const waitingForPreset = mode === 'interval' && !selectedPreset;
  const isRecoveryPhase = mode === 'interval' && Boolean(selectedPreset) && !isWorkPhase;
  const ringColors = isRecoveryPhase
    ? { start: '#fff5f9', mid: '#d8cbb8', end: '#a79a87', glow: 'rgba(255, 217, 231, 0.3)' }
    : {
        start: 'var(--rest-ring-start, #ff9fc2)',
        mid: 'var(--rest-ring-mid, #f0629b)',
        end: 'var(--rest-ring-end, #d82e72)',
        glow: 'var(--rest-ring-glow, rgba(239, 122, 166, 0.42))',
      };

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

  const playPing = useCallback(() => {
    if (!soundEnabled) return;
    const context = ensureAudioContext();
    if (!context) return;
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      gain.gain.setValueAtTime(0.12, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.6);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.6);
    } catch {
      // El audio puede estar bloqueado hasta la primera interacción del usuario.
    }
  }, [ensureAudioContext, soundEnabled]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return undefined;
    }

    timerRef.current = window.setInterval(() => {
      setSeconds((previous) => {
        if (previous > 1) return previous - 1;

        playPing();
        if (mode === 'interval' && selectedPreset) {
          if (isWorkPhase) {
            setIsWorkPhase(false);
            setInitialSeconds(selectedPreset.rest);
            return selectedPreset.rest;
          }

          const nextRound = currentRound + 1;
          if (nextRound >= selectedPreset.rounds) {
            setIsRunning(false);
            setLastCompletedRest(Date.now());
            setShowXpAward(true);
            onRewardXp?.(selectedPreset.rounds);
            recordBuilderRestTimerSession({
              durationSeconds: selectedPreset.work * selectedPreset.rounds + selectedPreset.rest * (selectedPreset.rounds - 1),
              mode: 'interval',
              preset: selectedPreset.label,
              rounds: selectedPreset.rounds,
              xpEarned: selectedPreset.rounds,
            });
            window.setTimeout(() => setShowXpAward(false), 3000);
            return 0;
          }

          setCurrentRound(nextRound);
          setIsWorkPhase(true);
          setInitialSeconds(selectedPreset.work);
          return selectedPreset.work;
        }

        setIsRunning(false);
        setLastCompletedRest(Date.now());
        setShowXpAward(true);
        onRewardXp?.(1);
        recordBuilderRestTimerSession({ durationSeconds: initialSeconds, mode: 'single', xpEarned: 1 });
        window.setTimeout(() => setShowXpAward(false), 3000);
        return 0;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentRound, initialSeconds, isRunning, isWorkPhase, mode, onRewardXp, playPing, selectedPreset]);

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setIsWorkPhase(true);
    const restartAt = mode === 'interval' && selectedPreset ? selectedPreset.work : initialSeconds;
    setInitialSeconds(restartAt);
    setSeconds(restartAt);
  };

  const selectMode = (nextMode: 'single' | 'interval') => {
    setIsRunning(false);
    setMode(nextMode);
    if (nextMode === 'single') {
      setSelectedPreset(null);
      setCurrentRound(0);
      setIsWorkPhase(true);
      setSeconds(initialSeconds);
    }
  };

  const selectPreset = (preset: IntervalPreset) => {
    setIsRunning(false);
    setSelectedPreset(preset);
    setMode('interval');
    setCurrentRound(0);
    setIsWorkPhase(true);
    setInitialSeconds(preset.work);
    setSeconds(preset.work);
  };

  const clearPreset = () => {
    setIsRunning(false);
    setSelectedPreset(null);
    setMode('single');
    setCurrentRound(0);
    setIsWorkPhase(true);
    setSeconds(initialSeconds);
  };

  const setDuration = (duration: number) => {
    setIsRunning(false);
    setMode('single');
    setSelectedPreset(null);
    setInitialSeconds(duration);
    setSeconds(duration);
  };

  const addSeconds = () => {
    setSeconds((value) => value + 30);
    setInitialSeconds((value) => value + 30);
  };

  const adjustSingleTimer = (delta: number) => {
    if (mode !== 'single') return;
    const nextDuration = Math.max(15, seconds + delta);
    setIsRunning(false);
    setInitialSeconds(nextDuration);
    setSeconds(nextDuration);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      const context = ensureAudioContext();
      if (context?.state === 'suspended') void context.resume();
    }
    setIsRunning((running) => !running);
  };

  return (
    <section className="rest-tool rest-tool--phone vanguard-tool--phone" aria-labelledby="rest-timer-title">
      <div className="rest-phone" aria-label="Mock smartphone Timer">
        <div className="rest-phone__bezel">
          <div className="rest-phone__speaker" aria-hidden="true" />
          <div className="rest-phone__screen">
            <header className="rest-phone__topbar">
              <div>
                <span className="rest-tool__eyebrow">Vanguard Tools · Recovery</span>
                <h2 id="rest-timer-title">Timer</h2>
              </div>
              <button className="rest-tool__sound" type="button" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-label={soundEnabled ? 'Silenciar aviso' : 'Activar aviso'} title={soundEnabled ? 'Silenciar aviso' : 'Activar aviso'}>
                {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
              </button>
            </header>

            {selectedPreset && (
              <div className="rest-tool__protocol">
                <div><span className="rest-tool__label">Protocolo activo</span><strong>{selectedPreset.label}</strong></div>
                <span>Ronda {Math.min(currentRound + 1, selectedPreset.rounds)} / {selectedPreset.rounds} · {phaseLabel}</span>
                <button type="button" onClick={clearPreset} aria-label="Quitar protocolo" title="Quitar protocolo"><UiIcon name="cancel-2" size={16} duo /></button>
              </div>
            )}

            <div className="rest-tool__workspace">
              <section className={`rest-tool__core ${waitingForPreset ? 'is-awaiting' : ''}`} aria-live="polite">
                <div className={`rest-tool__ring ${isRunning ? 'is-running' : ''}`}>
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                      <linearGradient id="restTimerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={ringColors.start} />
                        <stop offset="55%" stopColor={isRecoveryPhase ? '#d8cbb8' : ringColors.mid} />
                        <stop offset="100%" stopColor={ringColors.end} />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="96" className="rest-tool__ring-outer-track" />
                    <circle cx="100" cy="100" r="93" className="rest-tool__ring-orbit" strokeDasharray="1.5 7" />
                    <g className="rest-tool__ring-ticks">
                      {Array.from({ length: ringTickCount }, (_, index) => (
                        <line
                          key={index}
                          x1="100"
                          y1={index % 4 === 0 ? 7 : 10}
                          x2="100"
                          y2="14"
                          className={index / ringTickCount <= remainingRatio ? 'is-active' : ''}
                          transform={`rotate(${index * (360 / ringTickCount)} 100 100)`}
                        />
                      ))}
                    </g>
                    <circle cx="100" cy="100" r={radius} className="rest-tool__ring-track" strokeWidth="7" />
                    <motion.circle cx="100" cy="100" r={radius} className="rest-tool__ring-progress" stroke="url(#restTimerGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} animate={{ strokeDashoffset }} transition={{ duration: isRunning ? 1.05 : 0.25, ease: 'linear' }} style={{ filter: `drop-shadow(0 0 9px ${ringColors.glow})` }} />
                    <circle cx="100" cy="100" r={innerRadius} className="rest-tool__ring-inner-track" strokeDasharray="1 5" />
                    <motion.circle cx="100" cy="100" r={innerRadius} className="rest-tool__ring-inner-progress" stroke={ringColors.mid} strokeDasharray={innerCircumference} animate={{ strokeDashoffset: innerStrokeDashoffset }} transition={{ duration: isRunning ? 1.05 : 0.25, ease: 'linear' }} />
                  </svg>
                  <div className="rest-tool__readout">
                    {waitingForPreset ? (
                      <><strong>Listo</strong><span>Elegí un protocolo</span></>
                    ) : (
                      <><motion.strong key={seconds} initial={{ opacity: 0.45, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>{formatTime(seconds)}</motion.strong><span>{isRunning ? phaseLabel : 'Preparado'}</span></>
                    )}
                  </div>
                </div>

                <div className="rest-tool__progress"><span>{mode === 'interval' && selectedPreset ? `Ronda ${Math.min(currentRound + 1, selectedPreset.rounds)} de ${selectedPreset.rounds}` : 'Progreso del descanso'}</span><strong>{Math.round(progress)}%</strong><i><b style={{ width: `${progress}%` }} /></i></div>
              </section>

              <aside className="rest-tool__controls">
                <div className="rest-tool__quick-settings">
                  <div className="rest-tool__actions">
                    <button type="button" className="rest-tool__start fl-cut-cta fl-cut-cta--primary" onClick={toggleTimer} disabled={waitingForPreset}>{isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}<span>{isRunning ? 'Pausar' : 'Iniciar'}</span></button>
                    <button type="button" className="rest-tool__reset fl-cut-cta fl-cut-cta--secondary" onClick={resetTimer} disabled={waitingForPreset} aria-label="Detener y reiniciar timer" title="Detener y reiniciar"><Square size={18} fill="currentColor" /></button>
                    <button type="button" className="rest-tool__add fl-cut-cta fl-cut-cta--secondary" onClick={addSeconds} disabled={waitingForPreset} aria-label="Sumar 30 segundos" title="Sumar 30 segundos"><Plus size={17} /><span>30 s</span></button>
                  </div>
                  <span className="rest-tool__label">Ajuste rápido</span>
                  <div className="rest-tool__duration-grid" role="group" aria-label="Ajustes rápidos de duración">
                    {QUICK_DURATIONS.map((duration) => <button key={duration} type="button" className={mode === 'single' && initialSeconds === duration ? 'is-selected' : ''} onClick={() => setDuration(duration)}>{duration >= 60 ? `${duration / 60}m` : `${duration}s`}</button>)}
                  </div>
                  {mode === 'single' && <div className="rest-tool__fine-tune"><button type="button" onClick={() => adjustSingleTimer(-15)} aria-label="Restar 15 segundos">−15 s</button><span>Ajuste fino</span><button type="button" onClick={() => adjustSingleTimer(15)} aria-label="Sumar 15 segundos">+15 s</button></div>}
                </div>
                <p className="rest-tool__hint">{selectedPreset ? `${formatTime(selectedPreset.work)} de trabajo y ${formatTime(selectedPreset.rest)} de descanso.` : 'Usá 90–120 s para recuperar fuerza entre series exigentes.'}</p>
              </aside>
            </div>

            <AnimatePresence>
              {showXpAward && <motion.div className="rest-tool__award" initial={{ opacity: 0, y: 10, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}><UiIcon name="reward" size={18} duo /><span>Descanso completo · +XP Road</span></motion.div>}
            </AnimatePresence>

            {lastCompletedRest && (
              <section className="rest-tool__history" aria-label="Último descanso registrado">
                <span className="rest-tool__label">Última sesión</span>
                <strong>Descanso completo</strong>
                <time dateTime={new Date(lastCompletedRest).toISOString()}>{new Date(lastCompletedRest).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</time>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

