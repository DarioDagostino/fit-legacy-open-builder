# WIR TODO

## Validation

- [x] Add a create -> encode -> open -> hydrate contract test.
- [ ] Add browser E2E for create -> open -> mark complete once Playwright is available in CI.
- Add test cases for long URLs.
- [x] Add custom exercise payloads and missing-catalog fallback validation.
- Add compatibility tests for WhatsApp in-app browser.

## Product

- Make share copy generic and clear.
- Keep `.wir` mostly hidden from non-technical users.
- Add clear empty states for recipient view.
- Support routine duplication from an opened link.

## Technical

- [x] Keep v1 schema stable and document the UTF-8 Base64URL transport.
- [x] Keep legacy `navy` palette payloads readable.
- Avoid renaming catalog IDs.
- Add migration notes if v2 is introduced.
- Document size limits in one canonical place.
