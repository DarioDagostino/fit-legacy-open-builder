# AI Usage Guidelines

AI-generated text and assets should be treated as optional enhancements.

## Approved Uses

- Drafting routine descriptions.
- Generating cover images.
- Suggesting alternative exercises.
- Summarizing a routine for a share message.

## Avoid

- Making unsupported health claims.
- Replacing professional coaching decisions.
- Presenting generated plans as medically personalized.
- Adding large AI dependencies to the default client bundle.

## UX Guidance

AI output should be editable before sharing. Users should always be able to create and share a routine manually.

## Safety Boundary

The app is a routine sharing tool. It should not provide medical diagnosis, treatment advice, or injury-specific recommendations without clear professional review.

## Implementation Guidance

- Keep provider-specific code inside `src/lib/integrations`.
- Prefer server-side calls for private credentials.
- Fail gracefully when AI configuration is missing.
- Do not block WIR encoding if AI generation fails.
