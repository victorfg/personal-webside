# Site-wide UX Finish Pass — Design Spec

**Date:** 2026-08-03  
**Scope:** Home, About, post (`/blog/[slug]`), tags (`/tags/[tag]`)  
**Approach:** Typographic finish pass (1), with light structural tweaks (2) only if home still feels noisy

## Goal

Make the site feel **finished**: coherent spacing, clear hierarchy, consistent list language, and no awkward seams (pagination between borders, Reading cramped against footer, topics competing with posts).

## Decisions (approved)

| Item | Choice |
|---|---|
| Coverage | Full site (home, about, post, tags) |
| Depth | Do what is needed to feel finished within current typographic system |
| Method | Pass 1; touch of 2 (topics compacting) if required |
| Home open | Search first (no intro headline / no “Posts” H2) |
| Visual system | Keep Source Serif 4 + IBM Plex Sans, teal accent, light/dark |

## Spacing system

Use one vertical rhythm across pages (approximate Tailwind scale):

| Token | Use |
|---|---|
| `gap-4` / `gap-5` | Within filter block (search ↔ topics) |
| `mb-8` | Filter block → post list |
| `py-8` / `py-9` | Post list items |
| `mt-5` | Pagination under list (no sandwich between two section borders) |
| `mt-10` + `pt-8` + single `border-t` | Reading section start |
| `mt-16` / `mt-20` + `border-t` | Footer separation from content |

One hairline between major sections (list→Reading, content→footer). Do **not** stack a post `border-b` + Reading `border-t` with pagination trapped between them.

## Home

1. **Search** — first content under header; discrete filter field  
2. **Topics** — secondary tipographic row; compact if still noisy (quieter type, or truncate/wrap calmly)  
3. **Posts** — typographic list (title, meta, summary); `divide-y` between items only  
4. **Pagination** — under list, no extra section borders  
5. **Reading** — short header + curated links (favicon, title, summary, tags); moderate padding  
6. **Footer** — clear air above it  

## Post page

- Header rhythm: title → date · reading time → tags → content  
- Keep typographic prev/next  
- TOC: quiet, teal accent, no attention-seeking motion  
- Align bottom spacing with home/footer system  

## Tags page

- Same list language as home posts  
- Clear back path (“← Posts” or equivalent)  
- Own document title (e.g. `React | Victor Fernandez Gayan`), not generic CodingPosts only  

## About

- Keep current copy (About H1, Iskra link, LinkedIn/GitHub)  
- Match vertical spacing to the shared system  

## Cross-cutting

- Fix list animation / opacity if dark mode leaves titles looking washed or delayed  
- Unified teal hover/focus  
- Verify light and dark  

## Out of scope

- New pages, Tina schema changes, App Router migration  
- Rewriting post content  
- Expanding Reading beyond curated `siteMetadata/links.js`  

## Verification

- Home: search → topics → posts → pagination → reading → footer reads as one rhythm  
- Post + tags + about: consistent type and spacing  
- No pagination between two horizontal rules  
- Spot-check light/dark and a narrow mobile width  

## Success

The site feels calm and finished: modules are obvious, margins are intentional, and no section looks accidental or cramped.
