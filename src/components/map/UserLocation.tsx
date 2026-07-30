import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface UserLocationProps {
  map: maplibregl.Map;
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  heading?: number | null;
  bearing?: number;
}

export default function UserLocation({
  map,
  latitude,
  longitude,
  accuracy,
  heading,
  bearing = 0,
}: UserLocationProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const headingElRef = useRef<HTMLDivElement | null>(null);
  const accuracyElRef = useRef<HTMLDivElement | null>(null);
  const cumulativeAngleRef = useRef<number>(0);

  const updateAccuracyCircle = (acc: number | null | undefined, lat: number) => {
    if (!accuracyElRef.current || !map) return;
    const effectiveAcc = typeof acc === "number" && acc > 0 ? acc : 15;
    const zoom = map.getZoom();
    const metersPerPixel = (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, zoom);
    const radiusPx = Math.max(14, Math.min(260, effectiveAcc / metersPerPixel));
    const diameterPx = radiusPx * 2;
    accuracyElRef.current.style.width = `${diameterPx}px`;
    accuracyElRef.current.style.height = `${diameterPx}px`;
  };

  const updateHeadingCone = (h: number | null | undefined, b: number) => {
    if (!headingElRef.current) return;
    if (typeof h === "number" && !isNaN(h)) {
      headingElRef.current.style.display = "flex";
      const targetVisualAngle = (h - b + 360) % 360;
      
      const currentContinuous = cumulativeAngleRef.current;
      const currentModulo = ((currentContinuous % 360) + 360) % 360;
      
      // Calculate shortest angular difference (-180 to 180)
      const diff = ((targetVisualAngle - currentModulo + 540) % 360) - 180;
      
      // Filter out micro-jitter under 1.8 degrees
      if (Math.abs(diff) > 1.8) {
        const nextContinuous = currentContinuous + diff;
        cumulativeAngleRef.current = nextContinuous;
        headingElRef.current.style.transform = `rotate(${nextContinuous}deg)`;
      }
    } else {
      headingElRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    if (!markerRef.current) {
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center pointer-events-none";

      // Heading directional beam (SVG fan originating at center)
      const cone = document.createElement("div");
      cone.className = "absolute -top-10 w-20 h-20 pointer-events-none flex items-center justify-center transition-transform duration-300 ease-out";
      cone.style.transformOrigin = "50% 75%";
      cone.style.display = "none";
      cone.innerHTML = `
        <svg viewBox="0 0 100 100" class="w-full h-full text-[#22B8CF]/50 fill-current filter drop-shadow-[0_2px_8px_rgba(34,184,207,0.4)]">
          <path d="M50 75 L18 10 A 50 50 0 0 1 82 10 Z" />
        </svg>
      `;
      headingElRef.current = cone;

      // Real-time Accuracy Halo Circle
      const accuracyCircle = document.createElement("div");
      accuracyCircle.className = "absolute bg-[#22B8CF]/15 dark:bg-[#22B8CF]/20 border border-[#22B8CF]/40 rounded-full transition-all duration-300 ease-out pointer-events-none";
      accuracyElRef.current = accuracyCircle;

      // Subtle pulse glow
      const pulse = document.createElement("div");
      pulse.className = "absolute w-7 h-7 bg-[#22B8CF]/30 rounded-full animate-pulse blur-[1px]";

      // Core blue location dot
      const dot = document.createElement("div");
      dot.className = "relative w-4 h-4 bg-[#22B8CF] border-2 border-white dark:border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,184,207,1)] z-10";

      el.appendChild(accuracyCircle);
      el.appendChild(cone);
      el.appendChild(pulse);
      el.appendChild(dot);

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([longitude, latitude])
        .addTo(map);

      markerRef.current = marker;
    } else {
      markerRef.current.setLngLat([longitude, latitude]);
    }

    updateAccuracyCircle(accuracy, latitude);
    updateHeadingCone(heading, bearing);

    const handleMapZoomOrRotate = () => {
      updateAccuracyCircle(accuracy, latitude);
      updateHeadingCone(heading, map.getBearing());
    };

    map.on("zoom", handleMapZoomOrRotate);
    map.on("rotate", handleMapZoomOrRotate);

    return () => {
      map.off("zoom", handleMapZoomOrRotate);
      map.off("rotate", handleMapZoomOrRotate);
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, latitude, longitude, accuracy, heading, bearing]);

  return null;
}
