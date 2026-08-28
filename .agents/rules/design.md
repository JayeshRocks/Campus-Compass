---
trigger: always_on
---

# Design & Visual Styling Rules

## Purpose

These rules govern the visual design system, glassmorphism aesthetics, color scheme modes, typography, and hover interaction rules for Campus Compass.

---

## 1. Design System & Styling Framework

- **Tailwind CSS**: Use Tailwind CSS for all layout and component styling.
- **Glassmorphism Theme**: Rely heavily on modern liquid glass aesthetics (`liquid-glass` utility classes) paired with frosted translucent backdrops (`backdrop-blur-md`).
- **Color Variables**: Use CSS semantic surface variables for dark/light mode adaptivity (e.g., `bg-surface-container`, `dark:bg-surface-container-high`).

---

## 2. Dark Mode & Hover State Safety

Prevent hover background bugs and text invisibility in dark mode:

- **Explicit Dark Hover Declaration**: When defining hover background styles for elements with dark mode variants, ALWAYS explicitly declare the dark mode hover state alongside the light mode hover state (e.g., `hover:bg-neutral-100 dark:hover:bg-primary`).
- **Rationale**: Relying solely on `hover:` without a matching `dark:hover:` class causes light mode hover background colors to override dark mode surface colors, rendering text invisible.
- **Disabled State Hover Guard**: When styling interactive elements that can be disabled (buttons, inputs), use `enabled:hover:` (e.g., `enabled:hover:bg-primary-hover`) to prevent hover styles from triggering on disabled elements.

---

## 3. Iconography & Visual Assets

- **Material Symbols & Lucide**: Use Google Material Symbols (`material-symbols-outlined`) and Lucide React icons (`lucide-react`) consistently.
- **Icon Sizing & Alignment**: Align icons vertically with inline text and specify clear container boundaries (`w-5 h-5`) to avoid layout jumps during initial render.

---

## 4. Visual Polish & Premium Aesthetics

- **Curated Palette**: Avoid generic primary colors (plain red/blue/green). Use tailored, rich palette tokens matching campus branding.
- **Micro-Animations**: Add subtle transitions (`transition-all duration-200 ease-in-out`) on interactive cards, buttons, floating search bars, and map tooltips.
- **Elevation & Contrast**: Ensure clear visual hierarchy using soft drop-shadows (`shadow-lg`, `shadow-xl`) and high-contrast text ratios across light and dark mode modes.
