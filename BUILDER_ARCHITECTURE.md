# Builder Architecture

This document describes the active architecture of Fit Legacy Builder.

## Product Flow

```text
Builder UI -> local routine state -> WIR encoder -> share URL -> recipient viewer
```

The main product flow does not require backend persistence. The generated `.wir` payload contains the routine data needed by the recipient viewer.

## Runtime Areas

| Area | Path | Responsibility |
|---|---|---|
| App shell | `src/app/App.tsx` | Routes and app-level providers. |
| Builder UI | `src/components/workout/WorkoutBuilder.tsx` | Main routine creation UI. |
| Routine state | `src/lib/store.ts` | Zustand store and WIR link generation. |
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

The builder keeps the active routine in local state with persistence through Zustand middleware.

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

Backend persistence should be treated as an enhancement, not as a requirement for opening a `.wir` link.

## Design Constraint

The main value proposition is low-friction sharing. Any architecture change should preserve:

- Fast link generation.
- No required install for recipients.
- Browser compatibility.
- Stable decoding of existing links.

## Current Technical Debt

- `WorkoutBuilder.tsx` is still large and should be split into smaller components.
- Historical docs and consolidated code should be cleaned further.
- Catalog ownership should be clarified.
- End-to-end tests for link open and routine completion are still missing.
