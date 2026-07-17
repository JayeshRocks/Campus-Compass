const fs = require('fs');

async function run() {
  const query = `[out:json][timeout:25];(way["highway"](13.118,77.578,13.135,77.598););out geom;`;
  const res = await fetch('https://overpass.openstreetmap.ru/api/interpreter', { method: 'POST', body: query, headers: { 'User-Agent': 'CampusCompassApp/1.0 (test@example.com)' } });
  const data = await res.json();
  const features = (data.elements || []).filter(el => el.type === 'way' && el.geometry).map(el => ({
    type: 'Feature',
    properties: { highway: el.tags?.highway || 'road' },
    geometry: { type: 'LineString', coordinates: el.geometry.map(g => [g.lon, g.lat]) }
  }));
  fs.writeFileSync('public/roads.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
  console.log('Wrote ' + features.length + ' roads');
}
run();
