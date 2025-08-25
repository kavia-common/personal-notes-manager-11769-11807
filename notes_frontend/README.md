# Notes Frontend (Next.js)

A modern, minimalistic, light-themed application to create, edit, and manage personal notes with Markdown support.

## Features
- User authentication (email/password; expects backend to expose /auth endpoints)
- Create, read, update, and delete notes
- Notes list with search and tag filter
- Responsive layout with sidebar, header and main editing panel
- Markdown editing and live preview
- Environment-driven backend configuration

## Tech
- Next.js App Router
- TypeScript
- Tailwind CSS v4 (utility-first styling)
- No extra markdown dependencies (lightweight parser in MarkdownView)

## Getting Started
1. Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_AUTH_LOGIN_PATH=/auth/login
NEXT_PUBLIC_AUTH_REGISTER_PATH=/auth/register
```

2. Install dependencies and run the dev server:
```
npm install
npm run dev
```

3. Open http://localhost:3000

4. Use /signup to create an account, then manage notes at /notes.

## Backend Contract (REST)
- POST /auth/register { email, password, name? } -> 200
- POST /auth/login { email, password } -> { token, user }
- GET /auth/me -> { id, email, name? }
- GET /notes?search&tag -> Note[]
- POST /notes { title, content, tags? } -> Note
- GET /notes/:id -> Note
- PUT /notes/:id { title, content, tags? } -> 200
- DELETE /notes/:id -> 200

Include Authorization: Bearer <token> header for protected routes.

## Theming
Colors:
- primary: #1a73e8
- secondary: #4285f4
- accent: #34a853

Global styles: see src/app/globals.css

## Scripts
- dev: next dev
- build: next build
- start: next start
- lint: next lint
