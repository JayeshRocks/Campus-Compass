import { useState, useEffect, useRef, useCallback } from "react";
import type { Building } from "../data/buildings";
import { isWithinCampusBounds } from "../utils/navigationEngine";

export interface UserLocationState {
  userLocation: { lat: number; lng: number } | null;
  userAccuracy: number | null;
  userHeading: number | null;
  isLiveGpsActive: boolean;
  isOnCampus: boolean;
  gpsError: string | null;
  selectedOriginBuilding: Building | null;
  effectiveOrigin: { lat: number; lng: number; label: string } | null;
  startGpsTracking: () => void;
  stopGpsTracking: () => void;
  setSelectedOriginBuilding: (building: Building | null) => void;
  clearOrigin: () => void;
}

export function useUserLocation(buildings: Building[]): UserLocationState {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userAccuracy, setUserAccuracy] = useState<number | null>(null);
  const [userHeading, setUserHeading] = useState<number | null>(null);
  const [isLiveGpsActive, setIsLiveGpsActive] = useState<boolean>(false);
  const [isOnCampus, setIsOnCampus] = useState<boolean>(true);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [selectedOriginBuilding, setSelectedOriginBuildingState] = useState<Building | null>(null);

  const watchIdRef = useRef<number | null>(null);

  // Position smoothing state to avoid GPS jitter
  const lastLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  const stopGpsTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsLiveGpsActive(false);
  }, []);

  const startGpsTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }

    setGpsError(null);
    setIsLiveGpsActive(true);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const rawLat = position.coords.latitude;
        const rawLng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const heading = position.coords.heading;

        setUserAccuracy(accuracy);
        if (heading !== null && !isNaN(heading)) {
          setUserHeading(heading);
        }

        const onCampus = isWithinCampusBounds(rawLat, rawLng);
        setIsOnCampus(onCampus);

        // Apply exponential smoothing filter for smooth movement
        if (!lastLocationRef.current) {
          lastLocationRef.current = { lat: rawLat, lng: rawLng };
        } else {
          const alpha = 0.4; // Smoothing factor
          const smoothLat = lastLocationRef.current.lat + alpha * (rawLat - lastLocationRef.current.lat);
          const smoothLng = lastLocationRef.current.lng + alpha * (rawLng - lastLocationRef.current.lng);
          lastLocationRef.current = { lat: smoothLat, lng: smoothLng };
        }

        setUserLocation({ ...lastLocationRef.current });
      },
      (error) => {
        setIsLiveGpsActive(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError("Location permission denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setGpsError("Location request timed out.");
            break;
          default:
            setGpsError("An unknown location error occurred.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000
      }
    );
  }, []);

  // Listen to device orientation for compass heading when available
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading is available on iOS devices
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const webkitHeading = (e as any).webkitCompassHeading;
      if (typeof webkitHeading === "number") {
        setUserHeading(webkitHeading);
      } else if (e.alpha !== null && typeof e.alpha === "number") {
        // Standard deviceorientation alpha angle
        setUserHeading(360 - e.alpha);
      }
    };

    if (window.DeviceOrientationEvent && isLiveGpsActive) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [isLiveGpsActive]);

  // Clean up watch position on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const setSelectedOriginBuilding = useCallback((building: Building | null) => {
    setSelectedOriginBuildingState(building);
  }, []);

  const clearOrigin = useCallback(() => {
    setSelectedOriginBuildingState(null);
    stopGpsTracking();
    setUserLocation(null);
  }, [stopGpsTracking]);

  // Compute effective origin: Custom Origin Building > Live User GPS Position > Default Gate 1
  let effectiveOrigin: { lat: number; lng: number; label: string } | null = null;
  if (selectedOriginBuilding) {
    effectiveOrigin = {
      lat: selectedOriginBuilding.latitude,
      lng: selectedOriginBuilding.longitude,
      label: selectedOriginBuilding.name
    };
  } else if (userLocation) {
    effectiveOrigin = {
      lat: userLocation.lat,
      lng: userLocation.lng,
      label: isOnCampus ? "My Current Location" : "My Location (Off Campus)"
    };
  } else {
    // Default fallback to Main Entrance (Gate 1) if no origin is set
    const gate1 = buildings.find((b) => b.id === "gate_1") || buildings[0];
    if (gate1) {
      effectiveOrigin = {
        lat: gate1.latitude,
        lng: gate1.longitude,
        label: gate1.name
      };
    }
  }

  return {
    userLocation,
    userAccuracy,
    userHeading,
    isLiveGpsActive,
    isOnCampus,
    gpsError,
    selectedOriginBuilding,
    effectiveOrigin,
    startGpsTracking,
    stopGpsTracking,
    setSelectedOriginBuilding,
    clearOrigin
  };
}
