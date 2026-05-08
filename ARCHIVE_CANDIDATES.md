# Builder Playground Archive Candidates

Objetivo activo del app:
- Conservar solo la superficie de builder de entrenamiento y nutricion.
- Builder canonico activo: `src/app/fitlegacyfullapp/components/builder/AthleteBuilder.tsx`

Estado actual:
- `Programs.tsx` ya abre `AthleteBuilder`.
- El share de `AthleteBuilder` ya usa `shared_content` y genera links publicos `/r/:slug`.

Eliminados en esta limpieza:
- `src/app/fitlegacyfullapp/dashboard/TacticalBuilder.tsx`
  Motivo: builder duplicado de workout/nutrition, desplazado por AthleteBuilder.

- `src/app/fitlegacyfullapp/dashboard/WorkoutBuilder.tsx`
  Motivo: tercera implementacion de workout builder, vieja y con muchos problemas de lint/accesibilidad.

- `src/app/fitlegacyfullapp/dashboard/NutritionSystem.tsx`
  Motivo: flujo legacy de nutricion en dashboard, reemplazado por AthleteBuilder unificado.

- `src/app/fitlegacyfullapp/dashboard/NutritionBuilder.tsx`
  Motivo: builder de nutricion duplicado del stack canonico.

Archivar o eliminar cuando confirmemos que no hay dependencias residuales:

Revisar antes de archivar:
- `src/app/fitlegacyfullapp/dashboard/NutritionSystem.tsx`
  Motivo: todavia usa `dashboard/NutritionBuilder.tsx`; decidir si migra a AthleteBuilder o si queda solo como pantalla de consumo.

- `src/app/fitlegacyfullapp/components/nutrition/NutritionBuilder.tsx`
  Motivo: pieza avanzada de nutricion con IA; evaluar si se absorbe dentro de AthleteBuilder o se mantiene como modulo interno reutilizable.

- `src/lib/integrations/builder.ts`
- `src/app/components/integrations/DynamicSection.tsx`
  Motivo: integracion Builder.io no relacionada con el objetivo actual del app.

No tocar por ahora:
- `src/app/fitlegacyfullapp/components/workout/WorkoutScreen.tsx`
- `src/app/fitlegacyfullapp/components/nutrition/NutritionScreen.tsx`
  Motivo: son pantallas de uso/visualizacion, no necesariamente builders duplicados.
