# 📐 .wir Module

Módulo central para codificar, decodificar y validar documentos `.wir` (Workout Interactive Resource).

## 🚀 Quick Start

### Instalación

No se requiere instalación. El módulo está integrado en el monorepo.

```typescript
import { 
  encodeWir, 
  decodeWir, 
  validateWir,
  toWirUrl,
  parseWirUrl 
} from 'src/lib/wir';
```

### Uso básico

#### 1. Crear una rutina

```typescript
import { toWirUrl } from 'src/lib/wir';

const routine = {
  v: 1,
  n: 'PUSH_DAY',
  e: [
    { i: 'press_banca', s: 4, r: 10, w: 100 },
    { i: 'fondos', s: 3, r: 12, w: 0 },
  ],
  f: [
    { i: 'pollo', q: 300 },
    { i: 'arroz', q: 200 },
  ]
};

// Generar URL para compartir
const shareUrl = toWirUrl(routine);
// → https://builder.fitlegacy.app/r/wir?data=eyJ2IjoxLCJu...
```

#### 2. Validar rutina

```typescript
import { validateWir } from 'src/lib/wir';

const result = validateWir(routine);

if (result.valid) {
  console.log('✅ Rutina válida');
} else {
  result.errors.forEach(err => console.error(err));
}
```

#### 3. Decodificar URL

```typescript
import { parseWirUrl } from 'src/lib/wir';

// Cuando el usuario abre el link
const routine = parseWirUrl(window.location.href);

// Renderizar
console.log(`Ejercicios: ${routine.e?.length}`);
console.log(`Alimentos: ${routine.f?.length}`);
```

---

## 📚 API Reference

### `encodeWir(doc: WirDocument): string`

Codifica un documento a Base64 URL-safe.

```typescript
const encoded = encodeWir(routine);
// → "eyJ2IjoxLCJu..."
```

### `decodeWir(encoded: string): WirDocument`

Decodifica un string Base64 URL-safe a documento.

```typescript
const routine = decodeWir("eyJ2IjoxLCJu...");
```

### `toWirUrl(doc: WirDocument, baseUrl?: string): string`

Genera una URL completa lista para compartir.

```typescript
const url = toWirUrl(routine);
// → "https://builder.fitlegacy.app/r/wir?data=eyJ2..."

const customUrl = toWirUrl(routine, 'https://example.com/wir');
// → "https://example.com/wir?data=eyJ2..."
```

### `parseWirUrl(url: string): WirDocument`

Extrae y decodifica un documento de una URL.

```typescript
const routine = parseWirUrl('https://builder.fitlegacy.app/r/wir?data=eyJ2...');
```

### `validateWir(data: unknown, options?: WirValidationOptions): FullWirValidationResult`

Valida un documento contra esquema, catálogo y límites.

```typescript
const result = validateWir(data, {
  checkCatalog: true,   // Verificar IDs existen
  checkSize: true,      // Advertir sobre tamaño
  strict: true          // Rechazar campos desconocidos
});

if (result.valid) {
  console.log('✅', result.data);
} else {
  console.error('❌', result.errors);
  console.warn('⚠️', result.sizeWarnings);
}
```

### `validateWirStrict(data: unknown): WirDocument`

Valida y lanza error si inválido (útil para precondiciones).

```typescript
try {
  const doc = validateWirStrict(data);
  // Es válido, proceder
} catch (error) {
  console.error(error.message);
}
```

### `isValidWir(data: unknown): boolean`

Chequeo rápido sin detalles de error.

```typescript
if (isValidWir(data)) {
  // Proceder
}
```

### `getPayloadSize(doc: WirDocument): SizeMetrics`

Calcula tamaño del payload.

```typescript
const sizes = getPayloadSize(routine);
console.log(sizes);
// {
//   json: 142,
//   base64: 190,
//   urlSafe: 190,
//   estimated: 2015  ← URL completa
// }
```

### `exceedsWhatsAppLimit(doc: WirDocument, limit?: number): boolean`

Verifica si la URL excede límite WhatsApp (~2000 chars).

```typescript
if (exceedsWhatsAppLimit(routine)) {
  console.log('⚠️ URL demasiado grande para WhatsApp');
}
```

### `formatValidationErrors(result: FullWirValidationResult): string`

Formatea errores de validación como string legible.

```typescript
const result = validateWir(data);
console.log(formatValidationErrors(result));
// Salida:
// ❌ Validation failed:
// Schema errors:
//   - n: Required
// Catalog errors:
//   - Unknown exercise ID: "invalid_ex"
```

### `summarizeWir(doc: WirDocument): WirSummary`

Extrae metadata de un documento.

```typescript
const summary = summarizeWir(routine);
// {
//   name: 'PUSH_DAY',
//   exerciseCount: 2,
//   foodCount: 2,
//   hasCover: true,
//   version: 1
// }
```

### `printWirSummary(doc: WirDocument): void`

Imprime resumen formateado en consola.

```typescript
printWirSummary(routine);
// 📋 WIR Summary: "PUSH_DAY"
//   Version: v1
//   Exercises: 2
//   Foods: 2
//   Cover: ✅
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test:wir
```

Tests con Vitest incluyen:
- Codificación/decodificación roundtrip
- Validación de esquema
- URLs compartibles
- Cálculo de tamaño

### Ejemplo de test

```typescript
import { encodeWir, decodeWir } from 'src/lib/wir';

const routine = { v: 1, n: 'TEST', e: [{ i: 'press_banca', s: 4, r: 10, w: 80 }] };
const encoded = encodeWir(routine);
const decoded = decodeWir(encoded);

expect(decoded).toEqual(routine); // ✅
```

---

## 🎯 Catálogo

Resolver IDs de ejercicios y alimentos:

```typescript
import { getExerciseById, getFoodById } from '@fit-legacy/shared';

const exercise = getExerciseById('press_banca');
console.log(exercise.name); // → "Press Banca Plano"

const food = getFoodById('pollo');
console.log(food.protein); // → 31 (grams per 100g)
```

Ver `WIR_SPECIFICATION.md` para lista completa.

---

## 🖥️ CLI

Herramienta de línea de comandos para operar con `.wir`:

```bash
wir validate rutina.json
wir encode rutina.json
wir decode "eyJ2IjoxLCJu..."
wir inspect --file rutina.json
wir catalog exercise press_banca
wir catalog food pollo
wir example mixed
```

Ver `scripts/wir-cli.ts` para documentación completa.

---

## 🔐 Seguridad

- **Validación estricta**: Zod schema enforces structure
- **Límites de tamaño**: Previene URLs excesivamente largas
- **Validación de IDs**: Chequea contra catálogo oficial
- **Error handling**: Mensajes claros y seguros

---

## 📝 Ejemplos

### Ejemplo 1: Rutina simple (solo ejercicios)

```typescript
const simple = {
  v: 1,
  n: 'STRENGTH_CYCLE',
  e: [
    { i: 'press_banca', s: 5, r: 3, w: 120 },
    { i: 'sentadilla', s: 5, r: 3, w: 150 },
    { i: 'peso_muerto', s: 3, r: 5, w: 180 },
  ]
};

const url = toWirUrl(simple);
```

### Ejemplo 2: Plan nutricional (solo alimentos)

```typescript
const nutrition = {
  v: 1,
  n: 'MEAL_PREP_WEEK',
  f: [
    { i: 'pollo', q: 500 },
    { i: 'arroz', q: 300 },
    { i: 'brocoli', q: 200 },
    { i: 'aceite_oliva', q: 30 },
  ]
};
```

### Ejemplo 3: Protocolo completo (rutina + nutrición)

```typescript
const complete = {
  v: 1,
  n: 'FULL_TRANSFORMATION_PROTOCOL',
  c: 'https://cdn.fitlegacy.app/covers/hero-gym.jpg',
  e: [
    { i: 'press_banca', s: 4, r: 8, w: 100 },
    { i: 'remo_barra', s: 4, r: 8, w: 100 },
    { i: 'sentadilla', s: 4, r: 8, w: 120 },
  ],
  f: [
    { i: 'pollo', q: 300 },
    { i: 'batata', q: 200 },
    { i: 'aguacate', q: 100 },
  ]
};

const result = validateWir(complete);
if (result.valid) {
  const shareUrl = toWirUrl(result.data);
  // Compartir por WhatsApp
}
```

---

## 🚨 Errores comunes

### "Invalid Base64 encoding"

```typescript
// ❌ Pasaste string inválido
decodeWir('not@valid@@base64');

// ✅ Asegúrate de usar string codificado
const encoded = encodeWir(routine);
decodeWir(encoded); // OK
```

### "Unknown exercise ID"

```typescript
// ❌ ID no existe
const routine = { v: 1, n: 'TEST', e: [{ i: 'typo_ejercicio', s: 4, r: 10, w: 80 }] };
validateWir(routine); // Error

// ✅ Verifica contra catálogo
import { hasExercise } from '@fit-legacy/shared';
if (!hasExercise('press_banca')) {
  console.log('❌ No existe');
}
```

### "At least one exercise or food must be present"

```typescript
// ❌ Arrays vacíos o ausentes
const routine = { v: 1, n: 'TEST' };

// ✅ Agrega al menos uno
const routine = { v: 1, n: 'TEST', e: [{ i: 'press_banca', s: 4, r: 10, w: 80 }] };
```

---

## 📖 Especificación completa

Ver `WIR_SPECIFICATION.md` para detalles completos del formato.

---

## 🤝 Contribuciones

Para reportar bugs o proponer mejoras:

1. Abre un issue en GitHub
2. Incluye ejemplo reproducible
3. Describe comportamiento esperado vs actual

---

## 📄 Licencia

MIT © Fit Legacy
