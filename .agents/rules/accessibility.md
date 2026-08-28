---
trigger: always_on
---

# Accessibility & Inclusion Rules

## Purpose

Ensure Campus Compass interfaces, search controls, floating toolbars, and 3D map views meet WCAG 2.1 AA accessibility standards.

---

## 1. Semantic HTML & Landmark Regions

- **Landmark Elements**: Use HTML5 semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`, `dialog`).
- **Heading Hierarchy**: Maintain structured heading levels (`h1` -> `h2` -> `h3`). Avoid skipping heading levels for visual styling.
- **Button vs Link**: Use `<button>` for actions (map camera resets, layer toggles, search clears) and `<a>` for external navigations.

---

## 2. Keyboard Navigation & Focus Management

- **Focus Indicators**: Ensure interactive buttons, search inputs, and modal controls feature visible focus outlines (`focus-visible:ring-2 focus-visible:ring-primary`).
- **Modal Focus Trapping**: Trap focus within open building details dialogs and feedback modals; restore focus to triggering elements when closed.
- **Keyboard Map Shortcuts**: Support standard keyboard navigation for floating tools and search filters.

---

## 3. Accessible Labels & Icons

- **Non-Text Controls**: Provide `aria-label` or `title` attributes on icon-only buttons (e.g. Material Symbols `location_on`, `directions_walk`, map pitch controls).
- **Search & Input Labels**: Associate input fields with visible or screen-reader-only `<label>` elements (`sr-only`).
- **Map Canvas Alternative**: Provide readable text alternatives (building search result lists, details modals) so campus map information is accessible without WebGL rendering.

---

## 4. Color Contrast & Visual Adaptability

- **Contrast Ratios**: Maintain minimum 4.5:1 text-to-background contrast ratios across light and dark surface variants (`dark:bg-surface-container-high`).
- **Non-Color Indicators**: Do not rely solely on color to convey building categories or route statuses; pair colors with icons or textual badges.
