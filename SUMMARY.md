# Project Summary

Fit Legacy Builder is a web tool for creating and sharing workout or nutrition routines through portable links.

## Main User Flow

```text
create routine -> generate share link -> send through WhatsApp -> recipient opens in browser
```

## Key Technical Components

- React/Vite frontend.
- Zustand routine state with a common Supabase user namespace.
- WIR encode/decode/validate/hydrate module.
- Shared exercise and food catalog.
- Recipient routine viewer.
- Supabase-backed canonical routine, calendar, action and session persistence with RLS (migration pending remote review).
- Consent-gated analytics and a route-level ErrorBoundary.

## Current Product Direction

The product should be explained as a link-based routine sharing tool, not as a generic fitness platform.

The strongest audience is coaches and creators who already send routines through WhatsApp, PDFs, screenshots, or spreadsheets.
