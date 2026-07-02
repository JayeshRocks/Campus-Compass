import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Building, CategoryType } from "../../data/buildings";
import MapControls from "./MapControls";
import UserLocation from "./UserLocation";
import BuildingMarker from "./BuildingMarker";
import BuildingPopup from "./BuildingPopup";

interface MapViewProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onSelectBuilding: (b: Building | null) => void;
  activeCategory: CategoryType;
  onCategoryChange: (c: CategoryType) => void;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
}

const categoryChips = [
  { id: "academic", label: "Academic", icon: "school" },
  { id: "food", label: "Food", icon: "restaurant" },
  { id: "hostels", label: "Hostels", icon: "bed" },
  { id: "labs", label: "Labs", icon: "science" },
] as const;

export default function MapView({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  activeCategory,
  onCategoryChange,
  isSidebarOpen,
  isDarkMode,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize MapLibre Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: isDarkMode
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [77.59218, 13.12341], // Center around MAHE Bengaluru
      zoom: 16.5,
      dragRotate: false,
      maxBounds: [
        [77.5850, 13.1160], // Southwest coordinates [lng, lat]
        [77.6000, 13.1300]  // Northeast coordinates [lng, lat]
      ],
    });

    mapInstance.dragRotate.disable();
    mapInstance.touchZoomRotate.disableRotation();

    mapInstance.on("load", () => {
      setMap(mapInstance);
      // Force trigger initial resize to fit the viewport properly
      mapInstance.resize();
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Handle live theme style swap
  useEffect(() => {
    if (!map) return;
    map.setStyle(
      isDarkMode
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    );
  }, [isDarkMode, map]);

  // Handle panel and sidebar resize events
  useEffect(() => {
    if (!map) return;
    const timer = setTimeout(() => {
      map.resize();
    }, 350);
    return () => clearTimeout(timer);
  }, [isSidebarOpen, selectedBuilding, map]);

  const handleZoomIn = () => map?.zoomIn();
  const handleZoomOut = () => map?.zoomOut();
  const handleResetCompass = () => {
    map?.flyTo({
      center: [77.59218, 13.12341],
      zoom: 16.5,
      bearing: 0,
      pitch: 0,
      duration: 1000,
    });
  };

  const handleLocateMe = () => {
    setToastMessage("Locate Me: Coming in Version 2!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShowToast = (featureName: string, version: string = "2") => {
    setToastMessage(`${featureName} coming in Version ${version}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Compute adaptive layout bounds for category chips
  const chipsLeft = isSidebarOpen ? "md:left-[300px]" : "md:left-[24px]";
  const chipsRight = selectedBuilding ? "md:right-[400px]" : "md:right-[24px]";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* Live Map Canvas container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Render subcomponents when map instance is ready */}
      {map && (
        <>
          {/* Geolocation blue dot coordinates */}
          <UserLocation map={map} latitude={13.1230} longitude={77.5910} />

          {/* Dynamically looped building markers */}
          {buildings.map((building) => (
            <BuildingMarker
              key={building.id}
              map={map}
              building={building}
              onClick={() => onSelectBuilding(building)}
              isSelected={selectedBuilding?.id === building.id}
            />
          ))}

          {/* Building detail Popups on Map */}
          {selectedBuilding && (
            <BuildingPopup
              map={map}
              building={selectedBuilding}
              onClose={() => onSelectBuilding(null)}
              onViewDetails={() => {
                // Clicking "View Details" focus or handles slide card visibility
              }}
            />
          )}
        </>
      )}

      {/* Category Chips Layer */}
      <div
        className={`fixed top-[80px] left-4 right-4 ${chipsLeft} ${chipsRight} z-[80] flex gap-2 overflow-x-auto no-scrollbar py-2 px-4 pointer-events-auto transition-all duration-300`}
      >
        {categoryChips.map((chip) => {
          const isActive = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onCategoryChange(isActive ? "all" : chip.id)}
              className={`px-4 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-sm border cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-600 border-blue-700 text-white"
                  : "glass-panel text-slate-700 hover:bg-slate-50 border-slate-200 dark:border-outline-variant/30 dark:text-on-surface dark:hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{chip.icon}</span>
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetCompass={handleResetCompass}
        onLocateMe={handleLocateMe}
      />

      {/* Slide-in Building Info Card */}
      <aside
        className={`fixed right-4 md:right-[24px] top-[140px] md:top-[88px] w-[calc(100vw-32px)] md:w-[360px] bg-white/95 dark:bg-surface-container-lowest/90 backdrop-blur-xl border border-slate-200 dark:border-outline-variant/30 rounded-2xl shadow-2xl z-[85] overflow-hidden flex flex-col transition-all duration-300 transform ${
          selectedBuilding ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        {selectedBuilding && (
          <>
            <div className="h-48 w-full relative">
              <img
                alt={selectedBuilding.name}
                className="w-full h-full object-cover"
                src={selectedBuilding.image}
              />
              <button
                onClick={() => onSelectBuilding(null)}
                className="absolute top-4 right-4 w-8 h-8 glass-panel rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 dark:text-on-surface dark:hover:bg-surface-container-high transition-colors border border-slate-200 dark:border-outline-variant/30 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-2 py-1 bg-white/80 dark:bg-surface-container-lowest/80 backdrop-blur-md rounded text-slate-900 dark:text-on-surface font-label-sm text-label-sm border border-slate-200 dark:border-outline-variant/30 flex items-center gap-1 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${selectedBuilding.busyColor}`}></span>
                  {selectedBuilding.busyStatus}
                </span>
              </div>
            </div>
            <div className="p-panel_padding flex-1 flex flex-col">
              <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-on-surface mb-1">
                {selectedBuilding.name}
              </h3>
              <p className="font-body-md text-body-md text-slate-600 dark:text-on-surface-variant text-sm mb-4">
                {selectedBuilding.description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.hours}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.distance}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">stairs</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.floors}
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-outline-variant/20 flex gap-2">
                <button
                  onClick={() => handleShowToast("Directions", "2")}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">directions</span>
                  Directions
                </button>
                <button
                  onClick={() => handleShowToast("Bookmarks", "2")}
                  className="w-12 py-2.5 glass-panel text-slate-700 hover:bg-slate-100 border border-slate-200 dark:text-on-surface dark:hover:bg-surface-container-high dark:border-outline-variant/30 rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                  title="Bookmark"
                >
                  <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                </button>
                <button
                  onClick={() => handleShowToast("Sharing", "2")}
                  className="w-12 py-2.5 glass-panel text-slate-700 hover:bg-slate-100 border border-slate-200 dark:text-on-surface dark:hover:bg-surface-container-high dark:border-outline-variant/30 rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                  title="Share"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-[88px] left-1/2 transform -translate-x-1/2 bg-surface-bright/95 text-on-surface px-4 py-2 rounded-xl border border-outline-variant/30 shadow-2xl z-[120] text-sm font-body-md animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
