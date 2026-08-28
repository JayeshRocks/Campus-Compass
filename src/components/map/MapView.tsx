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
  const [userAccuracy, setUserAccuracy] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const headingListenerRef = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
  const hasOrientationRef = useRef(false);
  const prevPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isAutoFollow, setIsAutoFollow] = useState(true);
  const [routeSteps, setRouteSteps] = useState<Array<{ instruction: string; distanceM: number; icon: string }>>([]);
  const [showAllSteps, setShowAllSteps] = useState(false);
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
  const [navigatingBuilding, setNavigatingBuilding] = useState<Building | null>(null);
  const navigatingBuildingRef = useRef<Building | null>(null);
  const lastRouteCalcRef = useRef<{ lat: number; lng: number; bId: string } | null>(null);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(true);
  
  const watchIdRef = useRef<number | null>(null);
  const weatherTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    navigatingBuildingRef.current = navigatingBuilding;
  }, [navigatingBuilding]);
  
  // Clean up location watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (weatherTimerRef.current) {
        clearTimeout(weatherTimerRef.current);
      }
      if (headingListenerRef.current) {
        window.removeEventListener("deviceorientationabsolute", headingListenerRef.current, true);
        window.removeEventListener("deviceorientation", headingListenerRef.current, true);
        headingListenerRef.current = null;
      }
    };
  }, []);

  const setupHeadingListener = () => {
    if (headingListenerRef.current) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyEvent = event as any;
      let rawHeading: number | null = null;
      if (typeof anyEvent.webkitCompassHeading === "number") {
        rawHeading = anyEvent.webkitCompassHeading;
      } else if (event.alpha !== null) {
        rawHeading = (360 - event.alpha) % 360;
      }
      if (rawHeading !== null) {
        // Compensate for screen orientation angle (0 portrait, 90/270 landscape)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const screenAngle = typeof window.orientation !== "undefined"
          ? Number(window.orientation)
          : (screen.orientation?.angle || 0);
        const correctedHeading = (rawHeading + screenAngle + 360) % 360;
        hasOrientationRef.current = true;
        setHeading(correctedHeading);
      }
    };

    headingListenerRef.current = handleOrientation;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DeviceOrientationEventAny = (window as any).DeviceOrientationEvent;
    if (DeviceOrientationEventAny && typeof DeviceOrientationEventAny.requestPermission === "function") {
      DeviceOrientationEventAny.requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
  };

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const bearingBetween = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLng = toRad(lng2 - lng1);
    const y = Math.sin(dLng) * Math.cos(toRad(lat2));
    const x =
      Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  };

  const distanceMeters = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  const updateHeadingFromPosition = (position: GeolocationPosition, lat: number, lng: number) => {
    if (hasOrientationRef.current) {
      prevPositionRef.current = { lat, lng };
      return;
    }

    const gpsHeading = position.coords.heading;
    if (typeof gpsHeading === "number" && !Number.isNaN(gpsHeading) && gpsHeading >= 0) {
      setHeading(gpsHeading);
      prevPositionRef.current = { lat, lng };
      return;
    }

    const prev = prevPositionRef.current;
    if (prev) {
      const moved = distanceMeters(prev.lat, prev.lng, lat, lng);
      if (moved > 1.2) {
        const calcHeading = bearingBetween(prev.lat, prev.lng, lat, lng);
        setHeading((prevHeading) => {
          if (prevHeading === null) return calcHeading;
          const diff = (calcHeading - prevHeading + 540) % 360 - 180;
          return (prevHeading + diff * 0.45 + 360) % 360;
        });
        prevPositionRef.current = { lat, lng };
      }
    } else {
      prevPositionRef.current = { lat, lng };
    }
  };

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

  // Dynamic MapLibre footer height
  useEffect(() => {
    if (!map || !mapContainerRef.current) return;
    const attribCtrl = mapContainerRef.current.querySelector('.maplibregl-ctrl-bottom-right');
    if (!attribCtrl) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.documentElement.style.setProperty('--map-footer-height', `${entry.target.getBoundingClientRect().height}px`);
      }
    });
    observer.observe(attribCtrl);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--map-footer-height', '0px');
    };
  }, [map]);

  const selectedBuildingRef = useRef(selectedBuilding);
  useEffect(() => { selectedBuildingRef.current = selectedBuilding; }, [selectedBuilding]);

  useEffect(() => {
    if (!selectedBuilding) {
      lastFlewToBuildingId = null;
      return;
    }
    if (!map) return;
    if (lastFlewToBuildingId === selectedBuilding.id) return;

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
      center: cachedMapState ? cachedMapState.center : [77.5898, 13.1264],
      zoom: cachedMapState ? cachedMapState.zoom : 15.5,
      minZoom: 10,
      maxBounds: [[77.40, 12.80], [77.75, 13.25]],
      pitch: cachedMapState ? cachedMapState.pitch : (is3D ? 55 : 0),
      bearing: cachedMapState ? cachedMapState.bearing : (is3D ? -17 : 0),
      dragRotate: true,
      antialias: true,
      attributionControl: false,
    } as maplibregl.MapOptions);

    mapInstance.on("style.load", () => {
      try {
        mapInstance.setLight({
          anchor: "viewport",
          color: isDarkMode ? "#ffffff" : "#ffffff",
          intensity: 0.55,
          position: [1.8, 120, 25]
        });
      // eslint-disable-next-line no-empty
      } catch {}

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstance as any).setSky?.({
          "sky-color": isDarkMode ? "#0b1220" : "#cfe8ff",
          "sky-horizon-blend": 0.5,
          "horizon-color": isDarkMode ? "#1e293b" : "#e6f1ff",
          "horizon-fog-blend": 0.6,
          "fog-color": isDarkMode ? "#0b1220" : "#e6f1ff",
          "fog-ground-blend": 0.5
        });
      // eslint-disable-next-line no-empty
      } catch {}
    });

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

    const fetchRoads = async () => {
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          }
        } catch (err) {
          console.error("[roads] error adding layer:", err);
        }
      };

      try {
        const cached = localStorage.getItem("campus-roads-cache");
        if (cached) {
          const features = JSON.parse(cached);
          tryAddLayer(features);
          return;
        }
      } catch (err) {
        console.warn("[roads] cache read failed", err);
      }

      try {
        const res = await fetch("/roads.geojson");
        if (!res.ok) {
          throw new Error(`Local fetch failed: ${res.status}`);
        }
        const data = await res.json();
        const features = data.features || [];
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

        // 3D Extrusion Buildings Layer (Excludes Campus Boundary)
        mapInstance.addLayer({
          id: "campus-buildings-fill",
          type: "fill-extrusion",
          source: "campus-buildings",
          filter: ["!=", ["get", "id"], "campus_boundary"],
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
              "mlcp_15", 24,
              "gate_1", 6,
              "gate_2", 6,
              "gate_3", 6,
              "blue_dove_mess", 9,
              "ta_pai", 16,
              "cub_13", 10,
              "cub_14", 10,
              "laundry", 6,
              "hb4_nw_6", 26,
              "hb4_sw_7", 26,
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
            "fill-extrusion-opacity": 0.92,
            "fill-extrusion-vertical-gradient": true
          }
        });

        // Building Outline Layer
        mapInstance.addLayer({
          id: "campus-buildings-line",
          type: "line",
          source: "campus-buildings",
          filter: ["!=", ["get", "id"], "campus_boundary"],
          paint: {
            "line-color": [
              "case",
              ["==", ["get", "isActive"], false],
              isDarkMode ? "#475569" : "#cbd5e1",
              isDarkMode ? "rgba(148, 163, 184, 0.25)" : "rgba(15, 23, 42, 0.15)"
            ],
            "line-width": 1,
            "line-opacity": 1
          }
        });

        // Building Label Layer
        mapInstance.addLayer({
          id: "campus-buildings-label",
          type: "symbol",
          source: "campus-buildings",
          filter: ["!=", ["get", "id"], "campus_boundary"],
          layout: {
            "text-field": ["upcase", ["get", "shortName"]],
            "text-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14, 9,
              16, 12,
              18, 16,
              20, 20
            ],
            "text-font": ["Noto Sans Bold"],
            "text-letter-spacing": 0.02,
            "text-rotation-alignment": "map",
            "text-pitch-alignment": "map",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
            "text-optional": true,
            "text-padding": 2,
            "text-max-width": 6
          },
          paint: {
            "text-color": [
              "case",
              ["==", ["get", "isActive"], false],
              isDarkMode ? "#94a3b8" : "#94a3b8",
              isDarkMode ? "#f8fafc" : "rgba(15, 23, 42, 0.75)"
            ],
            "text-halo-color": isDarkMode ? "#0f172a" : "rgba(255, 255, 255, 0.35)",
            "text-halo-width": isDarkMode ? 1.6 : 1,
            "text-halo-blur": isDarkMode ? 1.2 : 0.5,
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
            "line-color": "#3b82f6",
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
            id: "direction-line-casing",
            type: "line",
            source: "direction-line",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": isDarkMode ? "#0284c7" : "#0284c7",
              "line-width": 8,
              "line-opacity": 0.45
            }
          });
          mapInstance.addLayer({
            id: "direction-line-layer",
            type: "line",
            source: "direction-line",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#22b8cf",
              "line-width": 4.5,
              "line-opacity": 0.95
            }
          });
        }

        // Click handler for building polygons
        mapInstance.on("click", "campus-buildings-fill", (e) => {
          if (e.features && e.features[0]) {
            const id = e.features[0].properties.id;
            const b = buildingsRef.current.find(x => x.id === id);
            if (b) onSelectRef.current(b);
          }
        });

        mapInstance.on("click", (e) => {
          const features = mapInstance.queryRenderedFeatures(e.point, { layers: ["campus-buildings-fill"] });
          if (features.length === 0) {
            onSelectRef.current(null);
          }
        });

        mapInstance.on("mouseenter", "campus-buildings-fill", () => {
          mapInstance.getCanvas().style.cursor = "pointer";
        });
        mapInstance.on("mouseleave", "campus-buildings-fill", () => {
          mapInstance.getCanvas().style.cursor = "";
        });
      }

      // Render Clean Perimeter Boundary Line Layer (2D/3D Pitch Aligned)
// Render Clean Perimeter Boundary Line Layer (Inserted BEFORE 3D buildings so extrusions occlude it)
      if (!mapInstance.getLayer("campus-boundary-wall")) {
        mapInstance.addLayer(
          {
            id: "campus-boundary-wall",
            type: "line",
            source: "campus-buildings",
            filter: ["==", ["get", "id"], "campus_boundary"],
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#eb4034", // Crisp accent perimeter color
              "line-width": 4.5,       // Width in pixels
              "line-opacity": 0.9,
            }
          },
          "campus-buildings-fill" // <-- Passing "campus-buildings-fill" as 'beforeId' places boundary UNDER 3D building extrusions
        );
      }
    };

    const applyBuildingVisibility = () => {
      const visibility = isSatelliteRef.current ? "none" : "visible";
      ["campus-buildings-fill", "campus-buildings-line", "campus-buildings-label", "campus-buildings-highlight", "campus-boundary-wall"].forEach((layerId) => {
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

      const allCoords: [number, number][] = [];
      buildingsRef.current.forEach((b) => {
        if (b.geometry.coordinates && b.geometry.coordinates[0]) {
          const coords = Array.isArray(b.geometry.coordinates[0][0])
            ? (b.geometry.coordinates[0] as number[][])
            : (b.geometry.coordinates as number[][]);
          coords.forEach((coord) => {
            allCoords.push([coord[0], coord[1]]);
          });
        }
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

  useEffect(() => {
    if (!map) return;
    if (map.getStyle() && map.getLayer("campus-buildings-highlight")) {
      map.setFilter("campus-buildings-highlight", ["==", "id", selectedBuilding?.id || ""]);
    }
  }, [selectedBuilding, map]);

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

    setupHeadingListener();

    if (userLoc && map) {
      map.flyTo({
        center: [userLoc.lng, userLoc.lat],
        zoom: 17,
        duration: 1200,
      });
      setToastMessage("Centered on your location");
      setTimeout(() => setToastMessage(null), 2500);
    }

    setToastMessage("Acquiring GPS signal...");

    startWatchingLocation((lat, lng) => {
      setToastMessage("Located your position");
      setTimeout(() => setToastMessage(null), 2500);
      if (map) {
        map.flyTo({
          center: [lng, lat],
          zoom: 17,
          duration: 1500,
        });
      }
    });
  };

  const handleShowToast = (featureName: string, version: string = "2") => {
    setToastMessage(`${featureName} coming in Version ${version}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const drawDirectionLine = async (lat: number, lng: number, building: Building, follow: boolean = false) => {
    if (!map || !building) return;

    // Direct distance calculation
    const distM = distanceMeters(lat, lng, building.latitude, building.longitude);
    const durS = Math.round(distM / 1.2); // ~1.2 m/s walking speed
    setRouteInfo({ distanceM: distM, durationS: durS });

    let routeCoords: [number, number][] = [
      [lng, lat],
      [building.longitude, building.latitude]
    ];

    const last = lastRouteCalcRef.current;
    const shouldFetchOSRM = !last || last.bId !== building.id || distanceMeters(last.lat, last.lng, lat, lng) > 15;

    if (shouldFetchOSRM) {
      try {
        lastRouteCalcRef.current = { lat, lng, bId: building.id };
        const url = `https://router.project-osrm.org/route/v1/foot/${lng},${lat};${building.longitude},${building.latitude}?overview=full&geometries=geojson&steps=true`;
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

          // Parse Turn-by-Turn Steps
          const rawSteps = route?.legs?.[0]?.steps;
          if (Array.isArray(rawSteps) && rawSteps.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const steps = rawSteps.map((s: any) => {
              const type = s.maneuver?.type || "";
              const modifier = s.maneuver?.modifier || "";
              const name = s.name ? ` onto ${s.name}` : "";
              let icon = "navigation";
              let text = `Walk towards ${building.name}`;

              if (type === "arrive") {
                icon = "location_on";
                text = `Arrive at ${building.name}`;
              } else if (type === "depart") {
                icon = "navigation";
                text = `Head towards ${building.name}`;
              } else if (modifier.includes("left")) {
                icon = modifier.includes("slight") ? "turn_slight_left" : "turn_left";
                text = `Turn ${modifier}${name}`;
              } else if (modifier.includes("right")) {
                icon = modifier.includes("slight") ? "turn_slight_right" : "turn_right";
                text = `Turn ${modifier}${name}`;
              } else if (modifier.includes("straight")) {
                icon = "straight";
                text = `Continue straight${name}`;
              }
              return { instruction: text, distanceM: Math.round(s.distance || 0), icon };
            });
            setRouteSteps(steps);
          } else {
            setRouteSteps([
              { instruction: `Walk directly to ${building.name}`, distanceM: Math.round(distM), icon: "directions_walk" },
              { instruction: `Arrive at ${building.name}`, distanceM: 0, icon: "location_on" }
            ]);
          }
        }
      } catch (err) {
        console.warn("[directions] OSRM fetch failed, using direct line:", err);
      }
    }

    const source = map.getSource("direction-line") as maplibregl.GeoJSONSource | undefined;
    if (source) {
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
    }

    if (!follow) {
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
        const rawLat = position.coords.latitude;
        const rawLng = position.coords.longitude;
        const acc = position.coords.accuracy;

        setUserAccuracy(acc);

        setUserLoc((prevLoc) => {
          if (!prevLoc) return { lat: rawLat, lng: rawLng };
          const d = distanceMeters(prevLoc.lat, prevLoc.lng, rawLat, rawLng);
          if (d < 0.3) return prevLoc; // Suppress stationary jitter
          const alpha = d > 8 ? 0.85 : 0.45;
          return {
            lat: prevLoc.lat + alpha * (rawLat - prevLoc.lat),
            lng: prevLoc.lng + alpha * (rawLng - prevLoc.lng)
          };
        });

        updateHeadingFromPosition(position, rawLat, rawLng);

        if (firstFix) {
          firstFix = false;
          onFirstFix?.(rawLat, rawLng);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setToastMessage("Location permission denied. Enable GPS in browser settings.");
        } else {
          setToastMessage("Acquiring high-accuracy GPS fix...");
        }
        setTimeout(() => setToastMessage(null), 4000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleShowDirections = () => {
    if (!selectedBuilding) return;
    const target = selectedBuilding;
    setNavigatingBuilding(target);
    navigatingBuildingRef.current = target;
    setIsNavigating(true);
    setIsAutoFollow(true);
    setupHeadingListener();

    if (userLoc) {
      drawDirectionLine(userLoc.lat, userLoc.lng, target, false);
      startWatchingLocation();
      return;
    }

    setToastMessage("Acquiring GPS for directions...");
    startWatchingLocation((lat, lng) => {
      setToastMessage(null);
      drawDirectionLine(lat, lng, target, false);
    });
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setNavigatingBuilding(null);
    setRouteInfo(null);
    setRouteSteps([]);
    setShowAllSteps(false);
    navigatingBuildingRef.current = null;
    lastRouteCalcRef.current = null;
    const source = map?.getSource("direction-line") as maplibregl.GeoJSONSource | undefined;
    source?.setData({ type: "FeatureCollection", features: [] });
  };

  useEffect(() => {
    if (!map) return;
    const onDragStart = () => {
      if (isNavigating) {
        setIsAutoFollow(false);
      }
    };
    map.on("dragstart", onDragStart);
    return () => {
      map.off("dragstart", onDragStart);
    };
  }, [map, isNavigating]);

  useEffect(() => {
    if (!isNavigating || !userLoc || !navigatingBuildingRef.current) return;
    drawDirectionLine(userLoc.lat, userLoc.lng, navigatingBuildingRef.current, true);
    if (isAutoFollow && map) {
      map.easeTo({ center: [userLoc.lng, userLoc.lat], duration: 500 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoc, isNavigating, isAutoFollow]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      <div ref={mapContainerRef} className="absolute top-0 left-0 w-full h-full z-0 !overflow-visible" />

      {map && (
        <>
          {userLoc && (
            <UserLocation
              map={map}
              latitude={userLoc.lat}
              longitude={userLoc.lng}
              accuracy={userAccuracy}
              heading={heading}
              bearing={bearing}
            />
          )}

          {selectedBuilding && (
            <BuildingPopup
              map={map}
              building={selectedBuilding}
            />
          )}
        </>
      )}

      {/* Floating Live Turn-by-Turn Navigation Banner */}
      {isNavigating && (
        <div className="fixed top-[76px] left-1/2 transform -translate-x-1/2 w-[calc(100%-32px)] max-w-[420px] bg-slate-900/90 dark:bg-surface-bright/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl z-[130] flex flex-col gap-2 border border-white/10 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22B8CF] text-slate-900 flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">
                {routeSteps[0]?.icon || "navigation"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate leading-tight">
                {routeSteps[0]?.instruction || `Head towards ${navigatingBuilding?.name || "Destination"}`}
              </div>
              <div className="text-xs text-cyan-300 font-medium mt-0.5">
                {routeInfo ? `${routeInfo.distanceM >= 1000 ? `${(routeInfo.distanceM / 1000).toFixed(1)} km` : `${Math.round(routeInfo.distanceM)} m`} • ${Math.max(1, Math.round(routeInfo.durationS / 60))} min walk` : "Calculating path..."}
              </div>
            </div>
            {routeSteps.length > 0 && (
              <button
                onClick={() => setShowAllSteps(!showAllSteps)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="View Turn Steps"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showAllSteps ? "expand_less" : "list"}
                </span>
              </button>
            )}
          </div>

          {showAllSteps && routeSteps.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/10 max-h-48 overflow-y-auto space-y-2 pr-1">
              {routeSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-cyan-400 mt-0.5 flex-shrink-0">
                    {step.icon}
                  </span>
                  <div className="flex-1 text-slate-200">
                    <span>{step.instruction}</span>
                    {step.distanceM > 0 && (
                      <span className="text-slate-400 ml-1.5">({step.distanceM} m)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Recenter GPS Navigation Button */}
      {isNavigating && !isAutoFollow && userLoc && (
        <button
          onClick={() => {
            setIsAutoFollow(true);
            map?.easeTo({ center: [userLoc.lng, userLoc.lat], zoom: 17, duration: 600 });
          }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#22B8CF] hover:bg-[#1A94A6] text-white px-4 py-2 rounded-full shadow-2xl z-[120] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-white/20 animate-fade-in"
        >
          <span className="material-symbols-outlined text-[18px]">my_location</span>
          Recenter GPS
        </button>
      )}

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
      
      <WeatherWidget isVisible={isWeatherVisible} isSidebarOpen={isSidebarOpen} />

      <FeedbackButton onClick={() => setShowReportIssue(true)} hasBottomNav={!showTabsInHeader} />

      <aside
        className={`bg-white dark:bg-surface-container-high border border-slate-200 dark:border-white/10 shadow-2xl fixed right-4 md:right-[24px] top-[140px] md:top-[88px] w-[calc(100vw-32px)] md:w-[360px] rounded-2xl z-[85] overflow-hidden flex flex-col transition-all duration-300 transform ${
          selectedBuilding ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
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

      {toastMessage && (
        <div className="fixed top-[88px] left-1/2 transform -translate-x-1/2 bg-surface-bright/95 text-on-surface px-4 py-2 rounded-xl border border-outline-variant/30 shadow-2xl z-[120] text-sm font-body-md animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">info</span>
          {toastMessage}
        </div>
      )}

      {isNavigating && (
        <div className="fixed top-[72px] left-0 h-[calc(100%-72px)] w-full sm:w-[380px] bg-white dark:bg-surface-bright text-slate-900 dark:text-on-surface z-[125] shadow-2xl flex flex-col border-r border-slate-200 dark:border-outline-variant/20 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-outline-variant/20">
            <button
              onClick={handleStopNavigation}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-surface-container-high/60 transition-colors cursor-pointer"
              aria-label="Close directions"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <span className="font-medium text-base">Directions</span>
          </div>

          <div className="px-4 py-3 space-y-2 border-b border-slate-200 dark:border-outline-variant/20">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-surface-container-high rounded-lg px-3 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22B8CF] flex-shrink-0" />
              <span className="text-sm truncate">Your location</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-surface-container-high rounded-lg px-3 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#EA4335] flex-shrink-0">location_on</span>
              <span className="text-sm truncate font-medium">
                {navigatingBuilding?.name || "Destination"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 dark:border-outline-variant/20">
            {[
              { icon: "directions_car", label: "Drive" },
              { icon: "directions_walk", label: "Walk", active: true },
              { icon: "directions_bike", label: "Cycle" },
              { icon: "directions_transit", label: "Transit" }
            ].map((mode) => (
              <button
                key={mode.icon}
                onClick={() => !mode.active && handleShowToast(`${mode.label} directions`)}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors cursor-pointer ${
                  mode.active
                    ? "bg-[#22B8CF]/15 text-[#22B8CF]"
                    : "text-slate-400 dark:text-on-surface-variant/50 hover:bg-slate-100 dark:hover:bg-surface-container-high/60"
                }`}
                aria-label={mode.label}
              >
                <span className="material-symbols-outlined text-[20px]">{mode.icon}</span>
              </button>
            ))}
          </div>

          <div className="px-4 py-3 space-y-2">
            <div className="rounded-xl border-2 border-[#22B8CF] bg-[#22B8CF]/5 px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22B8CF] text-[24px]">directions_walk</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {routeInfo ? `${Math.max(1, Math.round(routeInfo.durationS / 60))} min` : "Calculating..."}
                </div>
                <div className="text-xs text-slate-500 dark:text-on-surface-variant">
                  {routeInfo
                    ? `${routeInfo.distanceM >= 1000 ? `${(routeInfo.distanceM / 1000).toFixed(1)} km` : `${Math.round(routeInfo.distanceM)} m`} • Walking route`
                    : "Finding the best path"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (userLoc && (navigatingBuilding || navigatingBuildingRef.current)) {
                  drawDirectionLine(userLoc.lat, userLoc.lng, (navigatingBuilding || navigatingBuildingRef.current)!, false);
                }
              }}
              className="w-full py-2 rounded-lg bg-slate-100 dark:bg-surface-container-high text-slate-700 dark:text-on-surface font-medium text-xs hover:bg-slate-200 dark:hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">center_focus_strong</span>
              Recenter Route
            </button>
          </div>

          {/* Turn-by-Turn Steps List in Side Panel */}
          {routeSteps.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-200 dark:border-outline-variant/20 flex-1 overflow-y-auto">
              <div className="text-xs font-semibold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                Route Instructions
              </div>
              <div className="space-y-3">
                {routeSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#22B8CF]/15 text-[#22B8CF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">{step.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800 dark:text-on-surface">{step.instruction}</div>
                      {step.distanceM > 0 && (
                        <div className="text-[11px] text-slate-500 dark:text-on-surface-variant">{step.distanceM} meters</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 py-3 border-t border-slate-200 dark:border-outline-variant/20 mt-auto">
            <button
              onClick={handleStopNavigation}
              className="w-full py-2.5 rounded-full bg-[#E8574F]/10 text-[#E8574F] font-medium text-sm hover:bg-[#E8574F]/20 transition-colors cursor-pointer"
            >
              Stop navigation
            </button>
          </div>
        </div>
      )}

      {showReportIssue && (
        <ReportIssueForm onClose={() => setShowReportIssue(false)} />
      )}
    </div>
  );
}