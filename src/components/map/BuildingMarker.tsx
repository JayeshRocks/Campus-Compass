import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Building } from "../../data/buildings";

interface BuildingMarkerProps {
  map: maplibregl.Map;
  building: Building;
  onClick: () => void;
  isSelected: boolean;
}

const colorStyles = {
  academic: {
    bg: "bg-cyan-500/20",
    activeBg: "bg-cyan-500/50",
    border: "border-cyan-400",
    ring: "ring-cyan-500/40",
    pulse: "bg-cyan-400",
    core: "bg-cyan-400",
  },
  hostels: {
    bg: "bg-orange-500/20",
    activeBg: "bg-orange-500/50",
    border: "border-orange-400",
    ring: "ring-orange-500/40",
    pulse: "bg-orange-400",
    core: "bg-orange-400",
  },
  food: {
    bg: "bg-yellow-500/20",
    activeBg: "bg-yellow-500/50",
    border: "border-yellow-400",
    ring: "ring-yellow-500/40",
    pulse: "bg-yellow-400",
    core: "bg-yellow-400",
  },
  sports: {
    bg: "bg-green-500/20",
    activeBg: "bg-green-500/50",
    border: "border-green-400",
    ring: "ring-green-500/40",
    pulse: "bg-green-400",
    core: "bg-green-400",
  },
  admin: {
    bg: "bg-pink-500/20",
    activeBg: "bg-pink-500/50",
    border: "border-pink-400",
    ring: "ring-pink-500/40",
    pulse: "bg-pink-400",
    core: "bg-pink-400",
  },
  parking: {
    bg: "bg-red-500/20",
    activeBg: "bg-red-500/50",
    border: "border-red-400",
    ring: "ring-red-500/40",
    pulse: "bg-red-400",
    core: "bg-red-400",
  },
  security: {
    bg: "bg-slate-500/20",
    activeBg: "bg-slate-500/50",
    border: "border-slate-400",
    ring: "ring-slate-500/40",
    pulse: "bg-slate-400",
    core: "bg-slate-400",
  },
  labs: {
    bg: "bg-teal-500/20",
    activeBg: "bg-teal-500/50",
    border: "border-teal-400",
    ring: "ring-teal-500/40",
    pulse: "bg-teal-400",
    core: "bg-teal-400",
  },
} as const;

export default function BuildingMarker({ map, building, onClick, isSelected }: BuildingMarkerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    // Hotspot wrapper element
    const el = document.createElement("div");
    el.className = "relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group";

    const style = colorStyles[building.category as keyof typeof colorStyles] || colorStyles.academic;

    // Outer glow circle
    const glowCircle = document.createElement("div");
    glowCircle.className = `w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
      isSelected
        ? `${style.activeBg} ${style.border} scale-110 ring-4 ${style.ring} shadow-lg`
        : `${style.bg} ${style.border} hover:scale-105 hover:bg-opacity-40`
    }`;

    // Dynamic ping/pulsing animation ring
    const pingRing = document.createElement("div");
    pingRing.className = `absolute inset-0 rounded-full animate-ping opacity-35 ${style.pulse}`;
    glowCircle.appendChild(pingRing);

    // Core dot center
    const coreDot = document.createElement("div");
    coreDot.className = `w-2 h-2 rounded-full ${style.core}`;
    glowCircle.appendChild(coreDot);

    // Text tooltip overlay label
    const labelDiv = document.createElement("div");
    labelDiv.className = `absolute bottom-full mb-2 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-tight shadow-md transition-all duration-200 pointer-events-none whitespace-nowrap ${
      isSelected
        ? "bg-blue-600 text-white border border-blue-400 scale-105 opacity-100 visible z-50"
        : "bg-slate-900/90 text-white border border-outline-variant/30 opacity-0 group-hover:opacity-100 group-hover:visible"
    }`;
    labelDiv.innerText = building.name;

    el.appendChild(glowCircle);
    el.appendChild(labelDiv);

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
