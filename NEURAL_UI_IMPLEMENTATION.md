# UI Implementation Notes

This document replaces earlier visual-language notes with a neutral technical summary.

## Active UI Goals

- Mobile-first builder.
- Clear routine creation flow.
- Fast share action.
- Recipient view optimized for small screens.
- Minimal friction inside WhatsApp in-app browser.

## Main Screens

- Catalog view.
- Nutrition view.
- Build view.
- Export/share view.
- Recipient routine viewer.

## Design Requirements

- Keep primary actions visible.
- Avoid marketing copy inside the tool surface.
- Use readable labels and predictable controls.
- Keep check-off interactions simple.
- Avoid layout shifts when routines contain many items.

## Technical Notes

The current UI is implemented mostly in `src/components/workout/WorkoutBuilder.tsx`. This file should be split into smaller components before adding more features.
