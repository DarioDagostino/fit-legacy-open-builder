import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Square } from 'lucide-react';
import { UiIcon } from '../UiIcon';

const STORAGE_KEY = 'fit-legacy-analytics:last-chronograph-session';

type ChronographSession = {
  completedAt: string;
  durationMs: number;
};

function readLastSession(): ChronographSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChronographSession;
    return Number.isFinite(parsed.durationMs) && parsed.durationMs > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function splitTime(durationMs: number) {
  const safeDuration = Math.max(0, durationMs);
  const minutes = Math.floor(safeDuration / 60_000);
  const seconds = Math.floor((safeDuration % 60_000) / 1_000);
  const centiseconds = Math.floor((safeDuration % 1_000) / 10);

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    centiseconds: centiseconds.toString().padStart(2, '0'),
  };
}

function formatSessionTime(durationMs: number) {
  const time = splitTime(durationMs);
  return `${time.minutes}:${time.seconds}.${time.centiseconds}`;
}

export function SportsChronograph() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showRunCue, setShowRunCue] = useState(false);
  const [lastSession, setLastSession] = useState<ChronographSession | null>(() => readLastSession());
  const accumulatedMsRef = useRef(0);
  const startedAtRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const runCueTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return undefined;

    const tick = (timestamp: number) => {
      setElapsedMs(accumulatedMsRef.current + timestamp - startedAtRef.current);
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning]);

  useEffect(() => () => {
    if (runCueTimeoutRef.current !== null) window.clearTimeout(runCueTimeoutRef.current);
  }, []);

  const display = useMemo(() => splitTime(elapsedMs), [elapsedMs]);

  const toggleChronograph = () => {
    if (isRunning) {
      accumulatedMsRef.current = elapsedMs;
      setIsRunning(false);
      setShowRunCue(false);
      return;
    }

    startedAtRef.current = performance.now();
    setIsRunning(true);
    setShowRunCue(true);
    if (runCueTimeoutRef.current !== null) window.clearTimeout(runCueTimeoutRef.current);
    runCueTimeoutRef.current = window.setTimeout(() => {
      setShowRunCue(false);
      runCueTimeoutRef.current = null;
    }, 1450);
  };

  const resetChronograph = () => {
    setIsRunning(false);
    setShowRunCue(false);
    accumulatedMsRef.current = 0;
    setElapsedMs(0);
  };

  const finishSession = () => {
    if (elapsedMs < 10) return;
    const session = { completedAt: new Date().toISOString(), durationMs: Math.round(elapsedMs) };
    setIsRunning(false);
    setShowRunCue(false);
    accumulatedMsRef.current = elapsedMs;
    setLastSession(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  return (
    <article className="sports-chrono" aria-labelledby="sports-chrono-title">
      <header className="sports-chrono__header">
        <div>
          <span className="sports-chrono__eyebrow">Performance timing</span>
          <h3 id="sports-chrono-title">Cronógrafo</h3>
        </div>
      </header>

      {showRunCue && <span className="sports-chrono__run-cue" role="status">En carrera</span>}

      <div className="sports-chrono__display" aria-live="off" aria-label={`Tiempo ${display.minutes} minutos, ${display.seconds} segundos y ${display.centiseconds} centésimas`}>
        <div><strong>{display.minutes}</strong><span>Min</span></div>
        <b aria-hidden="true">:</b>
        <div><strong>{display.seconds}</strong><span>Seg</span></div>
        <b aria-hidden="true">.</b>
        <div className="sports-chrono__fraction"><strong>{display.centiseconds}</strong><span>1/100</span></div>
      </div>

      <div className="sports-chrono__actions">
        <button className="sports-chrono__reset fl-cut-cta fl-cut-cta--secondary" type="button" onClick={resetChronograph} disabled={elapsedMs === 0} aria-label="Reiniciar cronógrafo" title="Reiniciar">
          <UiIcon name="change" size={18} active={elapsedMs > 0} />
        </button>
        <button className="sports-chrono__primary fl-cut-cta fl-cut-cta--primary" type="button" onClick={toggleChronograph}>
          {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          <span>{isRunning ? 'Pausar' : elapsedMs > 0 ? 'Continuar' : 'Iniciar'}</span>
        </button>
        <button className="sports-chrono__finish fl-cut-cta fl-cut-cta--secondary" type="button" onClick={finishSession} disabled={elapsedMs < 10} aria-label="Detener y guardar esta sesión" title="Detener y guardar sesión">
          <Square size={19} fill="currentColor" />
        </button>
      </div>

      {lastSession && (
        <section className="sports-chrono__last" aria-label="Última sesión registrada">
          <span><UiIcon name="validation-1" size={16} duo /> Última sesión</span>
          <strong>{formatSessionTime(lastSession.durationMs)}</strong>
          <time dateTime={lastSession.completedAt}>{new Date(lastSession.completedAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</time>
        </section>
      )}
    </article>
  );
}


