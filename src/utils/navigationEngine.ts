export interface Coordinates {
  lng: number;
  lat: number;
}

export interface RouteStep {
  instruction: string;
  distanceM: number;
  icon: string;
  location?: [number, number];
}

export interface RouteResult {
  coordinates: [number, number][];
  distanceM: number;
  durationS: number;
  steps: RouteStep[];
  isFallback?: boolean;
}

/**
 * Calculates Haversine distance in meters between two lat/lng pairs
 */
export function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Checks if a lat/lng coordinate is within the campus bounding box area (~2km around campus center)
 */
export function isWithinCampusBounds(lat: number, lng: number): boolean {
  // Campus center is ~ [13.1264, 77.5898]
  return lat >= 13.110 && lat <= 13.145 && lng >= 77.570 && lng <= 77.610;
}

/**
 * Fetches pedestrian foot routing from OpenStreetMap OSRM engine
 */
export async function calculateFootRoute(
  origin: [number, number], // [lng, lat]
  destination: [number, number], // [lng, lat]
  destinationName = "Destination"
): Promise<RouteResult> {
  const primaryUrl = `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson&steps=true`;
  const fallbackUrl = `https://router.project-osrm.org/route/v1/foot/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson&steps=true`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseOsrmResponse = (data: any): RouteResult | null => {
    const route = data?.routes?.[0];
    const coords = route?.geometry?.coordinates;
    if (!route || !Array.isArray(coords) || coords.length < 2) return null;

    const rawSteps = route.legs?.[0]?.steps || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const steps: RouteStep[] = rawSteps.map((s: any) => {
      const type = s.maneuver?.type || "";
      const modifier = s.maneuver?.modifier || "";
      const streetName = s.name ? ` onto ${s.name}` : "";
      let icon = "navigation";
      let text = `Walk towards ${destinationName}`;

      if (type === "arrive") {
        icon = "location_on";
        text = `Arrive at ${destinationName}`;
      } else if (type === "depart") {
        icon = "navigation";
        text = `Head towards ${destinationName}`;
      } else if (modifier.includes("left")) {
        icon = modifier.includes("slight") ? "turn_slight_left" : "turn_left";
        text = `Turn ${modifier}${streetName}`;
      } else if (modifier.includes("right")) {
        icon = modifier.includes("slight") ? "turn_slight_right" : "turn_right";
        text = `Turn ${modifier}${streetName}`;
      } else if (modifier.includes("straight")) {
        icon = "straight";
        text = `Continue straight${streetName}`;
      } else if (type === "turn") {
        icon = "directions_walk";
        text = `Turn ${modifier}${streetName}`;
      }

      return {
        instruction: text,
        distanceM: Math.round(s.distance || 0),
        icon,
        location: s.maneuver?.location
      };
    });

    if (steps.length === 0) {
      const dist = route.distance || distanceMeters(origin[1], origin[0], destination[1], destination[0]);
      steps.push(
        { instruction: `Head towards ${destinationName}`, distanceM: Math.round(dist), icon: "navigation" },
        { instruction: `Arrive at ${destinationName}`, distanceM: 0, icon: "location_on" }
      );
    }

    return {
      coordinates: coords,
      distanceM: route.distance || 0,
      durationS: route.duration || 0,
      steps,
      isFallback: false
    };
  };

  const directDist = distanceMeters(origin[1], origin[0], destination[1], destination[0]);

  try {
    const res = await fetch(primaryUrl);
    if (res.ok) {
      const data = await res.json();
      const parsed = parseOsrmResponse(data);
      // If internal campus route and OSRM routed > 2.2x external detour, reject detour
      if (parsed) {
        if (parsed.distanceM > directDist * 2.2 && isWithinCampusBounds(origin[1], origin[0]) && isWithinCampusBounds(destination[1], destination[0])) {
          console.warn("[navigationEngine] OSRM external detour detected (", parsed.distanceM, "m vs direct", directDist, "m). Using internal campus path.");
        } else {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn("[navigationEngine] Primary OSRM failed, trying fallback...", err);
  }

  try {
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const data = await res.json();
      const parsed = parseOsrmResponse(data);
      if (parsed) {
        if (parsed.distanceM > directDist * 2.2 && isWithinCampusBounds(origin[1], origin[0]) && isWithinCampusBounds(destination[1], destination[0])) {
          console.warn("[navigationEngine] OSRM fallback external detour detected. Using internal campus path.");
        } else {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn("[navigationEngine] Fallback OSRM failed, using direct line...", err);
  }

  // Internal Campus Direct Footpath Path (when OSRM goes outside campus or is offline)
  const campusDist = Math.round(directDist * 1.12);
  const campusDur = Math.round(campusDist / 1.2); // ~1.2 m/s walking speed

  return {
    coordinates: [origin, destination],
    distanceM: campusDist,
    durationS: campusDur,
    steps: [
      { instruction: `Head towards ${destinationName} via Campus Walkway`, distanceM: campusDist, icon: "directions_walk" },
      { instruction: `Arrive at ${destinationName}`, distanceM: 0, icon: "location_on" }
    ],
    isFallback: true
  };
}
