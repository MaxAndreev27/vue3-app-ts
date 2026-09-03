# Contributing

Thank you for considering a contribution to this project. Small, focused pull
requests are easiest to review and maintain.

## Before you start

- Search existing issues and pull requests before opening a new one.
- For security concerns, follow [SECURITY.md](SECURITY.md) instead of opening a
  public issue.
- Make sure your proposed change fits the project's Vue 3 and TypeScript stack.

## Development workflow

1. Fork the repository and create a branch from `main`.
2. Install dependencies with `npm install`.
3. Make the smallest change that solves the problem.
4. Run `npm run lint`, `npm run format:check`, and the relevant tests.
5. Run `npm run build` for changes that affect the application build.
6. Open a pull request using the pull request template.

Use a descriptive branch name such as `fix/request-filter` or
`feature/export-requests`.

## Code guidelines

- Prefer existing components, store modules, and utilities over duplicate code.
- Keep components focused and preserve the current Vue and TypeScript patterns.
- Avoid committing `.env` files, credentials, build output, or editor files.
- Add or update tests when behavior changes.
- Keep user-facing text clear and accessible.

## Commit messages

Use concise, imperative commit messages, for example:

```text
Fix request filter reset
Add empty state to request table
```

## Pull requests

Describe what changed, why it changed, and how it was tested. Link related
issues and include screenshots or recordings for visible UI changes. Maintainers
may request revisions before merging.
