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

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: v => setDisplay(Math.floor(v)) });
    return ctrl.stop;
  }, [value]);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}

function MacroRing({ value, max, color, label, icon }: { value: number; max: number; color: string; label: string; icon: React.ReactNode }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 28;
  const offset = circumference * (1 - pct / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(224,121,60,0.14)" strokeWidth="5" />
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
        <div className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

function StatPill({ label, value, icon, accent }: { label: string; value: React.ReactNode; icon: React.ReactNode; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-4 overflow-hidden group hover:border-[#E0793C]/35 transition-all"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ background: `radial-gradient(circle at 20% 50%, ${accent}18 0%, transparent 72%)` }} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-xl font-black text-[#F1F0F4] tracking-tight">{value}</div>
    </motion.div>
  );
}

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
      <span className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest w-16 shrink-0">{group}</span>
      <div className="flex-1 h-1.5 bg-[#2A2520] rounded-full overflow-hidden">
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

const BG_PRESETS = [
  { id: 'noir',    label: 'Noir',    style: { background: '#0c0c0e' } },
  { id: 'cyber',   label: 'Cyber',   style: { background: 'linear-gradient(135deg, #0c0c0e 0%, #0a0a0c 100%)' } },
  { id: 'purple',  label: 'Phantom', style: { background: 'linear-gradient(135deg, #0c0c0e 0%, #1A0030 100%)' } },
  { id: 'matrix',  label: 'Matrix',  style: { background: 'linear-gradient(135deg, #0d000d 0%, #001a00 100%)' } },
  { id: 'ember',   label: 'Ember',   style: { background: 'linear-gradient(135deg, #0a0a0c 0%, #8A2F14 100%)' } },
];

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

const MINT_STEPS = [
  'VALIDATING SESSION...',
  'ENCODING BIOMETRICS...',
  'ANCHORING TO LEDGER...',
  '\u2713 PROOF MINTED',
];

export function BioLedgerView() {
  const { currentRoutine } = useWorkoutStore();
  const exercises = currentRoutine.exercises || [];
  const foods = currentRoutine.foods || [];

  const { logo, saveLogo, bgId, bgImage, saveBg, activeBg } = useLedgerConfig();
  const [showCustomize, setShowCustomize] = useState(false);
  const [showSystemMenu, setShowSystemMenu] = useState(false);

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

  useEffect(() => {
    const ctrl = animate(0, 100, {
      duration: 8, repeat: Infinity, ease: 'linear',
      onUpdate: v => setScanlineY(v)
    });
    return ctrl.stop;
  }, []);

  useEffect(() => {
    const handleToggleCustomize = () => setShowCustomize(v => !v);
    window.addEventListener('bioledger:toggle-customize', handleToggleCustomize);
    return () => window.removeEventListener('bioledger:toggle-customize', handleToggleCustomize);
  }, []);

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

  const weekData = [
    { d: 'L', v: 40 }, { d: 'M', v: 65 }, { d: 'M', v: 30 },
    { d: 'J', v: 80 }, { d: 'V', v: 55 }, { d: 'S', v: 90 }, { d: 'D', v: 70 },
  ];

  return (
    <div className="relative w-full min-h-screen text-[#F1F0F4] overflow-hidden" style={activeBg}>

      {/* Grid BG */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(224,121,60,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(224,121,60,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      {/* Scanline */}
      <div className="absolute inset-x-0 h-[1px] bg-cyan-500/20 blur-sm pointer-events-none transition-none"
        style={{ top: `${scanlineY}%` }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(22,19,15,0.5) 100%)' }} />

      {/* Lateral System Menu Trigger */}
      {!showCustomize && (
        <button
          onClick={() => setShowSystemMenu(v => !v)}
          className="fixed right-3 top-36 z-40 flex items-center gap-2 rounded-xl border border-[#2A2520] bg-[#0a0a0c] px-3 py-2 text-[#E0793C] shadow-[0_12px_28px_-16px_rgba(0,0,0,0.65)] backdrop-blur"
          aria-label="Abrir menú lateral de estado"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="text-[9px] font-mono uppercase tracking-widest">Estado</span>
        </button>
      )}

      <AnimatePresence>
        {showSystemMenu && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSystemMenu(false)}
              className="fixed inset-0 z-40 bg-[#0c0c0e]/60"
              aria-label="Cerrar menú lateral"
            />
            <motion.aside
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-3 top-48 z-50 w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border border-[#2A2520] bg-[#0a0a0c] p-4 shadow-[0_22px_50px_-28px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E0793C] rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-[#E0793C] uppercase tracking-widest">Bio-Ledger // Online</span>
                </div>
                <button
                  onClick={() => setShowSystemMenu(false)}
                  className="w-6 h-6 rounded-md border border-[#2A2520] text-[#9CA0A6] hover:text-[#F1F0F4] hover:bg-[#2A2520] flex items-center justify-center"
                  aria-label="Cerrar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-wide mb-3">
                <div className="rounded-lg border border-[#2A2520] bg-[#0c0c0e] p-2 text-[#9CA0A6]">Exercises: <span className="text-[#F1F0F4] font-black">{exercises.length}</span></div>
                <div className="rounded-lg border border-[#2A2520] bg-[#0c0c0e] p-2 text-[#9CA0A6]">Foods: <span className="text-[#F1F0F4] font-black">{foods.length}</span></div>
                <div className="rounded-lg border border-[#2A2520] bg-[#0c0c0e] p-2 text-[#9CA0A6]">Vol: <span className="text-[#F1F0F4] font-black">{totalVolume.toLocaleString()}kg</span></div>
                <div className="rounded-lg border border-[#2A2520] bg-[#0c0c0e] p-2 text-[#9CA0A6]">Kcal: <span className="text-[#E0793C] font-black">{Math.round(macros.calories)}</span></div>
              </div>

              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-[#E0793C]" />
                <span className="text-[9px] font-mono text-[#E0793C] uppercase tracking-widest">Neural Link: Stable</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E0793C]/20 to-transparent border border-[#E0793C]/20 rounded-xl flex items-center justify-center overflow-hidden">
                  {logo
                    ? <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    : <Dna className="w-5 h-5 text-[#E0793C]" />}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-[#F1F0F4]">
                  {currentRoutine.name || 'SESIÓN SIN NOMBRE'}
                </h1>
                <p className="text-[10px] font-mono text-[#9CA0A6] uppercase tracking-widest mt-0.5">
                  Bio-Ledger Neural Link // v1.0
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#0a0a0c] border border-[#2A2520] rounded-xl px-3 py-2">
            <span className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest">Session XP</span>
            <span className="text-sm font-black text-[#E0793C]">+{sessionXP}</span>
          </div>
        </div>

        {/* Live Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatPill label="Lifetime XP" accent="#E0793C"
            icon={<Zap className="w-4 h-4 text-[#E0793C]" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm text-[#9CA0A6]">—</span> : <AnimatedNumber value={liveStats.xp} />}
          />
          <StatPill label="Coincitos" accent="#E0793C"
            icon={<Crown className="w-4 h-4 text-[#E0793C]" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm text-[#9CA0A6]">—</span> : <AnimatedNumber value={liveStats.coincitos} prefix="$" />}
          />
          <StatPill label="Racha activa" accent="#8A2F14"
            icon={<Flame className="w-4 h-4 text-[#E0793C]" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm text-[#9CA0A6]">—</span> : <AnimatedNumber value={liveStats.streak} suffix=" días" />}
          />
          <StatPill label="Nivel" accent="#E0793C"
            icon={<Brain className="w-4 h-4 text-[#E0793C]" />}
            value={isLoading ? <span className="opacity-40 animate-pulse text-sm text-[#9CA0A6]">—</span> : `Nivel ${liveStats.level}`}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Exercise Load */}
          <div className="lg:col-span-2 space-y-4">

            {/* Muscle Map */}
            <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#E0793C]" />
                  <h3 className="text-xs font-mono text-[#9CA0A6] uppercase tracking-widest">Mapa Muscular</h3>
                </div>
                <span className="text-[9px] font-mono text-[#9CA0A6] uppercase">{exercises.length} ejercicios</span>
              </div>
              {muscleGroups.length > 0 ? (
                <div className="space-y-3">
                  {muscleGroups.map(([group, count]) => (
                    <MuscleBar key={group} group={group} count={count} max={maxMuscleCount} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lock className="w-8 h-8 text-[#9CA0A6] mb-3" />
                  <p className="text-xs font-mono text-[#9CA0A6] uppercase tracking-widest">Sin ejercicios cargados</p>
                  <p className="text-[10px] text-[#6E6558] mt-1">Agrega ejercicios en el catálogo</p>
                </div>
              )}
            </div>

            {/* Weekly Activity Sparkline */}
            <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#E0793C]" />
                  <h3 className="text-xs font-mono text-[#9CA0A6] uppercase tracking-widest">Actividad Semanal</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E0793C] rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-[#E0793C] uppercase tracking-wider">Live</span>
                </div>
              </div>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E0793C" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="#E0793C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ background: '#0a0a0c', border: '1px solid #2A2520', borderRadius: 8, fontSize: 11, fontFamily: 'monospace' }}
                      itemStyle={{ color: '#F1F0F4' }}
                      labelStyle={{ color: '#9CA0A6', fontSize: 10 }}
                    />
                    <Area type="monotone" dataKey="v" stroke="#E0793C" strokeWidth={2} fill="url(#sparkGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right: Nutrition Panel */}
          <div className="space-y-4">

            {/* Macros Rings */}
            <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Beef className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-mono text-[#9CA0A6] uppercase tracking-widest">Macros</h3>
              </div>
              {foods.length > 0 ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-black tracking-tighter text-[#F1F0F4]">
                      <AnimatedNumber value={Math.round(macros.calories)} />
                    </div>
                    <div className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest">kcal totales</div>
                  </div>
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
                  <Lock className="w-8 h-8 text-[#9CA0A6] mb-3" />
                  <p className="text-xs font-mono text-[#9CA0A6] uppercase tracking-widest">Sin alimentos</p>
                  <p className="text-[10px] text-[#6E6558] mt-1">Agrega comidas al arsenal</p>
                </div>
              )}
            </div>

            {/* Volume Card */}
            <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest mb-1">Volumen Total</p>
                <p className="text-xl font-black text-[#F1F0F4]">{totalVolume.toLocaleString()}<span className="text-xs text-[#9CA0A6] ml-1">kg</span></p>
              </div>
              <div className="w-10 h-10 bg-[#E0793C]/10 border border-[#E0793C]/25 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#E0793C]" />
              </div>
            </div>

            {/* Shield */}
            <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-mono text-[#9CA0A6] uppercase tracking-widest mb-1">Integridad WIR</p>
                <p className="text-xs font-black text-green-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verificado
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-green-500/20" />
            </div>
          </div>
        </div>

        {/* Mint CTA */}
        <div className="bg-[#0a0a0c] border border-[#2A2520] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-tight text-[#F1F0F4]">Mint Proof of Effort</h3>
              <p className="text-[10px] font-mono text-[#9CA0A6]">
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
                    ? 'bg-[#0a0a0c] text-[#6E6558] cursor-not-allowed border border-[#2A2520]'
                    : 'bg-[#E0793C] text-[#F1F0F4] hover:bg-[#8A2F14]'
                }`}
              >
                {!isMinting && !mintDone && !isEmpty && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
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
                      <Zap className="w-4 h-4 fill-[#F1F0F4]" /> Mint
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button className="px-5 py-3 border border-[#2A2520] text-xs font-black uppercase tracking-widest text-[#F1F0F4] hover:bg-[#2A2520] transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> .WIR
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMinting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="h-0.5 w-full bg-[#2A2520] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#E0793C]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((mintStep + 1) / MINT_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {MINT_STEPS.map((step, i) => (
                    <span key={step} className={`text-[8px] font-mono uppercase tracking-widest transition-colors ${i <= mintStep ? 'text-[#E0793C]' : 'text-[#6E6558]'}`}>
                      {i <= mintStep ? '\u2713' : '\u25CB'}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* Customize Panel */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-[#0c0c0e]/95 backdrop-blur-xl border-l border-[#2A2520] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#2A2520]">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#E0793C]" />
                <h2 className="text-sm font-black uppercase tracking-widest text-[#F1F0F4]">Personalizar</h2>
              </div>
              <button onClick={() => setShowCustomize(false)} className="w-7 h-7 rounded-lg bg-[#0a0a0c] hover:bg-[#2A2520] flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 text-[#9CA0A6]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-[#9CA0A6] uppercase tracking-widest">Logo / Icono</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-[#2A2520] bg-[#0a0a0c] flex items-center justify-center overflow-hidden shrink-0">
                    {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Dna className="w-7 h-7 text-[#E0793C]/40" />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0c] hover:bg-[#2A2520] border border-[#2A2520] rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest text-[#F1F0F4]">
                      <ImagePlus className="w-3.5 h-3.5" /> Subir imagen
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                    {logo && <button onClick={() => saveLogo(null)} className="w-full px-3 py-1.5 text-[10px] font-mono text-[#9CA0A6] hover:text-[#E0793C] border border-[#2A2520] rounded-xl transition-colors">Restaurar default</button>}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-[#9CA0A6] uppercase tracking-widest">Fondo</p>
                <div className="grid grid-cols-2 gap-2">
                  {BG_PRESETS.map(preset => (
                    <button key={preset.id} onClick={() => saveBg(preset.id)}
                      className={`relative h-12 rounded-xl border transition-all overflow-hidden ${bgId === preset.id && !bgImage ? 'border-[#E0793C] shadow-[0_0_12px_rgba(224,121,60,0.3)]' : 'border-[#2A2520] hover:border-[#9CA0A6]'}`}
                      style={preset.style}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#F1F0F4]/70">{preset.label}</span>
                      </span>
                      {bgId === preset.id && !bgImage && <span className="absolute top-1 right-1 w-2 h-2 bg-[#E0793C] rounded-full" />}
                    </button>
                  ))}
                </div>
                <label className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${bgImage ? 'bg-[#E0793C]/10 border-[#E0793C]/30 text-[#E0793C]' : 'bg-[#0a0a0c] hover:bg-[#2A2520] border-[#2A2520] text-[#F1F0F4]'}`}>
                  <ImagePlus className="w-3.5 h-3.5" /> {bgImage ? 'Imagen activa' : 'Imagen personalizada'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
                </label>
                {bgImage && <button onClick={() => saveBg('noir', null)} className="w-full px-3 py-1.5 text-[10px] font-mono text-[#9CA0A6] hover:text-[#E0793C] border border-[#2A2520] rounded-xl transition-colors">Quitar imagen</button>}
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-[#9CA0A6] uppercase tracking-widest">Preview</p>
                <div className="h-16 rounded-xl border border-[#2A2520] overflow-hidden flex items-center justify-center relative"
                  style={bgImage ? { background: `url(${bgImage}) center/cover no-repeat` } : BG_PRESETS.find(p => p.id === bgId)?.style}
                >
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                  <div className="relative flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#E0793C]/20 border border-[#E0793C]/20 flex items-center justify-center">
                      {logo ? <img src={logo} className="w-full h-full object-cover rounded-lg" alt="preview" /> : <Dna className="w-3 h-3 text-[#E0793C]" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight text-[#F1F0F4]">BIO-LEDGER</span>
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
