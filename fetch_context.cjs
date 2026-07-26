// Fetches surrounding building footprints and tree points from OpenStreetMap
// (same bounding box as fetch_roads.cjs) so the map can render real 3D
// buildings/greenery around campus instead of a flat basemap underneath it.
//
// Run this once (or whenever you want fresher data) with:
//   node fetch_context.cjs
//
// It writes:
//   public/context-buildings.geojson  (extruded building footprints)
//   public/context-trees.geojson      (small point markers for trees)

const fs = require('fs');

// Tight box around just the campus footprint (+ ~150m buffer), not the whole
// surrounding neighborhood — computed from the actual building coordinates
// in src/data/buildings.ts.
const BBOX = '13.1217,77.5849,13.1320,77.5935';

// Rough meters-per-degree at this latitude, used to turn a tree point into a
// tiny square footprint we can extrude a few meters tall.
const TREE_HALF_WIDTH_DEG = 0.00003; // ~3m

function metersFromLevels(tags) {
  if (tags['height']) {
    const h = parseFloat(tags['height']);
    if (!Number.isNaN(h)) return h;
  }
  if (tags['building:levels']) {
    const levels = parseFloat(tags['building:levels']);
    if (!Number.isNaN(levels)) return Math.max(3, levels * 3.2);
  }
  return 9; // default ~3 storeys, matches a typical small building
}

async function run() {
  const query = `[out:json][timeout:60];(
    way["building"](${BBOX});
    node["natural"="tree"](${BBOX});
  );out geom;`;

  const res = await fetch('https://maps.mail.ru/osm/tools/overpass/api/interpreter', {
    method: 'POST',
    body: query,
    headers: { 'User-Agent': 'CampusCompassApp/1.0 (test@example.com)' }
  });
  const text = await res.text();
  if (!res.ok || text.startsWith('<')) {
    console.error('API Error Response:', text.substring(0, 500));
    return;
  }
  const data = JSON.parse(text);
  const elements = data.elements || [];

  const buildingFeatures = elements
    .filter(el => el.type === 'way' && el.tags?.building && el.geometry)
    .map(el => ({
      type: 'Feature',
      properties: {
        height: metersFromLevels(el.tags || {})
      },
      geometry: {
        type: 'Polygon',
        coordinates: [el.geometry.map(g => [g.lon, g.lat])]
      }
    }));

  const treeFeatures = elements
    .filter(el => el.type === 'node' && el.tags?.natural === 'tree')
    .map(el => {
      const { lat, lon } = el;
      const d = TREE_HALF_WIDTH_DEG;
      return {
        type: 'Feature',
        properties: { height: 4 + Math.random() * 3 },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [lon - d, lat - d],
            [lon + d, lat - d],
            [lon + d, lat + d],
            [lon - d, lat + d],
            [lon - d, lat - d]
          ]]
        }
      };
    });

  fs.writeFileSync(
    'public/context-buildings.geojson',
    JSON.stringify({ type: 'FeatureCollection', features: buildingFeatures })
  );
  fs.writeFileSync(
    'public/context-trees.geojson',
    JSON.stringify({ type: 'FeatureCollection', features: treeFeatures })
  );

  console.log(`Wrote ${buildingFeatures.length} context buildings and ${treeFeatures.length} trees`);
}

run();
