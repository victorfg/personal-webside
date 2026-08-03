# Site-wide UX Finish — Implementation Plan

> **For agentic workers:** Implement task-by-task.

**Goal:** Apply the approved UX finish pass so home, about, post, and tags feel finished.

**Architecture:** Shared spacing rhythm + typographic list language; fix list animation; compact topics; align tags/post chrome.

**Tech Stack:** Next.js Pages, Tailwind, Framer Motion (minimal), existing components.

## Global Constraints

- Search first on home; no intro/Posts H2
- One hairline between major sections; pagination not between two borders
- Teal accent; Source Serif 4 + IBM Plex Sans

---

### Task 1: Home rhythm + topics + animation

**Files:** `pages/index.js`, `TopicsFilter.js`, `Animations.js`, `LinksList.js`, `styles/custom.css`, `CustomPagination.js`

- [x] Apply spacing tokens from spec
- [x] Quieter topics
- [x] Fix list opacity animation
- [x] Reading/pagination spacing

### Task 2: Post + Tags + About

**Files:** `pages/blog/[slug].js`, `pages/tags/[tag].js`, `pages/about.js`, `Layout.js`

- [x] Post header rhythm
- [x] Tags meta + back link + list rhythm
- [x] About spacing align

### Task 3: Verify

- [ ] Visual check home/about/post/tags; build if feasible
