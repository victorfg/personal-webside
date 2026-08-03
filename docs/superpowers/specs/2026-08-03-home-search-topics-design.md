# Home search + Topics section — Design Spec

**Date:** 2026-08-03  
**Approved:** Approach 1

## Goal

Separate Topics from the search cluster and simplify the searcher visually.

## Home order

1. Search (top)  
2. Posts + pagination  
3. Topics (own section, before Reading)  
4. Reading  

## Searcher

- Transparent background, no box border / gray fill  
- Leading search icon  
- Subtle focus: bottom border or minimal underline in teal  
- No rounded filled field  

## Topics section

- Same section language as Reading: `border-t`, serif title “Topics”, tipographic tag links with counts  
- Spacing: `mt-10 pt-8` (aligned with Reading)

## Files

- `pages/index.js` — reorder  
- `components/Searcher.js` — restyle  
- `components/TopicsFilter.js` — section chrome (or wrap in index)
