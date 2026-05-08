# 📐 .wir Specification v1.0

`.wir` (Workout Interactive Resource) es un formato de intercambio de rutinas de entrenamiento y nutrición diseñado para ser **ultra-liviano, compartible por WhatsApp y open source**.

## 🎯 Filosofía

- **Zero infrastructure** — La rutina vive en la URL, no en un servidor
- **Portable** — Cualquier app puede implementar un lector `.wir`
- **Eterno** — Los links no expiran; los datos maestros se actualizan solos
- **Minimalista** — Solo IDs, no datos duplicados
- **Seamless** — Integración directa con el Co-work de Legacy AI y la Landing Page

## 🌎 Presencia en el Ecosistema
El formato `.wir` es uno de los pilares de valor presentados en la **Landing Page**. Permite que cualquier atleta genere un protocolo en el **Builder**, lo visualice como una portada cinematográfica y lo distribuya sin barreras técnicas.

## 📦 Estructura JSON

### Versión 1.0

```json
{
  "v": 1,
  "n": "string",
  "c": "string | null",
  "e": [
    { "i": "string", "s": "number", "r": "number", "w": "number" }
  ],
  "f": [
    { "i": "string", "q": "number" }
  ]
}
```

### Campos
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `v` | number | ✅ | Versión del formato (1) |
| `n` | string | ✅ | Nombre de la rutina (uppercase recomendado) |
| `c` | string | ❌ | URL de la portada generada por IA |
| `e` | array | ❌ | Lista de ejercicios |
| `f` | array | ❌ | Lista de alimentos |

### Ejercicio (e)
| Campo | Tipo | Descripción |
|---|---|---|
| `i` | string | ID del ejercicio (ver catálogo maestro) |
| `s` | number | Número de series (1-10) |
| `r` | number | Número de repeticiones (1-100) |
| `w` | number | Peso en kg (0 si es peso corporal) |

### Alimento (f)
| Campo | Tipo | Descripción |
|---|---|---|
| `i` | string | ID del alimento (ver catálogo maestro) |
| `q` | number | Cantidad en gramos |

## 🔗 Serialización URL-safe
Para enviar por WhatsApp, el JSON se minifica y codifica en Base64 URL-safe:

```typescript
// Minificación (remover espacios, usar claves cortas)
const minified = {
  v: 1,
  n: routine.name,
  c: routine.coverImageUrl,
  e: routine.exercises.map(e => ({ i: e.id, s: e.sets, r: e.reps, w: e.weight })),
  f: routine.foods.map(f => ({ i: f.id, q: f.quantity }))
};

// Codificación Base64 URL-safe
const encoded = btoa(JSON.stringify(minified))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

// Link final
const wirUrl = `https://fitlegacy.app/r/wir?data=${encoded}`;
```

### Decodificación
```typescript
function decodeWir(encoded: string) {
  // Reemplazar caracteres URL-safe
  const base64 = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // Decodificar y parsear
  const json = atob(base64);
  return JSON.parse(json);
}
```

## 🗄️ Catálogo maestro de IDs
Los IDs de ejercicios y alimentos se mantienen en el paquete **`@fit-legacy/shared`** (monorepo).

```typescript
// Importar catálogos en cualquier app del monorepo
import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';

// Buscar un ejercicio por ID
const allExercises = Object.values(UNIFIED_EXERCISES)
  .flatMap(sections => sections.flatMap(s => s.exercises));
const exercise = allExercises.find(ex => ex.id === 'press_banca');

// Buscar un alimento por ID
const allFoods = Object.values(UNIFIED_FOODS).flat();
const food = allFoods.find(f => f.id === 'pollo');
```

**Ejercicios comunes**
| ID | Nombre | Grupo muscular |
|---|---|---|
| `press_banca` | Press de banca plano | Pecho |
| `sentadilla` | Sentadilla con barra | Piernas |
| `peso_muerto` | Peso muerto convencional | Espalda |
| `dominadas` | Dominadas | Espalda |
| `fondos` | Fondos en paralelas | Tríceps/Pecho |

**Alimentos comunes**
| ID | Nombre | Aporte (por 100g) |
|---|---|---|
| `pollo` | Pechuga de pollo | 165 cal, 31g proteína |
| `arroz` | Arroz blanco | 130 cal, 28g carbohidratos |
| `huevo` | Huevo entero | 155 cal, 13g proteína |

Ver catálogo completo en `exercises.ts` y `foods.ts`.

## 🧪 Validación
Para validar que un `.wir` es correcto, usar el helper de `@fit-legacy/shared`:

```typescript
import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';

function validateWir(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.v || data.v !== 1) errors.push('Versión inválida');
  if (!data.n || typeof data.n !== 'string') errors.push('Nombre requerido');
  
  const allExercises = Object.values(UNIFIED_EXERCISES)
    .flatMap(s => s.flatMap((g: any) => g.exercises));
  const allFoods = Object.values(UNIFIED_FOODS).flat() as any[];
  
  (data.e || []).forEach((e: any) => {
    if (!allExercises.find((ex: any) => ex.id === e.i))
      errors.push(`ID de ejercicio desconocido: ${e.i}`);
  });
  
  (data.f || []).forEach((f: any) => {
    if (!allFoods.find((fd: any) => fd.id === f.i))
      errors.push(`ID de alimento desconocido: ${f.i}`);
  });
  
  return { valid: errors.length === 0, errors };
}
```

## 📏 Límites
| Campo | Máximo |
|---|---|
| Ejercicios por rutina | 20 |
| Alimentos por rutina | 15 |
| Nombre de rutina | 50 caracteres |
| URL de portada | 2048 caracteres |

## 🔄 Versionado
| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | 2026-04 | Versión inicial |

> [!NOTE]  
> El catálogo maestro vive en `packages/shared/data/exercises.ts` y `packages/shared/data/foods.ts`.  
> Para agregar nuevos IDs, modificar esos archivos y hacer PR al monorepo.

## 🤝 Cómo contribuir
- Proponé cambios via Pull Request
- Mantené compatibilidad hacia atrás
- Actualizá este documento

Licencia: CC BY-SA 4.0
