# signal-frontend

Consumer dashboard for Signal-to-Noise — a curated tech digest for software engineers.

## Prerequisites

- Node 22+
- npm 10+

## Setup

```bash
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL if the backend runs elsewhere
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS + @tailwindcss/typography |
| Data fetching | TanStack Query v5 |
| Language | TypeScript 5 (strict) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | ESLint |
