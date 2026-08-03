import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

interface Photo360PopupProps {
  map: maplibregl.Map;
  name?: string;
  latitude: number;
  longitude: number;
  imageFile?: string;
  onView?: () => void;
}

export default function Photo360Popup({
  map,
  name = "",
  latitude,
  longitude,
  imageFile = "",
  onView,
}: Photo360PopupProps) {
  const popupRef = useRef<maplibregl.Popup | null>(null);

  useEffect(() => {
    const container = document.createElement("div");
    container.className = "flex flex-col items-center text-center gap-2 p-1";

    const image = document.createElement("img");
    image.src = `/images/360-images/${imageFile}`;
    image.alt = `${name} image`;
    image.className = "w-[220px] h-[130px] object-cover rounded-[8px] border border-white/20";
    image.loading = "lazy";

    const titleEl = document.createElement("h4");
    titleEl.className = "font-bold text-sm select-none text-white px-1 leading-tight text-center";
    titleEl.innerText = name;

    const subtitleEl = document.createElement("p");
    subtitleEl.className = "text-[11px] text-slate-200 px-1 -mt-1 text-center";
    subtitleEl.innerText = "360° photo";

    const viewButton = document.createElement("button");
    viewButton.className = "mt-1 mx-auto px-3 py-1.5 rounded-md bg-[#22B8CF] hover:bg-[#1A94A6] text-white text-xs font-semibold transition-colors";
    viewButton.type = "button";
    viewButton.innerText = "View";

    const handleViewClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onView?.();
    };

    viewButton.addEventListener("click", handleViewClick);

    container.appendChild(image);
    container.appendChild(titleEl);
    container.appendChild(subtitleEl);
    container.appendChild(viewButton);

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "260px",
      className: "campus-custom-popup",
    })
      .setLngLat([longitude, latitude])
      .setDOMContent(container)
      .addTo(map);

    popupRef.current = popup;

    return () => {
      viewButton.removeEventListener("click", handleViewClick);
      popup.remove();
    };
  }, [map, name, latitude, longitude, imageFile, onView]);

  return null;
}