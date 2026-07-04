import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface UserLocationProps {
  map: maplibregl.Map;
  latitude: number;
  longitude: number;
}

export default function UserLocation({ map, latitude, longitude }: UserLocationProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    // Create outer container element
    const el = document.createElement("div");
    el.className = "relative flex items-center justify-center pointer-events-none";

    // Ripple accuracy circle
    const ripple = document.createElement("div");
    ripple.className = "absolute w-16 h-16 bg-blue-500/20 rounded-full animate-ping";

    // Glow background
    const glow = document.createElement("div");
    glow.className = "absolute w-8 h-8 bg-blue-500/30 rounded-full";

    // Core blue location dot
    const dot = document.createElement("div");
    dot.className = "relative w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]";

    el.appendChild(ripple);
    el.appendChild(glow);
    el.appendChild(dot);

    // Initialize and add Marker
    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    return () => {
      marker.remove();
    };
  }, [map, latitude, longitude]);

  return null;
}
