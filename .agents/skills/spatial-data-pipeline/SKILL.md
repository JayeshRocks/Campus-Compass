---
name: spatial-data-pipeline
description: Spatial data pipeline skill for managing building metadata in src/data/buildings.ts, road generation via Overpass API scripts, and Turf.js GIS operations in Campus Compass.
---

# Spatial Data Pipeline Skill

This skill details spatial data management, GeoJSON preprocessing, building schema rules, and Overpass API query scripts for Campus Compass.

---

## 1. Local Building Data Schema (`src/data/buildings.ts`)

Building metadata and coordinates are stored locally to guarantee sub-millisecond client rendering:

```typescript
export interface Building {
  id: string;
  name: string;
  code?: string;
  category: 'academic' | 'administrative' | 'hostel' | 'sports' | 'amenity' | 'library';
  coordinates: [number, number]; // [longitude, latitude]
  footprint?: [number, number][]; // Polygon coordinate ring
  floors?: number;
  description?: string;
  departments?: string[];
}
```

### Coordinate Precision Rule
When adding or updating coordinates in `src/data/buildings.ts`:
- Limit floating-point coordinate precision to 12-14 decimal places to prevent JavaScript double-precision loss (`no-loss-of-precision` ESLint rule).

---

## 2. Overpass API Road Generation (`fetch_roads.cjs`)

Road networks and campus boundary polygons are pre-computed via build scripts rather than live client queries:

### Critical Server Mirror Rule
- **Endpoint**: ALWAYS use the `maps.mail.ru` Overpass mirror: `https://maps.mail.ru/osm/tools/overpass/api/interpreter`.
- **Request Method**: Send raw POST requests with the Overpass QL query string in the request body.
- **Server Guard**: Do not query official German servers (`overpass-api.de`) because they rate-limit and block Node.js `fetch` headers.

```javascript
// Example Overpass POST invocation in fetch_roads.cjs
const response = await fetch('https://maps.mail.ru/osm/tools/overpass/api/interpreter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `data=${encodeURIComponent(overpassQuery)}`
});
```

---

## 3. Turf.js Spatial Operations

Use `@turf/helpers` and `@turf/bbox-clip` for spatial calculations:
- Calculating bounding boxes and center centroids for camera focusing.
- Clipping road segments to campus bounding boxes.
- Distance and bearing calculations for campus navigation routes.
