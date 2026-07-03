# The Diary — Phase 1

A fresh rebuild of your personal blog, themed around physics / AI-ML / math / astronomy.
Built clean this time, one layer at a time.

## What's in this phase

- **Next.js 15 (App Router) + TypeScript + Tailwind**
- Design system: graphite-blue background, phosphor-amber / oscilloscope-cyan / violet
  accents, Fraunces (display) + Inter (body) + JetBrains Mono (data/labels)
- **Signature hero**: a live three-body gravitational simulation on `<canvas>`
  (`components/OrbitScope.tsx`) — an actual bounded-orbit physics sim rendered
  like an oscilloscope trace with phosphor decay, not a stock particle field.
  Respects `prefers-reduced-motion`.
- Landing page: hero, four topic categories, latest entries, about section
- `/blog` — full entry listing
- `/blog/[slug]` — individual entry page
- Mock content seeded with real project topics (IRS-Sim, DQN phase
  optimization, Lissajous curves, Chandrayaan site selection, Kalman filters,
  NTK) so it already reads like *your* blog, not a template

Content currently lives in `lib/posts.ts` as static mock data — no database yet.
That's intentional: this phase is the foundation and the visual identity.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (First `npm run build` needs internet access
to fetch the Google Fonts — that will work fine outside this sandbox.)

## Roadmap — building it one piece at a time

1. ✅ **Foundation** — design system, layout, hero, static blog pages (this delivery)
2. **Real content pipeline** — MDX or a headless CMS so you write posts in
   Markdown instead of editing `posts.ts`, with syntax highlighting and LaTeX
   support (KaTeX) for equations
3. **Database + auth** — Prisma + Vercel Postgres, sign-in so it's clearly
   *your* authored space, draft/publish workflow
4. **Hashnode-style features** — tags/series, reading progress bar, comments,
   reactions, view counts, RSS feed, sitemap, OG image generation per post
5. **AI features** — Groq-powered TL;DR generation, related-post suggestions,
   "ask this post a question"
6. **Polish pass** — scroll-triggered reveals, page-transition choreography,
   performance/accessibility audit

Tell me when you want to start phase 2 and I'll build directly on top of this
instead of starting over.
