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

interface GraphNode {
  id: number;
  coord: [number, number];
}

let cachedRoadsGraph: {
  nodes: GraphNode[];
  adj: Map<number, Array<{ to: number; dist: number; coord: [number, number] }>>;
} | null = null;

async function getCampusRoadGraph() {
  if (cachedRoadsGraph) return cachedRoadsGraph;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let features: any[] = [];
    const cached = localStorage.getItem("campus-roads-cache");
    if (cached) {
      features = JSON.parse(cached);
    } else {
      const res = await fetch("/roads.geojson");
      if (res.ok) {
        const data = await res.json();
        features = data.features || [];
      }
    }

    if (!features.length) return null;

    const nodes: GraphNode[] = [];
    const adj = new Map<number, Array<{ to: number; dist: number; coord: [number, number] }>>();

    function findOrAddNode(coord: [number, number]): number {
      for (let i = 0; i < nodes.length; i++) {
        if (distanceMeters(coord[1], coord[0], nodes[i].coord[1], nodes[i].coord[0]) < 28) {
          return nodes[i].id;
        }
      }
      const id = nodes.length;
      nodes.push({ id, coord });
      adj.set(id, []);
      return id;
    }

    features.forEach((f) => {
      if (f.geometry && f.geometry.type === "LineString" && f.geometry.coordinates) {
        const coords: [number, number][] = f.geometry.coordinates;
        for (let i = 0; i < coords.length - 1; i++) {
          const u = findOrAddNode(coords[i]);
          const v = findOrAddNode(coords[i + 1]);
          if (u !== v) {
            const dist = distanceMeters(coords[i][1], coords[i][0], coords[i + 1][1], coords[i + 1][0]);
            adj.get(u)!.push({ to: v, dist, coord: coords[i + 1] });
            adj.get(v)!.push({ to: u, dist, coord: coords[i] });
          }
        }
      }
    });

    cachedRoadsGraph = { nodes, adj };
    return cachedRoadsGraph;
  } catch (err) {
    console.warn("[navigationEngine] Failed to build local campus graph:", err);
    return null;
  }
}

function calculateBearing(p1: [number, number], p2: [number, number]): number {
  const dLon = ((p2[0] - p1[0]) * Math.PI) / 180;
  const lat1 = (p1[1] * Math.PI) / 180;
  const lat2 = (p2[1] * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

export async function calculateCampusRoadGraphRoute(
  origin: [number, number],
  destination: [number, number],
  destinationName: string
): Promise<RouteResult | null> {
  const graph = await getCampusRoadGraph();
  if (!graph || graph.nodes.length === 0) return null;

  const { nodes, adj } = graph;

  function findNearestNode(coord: [number, number]): GraphNode | null {
    let minD = Infinity;
    let best: GraphNode | null = null;
    for (let i = 0; i < nodes.length; i++) {
      const d = distanceMeters(coord[1], coord[0], nodes[i].coord[1], nodes[i].coord[0]);
      if (d < minD) {
        minD = d;
        best = nodes[i];
      }
    }
    return best;
  }

  const startNode = findNearestNode(origin);
  const endNode = findNearestNode(destination);
  if (!startNode || !endNode) return null;

  const startId: number = startNode.id;
  const endId: number = endNode.id;

  const distances = new Map<number, number>();
  const previous = new Map<number, number>();
  for (let i = 0; i < nodes.length; i++) {
    distances.set(nodes[i].id, Infinity);
  }
  distances.set(startId, 0);

  const pq: Array<{ id: number; dist: number }> = [{ id: startId, dist: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const curr = pq.shift()!;
    if (curr.id === endId) break;
    if (curr.dist > distances.get(curr.id)!) continue;

    const neighbors = adj.get(curr.id) || [];
    for (const edge of neighbors) {
      const alt = distances.get(curr.id)! + edge.dist;
      if (alt < distances.get(edge.to)!) {
        distances.set(edge.to, alt);
        previous.set(edge.to, curr.id);
        pq.push({ id: edge.to, dist: alt });
      }
    }
  }

  if (distances.get(endId) === Infinity) return null;

  const path: [number, number][] = [];
  let currId: number | undefined = endId;
  while (currId !== undefined) {
    const n = nodes.find((node) => node.id === currId);
    if (n) path.unshift(n.coord);
    currId = previous.get(currId);
  }

  if (distanceMeters(origin[1], origin[0], path[0][1], path[0][0]) > 2) {
    path.unshift(origin);
  }
  const lastIdx = path.length - 1;
  if (distanceMeters(destination[1], destination[0], path[lastIdx][1], path[lastIdx][0]) > 2) {
    path.push(destination);
  }

  let totalDist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    totalDist += distanceMeters(path[i][1], path[i][0], path[i + 1][1], path[i + 1][0]);
  }

  const steps: RouteStep[] = [
    {
      instruction: `Head towards ${destinationName} via Campus Road`,
      distanceM: 0,
      icon: "navigation",
      location: path[0]
    }
  ];

  let segmentDist = 0;
  for (let i = 1; i < path.length - 1; i++) {
    segmentDist += distanceMeters(path[i - 1][1], path[i - 1][0], path[i][1], path[i][0]);
    const b1 = calculateBearing(path[i - 1], path[i]);
    const b2 = calculateBearing(path[i], path[i + 1]);
    let diff = b2 - b1;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    let icon = "straight";
    let text = "Continue along Campus Road";

    if (diff < -45) {
      icon = "turn_left";
      text = "Turn left on Campus Road";
    } else if (diff < -20) {
      icon = "turn_slight_left";
      text = "Bear slight left";
    } else if (diff > 45) {
      icon = "turn_right";
      text = "Turn right on Campus Road";
    } else if (diff > 20) {
      icon = "turn_slight_right";
      text = "Bear slight right";
    } else {
      continue;
    }

    steps.push({
      instruction: text,
      distanceM: Math.round(segmentDist),
      icon,
      location: path[i]
    });
    segmentDist = 0;
  }

  steps.push({
    instruction: `Arrive at ${destinationName}`,
    distanceM: 0,
    icon: "location_on",
    location: path[path.length - 1]
  });

  const finalDist = Math.round(totalDist);
  const finalDur = Math.max(1, Math.round(finalDist / 1.2));

  return {
    coordinates: path,
    distanceM: finalDist,
    durationS: finalDur,
    steps,
    isFallback: false
  };
}

/**
 * Fetches pedestrian foot routing prioritizing local campus road network
 */
export async function calculateFootRoute(
  origin: [number, number], // [lng, lat]
  destination: [number, number], // [lng, lat]
  destinationName = "Destination"
): Promise<RouteResult> {
  const isInternalCampus = isWithinCampusBounds(origin[1], origin[0]) && isWithinCampusBounds(destination[1], destination[0]);

  if (isInternalCampus) {
    const localRoadRoute = await calculateCampusRoadGraphRoute(origin, destination, destinationName);
    if (localRoadRoute && localRoadRoute.coordinates.length > 2) {
      console.log("[navigationEngine] Successfully routed via local campus roads graph (", localRoadRoute.coordinates.length, "waypoints)");
      return localRoadRoute;
    }
  }

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

    const finalCoords: [number, number][] = [...coords];
    if (distanceMeters(origin[1], origin[0], finalCoords[0][1], finalCoords[0][0]) > 2) {
      finalCoords.unshift(origin);
    } else {
      finalCoords[0] = origin;
    }

    const lastIdx = finalCoords.length - 1;
    if (distanceMeters(destination[1], destination[0], finalCoords[lastIdx][1], finalCoords[lastIdx][0]) > 2) {
      finalCoords.push(destination);
    } else {
      finalCoords[lastIdx] = destination;
    }

    let calculatedDist = 0;
    for (let i = 0; i < finalCoords.length - 1; i++) {
      calculatedDist += distanceMeters(finalCoords[i][1], finalCoords[i][0], finalCoords[i + 1][1], finalCoords[i + 1][0]);
    }

    const finalDist = Math.max(Math.round(calculatedDist), Math.round(directDist));
    const finalDur = Math.max(1, Math.round(finalDist / 1.2));

    return {
      coordinates: finalCoords,
      distanceM: finalDist,
      durationS: finalDur,
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
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn("[navigationEngine] Primary OSRM failed, trying fallback...", err);
  }

  try {
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const data = await res.json();
      const parsed = parseOsrmResponse(data);
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn("[navigationEngine] Fallback OSRM failed...", err);
  }

  const localRoadRoute = await calculateCampusRoadGraphRoute(origin, destination, destinationName);
  if (localRoadRoute) return localRoadRoute;

  const campusDist = Math.round(directDist * 1.12);
  const campusDur = Math.round(campusDist / 1.2);

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
