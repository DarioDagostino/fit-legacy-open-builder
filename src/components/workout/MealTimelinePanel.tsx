import { CalendarDays, Clock3, Pencil, Plus, Trash2 } from 'lucide-react';
import type { MealComposition } from '../../lib/store';

const SLOT_LABELS = ['Desayuno', 'Media mañana', 'Almuerzo', 'Pre-entreno', 'Post-entreno', 'Cena'];
const SLOT_TIMES = ['08:00', '11:00', '13:30', '17:00', '19:00', '21:30'];

type MacroTotals = { calories: number; protein: number; carbs: number; fats: number };

function mealMacros(meal: MealComposition): MacroTotals {
  return meal.foods.reduce((totals, food) => {
    const factor = (Number(food.quantity) || 100) / 100;
    totals.calories += (Number(food.calories) || 0) * factor;
    totals.protein += (Number(food.protein) || 0) * factor;
    totals.carbs += (Number(food.carbs) || 0) * factor;
    totals.fats += (Number(food.fats) || 0) * factor;
    return totals;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

function formatDateLabel(value: string) {
  if (!value) return 'Elegí un día';
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

export interface MealTimelinePanelProps {
  date: string;
  compositions: MealComposition[];
  onDateChange: (value: string) => void;
  onAddMeal: (slot: number, date: string, time: string, name: string) => void;
  onEditMeal: (meal: MealComposition) => void;
  onRemoveMeal: (meal: MealComposition) => void;
}

export function MealTimelinePanel({
  date,
  compositions,
  onDateChange,
  onAddMeal,
  onEditMeal,
  onRemoveMeal,
}: MealTimelinePanelProps) {
  const mealsForDate = compositions.filter((meal) => meal.date === date).sort((a, b) => a.slot - b.slot);
  const bySlot = new Map(mealsForDate.map((meal) => [meal.slot, meal]));
  const totals = mealsForDate.reduce((sum, meal) => {
    const macros = mealMacros(meal);
    return {
      calories: sum.calories + macros.calories,
      protein: sum.protein + macros.protein,
      carbs: sum.carbs + macros.carbs,
      fats: sum.fats + macros.fats,
    };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return (
    <div>
      <div className="space-y-4">
        <header className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="builder-eyebrow">Protocolo de rendimiento · 6 slots</p>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black uppercase tracking-tight text-[#F1F0F4]">Meals</h2>
            </div>
            <label className="builder-draft-field w-[148px] shrink-0">
              <span>Plan del día</span>
              <span className="relative">
                <CalendarDays size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--builder-accent-soft)]" aria-hidden="true" />
                <input aria-label="Fecha del plan de comidas" type="date" value={date} onChange={(event) => onDateChange(event.target.value)} className="pl-8" />
              </span>
            </label>
          </div>
          <p className="text-[11px] font-medium capitalize text-[#8f8b86]">{formatDateLabel(date)} · composición orientada a hipertrofia y alto rendimiento</p>
        </header>

        <section className="builder-meal-macro-strip" aria-label="Totales diarios de macros">
          <div><span>Kcal</span><strong>{Math.round(totals.calories)}</strong></div>
          <div><span>Proteína</span><strong>{Math.round(totals.protein)}g</strong></div>
          <div><span>Carbos</span><strong>{Math.round(totals.carbs)}g</strong></div>
          <div><span>Grasas</span><strong>{Math.round(totals.fats)}g</strong></div>
        </section>

        <div className="builder-meal-timeline" aria-label="Línea temporal de comidas">
          {SLOT_LABELS.map((label, index) => {
            const slot = index + 1;
            const meal = bySlot.get(slot);
            const macros = meal ? mealMacros(meal) : null;
            return (
              <article className={`builder-meal-slot${meal ? ' is-filled' : ''}`} key={slot}>
                <div className="builder-meal-slot__rail" aria-hidden="true"><span>{String(slot).padStart(2, '0')}</span></div>
                <div className="builder-meal-slot__body">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="builder-eyebrow">{label}</p>
                      <h3>{meal?.name || 'Slot disponible'}</h3>
                    </div>
                    <span className="builder-meal-slot__time"><Clock3 size={12} /> {meal?.time || SLOT_TIMES[index]}</span>
                  </div>
                  {meal ? (
                    <>
                      <p className="builder-meal-slot__foods">{meal.foods.map((food) => `${food.name} · ${food.quantity}g`).join('  /  ')}</p>
                      <div className="builder-meal-slot__summary">
                        <span>{meal.foods.length} ingredientes</span>
                        <span>{Math.round(macros!.calories)} kcal</span>
                        <span>{Math.round(macros!.protein)}g P</span>
                      </div>
                      <div className="builder-meal-slot__actions">
                        <button type="button" onClick={() => onEditMeal(meal)}><Pencil size={12} /> Editar composición</button>
                        <button type="button" onClick={() => onRemoveMeal(meal)} aria-label={`Quitar ${meal.name}`}><Trash2 size={12} /></button>
                      </div>
                    </>
                  ) : (
                    <button type="button" className="builder-meal-slot__add" onClick={() => onAddMeal(slot, date, SLOT_TIMES[index], label)}>
                      <Plus size={14} /> Agregar ingredientes
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-center font-['IBM_Plex_Mono',monospace] text-[9px] uppercase tracking-[0.14em] text-[#6E6558]">
          Hasta 6 comidas por día · cada composición se guarda al confirmar
        </p>
      </div>
    </div>
  );
}
