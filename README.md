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

---

## Auth

Authentication is handled by [Clerk](https://clerk.com). The feed is **fully public** — auth is only required for personalisation features:

- **Onboarding** — pick technology tags after sign-up
- **Preferences** — saved min-score and tag preferences personalise the feed
- **Bookmarks** — save articles for later reading

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
| `/preferences` | Protected — requires sign-in |

---

## Production Checklist

- [ ] Vercel project linked to signal-frontend repo
- [ ] NEXT_PUBLIC_API_URL set to Railway backend URL (no trailing slash)
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY set
- [ ] Vercel deployment preview tested on a PR before merging to main
- [ ] Custom domain configured (optional for beta)
- [ ] CORS origin on backend updated to match production frontend URL

