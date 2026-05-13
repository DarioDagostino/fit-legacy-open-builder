# Fit Legacy Builder

Web builder for creating workout and nutrition routines that can be shared as a URL.

The product goal is simple: create a routine, send it through WhatsApp, and let the recipient open it as a lightweight web view without installing an app. The `.wir` format is an implementation detail used to encode the routine payload in a portable way.

## Core Use Case

1. A coach or user creates a workout, nutrition plan, or mixed routine.
2. The builder serializes the routine into a compact `.wir` payload.
3. The user shares the generated link through WhatsApp or any messaging app.
4. The recipient opens the link in the browser and can view, complete, and re-share the routine.

## Product Positioning

Fit Legacy Builder is not intended to compete as a full fitness tracking platform. Its primary role is to reduce friction in routine delivery:

- No app install required for the recipient.
- No account required for basic link opening.
- Works inside mobile browsers and WhatsApp in-app browser.
- Payload is portable and can be decoded by compatible clients.
- The shared routine behaves like a small web app instead of a static PDF or screenshot.

## Features

- Mobile-first routine builder.
- Workout, nutrition, and mixed routine support.
- Shareable `.wir` links.
- Local persistence for draft routines.
- Recipient view with checkable items.
- Catalog-based exercise and food lookup.
- Supabase integration for optional shared content flows.
- Vercel-compatible frontend build.

## Tech Stack

- React 18
- Vite
- TypeScript
- Zustand
- Zod
- Supabase
- Vitest

## Getting Started

```bash
pnpm install
pnpm dev
```

The development server runs on:

```text
http://localhost:5178
```

## Build

```bash
pnpm build
```

## Tests

```bash
pnpm test -- --run
```

## WIR Format

`.wir` stands for Workout Interactive Resource. It is a compact JSON document encoded as Base64 URL-safe text and passed through a `data` query parameter.

Example document:

```json
{
  "v": 1,
  "t": "mixed",
  "n": "Upper Body + Meal",
  "e": [
    { "i": "press_banca", "s": 4, "r": 10, "w": 60 }
  ],
  "f": [
    { "i": "pollo", "q": 200 }
  ]
}
```

Example URL:

```text
https://builder.fitlegacy.app/r/wir?data=...
```

## Repository Notes

This repository currently includes product code, shared catalog code, Supabase functions, and historical planning documents. The active runtime is the Vite app under `src/` plus selected shared modules under `_consolidated_workout_nutrition/packages`.

## License

MIT.
