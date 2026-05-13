import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, Share2 } from 'lucide-react';
import { processWirLink } from '@/lib/wir';
import { WirCanvasPreview } from '@/components/wir/WirCanvasPreview';


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
  template: 'routine' | 'meal' | 'mixed';
  palette?: 'clean' | 'mist' | 'navy' | 'forest' | 'ember';
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
          const result = processWirLink(dataParam);
          
          if (result.success && result.data) {
             const hydrated = result.data;
             setRoutine({
               template: hydrated.template || 'routine',
               palette: hydrated.palette,
               title: hydrated.name || 'Rutina Compartida',
               duration: hydrated.exercises.length * 5, // Rough estimate
               exercises: hydrated.exercises.map(ex => ({
                 name: ex.name,
                 sets: ex.sets,
                 reps: ex.reps,
                 weight: ex.weight || 0,
                 rest: 60,
                 notes: ''
               })),
               foods: hydrated.foods.map(food => ({
                 name: food.name,
                 quantity: food.quantity,
                 protein: food.protein,
                 calories: food.calories
               }))
             });
             setLoading(false);
             return;
          }
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-sm">
        <WirCanvasPreview
          template={routine.template}
          palette={routine.palette}
          title={routine.title}
          exercises={routine.exercises.map((ex) => ({
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: Number(ex.weight) || 0,
          }))}
          foods={routine.foods.map((food) => ({
            name: food.name,
            quantity: Number(food.quantity) || 0,
            protein: Number(food.protein) || 0,
            calories: Number(food.calories) || 0,
          }))}
          checkedItems={checkedItems}
          onToggleItem={toggleItem}
          isPreview={false}
        />
        
        {/* Footer Button */}
        <div className="mt-6 flex gap-3 justify-center">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Mi Entrenamiento - Fit Legacy',
                  url: window.location.href
                });
              }
            }}
            className="flex items-center gap-1.5 bg-[#E8873A] text-white px-4 py-2.5 rounded-full text-[11px] font-bold hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
}
