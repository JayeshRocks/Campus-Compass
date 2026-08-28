---
description: Implement an approved feature in Campus Compass according to project rules, MapLibre standards, and design system.
---

# Build Feature Workflow

## Purpose

Implement an approved feature in Campus Compass following the implementation plan and project engineering rules.

---

## 1. Prerequisites Check

Before editing code:
- Confirm that an implementation plan has been approved by the user.
- Verify existing code contracts by inspecting relevant components in `src/components/`, `src/hooks/`, or `src/data/`.

---

## 2. Implementation Rules

When writing code:
- **MapLibre GL Instance**: Preserve MapLibre map instances using `useRef`. Never destroy/re-create map instances unnecessarily on re-render.
- **State Separation**: Keep lightweight UI state in React Context or top-level components; cache pitch, bearing, and center coordinates in module variables or `localStorage`.
- **UI Ghosting**: Use `opacity-0 pointer-events-none` when hiding contextual UI controls to preserve layout bounds and prevent visual reflows.
- **Dark Mode Hover Guard**: Explicitly define `dark:hover:` styles alongside `hover:` classes (`hover:bg-slate-100 dark:hover:bg-primary`). Use `enabled:hover:` on interactive elements.
- **Strict TypeScript**: Avoid `any` types and unsafe type assertions.
- **Security Boundary**: Ensure Supabase feedback forms submit directly to Supabase, and GitHub API requests remain isolated inside the Supabase Edge Function vault.

---

## 3. Incremental Validation

Execute small changes incrementally:
- Verify component prop signatures and import paths.
- Check browser output or component rendering.
