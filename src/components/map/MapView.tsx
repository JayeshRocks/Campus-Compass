import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Building } from "../../data/buildings";
import MapControls from "./MapControls";
import UserLocation from "./UserLocation";
import FeedbackButton from "./FeedbackButton";
import BuildingPopup from "./BuildingPopup";
import ReportIssueForm from "./ReportIssueForm";
import WeatherWidget from "./WeatherWidget";

// Cache state variables outside the component to survive React unmounts (tab switches)
let cachedMapState: { center: [number, number]; zoom: number; pitch: number; bearing: number } | null = null;
let lastFlewToBuildingId: string | null = null;

interface MapViewProps {
  buildings: Building[];
  activeBuildingIds?: Set<string>;
  selectedBuilding: Building | null;
  onSelectBuilding: (b: Building | null) => void;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isSatellite: boolean;
  showTabsInHeader: boolean;
}

const isWithinBangalore = (lat: number, lng: number) => {
  return lng >= 77.40 && lng <= 77.75 && lat >= 12.80 && lat <= 13.25;
};

export default function MapView({
  buildings,
  activeBuildingIds,
  selectedBuilding,
  onSelectBuilding,
  isSidebarOpen,
  isDarkMode,
  isSatellite,
  showTabsInHeader,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [is3D, setIs3D] = useState(() => {
    const saved = localStorage.getItem("campusCompass_is3D");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [bearing, setBearing] = useState(cachedMapState ? cachedMapState.bearing : (is3D ? -17 : 0));

  useEffect(() => {
    localStorage.setItem("campusCompass_is3D", JSON.stringify(is3D));
  }, [is3D]);

  const prevIs3DRef = useRef(is3D);
  const prevDarkRef = useRef(isDarkMode);
  const prevSatRef = useRef(isSatellite);

  useEffect(() => {
    if (!map) return;
    if (isSatellite) {
      prevIs3DRef.current = is3D;
      if (is3D) {
        setIs3D(false);
        map.easeTo({ pitch: 0, bearing: 0, duration: 800 });
      }
    } else {
      if (prevIs3DRef.current && !is3D) {
        setIs3D(true);
        map.easeTo({ pitch: 55, bearing: -17, duration: 800 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSatellite, map]);
  const fetchRoadsRef = useRef<(() => Promise<void>) | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distanceM: number; durationS: number } | null>(null);
  const navigatingBuildingRef = useRef<typeof selectedBuilding>(null);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(true);
  
  const watchIdRef = useRef<number | null>(null);
  const weatherTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Clean up location watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (weatherTimerRef.current) {
        clearTimeout(weatherTimerRef.current);
      }
    };
  }, []);

  // Weather Widget Visibility Logic
  useEffect(() => {
    if (!map) return;

    const resetWeatherTimer = () => {
      setIsWeatherVisible(true);
      if (weatherTimerRef.current) clearTimeout(weatherTimerRef.current);
      weatherTimerRef.current = setTimeout(() => {
        setIsWeatherVisible(false);
      }, 3500);
    };

    resetWeatherTimer();

    map.on('movestart', resetWeatherTimer);
    map.on('zoomstart', resetWeatherTimer);
    map.on('dragstart', resetWeatherTimer);
    map.on('mousemove', resetWeatherTimer);
    map.on('touchstart', resetWeatherTimer);

    return () => {
      map.off('movestart', resetWeatherTimer);
      map.off('zoomstart', resetWeatherTimer);
      map.off('dragstart', resetWeatherTimer);
      map.off('mousemove', resetWeatherTimer);
      map.off('touchstart', resetWeatherTimer);
    };
  }, [map]);

  const selectedBuildingRef = useRef(selectedBuilding);
  useEffect(() => { selectedBuildingRef.current = selectedBuilding; }, [selectedBuilding]);

  // Fly to the selected building whenever it changes — covers selection via
  // search results as well as clicking a marker/polygon directly.
  useEffect(() => {
    if (!selectedBuilding) {
      lastFlewToBuildingId = null;
      return;
    }
    if (!map) return;
    if (lastFlewToBuildingId === selectedBuilding.id) return; // Skip flyTo if we just restored from a tab switch

    lastFlewToBuildingId = selectedBuilding.id;
    map.flyTo({
      center: [selectedBuilding.longitude, selectedBuilding.latitude],
      zoom: 18,
      pitch: is3D ? 55 : 0,
      bearing: is3D ? -17 : 0,
      duration: 1200,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuilding, map]);

  const onSelectRef = useRef(onSelectBuilding);
  useEffect(() => { onSelectRef.current = onSelectBuilding; }, [onSelectBuilding]);

  const buildingsRef = useRef(buildings);
  useEffect(() => { buildingsRef.current = buildings; }, [buildings]);

  const activeBuildingIdsRef = useRef(activeBuildingIds);
  useEffect(() => { activeBuildingIdsRef.current = activeBuildingIds; }, [activeBuildingIds]);

  const isSatelliteRef = useRef(isSatellite);
  useEffect(() => { isSatelliteRef.current = isSatellite; }, [isSatellite]);

  // Initialize MapLibre Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = isSatellite ? {
      version: 8,
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?blankTile=false"],
          tileSize: 256,
          maxzoom: 19,
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      },
      layers: [
        { id: "satellite-layer", type: "raster", source: "esri-satellite", minzoom: 0, maxzoom: 22 }
      ]
    } : {
      // Clean blank "schematic" canvas — no street tiles/city clutter,
      // just a flat background so campus building shapes read like a diagram.
      version: 8,
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      sources: {
        "carto-basemap": {
          type: "raster",
          tiles: [
            isDarkMode 
              ? "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              : "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          ],
          tileSize: 256,
          maxzoom: 19,
          attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
        }
      },
      layers: [
        {
          id: "carto-layer",
          type: "raster",
          source: "carto-basemap",
          minzoom: 0,
          maxzoom: 22
        }
      ]
    };

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: initialStyle as any,
      center: cachedMapState ? cachedMapState.center : [77.5898, 13.1264], // MAHE Bengaluru Center
      zoom: cachedMapState ? cachedMapState.zoom : 15.5,
      minZoom: 10,
      maxBounds: [[77.40, 12.80], [77.75, 13.25]], // Greater Bangalore Bounds
      pitch: cachedMapState ? cachedMapState.pitch : (is3D ? 55 : 0),
      bearing: cachedMapState ? cachedMapState.bearing : (is3D ? -17 : 0),
      dragRotate: true,
      attributionControl: false, // Disable default to add a custom one below
    });

    // Add full-text custom attribution control (styled as a thin footer in CSS)
    mapInstance.addControl(new maplibregl.AttributionControl({
      compact: false,
    }), 'bottom-right');

    mapInstance.on('rotate', () => {
      setBearing(mapInstance.getBearing());
    });

    mapInstance.on('moveend', () => {
      cachedMapState = {
        center: [mapInstance.getCenter().lng, mapInstance.getCenter().lat],
        zoom: mapInstance.getZoom(),
        pitch: mapInstance.getPitch(),
        bearing: mapInstance.getBearing()
      };
    });

    // Fetch real road/path geometry from OpenStreetMap (Overpass API) for the
    // campus bounding box and render it as a road layer under the buildings.
    const fetchRoads = async () => {
      console.log("[roads] fetchRoads() called");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tryAddLayer = (features: any) => {
        if (!mapInstance.isStyleLoaded()) {
          setTimeout(() => tryAddLayer(features), 200);
          return;
        }
        try {
          if (!mapInstance.getSource("campus-roads")) {
            mapInstance.addSource("campus-roads", {
              type: "geojson",
              data: { type: "FeatureCollection", features },
            });
          } else {
            (mapInstance.getSource("campus-roads") as maplibregl.GeoJSONSource).setData({
              type: "FeatureCollection",
              features: features as any,
            });
          }

          if (!mapInstance.getLayer("campus-roads-line")) {
            mapInstance.addLayer(
              {
                id: "campus-roads-line",
                type: "line",
                source: "campus-roads",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                  visibility: "visible",
                },
                paint: {
                  "line-color": isDarkMode ? "#64748b" : "#94a3b8",
                  "line-width": 3,
                  "line-opacity": 0.9,
                },
              },
              mapInstance.getLayer("campus-buildings-fill") ? "campus-buildings-fill" : undefined
            );
            console.log("[roads] added/re-added road layer");
          }
        } catch (err) {
          console.error("[roads] error adding layer:", err);
        }
      };

      try {
        const cached = localStorage.getItem("campus-roads-cache");
        if (cached) {
          const features = JSON.parse(cached);
          console.log("[roads] loaded from cache instantly");
          tryAddLayer(features);
          return;
        }
      } catch (err) {
        console.warn("[roads] cache read failed", err);
      }

      try {
        console.log("[roads] fetching local static roads");
        const res = await fetch("/roads.geojson");
        if (!res.ok) {
          throw new Error(`Local fetch failed: ${res.status}`);
        }
        const data = await res.json();
        const features = data.features || [];
        console.log("[roads] features loaded:", features.length);
        
        localStorage.setItem("campus-roads-cache", JSON.stringify(features));
        tryAddLayer(features);
      } catch (err) {
        console.error("[roads] processing failed:", err);
      }
    };

    fetchRoadsRef.current = fetchRoads;

    const addBuildingLayers = () => {
      if (!mapInstance.getSource("campus-buildings")) {
        const isFiltering = activeBuildingIdsRef.current && activeBuildingIdsRef.current.size < buildingsRef.current.length;
        const geojsonFeatures = buildingsRef.current.map(b => ({
          type: "Feature",
          properties: { 
            id: b.id, 
            name: b.name, 
            shortName: b.shortName, 
            category: b.category,
            isActive: isFiltering ? activeBuildingIdsRef.current?.has(b.id) : true
          },
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
          type: "fill-extrusion",
          source: "campus-buildings",
          paint: {
            "fill-extrusion-color": [
              "case",
              ["==", ["get", "isActive"], false],
              isDarkMode ? "#334155" : "#e2e8f0",
              [
                "match",
                ["get", "id"],
                "cricket_field", "#22c55e",
                "football_field", "#15803d",
                "volleyball_courts", "#4ade80",
                "basketball_court_1", "#16a34a",
                "basketball_half_court", "#16a34a",
                "cricket_nets", "#86efac",
                "mlcp_15", "#ef4444",
                "gate_1", "#2dd4bf",
                "gate_2", "#2dd4bf",
                "gate_3", "#2dd4bf",
                "blue_dove_mess", "#ef4444",
                "ta_pai", "#eab308",
                "cub_13", "#ec4899",
                "cub_14", "#ec4899",
                "laundry", "#f97316",
                [
                  "match",
                  ["get", "category"],
                  "academic", "#06b6d4",
                  "hostels", "#f97316",
                  "food", "#eab308",
                  "sports", "#22c55e",
                  "admin", "#ec4899",
                  "parking", "#ef4444",
                  "security", "#2dd4bf",
                  "#94a3b8"
                ]
              ]
            ],
            "fill-extrusion-height": [
              "match",
              ["get", "id"],
              "cricket_field", 1,
              "football_field", 1,
              "volleyball_courts", 1,
              "basketball_court_1", 1,
              "basketball_half_court", 1,
              "cricket_nets", 1,
              "mlcp_15", 10,
              "gate_1", 6,
              "gate_2", 6,
              "gate_3", 6,
              "blue_dove_mess", 9,
              "ta_pai", 16,
              "cub_13", 10,
              "cub_14", 10,
              "laundry", 6,
              [
                "match",
                ["get", "category"],
                "academic", 22,
                "hostels", 18,
                "food", 9,
                "sports", 1,
                "admin", 14,
                "parking", 8,
                "security", 6,
                8
              ]
            ],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.92
          }
        });

        mapInstance.addLayer({
          id: "campus-buildings-line",
          type: "line",
          source: "campus-buildings",
          paint: {
            "line-color": [
              "case",
              ["==", ["get", "isActive"], false],
              isDarkMode ? "#475569" : "#cbd5e1",
              "#0ea5e9"
            ],
            "line-width": 1.5,
            "line-opacity": 1
          }
        });

        mapInstance.addLayer({
          id: "campus-buildings-label",
          type: "symbol",
          source: "campus-buildings",
          layout: {
            "text-field": ["upcase", ["get", "shortName"]],
            "text-size": 10.5,
            "text-font": ["Noto Sans Bold"],
            "text-letter-spacing": 0.15,
            "text-allow-overlap": true,
            "text-ignore-placement": true,
            "text-max-width": 10
          },
          paint: {
            "text-color": [
              "case",
              ["==", ["get", "isActive"], false],
              isDarkMode ? "#64748b" : "#94a3b8",
              isDarkMode ? "#ffffff" : "#0f172a"
            ],
            "text-halo-color": isDarkMode ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.85)",
            "text-halo-width": 1.5,
            "text-halo-blur": 1,
            "text-opacity": [
              "case",
              ["==", ["get", "isActive"], false],
              0.6,
              1
            ]
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

        if (!mapInstance.getSource("direction-line")) {
          mapInstance.addSource("direction-line", {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] }
          });
          mapInstance.addLayer({
            id: "direction-line-layer",
            type: "line",
            source: "direction-line",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#3b82f6",
              "line-width": 4,
              "line-dasharray": [0.2, 1.5]
            }
          });
        }

        // Click handler for polygons
        mapInstance.on("click", "campus-buildings-fill", (e) => {
          if (e.features && e.features[0]) {
            const id = e.features[0].properties.id;
            const b = buildingsRef.current.find(x => x.id === id);
            if (b) onSelectRef.current(b);
          }
        });

        // Click on empty map to clear selection
        mapInstance.on("click", (e) => {
          const features = mapInstance.queryRenderedFeatures(e.point, { layers: ["campus-buildings-fill"] });
          if (features.length === 0) {
            onSelectRef.current(null);
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

    // Hide the schematic building polygons whenever the satellite imagery
    // basemap is active, since the hand-traced shapes don't line up
    // precisely with the real photo underneath.
    const applyBuildingVisibility = () => {
      const visibility = isSatelliteRef.current ? "none" : "visible";
      ["campus-buildings-fill", "campus-buildings-line", "campus-buildings-label", "campus-buildings-highlight"].forEach((layerId) => {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.setLayoutProperty(layerId, "visibility", visibility);
        }
      });
    };

    mapInstance.on("load", () => {
      addBuildingLayers();
      applyBuildingVisibility();
      if (!mapInstance.getSource("campus-roads")) {
        fetchRoads();
      }

      // Fit view tightly to the campus buildings so the schematic fills
      // the screen instead of showing surrounding city streets.
      const allCoords: [number, number][] = [];
      buildingsRef.current.forEach((b) => {
        b.geometry.coordinates[0].forEach((coord) => {
          allCoords.push([coord[0], coord[1]]);
        });
      });
      if (allCoords.length > 0 && !cachedMapState) {
        const bounds = allCoords.reduce(
          (acc, coord) => acc.extend(coord),
          new maplibregl.LngLatBounds(allCoords[0], allCoords[0])
        );
        mapInstance.fitBounds(bounds, { padding: 100, duration: 0, pitch: is3D ? 55 : 0, bearing: is3D ? -17 : 0 });
      }

      setMap(mapInstance);
      mapInstance.resize();
    });

    mapInstance.on("style.load", () => {
      addBuildingLayers();
      applyBuildingVisibility();
      fetchRoadsRef.current?.();
    });

    return () => {
      mapInstance.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle live theme background color swaps by changing style completely
  useEffect(() => {
    if (!map) return;
    if (prevDarkRef.current === isDarkMode && prevSatRef.current === isSatellite) return;
    prevDarkRef.current = isDarkMode;
    prevSatRef.current = isSatellite;
    const targetStyle = isSatellite
      ? {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            "esri-satellite": {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?blankTile=false"
              ],
              tileSize: 256,
              maxzoom: 19,
              attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
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
      : {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            "carto-basemap": {
              type: "raster",
              tiles: [
                isDarkMode 
                  ? "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                  : "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              ],
              tileSize: 256,
              maxzoom: 19,
              attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            }
          },
          layers: [
            {
              id: "carto-layer",
              type: "raster",
              source: "carto-basemap",
              minzoom: 0,
              maxzoom: 22
            }
          ]
        };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.setStyle(targetStyle as any, { diff: false });
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
      const isFiltering = activeBuildingIds && activeBuildingIds.size < buildings.length;
      const geojsonFeatures = buildings.map(b => ({
        type: "Feature",
        properties: { 
          id: b.id, 
          name: b.name, 
          shortName: b.shortName, 
          category: b.category,
          isActive: isFiltering ? activeBuildingIds.has(b.id) : true
        },
        geometry: b.geometry
      }));
      source.setData({
        type: "FeatureCollection",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        features: geojsonFeatures as any
      });
    }
  }, [buildings, activeBuildingIds, map]);

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
      bearing: is3D ? -17 : 0,
      pitch: is3D ? 55 : 0,
      duration: 1000,
    });
  };

  const handleToggle3D = () => {
    if (!map) return;
    const next = !is3D;
    setIs3D(next);
    map.easeTo({
      pitch: next ? 55 : 0,
      bearing: next ? -17 : 0,
      duration: 800,
    });
  };



  const handleLocateUser = () => {
    if (!("geolocation" in navigator)) {
      setToastMessage("Geolocation is not supported by your browser.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    if (userLoc && map) {
      // If we already have a location, just jump to it
      map.flyTo({
        center: [userLoc.lng, userLoc.lat],
        zoom: 17,
        duration: 1500,
      });
      return;
    }

    setToastMessage("Acquiring GPS signal...");

    // Clear existing watch if present
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    let firstLock = true;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        if (!isWithinBangalore(lat, lng)) {
          setToastMessage("You must be in Bangalore to use this feature.");
          setTimeout(() => setToastMessage(null), 4000);
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
          }
          return;
        }

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
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setToastMessage("Location access denied. Please enable it in browser settings.");
        } else {
          setToastMessage("Unable to retrieve your location.");
        }
        setTimeout(() => setToastMessage(null), 4000);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 10000 // Allow a 10-second old cached location to speed up lock
      }
    );
  };

  const handleShowToast = (featureName: string, version: string = "2") => {
    setToastMessage(`${featureName} coming in Version ${version}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const drawDirectionLine = async (lat: number, lng: number, building: typeof selectedBuilding, follow: boolean = false) => {
    if (!map || !building) return;
    const source = map.getSource("direction-line") as maplibregl.GeoJSONSource | undefined;
    if (!source) return;

    let routeCoords: [number, number][] = [
      [lng, lat],
      [building.longitude, building.latitude]
    ];

    try {
      if (!follow) setToastMessage("Finding route...");
      const url = `https://router.project-osrm.org/route/v1/foot/${lng},${lat};${building.longitude},${building.latitude}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const route = data?.routes?.[0];
        const coords = route?.geometry?.coordinates;
        if (Array.isArray(coords) && coords.length > 1) {
          routeCoords = coords;
        }
        if (route) {
          setRouteInfo({ distanceM: route.distance, durationS: route.duration });
        }
      }
    } catch (err) {
      console.error("[directions] OSRM fetch failed, using straight line:", err);
    } finally {
      if (!follow) setToastMessage(null);
    }

    source.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoords
          }
        }
      ]
    });

    if (follow) {
      // Live guidance: keep the camera centered on the walker rather than
      // re-framing the whole route every update.
      map.easeTo({ center: [lng, lat], duration: 600 });
    } else {
      const bounds = routeCoords.reduce(
        (acc, coord) => acc.extend(coord as [number, number]),
        new maplibregl.LngLatBounds(routeCoords[0], routeCoords[0])
      );
      map.fitBounds(bounds, { padding: 120, pitch: is3D ? 55 : 0, bearing: is3D ? -17 : 0, duration: 800 });
    }
  };

  const startWatchingLocation = (onFirstFix?: (lat: number, lng: number) => void) => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    let firstFix = true;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        if (!isWithinBangalore(lat, lng)) {
          setToastMessage("Navigation unavailable outside Bangalore.");
          setTimeout(() => setToastMessage(null), 4000);
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
          }
          setIsNavigating(false);
          return;
        }

        setUserLoc({ lat, lng });
        if (firstFix) {
          firstFix = false;
          onFirstFix?.(lat, lng);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setToastMessage("Location access denied. Please enable it in browser settings.");
        } else {
          setToastMessage("Unable to retrieve your location.");
        }
        setTimeout(() => setToastMessage(null), 4000);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
  };

  const handleShowDirections = () => {
    if (!selectedBuilding) return;
    navigatingBuildingRef.current = selectedBuilding;
    setIsNavigating(true);

    if (userLoc) {
      drawDirectionLine(userLoc.lat, userLoc.lng, selectedBuilding);
      startWatchingLocation();
      return;
    }

    setToastMessage("Getting your location...");
    startWatchingLocation((lat, lng) => {
      setToastMessage(null);
      drawDirectionLine(lat, lng, selectedBuilding);
    });
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setRouteInfo(null);
    navigatingBuildingRef.current = null;
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    const source = map?.getSource("direction-line") as maplibregl.GeoJSONSource | undefined;
    source?.setData({ type: "FeatureCollection", features: [] });
  };

  // While navigating, re-fetch the route every time the live GPS position
  // updates, so the guidance line and ETA stay accurate as the person walks.
  useEffect(() => {
    if (!isNavigating || !userLoc || !navigatingBuildingRef.current) return;
    drawDirectionLine(userLoc.lat, userLoc.lng, navigatingBuildingRef.current, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoc, isNavigating]);


  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* Live Map Canvas container */}
      <div ref={mapContainerRef} className="absolute top-0 left-0 w-full h-[calc(100%-28px)] z-0 !overflow-visible" />

      {/* Render subcomponents when map instance is ready */}
      {map && (
        <>
          {/* Geolocation blue dot coordinates */}
          {userLoc && (
            <UserLocation map={map} latitude={userLoc.lat} longitude={userLoc.lng} />
          )}

          {/* Building detail Popups on Map */}
          {selectedBuilding && (
            <BuildingPopup
              map={map}
              building={selectedBuilding}
            />
          )}
        </>
      )}


      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetCompass={handleResetCompass}
        onLocateUser={handleLocateUser}
        onToggle3D={handleToggle3D}
        is3D={is3D}
        isSatellite={isSatellite}
        hasBottomNav={!showTabsInHeader}
        bearing={bearing}
      />
      
      {/* Weather Widget */}
      <WeatherWidget isVisible={isWeatherVisible} isSidebarOpen={isSidebarOpen} />

      {/* Feedback Button Component */}
      <FeedbackButton onClick={() => setShowReportIssue(true)} hasBottomNav={!showTabsInHeader} />

      {/* Slide-in Building Info Card */}
      <aside
        className={`bg-white dark:bg-surface-container-high border border-slate-200 dark:border-white/10 shadow-2xl fixed right-4 md:right-[24px] top-[140px] md:top-[88px] w-[calc(100vw-32px)] md:w-[360px] rounded-2xl z-[85] overflow-hidden flex flex-col transition-all duration-300 transform ${
          selectedBuilding ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        {/* Ambient Corner Hues */}
        <div className="absolute top-[150px] -left-20 w-64 h-64 bg-[#FDE047]/80 dark:bg-red-500/50 blur-[60px] rounded-full pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7DD3FC]/80 dark:bg-cyan-500/50 blur-[60px] rounded-full pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />

        {selectedBuilding && (
          <div className="relative z-10 flex flex-col h-full w-full">
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
                  <span className="material-symbols-outlined text-[20px]">stairs</span>
                  <span className="font-label-md text-label-md text-sm">
                    {selectedBuilding.details.floors}
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-outline-variant/20 flex gap-2">
                <button
                  onClick={handleShowDirections}
                  className="flex-1 py-2.5 bg-[#22B8CF] hover:bg-[#1A94A6] text-white font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">directions</span>
                  Directions
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
          </div>
        )}
      </aside>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-[88px] left-1/2 transform -translate-x-1/2 bg-surface-bright/95 text-on-surface px-4 py-2 rounded-xl border border-outline-variant/30 shadow-2xl z-[120] text-sm font-body-md animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          {toastMessage}
        </div>
      )}

      {/* Live Navigation Guidance Banner */}
      {isNavigating && (
        <div className="fixed top-[88px] left-1/2 transform -translate-x-1/2 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-2xl z-[125] flex items-center gap-4">
          <span className="material-symbols-outlined text-[22px]">directions_walk</span>
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-sm">
              {navigatingBuildingRef.current?.name || "Navigating"}
            </span>
            <span className="text-xs opacity-90">
              {routeInfo
                ? `${Math.round(routeInfo.distanceM)} m • ${Math.max(1, Math.round(routeInfo.durationS / 60))} min walk`
                : "Calculating route..."}
            </span>
          </div>
          <button
            onClick={handleStopNavigation}
            className="ml-2 px-3 py-1.5 rounded-lg bg-on-primary/15 hover:bg-on-primary/25 text-xs font-medium transition-colors"
          >
            Stop
          </button>
        </div>
      )}


      {/* Report Issue Floating Modal */}
      {showReportIssue && (
        <ReportIssueForm onClose={() => setShowReportIssue(false)} />
      )}
    </div>
  );
}
