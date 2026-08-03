# Visual & UX Redesign Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Apply the approved sober typographic redesign (Source Serif 4 + IBM Plex Sans, teal accent, cardless lists, home intro) without changing stack or content.

**Architecture:** Token-first (fonts/colors/CSS), then shell, then home list UX, then article/tags accent cleanup. Behavior of search/filter/pagination stays client-side as today.

**Tech Stack:** Next.js 14 Pages, Tailwind 3, Framer Motion, next-themes, @fontsource packages, TinaCMS (untouched schema).

## Global Constraints

- Single accent: teal (`primary` / `#0d9488` scale); no indigo/purple glow
- No cards/shadows/scale on post lists
- No new pages; no Tina content edits
- Keep light/dark via `next-themes`

---

### Task 1: Design tokens & fonts

**Files:** `package.json`, `pages/_app.js`, `tailwind.config.js`, `styles/custom.css`

- [ ] Replace `@fontsource/inter` with `@fontsource/source-serif-4` and `@fontsource/ibm-plex-sans`
- [ ] Import font weights in `_app.js`; set `font-sans` / `font-serif` in Tailwind; apply `font-sans` on app shell
- [ ] Retheme NProgress and focus outlines to teal; remove purple glow
- [ ] Restyle pagination to minimal typographic controls

### Task 2: Home composition & list

**Files:** `pages/index.js`, `Searcher.js`, `TopicsFilter.js`, `PostsLists.js`, `Labels.js`, `Animations.js`, `CustomPagination.js`

- [ ] Home intro (brand + one line); reorder search → topics → list
- [ ] Typographic list items; teal tag links; subtle list motion
- [ ] Empty search state

### Task 3: Article, tags, shell polish

**Files:** `Layout.js`, `TableOfContents.js`, `pages/blog/[slug].js`, `pages/tags/[tag].js`, `LayoutWrapper.js`

- [ ] Prev/next typographic; TOC teal; tags page list language; header brand uses `font-serif`

### Task 4: Verify

- [ ] Lint; spot-check light/dark home + post if dev server available
