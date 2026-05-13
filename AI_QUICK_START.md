# 🚀 QUICK START: ENTRENAR IA PARA FIT LEGACY

## En 30 segundos

**HOY**: Copiar SQL schema en Supabase + agregar 3 componentes React  
**RESULTADO**: Empezar a recolectar datos de usuarios (gratis)

**MES 12**: Exportar 50,000+ datapoints → Entrenar modelo  
**RESULTADO**: AI Coach premium ($9.99/mes)

---

## Copy-Paste This (5 min setup)

### 1️⃣ SQL Schema (Supabase)

```bash
# 1. Ir a Supabase → SQL Editor
# 2. Crear nueva query
# 3. Copy-paste COMPLETO desde "AI_TRAINING_GUIDE.md" (sección "SQL Schema")
# 4. Run

# Si todo OK → ✅ 5 tablas creadas
```

### 2️⃣ React Hooks (tu repo)

```bash
# Copiar archivo completo:
cp AI_TRAINING_GUIDE.md src/lib/ai/data-collection.ts
# (O copy-paste el código TypeScript)
```

### 3️⃣ UI Components

```bash
# Crear dos archivos:
src/components/ai/UserProfileSetup.tsx
src/components/ai/WorkoutFeedback.tsx

# Copy-paste desde AI_TRAINING_GUIDE.md
```

### 4️⃣ Integrar en WorkoutBuilder

```typescript
// En WorkoutBuilder.tsx agregar:

import { UserProfileSetup } from '@/components/ai/UserProfileSetup';
import { WorkoutFeedback } from '@/components/ai/WorkoutFeedback';

// Ya está listo para usar
```

---

## Timeline Visual

```
HOY
 └─ Schema ✅
 └─ Hooks ✅
 └─ UI Components ✅
 └─ Costo: $0 ⏱️ 30 min

MES 1-12: RECOLECTAR
 └─ Usuarios hacen entrenamientos
 └─ Se guardan automáticamente
 └─ Costo: $0
 └─ Acumulan: 50,000+ datapoints

MES 12: ENTRENAR
 └─ Export query → JSON
 └─ Fine-tune OpenAI o ML clásico
 └─ Costo: $500-2,000
 └─ Tiempo: 1-2 semanas

MES 13+: MONETIZAR
 └─ Lanzar "AI Coach Premium"
 └─ $9.99/mes
 └─ ROI: +$1,500/mes
```

---

## Checklist MVP (Today)

- [ ] Copiar SQL schema
- [ ] Crear data-collection.ts
- [ ] Crear UserProfileSetup.tsx
- [ ] Crear WorkoutFeedback.tsx
- [ ] Integrar en WorkoutBuilder
- [ ] Test: llenar formulario → verificar en Supabase
- [ ] Deploy a producción

**Total tiempo**: 1-2 horas  
**Total costo**: $0

---

## What Gets Saved Automatically

```
Cada usuario que completa entrenamiento:
├─ Perfil (edad, peso, experiencia, goals)
├─ Sesión completada (sets, reps, rating)
├─ Métricas de progreso (peso levantado)
├─ Feedback (1-5 estrellas + notas)
└─ = TRAINING DATA GOLD 🏆

500 usuarios × 50 workouts = 25,000 datapoints
1,000 usuarios × 50 workouts = 50,000 datapoints ← Suficiente para entrenar
```

---

## Después (Month 12+)

```typescript
// Cuando tengas dinero:

const dataset = await exportTrainingData(); // ← Script incluido

await fineTuneOpenAI({
  data: dataset,
  cost: '$1,500',
  result: 'AI Coach',
});

// Lanzar premium feature
// Users pagan $9.99/mes
// Ganas $1,500/mes 🚀
```

---

## Costs Breakdown

| Mes | Actividad | Costo |
|-----|-----------|-------|
| 1-12 | Recolectar datos | $0 |
| 12 | Fine-tune (one-time) | $1,500 |
| 13+ | Mantención API | $100-200/mes |
| 13+ | Infra Supabase | $25/mes |

**Break-even**: 2,000 usuarios × 10% premium = $2,000/mes (cubre todos costos)

---

## Files to Create

```
src/lib/ai/
├─ data-collection.ts      ← Copy from AI_TRAINING_GUIDE.md
├─ analytics.ts            ← Copy from AI_TRAINING_GUIDE.md
└─ training-export.ts      ← Copy from AI_TRAINING_GUIDE.md

src/components/ai/
├─ UserProfileSetup.tsx    ← Copy from AI_TRAINING_GUIDE.md
└─ WorkoutFeedback.tsx     ← Copy from AI_TRAINING_GUIDE.md

scripts/
└─ export-for-training.ts  ← Copy from AI_TRAINING_GUIDE.md
```

---

## That's It!

Everything is in **AI_TRAINING_GUIDE.md** — copy-paste ready.

No more "how do I train an AI?"  
Now: "Hey, I'm already collecting data for free" 🎉

**When you have $500-2000 and 50k+ datapoints:**
```bash
npm run export:training
# Wait 2 weeks
# Launch premium feature
# Profit 📈
```

---

**Status**: ✅ Ready to implement  
**Next**: Read full guide, copy schema, code, test.
