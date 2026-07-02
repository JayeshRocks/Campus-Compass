import { useState, useEffect } from "react";
import type { Building, CategoryType } from "../../data/mockData";

interface MapViewProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onSelectBuilding: (b: Building | null) => void;
  activeCategory: CategoryType;
  onCategoryChange: (c: CategoryType) => void;
  isSidebarOpen: boolean;
}

const categoryChips = [
  { id: "academic", label: "Academic", icon: "school" },
  { id: "food", label: "Food", icon: "restaurant" },
  { id: "hostels", label: "Hostels", icon: "bed" },
  { id: "labs", label: "Labs", icon: "science" },
] as const;

function MapView({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  activeCategory,
  onCategoryChange,
  isSidebarOpen,
}: MapViewProps) {
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isLocating, setIsLocating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle Locate Me animation
  const handleLocateMe = () => {
    setIsLocating(true);
    // Reset view center
    setPanOffset({ x: 0, y: 0 });
    setZoom(1.1);
    setTimeout(() => {
      setIsLocating(false);
    }, 1500);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetCompass = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Drag to pan behavior
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan on left click on the background canvas
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  }, []);

  // Compute adaptive layout bounds
  const chipsLeft = isSidebarOpen ? "md:left-[320px]" : "md:left-[24px]";
  const chipsRight = selectedBuilding ? "md:right-[400px]" : "md:right-[24px]";

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Map Canvas (Base Layer with panning & zoom scale) */}
      <div
        className="absolute inset-0 map-bg z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
        data-location="MIT Bengaluru"
      >
        {/* Mock Map Features (buildings) */}
        {buildings.map((building) => {
          const isSelected = selectedBuilding?.id === building.id;
          return (
            <div
              key={building.id}
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering background click
                onSelectBuilding(building);
              }}
              style={{ top: building.top, left: building.left }}
              className={`absolute w-64 h-40 bg-surface-container-low/30 hover:bg-surface-container-high/40 cursor-pointer ghost-border rounded-xl flex flex-col items-center justify-center transform ${
                building.rotation
              } transition-all duration-200 p-4 text-center ${
                isSelected
                  ? "ring-2 ring-primary border-primary bg-surface-container-high/60 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : ""
              }`}
            >
              <span className="text-on-surface font-label-md text-label-md font-bold mb-2 block">
                {building.name}
              </span>
              <p className="text-xs text-on-surface-variant line-clamp-2 mb-2 leading-tight">
                {building.description}
              </p>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${building.busyColor}`}></span>
                <span className="text-[10px] font-label-sm text-on-surface-variant">
                  {building.busyStatus}
                </span>
              </div>
            </div>
          );
        })}

        {/* User Location Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`absolute w-24 h-24 bg-primary/20 rounded-full ${
              isLocating ? "animate-ping" : "animate-pulse"
            }`}
          ></div>
          <div className="absolute w-12 h-12 bg-primary/30 rounded-full"></div>
          <div className="relative w-4 h-4 bg-primary border-2 border-surface rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
        </div>
      </div>

      {/* Filter Chips (Adaptive positioning below Header) */}
      <div
        className={`fixed top-[80px] left-4 right-4 ${chipsLeft} ${chipsRight} z-[80] flex gap-2 overflow-x-auto no-scrollbar py-2 px-4 pointer-events-auto transition-all duration-300`}
      >
        {categoryChips.map((chip) => {
          const isActive = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onCategoryChange(isActive ? "all" : chip.id)}
              className={`px-4 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-sm ghost-border cursor-pointer transition-colors ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "glass-panel text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{chip.icon}</span>
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Slide-in Building Info Card */}
      <aside
        className={`fixed right-4 md:right-[24px] top-[140px] md:top-[88px] w-[calc(100vw-32px)] md:w-[360px] bg-surface-container-lowest/90 backdrop-blur-xl ghost-border rounded-2xl shadow-2xl z-[85] overflow-hidden flex flex-col transition-all duration-300 transform ${
          selectedBuilding ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        {selectedBuilding && (
          <>
            {/* Header Image */}
            <div className="h-48 w-full relative">
              <img
                alt={selectedBuilding.name}
                className="w-full h-full object-cover"
                src={selectedBuilding.image}
              />
              <button
                onClick={() => onSelectBuilding(null)}
                className="absolute top-4 right-4 w-8 h-8 glass-panel rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors border border-outline-variant/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-2 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded text-on-surface font-label-sm text-label-sm ghost-border flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${selectedBuilding.busyColor}`}></span>
                  {selectedBuilding.busyStatus}
                </span>
              </div>
            </div>
            <div className="p-panel_padding flex-1 flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                {selectedBuilding.name}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">
                {selectedBuilding.description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.hours}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.distance}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">stairs</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.floors}
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-outline-variant/20 flex gap-3">
                <button className="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">directions</span>
                  Directions
                </button>
                <button className="w-12 py-2.5 glass-panel text-on-surface font-label-md text-label-md rounded-lg ghost-border hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Floating Map Controls */}
      <div className="fixed bottom-[24px] right-[24px] z-[80] flex flex-col gap-3">
        {/* Compass */}
        <button
          onClick={resetCompass}
          className="w-12 h-12 glass-panel rounded-full shadow-lg ghost-border flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
          title="Reset Map View"
        >
          <span className="material-symbols-outlined transform -rotate-45 text-primary">explore</span>
        </button>
        {/* Zoom Controls */}
        <div className="glass-panel rounded-full shadow-lg ghost-border flex flex-col overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors border-b border-outline-variant/30 cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          className="w-12 h-12 glass-panel rounded-full shadow-lg ghost-border flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shadow-[0_0_20px_rgba(37,99,235,0.2)] cursor-pointer active:scale-95"
          title="Locate Me"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            my_location
          </span>
        </button>
      </div>
    </div>
  );
}

export default MapView;
