# Build Status

This file records the current build baseline.

## Baseline

The project should pass:

```bash
pnpm build
pnpm test -- --run
tsc --noEmit
```

## Expected Output

- Vite production build completes.
- Vitest passes WIR codec and gamification tests.
- TypeScript typecheck completes with no errors.

## Maintenance Rule

If any of these commands fail, fix the underlying issue before adding new product surface area.

The build baseline is part of the product quality bar because the main user flow depends on reliable link generation and decoding.
