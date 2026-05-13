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
│   └── components/
│       └── routine/
│           └── SharedRoutineViewer.tsx  # Viewer del receptor (.wir)
│   └── fitlegacyfullapp/   # Módulos heredados del HUD de Atleta
│       └── components/
│           └── builder/
│               └── AthleteBuilder.tsx  # El constructor complejo (55KB)
├── components/
│   ├── wir/
│   │   └── WirCanvasPreview.tsx # Canvas compartido (Sync + receptor)
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
- **Mirror 1:1**: El Sync usa el mismo canvas reusable que el receptor (`WirCanvasPreview`).
- **Plantillas**: Soporta `routine`, `meal` y `mixed` según contenido.
- **Redirección OG**: Usa una ruta `/api/og` para que WhatsApp/RRSS muestren una tarjeta visual, pero redirige al usuario real a la app.

### 4. Sistema Visual y Renderizado "Elite Noir"
- **Iconografía 3D (Icon-First Strategy):** Se reemplazaron por completo los emojis genéricos (🍎, 🥦) por un catálogo dinámico de íconos 3D de alta fidelidad (`/public/meat/`, `/public/more_icons_for_all_food/`, etc.).
- **Variantes Dinámicas:** Se implementó una lógica (`pickVariant`) que asigna variantes de íconos pseudoaleatorias basadas en la longitud del nombre para evitar repeticiones visuales en alimentos recurrentes.
- **Fallbacks Estéticos:** Si un elemento no se mapea exactamente, se muestra un ícono 3D genérico de su categoría con `drop-shadow` y opacidad, manteniendo la coherencia premium.
- **Tipografías**: `Manrope` (UI) + `Sora` (display/headings).
- **Paleta por template**:
    - `routine`: base oscura + acento naranja
    - `meal`: base oscura + acento verde
    - `mixed`: base oscura + acento azul
- **Consistencia**: Tokens en `src/styles/theme.css` y fuentes en `src/styles/fonts.css`.

### 5. Fuentes de Datos
Utiliza los paquetes compartidos del monorepo:
- `@fit-legacy/shared`: Contiene `UNIFIED_EXERCISES` y `UNIFIED_FOODS` (La base de datos maestra).

---

## 🚀 Cómo navegar el Builder
1. Si buscas la **interfaz táctica móvil**: Mira `src/components/workout/WorkoutBuilder.tsx`.
2. Si buscas el **estado o la lógica de guardado**: Mira `src/lib/store.ts`.
3. Si buscas la **configuración de rutas**: Mira `src/app/App.tsx`.

---
*Documento generado para facilitar la navegación en el monorepo Fit Legacy.*
