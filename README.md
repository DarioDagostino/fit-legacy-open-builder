# 🏋️ Fit Legacy Builder

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Crea, comparte y ejecuta protocolos de entrenamiento y nutrición con un formato abierto.**

El Fit Legacy Builder es una herramienta gratuita y open source para diseñar rutinas de entrenamiento y planes alimenticios. Genera links `.wir` que funcionan instantáneamente en WhatsApp, sin necesidad de instalar nada.

## ✨ Demo en vivo

[https://builder.fitlegacy.app](https://builder.fitlegacy.app)

## 📦 Características

- 🎨 **Interfaz táctica** — Diseño mobile-first con estética noir
- 🧱 **Canvas predefinidos** — Plantillas `routine`, `meal` y `mixed`
- 👁️ **Sync espejo 1:1** — Lo que ves en Enviar es lo que ve el receptor
- 🏋️ **Catálogo unificado** — +200 ejercicios y +100 alimentos
- 🔗 **Formato .wir** — Compartí rutinas por WhatsApp en un link
- ✍️ **Nombre editable** — El usuario puede renombrar libremente su rutina
- 🖼️ **Portadas con IA** — Generá imágenes premium (Nvidia API)
- 💾 **Persistente** — Guardado automático en localStorage
- 🌐 **Multi-app** — Links funcionan dentro del navegador de WhatsApp

## 🚀 Quick Start

```bash
# Clonar repositorio
git clone https://github.com/fitlegacy/builder.git
cd builder

# Instalar dependencias
pnpm install

# Variables de entorno
cp .env.example .env
# Editar .env con tus variables opcionales
# VITE_MP_DONATION_URL=https://link.mercadopago.com/tu-link

# Ejecutar
pnpm dev
```

## 📖 Uso básico
1. **Armá tu protocolo** — Seleccioná ejercicios o comidas del catálogo
2. **Nombralo a tu manera** — Editá el título (default: `NUEVA RUTINA`)
3. **Ajustá parámetros** — Sets, reps, peso, cantidad
4. **Preview Sync** — Validá el canvas final (`routine`, `meal` o `mixed`)
5. **Exportá** — Generá un link `.wir` y compartilo por WhatsApp
6. **El receptor** — Abre el link, ve la rutina, marca progreso

## 🧩 El formato .wir
`.wir` (Workout Interactive Resource) es un formato abierto para compartir rutinas.

**Estructura minificada**
```json
{
  "v": 1,
  "t": "mixed",
  "n": "NOMBRE_RUTINA",
  "c": "https://...",
  "e": [
    { "i": "press_banca", "s": 4, "r": 10, "w": 60 }
  ],
  "f": [
    { "i": "pollo", "q": 200 }
  ]
}
```

`t` define el canvas a renderizar en destino:
- `routine` → foco en entrenamiento
- `meal` → foco en nutrición
- `mixed` → layout híbrido (entrenamiento + nutrición)
**IDs válidos**
Los ejercicios y alimentos usan IDs del catálogo maestro:
- Ver `UNIFIED_EXERCISES`
- Ver `UNIFIED_FOODS`

**Compresión**
El builder comprime esta estructura a Base64 URL-safe:
```text
https://fitlegacy.app/?data=eyJ2IjoxLCJuIjoiUlVUSU5BX0VKRU1QTE8iLCJlIjpbeyJpI...
```

## 🤝 Contribuciones
¡Bienvenidas! Leé `CONTRIBUTING.md`

1. Fork el proyecto
2. Creá tu rama (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Abrí un Pull Request

## 📄 Licencia
MIT © Fit Legacy

## 🙏 Agradecimientos
- **UNIFIED_EXERCISES** — Base de datos colaborativa de ejercicios
- **Nvidia API** — Generación de portadas
- **Zustand** — Estado persistente