# WIR Module

The WIR module implements encoding, decoding, validation, and hydration for shared routine links.

## Path

```text
src/lib/wir
```

## Files

| File | Responsibility |
|---|---|
| `schema.ts` | Zod schemas and TypeScript types. |
| `codec.ts` | Base64 URL-safe encode/decode helpers. |
| `validator.ts` | Schema, catalog, and size validation. |
| `hydrate.ts` | Converts catalog IDs into renderable routine data. |
| `process-link.ts` | Compatibility helper for opening WIR payloads. |
| `index.ts` | Public exports. |

## Typical Usage

```ts
import { decodeWir, validateWir, hydrateWir } from '@/lib/wir';

const decoded = decodeWir(payload);
const validation = validateWir(decoded, { checkCatalog: true });

if (validation.valid && validation.data) {
  const routine = hydrateWir(validation.data);
}
```

## Design Rule

The module should remain independent from UI components. UI code should call the module, not duplicate WIR parsing logic.
