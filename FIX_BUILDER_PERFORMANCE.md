# Builder Performance Notes

## Objective

Keep the builder responsive on mobile devices and inside in-app browsers.

## Active Constraints

- The initial route should load quickly.
- Heavy recipient preview code should remain lazy-loaded where possible.
- Catalog rendering should avoid unnecessary work during search and tab changes.
- Image-heavy food icons should be loaded only when needed.

## Current Techniques

- Vite chunk splitting.
- Lazy loading for recipient and preview components.
- Local state for drafts.
- Catalog filtering through memoized derived lists.

## Future Work

- Split `WorkoutBuilder.tsx` into smaller components.
- Add lightweight performance checks for mobile viewport.
- Add Playwright coverage for the primary builder flow.
- Review bundle size after adding new integrations.
