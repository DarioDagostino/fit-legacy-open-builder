# 📋 WIR Implementation Checklist

## ✅ Completado (11/15)

- [x] Catálogo (55 ejercicios, 40 alimentos)
- [x] Schema Zod formal
- [x] Encoder/Decoder robusto
- [x] Validador completo
- [x] Unit tests (codec)
- [x] CLI (8 comandos)
- [x] Specification con ejemplos
- [x] Documentación de módulo
- [x] Integración de componentes y Catálogos en `WorkoutBuilder.tsx`
- [x] Pruebas de compilación (`pnpm build`)
- [x] End-to-end Manual Test (Renderizado correcto de catálogos e Iconografía 3D)

---

## 🔄 Por hacer (4/15)

### **API & OpenGraph (Opcional pero Recomendado)**

- [ ] Crear `/api/wir/validate` endpoint
- [ ] Crear `/api/wir/encode` endpoint
- [ ] Publicar `public/catalogs/exercises.json` (catálogo descargable)

### **Documentación & Release**

- [ ] Crear ejemplo `EXAMPLE_ROUTINES.md`
- [ ] Publicar release notes de `.wir v1`

---

## 🎯 Detalles por sección

### **1. API Endpoints / OpenGraph (Prioridad MEDIA)**

**Status:** 🔴 Pendiente

**Nota de Arquitectura:** Todo el enconding/decoding de la URL `.wir` ya funciona perfectamente de manera **Isomórfica en el Cliente (Client-Side)**. No es necesario ni recomendable hacer ping al servidor para validar el payload, ya que agrega latencia de red. 

Sin embargo, crear endpoints es clave para la **Generación de OpenGraph (Tarjetas en WhatsApp)**.

Ejemplo propuesto para `/api/og/wir`:

```typescript
// api/og/wir.tsx (Vercel Edge Function o Supabase Edge)
// Intercepta la petición y devuelve una imagen generada dinámicamente
// usando @vercel/og o satori, basada en el payload WIR de la query string.
export default async function (req, res) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get('data');
  // ... lógica para parsear data con el codec WIR ...
  // ... renderizar tarjeta visual con el título de la rutina ...
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
████████████░ 11/15 completado (73%)

Fase 1: Build + Integration + Client-Side (COMPLETADO)
Fase 2: CLI & Exportación de JSONs (En progreso)
Fase 3: Edge Functions OpenGraph (Pendiente)
```

---

## 🎯 Timeline sugerido

**Fase Actual:** Refinar soporte OpenGraph y Documentación  
**Últimos Pasos:** Implementar generación dinámica en Edge de la OG Image para WhatsApp.  
**Meta:** Release formal de `.wir v1.0`

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

**Last updated:** 2026-05-12  
**Next review:** OpenGraph Integration and Documentation Finalization
