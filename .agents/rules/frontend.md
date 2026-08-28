---
trigger: always_on
---

# Frontend Engineering Rules

## Purpose

These rules define standards for React 19 component architecture, TypeScript typing, layout stability, and state management in Campus Compass.

---

## 1. Stack & Tech Specifications

Stick strictly to the project's established web stack:

- **Framework**: React 19 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Map Renderer**: MapLibre GL JS
- **Icons**: Lucide React & Google Material Symbols

Do not add alternative state libraries or UI frameworks without explicit technical justification.

---

## 2. State Management Architecture

Separate UI interactions from heavy WebGL camera state to ensure smooth navigation:

- **UI State**: Store lightweight UI state (active tabs, search query, modal toggles, sidebar state) in React Context or top-level components (e.g. `App.tsx`).
- **Map Camera State**: Cache heavy 3D map camera properties (pitch, bearing, target center coordinates, zoom) in module-level variables or `localStorage`.
- **Navigation Smoothness**: Restoring camera pitch/bearing from persistent storage prevents the 3D map from jarringly resetting to default perspectives when switching tabs or views.

---

## 3. Layout Stability & UI Ghosting

Prevent content jumps and layout reflows when toggling interface controls:

- **UI Ghosting Rule**: When hiding UI elements contextually (e.g. controls hidden on non-map pages or secondary views), use `opacity-0 pointer-events-none` instead of `hidden` (`display: none`) or conditional unmounting.
- **Benefits**: Maintains exact layout spatial footprint across view states, preventing jarring UI shifts while keeping elements invisible and non-interactive.

---

## 4. TypeScript Discipline

- **Strict Typing**: Maintain strict TypeScript typing across all components, map callbacks, building schemas, and utility functions.
- **No `any`**: Avoid `any` types. Write explicit interfaces for GeoJSON features, building objects, search results, and event handlers.
- **Type Guards**: Use runtime type narrowing and guard functions when parsing external data or Overpass API responses.

---

## 5. React Component Practices

- **Single Responsibility**: Keep map controls, search panels, building details modal, and feedback forms in modular, dedicated component files under `src/components/`.
- **Custom Hooks**: Extract map lifecycle logic, event listeners, and geolocation hooks into modular files under `src/hooks/`.
- **Ref Preservation**: Preserve MapLibre instance references using React `useRef` to avoid unnecessary map re-initializations during parent component re-renders.
