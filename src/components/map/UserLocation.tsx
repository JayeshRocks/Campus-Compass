import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface UserLocationProps {
  map: maplibregl.Map;
  latitude: number;
  longitude: number;
  // Compass heading in degrees, 0 = north, clockwise. Null/undefined if the
  // device orientation sensor isn't available yet.
  heading?: number | null;
}

export default function UserLocation({ map, latitude, longitude, heading }: UserLocationProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const coneRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<number | null | undefined>(heading);

  const updateConeRotation = () => {
    const cone = coneRef.current;
    if (!cone) return;
    if (headingRef.current === null || headingRef.current === undefined) {
      cone.style.opacity = "0";
      return;
    }
    // The marker's DOM element stays screen-up, so counter the map's own
    // bearing to keep the cone pointing at the true compass heading.
    const bearing = map.getBearing();
    const rotation = headingRef.current - bearing;
    cone.style.opacity = "1";
    cone.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
  };

  // Keep the cone pointing the right way as the compass heading updates.
  useEffect(() => {
    headingRef.current = heading;
    updateConeRotation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heading]);

  useEffect(() => {
    if (!markerRef.current) {
      // Create outer container element
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center pointer-events-none";

      // Ripple accuracy circle
      const ripple = document.createElement("div");
      ripple.className = "absolute w-16 h-16 bg-[#22B8CF]/20 rounded-full animate-ping";

      // Glow background
      const glow = document.createElement("div");
      glow.className = "absolute w-8 h-8 bg-[#22B8CF]/30 rounded-full";

      // Core blue location dot
      const dot = document.createElement("div");
      dot.className = "relative w-4 h-4 bg-[#22B8CF] border-2 border-white rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]";

      // Direction cone: shows which way the user is facing, using the
      // device's compass/gyro sensor. Hidden (opacity 0) until we have a
      // heading reading.
      const cone = document.createElement("div");
      cone.className = "absolute left-1/2 top-1/2 origin-bottom pointer-events-none transition-opacity duration-300";
      cone.style.opacity = "0";
      cone.style.willChange = "transform";
      cone.innerHTML =
        '<svg width="26" height="32" viewBox="0 0 26 32" style="filter: drop-shadow(0 0 3px rgba(34,184,207,0.7))">' +
        '<path d="M13 0 L24 28 L13 21 L2 28 Z" fill="#22B8CF" fill-opacity="0.85" />' +
        "</svg>";

      el.appendChild(cone);
      el.appendChild(ripple);
      el.appendChild(glow);
      el.appendChild(dot);

      coneRef.current = cone;

      // Initialize and add Marker
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(map);

      markerRef.current = marker;

      // Re-orient the cone whenever the map is rotated, since the marker
      // element itself stays screen-up rather than rotating with the map.
      map.on("rotate", updateConeRotation);

      updateConeRotation();
    } else {
      // Just update position smoothly
      markerRef.current.setLngLat([longitude, latitude]);
    }

    return () => {
      // Cleanup on unmount
      map.off("rotate", updateConeRotation);
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, latitude, longitude]);

  return null;
}
