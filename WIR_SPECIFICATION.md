# WIR Specification v1

`.wir` is a compact routine payload used by Fit Legacy Builder to share workout and nutrition plans through URLs.

The format is designed for low-friction sharing. A sender creates a routine in the builder, the routine is encoded into a URL-safe payload, and the recipient opens the link in a browser or WhatsApp in-app browser.

## Goals

- Keep routine links portable.
- Avoid requiring app installation for recipients.
- Support workout-only, nutrition-only, and mixed routines.
- Use stable catalog IDs instead of duplicating full exercise or food data.
- Keep the encoded URL small enough for common messaging apps.

## Non-Goals

- `.wir` is not a complete training history format.
- `.wir` is not a nutrition database.
- `.wir` is not intended to replace server-side storage for long-term client management.
- `.wir` does not handle authentication or payments.

## Transport

A `.wir` document is serialized as minified JSON, encoded as Base64 URL-safe text, and passed in a `data` query parameter.

```text
https://builder.fitlegacy.app/r/wir?data=<encoded-payload>
```

## Document Shape

```json
{
  "v": 1,
  "t": "mixed",
  "p": "clean",
  "n": "Routine name",
  "c": "https://example.com/cover.jpg",
  "e": [
    { "i": "press_banca", "s": 4, "r": 10, "w": 60, "m": "Optional note" }
  ],
  "f": [
    { "i": "pollo", "q": 200, "m": "Optional note" }
  ]
}
```

## Root Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `v` | number | yes | Format version. Current value: `1`. |
| `t` | string | no | Render template: `routine`, `meal`, or `mixed`. |
| `p` | string | no | Palette ID: `clean`, `mist`, `navy`, `forest`, or `ember`. |
| `n` | string | yes | Routine name. |
| `c` | string/null | no | Optional cover image URL. |
| `e` | array | no | Exercise entries. |
| `f` | array | no | Food entries. |

At least one exercise or food entry must be present.

## Exercise Entry

| Field | Type | Required | Description |
|---|---|---:|---|
| `i` | string | yes | Exercise ID from the shared catalog. |
| `s` | number | yes | Sets. |
| `r` | number | yes | Reps. |
| `w` | number | yes | Weight in kilograms. `0` means bodyweight or not applicable. |
| `m` | string | no | Optional note. |

## Food Entry

| Field | Type | Required | Description |
|---|---|---:|---|
| `i` | string | yes | Food ID from the shared catalog. |
| `q` | number | yes | Quantity in grams. |
| `m` | string | no | Optional note. |

## Encoding

```ts
const json = JSON.stringify(document);
const base64 = btoa(json);
const encoded = base64
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');
```

## Decoding

```ts
const base64 = encoded
  .replace(/-/g, '+')
  .replace(/_/g, '/');

const remainder = base64.length % 4;
const padded = base64 + '='.repeat(remainder === 0 ? 0 : 4 - remainder);
const document = JSON.parse(atob(padded));
```

## Validation

Validation is implemented in `src/lib/wir`.

```ts
import { decodeWir, validateWir, hydrateWir } from './src/lib/wir';

const decoded = decodeWir(payload);
const validation = validateWir(decoded, { checkCatalog: true });

if (validation.valid && validation.data) {
  const hydrated = hydrateWir(validation.data);
}
```

Validation checks:

- Schema shape.
- Version compatibility.
- Required fields.
- Numeric limits.
- Catalog ID existence.
- Estimated URL length.

## Catalog IDs

Exercise and food IDs are resolved from the shared catalog:

```text
_consolidated_workout_nutrition/packages/shared/index.ts
```

IDs should be treated as stable public identifiers. Existing IDs should not be renamed once shared links exist in the wild.

## Versioning

Current version: `v: 1`.

Clients should reject unknown versions with a clear error message. New optional fields may be added in a future version only if existing v1 readers can safely ignore them or the version number is incremented.
