import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Check, Share2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { UNIFIED_EXERCISES } from '@fit-legacy/shared';



type Exercise = {
  name: string;
  sets: number | string;
  reps: number | string;
  weight: number | string;
  rest: number | string;
  notes?: string;
};

type Food = {
  name: string;
  quantity: number | string;
  protein: number;
  calories: number;
};

type RoutineData = {
  title: string;
  duration: number;
  exercises: Exercise[];
  foods: Food[];
};

export function SharedRoutineViewer() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [routine, setRoutine] = useState<RoutineData | null>(null);
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadRoutine() {
      const dataParam = searchParams.get('data');
      if (dataParam) {
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(dataParam))));
          
          // Hydrate the exercises from the minified payload
          const allExercises = Object.values(UNIFIED_EXERCISES).flatMap(sections => sections.flatMap(s => s.exercises));
          const exercises = (decoded.e || []).map((minEx: any) => {
            const base = allExercises.find(ex => ex.id === minEx.i);
            return {
              name: base ? base.name : 'Ejercicio desconocido',
              sets: minEx.s,
              reps: minEx.r,
              weight: minEx.w || 0,
              rest: base?.rest || 60,
              notes: ''
            };
          });

          // Hack to get UNIFIED_FOODS since we might need to import it but we don't want to break the imports above if it's missing, let's assume it's imported or we'll just show the ID
          const foods = (decoded.f || []).map((minFood: any) => {
            return {
              name: minFood.i.replace(/_/g, ' ').toUpperCase(),
              quantity: minFood.q || 0,
              protein: 0, // Fallback if no full catalog
              calories: 0
            };
          });

          setRoutine({
            title: decoded.n || 'Rutina Compartida',
            duration: exercises.length * 5, // Rough estimate
            exercises,
            foods
          });
          setLoading(false);
          return;
        } catch (e) {
          console.error("Error decoding WIR format:", e);
        }
      }

      if (!slug || slug === 'wir') {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('routine_links')
          .select('routine_data, user_id, profiles(full_name)')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          setError(true);
        } else {
          setRoutine(data.routine_data as RoutineData);
          if (data.profiles) {
            setProfile(data.profiles as any);
          }
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadRoutine();
  }, [slug, searchParams]);

  const toggleItem = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedItems(next);
  };

  const getProgress = () => {
    const total = (routine?.exercises?.length || 0) + (routine?.foods?.length || 0);
    if (total === 0) return 0;
    return Math.round((checkedItems.size / total) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0E] flex items-center justify-center font-sans text-[#F0EEF8]">
        <div className="w-8 h-8 border-4 border-[#E8873A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !routine) {
    return (
      <div className="min-h-screen bg-[#0C0C0E] flex flex-col items-center justify-center p-6 text-center font-sans">
        <AlertTriangle className="w-12 h-12 text-[#E8873A] mb-4 opacity-80" />
        <h1 className="text-xl font-bold text-white font-serif tracking-wide mb-2">Rutina no encontrada</h1>
        <p className="text-[#F0EEF8]/60 text-sm">El enlace caducó o el slug es incorrecto.</p>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#F0EEF8] font-sans pb-20">
      <div className="max-w-[420px] mx-auto bg-[#141418] min-h-screen relative overflow-hidden shadow-2xl">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E8873A]" />
            <span className="font-serif font-bold text-sm tracking-wide">FitLegacy</span>
          </div>
          <div className="text-[10px] font-bold bg-[#7C6AF5]/15 text-[#A89EF8] border border-[#7C6AF5]/30 px-2 py-1 rounded-full tracking-wider">
            GENERADO CON IA
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-4 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C6AF5] to-[#E8873A] flex items-center justify-center text-[10px] font-bold text-white">
              LG
            </div>
            <div className="text-[11px] text-[#F0EEF8]/50">
              Plan generado por <b className="text-white font-semibold">Legacito AI</b>
            </div>
          </div>

          <h1 className="font-serif text-2xl font-extrabold text-white leading-tight mb-1">
            {profile?.full_name ? `Protocolo de ${profile.full_name.split(' ')[0]}` : 'Tu Protocolo'}
          </h1>
          <div className="text-xs text-[#F0EEF8]/50 mb-4">
            Rutina <span className="text-[#E8873A] font-semibold">{routine.title}</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E8873A] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[11px] font-bold text-[#E8873A] min-w-[30px] text-right">
              {progress}%
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 pt-2">
          {routine.exercises?.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h2 className="font-serif text-[15px] font-bold text-white">Ejercicios</h2>
                <div className="text-[10px] font-bold bg-[#E8873A]/10 text-[#E8873A] border border-[#E8873A]/20 px-2 py-1 rounded-full">
                  EJECUCIÓN
                </div>
              </div>

              <div className="flex flex-col mb-6">
                {routine.exercises.map((ex, idx) => {
                  const itemId = `ex_${idx}`;
                  const isDone = checkedItems.has(itemId);
                  return (
                    <div 
                      key={itemId}
                      onClick={() => toggleItem(itemId)}
                      className={`flex items-start gap-3 py-3 border-b border-white/5 cursor-pointer transition-opacity duration-200 ${isDone ? 'opacity-40' : 'opacity-100'}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isDone ? 'bg-[#2ECC8A] border-[#2ECC8A]' : 'border-white/15'}`}>
                        {isDone && <Check className="w-3.5 h-3.5 text-[#0C0C0E] stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-semibold text-white mb-1">{ex.name}</div>
                        <div className="text-[11px] text-[#F0EEF8]/50">
                          {ex.sets} series × {ex.reps} reps {Number(ex.weight) > 0 ? `· ${ex.weight} kg` : ''}
                        </div>
                      </div>
                      {ex.notes && (
                        <div className="text-[10px] font-bold text-[#A89EF8] bg-[#7C6AF5]/10 px-2 py-0.5 rounded-full self-center whitespace-nowrap">
                          NOTA
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {routine.foods?.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h2 className="font-serif text-[15px] font-bold text-white">Nutrición</h2>
                <div className="text-[10px] font-bold bg-[#2ECC8A]/10 text-[#2ECC8A] border border-[#2ECC8A]/20 px-2 py-1 rounded-full">
                  COMBUSTIBLE
                </div>
              </div>

              <div className="flex flex-col">
                {routine.foods.map((food, idx) => {
                  const itemId = `food_${idx}`;
                  const isDone = checkedItems.has(itemId);
                  return (
                    <div 
                      key={itemId}
                      onClick={() => toggleItem(itemId)}
                      className={`flex items-start gap-3 py-3 border-b border-white/5 cursor-pointer transition-opacity duration-200 ${isDone ? 'opacity-40' : 'opacity-100'}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isDone ? 'bg-[#2ECC8A] border-[#2ECC8A]' : 'border-white/15'}`}>
                        {isDone && <Check className="w-3.5 h-3.5 text-[#0C0C0E] stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-semibold text-white mb-1">{food.name}</div>
                        <div className="text-[11px] text-[#F0EEF8]/50">
                          {food.quantity} gramos
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex items-start gap-2 bg-[#7C6AF5]/5 border border-[#7C6AF5]/20 rounded-xl p-3 mt-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A89EF8] shrink-0 mt-1.5" />
            <div className="text-[11px] text-[#A89EF8]/90 leading-relaxed italic">
              Legacito: "{progress === 100 
                ? '¡Impecable, atleta! Eso es mentalidad de legado. El esfuerzo queda registrado.' 
                : 'Completá cada serie con intención. La constancia supera a la intensidad. Marca los ejercicios terminados.'}"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/5 bg-[#141418]/90 backdrop-blur-md flex items-center justify-between">
          <div className="font-serif text-[11px] font-bold text-[#F0EEF8]/40">
            Powered by <span className="text-[#E8873A]">Legacy AI</span>
          </div>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Mi Entrenamiento - Fit Legacy',
                  url: window.location.href
                });
              }
            }}
            className="flex items-center gap-1.5 bg-[#E8873A] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
}
