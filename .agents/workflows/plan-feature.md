---
description: Create a detailed, implementation-ready plan for a new feature in Campus Compass without writing application code.
---

# Plan Feature Workflow

## Purpose

Create a detailed, implementation-ready plan for a feature or modification in Campus Compass before writing code.

---

## 1. Understand Request & Project Context

Before designing the feature:
1. Read the user request carefully.
2. Review project rules in `.agents/rules/`:
   - `mapping.md` (MapLibre GL JS, Overpass API mirror rules)
   - `frontend.md` (State separation, ghosting UI patterns)
   - `design.md` (Liquid glass styling, dark mode hover rules)
   - `performance.md` (Map camera caching, spatial data optimization)
   - `security-and-licensing.md` (AGPL-3.0 compatibility, Supabase Edge Function boundaries)

---

## 2. Spatial Data & State Impact Assessment

Determine how the requested feature impacts:
- **UI State vs Map Camera State**: Should UI state live in React Context/`App.tsx`, and should map camera pitch/bearing be cached in `localStorage`?
- **Building Data & Map Layers**: Does this require edits to `src/data/buildings.ts` or GeoJSON layers? (Remember: No live Overpass API calls in client runtime).

---

## 3. Create Implementation Plan

Draft `implementation_plan.md` in the artifacts directory following the planning format:
- Goal description & background context.
- User review required items & open design questions.
- Component-by-component breakdown (`[MODIFY]`, `[NEW]`, `[DELETE]`).
- Automated and manual verification steps.

---

## 4. Obtain User Approval

Present the plan to the user with `request_feedback: true` and wait for explicit approval before proceeding to implementation.
