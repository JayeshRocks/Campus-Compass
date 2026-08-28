---
trigger: always_on
---

# Mapping & GIS Engine Rules

## Purpose

These rules define standards for 3D map rendering, spatial data management, API routing, and GIS compliance in Campus Compass.

---

## 1. Mapping Engine & Library

ALWAYS use `maplibre-gl` instead of Mapbox.

- **Engine**: Use MapLibre GL JS for open-source 3D map rendering.
- **Licensing Rationale**: Avoid commercial Mapbox access tokens and licensing fees.
- **Attributions**: Retain MapLibre attribution controls and custom attributions without altering vendor credentials.

---

## 2. Building Data & Road Networks

Manage campus spatial datasets deterministically:

- **Building Metadata & Coordinates**: Store building metadata, geo-coordinates, and campus boundaries locally in `src/data/buildings.ts`.
- **Road Network Pre-rendering**: Pre-generate road networks and boundaries via Overpass API build scripts (`fetch_roads.cjs`).
- **Client Latency Avoidance**: Do not issue live Overpass queries at runtime in the frontend; read pre-processed GeoJSON from local assets to keep tile rendering and navigation instant.

---

## 3. Overpass API Integration (Road Generation Script)

When updating or executing `fetch_roads.cjs`:

- **Endpoint Mirror**: ALWAYS use the `maps.mail.ru` Overpass mirror (`https://maps.mail.ru/osm/tools/overpass/api/interpreter`).
- **HTTP Request Method**: Execute raw POST requests with the Overpass QL query in the request body.
- **Server Safety**: Official German Overpass API servers (`overpass-api.de`) actively rate-limit and block Node.js `fetch` requests based on internal headers. Always route requests through the reliable mirror.

---

## 4. Map Attribution Compliance

Strictly display legible map attributions in compliance with open-source map providers (OpenStreetMap, CARTO, Esri):

- **No CSS Truncation**: NEVER truncate or hide map attribution text using CSS rules such as `text-overflow: ellipsis`, `overflow: hidden`, or fixed height cutoffs.
- **Text Wrapping**: Attributions MUST be fully visible, legible, and wrap dynamically across multiple lines on smaller viewports.
- **Layout Adaptability**: Floating UI elements, bottom bars, and map container layouts must dynamically adjust to shifting footer attribution heights.
