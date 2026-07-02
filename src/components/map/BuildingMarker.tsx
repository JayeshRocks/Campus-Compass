import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Building } from "../../data/buildings";

interface BuildingMarkerProps {
  map: maplibregl.Map;
  building: Building;
  onClick: () => void;
  isSelected: boolean;
}

// Map categories to schematic color codes
const colorStyles = {
  academic: {
    bg: "bg-cyan-500/20 border-cyan-500/80 text-cyan-400 hover:bg-cyan-500/35",
    active: "bg-cyan-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(6,182,212,0.8)]"
  },
  hostels: {
    bg: "bg-orange-500/20 border-orange-500/80 text-orange-400 hover:bg-orange-500/35",
    active: "bg-orange-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(249,115,22,0.8)]"
  },
  food: {
    bg: "bg-yellow-500/20 border-yellow-500/80 text-yellow-400 hover:bg-yellow-500/35",
    active: "bg-yellow-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(234,179,8,0.8)]"
  },
  sports: {
    bg: "bg-green-500/20 border-green-500/80 text-green-400 hover:bg-green-500/35",
    active: "bg-green-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(34,197,94,0.8)]"
  },
  admin: {
    bg: "bg-pink-500/20 border-pink-500/80 text-pink-400 hover:bg-pink-500/35",
    active: "bg-pink-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(236,72,153,0.8)]"
  },
  parking: {
    bg: "bg-red-500/20 border-red-500/80 text-red-400 hover:bg-red-500/35",
    active: "bg-red-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(239,68,68,0.8)]"
  },
  security: {
    bg: "bg-slate-500/20 border-slate-500/80 text-slate-400 hover:bg-slate-500/35",
    active: "bg-slate-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(100,116,139,0.8)]"
  },
  labs: {
    bg: "bg-teal-500/20 border-teal-500/80 text-teal-400 hover:bg-teal-500/35",
    active: "bg-teal-500 text-white border-white scale-110 shadow-[0_0_18px_rgba(20,184,166,0.8)]"
  }
} as const;

export default function BuildingMarker({ map, building, onClick, isSelected }: BuildingMarkerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    // Create HTML element for the marker
    const el = document.createElement("div");
    
    // Fallback styles if category styling is missing
    const style = colorStyles[building.category as keyof typeof colorStyles] || colorStyles.academic;
    
    el.className = `w-9 h-9 rounded-xl flex items-center justify-center border-2 cursor-pointer transition-all duration-200 ${
      isSelected ? style.active : style.bg
    }`;

    // Material design icons span
    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-[18px] select-none";
    iconSpan.style.fontVariationSettings = "'FILL' 1";
    
    // Choose icon dynamically based on category
    let icon = "business"; // default
    if (building.category === "food") icon = "restaurant";
    else if (building.category === "hostels") icon = "apartment";
    else if (building.category === "labs") icon = "science";
    else if (building.category === "sports") icon = "sports_soccer";
    else if (building.category === "parking") icon = "local_parking";
    else if (building.category === "admin") icon = "admin_panel_settings";
    else if (building.category === "security") icon = "shield";
    
    iconSpan.innerText = icon;
    el.appendChild(iconSpan);

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
