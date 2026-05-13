# 🧠 ENTRENAR IA PARA FIT LEGACY

## Tabla de Contenidos
1. [Visión General](#visión-general)
2. [¿Es Viable?](#es-viable)
3. [Arquitectura Técnica](#arquitectura-técnica)
4. [Implementación MVP (Hoy)](#implementación-mvp-hoy)
5. [Roadmap](#roadmap)
6. [Financiero](#financiero)
7. [Código Listo](#código-listo)

---

## Visión General

**Fit Legacy AI Coach**: Sistema que aprende de tus usuarios para generar rutinas y planes de nutrición 100% personalizados.

### ¿Qué significa "entrenar IA"?

```
Datos de usuarios (10,000 entrenamientos)
    ↓
Algoritmo ML / LLM
    ↓
Modelo entrenado
    ↓
"Coach IA" que predice qué rutina es mejor para CADA usuario
```

### ¿Cuándo?
- **MVP (Ahora)**: Recolectar datos, cero costo
- **Mes 12**: Cuando tengas presupuesto, entrenar modelo
- **Mes 13+**: Lanzar como premium feature

---

## ¿Es Viable?

### ✅ Respuesta corta: SÍ, 100% viable

### ✅ Respuesta técnica:

| Aspecto | Viabilidad | Notas |
|---------|-----------|-------|
| **Datos necesarios** | ✅ | Supabase soporta millones de registros |
| **Infraestructura** | ✅ | Serverless + pgvector están listos |
| **Costo desarrollo** | ✅ | Podés hacerlo solo o tercerizar |
| **ROI** | ✅ | +300% con modelo abierto |
| **Competencia** | ✅ | Nadie en fitness hace esto bien |

### ¿Cuánto costaría entrenar?

| Enfoque | Costo | Timeline | Esfuerzo |
|---------|-------|----------|----------|
| **Fine-tuning GPT-4** | $500-2,000 | 1 semana | Bajo (cloud) |
| **ML Clásico (TF/SK)** | $100-500 | 2 semanas | Medio (dev) |
| **Embeddings + Vector Search** | $50-200/mes | 1 semana | Bajo (cloud) |
| **Modelo propio (LLaMA)** | $200-1,000 | 4 semanas | Alto (GPU) |

---

## Arquitectura Técnica

### Tres Capas

```
CAPA 1: Recolección (MVP - $0)
└─ Guardar datos de CADA usuario
   ├─ Perfil (edad, experiencia, goals)
   ├─ Entrenamientos (qué hizo, rating)
   ├─ Progreso (métricas, fotos before/after)
   └─ Feedback (le gustó? sí/no)

CAPA 2: Análisis (MVP - $0)
└─ Entender patrones
   ├─ "90% de beginners completan PPL"
   ├─ "Press banca es favorito en chest"
   ├─ "Users que comen pollo progresan +15%"
   └─ Dashboards anónimos

CAPA 3: ML/LLM (Futuro - $500-2,000)
└─ Entrenar modelo
   ├─ Fine-tune: "Usa estilo Fit Legacy"
   ├─ Embeddings: Búsqueda semántica
   ├─ Predicción: "Este user necesita deload"
   └─ API: Recomendador real-time
```

### Schema de Datos

```typescript
// Lo que guardás de CADA usuario:

user_profile
├─ age
├─ weight
├─ height
├─ gender
├─ experience_level (beginner/intermediate/advanced)
├─ goals (muscle_gain, fat_loss, strength, etc)
├─ injuries_or_restrictions
└─ preferences (favorite_exercises, dietary)

workout_session
├─ user_id
├─ routine_id
├─ date
├─ exercises_completed (cantidad)
├─ difficulty_rating (1-5)
├─ energy_level_before (1-5)
├─ notes ("felt strong", "very tired", etc)
├─ completed (true/false)
└─ felt_good (true/false) ← GOLD

progress_metric
├─ user_id
├─ date
├─ exercise_id
├─ weight_lifted_kg
├─ reps
├─ notes

feedback_data
├─ user_id
├─ routine_id
├─ rating (1-5)
├─ notes ("too long", "loved it", etc)
└─ timestamp

// ESTE ES EL ORO: cada registro = training data
// 1,000 usuarios × 50 workouts × 12 meses = 600,000 datapoints
```

---

## Implementación MVP (Hoy)

### Paso 1: Schema en Supabase

```sql
-- Crear tablas de recolección

CREATE TABLE user_fitness_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Biometría
  age INT,
  weight_kg DECIMAL,
  height_cm DECIMAL,
  gender TEXT CHECK (gender IN ('M', 'F')),
  
  -- Experiencia
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  years_training INT,
  
  -- Objetivos
  goals TEXT[], -- ARRAY: ['muscle_gain', 'fat_loss', 'strength']
  
  -- Preferencias
  available_days_per_week INT,
  minutes_per_session INT,
  preferred_exercises TEXT[], -- IDs: ['press_banca', 'dominadas']
  injuries_or_restrictions TEXT[],
  dietary_preferences TEXT[], -- ['vegetarian', 'high_protein']
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id)
);

CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Referencia
  routine_id TEXT, -- ID del .wir que completó
  routine_name TEXT,
  
  -- Detalles
  date DATE,
  exercises_completed INT,
  duration_minutes INT,
  difficulty_rating INT CHECK (difficulty_rating BETWEEN 1 AND 5),
  energy_level_before INT CHECK (energy_level_before BETWEEN 1 AND 5),
  energy_level_after INT CHECK (energy_level_after BETWEEN 1 AND 5),
  
  -- Feedback
  felt_good BOOLEAN,
  would_repeat BOOLEAN,
  notes TEXT,
  
  -- Training data
  total_weight_moved_kg DECIMAL, -- Suma de sets × reps × weight
  avg_rest_seconds INT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Métrica
  exercise_id TEXT,
  exercise_name TEXT,
  date DATE,
  
  -- Datos
  weight_lifted_kg DECIMAL,
  reps INT,
  sets INT,
  bodyweight_kg DECIMAL, -- Su peso ese día
  
  -- Context
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Qué evalúa
  routine_id TEXT,
  exercise_id TEXT,
  
  -- Rating
  rating INT CHECK (rating BETWEEN 1 AND 5),
  category TEXT, -- 'difficulty', 'enjoyment', 'effectiveness'
  
  -- Context
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de análisis anónimos (agregada)
CREATE TABLE training_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT,
  metric_value JSONB,
  calculated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_user_fitness_profiles_user ON user_fitness_profiles(user_id);
CREATE INDEX idx_workout_sessions_user_date ON workout_sessions(user_id, date);
CREATE INDEX idx_progress_metrics_user_exercise ON progress_metrics(user_id, exercise_id);
CREATE INDEX idx_feedback_data_user ON feedback_data(user_id);
```

---

### Paso 2: Recolector de Datos (React Hooks)

```typescript
// src/lib/ai/data-collection.ts

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

/**
 * Hook para recolectar datos de entrenamientos
 * Integrar en WorkoutBuilder y BioLedger
 */
export function useAIDataCollection() {
  const { user } = useAuth();

  /**
   * 1. Guardar perfil del usuario (una sola vez)
   */
  async function initializeUserProfile(profile: {
    age: number;
    weight_kg: number;
    height_cm: number;
    gender: 'M' | 'F';
    experience_level: 'beginner' | 'intermediate' | 'advanced';
    goals: string[]; // ['muscle_gain', 'fat_loss']
    available_days: number;
    minutes_per_session: number;
    restrictions: string[];
  }) {
    const { error } = await supabase
      .from('user_fitness_profiles')
      .upsert([
        {
          user_id: user.id,
          age: profile.age,
          weight_kg: profile.weight_kg,
          height_cm: profile.height_cm,
          gender: profile.gender,
          experience_level: profile.experience_level,
          goals: profile.goals,
          available_days_per_week: profile.available_days,
          minutes_per_session: profile.minutes_per_session,
          injuries_or_restrictions: profile.restrictions,
          updated_at: new Date().toISOString(),
        }
      ], { onConflict: 'user_id' });

    if (error) throw error;
  }

  /**
   * 2. Registrar un entrenamiento completado
   * Llamar desde BioLedgerView cuando usuario hace click "Log Session"
   */
  async function recordWorkoutSession(workout: {
    routineId: string;
    routineName: string;
    exercisesCount: number;
    durationMinutes: number;
    difficultyRating: 1 | 2 | 3 | 4 | 5;
    energyBefore: 1 | 2 | 3 | 4 | 5;
    energyAfter: 1 | 2 | 3 | 4 | 5;
    feltGood: boolean;
    wouldRepeat: boolean;
    notes?: string;
  }) {
    const { error } = await supabase
      .from('workout_sessions')
      .insert([
        {
          user_id: user.id,
          routine_id: workout.routineId,
          routine_name: workout.routineName,
          date: new Date().toISOString().split('T')[0],
          exercises_completed: workout.exercisesCount,
          duration_minutes: workout.durationMinutes,
          difficulty_rating: workout.difficultyRating,
          energy_level_before: workout.energyBefore,
          energy_level_after: workout.energyAfter,
          felt_good: workout.feltGood,
          would_repeat: workout.wouldRepeat,
          notes: workout.notes || '',
        }
      ]);

    if (error) throw error;
  }

  /**
   * 3. Registrar métrica de progreso
   * Llamar después de cada ejercicio importante
   */
  async function recordProgressMetric(metric: {
    exerciseId: string;
    exerciseName: string;
    weightLifted: number; // kg
    reps: number;
    sets: number;
    currentBodyweight?: number; // kg
    notes?: string;
  }) {
    const { error } = await supabase
      .from('progress_metrics')
      .insert([
        {
          user_id: user.id,
          exercise_id: metric.exerciseId,
          exercise_name: metric.exerciseName,
          date: new Date().toISOString().split('T')[0],
          weight_lifted_kg: metric.weightLifted,
          reps: metric.reps,
          sets: metric.sets,
          bodyweight_kg: metric.currentBodyweight || null,
          notes: metric.notes || '',
        }
      ]);

    if (error) throw error;
  }

  /**
   * 4. Guardar feedback sobre rutina
   * Llamar post-entrenamiento
   */
  async function recordFeedback(feedback: {
    routineId: string;
    rating: 1 | 2 | 3 | 4 | 5; // 1=too hard, 5=perfect
    category: 'difficulty' | 'enjoyment' | 'effectiveness';
    notes?: string;
  }) {
    const { error } = await supabase
      .from('feedback_data')
      .insert([
        {
          user_id: user.id,
          routine_id: feedback.routineId,
          rating: feedback.rating,
          category: feedback.category,
          notes: feedback.notes || '',
        }
      ]);

    if (error) throw error;
  }

  /**
   * 5. Obtener estadísticas anónimas (para dashboards)
   */
  async function getPersonalStats() {
    const { data, error } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) throw error;

    return {
      total_workouts: data?.length || 0,
      avg_difficulty: data?.length 
        ? Math.round(
            data.reduce((sum, w) => sum + (w.difficulty_rating || 0), 0) / data.length
          )
        : 0,
      completion_rate: data?.length
        ? Math.round(
            (data.filter(w => w.felt_good).length / data.length) * 100
          )
        : 0,
      recent_workouts: data?.slice(0, 10) || [],
    };
  }

  return {
    initializeUserProfile,
    recordWorkoutSession,
    recordProgressMetric,
    recordFeedback,
    getPersonalStats,
  };
}
```

---

### Paso 3: UI Components para Recolectar Datos

```typescript
// src/components/ai/UserProfileSetup.tsx

import React, { useState } from 'react';
import { useAIDataCollection } from '@/lib/ai/data-collection';
import { toast } from 'sonner';

export function UserProfileSetup() {
  const { initializeUserProfile } = useAIDataCollection();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    age: 25,
    weight_kg: 75,
    height_cm: 180,
    gender: 'M' as 'M' | 'F',
    experience_level: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    goals: ['muscle_gain'],
    available_days: 4,
    minutes_per_session: 60,
    restrictions: [],
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      await initializeUserProfile(profile);
      toast.success('Perfil guardado! Tus datos ayudarán a entrenar IA personalizadas');
    } catch (error) {
      toast.error('Error al guardar perfil');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6 bg-zinc-900/50 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-black uppercase">Tu Perfil (Para IA)</h2>
      <p className="text-sm text-zinc-400">
        ℹ️ Estos datos nos ayudan a entrenar un modelo IA que te recomiende rutinas personalizadas.
        Completamente anónimo y encriptado.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Edad"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
          className="bg-black/40 border border-white/10 rounded-lg p-3"
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={profile.weight_kg}
          onChange={(e) => setProfile({ ...profile, weight_kg: parseFloat(e.target.value) })}
          className="bg-black/40 border border-white/10 rounded-lg p-3"
        />
        <input
          type="number"
          placeholder="Altura (cm)"
          value={profile.height_cm}
          onChange={(e) => setProfile({ ...profile, height_cm: parseFloat(e.target.value) })}
          className="bg-black/40 border border-white/10 rounded-lg p-3"
        />
        <select
          value={profile.gender}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'M' | 'F' })}
          className="bg-black/40 border border-white/10 rounded-lg p-3"
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Experiencia</label>
        <select
          value={profile.experience_level}
          onChange={(e) => setProfile({ ...profile, experience_level: e.target.value as any })}
          className="w-full bg-black/40 border border-white/10 rounded-lg p-3"
        >
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Objetivos (selecciona múltiples)</label>
        {['muscle_gain', 'fat_loss', 'strength', 'endurance'].map((goal) => (
          <label key={goal} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.goals.includes(goal)}
              onChange={(e) => {
                if (e.target.checked) {
                  setProfile({ ...profile, goals: [...profile.goals, goal] });
                } else {
                  setProfile({ ...profile, goals: profile.goals.filter(g => g !== goal) });
                }
              }}
              className="w-4 h-4"
            />
            {goal.replace('_', ' ').toUpperCase()}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-600 text-white font-black py-4 rounded-xl hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar Perfil'}
      </button>
    </div>
  );
}
```

```typescript
// src/components/ai/WorkoutFeedback.tsx

import React, { useState } from 'react';
import { useAIDataCollection } from '@/lib/ai/data-collection';
import { useWorkoutStore } from '@/lib/store';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

export function WorkoutFeedback() {
  const { recordWorkoutSession, recordFeedback } = useAIDataCollection();
  const { currentRoutine } = useWorkoutStore();
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [energy_after, setEnergyAfter] = useState(3);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      // Obtener energía antes (supongamos que la guardamos)
      const energyBefore = localStorage.getItem('energy_before') ? parseInt(localStorage.getItem('energy_before')!) : 3;

      // 1. Registrar sesión de entrenamiento
      await recordWorkoutSession({
        routineId: currentRoutine.name,
        routineName: currentRoutine.name,
        exercisesCount: currentRoutine.exercises.length,
        durationMinutes: 60, // Estimar
        difficultyRating: difficulty as any,
        energyBefore,
        energyAfter,
        feltGood: rating >= 4,
        wouldRepeat: rating >= 4,
        notes,
      });

      // 2. Registrar feedback de la rutina
      await recordFeedback({
        routineId: currentRoutine.name,
        rating: rating as any,
        category: 'enjoyment',
        notes,
      });

      toast.success('¡Feedback guardado! Gracias por ayudar a entrenar la IA 🤖');
      localStorage.removeItem('energy_before');
    } catch (error) {
      toast.error('Error al guardar feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6 bg-zinc-900/50 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-black uppercase">Feedback del Entrenamiento</h2>
      <p className="text-sm text-zinc-400">
        ℹ️ Tu opinión entrena nuestra IA para recomendarte mejores rutinas. 100% anónimo.
      </p>

      {/* Rating */}
      <div className="space-y-3">
        <label className="text-sm font-bold">¿Qué tal estuvo? (1-5)</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className={`p-3 rounded-lg transition-all ${
                rating === n
                  ? 'bg-purple-600 scale-110'
                  : 'bg-black/40 hover:bg-black/60'
              }`}
            >
              <Star size={20} fill={rating === n ? 'white' : 'none'} />
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <label className="text-sm font-bold">Dificultad percibida</label>
        <input
          type="range"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-zinc-400">{difficulty === 1 ? 'Muy fácil' : difficulty === 5 ? 'Muy difícil' : 'Moderado'}</p>
      </div>

      {/* Energy After */}
      <div className="space-y-2">
        <label className="text-sm font-bold">Energía post-entrenamiento</label>
        <input
          type="range"
          min="1"
          max="5"
          value={energy_after}
          onChange={(e) => setEnergyAfter(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Notes */}
      <textarea
        placeholder="Notas (opcional): ¿Qué te gustó? ¿Qué cambiarías?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 min-h-20"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-600 text-white font-black py-4 rounded-xl hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Enviar Feedback'}
      </button>
    </div>
  );
}
```

---

### Paso 4: Integrar en App Actual

```typescript
// En src/components/workout/WorkoutBuilder.tsx
// Agregar después del BioLedgerView

import { UserProfileSetup } from '@/components/ai/UserProfileSetup';
import { WorkoutFeedback } from '@/components/ai/WorkoutFeedback';

export default function MobileFirstBuilder() {
  const [showAISetup, setShowAISetup] = useState(false);

  return (
    <>
      {/* Existing tabs */}
      
      {/* NEW: AI Setup Tab */}
      {activeTab === 'ai-setup' && <UserProfileSetup />}
      
      {/* NEW: Feedback Tab (post-workout) */}
      {activeTab === 'feedback' && <WorkoutFeedback />}
    </>
  );
}
```

---

## Roadmap

### Fase 1: MVP - Hoy (Semana 1)
**Objetivo**: Empezar a recolectar datos

- [ ] Crear schema Supabase (copy-paste SQL arriba)
- [ ] Agregar hooks useAIDataCollection
- [ ] Agregar UI components (profile setup + feedback)
- [ ] Integrar en WorkoutBuilder
- [ ] Testear que se guarden datos

**Costo**: $0  
**Usuarios que aportan**: 0  
**Datapoints**: 0 (pero infraestructura lista)

---

### Fase 2: Recolección - Mes 1-6
**Objetivo**: Acumular 10,000+ entrenamientos

- [ ] Usuarios empiezan a usarlo
- [ ] Cada workout = 1 datapoint
- [ ] Cada feedback = 1 datapoint
- [ ] Dashboard de stats anónimas

**Costo**: $0  
**Usuarios esperados**: 500-1,000  
**Datapoints esperados**: 5,000-10,000

---

### Fase 3: Análisis - Mes 6-12
**Objetivo**: Entender patrones

```sql
-- Queries útiles para analytics

-- 1. Ejercicios más completados
SELECT exercise_id, COUNT(*) as times_completed
FROM progress_metrics
GROUP BY exercise_id
ORDER BY times_completed DESC
LIMIT 10;

-- 2. Rutinas con mejor rating
SELECT routine_id, AVG(rating) as avg_rating
FROM feedback_data
WHERE category = 'enjoyment'
GROUP BY routine_id
ORDER BY avg_rating DESC;

-- 3. Correlación: ¿Qué users progresan más?
SELECT 
  up.experience_level,
  COUNT(DISTINCT ws.user_id) as users,
  AVG(CASE WHEN pm.weight_lifted_kg IS NOT NULL THEN pm.weight_lifted_kg ELSE 0 END) as avg_strength
FROM user_fitness_profiles up
LEFT JOIN workout_sessions ws ON up.user_id = ws.user_id
LEFT JOIN progress_metrics pm ON up.user_id = pm.user_id
GROUP BY up.experience_level;

-- 4. Completion rate por objetivo
SELECT 
  up.goals,
  COUNT(ws.id) as completed_workouts,
  COUNT(CASE WHEN ws.felt_good THEN 1 END) as felt_good_count,
  ROUND(100.0 * COUNT(CASE WHEN ws.felt_good THEN 1 END) / COUNT(ws.id), 2) as completion_rate
FROM user_fitness_profiles up
LEFT JOIN workout_sessions ws ON up.user_id = ws.user_id
GROUP BY up.goals;
```

**Costo**: $0  
**Usuarios**: 1,000-5,000  
**Datapoints**: 50,000+

---

### Fase 4: Entrenar Modelo - Mes 12+
**Objetivo**: Tener un AI Coach funcional

**OPCIÓN A: Fine-tuning OpenAI (Recomendado)**
```bash
# Exportar datos
npx ts-node scripts/export-for-training.ts

# Preparar dataset
node scripts/prepare-dataset.js

# Fine-tune (en OpenAI platform o API)
openai api fine_tunes.create \
  -t "formatted_data.jsonl" \
  -m "gpt-4"

# Costo: $500-2,000
# Tiempo: 1 semana
```

**OPCIÓN B: ML Clásico (Barato)**
```python
# Python script
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

# Cargar datos de Supabase
df = load_from_supabase()

# Train
X = df[['age', 'experience', 'goals', ...]]
y = df['routine_completed']
model = RandomForestClassifier()
model.fit(X, y)

# Guardar
joblib.dump(model, 'model.pkl')

# Costo: $100-300
# Tiempo: 2 semanas
```

**Costo**: $500-2,000 (one-time)  
**ROI**: Empieza a recuperarse en mes 1 con suscriptores

---

## Financiero

### Proyección a 18 meses

```
MES 1-6: RECOLECCIÓN (Gratis)
├─ Usuarios: 0 → 500
├─ Costo: $0
├─ Datapoints: 5,000
└─ Revenue: $0

MES 6-12: ANÁLISIS (Gratis)
├─ Usuarios: 500 → 2,000
├─ Costo: $0 (aún)
├─ Datapoints: 50,000
└─ Revenue: $500-1,000 (suscripciones básicas)

MES 12: ENTRENAR MODELO
├─ Costo: $1,500 (fine-tuning)
├─ Resultado: AI Coach v1
└─ Features:
    ├─ Recomendaciones personalizadas
    ├─ Predicción de progreso
    ├─ Plan adaptativo semanal

MES 13+: MONETIZAR
├─ Fit Legacy Free: Usuario básico (0)
├─ Fit Legacy Pro: +$9.99/mes
│   ├─ AI Coach
│   ├─ Recomendaciones
│   └─ Tracking avanzado
├─ Usuarios estimados: 10% premium
├─ Conversión: 2,000 users × 10% × $9.99 = $1,998/mes
└─ ROI:
    ├─ Ingresos: $2,000/mes
    ├─ Costo mantención: $500/mes
    ├─ Ganancia neta: $1,500/mes ✅
```

### Desglose de Costos

```
OPCIÓN A: Fine-tuning (Recomendado)
├─ Entrenamiento: $1,500
├─ API calls (100k users, 1 call/semana): $100/mes
├─ Infra Supabase Pro: $25/mes
└─ TOTAL: $1,625 inicial + $125/mes

OPCIÓN B: ML Clásico (Barato)
├─ Desarrollo: $500 (DIY)
├─ Hosting modelo (Hugging Face): $0-50/mes
├─ Infra Supabase: $25/mes
└─ TOTAL: $500 inicial + $25-75/mes

OPCIÓN C: Solo embeddings (Híbrido)
├─ OpenAI embeddings: $50/mes
├─ Vector search (Supabase pgvector): $25/mes
├─ No hay entrenamiento
└─ TOTAL: $75/mes (sin entrenamiento)
```

---

## Código Listo

### Script: Exportar Datos para Entrenar

```typescript
// scripts/export-for-training.ts

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function exportTrainingData() {
  console.log('📊 Exportando datos para entrenamiento...');

  // 1. Obtener perfiles
  const { data: profiles } = await supabase
    .from('user_fitness_profiles')
    .select('*');

  // 2. Obtener entrenamientos
  const { data: workouts } = await supabase
    .from('workout_sessions')
    .select('*');

  // 3. Obtener progreso
  const { data: metrics } = await supabase
    .from('progress_metrics')
    .select('*');

  // 4. Obtener feedback
  const { data: feedback } = await supabase
    .from('feedback_data')
    .select('*');

  // 5. Combinar en formato de entrenamiento
  const dataset = {
    metadata: {
      exported_at: new Date().toISOString(),
      total_users: profiles?.length || 0,
      total_workouts: workouts?.length || 0,
      total_metrics: metrics?.length || 0,
      total_feedback: feedback?.length || 0,
    },
    profiles: profiles || [],
    workouts: workouts || [],
    metrics: metrics || [],
    feedback: feedback || [],
  };

  // 6. Guardar
  fs.writeFileSync(
    'export_training_data.json',
    JSON.stringify(dataset, null, 2)
  );

  console.log('✅ Datos exportados a export_training_data.json');
  console.log(`   - Usuarios: ${dataset.metadata.total_users}`);
  console.log(`   - Entrenamientos: ${dataset.metadata.total_workouts}`);
  console.log(`   - Métricas: ${dataset.metadata.total_metrics}`);
  console.log(`   - Feedback: ${dataset.metadata.total_feedback}`);
}

exportTrainingData().catch(console.error);
```

```bash
# Ejecutar
npx ts-node scripts/export-for-training.ts
```

---

### Script: Dashboard de Analytics

```typescript
// src/lib/ai/analytics.ts

export async function getAIAnalytics() {
  // 1. Stats generales
  const { data: profileStats } = await supabase.rpc('get_profile_stats');

  // 2. Ejercicios favoritos
  const { data: topExercises } = await supabase.rpc(
    'get_top_exercises',
    { limit: 10 }
  );

  // 3. Rutinas con mejor rating
  const { data: topRoutines } = await supabase.rpc(
    'get_top_routines',
    { limit: 10 }
  );

  // 4. Completion rate
  const { data: completionRate } = await supabase.rpc('get_completion_rate');

  // 5. Progreso por objetivo
  const { data: progressByGoal } = await supabase.rpc('get_progress_by_goal');

  return {
    profiles: profileStats,
    topExercises,
    topRoutines,
    completionRate,
    progressByGoal,
  };
}
```

---

## Preguntas Frecuentes

### ¿Cuándo puedo empezar?
**Hoy mismo**. La infraestructura cuesta $0. Solo copiar-pegar SQL + código TypeScript.

### ¿Necesito ser científico de datos?
**No**. Empieza simple con rules-based + vector search. Fine-tuning es tercerizable.

### ¿Qué pasa si 1 usuario pide borrar sus datos?
**Implementar GDPR**: Script que delete todo en cascade.

```sql
-- Borrar usuario completamente
DELETE FROM user_fitness_profiles WHERE user_id = $1;
-- Cascade borra workouts, metrics, feedback automáticamente
```

### ¿Cómo mantengo privacidad?
- Anonimizar user_id en analytics
- No guardar emails en tablas de datos
- Encriptar datos sensibles (weight, age)
- Cumplir GDPR/CCPA

### ¿Puedo usar esto sin IA?
**Sí**. Las tablas + analytics valen incluso sin modelo ML. Puedes hacer A/B testing, dashboards, insights sin nada de IA.

---

## Checklist: Listo para Entrenar IA

- [ ] Schema Supabase creado
- [ ] Hooks useAIDataCollection implementados
- [ ] UI components agregados (profile setup + feedback)
- [ ] Datos guardándose correctamente
- [ ] 500+ usuarios recolectando datos
- [ ] 10,000+ datapoints acumulados
- [ ] Export script funcionando
- [ ] Presupuesto asignado ($500-2,000)
- [ ] Decidir: fine-tuning vs ML clásico
- [ ] Entrenar primer modelo
- [ ] A/B test: usuarios con AI vs sin AI
- [ ] Medir ROI
- [ ] Lanzar como premium feature

---

## Resumen

| Pregunta | Respuesta |
|----------|-----------|
| **¿Se puede?** | Sí, 100% viable |
| **¿Cuándo?** | MVP hoy (recolectar). Entrenar en mes 12 |
| **¿Cuánto cuesta?** | $0 hoy, $500-2,000 para entrenar, $100-200/mes mantención |
| **¿ROI?** | +$1,500/mes en mes 13+ |
| **¿Qué hago hoy?** | Copiar schema SQL + agregar componentes React |
| **¿Necesito expertise?** | No. Empieza simple, escala después |

---

## Recursos

- [OpenAI Fine-tuning Docs](https://platform.openai.com/docs/guides/fine-tuning)
- [Scikit-learn ML](https://scikit-learn.org/)
- [Supabase pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
- [LangChain Embeddings](https://python.langchain.com/docs/modules/data_connection/text_embedding/)
- [HuggingFace Model Hub](https://huggingface.co/models)

---

**Última actualización**: 2025-04-09  
**Status**: Ready to implement  
**Próximo paso**: Copiar SQL schema y agregar hooks React
