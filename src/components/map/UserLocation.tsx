import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface UserLocationProps {
  map: maplibregl.Map;
  latitude: number;
  longitude: number;
  heading?: number | null;
}

export default function UserLocation({ map, latitude, longitude, heading }: UserLocationProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const headingElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      // Create outer container element
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center pointer-events-none";

      // Directional heading beam/cone
      const cone = document.createElement("div");
      cone.className = "absolute -top-8 w-16 h-16 pointer-events-none transition-transform duration-200 ease-out flex items-center justify-center";
      cone.style.transformOrigin = "50% 75%";
      cone.style.display = "none";
      cone.innerHTML = `
        <svg viewBox="0 0 100 100" class="w-full h-full text-[#22B8CF]/45 fill-current filter drop-shadow">
          <path d="M50 75 L15 15 A 50 50 0 0 1 85 15 Z" />
        </svg>
      `;
      headingElRef.current = cone;

      // Ripple accuracy circle
      const ripple = document.createElement("div");
      ripple.className = "absolute w-14 h-14 bg-[#22B8CF]/25 rounded-full animate-ping";

      // Glow background
      const glow = document.createElement("div");
      glow.className = "absolute w-7 h-7 bg-[#22B8CF]/40 rounded-full blur-[2px]";

      // Core blue location dot
      const dot = document.createElement("div");
      dot.className = "relative w-4.5 h-4.5 bg-[#22B8CF] border-2 border-white dark:border-slate-900 rounded-full shadow-[0_0_12px_rgba(34,184,207,0.9)] z-10";

      el.appendChild(cone);
      el.appendChild(ripple);
      el.appendChild(glow);
      el.appendChild(dot);

      // Initialize and add Marker
      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([longitude, latitude])
        .addTo(map);

      markerRef.current = marker;
    } else {
      // Update position smoothly
      markerRef.current.setLngLat([longitude, latitude]);
    }

    if (headingElRef.current) {
      if (typeof heading === "number" && !isNaN(heading)) {
        headingElRef.current.style.display = "flex";
        headingElRef.current.style.transform = `rotate(${heading}deg)`;
      } else {
        headingElRef.current.style.display = "none";
      }
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, latitude, longitude, heading]);

  return null;
}
