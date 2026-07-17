# signal-frontend

Consumer dashboard for Signal-to-Noise — a curated tech digest for software engineers. Articles are rendered as scannable AI-extracted highlights (problem, solution, why it matters, key takeaways) rather than the full text, with dark mode and a related-articles rail.

## Prerequisites

- Node 22+
- npm 10+

## Setup

```bash
cp .env.local.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL if the backend runs elsewhere,
# and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY (get free dev
# keys at https://dashboard.clerk.com)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS 4 + @tailwindcss/typography |
| Dark mode | next-themes (system-aware, persisted toggle) |
| Data fetching | TanStack Query v5 |
| Auth | Clerk (`@clerk/nextjs`) |
| Sanitization | isomorphic-dompurify (scraped HTML is untrusted) |
| Components | Radix UI (Select, Dialog) |
| Language | TypeScript 5 (strict) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | ESLint |

---

## Features

### Article reader

Instead of the full scraped text, an article page shows what the AI classifier extracted:

- **TL;DR** — two-sentence summary
- **Why it matters** — one line on who should care
- **Problem / Solution** — labels adapt to content type (e.g. a repo highlight shows "What it is / Why it stands out" instead of incident language)
- **Key takeaways** — numbered, specific points
- **Reading time saved** badge ("8 min article → 1 min brief")
- Full extracted text is still available, collapsed behind a "Show full extracted article" toggle
- **More like this** — related articles via the backend's pgvector similarity endpoint

### Dark mode

Toggle in the header (sun/moon icon). Defaults to OS preference, persists the manual choice, no flash of the wrong theme on load.

---

## Auth

Authentication is handled by [Clerk](https://clerk.com). The feed is **fully public** — auth is only required for personalisation features:

- **Onboarding** (`/onboarding`) — pick technology tags and a minimum signal score after sign-up; saves via `POST /preferences` on the backend
- **Bookmarks** (`/bookmarks`) — save articles for later reading
- Once preferences are saved, the home page (`/`) uses them as the default tag/score filter for a signed-in user

### Protected routes

| Route | Access |
|-------|--------|
| `/` | Public — default filters for anonymous users |
| `/article/:id` | Public |
| `/search` | Public |
| `/sign-in` | Public |
| `/sign-up` | Public |
| `/onboarding` | Protected — requires sign-in |
| `/bookmarks` | Protected — requires sign-in |

> `middleware.ts` also matches `/preferences(.*)`, but there's no `/preferences` page yet — preferences are only ever set through `/onboarding`. Remove the matcher or add the page if you build a standalone settings screen.

---

## Production Checklist

- [ ] Vercel project linked to signal-frontend repo
- [ ] NEXT_PUBLIC_API_URL set to Railway backend URL (no trailing slash)
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY set
- [ ] Vercel deployment preview tested on a PR before merging to main
- [ ] Custom domain configured (optional for beta)
- [ ] CORS origin on backend updated to match production frontend URL

