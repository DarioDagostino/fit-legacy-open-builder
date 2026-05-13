# Next Steps

The next work should focus on making the product easier to understand, test, and ship.

## Product Priority

Position the builder around one primary promise:

```text
Create a routine, send it through WhatsApp, and let the client open it without installing an app.
```

The `.wir` format should remain mostly invisible to non-technical users.

## Engineering Priority

1. Split `WorkoutBuilder.tsx` into smaller components.
2. Add end-to-end tests for create -> share -> open -> check item.
3. Remove or archive obsolete planning documents.
4. Keep `pnpm build`, `pnpm test -- --run`, and `tsc --noEmit` passing.
5. Document the WIR contract as a technical implementation detail.

## UX Priority

1. Make the share action obvious.
2. Make the recipient view fast and readable on mobile.
3. Keep the completion/check-off interaction simple.
4. Avoid requiring account creation for basic link opening.
5. Validate behavior inside WhatsApp in-app browser.

## Documentation Priority

Keep only a small set of active documents:

- `README.md`
- `WIR_SPECIFICATION.md`
- `BUILDER_ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `NEXT_STEPS.md`

All implementation-complete, AI-guide, and temporary fix documents should be moved to an archive or deleted after review.
