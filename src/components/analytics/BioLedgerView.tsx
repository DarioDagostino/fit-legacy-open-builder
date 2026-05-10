import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import {
  Zap, Crown, Flame, Brain, Dna, Share2,
  ShieldCheck, Cpu, Beef, Wheat, Droplet,
  Dumbbell, Activity, Lock, CheckCircle2, Loader2,
  ImagePlus, X, Palette
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useWorkoutStore } from '../../lib/store';

// ─── Animated Number ────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: v => setDisplay(Math.floor(v)) });
    return ctrl.stop;
  }, [value]);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}

// ─── Macro Ring ──────────────────────────────────────────────────────────────
function MacroRing({ value, max, color, label, icon }: { value: number; max: number; color: string; label: string; icon: React.ReactNode }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 28;
  const offset = circumference * (1 - pct / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
          <motion.circle
            cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-center">
        <div className="text-sm font-black" style={{ color }}>{Math.round(value)}g</div>
        <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

// ─── Stat Pill ───────────────────────────────────────────────────────────────
function StatPill({ label, value, icon, accent }: { label: string; value: React.ReactNode; icon: React.ReactNode; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative bg-zinc-900/60 backdrop-blur border border-white/5 rounded-2xl p-4 overflow-hidden group hover:border-white/10 transition-all"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ background: `radial-gradient(circle at 20% 50%, ${accent}10 0%, transparent 70%)` }} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-xl font-black tracking-tight">{value}</div>
    </motion.div>
  );
}

// ─── Muscle Group Bar ────────────────────────────────────────────────────────
const MUSCLE_COLORS: Record<string, string> = {
  chest: '#a855f7', back: '#3b82f6', legs: '#22c55e',
  shoulders: '#f59e0b', arms: '#ec4899', core: '#06b6d4',
  cardio: '#ef4444', default: '#6b7280',
};

function MuscleBar({ group, count, max }: { group: string; count: number; max: number }) {
  const color = MUSCLE_COLORS[group.toLowerCase()] || MUSCLE_COLORS.default;
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest w-16 shrink-0">{group}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[9px] font-black w-4 text-right" style={{ color }}>{count}</span>
    </div>
  );
}

// ─── BG Presets ──────────────────────────────────────────────────────────────
const BG_PRESETS = [
  { id: 'noir',    label: 'Noir',    style: { background: '#080808' } },
  { id: 'cyber',   label: 'Cyber',   style: { background: 'linear-gradient(135deg, #0a0a1a 0%, #000d1a 100%)' } },
  { id: 'purple',  label: 'Phantom', style: { background: 'linear-gradient(135deg, #0d0010 0%, #1a0030 100%)' } },
  { id: 'matrix',  label: 'Matrix',  style: { background: 'linear-gradient(135deg, #000d00 0%, #001a00 100%)' } },
  { id: 'ember',   label: 'Ember',   style: { background: 'linear-gradient(135deg, #1a0500 0%, #0d0000 100%)' } },
];

// ─── Local Config Hook ────────────────────────────────────────────────────────
const LS_KEY = 'bioledger-config';
function useLedgerConfig() {
  const stored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LS_KEY) || '{}') : {};
  const [logo, setLogoState] = useState<string | null>(stored.logo || null);
  const [bgId, setBgId] = useState<string>(stored.bgId || 'noir');
  const [bgImage, setBgImage] = useState<string | null>(stored.bgImage || null);

  const saveLogo = (url: string | null) => {
    setLogoState(url);
    localStorage.setItem(LS_KEY, JSON.stringify({ logo: url, bgId, bgImage }));
  };
  const saveBg = (id: string, img: string | null = null) => {
    setBgId(id);
    setBgImage(img);
    localStorage.setItem(LS_KEY, JSON.stringify({ logo, bgId: id, bgImage: img }));
  };

  const activeBg = bgImage
    ? { background: `url(${bgImage}) center/cover no-repeat` }
    : BG_PRESETS.find(p => p.id === bgId)?.style || BG_PRESETS[0].style;

  return { logo, saveLogo, bgId, bgImage, saveBg, activeBg };
}

// ─── Mint Button States ───────────────────────────────────────────────────────
const MINT_STEPS = [
  'VALIDATING SESSION...',
  'ENCODING BIOMETRICS...',
  'ANCHORING TO LEDGER...',
  '✓ PROOF MINTED',
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function BioLedgerView() {
  const { currentRoutine } = useWorkoutStore();
  const exercises = currentRoutine.exercises || [];
  const foods = currentRoutine.foods || [];

  const { logo, saveLogo, bgId, bgImage, saveBg, activeBg } = useLedgerConfig();
  const [showCustomize, setShowCustomize] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [liveStats, setLiveStats] = useState({ xp: 0, level: 1, coincitos: 0, streak: 0 });
  const [mintStep, setMintStep] = useState(-1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintDone, setMintDone] = useState(false);
  const [scanlineY, setScanlineY] = useState(0);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => saveLogo(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => saveBg('custom', ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Scanline loop
  useEffect(() => {
    const ctrl = animate(0, 100, {
      duration: 8, repeat: Infinity, ease: 'linear',
      onUpdate: v => setScanlineY(v)
    });
    return ctrl.stop;
  }, []);

  // Fetch Supabase stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const [balRes, strRes] = await Promise.all([
          supabase.from('economy_balances').select('xp, level, coincitos').eq('user_id', user.id).single(),
          supabase.from('streaks').select('current_streak').eq('user_id', user.id).single(),
        ]);
        setLiveStats({
          xp: balRes.data?.xp || 0,
          level: balRes.data?.level || 1,
          coincitos: balRes.data?.coincitos || 0,
          streak: strRes.data?.current_streak || 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Derived Metrics ──────────────────────────────────────────────────────
  const macros = useMemo(() => {
    return foods.reduce((acc, f) => {
      const factor = f.quantity / 100;
      return {
        protein: acc.protein + (f.protein || 0) * factor,
        carbs: acc.carbs + (f.carbs || 0) * factor,
        fats: acc.fats + (f.fats || 0) * factor,
        calories: acc.calories + (f.calories || 0) * factor,
      };
    }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
  }, [foods]);

  const totalMacros = macros.protein + macros.carbs + macros.fats;

  const muscleGroups = useMemo(() => {
    const map: Record<string, number> = {};
    exercises.forEach(ex => {
      const s = (ex.section || 'custom').toLowerCase();
      map[s] = (map[s] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [exercises]);

  const maxMuscleCount = muscleGroups[0]?.[1] || 1;

  const totalVolume = exercises.reduce((acc, ex) => acc + ex.sets * ex.reps * (ex.weight || 1), 0);
  const sessionXP = exercises.length * 15 + foods.length * 5;
  const isEmpty = exercises.length === 0 && foods.length === 0;

  // ── Mint Handler ─────────────────────────────────────────────────────────
  const handleMint = async () => {
    if (isMinting || isEmpty) return;
    setIsMinting(true);
    setMintDone(false);
    for (let i = 0; i < MINT_STEPS.length; i++) {
      setMintStep(i);
      await new Promise(r => setTimeout(r, i === MINT_STEPS.length - 1 ? 800 : 1100));
    }
    setMintDone(true);
    setLiveStats(prev => ({ ...prev, xp: prev.xp + sessionXP, coincitos: prev.coincitos + Math.floor(sessionXP / 10) }));
    setTimeout(() => { setIsMinting(false); setMintStep(-1); }, 2500);
  };

  // ── Ticker data ──────────────────────────────────────────────────────────
  const weekData = [
    { d: 'L', v: 40 }, { d: 'M', v: 65 }, { d: 'M', v: 30 },
    { d: 'J', v: 80 }, { d: 'V', v: 55 }, { d: 'S', v: 90 }, { d: 'D', v: 70 },
  ];

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden" style={activeBg}>

      {/* Grid BG */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      {/* Scanline */}
      <div className="absolute inset-x-0 h-[1px] bg-cyan-500/20 blur-sm pointer-events-none transition-none"
        style={{ top: `${scanlineY}%` }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />

      {/* ── Status Bar ── */}
      <div className="relative z-30 bg-black/60 backdrop-blur border-b border-white/5 py-2 px-6 flex items-center gap-8 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Bio-Ledger // Online</span>
        </div>
        <div className="flex items-center gap-6 text-[9px] font-mono text-zinc-600 uppercase tracking-wider overflow-hidden">
          <span>Exercises: <span className="text-white">{exercises.length}</span></span>
          <span>Foods: <span className="text-white">{foods.length}</span></span>
          <span>Vol: <span className="text-white">{totalVolume.toLocaleString()}kg</span></span>
          <span>Kcal: <span className="text-amber-500">{Math.round(macros.calories)}</span></span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Cpu className="w-3 h-3 text-cyan-500/50" />
          <span className="text-[9px] font-mono text-cyan-500/50 uppercase tracking-widest hidden sm:block">Neural Link: Stable</span>
          <button
            onClick={() => setShowCustomize(v => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all"
            aria-label="Personalizar BioLedger"
          >
            <Palette className="w-3 h-3 text-purple-400" />
            <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Personalizar</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/20 rounded-xl flex items-center justify-center overflow-hidden">
                  {logo
                    ? <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    : <Dna className="w-5 h-5 text-amber-500" />}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">
                  {currentRoutine.name || 'SESIÓN SIN NOMBRE'}
                </h1>
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">
                  Bio-Ledger Protocol // v1.0
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Session XP</span>
            <span className="text-sm font-black text-amber-500">+{sessionXP}</span>
          </div>
        </div>

        {/* ── Live Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatPill label="Lifetime XP" accent="#f59e0b"
            icon={<Zap className="w-4 h-4 text-amber-500" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm">—</span> : <AnimatedNumber value={liveStats.xp} />}
          />
          <StatPill label="Coincitos" accent="#eab308"
            icon={<Crown className="w-4 h-4 text-yellow-500" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm">—</span> : <AnimatedNumber value={liveStats.coincitos} prefix="$" />}
          />
          <StatPill label="Racha activa" accent="#ef4444"
            icon={<Flame className="w-4 h-4 text-rose-500" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm">—</span> : <AnimatedNumber value={liveStats.streak} suffix=" días" />}
          />
          <StatPill label="Nivel" accent="#a855f7"
            icon={<Brain className="w-4 h-4 text-purple-500" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm">—</span> : `Nivel ${liveStats.level}`}
          />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Exercise Load */}
          <div className="lg:col-span-2 space-y-4">

            {/* Muscle Map */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-purple-500" />
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Mapa Muscular</h3>
                </div>
                <span className="text-[9px] font-mono text-zinc-700 uppercase">{exercises.length} ejercicios</span>
              </div>
              {muscleGroups.length > 0 ? (
                <div className="space-y-3">
                  {muscleGroups.map(([group, count]) => (
                    <MuscleBar key={group} group={group} count={count} max={maxMuscleCount} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lock className="w-8 h-8 text-zinc-800 mb-3" />
                  <p className="text-xs font-mono text-zinc-700 uppercase tracking-widest">Sin ejercicios cargados</p>
                  <p className="text-[10px] text-zinc-800 mt-1">Agrega ejercicios en el catálogo</p>
                </div>
              )}
            </div>

            {/* Weekly Activity Sparkline */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-500" />
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Actividad Semanal</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-wider">Live</span>
                </div>
              </div>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 11, fontFamily: 'monospace' }}
                      itemStyle={{ color: '#06b6d4' }}
                      labelStyle={{ color: '#555', fontSize: 10 }}
                    />
                    <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={2} fill="url(#sparkGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right: Nutrition Panel */}
          <div className="space-y-4">

            {/* Macros Rings */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Beef className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Macros</h3>
              </div>
              {foods.length > 0 ? (
                <>
                  {/* Calorie headline */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-black tracking-tighter">
                      <AnimatedNumber value={Math.round(macros.calories)} />
                    </div>
                    <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">kcal totales</div>
                  </div>
                  {/* Rings */}
                  <div className="flex justify-around">
                    <MacroRing value={macros.protein} max={totalMacros} color="#f43f5e" label="Prot"
                      icon={<Beef className="w-4 h-4 text-rose-500" />} />
                    <MacroRing value={macros.carbs} max={totalMacros} color="#f59e0b" label="Carbs"
                      icon={<Wheat className="w-4 h-4 text-amber-500" />} />
                    <MacroRing value={macros.fats} max={totalMacros} color="#eab308" label="Grasa"
                      icon={<Droplet className="w-4 h-4 text-yellow-500" />} />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lock className="w-8 h-8 text-zinc-800 mb-3" />
                  <p className="text-xs font-mono text-zinc-700 uppercase tracking-widest">Sin alimentos</p>
                  <p className="text-[10px] text-zinc-800 mt-1">Agrega comidas al arsenal</p>
                </div>
              )}
            </div>

            {/* Volume Card */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Volumen Total</p>
                <p className="text-xl font-black">{totalVolume.toLocaleString()}<span className="text-xs text-zinc-600 ml-1">kg</span></p>
              </div>
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
            </div>

            {/* Shield */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Integridad WIR</p>
                <p className="text-xs font-black text-green-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verificado
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-green-500/20" />
            </div>
          </div>
        </div>

        {/* ── Mint CTA ── */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-tight">Mint Proof of Effort</h3>
              <p className="text-[10px] font-mono text-zinc-600">
                {isEmpty
                  ? 'Agrega ejercicios o alimentos para generar tu prueba de esfuerzo.'
                  : `Esta sesión generará +${sessionXP} XP y +${Math.floor(sessionXP / 10)} Coincitos al anclar.`}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <motion.button
                onClick={handleMint}
                disabled={isMinting || isEmpty}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-3 font-black text-xs uppercase tracking-widest overflow-hidden flex items-center gap-2 transition-all ${
                  mintDone
                    ? 'bg-green-500 text-black'
                    : isEmpty
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-zinc-100'
                }`}
              >
                {/* Shimmer */}
                {!isMinting && !mintDone && !isEmpty && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
                )}

                <AnimatePresence mode="wait">
                  {mintDone ? (
                    <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Anclado
                    </motion.span>
                  ) : isMinting ? (
                    <motion.span key="minting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-mono">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {mintStep >= 0 ? MINT_STEPS[mintStep] : 'Iniciando...'}
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-black" /> Mint
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button className="px-5 py-3 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> .WIR
              </button>
            </div>
          </div>

          {/* Progress bar during mint */}
          <AnimatePresence>
            {isMinting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((mintStep + 1) / MINT_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {MINT_STEPS.map((step, i) => (
                    <span key={step} className={`text-[8px] font-mono uppercase tracking-widest transition-colors ${i <= mintStep ? 'text-cyan-500' : 'text-zinc-700'}`}>
                      {i <= mintStep ? '✓' : '○'}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* -- Customize Panel -- */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-black uppercase tracking-widest">Personalizar</h2>
              </div>
              <button onClick={() => setShowCustomize(false)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Logo / Icono</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
                    {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Dna className="w-7 h-7 text-amber-500/40" />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest">
                      <ImagePlus className="w-3.5 h-3.5" /> Subir imagen
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                    {logo && <button onClick={() => saveLogo(null)} className="w-full px-3 py-1.5 text-[10px] font-mono text-zinc-600 hover:text-red-500 border border-white/5 rounded-xl transition-colors">Restaurar default</button>}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Fondo</p>
                <div className="grid grid-cols-2 gap-2">
                  {BG_PRESETS.map(preset => (
                    <button key={preset.id} onClick={() => saveBg(preset.id)}
                      className={`relative h-12 rounded-xl border transition-all overflow-hidden ${bgId === preset.id && !bgImage ? 'border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]' : 'border-white/5 hover:border-white/20'}`}
                      style={preset.style}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/70">{preset.label}</span>
                      </span>
                      {bgId === preset.id && !bgImage && <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />}
                    </button>
                  ))}
                </div>
                <label className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${bgImage ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}>
                  <ImagePlus className="w-3.5 h-3.5" /> {bgImage ? 'Imagen activa' : 'Imagen personalizada'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
                </label>
                {bgImage && <button onClick={() => saveBg('noir', null)} className="w-full px-3 py-1.5 text-[10px] font-mono text-zinc-600 hover:text-red-500 border border-white/5 rounded-xl transition-colors">Quitar imagen</button>}
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Preview</p>
                <div className="h-16 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center relative"
                  style={bgImage ? { background: `url(${bgImage}) center/cover no-repeat` } : BG_PRESETS.find(p => p.id === bgId)?.style}
                >
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                  <div className="relative flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/20 flex items-center justify-center">
                      {logo ? <img src={logo} className="w-full h-full object-cover rounded-lg" alt="preview" /> : <Dna className="w-3 h-3 text-amber-500" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight">BIO-LEDGER</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
