import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Play, ChevronDown, Activity, Zap, Sparkles } from 'lucide-react';
import { useWorkoutStore, type PersonalGoal } from '@/lib/store';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { UiIcon } from '../UiIcon';

type PersonalDestination = 'catalog' | 'build' | 'train' | 'calendar';

const GOAL_LABELS: Record<PersonalGoal, string> = {
  strength: 'Fuerza',
  muscle: 'Hipertrofia',
  conditioning: 'Rendimiento',
  wellbeing: 'Bienestar',
};

const DAYS_OF_WEEK = [
  { id: 1, name: 'L' },
  { id: 2, name: 'M' },
  { id: 3, name: 'X' },
  { id: 4, name: 'J' },
  { id: 5, name: 'V' },
  { id: 6, name: 'S' },
  { id: 0, name: 'D' },
];

const FALLBACK_RHYTHM = [42, 58, 47, 68, 54, 64, 50];

function sameCalendarDay(date: Date, reference: Date) {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  );
}

function densifyRhythm(values: number[], points = 28) {
  const source = values.length ? values : FALLBACK_RHYTHM;
  return Array.from({ length: points }, (_, index) => {
    const position = (index / Math.max(1, points - 1)) * (source.length - 1);
    const left = Math.floor(position);
    const right = Math.min(source.length - 1, Math.ceil(position));
    const base = source[left] + (source[right] - source[left]) * (position - left);
    const pulse = [0.84, 0.96, 1, 0.9][index % 4];
    return Math.max(10, Math.round(base * pulse));
  });
}

/* ─── Tech Grid Pattern ─── */
function TechGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="techGridHome" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGridHome)" />
    </svg>
  );
}

/* ─── Canonical Chamfered CTA Button ─── */
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
      whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
      className={`group relative min-h-[48px] px-6 py-3 flex items-center justify-center gap-2.5 font-mono text-[11px] font-black uppercase tracking-[0.16em] select-none ${
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

function BuilderWeeklyRhythm({
  sessions,
}: {
  sessions: Array<{ date: string; totalSets: number; totalReps: number }>;
}) {
  const dailyValues = useMemo(() => {
    const today = new Date();
    const values = Array.from({ length: 7 }, (_, offset) => {
      const reference = new Date(today);
      reference.setHours(0, 0, 0, 0);
      reference.setDate(today.getDate() - (6 - offset));
      return sessions
        .filter((session) => sameCalendarDay(new Date(session.date), reference))
        .reduce((sum, session) => sum + session.totalSets * 3 + session.totalReps / 12, 0);
    });
    return values.some(Boolean) ? values.map((value) => Math.round(value)) : FALLBACK_RHYTHM;
  }, [sessions]);

  const candles = densifyRhythm(dailyValues, 24);
  const maxValue = Math.max(72, ...candles);

  return (
    <section className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 space-y-4 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)]" aria-label="Ritmo semanal">
      <TechGrid />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--builder-accent,#00d2ee)] shadow-[0_0_8px_var(--builder-accent,#00d2ee)] animate-pulse" />
            RITMO SEMANAL
          </span>
          <h3 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic tracking-tight text-white leading-none mt-1">
            Hoy también cuenta
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <Activity size={12} className="text-[var(--builder-accent,#00d2ee)] animate-pulse" />
          <span className="font-mono text-[9px] font-black text-[var(--builder-accent,#00d2ee)]">SIGNAL</span>
        </div>
      </div>

      <p className="text-[11px] text-[#8a8990] leading-relaxed relative z-10">
        La carga viene subiendo más rápido que tu recuperación. Hoy conviene priorizar técnica y dejar una repetición en recámara.
      </p>

      {/* Spectral Candle Waveform Grid */}
      <div className="space-y-2 relative z-10 pt-1">
        <div className="flex items-end justify-between gap-[3px] h-16 py-1 select-none">
          {candles.map((value, index) => {
            const pct = Math.max(0.18, Math.min(1, value / maxValue));
            const upperPx = Math.round(8 + pct * 34);
            const lowerPx = Math.round(4 + pct * 16);

            // 4 chromatic zones: Green -> Cyan -> Amber -> Rose
            const isRose = index >= 18;
            const isAmber = index >= 12 && index < 18;
            const isCyan = index >= 6 && index < 12;

            const upperGradient = isRose
              ? 'linear-gradient(180deg, #fb7185 0%, #f43f5e 100%)'
              : isAmber
              ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)'
              : isCyan
              ? 'linear-gradient(180deg, #38bdf8 0%, #00d2ee 100%)'
              : 'linear-gradient(180deg, #34d399 0%, #059669 100%)';

            const lowerGradient = isRose
              ? 'linear-gradient(180deg, #be123c 0%, #881337 100%)'
              : isAmber
              ? 'linear-gradient(180deg, #b45309 0%, #78350f 100%)'
              : isCyan
              ? 'linear-gradient(180deg, #0284c7 0%, #0c4a6e 100%)'
              : 'linear-gradient(180deg, #047857 0%, #064e3b 100%)';

            return (
              <div key={index} className="flex-1 h-full flex flex-col items-center justify-center">
                <div className="w-full h-[40px] flex items-end justify-center">
                  <motion.div
                    className="w-full max-w-[8px] rounded-t-[2px]"
                    style={{ background: upperGradient }}
                    animate={{ height: [`${upperPx}px`, `${Math.min(39, upperPx + 2)}px`, `${upperPx}px`] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.05 }}
                  />
                </div>
                <div className="w-full h-[1px] bg-black/60 shrink-0" />
                <div className="w-full h-[22px] flex items-start justify-center">
                  <div
                    className="w-full max-w-[8px] rounded-b-[2px] opacity-60"
                    style={{ height: `${lowerPx}px`, background: lowerGradient }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between font-mono text-[8px] font-bold text-[#6E6558] pt-1 border-t border-white/[0.04] px-1">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>

      {/* Legacito Telemetry Insight Tag */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] relative z-10">
        <Sparkles size={13} className="text-[var(--builder-accent,#00d2ee)] shrink-0" />
        <p className="font-mono text-[9px] text-[#9CA0A6]">
          <strong className="text-white">Legacito IA:</strong> Una repetición limpia vale más que una carga fuera de ritmo.
        </p>
      </div>
    </section>
  );
}

export function PersonalHomePanel({
  onNavigate,
  onShare,
}: {
  onNavigate: (destination: PersonalDestination) => void;
  onShare: () => void;
}) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const profile = useWorkoutStore((state) => state.personalProfile);
  const updateProfile = useWorkoutStore((state) => state.updatePersonalProfile);
  const stats = useBioLedgerStore((state) => state.stats);
  const sessions = useBioLedgerStore((state) => state.sessions);

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const hasPlan = currentRoutine.exercises.length > 0;
  const today = useMemo(() => new Date(), []);
  const currentDayIndex = today.getDay();

  const sessionsThisWeek = useMemo(() => {
    const threshold = new Date();
    threshold.setHours(0, 0, 0, 0);
    threshold.setDate(threshold.getDate() - 6);
    return sessions.filter((session) => new Date(session.date) >= threshold).length;
  }, [sessions]);

  const routineName =
    currentRoutine.name && currentRoutine.name !== 'Untitled routine'
      ? currentRoutine.name
      : 'Mi rutina personal';

  const totalPlannedSets = useMemo(
    () => currentRoutine.exercises.reduce((total, ex) => total + ex.sets, 0),
    [currentRoutine.exercises],
  );

  const totalPlannedVolume = useMemo(
    () =>
      currentRoutine.exercises.reduce((total, ex) => total + ex.sets * ex.reps * (ex.weight || 1), 0),
    [currentRoutine.exercises],
  );

  const formattedDate = useMemo(() => {
    return today.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  }, [today]);

  return (
    <motion.div
      key="personal-home"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full overflow-y-auto p-4 pb-32 sm:p-6 lg:pb-12 !bg-[#000000]"
    >
      <div className="mx-auto max-w-xl space-y-5">
        
        {/* ── Top Header ── */}
        <header className="flex items-center justify-between pt-1">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--builder-accent,#00d2ee)] animate-pulse" />
              {formattedDate}
            </span>
            <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black italic tracking-tight text-white leading-none mt-0.5">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07070a] border border-white/[0.08]">
              <Flame size={13} className="text-rose-500" />
              <span className="font-mono text-[10px] font-black text-white">{stats.currentStreak}d</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07070a] border border-white/[0.08]">
              <span className="font-mono text-[9px] font-bold text-[#6E6558]">NV.</span>
              <span className="font-mono text-[10px] font-black text-[var(--builder-accent,#00d2ee)]">{stats.level}</span>
            </div>
          </div>
        </header>

        {/* ── Week Days Pill Bar ── */}
        <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-2xl bg-[#07070a] border border-white/[0.08]">
          {DAYS_OF_WEEK.map((d, index) => {
            const isToday = d.id === currentDayIndex;
            const isTargetDay = index < profile.daysPerWeek;
            return (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all ${
                  isToday
                    ? 'bg-[var(--builder-accent,#00d2ee)]/15 border border-[var(--builder-accent,#00d2ee)]/40 shadow-[0_0_12px_rgba(0,210,238,0.25)]'
                    : 'bg-transparent'
                }`}
              >
                <span className={`font-mono text-[10px] font-black ${isToday ? 'text-[var(--builder-accent,#00d2ee)]' : 'text-[#6E6558]'}`}>
                  {d.name}
                </span>
                <div
                  className={`mt-1 h-1 w-1 rounded-full ${
                    isToday ? 'bg-[var(--builder-accent,#00d2ee)]' : isTargetDay ? 'bg-white/30' : 'bg-transparent'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ── Weekly Load Rhythm Card ── */}
        <BuilderWeeklyRhythm sessions={sessions} />

        {/* ── Hero Training Plan Card ── */}
        <section className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 space-y-4 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
          <TechGrid />

          <div className="flex items-baseline justify-between relative z-10">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft,#5ce1e6)]">
              {hasPlan ? `SPLIT · ${profile.daysPerWeek} DÍAS` : 'NUEVO PLAN'}
            </span>
            <span className="font-mono text-[9px] font-bold text-[#6E6558]">
              {hasPlan ? `~${profile.sessionMinutes} MIN · ${totalPlannedSets} SERIES` : ''}
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black italic tracking-tight text-white leading-none">
              {hasPlan ? routineName : 'Creá tu plan'}
            </h3>
            <p className="mt-1.5 text-[12px] text-[#8a8990] leading-relaxed">
              {hasPlan
                ? `${currentRoutine.exercises.length} ejercicios calibrados para ${GOAL_LABELS[profile.goal].toLowerCase()}.`
                : 'Armá tu rutina personalizada y prepará tu próxima sesión en el gimnasio.'}
            </p>
          </div>

          {/* Exercise Tags */}
          {hasPlan && (
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {currentRoutine.exercises.slice(0, 5).map((ex) => (
                <span
                  key={ex.id}
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white"
                >
                  {ex.name} <span className="text-[var(--builder-accent,#00d2ee)]">({ex.sets}s)</span>
                </span>
              ))}
              {currentRoutine.exercises.length > 5 && (
                <span className="font-mono text-[9px] font-bold px-2 py-1 rounded-lg bg-white/[0.03] text-[#6E6558]">
                  +{currentRoutine.exercises.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Canonical Chamfer Action Button */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06] relative z-10">
            <EliteChamferButton
              variant="cyan"
              onClick={() => onNavigate(hasPlan ? 'train' : 'catalog')}
              icon={<Play size={15} fill="currentColor" />}
              className="w-full !min-h-[50px] !text-[12px]"
            >
              {hasPlan ? 'INICIAR ENTRENAMIENTO' : 'CREAR RUTINA'}
            </EliteChamferButton>

            {hasPlan && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onShare}
                className="w-full py-2.5 rounded-full bg-black border border-white/15 text-[#9CA0A6] hover:text-white hover:border-white/30 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <UiIcon name="cloud-data-transfer" size={14} active />
                Compartir plan .WIR
              </motion.button>
            )}
          </div>
        </section>

        {/* ── Key Metrics 3-Col Deck ── */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-3.5 text-center">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block">Sesiones</span>
            <p className="mt-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic text-white leading-none">
              {sessionsThisWeek}<small className="text-sm font-normal text-[#6E6558]">/{profile.daysPerWeek}</small>
            </p>
          </div>

          <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-3.5 text-center">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block">Volumen</span>
            <p className="mt-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic text-rose-400 leading-none">
              {hasPlan ? `${Math.round(totalPlannedVolume / 1000)}k` : '0'}
              <small className="text-xs font-mono text-[#6E6558]"> kg</small>
            </p>
          </div>

          <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-3.5 text-center">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block">Series</span>
            <p className="mt-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic text-[var(--builder-accent,#00d2ee)] leading-none">
              {totalPlannedSets}
            </p>
          </div>
        </div>

        {/* ── Quick Settings Accordion ── */}
        <div className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-4">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="flex w-full items-center justify-between text-left select-none"
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#6E6558]">
              AJUSTES · {profile.daysPerWeek}D · {GOAL_LABELS[profile.goal]}
            </span>
            <ChevronDown size={14} className={`text-[#6E6558] transition-transform duration-200 ${showSettings ? 'rotate-180 text-[var(--builder-accent,#00d2ee)]' : ''}`} />
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-3.5 border-t border-white/[0.06] mt-3">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558] block">
                      DÍAS POR SEMANA
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {[2, 3, 4, 5].map((d) => {
                        const isSelected = profile.daysPerWeek === d;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => updateProfile({ daysPerWeek: d })}
                            className={`py-2 rounded-xl font-mono text-[10px] font-black transition-all ${
                              isSelected
                                ? 'bg-[var(--builder-accent,#00d2ee)] text-black shadow-[0_0_12px_rgba(0,210,238,0.4)]'
                                : 'bg-white/[0.03] border border-white/[0.07] text-[#9CA0A6] hover:text-white'
                            }`}
                          >
                            {d} días
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate('build')}
                      className="font-mono text-[9px] font-bold text-[var(--builder-accent,#00d2ee)] hover:underline"
                    >
                      Editar ejercicios y cargas →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
