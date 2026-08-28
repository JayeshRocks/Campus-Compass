---
name: web-app-qa
description: Quality assurance, end-to-end testing, MapLibre WebGL canvas auditing, and static analysis verification for Campus Compass.
---

# Web App QA Skill

This skill provides step-by-step instructions for verifying user experience, map interactions, component stability, and code quality in Campus Compass.

---

## 1. Static Analysis & Build Verification

Before testing runtime UI, ensure clean code compilation:

```powershell
npm run lint; npm run build
```

Verify:
- Zero ESLint errors or warnings.
- Clean TypeScript type-checking (`tsc -b`) and Vite production bundle compilation.

---

## 2. 3D Map & WebGL QA

Inspect map rendering and camera interactions:
- **Instance Persistence**: Confirm the MapLibre map instance is retained during parent re-renders without unmounting or canvas flashing.
- **Camera State Restoring**: Pitch, bearing, center coordinates, and zoom must persist when navigating between the map tab and other views.
- **Map Controls**: Test pitch reset, bearing rotation, zoom buttons, and geolocation tracking.
- **Map Attribution Legibility**: Confirm OpenStreetMap, CARTO, and Esri attributions are fully legible, wrap text dynamically, and are never cut off by CSS rules.

---

## 3. Building Search & Route Navigation QA

Test search and navigation workflows:
- **Search Filtering**: Verify searching building names, departments, or categories updates search results without UI layout shifts.
- **Building Details Modal**: Confirm selecting a building opens the details panel, focuses camera on the building coordinates, and trapping focus works properly.
- **Routing Engine**: Verify selecting origin and destination renders the calculated route on the map canvas.

---

## 4. UI Polish & Visual QA

Verify design system and accessibility requirements:
- **Glassmorphism**: Check liquid glass panel styling (`liquid-glass`, `backdrop-blur-md`).
- **Dark Mode Hover Safety**: Verify hover background colors in dark mode retain visible text (`dark:hover:bg-primary`).
- **Spatial Ghosting**: Confirm non-map view state changes use `opacity-0 pointer-events-none` to prevent visual layout jumps.
