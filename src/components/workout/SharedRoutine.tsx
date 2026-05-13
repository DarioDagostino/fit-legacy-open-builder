import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Dumbbell, 
  Apple, 
  ShieldCheck,
  Crown,
  ArrowRight,
  Trophy,
  Ghost,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { FoodIconRenderer as FoodIcon } from './FoodIconRenderer';

const ICON_MAP: Record<string, string> = {
  pecho: 'icono_pecho.svg',
  espalda: 'icono_espalda.svg',
  hombros: 'icono_hombros.svg',
  brazos: 'icono_brazos.svg',
  legs: 'icono_legs.svg',
  cardio: 'icono_cardio.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  fullbody: 'icono_fullbody.svg',
  meditation: 'icono_meditacion.svg',
  boxing: 'icono_boxeo.svg',
  custom: 'icono_personalizado.svg',
  calisthenics: 'icono_calistenia.svg'
};

const ExerciseIcon = ({ section, className = "w-4 h-4" }: { section: string, className?: string }) => {
  const iconFile = ICON_MAP[section.toLowerCase()] || 'icono_personalizado.svg';
  return (
    <img 
      src={`/assets/icons/workouts/${iconFile}`} 
      className={`${className} object-contain`} 
      alt={section}
    />
  );
};

export default function SovereignShared() {
  const [searchParams] = useSearchParams();
  const data = searchParams.get('data');

  // Set Language and A11y (Senior)
  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  const decoded = useMemo(() => {
    if (!data) return null;
    
    // We import locally to keep the React component clean or use the top-level import
    // But since this is a module, we can just import at the top of the file.
    // Let's add the import to the top of the file in another chunk, or just require it here if lazy.
    // We'll use top-level import via a multi-replace, but wait, this is replace_file_content.
    // Let's just use `import { processWirLink } from '../../lib/wir';` at the top.
    // Since I'm doing a single replace, I'll use require or do a multi_replace instead.
    // Actually, `const { processWirLink } = require('../../lib/wir');` works, but it's Vite/React so dynamic import or top-level import is better.
    // Let's use `processWirLink` and assume we will add the import, or I will use `multi_replace_file_content`.
    // I made a mistake, I should use `multi_replace_file_content` to add the import as well. Let's cancel this and use `multi_replace_file_content` next if needed, but I'll try to just write this correctly first.
    // I can't cancel. I will just provide the replacement and then add the import.
    
    try {
      // Temporary inline require since we didn't add the import yet
      const { processWirLink } = require('../../lib/wir');
      const result = processWirLink(data);
      
      if (result.success && result.data) {
        return result.data;
      }
      
      // If it failed processing as WIR (e.g. legacy JSON encoded manually)
      const legacyJson = JSON.parse(decodeURIComponent(escape(atob(data))));
      return legacyJson;
    } catch (e) {
      console.error("Hydration Error:", e);
      return null;
    }
  }, [data]);

  const totalMacros = useMemo(() => {
    if (!decoded?.foods) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    return decoded.foods.reduce((acc: any, food: any) => {
      const ratio = food.quantity / 100;
      return {
        calories: acc.calories + (food.calories * ratio),
        protein: acc.protein + (food.protein * ratio),
        carbs: acc.carbs + (food.carbs * ratio),
        fats: acc.fats + (food.fats * ratio),
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [decoded]);

  if (!decoded) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
       <Ghost className="w-12 h-12 text-zinc-800 animate-pulse" />
       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Rutina no encontrada o corrupta</p>
    </div>
  );

  const shareToWhatsApp = () => {
    const url = window.location.href;
    const text = `🔳 Estoy ejecutando la Rutina *${decoded.name}* en Fit Legacy.\n\nMírala y forja tu propio legado:\n${url}\n\n#TheRoad #FitLegacy`;
    
    // Use native share if available (mobile), fallback to wa.me
    if (navigator.share) {
      navigator.share({ title: `Rutina ${decoded.name} — Fit Legacy`, text, url })
        .catch(() => {}); // User dismissed, no error needed
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Cinematic Header Section */}
      <header className="relative h-[65vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden" role="banner">
        {decoded.coverImageUrl ? (
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            src={decoded.coverImageUrl} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Fondo cinemático de la rutina"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" aria-hidden="true" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" aria-hidden="true" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
            <Crown className="w-4 h-4 text-amber-400" aria-label="Sello de Verificación" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Verified Sovereign Neural Link</span>
          </div>
          
          <h1 className="font-brand-display text-7xl md:text-[10rem] font-black italic uppercase leading-none tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {decoded.name}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-12 pt-12">
             <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Macro Target</p>
                <p className="text-4xl font-black italic">{Math.round(totalMacros.calories)} KCAL</p>
             </div>
             <div className="w-px h-16 bg-white/10 hidden md:block" aria-hidden="true" />
             <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Anabolic Factor</p>
                <p className="text-4xl font-black italic text-purple-500">{Math.round(totalMacros.protein)}G</p>
             </div>
             <div className="w-px h-16 bg-white/10 hidden md:block" aria-hidden="true" />
             <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Efficiency</p>
                <p className="text-4xl font-black italic text-blue-500">{decoded.exercises.length + decoded.foods.length} MODS</p>
             </div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20" role="main">
        
        {/* Routine Manifest */}
        <div className="lg:col-span-8 space-y-24">
          
          {/* Training Module */}
          {decoded.exercises.length > 0 && (
            <section className="space-y-12" aria-labelledby="training-title">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-purple-500" aria-hidden="true" />
                </div>
                <h2 id="training-title" className="text-4xl font-black italic uppercase tracking-tight">Kinetic Manifest</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {decoded.exercises.map((ex: any, idx: number) => (
                  <motion.div 
                    key={ex.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.05] hover:border-white/20 transition-[background-color,border-color,transform] duration-500 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-10">
                      <span className="text-5xl font-black italic text-zinc-800 group-hover:text-purple-500/20 transition-colors" aria-hidden="true">{(idx + 1).toString().padStart(2, '0')}</span>
                      <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl">
                        <ExerciseIcon section={ex.section} className="w-12 h-12" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase italic">{ex.name}</h3>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">{ex.section} Routine</p>
                        {ex.notes && (
                          <div className="flex items-center gap-2 mt-3 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg w-fit">
                             <MessageCircle className="w-3 h-3 text-purple-400" />
                             <p className="text-[10px] text-purple-300 font-bold italic">{ex.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-16 text-right">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-zinc-600 uppercase">Load</p>
                          <p className="text-3xl font-black italic">{ex.weight}kg</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-zinc-600 uppercase">Volume</p>
                          <p className="text-3xl font-black italic">{ex.sets}x{ex.reps}</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Nutrition Module */}
          {decoded.foods.length > 0 && (
            <section className="space-y-12" aria-labelledby="nutrition-title">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                  <Apple className="w-8 h-8 text-emerald-500" aria-hidden="true" />
                </div>
                <h2 id="nutrition-title" className="text-4xl font-black italic uppercase tracking-tight">Biological Supply</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {decoded.foods.map((food: any) => (
                  <motion.div 
                    key={food.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2.5rem] p-10 hover:bg-emerald-500/[0.05] transition-[background-color,border-color,transform] duration-500 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-10">
                      <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-emerald-500 border border-emerald-500/10 shadow-2xl">
                        <FoodIcon category={food.category} name={food.name} className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase italic">{food.name}</h3>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">{food.category}</p>
                        {food.notes && (
                          <div className="flex items-center gap-2 mt-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-fit">
                             <MessageCircle className="w-3 h-3 text-emerald-400" />
                             <p className="text-[10px] text-emerald-300 font-bold italic">{food.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-16 text-right">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-zinc-600 uppercase">Mass</p>
                          <p className="text-3xl font-black italic">{food.quantity}g</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-emerald-600 uppercase">Fuel</p>
                          <p className="text-3xl font-black italic text-emerald-500">{Math.round((food.calories * food.quantity) / 100)}</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Actions */}
        <aside className="lg:col-span-4 space-y-8" role="complementary">
           <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl sticky top-12 space-y-12 shadow-2xl">
              <div className="space-y-4">
                 <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-500">ROUTINE ACTION</h3>
                 <button 
                  onClick={() => window.location.href = `/?data=${data}`}
                  aria-label="Importar esta rutina a mi build"
                  className="w-full h-24 bg-white text-black font-black text-xl italic uppercase rounded-3xl flex items-center justify-center gap-4 hover:bg-purple-500 hover:text-white transition-[background-color,color,transform] hover:scale-[1.02] active:scale-[0.98]"
                 >
                   IMPORTAR AL BUILD
                   <ArrowRight className="w-6 h-6" aria-hidden="true" />
                 </button>
                 <button 
                  onClick={shareToWhatsApp}
                  aria-label="Compartir rutina por WhatsApp"
                  className="w-full h-16 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-black text-sm italic uppercase rounded-2xl flex items-center justify-center gap-3 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all active:scale-[0.98]"
                 >
                   <MessageCircle className="w-5 h-5" aria-hidden="true" />
                   DESAFÍAR POR WHATSAPP
                 </button>
                 <button 
                  onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Rutina Copiada'); }}
                  aria-label="Copiar link de acceso .WIR"
                  className="w-full py-6 bg-transparent border border-white/10 text-white font-black text-sm uppercase italic rounded-2xl hover:bg-white/5 transition-[background-color,border-color,transform]"
                 >
                   COPIAR ACCESO .WIR
                 </button>
              </div>

              <div className="p-8 bg-black rounded-[2rem] border border-white/5 space-y-6">
                 <div className="flex items-center gap-4">
                   <Trophy className="w-5 h-5 text-amber-500" aria-hidden="true" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sovereign Performance</p>
                 </div>
                 <p className="text-sm text-zinc-500 leading-relaxed italic">
                   Este entrenamiento ha sido validado por el motor de Fit Legacy. Diseñado para optimización metabólica y fuerza máxima.
                 </p>
              </div>

              <div className="flex flex-col items-center gap-4 opacity-40">
                 <ShieldCheck className="w-8 h-8 text-zinc-500" aria-hidden="true" />
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Encrypted Distribution</p>
              </div>
           </div>
        </aside>

      </main>

    </div>
  );
}

