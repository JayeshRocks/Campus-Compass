export interface PanoramaLocation {
  id: string;
  buildingId?: string;
  associatedBuildingIds?: string[];
  title: string;
  shortTitle: string;
  category: "Academic" | "Administrative" | "Sports & Dining" | "Landmark";
  image: string;
  description: string;
  initialYaw?: number; // horizontal angle in radians/degrees
  initialPitch?: number; // vertical angle
}

export const campusPanoramas: PanoramaLocation[] = [
  {
    id: "ab4",
    buildingId: "ab4_10",
    associatedBuildingIds: ["ab4_10"],
    title: "Academic Block 4",
    shortTitle: "AB 4",
    category: "Academic",
    image: "/panoramas/ab4.jpg",
    description: "Multi-storey engineering and computing lecture halls, departmental faculties, and computer laboratories.",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "ab5",
    buildingId: "ab5_11",
    associatedBuildingIds: ["ab5_11"],
    title: "Academic Block 5",
    shortTitle: "AB 5",
    category: "Academic",
    image: "/panoramas/abs.jpg",
    description: "Modern academic complex featuring state-of-the-art classrooms, seminar halls, and project labs.",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "amphitheatre",
    buildingId: "amphitheatre",
    associatedBuildingIds: ["amphitheatre", "clmpf_0"],
    title: "Campus Amphitheatre",
    shortTitle: "Amphitheatre",
    category: "Landmark",
    image: "/panoramas/amphitheatre.jpg",
    description: "Open-air theatre and gathering pavilion for university fests, cultural performances, and evening discussions.",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "admin",
    buildingId: "admin_1",
    associatedBuildingIds: ["admin_1"],
    title: "Admin Building",
    shortTitle: "Admin",
    category: "Administrative",
    image: "/panoramas/mahead.jpg",
    description: "The primary administrative center of MAHE Bengaluru, housing university offices, admissions, and student services.",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "marc_circle",
    buildingId: "tiger_circle",
    associatedBuildingIds: ["tiger_circle"],
    title: "Tiger and the Man Circle",
    shortTitle: "Tiger Circle",
    category: "Landmark",
    image: "/panoramas/marc.jpg",
    description: "Central junction and iconic landmark circle connecting Academic Block 1 and surrounding campus walkways.",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "marena",
    buildingId: "sc_16",
    associatedBuildingIds: ["sc_16", "chefs_touch_marena"],
    title: "Marena Sports & Food Court",
    shortTitle: "Marena",
    category: "Sports & Dining",
    image: "/panoramas/marena.jpg",
    description: "World-class indoor sports arena, fitness center, and multi-cuisine student dining hall (Chef's Touch).",
    initialYaw: 0,
    initialPitch: 0,
  },
  {
    id: "mahe_sign",
    buildingId: "mahe_sign",
    associatedBuildingIds: ["mahe_sign"],
    title: "MAHE Signboard",
    shortTitle: "MAHE Sign",
    category: "Landmark",
    image: "/panoramas/sign.jpg",
    description: "Prominent campus entrance monument and photo landmark welcoming visitors and students to MAHE Bengaluru.",
    initialYaw: 0,
    initialPitch: 0,
  },
];

/**
 * Helper to find panorama by building ID
 */
export function getPanoramaForBuilding(buildingId: string): PanoramaLocation | undefined {
  return campusPanoramas.find(
    (p) => p.buildingId === buildingId || p.associatedBuildingIds?.includes(buildingId)
  );
}
