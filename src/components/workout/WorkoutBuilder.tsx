import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Dumbbell, 
  Trash2, 
  Plus, 
  Share2, 
  ChevronRight, 
  Sparkles,
  Image as ImageIcon,
  Loader2,
  Minus,
  Apple,
  Utensils,
  Zap,
  Target,
  ShieldCheck,
  Lock,
  Unlock,
  Info,
  Crown,
  LayoutGrid,
  ClipboardList,
  ArrowRight,
  TrendingUp,
  X,
  Flame,
  Ghost
} from 'lucide-react';
import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';
import { useWorkoutStore } from '../../lib/store';
import { toast } from 'sonner';
import { NvidiaImageService } from '@fit-legacy/ai';

type TabType = 'catalog' | 'arsenal' | 'export';

const MUSCLE_GROUPS = [
  { id: 'all', label: 'Todo' },
  { id: 'chest', label: 'Pecho' },
  { id: 'back', label: 'Espalda' },
  { id: 'legs', label: 'Piernas' },
  { id: 'shoulders', label: 'Hombros' },
  { id: 'arms', label: 'Brazos' },
  { id: 'core', label: 'Core' },
];

const FOOD_CATEGORIES = [
  { id: 'all', label: 'Todo' },
  { id: 'protein', label: 'Proteínas' },
  { id: 'carbs', label: 'Carbo' },
  { id: 'fats', label: 'Grasas' },
  { id: 'fruit', label: 'Frutas' },
];

// Exercise Icon Mapping
const ICON_MAP: Record<string, string> = {
  chest: 'icono_pecho.svg',
  back: 'icono_espalda.svg',
  legs: 'icono_legs.svg',
  shoulders: 'icono_hombros.svg',
  arms: 'icono_brazos.svg',
  core: 'icono_calistenia.svg',
  cardio: 'icono_cardio.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  fullbody: 'icono_fullbody.svg',
  meditation: 'icono_meditacion.svg',
  boxing: 'icono_boxeo.svg',
  custom: 'icono_personalizado.svg',
  calisthenics: 'icono_calistenia.svg'
};

const ExerciseIcon = ({ section, className = "w-6 h-6" }: { section: string, className?: string }) => {
  const iconFile = ICON_MAP[section.toLowerCase()] || 'icono_personalizado.svg';
  return (
    <img 
      src={`/assets/icons/workouts/${iconFile}`} 
      alt={`Icono de ${section}`} 
      className={`${className} invert group-hover:invert-0 transition-[filter,transform] duration-300`} 
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/assets/icons/workouts/icono_personalizado.svg';
      }}
    />
  );
};

export default function MobileFirstBuilder() {
  const { 
    currentRoutine, 
    builderMode,
    setBuilderMode,
    addExercise, 
    removeExercise, 
    updateExercise, 
    addFood,
    removeFood,
    updateFood,
    updateRoutineName,
    setCoverImage,
    getShareableLink,
    loadRoutine 
  } = useWorkoutStore();

  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);

  // Set Language and A11y (Senior)
  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(data))));
        loadRoutine(decoded);
        setActiveTab('arsenal');
      } catch (e) {}
    }
  }, [searchParams, loadRoutine]);

  const filteredItems = useMemo(() => {
    const items = builderMode === 'workout' ? 
      Object.entries(UNIFIED_EXERCISES).flatMap(([section, categories]) => categories.flatMap(cat => cat.exercises.map(ex => ({ ...ex, section })))) :
      Object.entries(UNIFIED_FOODS).flatMap(([category, items]) => items.map(item => ({ ...item, category })));

    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const cat = builderMode === 'workout' ? (item as any).section : (item as any).category;
      const matchesFilter = activeFilter === 'all' || cat === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, builderMode, activeFilter]);

  const totalMacros = useMemo(() => {
    return currentRoutine.foods.reduce((acc, food) => {
      const ratio = food.quantity / 100;
      return {
        calories: acc.calories + (food.calories * ratio),
        protein: acc.protein + (food.protein * ratio),
        carbs: acc.carbs + (food.carbs * ratio),
        fats: acc.fats + (food.fats * ratio),
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [currentRoutine.foods]);

  const handleGenerateCover = async () => {
    if (currentRoutine.exercises.length === 0 && currentRoutine.foods.length === 0) {
      toast.error('Arsenal vacío');
      return;
    }
    setIsGeneratingCover(true);
    try {
      const service = new NvidiaImageService();
      const focus = currentRoutine.exercises[0]?.name || currentRoutine.foods[0]?.name || 'elite fitness';
      const prompt = `Hyper-realistic portrait of ${focus} in a premium noir gym. 8k resolution.`;
      const result = await service.generate({ prompt, style: 'ultra-realistic', model: 'proteus' });
      setCoverImage(result.url);
      toast.success('Identidad visual forjada');
    } catch (e) {
      toast.error('Fallo en la IA');
    } finally {
      setIsGeneratingCover(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col overflow-hidden">
      
      {/* Dynamic Header */}
      <header className="p-6 pt-10 shrink-0 z-10" role="banner">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">System Online</span>
           </div>
           <Crown className="w-4 h-4 text-amber-500" aria-label="Miembro Elite" />
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
          {activeTab === 'catalog' ? 'CATÁLOGO' : activeTab === 'arsenal' ? 'ARSENAL' : 'SYNC'}
        </h1>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 overflow-hidden relative z-10" role="main">
        <AnimatePresence mode="wait">
          {activeTab === 'catalog' && (
            <motion.div 
              key="catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 space-y-6"
            >
              {/* Premium Mode Toggle */}
              <div className="relative bg-zinc-900/80 p-1 rounded-2xl border border-white/5 flex items-center h-14 overflow-hidden" role="tablist">
                 <motion.div 
                    initial={false}
                    animate={{ x: builderMode === 'workout' ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-xl z-0"
                 />
                 
                 <button 
                  onClick={() => { setBuilderMode('workout'); setActiveFilter('all'); }} 
                  role="tab"
                  aria-selected={builderMode === 'workout'}
                  aria-label="Ver catálogo de ejercicios"
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${builderMode === 'workout' ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   <Dumbbell size={14} aria-hidden="true" />
                   EJERCICIOS
                 </button>
                 
                 <button 
                  onClick={() => { setBuilderMode('nutrition'); setActiveFilter('all'); }} 
                  role="tab"
                  aria-selected={builderMode === 'nutrition'}
                  aria-label="Ver catálogo de comidas"
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${builderMode === 'nutrition' ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   <Apple size={14} aria-hidden="true" />
                   COMIDAS
                 </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" aria-hidden="true" />
                  <input 
                    type="text"
                    placeholder="Rastrear en catálogo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Buscar ejercicios o comidas"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-[border-color] font-bold text-sm"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2" role="group" aria-label="Filtros de categoría">
                   {(builderMode === 'workout' ? MUSCLE_GROUPS : FOOD_CATEGORIES).map(f => (
                     <button
                       key={f.id}
                       onClick={() => setActiveFilter(f.id)}
                       aria-pressed={activeFilter === f.id}
                       className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-[background-color,border-color,color,box-shadow] whitespace-nowrap ${
                         activeFilter === f.id ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/5 text-zinc-500'
                       }`}
                     >
                       {f.label}
                     </button>
                   ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      builderMode === 'workout' ? addExercise(item as any) : addFood(item as any);
                      toast.success(`${item.name} añadido`);
                    }}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-[transform,background-color,border-color] group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${builderMode === 'workout' ? 'bg-purple-500/10' : 'bg-emerald-500/10 text-emerald-400'}`}>
                         {builderMode === 'workout' ? <ExerciseIcon section={(item as any).section} className="w-7 h-7" /> : <Apple size={18} />}
                       </div>
                       <div>
                         <p className="font-black italic uppercase text-sm group-active:text-white transition-colors">{item.name}</p>
                         <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                           {builderMode === 'workout' ? (item as any).section : (item as any).category}
                         </p>
                       </div>
                    </div>
                    <button 
                      className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center group-active:bg-white group-active:text-black transition-colors"
                      aria-label={`Añadir ${item.name}`}
                    >
                       <Plus size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'arsenal' && (
            <motion.div 
              key="arsenal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 space-y-6"
            >
              <input 
                type="text"
                value={currentRoutine.name}
                onChange={(e) => updateRoutineName(e.target.value)}
                aria-label="Nombre del protocolo"
                className="w-full bg-transparent border-none p-0 text-3xl font-black italic uppercase tracking-tighter focus:ring-0 placeholder:text-zinc-800 transition-colors"
                placeholder="NUEVO_ARSENAL"
              />

              <div className="grid grid-cols-4 gap-2" role="region" aria-label="Resumen de nutrición">
                 <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                    <p className="text-[7px] font-black text-zinc-600 uppercase">Kcal</p>
                    <p className="text-sm font-black">{Math.round(totalMacros.calories)}</p>
                 </div>
                 <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                    <p className="text-[7px] font-black text-purple-500 uppercase">Prot</p>
                    <p className="text-sm font-black text-purple-400">{Math.round(totalMacros.protein)}g</p>
                 </div>
                 <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                    <p className="text-[7px] font-black text-blue-500 uppercase">Carb</p>
                    <p className="text-sm font-black text-blue-400">{Math.round(totalMacros.carbs)}g</p>
                 </div>
                 <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center">
                    <p className="text-[7px] font-black text-emerald-500 uppercase">Fat</p>
                    <p className="text-sm font-black text-emerald-400">{Math.round(totalMacros.fats)}g</p>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {currentRoutine.exercises.length === 0 && currentRoutine.foods.length === 0 && (
                   <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-4">
                      <Ghost size={48} aria-hidden="true" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">Arsenal vacío</p>
                   </div>
                )}

                {currentRoutine.exercises.map(ex => (
                  <div key={ex.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-5 transition-colors">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <ExerciseIcon section={ex.section} className="w-5 h-5 opacity-40" />
                          <h4 className="font-black italic uppercase text-xs tracking-tight">{ex.name}</h4>
                       </div>
                       <button 
                        onClick={() => removeExercise(ex.id)} 
                        aria-label={`Eliminar ${ex.name}`}
                        className="p-2 -mr-2 text-zinc-600 active:text-red-500 transition-colors"
                       >
                         <X size={16} />
                       </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-1">
                          <label className="text-[7px] font-black text-zinc-600 uppercase">Sets</label>
                          <div className="flex items-center justify-between bg-black/40 rounded-lg p-2 border border-white/5">
                             <button onClick={() => updateExercise(ex.id, { sets: Math.max(1, ex.sets - 1) })} aria-label="Menos series"><Minus size={12} /></button>
                             <span className="text-xs font-black">{ex.sets}</span>
                             <button onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })} aria-label="Más series"><Plus size={12} /></button>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <label className="text-[7px] font-black text-zinc-600 uppercase">Reps</label>
                          <div className="flex items-center justify-between bg-black/40 rounded-lg p-2 border border-white/5">
                             <button onClick={() => updateExercise(ex.id, { reps: Math.max(1, ex.reps - 1) })} aria-label="Menos repeticiones"><Minus size={12} /></button>
                             <span className="text-xs font-black">{ex.reps}</span>
                             <button onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })} aria-label="Más repeticiones"><Plus size={12} /></button>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <label className="text-[7px] font-black text-zinc-600 uppercase">kg</label>
                          <div className="flex items-center justify-between bg-black/40 rounded-lg p-2 border border-white/5">
                             <button onClick={() => updateExercise(ex.id, { weight: Math.max(0, ex.weight - 2.5) })} aria-label="Menos peso"><Minus size={12} /></button>
                             <span className="text-xs font-black">{ex.weight}</span>
                             <button onClick={() => updateExercise(ex.id, { weight: ex.weight + 2.5 })} aria-label="Más peso"><Plus size={12} /></button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
                
                {currentRoutine.foods.map(food => (
                  <div key={food.id} className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 flex items-center justify-between transition-colors">
                     <div className="space-y-1">
                        <h4 className="font-black italic uppercase text-xs text-emerald-500">{food.name}</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[8px] font-black text-emerald-600 uppercase">{Math.round((food.protein * food.quantity) / 100)}g P</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 bg-black/40 rounded-xl p-2 border border-white/5">
                        <button onClick={() => updateFood(food.id, Math.max(25, food.quantity - 25))} className="p-1" aria-label="Menos cantidad"><Minus size={14} /></button>
                        <span className="text-xs font-black w-10 text-center">{food.quantity}g</span>
                        <button onClick={() => updateFood(food.id, food.quantity + 25)} className="p-1" aria-label="Más cantidad"><Plus size={14} /></button>
                        <button 
                          onClick={() => removeFood(food.id)} 
                          aria-label={`Eliminar ${food.name}`}
                          className="ml-1 pl-3 border-l border-white/10 active:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} className="text-zinc-700 hover:text-red-500" />
                        </button>
                     </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'export' && (
            <motion.div 
              key="export"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full flex flex-col p-6 space-y-8 pb-32 overflow-y-auto"
            >
              <button 
                className="aspect-video w-full rounded-[2rem] bg-zinc-900 border border-white/10 overflow-hidden relative group active:scale-[0.98] transition-[transform,border-color]"
                onClick={handleGenerateCover}
                aria-label="Generar portada con IA"
              >
                 {currentRoutine.coverImageUrl ? (
                   <img src={currentRoutine.coverImageUrl} className="w-full h-full object-cover" alt="Portada de la rutina" />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                      {isGeneratingCover ? (
                        <Loader2 className="animate-spin text-purple-500" size={32} />
                      ) : (
                        <>
                          <ImageIcon className="text-zinc-800" size={48} aria-hidden="true" />
                          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Generar Identidad IA</p>
                        </>
                      )}
                   </div>
                 )}
              </button>

              <div className="space-y-4">
                 <button 
                   onClick={() => { 
                     const shareText = `💪 NUEVA MISIÓN: ${currentRoutine.name.toUpperCase()}\n\nToca para abrir tu protocolo de entrenamiento en Fit Legacy:\n\n${getShareableLink()}`;
                     window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank'); 
                   }}
                   className="w-full h-20 bg-white text-black rounded-3xl font-black text-lg italic uppercase flex items-center justify-center gap-3 active:scale-[0.95] transition-[transform,background-color] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
                 >
                    <Share2 size={24} aria-hidden="true" />
                    WHATSAPP SYNC
                 </button>
                 <button 
                   onClick={() => { navigator.clipboard.writeText(getShareableLink()); toast.success('Link copiado'); }}
                   className="w-full py-6 bg-zinc-900/50 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-white/5 active:bg-white/10 transition-[background-color,border-color]"
                 >
                   COPIAR ACCESO .WIR
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent shrink-0 z-50" role="navigation">
         <div className="max-w-md mx-auto bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.5)]">
            <button 
              onClick={() => setActiveTab('catalog')}
              aria-label="Ver Catálogo"
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 ${activeTab === 'catalog' ? 'bg-white text-black shadow-xl' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <LayoutGrid size={22} aria-hidden="true" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Catálogo</span>
            </button>
            <button 
              onClick={() => setActiveTab('arsenal')}
              aria-label={`Ver Arsenal (${currentRoutine.exercises.length + currentRoutine.foods.length} items)`}
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 relative ${activeTab === 'arsenal' ? 'bg-white text-black shadow-xl' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <Dumbbell size={22} aria-hidden="true" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Arsenal</span>
              {(currentRoutine.exercises.length + currentRoutine.foods.length) > 0 && (
                <div className="absolute top-2 right-4 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center border-2 border-zinc-900" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.exercises.length + currentRoutine.foods.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              aria-label="Sincronizar y compartir"
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 ${activeTab === 'export' ? 'bg-white text-black shadow-xl' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <Share2 size={22} aria-hidden="true" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Sync</span>
            </button>
         </div>
      </nav>

    </div>
  );
}
