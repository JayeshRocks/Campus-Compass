import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Building } from "../../data/buildings";

interface BuildingPopupProps {
  map: maplibregl.Map;
  building: Building;
  onClose: () => void;
  onViewDetails: () => void;
}

export default function BuildingPopup({ map, building, onClose, onViewDetails }: BuildingPopupProps) {
  const popupRef = useRef<maplibregl.Popup | null>(null);

  useEffect(() => {
    // Create elements dynamically
    const container = document.createElement("div");
    container.className = "flex flex-col gap-1.5 min-w-[180px] text-on-surface p-1";

    const title = document.createElement("h4");
    title.className = "font-bold text-sm select-none";
    title.innerText = building.name;

    const desc = document.createElement("p");
    desc.className = "text-xs text-on-surface-variant line-clamp-2 leading-tight select-none";
    desc.innerText = building.description;

    const btn = document.createElement("button");
    btn.className = "mt-2 py-1 px-3 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary/95 transition-all cursor-pointer text-center active:scale-95";
    btn.innerText = "View Details";

    const handleBtnClick = (e: MouseEvent) => {
      e.stopPropagation();
      onViewDetails();
    };
    btn.addEventListener("click", handleBtnClick);

    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(btn);

    const popup = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: false, // Don't close on map clicks immediately
      maxWidth: "240px",
      className: "campus-custom-popup"
    })
      .setLngLat([building.longitude, building.latitude])
      .setDOMContent(container)
      .addTo(map);

    const handleClose = () => {
      onClose();
    };
    popup.on("close", handleClose);

    popupRef.current = popup;

    return () => {
      btn.removeEventListener("click", handleBtnClick);
      popup.off("close", handleClose);
      popup.remove();
    };
  }, [map, building, onClose, onViewDetails]);

  return null;
}
