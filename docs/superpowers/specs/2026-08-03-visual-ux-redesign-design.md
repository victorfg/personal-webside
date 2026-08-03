# Visual & UX Redesign — Design Spec

**Date:** 2026-08-03  
**Site:** personal-webside (`vfernandez.me`)  
**Stack (unchanged):** Next.js Pages Router, Tailwind CSS, TinaCMS, Framer Motion, next-themes

## Goal

Bounded redesign of visual identity and home UX so the blog reads as **senior / technical / sober** — typographic, almost monochrome, one accent — without rewriting the stack or content model.

## Decisions (approved)

| Decision | Choice |
|---|---|
| Scope | Identity + UX, acotado (no App Router, no new about page) |
| Tone | Dev senior, tipográfico, poco ornamento |
| Home open | Brand + one supporting sentence, then post list |
| Post list | Typographic list — no cards, shadows, or scale |
| Color | Near-monochrome + single teal accent; keep light/dark |
| Approach | Refinement (1) + light home composition tweak (2) |

## Visual system

### Typography

- **Headings / brand:** Source Serif 4 (`font-serif`)
- **UI / body:** IBM Plex Sans (`font-sans`)
- Replace Inter (`@fontsource/inter`)
- Hierarchy: brand strong; post titles prominent; meta (date, reading time) small and secondary

### Color

- Neutrals: black / gray on white (and dark-mode inverse)
- **Single accent:** Tailwind `primary` teal (already in config)
- Links, focus rings, active tags, NProgress use teal
- Remove indigo, purple gradients, and glow shadows

### Surface & motion

- Flat surfaces; no elevated cards
- Separators: hairline borders between list items only
- Motion: subtle opacity/fade on list and header; no card scale; no purple glow pulse on progress bar

## Home composition

1. **Header:** `{...codingPosts}` + theme switch (nav stays empty)
2. **Intro block:** brand (serif) + one short supporting line (e.g. frontend / technical notes)
3. **Search:** discreet bar under intro (left-aligned with content, not centered hero)
4. **Topics:** inline text links / light chips above the list — not a competing aside
5. **List:** typographic posts + minimal pagination
6. **Empty search:** short typographic message

Out of scope on home: photo hero, CTAs, stats, about page.

## Post list item

- Meta row: date · reading time · tags (text links, not heavy pills)
- Title as primary link (hover → teal)
- Summary 1–2 lines
- Hairline separator; no card chrome

## Article page (`/blog/[slug]`)

- Same type system; prose themed to teal primary
- Keep TOC, code blocks, tables, comments; restyle accent colors only
- Prev/next: typographic links (`← title` / `title →`), not bordered cards

## Tags page (`/tags/[tag]`)

- Same typographic list language as home (no grid of cards)

## Components / files to touch

- Tokens: `tailwind.config.js`, `styles/custom.css`, font packages in `package.json` / `_app.js`
- Shell: `LayoutWrapper`, `Footer`, `ThemeSwitch` (minor)
- Home: `pages/index.js`, `Searcher`, `TopicsFilter`, `PostsLists`, `CustomPagination`, `Labels`, `Animations`
- Post: `pages/blog/[slug].js` (header classes only if needed), `Layout.js`, `TableOfContents.js`
- Progress: `_app.js` NProgress color + nprogress CSS
- Tags: `pages/tags/[tag].js`

## Explicitly out of scope

- Tina schema / post content changes
- Migration to App Router
- New about / whoami page
- Analytics, sitemap, feed APIs
- Changing CMS or hosting

## Error / edge cases

- Zero search results → brief empty state
- Client-side filter/search behavior unchanged
- Dark mode: maintain readable contrast for text and teal accent

## Verification

- Visual check: home + one article + tags, light and dark, mobile and desktop
- `npm run lint` and production build when feasible
- No new automated test suite required for this visual pass
