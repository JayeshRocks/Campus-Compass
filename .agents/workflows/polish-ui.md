---
description: Refine the visual design, glassmorphic styling, responsive layout, and interaction polish of Campus Compass features.
---

# Polish UI Workflow

## Purpose

Audit and enhance the visual polish, liquid glass aesthetics, dark/light mode balance, and micro-animations across Campus Compass components.

---

## 1. Design System Audit

Check modified components against `.agents/rules/design.md`:
- **Glassmorphism**: Ensure backdrop blur and liquid glass utility classes (`liquid-glass`, `backdrop-blur-md`) are consistently applied.
- **Color Variables**: Ensure semantic surface tokens are used for dark/light mode adaptivity (e.g. `bg-surface-container`, `dark:bg-surface-container-high`).
- **Icon Alignment**: Align Material Symbols (`material-symbols-outlined`) and Lucide React icons with proper container dimensions (`w-5 h-5`).

---

## 2. Hover & Interaction Safety

Verify:
- Every element with a hover background explicitly declares both light mode and dark mode states (`hover:bg-neutral-100 dark:hover:bg-primary`).
- Buttons and inputs use `enabled:hover:` to avoid triggering hover styles on disabled controls.
- Contextual UI hiding uses `opacity-0 pointer-events-none` instead of `hidden` to guarantee layout stability.

---

## 3. Micro-Animations & Responsiveness

Verify:
- Smooth CSS transitions (`transition-all duration-200 ease-in-out`) on cards, floating toolbars, and search filters.
- Layout responsiveness across mobile, tablet, and desktop viewports.
- Floating controls dynamically adapt to shifting footer attribution heights.
