# Pagination list transition — Design Spec

**Date:** 2026-08-03  
**Approved:** Opacity-only fade (approach 1)

## Problem

Pagination felt like a bottom-to-top fold because `ListItem` animated `height: 0` with `layout`.

## Solution

`components/Animations.js`: keep `AnimatePresence` + `ListItem`, but animate **opacity only** (~0.2s). No `height`, no `layout`, no vertical motion.

## Out of scope

Scroll-to-top on page change; whole-list crossfade; removing Framer Motion.
