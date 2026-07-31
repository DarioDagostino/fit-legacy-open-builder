# Builder Architecture

This document describes the active architecture of Fit Legacy Builder.

## Product Flow

```text
Auth/UserProvider -> namespaced local cache -> Supabase canonical sync
                                      └-> WIR encoder -> share URL -> recipient viewer
```

The main product flow does not require backend persistence. The generated `.wir` payload contains the routine data needed by the recipient viewer.

## Runtime Areas

| Area | Path | Responsibility |
|---|---|---|
| App shell | `src/app/App.tsx` | Routes and app-level providers. |
| Builder UI | `src/components/workout/WorkoutBuilder.tsx` | Main routine creation UI. |
| Routine state | `src/lib/store.ts` | Zustand store and WIR link generation. |
| User scope | `src/app/providers/UserProvider.tsx`, `src/lib/userScope.ts` | Shared Supabase identity and per-user storage namespace. |
| Canonical data | `src/lib/canonicalData.ts`, `supabase/migrations/20260731060518_builder_canonical_user_data.sql` | Authenticated routine, calendar, action and session persistence with owner-only RLS. |
| Streak reducer | `src/lib/bioledger-streak.ts` | Derives all streak/stat values from sessions, including after deletion. |
| Sharing | `src/lib/share.ts`, `src/components/workout/builderSharing.ts` | Timeout, retry, encoded-link fallback and clipboard/popup fallback. |
| WIR codec | `src/lib/wir` | Encode, decode, validate, hydrate. |
| Canvas preview | `src/components/wir/WirCanvasPreview.tsx` | Shared visual renderer. |
| Shared viewer | `src/app/components/routine/SharedRoutineViewer.tsx` | Recipient-facing routine view. |
| Catalog | `_consolidated_workout_nutrition/packages/shared` | Exercise and food IDs. |

## WIR Lifecycle

1. User builds a routine.
2. Store converts internal routine state into a WIR document.
3. WIR codec validates and encodes the document.
4. App generates a URL with `?data=<payload>`.
5. Recipient opens the URL.
6. Viewer decodes, validates, hydrates catalog IDs, and renders the routine.

## State Model

The builder keeps the active routine in a user-scoped Zustand cache. When a Supabase session exists, debounced canonical sync writes the same data to `fitness_routines`, calendar tables and sessions under RLS. Anonymous users retain a separate `:anonymous` cache.

Main fields:

- `name`
- `exercises`
- `foods`
- `coverImageUrl`

The recipient view should not depend on the sender's local storage.

## Backend Usage

The core WIR sharing flow is URL-based. Backend services are optional and used for related product surfaces:

- Supabase client setup.
- Shared content routes.
- Mercado Pago edge function.
- Community post route.

Backend persistence is canonical for authenticated users but remains an enhancement for anonymous sharing; opening a `.wir` link never requires an account.

## Design Constraint

The main value proposition is low-friction sharing. Any architecture change should preserve:

- Fast link generation.
- No required install for recipients.
- Browser compatibility.
- Stable decoding of existing links.

## Current Technical Debt

- `WorkoutBuilder.tsx` is still large; sharing primitives now live in `builderSharing.ts`, with the remaining UI split planned by panel.
- Historical docs and consolidated code should be cleaned further.
- Catalog ownership should be clarified.
- The WIR create -> open -> hydrate contract is covered by Vitest; browser-level Playwright coverage remains to be installed in CI.
