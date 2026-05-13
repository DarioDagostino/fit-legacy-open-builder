# Integration Notes

This file is kept as a historical implementation note.

## Current Status

The active web app builds successfully and the WIR sharing flow is implemented in the Vite/React application.

Validated commands:

```bash
pnpm build
pnpm test -- --run
tsc --noEmit
```

## Active Integration Points

- WIR encoder and decoder: `src/lib/wir`
- Builder state: `src/lib/store.ts`
- Main builder UI: `src/components/workout/WorkoutBuilder.tsx`
- Recipient viewer: `src/app/components/routine/SharedRoutineViewer.tsx`
- Shared catalog: `_consolidated_workout_nutrition/packages/shared`
- Supabase client: `src/lib/supabase.ts`
- Payment edge function: `supabase/functions/create-mp-preference`

## Notes

This document should not be used as primary product documentation. Prefer:

- `README.md`
- `WIR_SPECIFICATION.md`
- `BUILDER_ARCHITECTURE.md`
