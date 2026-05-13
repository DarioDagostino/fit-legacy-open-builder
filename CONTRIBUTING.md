# Contributing

## Development

```bash
pnpm install
pnpm dev
```

## Quality Checks

Run these before opening a pull request:

```bash
pnpm build
pnpm test -- --run
tsc --noEmit
```

## Scope

Keep changes focused. The core flow is:

```text
create routine -> encode WIR -> share URL -> open recipient view
```

Avoid adding features that make this flow slower or harder to explain.

## Catalog Changes

Catalog IDs are public identifiers. Do not rename existing exercise or food IDs. Add new IDs in snake_case and keep names human-readable.

## Documentation

Use direct technical language. Avoid promotional claims, exaggerated feature language, and implementation notes that read like generated status reports.
