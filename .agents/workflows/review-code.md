---
description: Perform a multi-axis code review evaluating correctness, architecture, performance, licensing, security, and visual design.
---

# Review Code Workflow

## Purpose

Evaluate code changes across key technical axes before submitting or declaring work ready for main branch merge.

---

## 1. Evaluation Axes

Review implementation against project standards:

### Axis A: Mapping & WebGL Performance
- MapLibre GL instance preserved using React `useRef`.
- Map camera pitch, bearing, zoom, and target center stored/restored smoothly.
- Spatial building data read locally from `src/data/buildings.ts`; Overpass scripts route queries via `maps.mail.ru` mirror.
- Map attributions fully visible without CSS text truncation (`text-overflow: ellipsis`).

### Axis B: Architecture & State Management
- Lightweight UI state managed in React Context / `App.tsx`.
- Contextual UI hiding utilizes spatial ghosting (`opacity-0 pointer-events-none`).
- Components are modular, single-responsibility, and placed in `src/components/`.

### Axis C: Security & AGPL-3.0 Licensing
- License compatibility verified for any new dependencies (AGPL-3.0 compatible).
- Supabase feedback submissions direct to Supabase `feedback` table.
- GitHub API PAT tokens stored strictly in Supabase Edge Function Secrets vault (no PAT in frontend React code).

### Axis D: Styling & Dark Mode Safety
- Explicit dark mode hover declarations (`dark:hover:bg-primary`).
- `enabled:hover:` guards on interactive controls.
- Glassmorphism design system alignment (`liquid-glass`).

---

## 2. Verification Summary

Confirm static analysis and build succeed:

```powershell
npm run lint; npm run build
```
