import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Building } from "../../data/buildings";

interface BuildingMarkerProps {
  map: maplibregl.Map;
  building: Building;
  onClick: () => void;
  isSelected: boolean;
}

export default function BuildingMarker({ map, building, onClick, isSelected }: BuildingMarkerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    // Create HTML element for the marker
    const el = document.createElement("div");
    el.className = `w-10 h-10 rounded-lg flex items-center justify-center border-2 cursor-pointer transition-all duration-200 ${
      isSelected
        ? "bg-primary text-on-primary border-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
        : "bg-primary-container text-on-primary-container border-outline-variant/50 hover:scale-105"
    }`;

    // Material design explorer icon span
    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-[20px] select-none";
    iconSpan.style.fontVariationSettings = "'FILL' 1";
    
    // Choose icon based on building category
    let icon = "business"; // default
    if (building.category === "food") icon = "restaurant";
    else if (building.category === "hostels") icon = "apartment";
    else if (building.category === "labs") icon = "science";
    else if (building.category === "sports") icon = "sports_soccer";
    
    iconSpan.innerText = icon;
    el.appendChild(iconSpan);

    // Click trigger
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      onClick();
    };

    el.addEventListener("click", handleClick);

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([building.longitude, building.latitude])
      .addTo(map);

    markerRef.current = marker;

    return () => {
      el.removeEventListener("click", handleClick);
      marker.remove();
    };
  }, [map, building, onClick, isSelected]);

  return null;
}
