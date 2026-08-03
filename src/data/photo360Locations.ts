export interface Photo360Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  imageFile: string;
}

export const photo360Locations: Photo360Location[] = [
  {
    id: "amphitheatre_360",
    name: "Amphitheatre",
    latitude: 13.125785785496372,
    longitude: 77.58973612738201,
    imageFile: "amphitheatre.jpg",
  },
  {
    id: "marena_intersection",
    name: "MARENA",
    latitude: 13.127837549532021,
    longitude: 77.58943002724921,
    imageFile: "marena.jpg",
  },
  {
    id: "marc_intersection",
    name: "MARC",
    latitude: 13.126930508290659,
    longitude: 77.58937599976925,
    imageFile: "marc.jpg",
  },
  {
    id: "sign_intersection",
    name: "sign",
    latitude: 13.123903345413327, 
    longitude: 77.59095285951307,
    imageFile: "sign.jpg",
  },
  {
    id: "academic_blocks",
    name: "Academic Blocks",
    latitude: 13.125775914514643,
    longitude: 77.59078356713944,
    imageFile: "abs.jpg",
  },
  {
    id: "mahead",
    name: "mahead",
    latitude: 13.12478150755262,
    longitude: 77.58965685614761,
    imageFile: "mahead.jpg",
  },
  {
    id: "academic_block_4",
    name: "Academic Block 4",
    latitude: 13.124820696080052,
    longitude:  77.59063769830527,
    imageFile: "ab4.jpg",
  },
];