# Vue 3 App TS

A Vue 3 and TypeScript single-page application with authentication, request management, Firebase integration, and a responsive application layout. The project is deployed with Fly.io and can also be served through Firebase configuration included in the repository.

## Features

- User authentication and protected routes
- Request list, filtering, creation, and status management
- Reusable navigation, modal, table, form, and feedback components
- Client-side validation with VeeValidate and Yup
- Unit and end-to-end test setup
- Production build and service worker support

## Tech stack

- Vue 3, Vue Router, and Vuex
- TypeScript
- Axios
- Firebase
- Jest and Cypress
- Vue CLI

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run serve
```

The development server is available at `http://localhost:8080` by default.

### Environment variables

Create `.env.local` with the Firebase values required by your environment. Do not commit credentials or local environment files.

```dotenv
VUE_APP_FIREBASE_API_KEY=your-api-key
VUE_APP_FB_URL=https://your-project.firebaseio.com
```

### Useful commands

```bash
npm run build       # Build for production
npm run lint        # Run ESLint
npm run test:unit   # Run unit tests
npm run test:e2e    # Run Cypress tests
npm run format:check
```

## Project structure

```text
src/
	axios/       API request helpers
	components/  Reusable application components
	layout/      Authenticated and main layouts
	router/      Route definitions
	store/       Vuex modules and state
	utils/       Shared utilities
	views/       Page-level views
tests/         Unit and end-to-end tests
public/        Static assets and application entry point
```

## Contributing

Bug reports, feature ideas, documentation improvements, and code contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## Security

Please do not report security vulnerabilities in public issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.

## License

This project is distributed under the [MIT License](LICENSE).
