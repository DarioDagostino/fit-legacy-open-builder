# Change Notes

This file is a historical summary of completed implementation work.

## Completed Areas

- Builder route and app shell.
- WIR encode/decode flow.
- Recipient routine viewer.
- Local routine persistence.
- Basic workout and nutrition catalog support.
- Production build configuration.

## Current Quality Bar

The active branch should pass:

```bash
pnpm build
pnpm test -- --run
tsc --noEmit
```

## Documentation

Use `README.md` and `BUILDER_ARCHITECTURE.md` for current project information. This file should not be expanded with new feature claims.
