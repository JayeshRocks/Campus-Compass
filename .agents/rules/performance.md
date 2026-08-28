---
trigger: always_on
---

# Performance & Optimization Rules

## Purpose

These rules define performance requirements to keep 3D map rendering fluid, memory footprint minimal, and client bundle size small.

---

## 1. WebGL & Map Libre Performance

3D rendering and map canvas management are performance-sensitive:

- **Instance Reuse**: Never destroy and re-create `maplibre-gl` map instances unnecessarily on component re-renders. Use `useRef` to store the active map instance.
- **Camera Caching**: Cache pitch, bearing, and zoom coordinates in memory/localStorage so returning to the map tab doesn't force expensive camera animations from scratch.
- **Tile & Style Caching**: Ensure vector tile sources (CARTO, Esri, OpenStreetMap) leverage browser cache efficiently.

---

## 2. Spatial Data & Network Latency

- **Local Data First**: Keep building data, coordinates, and spatial boundaries in `src/data/buildings.ts`.
- **Pre-computed Network**: Load pre-computed road data generated via `fetch_roads.cjs` instead of performing runtime Overpass API queries.
- **Debounced Input**: Debounce search queries in the building/route finder to avoid expensive string matching or spatial filtering on every keystroke.

---

## 3. Event Listener & Memory Leak Prevention

- **Cleanup on Unmount**: Always clean up MapLibre event listeners (`map.off(...)`), resize observers, and geolocation watchers in React `useEffect` cleanup functions.
- **WebGL Context Loss**: Handle `webglcontextlost` and `webglcontextrestored` events gracefully without crashing the app shell.

---

## 4. Bundle Size & Tree Shaking

- **Icon Imports**: Import specific icons directly from `lucide-react` (e.g. `import { MapPin } from 'lucide-react'`) to enable effective tree-shaking.
- **Dependency Vetting**: Before adding any dependency, verify its impact on Vite bundle size and ensure no duplicate utilities are introduced.
