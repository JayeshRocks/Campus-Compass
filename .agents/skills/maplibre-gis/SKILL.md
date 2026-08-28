---
name: maplibre-gis
description: Specialized GIS and MapLibre GL JS skill for 3D map layer rendering, spatial data handling, camera animations, and road network pre-rendering in Campus Compass.
---

# MapLibre GL GIS Skill

This skill provides technical guidance for 3D campus spatial rendering, GeoJSON source management, and MapLibre GL JS integration in Campus Compass.

---

## 1. MapLibre Instance Management

Always retain active `maplibregl.Map` references using React `useRef` to avoid expensive re-initializations during React re-renders.

```tsx
const mapRef = useRef<maplibregl.Map | null>(null);
```

### Camera Persistence
Restore camera parameters (`pitch`, `bearing`, `zoom`, `center`) from cached variables or `localStorage`:

```typescript
map.easeTo({
  center: cachedMapState.center,
  zoom: cachedMapState.zoom,
  pitch: cachedMapState.pitch,
  bearing: cachedMapState.bearing,
  duration: 800
});
```

---

## 2. 3D Building Extrusions & Layers

When adding or updating 3D building layers:
- Use `fill-extrusion` layer type.
- Bind `fill-extrusion-height`, `fill-extrusion-base`, and `fill-extrusion-color` to feature properties.
- Ensure light intensity and sky parameters adapt smoothly to dark/light mode toggles.

---

## 3. Overpass API & Pre-rendered Road Networks

- **No Live Queries**: Do not issue live Overpass API calls in client-side React code.
- **Road Generation Script (`fetch_roads.cjs`)**: Route Overpass QL requests through `https://maps.mail.ru/osm/tools/overpass/api/interpreter` using raw POST requests.
- **GeoJSON Source Loading**: Update GeoJSON source data via `map.getSource('campus-roads').setData(...)`.

---

## 4. Map Attribution Compliance

Never truncate vendor attributions. Accommodate dynamic footer heights for floating UI elements:

```typescript
mapInstance.addControl(new maplibregl.AttributionControl({
  compact: false,
}), 'bottom-right');
```
