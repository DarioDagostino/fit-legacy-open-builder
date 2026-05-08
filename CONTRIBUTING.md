# 🤝 Cómo contribuir a Fit Legacy Builder

Gracias por tu interés en contribuir al builder open source de Fit Legacy.

## 🎯 Áreas donde más ayuda necesitamos

| Área | Dificultad | Descripción |
|------|------------|-------------|
| **Catálogo de ejercicios** | 🟢 Fácil | Agregar nuevos ejercicios con su ID, nombre, grupo muscular |
| **Catálogo de alimentos** | 🟢 Fácil | Agregar nuevos alimentos con macros |
| **Traducciones** | 🟢 Fácil | Español, Inglés, Portugués |
| **UI/UX** | 🟡 Media | Mejoras visuales, accesibilidad |
| **Hydration** | 🔴 Difícil | Optimización del viewer |
| **Testing** | 🟡 Media | Unit tests, E2E |

## 📦 Setup de desarrollo

```bash
# 1. Fork y clonar
git clone https://github.com/tu-usuario/builder.git
cd builder

# 2. Instalar dependencias (pnpm requerido)
npm install -g pnpm
pnpm install

# 3. Variables de entorno
cp .env.example .env
# Configurar API keys si es necesario

# 4. Correr en desarrollo
pnpm dev

# 5. Abrir http://localhost:5178
```

## 🏗️ Estructura del proyecto
```text
builder/
├── apps/
│   └── builder_playground_app/   # La app principal
│       ├── src/
│       │   ├── components/       # UI components
│       │   ├── lib/              # Estado (Zustand)
│       │   ├── services/         # API calls
│       │   └── styles/           # Tailwind CSS
│       └── ...
├── packages/
│   ├── shared/                   # Tipos y datos compartidos
│   │   ├── src/
│   │   │   ├── exercises.ts      # Catálogo maestro
│   │   │   ├── foods.ts          # Catálogo maestro
│   │   │   └── wir-schema.ts     # Validadores
│   │   └── ...
│   └── ...
└── ...
```

## 📝 Cómo agregar un ejercicio
Editar `packages/shared/src/exercises.ts`:

```typescript
export const UNIFIED_EXERCISES = {
  // ... existing sections
  chest: [
    {
      id: 'press_banca_inclinado',  // ⬅️ ID único (snake_case)
      name: 'Press banca inclinado',
      section: 'chest',
      // ... resto de propiedades
    }
  ]
}
```

## ✅ Estándares de código
- TypeScript estricto
- Tailwind para estilos
- ESLint + Prettier
- Commits convencionales (Conventional Commits)

## 🔄 Proceso de Pull Request
1. Creá una rama con nombre descriptivo
2. Hacé tus cambios
3. Corré `pnpm lint` y `pnpm type-check`
4. Commit con mensaje claro
5. Push y abrí PR

## 📄 Licencia
Al contribuir, aceptás que tu código se distribuya bajo la licencia MIT del proyecto.

## 🗣️ Contacto
- GitHub Issues para bugs
- Discord para discusión (link)
