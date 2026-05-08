# 🏗️ Fit Legacy — Arquitectura del Builder

Este documento detalla la estructura exacta y la lógica de funcionamiento del **Builder Playground App** (`apps/builder_playground_app`). Esta app es el núcleo de creación de protocolos de entrenamiento y nutrición del ecosistema.

---

## 📍 Ruta Exacta del Proyecto
`apps/builder_playground_app/`

---

## 🗺️ Mapa de Archivos Core

```text
src/
├── main.tsx                # Punto de entrada (React Root)
├── app/
│   ├── App.tsx             # Router principal (Rutas: /, /arsenal, /builder/*)
│   └── fitlegacyfullapp/   # Módulos heredados del HUD de Atleta
│       └── components/
│           └── builder/
│               └── AthleteBuilder.tsx  # El constructor complejo (55KB)
├── components/
│   └── workout/
│       ├── WorkoutBuilder.tsx  # Interfaz Mobile-First (Actualización principal)
│       └── SharedRoutine.tsx   # Visualizador de rutinas compartidas
├── lib/
│   ├── store.ts            # Estado Global (Zustand + Persistencia Local)
│   └── integrations/
│       └── statsig.ts      # Feature Flags
└── styles/
    ├── index.css           # Estilos base y Tailwind
    └── theme.css           # Variables de diseño (Noir Aesthetic)
```

---

## ⚙️ Arquitectura Técnica

### 1. Gestión de Estado (Zustand)
El estado de la rutina actual se maneja en `src/lib/store.ts`.
- **Persistencia**: Las rutinas se guardan en `localStorage` automáticamente.
- **Minificación**: Utiliza una estrategia de mapeo (ej: `n` para `name`, `e` para `exercises`) para generar URLs de compartir ultra-cortas.

### 2. Generación de Identidad (IA)
Integración con `NvidiaImageService` (vía `@fit-legacy/ai`) para generar portadas fotorrealistas de los entrenamientos basadas en el ejercicio principal.

### 3. Sincronización (Sync)
- **Exportación**: Genera links `.WIR` (Workout Identity Resource).
- **Redirección OG**: Usa una ruta `/api/og` para que WhatsApp/RRSS muestren una tarjeta visual, pero redirige al usuario real a la app.

### 4. Fuentes de Datos
Utiliza los paquetes compartidos del monorepo:
- `@fit-legacy/shared`: Contiene `UNIFIED_EXERCISES` y `UNIFIED_FOODS` (La base de datos maestra).

---

## 🚀 Cómo navegar el Builder
1. Si buscas la **interfaz táctica móvil**: Mira `src/components/workout/WorkoutBuilder.tsx`.
2. Si buscas el **estado o la lógica de guardado**: Mira `src/lib/store.ts`.
3. Si buscas la **configuración de rutas**: Mira `src/app/App.tsx`.

---
*Documento generado para facilitar la navegación en el monorepo Fit Legacy.*
