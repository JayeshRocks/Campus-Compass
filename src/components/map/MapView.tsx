import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Building, CategoryType } from "../../data/buildings";
import MapControls from "./MapControls";
import UserLocation from "./UserLocation";
import FeedbackButton from "./FeedbackButton";
import BuildingMarker from "./BuildingMarker";
import BuildingPopup from "./BuildingPopup";
import ReportIssueForm from "./ReportIssueForm";

interface MapViewProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onSelectBuilding: (b: Building | null) => void;
  activeCategory: CategoryType;
  onCategoryChange: (c: CategoryType) => void;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isSatellite: boolean;
}

const categoryChips = [
  { id: "academic", label: "Academic", icon: "school" },
  { id: "hostels", label: "Hostels", icon: "bed" },
  { id: "food", label: "Food", icon: "restaurant" },
  { id: "sports", label: "Sports", icon: "sports_soccer" },
  { id: "labs", label: "Labs", icon: "science" },
  { id: "admin", label: "Admin", icon: "admin_panel_settings" },
  { id: "parking", label: "Parking", icon: "local_parking" },
  { id: "security", label: "Security", icon: "security" },
] as const;

export default function MapView({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  activeCategory,
  onCategoryChange,
  isSidebarOpen,
  isDarkMode,
  isSatellite,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  
  // Clean up location watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const selectedBuildingRef = useRef(selectedBuilding);
  useEffect(() => { selectedBuildingRef.current = selectedBuilding; }, [selectedBuilding]);

  const onSelectRef = useRef(onSelectBuilding);
  useEffect(() => { onSelectRef.current = onSelectBuilding; }, [onSelectBuilding]);

  const buildingsRef = useRef(buildings);
  useEffect(() => { buildingsRef.current = buildings; }, [buildings]);

  // Initialize MapLibre Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = isSatellite ? {
      version: 8,
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
          tileSize: 256,
          maxzoom: 19
        }
      },
      layers: [
        { id: "satellite-layer", type: "raster", source: "esri-satellite", minzoom: 0, maxzoom: 22 }
      ]
    } : (isDarkMode 
      ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json");

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: initialStyle as any,
      center: [77.5898, 13.1264], // MAHE Bengaluru Center
      zoom: 15.5,
      dragRotate: false,
    });

    mapInstance.dragRotate.disable();
    mapInstance.touchZoomRotate.disableRotation();

    const addBuildingLayers = () => {
      if (!mapInstance.getSource("campus-buildings")) {
        const geojsonFeatures = buildingsRef.current.map(b => ({
          type: "Feature",
          properties: { id: b.id, name: b.name, category: b.category },
          geometry: b.geometry
        }));

        mapInstance.addSource("campus-buildings", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            features: geojsonFeatures as any
          }
        });

        mapInstance.addLayer({
          id: "campus-buildings-fill",
          type: "fill",
          source: "campus-buildings",
          paint: {
            "fill-color": [
              "match",
              ["get", "category"],
              "academic", "#06b6d4", // cyan
              "hostels", "#f97316", // orange
              "food", "#eab308",    // yellow
              "sports", "#22c55e",  // green
              "admin", "#ec4899",   // pink
              "parking", "#ef4444", // red
              "#94a3b8"
            ],
            "fill-opacity": 0.25
          }
        });

        mapInstance.addLayer({
          id: "campus-buildings-line",
          type: "line",
          source: "campus-buildings",
          paint: {
            "line-color": [
              "match",
              ["get", "category"],
              "academic", "#0891b2",
              "hostels", "#ea580c",
              "food", "#ca8a04",
              "sports", "#16a34a",
              "admin", "#db2777",
              "parking", "#dc2626",
              "#64748b"
            ],
            "line-width": 1.5
          }
        });

        mapInstance.addLayer({
          id: "campus-buildings-highlight",
          type: "line",
          source: "campus-buildings",
          filter: ["==", "id", selectedBuildingRef.current?.id || ""],
          paint: {
            "line-color": "#3b82f6", // Bright solid blue highlight
            "line-width": 4,
            "line-opacity": 0.9
          }
        });

        // Click handler for polygons
        mapInstance.on("click", "campus-buildings-fill", (e) => {
          if (e.features && e.features[0]) {
            const id = e.features[0].properties.id;
            const b = buildingsRef.current.find(x => x.id === id);
            if (b) onSelectRef.current(b);
          }
        });

        // Pointer cursor
        mapInstance.on("mouseenter", "campus-buildings-fill", () => {
          mapInstance.getCanvas().style.cursor = "pointer";
        });
        mapInstance.on("mouseleave", "campus-buildings-fill", () => {
          mapInstance.getCanvas().style.cursor = "";
        });
      }
    };

    mapInstance.on("load", () => {
      addBuildingLayers();
      setMap(mapInstance);
      mapInstance.resize();
    });

    mapInstance.on("styledata", () => {
      if (mapInstance.isStyleLoaded()) {
        addBuildingLayers();
      }
    });

    return () => {
      mapInstance.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle live theme background color swaps by changing style completely
  useEffect(() => {
    if (!map) return;
    const targetStyle = isSatellite
      ? {
          version: 8,
          sources: {
            "esri-satellite": {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              ],
              tileSize: 256,
              maxzoom: 19
            }
          },
          layers: [
            {
              id: "satellite-layer",
              type: "raster",
              source: "esri-satellite",
              minzoom: 0,
              maxzoom: 22
            }
          ]
        }
      : isDarkMode
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.setStyle(targetStyle as any);
  }, [isDarkMode, isSatellite, map]);

  // Update Highlight filter when selection changes
  useEffect(() => {
    if (!map) return;
    if (map.getStyle() && map.getLayer("campus-buildings-highlight")) {
      map.setFilter("campus-buildings-highlight", ["==", "id", selectedBuilding?.id || ""]);
    }
  }, [selectedBuilding, map]);

  // Update GeoJSON when filtered buildings change
  useEffect(() => {
    if (!map) return;
    const source = map.getSource("campus-buildings") as maplibregl.GeoJSONSource;
    if (source) {
      const geojsonFeatures = buildings.map(b => ({
        type: "Feature",
        properties: { id: b.id, name: b.name, category: b.category },
        geometry: b.geometry
      }));
      source.setData({
        type: "FeatureCollection",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        features: geojsonFeatures as any
      });
    }
  }, [buildings, map]);

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
      center: [77.5898, 13.1264],
      zoom: 15.5,
      bearing: 0,
      pitch: 0,
      duration: 1000,
    });
  };

  // Auto-request location on component mount
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToastMessage("Geolocation is not supported by your browser.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setToastMessage("Acquiring GPS signal...");
    let firstLock = true;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLoc({ lat, lng });
        
        // Only jump the camera on the very first location lock
        if (firstLock && map) {
          setToastMessage(null); // Clear loading toast
          map.flyTo({
            center: [lng, lat],
            zoom: 17,
            duration: 1500,
          });
          firstLock = false;
        }
      },
      () => {
        setToastMessage("Unable to retrieve your location.");
        setTimeout(() => setToastMessage(null), 3000);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 // Force device to bypass cache and query hardware
      }
    );
  }, [map]); // Dependency on map so it can flyTo when ready

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
          {userLoc && (
            <UserLocation map={map} latitude={userLoc.lat} longitude={userLoc.lng} />
          )}

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
        className={`hidden md:flex fixed top-[80px] left-4 right-4 ${chipsLeft} ${chipsRight} z-[80] gap-2 overflow-x-auto no-scrollbar py-2 px-4 pointer-events-auto transition-all duration-300 ${
          isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
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
      />
      
      {/* Feedback Button Component */}
      <FeedbackButton onClick={() => setShowReportIssue(true)} />

      {/* Slide-in Building Info Card */}
      <aside
        className={`liquid-glass fixed right-4 md:right-[24px] top-[140px] md:top-[88px] w-[calc(100vw-32px)] md:w-[360px] rounded-2xl z-[85] overflow-hidden flex flex-col transition-all duration-300 transform ${
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


      {/* Report Issue Floating Modal */}
      {showReportIssue && (
        <ReportIssueForm onClose={() => setShowReportIssue(false)} />
      )}
    </div>
  );
}
