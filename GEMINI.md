# 🧱 Builder Playground App — Guía para IA

> Sandbox de experimentación con Builder.io, OpenAI y features avanzadas.
> **Puerto local:** `5178` | **URL prod:** `https://builders.fitlegacy.app`

---

## 🎯 ¿Qué es esta App?

Un playground de experimentación y prototipado. Aquí se prueban integraciones nuevas y features antes de llevarlas a las apps de producción. Incluye integración con Builder.io para CMS visual.

---

## 📁 Estructura

```
src/
├── app/
│   ├── App.tsx
│   └── components/    → Componentes experimentales
├── imports/
├── lib/
├── styles/
└── utils/
```

---

## ⚙️ Dependencias Únicas (que otras apps NO tienen)

| Librería | Propósito |
|---|---|
| `@builder.io/react` | CMS visual — renderizar contenido desde Builder.io |
| `openai` | SDK de OpenAI (GPT) como alternativa/complemento a Gemini |
| `@neondatabase/serverless` | Conexión a NeonDB (alternativa/experimento a Supabase) |
| `statsig-js` + `statsig-react` | Feature flags y A/B testing |

| `@vercel/speed-insights` | Monitoreo de performance |

---

## ⚠️ Reglas Críticas

1. **Este es un sandbox.** No asumir que el código aquí está listo para producción.
2. **Builder.io:** Requiere una `BUILDER_IO_API_KEY` en `.env`. Verificar antes de tocar código de Builder.
3. **OpenAI vs Gemini:** Esta app experimenta con ambos. El ecosistema principal usa Gemini. No migrar features de Gemini a OpenAI sin consenso.
4. Las features exitosas aquí deben **migrarse y pulirse** en `the_road_app` o la app correspondiente.
5. `@neondatabase/serverless` es experimental. La BD oficial es Supabase PostgreSQL.
