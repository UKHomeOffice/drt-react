# Copilot Instructions

## General

- Follow existing project conventions and patterns.
- Prefer simple, readable, and maintainable solutions.
- Reuse existing components, utilities, hooks, and types before creating new ones.
- Do not introduce new dependencies unless necessary.
- Preserve existing behaviour unless explicitly asked to change it.

## React

- Use functional components and React hooks.
- Keep components small and focused on a single responsibility.
- Prefer composition over complex component abstractions.
- Extract reusable logic into custom hooks where appropriate.
- Avoid unnecessary state and effects.
- Follow existing state management patterns in the project.

## TypeScript

- Prefer strongly typed code.
- Avoid `any`.
- Reuse existing types and interfaces where appropriate.
- Explicitly type public component props and exported functions.

## Testing

- Add or update tests when changing behaviour.
- Follow existing testing patterns and libraries in the project.
- Test user-visible behaviour rather than implementation details.
- Avoid tests that depend on internal component implementation.

## Accessibility

- Use semantic HTML where possible.
- Ensure interactive elements are keyboard accessible.
- Preserve existing accessibility behaviour when making changes.

## Security

- Never expose secrets, credentials, or sensitive data in client-side code.