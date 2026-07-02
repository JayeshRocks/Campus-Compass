export interface Building {
  id: string;
  name: string;
  category: "academic" | "food" | "hostels" | "labs" | "sports" | "admin" | "parking" | "security";
  description: string;
  latitude: number;
  longitude: number;
  busyStatus: "Quiet" | "Moderate" | "Busy";
  busyColor: string;
  details: {
    hours: string;
    distance: string;
    floors: string;
    features: string[];
  };
  image: string;
}

export type CategoryType = "all" | "academic" | "food" | "hostels" | "labs" | "sports" | "admin" | "parking" | "security";

export const buildings: Building[] = [
  // Academic Blocks
  {
    id: "ab1",
    name: "Academic Block 1",
    category: "academic",
    description: "Main engineering block with smart lecture halls and student collaboration zones.",
    latitude: 13.1207,
    longitude: 77.5914,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open • Closes at 20:00",
      distance: "5 mins away (450m)",
      floors: "4 Floors • Wheelchair Accessible",
      features: ["Wi-Fi", "Air Conditioned", "Accessible", "Study Areas"]
    },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ab2",
    name: "Academic Block 2",
    category: "academic",
    description: "Faculty offices, conference halls, and the main auditorium.",
    latitude: 13.1207,
    longitude: 77.5921,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • Closes at 18:00",
      distance: "6 mins away (500m)",
      floors: "3 Floors • Elevator Available",
      features: ["Wi-Fi", "Air Conditioned", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ab3",
    name: "Academic Block 3",
    category: "academic",
    description: "Computer science labs, IT helpdesk, and software research wing.",
    latitude: 13.1204,
    longitude: 77.5930,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open • Closes at 22:00",
      distance: "8 mins away (650m)",
      floors: "5 Floors • High-Speed Elevators",
      features: ["Wi-Fi", "Air Conditioned", "Study Areas", "24/7"]
    },
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ab4",
    name: "Academic Block 4",
    category: "academic",
    description: "Electronics and mechanical workshops, fluid dynamics lab.",
    latitude: 13.1195,
    longitude: 77.5923,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • Closes at 17:30",
      distance: "6 mins away (480m)",
      floors: "2 Floors • Ramp Access",
      features: ["Accessible", "Wi-Fi"]
    },
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ab5",
    name: "Academic Block 5",
    category: "academic",
    description: "Physics, chemistry research labs, and chemistry storage block.",
    latitude: 13.1195,
    longitude: 77.5915,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • Closes at 18:00",
      distance: "5 mins away (420m)",
      floors: "2 Floors • Wheelchair Ramp",
      features: ["Wi-Fi", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ab6",
    name: "Academic Block 6",
    category: "academic",
    description: "Humanities and social science classrooms, creative design studio.",
    latitude: 13.1227,
    longitude: 77.5922,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • Closes at 17:00",
      distance: "8 mins away (620m)",
      floors: "3 Floors • Wheelchair Accessible",
      features: ["Wi-Fi", "Study Areas"]
    },
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tap_convention",
    name: "TA Pai Convention Center",
    category: "admin",
    description: "Grand auditorium for university events, convocation, and student fests.",
    latitude: 13.1218,
    longitude: 77.5908,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open during events",
      distance: "4 mins away (300m)",
      floors: "2 Floors • Stage access lift",
      features: ["Air Conditioned", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cub1",
    name: "Central Utility Block 1",
    category: "admin",
    description: "Main electricity switchyard and maintenance hub for east campus.",
    latitude: 13.1208,
    longitude: 77.5935,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open 24/7",
      distance: "9 mins away (700m)",
      floors: "1 Floor • Authorized Only",
      features: ["24/7"]
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cub2",
    name: "Central Utility Block 2",
    category: "admin",
    description: "Water recycling plant and campus maintenance storage facility.",
    latitude: 13.1212,
    longitude: 77.5896,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open 24/7",
      distance: "5 mins away (350m)",
      floors: "1 Floor • Authorized Only",
      features: ["24/7"]
    },
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
  },

  // Hostel Blocks
  {
    id: "hb1",
    name: "Hostel Block 1 (HB1)",
    category: "hostels",
    description: "Senior boys hostel with single occupancy rooms.",
    latitude: 13.1255,
    longitude: 77.5898,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open 24/7",
      distance: "10 mins away (800m)",
      floors: "6 Floors • Elevator",
      features: ["Wi-Fi", "24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hb2",
    name: "Hostel Block 2 (HB2)",
    category: "hostels",
    description: "Junior boys hostel with double occupancy rooms.",
    latitude: 13.1247,
    longitude: 77.5898,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open 24/7",
      distance: "9 mins away (720m)",
      floors: "6 Floors • Elevator",
      features: ["Wi-Fi", "24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hb3",
    name: "Hostel Block 3 (HB3)",
    category: "hostels",
    description: "Girls hostel block with triple and double sharing rooms.",
    latitude: 13.1239,
    longitude: 77.5898,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open 24/7",
      distance: "8 mins away (640m)",
      floors: "6 Floors • Elevator",
      features: ["Wi-Fi", "24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hostel_north",
    name: "Hostel North Wing",
    category: "hostels",
    description: "Freshmen boys block with study halls and indoor activity rooms.",
    latitude: 13.1231,
    longitude: 77.5898,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open 24/7",
      distance: "7 mins away (560m)",
      floors: "4 Floors • Study Areas",
      features: ["Wi-Fi", "24/7", "Study Areas"]
    },
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hostel_south",
    name: "Hostel South Wing",
    category: "hostels",
    description: "Girls wing containing the common room, TV room, and medical desk.",
    latitude: 13.1223,
    longitude: 77.5898,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open 24/7",
      distance: "6 mins away (480m)",
      floors: "4 Floors • Common Lounge",
      features: ["Wi-Fi", "24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "melon_mess",
    name: "Melon Mess",
    category: "food",
    description: "Primary dining hall serving north/south Indian veg and non-veg meals.",
    latitude: 13.1219,
    longitude: 77.5891,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Breakfast: 07:30 - 09:30 • Lunch: 12:00 - 14:15 • Dinner: 19:30 - 21:30",
      distance: "5 mins away (400m)",
      floors: "2 Floors • Double Entrances",
      features: ["Wi-Fi", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "laundry",
    name: "Laundry & Cloak Rooms",
    category: "hostels",
    description: "Professional laundry services and luggage cloakroom for residential students.",
    latitude: 13.1238,
    longitude: 77.5892,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • 08:30 - 18:30",
      distance: "8 mins away (620m)",
      floors: "1 Floor",
      features: ["Accessible"]
    },
    image: "https://images.unsplash.com/photo-1545173168-9f1947e8b85b?auto=format&fit=crop&w=600&q=80"
  },

  // Sports Grounds
  {
    id: "cricket_field",
    name: "Cricket Field & Track",
    category: "sports",
    description: "Main cricket ground with turf pitches and a 400m jogging track loop.",
    latitude: 13.1250,
    longitude: 77.5912,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • 05:00 - 21:00",
      distance: "9 mins away (700m)",
      floors: "Outdoor Field",
      features: ["24/7"]
    },
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "football_field",
    name: "Football Field",
    category: "sports",
    description: "Standard size turf football pitch hosting soccer tournaments.",
    latitude: 13.1236,
    longitude: 77.5914,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • 05:00 - 21:00",
      distance: "7 mins away (520m)",
      floors: "Outdoor Field",
      features: ["Accessible"]
    },
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "marena",
    name: "Marena Sports Complex",
    category: "sports",
    description: "Multi-level indoor stadium with badminton, basketball courts, and fitness gym.",
    latitude: 13.1228,
    longitude: 77.5912,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open • 06:00 - 22:00",
      distance: "6 mins away (450m)",
      floors: "3 Floors • Fully Air Conditioned",
      features: ["Air Conditioned", "Wi-Fi", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "basketball_court_1",
    name: "Basketball Court 1",
    category: "sports",
    description: "Floodlit concrete basketball court for team practice.",
    latitude: 13.1238,
    longitude: 77.5925,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • 05:00 - 22:00",
      distance: "7 mins away (550m)",
      floors: "Outdoor Court",
      features: ["Accessible"]
    },
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "basketball_half",
    name: "Basketball Half Court",
    category: "sports",
    description: "Half court near the boy's residential wing for casual play.",
    latitude: 13.1237,
    longitude: 77.5905,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • 06:00 - 21:00",
      distance: "8 mins away (600m)",
      floors: "Outdoor Court",
      features: []
    },
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "volleyball_courts",
    name: "Volleyball Courts",
    category: "sports",
    description: "Clay sand volleyball courts located east of the main running tracks.",
    latitude: 13.1245,
    longitude: 77.5928,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • 06:00 - 20:00",
      distance: "9 mins away (680m)",
      floors: "Outdoor Courts",
      features: []
    },
    image: "https://images.unsplash.com/photo-1592656094267-764a4502075d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cricket_nets",
    name: "Cricket Net Stalls",
    category: "sports",
    description: "Wicket practice nets for batting and bowling drills.",
    latitude: 13.1231,
    longitude: 77.5906,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • 06:00 - 19:00",
      distance: "7 mins away (520m)",
      floors: "Outdoor Stalls",
      features: []
    },
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80"
  },

  // Security Blocks & Parking
  {
    id: "gate1",
    name: "Gate 1 Security Block",
    category: "security",
    description: "South entry point checkpost for visitors and daily student transits.",
    latitude: 13.1176,
    longitude: 77.5935,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open 24/7",
      distance: "10 mins away (800m)",
      floors: "1 Floor",
      features: ["24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gate2",
    name: "Gate 2 Security Block",
    category: "security",
    description: "East campus checkpoint for authorized staff and service trucks.",
    latitude: 13.1236,
    longitude: 77.5930,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open 24/7",
      distance: "11 mins away (850m)",
      floors: "1 Floor",
      features: ["24/7"]
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gate3",
    name: "Gate 3 Security Block",
    category: "security",
    description: "North entrance gate checking residential curfew logs and cab entries.",
    latitude: 13.1262,
    longitude: 77.5922,
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open 24/7",
      distance: "12 mins away (900m)",
      floors: "1 Floor",
      features: ["24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "car_parking",
    name: "Multi-Level Car Parking",
    category: "parking",
    description: "Main parking spaces for student, faculty, and visitor vehicles.",
    latitude: 13.1217,
    longitude: 77.5880,
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • 06:00 - 22:30",
      distance: "8 mins away (620m)",
      floors: "3 Floors • EV charging zone",
      features: ["Accessible"]
    },
    image: "https://images.unsplash.com/photo-1506521788723-85811181d33b?auto=format&fit=crop&w=600&q=80"
  }
];
