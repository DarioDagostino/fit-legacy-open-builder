import { Check, Minus, Plus, RotateCcw, Trash2, Utensils, Dumbbell } from 'lucide-react';
import type { FoodItem, SelectedExercise } from '../../lib/store';

type WorkoutPatch = Partial<Pick<SelectedExercise, 'sets' | 'reps' | 'weight' | 'notes'>>;
type FoodPatch = Partial<Pick<FoodItem, 'quantity' | 'notes'>>;

interface CompositionDraftPanelProps {
  mode: 'workout' | 'nutrition';
  exercises: SelectedExercise[];
  foods: FoodItem[];
  dayId: string;
  dayLabel: string;
  dayDate: string;
  dayTime: string;
  mealSlot: number;
  mealName: string;
  mealDate: string;
  mealTime: string;
  onDayIdChange: (value: string) => void;
  onDayLabelChange: (value: string) => void;
  onDayDateChange: (value: string) => void;
  onDayTimeChange: (value: string) => void;
  onMealSlotChange: (value: number) => void;
  onMealNameChange: (value: string) => void;
  onMealDateChange: (value: string) => void;
  onMealTimeChange: (value: string) => void;
  onUpdateExercise: (id: string, patch: WorkoutPatch) => void;
  onRemoveExercise: (id: string) => void;
  onUpdateFood: (id: string, patch: FoodPatch) => void;
  onRemoveFood: (id: string) => void;
  onConfirm: () => void;
  onDiscard: () => void;
  onContinueAdding?: () => void;
}

function NumberStepper({
  value,
  min,
  step = 1,
  suffix,
  onChange,
  label,
}: {
  value: number;
  min: number;
  step?: number;
  suffix: string;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <div className="builder-draft-stepper" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(min, Number((value - step).toFixed(2))))} aria-label={`Reducir ${label}`}>
        <Minus size={12} />
      </button>
      <span>{value}{suffix}</span>
      <button type="button" onClick={() => onChange(Number((value + step).toFixed(2)))} aria-label={`Aumentar ${label}`}>
        <Plus size={12} />
      </button>
    </div>
  );
}

function DateTimeFields({
  date,
  time,
  onDateChange,
  onTimeChange,
  label,
}: {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_120px]">
      <label className="builder-draft-field">
        <span>Fecha {label}</span>
        <input type="date" value={date} onChange={(event) => onDateChange(event.target.value)} />
      </label>
      <label className="builder-draft-field">
        <span>Hora</span>
        <input type="time" value={time} onChange={(event) => onTimeChange(event.target.value)} />
      </label>
    </div>
  );
}

export function CompositionDraftPanel({
  mode,
  exercises,
  foods,
  dayId,
  dayLabel,
  dayDate,
  dayTime,
  mealSlot,
  mealName,
  mealDate,
  mealTime,
  onDayIdChange,
  onDayLabelChange,
  onDayDateChange,
  onDayTimeChange,
  onMealSlotChange,
  onMealNameChange,
  onMealDateChange,
  onMealTimeChange,
  onUpdateExercise,
  onRemoveExercise,
  onUpdateFood,
  onRemoveFood,
  onConfirm,
  onDiscard,
  onContinueAdding,
}: CompositionDraftPanelProps) {
  const isWorkout = mode === 'workout';
  const count = isWorkout ? exercises.length : foods.length;

  return (
    <section className="builder-composition-draft" aria-label={isWorkout ? 'Revisión del día de entrenamiento' : 'Revisión de la comida'}>
      <div className="builder-composition-draft__header">
        <div className="flex min-w-0 items-center gap-3">
          <span className="builder-composition-draft__icon" aria-hidden="true">
            {isWorkout ? <Dumbbell size={18} /> : <Utensils size={18} />}
          </span>
          <div className="min-w-0">
            <p className="builder-eyebrow">Borrador editable · {count} {isWorkout ? 'ejercicios' : 'ingredientes'}</p>
            <h3>{isWorkout ? dayLabel || 'Día de entrenamiento' : mealName || `Comida ${mealSlot}`}</h3>
          </div>
        </div>
        <span className="builder-composition-draft__status">Sin guardar</span>
      </div>

      <div className="builder-composition-draft__meta">
        {isWorkout ? (
          <>
            <label className="builder-draft-field sm:col-span-2">
              <span>Nombre del día</span>
              <input value={dayLabel} onChange={(event) => onDayLabelChange(event.target.value)} placeholder="Día 1 · Tren superior" />
            </label>
            <label className="builder-draft-field">
              <span>Bloque</span>
              <select value={dayId} onChange={(event) => onDayIdChange(event.target.value)}>
                {Array.from({ length: 7 }, (_, index) => <option key={index} value={`day-${index + 1}`}>Día {index + 1}</option>)}
              </select>
            </label>
            <DateTimeFields date={dayDate} time={dayTime} onDateChange={onDayDateChange} onTimeChange={onDayTimeChange} label="entrenamiento" />
          </>
        ) : (
          <>
            <label className="builder-draft-field sm:col-span-2">
              <span>Nombre de la comida</span>
              <input value={mealName} onChange={(event) => onMealNameChange(event.target.value)} placeholder="Desayuno" />
            </label>
            <label className="builder-draft-field">
              <span>Slot diario</span>
              <select value={mealSlot} onChange={(event) => onMealSlotChange(Number(event.target.value))}>
                {Array.from({ length: 6 }, (_, index) => <option key={index} value={index + 1}>Comida {index + 1}</option>)}
              </select>
            </label>
            <DateTimeFields date={mealDate} time={mealTime} onDateChange={onMealDateChange} onTimeChange={onMealTimeChange} label="comida" />
          </>
        )}
      </div>

      <div className="builder-composition-draft__list">
        {isWorkout ? exercises.map((exercise, index) => (
          <article className="builder-draft-item" key={exercise.id}>
            <span className="builder-draft-item__index">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <strong>{exercise.name}</strong>
              <small>{exercise.section || 'personalizado'}</small>
              <div className="builder-draft-item__controls">
                <NumberStepper value={Number(exercise.sets) || 1} min={1} suffix="s" label={`series de ${exercise.name}`} onChange={(value) => onUpdateExercise(exercise.id, { sets: value })} />
                <NumberStepper value={Number(exercise.reps) || 1} min={1} suffix="r" label={`repeticiones de ${exercise.name}`} onChange={(value) => onUpdateExercise(exercise.id, { reps: value })} />
                <NumberStepper value={Number(exercise.weight) || 0} min={0} step={2.5} suffix=" kg" label={`peso de ${exercise.name}`} onChange={(value) => onUpdateExercise(exercise.id, { weight: value })} />
              </div>
            </div>
            <button type="button" className="builder-draft-item__remove" onClick={() => onRemoveExercise(exercise.id)} aria-label={`Quitar ${exercise.name}`}>
              <Trash2 size={15} />
            </button>
          </article>
        )) : foods.map((food, index) => {
          const calories = Math.round((Number(food.calories) || 0) * ((Number(food.quantity) || 100) / 100));
          return (
            <article className="builder-draft-item" key={food.id}>
              <span className="builder-draft-item__index">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <strong>{food.name}</strong>
                <small>{food.category || 'alimento'} · {calories} kcal aprox.</small>
                <div className="builder-draft-item__controls">
                  <NumberStepper value={Number(food.quantity) || 100} min={25} step={25} suffix=" g" label={`cantidad de ${food.name}`} onChange={(value) => onUpdateFood(food.id, { quantity: value })} />
                </div>
              </div>
              <button type="button" className="builder-draft-item__remove" onClick={() => onRemoveFood(food.id)} aria-label={`Quitar ${food.name}`}>
                <Trash2 size={15} />
              </button>
            </article>
          );
        })}
      </div>

      <div className="builder-composition-draft__footer">
        <button type="button" className="builder-cta-ghost inline-flex items-center justify-center gap-2 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest" onClick={onDiscard}>
          <RotateCcw size={13} /> Descartar
        </button>
        <div className="flex flex-1 justify-end gap-2">
          {onContinueAdding && <button type="button" className="builder-cta-ghost inline-flex items-center justify-center gap-2 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest" onClick={onContinueAdding}>
            <Plus size={13} /> Agregar más
          </button>}
          <button type="button" className="builder-cta-primary inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest" onClick={onConfirm}>
            <Check size={13} /> Confirmar {isWorkout ? 'día' : 'comida'}
          </button>
        </div>
      </div>
    </section>
  );
}
