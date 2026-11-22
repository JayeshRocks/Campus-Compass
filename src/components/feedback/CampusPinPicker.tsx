import type { KeyboardEvent, MouseEvent } from "react";
import { buildings } from "../../data/buildings";

export type FeedbackPin = { lat: number; lng: number };

const width = 400;
const height = 290;
const outlines = buildings.flatMap(({ id, geometry }) => {
  const paths = geometry.type === "LineString" ? [geometry.coordinates] :
    geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat();
  return paths.map((points, i) => ({ id: id + ":" + i, points, closed: geometry.type !== "LineString" }));
});
const positions = outlines.flatMap(({ points }) => points);
const minLng = Math.min(...positions.map(p => p[0])) - 0.0002;
const maxLng = Math.max(...positions.map(p => p[0])) + 0.0002;
const minLat = Math.min(...positions.map(p => p[1])) - 0.0002;
const maxLat = Math.max(...positions.map(p => p[1])) + 0.0002;
const x = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * width;
const y = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * height;
const paths = outlines.map(({ id, points, closed }) => ({
  id, closed, d: points.map(([lng, lat], i) => (i ? "L" : "M") + x(lng) + "," + y(lat)).join(" ") + (closed ? "Z" : ""),
}));

function toPin(px: number, py: number): FeedbackPin {
  return {
    lat: Number((maxLat - Math.max(0, Math.min(height, py)) / height * (maxLat - minLat)).toFixed(6)),
    lng: Number((minLng + Math.max(0, Math.min(width, px)) / width * (maxLng - minLng)).toFixed(6)),
  };
}

export default function CampusPinPicker({ pin, buildingId, onChange }: {
  pin: FeedbackPin | null;
  buildingId: string;
  onChange: (pin: FeedbackPin | null) => void;
}) {
  const building = buildings.find(b => b.id === buildingId);
  const anchorX = pin ? x(pin.lng) : building ? x(building.longitude) : width / 2;
  const anchorY = pin ? y(pin.lat) : building ? y(building.latitude) : height / 2;
  function choose(e: MouseEvent<HTMLButtonElement>) {
    if (e.detail === 0) {
      if (!pin) onChange(toPin(anchorX, anchorY));
      return;
    }
    const { left, top, width: boxWidth, height: boxHeight } = e.currentTarget.getBoundingClientRect();
    if (boxWidth && boxHeight) onChange(toPin(
      (e.clientX - left) / boxWidth * width,
      (e.clientY - top) / boxHeight * height,
    ));
  }
  function move(e: KeyboardEvent<HTMLButtonElement>) {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4],
    };
    const step = steps[e.key];
    if (!step) return;
    e.preventDefault();
    onChange(toPin(anchorX + step[0], anchorY + step[1]));
  }
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-600 dark:text-on-surface-variant">
        Tap the campus sketch, or focus it and use the arrow keys. North is up.
      </p>
      <button type="button" aria-label="Place or move the report pin" onClick={choose} onKeyDown={move}
        className="block w-full cursor-crosshair overflow-hidden rounded-xl bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22B8CF] dark:bg-slate-900">
        <svg className="block h-auto w-full" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          {paths.map(path => <path key={path.id} d={path.d}
            className={path.closed ? "fill-slate-300 stroke-slate-500 dark:fill-slate-700 dark:stroke-slate-400" : "fill-none stroke-slate-500 dark:stroke-slate-400"}
            strokeWidth="0.9" />)}
          {building && <circle cx={x(building.longitude)} cy={y(building.latitude)} r="4" fill="#eab308" stroke="#713f12" />}
          {pin && <circle cx={anchorX} cy={anchorY} r="5" fill="#0891b2" stroke="white" strokeWidth="2" />}
          <text x={width - 17} y="22" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200 text-xs">N</text>
        </svg>
      </button>
      {pin && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <output className="text-slate-600 dark:text-on-surface-variant">Pin: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</output>
          <button type="button" onClick={() => onChange(null)}
            className="rounded text-slate-700 underline focus-visible:outline-2 dark:text-on-surface">Remove pin</button>
        </div>
      )}
    </div>
  );
}
