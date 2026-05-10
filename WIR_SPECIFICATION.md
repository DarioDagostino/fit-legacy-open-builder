# 📐 .wir Specification v1.0

`.wir` (Workout Interactive Resource) es un formato de intercambio de rutinas de entrenamiento y nutrición diseñado para ser **ultra-liviano, compartible por WhatsApp y open source**.

## 🎯 Filosofía

- **Zero infrastructure** — La rutina vive en la URL, no en un servidor
- **Portable** — Cualquier app puede implementar un lector `.wir`
- **Eterno** — Los links no expiran; los datos maestros se actualizan solos
- **Minimalista** — Solo IDs, no datos duplicados
- **Seamless** — Integración directa con el Builder de Legacy y distribución vía WhatsApp

## 🌎 Presencia en el Ecosistema

El formato `.wir` es uno de los pilares de valor presentados en la **Landing Page**. Permite que cualquier atleta genere un protocolo en el **Builder**, lo visualice como una portada cinematográfica y lo distribuya sin barreras técnicas.

---

## 📦 Estructura JSON

### Versión 1.0

```json
{
  "v": 1,
  "n": "RUTINA_NOMBRE",
  "c": "https://...",
  "e": [
    { "i": "press_banca", "s": 4, "r": 10, "w": 80 }
  ],
  "f": [
    { "i": "pollo", "q": 200 }
  ]
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción | Límites |
|---|---|---|---|---|
| `v` | number | ✅ | Versión del formato (siempre 1) | Exactamente `1` |
| `n` | string | ✅ | Nombre de la rutina | 1-100 caracteres |
| `c` | string | ❌ | URL de la portada generada por IA | ≤ 2048 chars, URL válida |
| `e` | array | ❌ | Lista de ejercicios | 0-20 items |
| `f` | array | ❌ | Lista de alimentos | 0-15 items |

**Regla**: Al menos uno de `e` o `f` debe estar presente y no vacío.

### Ejercicio (e)

| Campo | Tipo | Descripción | Límites |
|---|---|---|---|
| `i` | string | ID del ejercicio (ver catálogo maestro) | 1-50 caracteres |
| `s` | number | Número de series | 1-10 |
| `r` | number | Número de repeticiones | 1-100 |
| `w` | number | Peso en kg (0 = peso corporal) | 0-500 |

### Alimento (f)

| Campo | Tipo | Descripción | Límites |
|---|---|---|---|
| `i` | string | ID del alimento (ver catálogo maestro) | 1-50 caracteres |
| `q` | number | Cantidad en gramos | 25-1000 |

---

## 🔗 Serialización URL-safe

Para enviar por WhatsApp, el JSON se minifica y codifica en Base64 URL-safe:

```typescript
// 1. Minificar JSON
const minified = {
  v: 1,
  n: routine.name,
  c: routine.coverImageUrl,
  e: routine.exercises.map(e => ({ i: e.id, s: e.sets, r: e.reps, w: e.weight })),
  f: routine.foods.map(f => ({ i: f.id, q: f.quantity }))
};

// 2. Serializar
const json = JSON.stringify(minified);

// 3. Codificar Base64
const base64 = btoa(json);

// 4. Convertir a URL-safe (reemplazar caracteres especiales)
const encoded = base64
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');

// 5. Generar URL final
const wirUrl = `https://builder.fitlegacy.app/r/wir?data=${encoded}`;
```

### Decodificación

```typescript
function decodeWir(encoded: string) {
  // 1. Reemplazar caracteres URL-safe
  const base64 = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // 2. Agregar padding si es necesario
  const remainder = base64.length % 4;
  const padded = base64 + '='.repeat(remainder === 0 ? 0 : 4 - remainder);
  
  // 3. Decodificar
  const json = atob(padded);
  
  // 4. Parsear
  return JSON.parse(json);
}
```

---

## 🏋️ Catálogo maestro de IDs

Los IDs de ejercicios y alimentos se mantienen en el paquete **`@fit-legacy/shared`** (monorepo). El catálogo es **público, versionado y accesible**.

### Importar y usar catálogos

```typescript
import { 
  UNIFIED_EXERCISES, 
  UNIFIED_FOODS,
  getExerciseById,
  getFoodById,
  hasExercise,
  hasFood
} from '@fit-legacy/shared';

// Buscar un ejercicio por ID
const exercise = getExerciseById('press_banca');
// → { id: 'press_banca', name: 'Press Banca Plano', section: 'chest', ... }

// Buscar un alimento por ID
const food = getFoodById('pollo');
// → { id: 'pollo', name: 'Pechuga de Pollo', protein: 31, carbs: 0, fats: 3.6, calories: 165, ... }

// Validar existencia
if (hasExercise('press_banca')) { ... }
if (hasFood('pollo')) { ... }
```

### Ejercicios disponibles (55+)

**Pecho**
| ID | Nombre | Dificultad |
|---|---|---|
| `press_banca` | Press de banca plano | Principiante |
| `press_inclinado` | Press Banca Inclinado | Principiante |
| `press_mancuerna` | Press Mancuerna Plano | Principiante |
| `flexiones` | Flexiones | Principiante |
| `flies_pecho` | Flies Máquina Pecho | Principiante |

**Espalda**
| ID | Nombre | Dificultad |
|---|---|---|
| `peso_muerto` | Peso Muerto Convencional | Avanzado |
| `dominadas` | Dominadas | Intermedio |
| `remo_barra` | Remo con Barra | Intermedio |
| `poleas_dorsales` | Poleas Dorsales | Principiante |

**Piernas**
| ID | Nombre | Dificultad |
|---|---|---|
| `sentadilla` | Sentadilla con Barra | Intermedio |
| `leg_press` | Leg Press | Principiante |
| `sentadilla_goblet` | Goblet Squat | Principiante |
| `curl_pierna_acostado` | Curl Pierna Acostado | Principiante |

**Brazos**
| ID | Nombre | Dificultad |
|---|---|---|
| `curl_barra` | Curl Barra Z | Principiante |
| `curl_mancuerna` | Curl Mancuerna | Principiante |
| `fondos` | Fondos en Paralelas | Intermedio |
| `extension_triceps` | Extensión Tríceps Polea | Principiante |

**Cardio**
| ID | Nombre | Dificultad |
|---|---|---|
| `cinta_correr` | Cinta de Correr | Principiante |
| `bicicleta_fija` | Bicicleta Fija | Principiante |
| `burpees` | Burpees | Intermedio |
| `saltar_cuerda` | Saltar Cuerda | Principiante |

Ver **catálogo completo** en `_consolidated_workout_nutrition/packages/shared/index.ts`.

### Alimentos disponibles (40+)

**Proteínas**
| ID | Nombre | Kcal | Proteína | Carbs | Grasas |
|---|---|---|---|---|---|
| `pollo` | Pechuga de Pollo | 165 | 31g | 0g | 3.6g |
| `huevo` | Huevo Entero | 155 | 13g | 1.1g | 11g |
| `salmon` | Salmón | 208 | 20g | 0g | 13g |
| `carne_res` | Carne de Res (magra) | 165 | 26g | 0g | 5g |

**Carbohidratos**
| ID | Nombre | Kcal | Carbs | Proteína | Grasas |
|---|---|---|---|---|---|
| `arroz` | Arroz Blanco | 130 | 28g | 2.7g | 0.3g |
| `batata` | Batata Cocida | 86 | 21g | 1.6g | 0.1g |
| `avena` | Avena Cruda | 389 | 54g | 16g | 6.9g |
| `lentejas` | Lentejas Cocidas | 116 | 20g | 9g | 0.4g |

**Vegetales / Frutas**
| ID | Nombre | Kcal | Carbs | Proteína | Grasas |
|---|---|---|---|---|---|
| `brocoli` | Brócoli Cocido | 43 | 7.2g | 2.8g | 0.4g |
| `espinaca` | Espinaca Cruda | 23 | 3.6g | 2.7g | 0.4g |
| `platano` | Plátano | 105 | 27g | 1.1g | 0.3g |
| `aguacate` | Aguacate | 160 | 9g | 2g | 15g |

Ver **catálogo completo** en `_consolidated_workout_nutrition/packages/shared/index.ts` (12+ proteínas, 12+ carbohidratos, 8+ grasas, 10+ vegetales, 9+ frutas).

---

## 🧪 Validación

Para validar un documento `.wir`, usar el módulo `src/lib/wir`:

### Validación simple (recomendado)

```typescript
import { validateWir, formatValidationErrors } from 'src/lib/wir';

const result = validateWir({
  v: 1,
  n: 'MI_RUTINA',
  e: [{ i: 'press_banca', s: 4, r: 10, w: 80 }]
});

if (result.valid) {
  console.log('✅ Rutina válida');
} else {
  console.log(formatValidationErrors(result));
}
```

### Validación estricta (con catálogo)

```typescript
import { validateWir } from 'src/lib/wir';

const result = validateWir(data, {
  checkCatalog: true,  // Verifica IDs en catálogo
  checkSize: true,     // Advierte si excede límite WhatsApp
  strict: true         // Rechaza campos desconocidos
});

if (!result.valid) {
  result.errors?.forEach(err => console.log(`❌ ${err}`));
  result.catalogErrors?.forEach(err => console.log(`📋 ${err}`));
  result.sizeWarnings?.forEach(warn => console.log(`⚠️  ${warn}`));
}
```

### Validación rápida

```typescript
import { isValidWir, validateWirStrict } from 'src/lib/wir';

// Devuelve boolean (sin catálogo)
if (isValidWir(data)) { ... }

// Lanza error si inválido
const doc = validateWirStrict(data);
```

---

## 📏 Límites

| Elemento | Mínimo | Máximo | Razón |
|---|---|---|---|
| Nombre rutina | 1 | 100 chars | Legibilidad |
| Sets por ejercicio | 1 | 10 | Razonable para entrenamiento |
| Reps por ejercicio | 1 | 100 | Rango funcional |
| Peso kg | 0 | 500 | 0 = peso corporal, 500 = límite realista |
| Cantidad alimento | 25 | 1000 g | Practicidad de comida |
| **Ejercicios/rutina** | - | **20** | **URL < 2000 chars** |
| **Alimentos/rutina** | - | **15** | **URL < 2000 chars** |
| URL portada | - | 2048 | Límite HTTP standard |
| **URL completa final** | - | **~2000** | **⚠️ Límite WhatsApp** |

### Cálculo de límites

```typescript
import { getPayloadSize, exceedsWhatsAppLimit } from 'src/lib/wir';

// Ver estadísticas de tamaño
const sizes = getPayloadSize(routine);
console.log(`URL será: ${sizes.estimated} bytes`);
// → { json: 142, base64: 190, urlSafe: 190, estimated: 2015 }

// Verificar si cabe en WhatsApp
if (exceedsWhatsAppLimit(routine)) {
  console.log('❌ URL demasiado grande, reduce items');
} else {
  console.log('✅ Listo para compartir en WhatsApp');
}
```

---

## 💻 Implementación (Referencia)

Este es un ejemplo de cómo implementar soporte para `.wir` en tu app:

### 1. Codificar rutina

```typescript
import { encodeWir, toWirUrl } from 'src/lib/wir';

const routine = {
  v: 1,
  n: 'PUSH_DAY',
  e: [
    { i: 'press_banca', s: 4, r: 8, w: 100 },
    { i: 'fondos', s: 3, r: 10, w: 0 },
  ],
  f: [
    { i: 'pollo', q: 300 },
    { i: 'arroz', q: 200 }
  ]
};

// Generar URL lista para compartir
const shareUrl = toWirUrl(routine);
// → https://builder.fitlegacy.app/r/wir?data=eyJ2IjoxLCJuIjoiUFVTSF9EQVki...
```

### 2. Decodificar URL

```typescript
import { parseWirUrl, validateWir } from 'src/lib/wir';

// En el receptor, cuando abre el link
const routine = parseWirUrl(window.location.href);

// Validar
const validation = validateWir(routine, { checkCatalog: true });
if (validation.valid) {
  // Renderizar rutina
  console.log(`Ejercicios: ${routine.e?.length}`);
  console.log(`Alimentos: ${routine.f?.length}`);
}
```

### 3. Renderizar rutina

```typescript
import { getExerciseById, getFoodById } from '@fit-legacy/shared';

// Mostrar ejercicios
routine.e?.forEach(item => {
  const ex = getExerciseById(item.i);
  console.log(`${ex.name}: ${item.s}x${item.r} @ ${item.w}kg`);
});

// Mostrar alimentos
routine.f?.forEach(item => {
  const food = getFoodById(item.i);
  console.log(`${food.name}: ${item.q}g`);
});
```

---

## 🔄 Versionado

| Versión | Fecha | Estado | Cambios |
|---|---|---|---|
| 1.0 | 2026-04 | Actual | Versión inicial (Exercises + Foods) |

### Política de compatibilidad

- **v1** soporta todos los cambios descritos arriba
- Si se introduce **v2**: clientes deben rechazar versiones desconocidas con error legible
- Los IDs en el catálogo son **permanentes e inmutables** (nunca cambiar IDs existentes)
- Nuevos IDs se pueden agregar sin romper v1

---

## 🤝 Contribuciones

Para agregar nuevos ejercicios o alimentos al catálogo:

1. Editar `_consolidated_workout_nutrition/packages/shared/index.ts`
2. Agregar el nuevo item al array correspondiente
3. Mantener el mismo formato de estructura
4. Hacer PR al repositorio principal

### Ejemplo: Agregar un nuevo ejercicio

```typescript
// En UNIFIED_EXERCISES, dentro de la categoría apropiada
const CHEST_NEW_CATEGORY: ExerciseCategory = {
  category: 'Nueva Categoría',
  exercises: [
    { 
      id: 'nuevo_ejercicio_id',  // ID único, lowercase, snake_case
      name: 'Nombre del Ejercicio',
      section: 'chest',  // chest | back | legs | shoulders | arms | core | cardio
      difficulty: 'intermediate',
    }
  ]
};
```

---

## 📄 Licencia

MIT © Fit Legacy

## 🙏 Agradecimientos

- **UNIFIED_EXERCISES** — Base de datos colaborativa de ejercicios
- **UNIFIED_FOODS** — Tabla nutricional de alimentos
- **Comunidad Fitness** — Feedback y validación
- **Vercel** — Infraestructura para Edge Functions
- **Base64 URL-safe** — Encriptación estándar para URLs
