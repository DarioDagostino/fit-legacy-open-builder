# AI Integration Quick Start

This project may use AI services for optional content generation. AI features are not required for the core WIR sharing flow.

## Core Flow Without AI

The main product flow works without AI:

```text
build routine -> encode WIR -> share URL -> open recipient view
```

## Optional AI Use Cases

- Generate cover images.
- Suggest routine titles.
- Suggest exercise substitutions.
- Draft coach-facing descriptions.

## Requirements

AI integrations should be optional and isolated behind integration modules.

Do not make basic routine creation or link opening depend on an AI provider.

## Configuration

Provider keys should be configured through environment variables and server-side functions where needed. Do not expose private API keys in client code.

## Product Rule

AI should support the workflow, not become the product positioning. The main value proposition remains fast routine sharing through a web link.
