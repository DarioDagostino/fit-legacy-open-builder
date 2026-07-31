# Build Status

This file records the current build baseline.

## Baseline

The project should pass:

```bash
npm run build
npm run test -- --run
npx tsc --noEmit
```

## Expected Output

- Vite production build completes.
- Vitest passes WIR codec, share/open hydration, streak reducer and gamification tests.
- TypeScript typecheck completes with no errors.

## Maintenance Rule

If any of these commands fail, fix the underlying issue before adding new product surface area.

The build baseline is part of the product quality bar because the main user flow depends on reliable link generation and decoding.

Current verified locally on 2026-07-31: build passed (2219 modules), 119 Vitest tests passed. The canonical Supabase migration is local and has not been pushed to the remote project.
