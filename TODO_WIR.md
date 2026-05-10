# 📋 WIR Implementation Checklist

## ✅ Completado (8/15)

- [x] Catálogo (55 ejercicios, 40 alimentos)
- [x] Schema Zod formal
- [x] Encoder/Decoder robusto
- [x] Validador completo
- [x] Unit tests (codec)
- [x] CLI (8 comandos)
- [x] Specification con ejemplos
- [x] Documentación de módulo

---

## 🔄 Por hacer (7/15)

### **Inmediato (Esta semana)**

- [ ] Verificar `pnpm build` sin errores
- [ ] Verificar imports en `WorkoutBuilder.tsx`
- [ ] Test manual end-to-end (generar URL y decodificar)
- [ ] Asegurar que `src/lib/wir/index.ts` exporta todo

### **API & Catálogo**

- [ ] Crear `/api/wir/validate` endpoint
- [ ] Crear `/api/wir/encode` endpoint
- [ ] Publicar `public/catalogs/exercises.json` (catálogo descargable)

### **Documentación & Release**

- [ ] Crear ejemplo `EXAMPLE_ROUTINES.md`
- [ ] Publicar release notes de `.wir v1`

---

## 🎯 Detalles por sección

### **1. Build & Integration (Prioridad ALTA)**

**Status:** 🔴 Pendiente

```bash
# Verifica que build funciona
pnpm install
pnpm build
```

**Qué buscar:**
- ✅ No errors en `UNIFIED_EXERCISES` import
- ✅ No errors en `UNIFIED_FOODS` import
- ✅ Archivos `src/lib/wir/*.ts` se compilan

**Archivos clave:**
- `_consolidated_workout_nutrition/packages/shared/index.ts` (catálogo)
- `src/lib/wir/index.ts` (exports)
- `src/components/workout/WorkoutBuilder.tsx` (consumer)

---

### **2. Manual Testing (Prioridad ALTA)**

**Status:** 🔴 Pendiente

**Test steps:**
1. Abrir builder en http://localhost:5178
2. Agregar 3-4 ejercicios (press_banca, sentadilla, dominadas)
3. Agregar 2 alimentos (pollo, arroz)
4. Click "SYNC" → "COPIAR ACCESO .WIR"
5. Verificar que no hay error y URL se copia
6. Abrir URL en otra pestaña
7. Debería mostrar la rutina decodificada

**Resultado esperado:**
```
✅ URL tipo: https://builder.fitlegacy.app/r/wir?data=eyJ2IjoxLCJu...
✅ Al abrir: Muestra rutina correcta
✅ No crashes
```

---

### **3. CLI Testing (Prioridad MEDIA)**

**Status:** 🟡 Código listo, pero no testeado

```bash
# Instalar y probar CLI
pnpm install
npm run wir validate docs/examples/simple.json
npm run wir encode docs/examples/simple.json
npm run wir catalog exercise press_banca
```

**Expected:**
```
✅ validate: Retorna "válido" o lista de errores
✅ encode: Retorna URL shareable
✅ catalog: Retorna detalles del ejercicio
```

---

### **4. API Endpoints (Prioridad MEDIA)**

**Status:** 🔴 Pendiente

Crear 3 endpoints simples:

```typescript
// api/wir/validate.ts
export default async function (req, res) {
  const { validateWir } = require('../../src/lib/wir');
  const result = validateWir(req.body);
  res.json(result);
}

// api/wir/encode.ts
export default async function (req, res) {
  const { toWirUrl } = require('../../src/lib/wir');
  const url = toWirUrl(req.body);
  res.json({ url });
}

// api/wir/catalog/[type]/[id].ts
export default async function (req, res) {
  const { getExerciseById, getFoodById } = require('@fit-legacy/shared');
  const { type, id } = req.query;
  
  if (type === 'exercise') {
    res.json(getExerciseById(id));
  } else {
    res.json(getFoodById(id));
  }
}
```

---

### **5. Catálogo Público (Prioridad BAJA)**

**Status:** 🔴 Pendiente

Publicar JSONs en `public/` para acceso externo:

```typescript
// scripts/generate-catalogs.ts
import fs from 'fs';
import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';

fs.writeFileSync(
  'public/catalogs/exercises.json',
  JSON.stringify(UNIFIED_EXERCISES, null, 2)
);

fs.writeFileSync(
  'public/catalogs/foods.json',
  JSON.stringify(UNIFIED_FOODS, null, 2)
);
```

Luego:
```bash
npm run generate:catalogs
```

**Resultado:**
```
✅ Accesible en: /catalogs/exercises.json
✅ Accesible en: /catalogs/foods.json
```

---

### **6. Documentación (Prioridad BAJA)**

**Status:** 🟢 Mayormente hecho

Archivos existentes:
- ✅ `WIR_SPECIFICATION.md`
- ✅ `docs/WIR_MODULE.md`
- ✅ `NEXT_STEPS.md`

Pendiente:
- [ ] Crear `docs/EXAMPLES.md` con 5-10 ejemplos reales
- [ ] Agregar sección "For Developers" en README

---

## 📊 Progress

```
████████░░ 8/15 completado (53%)

Semana 1: Build + Integration (Semana 2: API + Catálogo)
Semana 3: Documentación pública
```

---

## 🎯 Timeline sugerido

**Hoy/Mañana:** Build verification + manual testing  
**Esta semana:** API endpoints  
**Próxima semana:** Documentación pública + ejemplos  
**Mes 1:** Release formal de `.wir v1`

---

## 🚀 Orden de ejecución recomendado

```bash
# 1. Verificar build
pnpm install
pnpm build

# 2. Verificar imports
grep -r "UNIFIED_EXERCISES" src/

# 3. Test manual (en navegador)
pnpm dev
# → Abrir http://localhost:5178

# 4. Después que funcione, agregar API
# (Crear archivos en api/wir/)

# 5. Generar catálogos públicos
# npm run generate:catalogs

# 6. Escribir docs & ejemplos
# docs/EXAMPLES.md
```

---

## 📝 Notas importantes

- **No necesitás MCP todavía** — Funciona sin él
- **No necesitás landing pages todavía** — Focus en que funcione bien
- **Los tests en `codec.test.ts` son referenciales** — Córrelos cuando Vitest esté setup
- **El CLI es standalone** — Funciona offline para testing

---

## ❓ Si algo no funciona

### **Error: Cannot find module '@fit-legacy/shared'**
```bash
# El import en WorkoutBuilder.ts apunta al catálogo
# Solución: Asegurar que pnpm link o workspace está configurado
pnpm install
pnpm build
```

### **Error: "Unknown exercise ID" en validación**
```bash
# El ejercicio no existe en catálogo
# Solución: Check lista en WIR_SPECIFICATION.md
# O agrégalo a _consolidated_workout_nutrition/packages/shared/index.ts
```

### **URL demasiado grande (>2000 chars)**
```bash
# Hay demasiados items
# Solución: Limitar rutina a ~20 ejercicios + ~15 alimentos máx
# O usar API para almacenar rutinas largas
```

---

## 🎉 Cuándo considerar completo

- ✅ `pnpm build` sin errores
- ✅ Builder genera URL sin crashes
- ✅ URL decodifica correctamente en otra pestaña
- ✅ Catálogo disponible en `public/catalogs/`
- ✅ API endpoints `/api/wir/*` funcionan
- ✅ Docs públicas claras
- ✅ 5+ ejemplos reales funcionales

**En ese punto: Release `.wir v1.0.0` 🚀**

---

**Last updated:** 2025-04-09  
**Next review:** After build verification
