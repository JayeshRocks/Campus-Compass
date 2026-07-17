import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Building } from "../../data/buildings";

interface BuildingPopupProps {
  map: maplibregl.Map;
  building: Building;
}

export default function BuildingPopup({ map, building }: BuildingPopupProps) {
  const popupRef = useRef<maplibregl.Popup | null>(null);

  useEffect(() => {
    // Create elements dynamically
    const container = document.createElement("div");
    container.className = "flex justify-center items-center px-2 py-0.5";

    const title = document.createElement("h4");
    title.className = "font-bold text-sm select-none text-white whitespace-nowrap";
    title.innerText = building.name;

    container.appendChild(title);

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false, // Don't close on map clicks immediately
      maxWidth: "240px",
      className: "campus-custom-popup"
    })
      .setLngLat([building.longitude, building.latitude])
      .setDOMContent(container)
      .addTo(map);

    popupRef.current = popup;

    return () => {
      popup.remove();
    };
  }, [map, building]);

  return null;
}
