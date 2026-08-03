# Pagination list transition fix — Design Spec

**Date:** 2026-08-03  
**Approved:** Approach A — no list animation

## Problem

Opacity-only exit left departing posts in document flow (invisible but full height), stacking with the next page and creating a large blank gap.

## Solution

Remove `AnimatePresence` / `ListItem` from `PostsLists`. Page changes swap posts instantly with no exit animation.

## Verification

Browser: home → page 2 → page 1 — only current page posts in the list; no blank gap above.
