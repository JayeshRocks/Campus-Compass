export interface Building {
  id: string;
  name: string;
  category: "academic" | "food" | "hostels" | "labs" | "sports" | "admin";
  description: string;
  busyStatus: "Quiet" | "Moderate" | "Busy";
  busyColor: string;
  details: {
    hours: string;
    distance: string;
    floors: string;
    features: string[];
  };
  image: string;
  top: string;
  left: string;
  rotation: string;
}

export type CategoryType = "all" | "academic" | "food" | "hostels" | "labs" | "sports" | "admin";

export const mockBuildings: Building[] = [
  {
    id: "ab1",
    name: "Academic Block 1",
    category: "academic",
    description: "Main engineering facilities, lecture halls 101-305, and faculty offices for CS & IT.",
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open • Closes at 20:00",
      distance: "5 mins away (450m)",
      floors: "4 Floors • Wheelchair Accessible",
      features: ["Wi-Fi", "Air Conditioned", "Accessible"]
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr5KqG-U_ZtrIQHw_RWhXcGxttT9h7zDL1ELKoyscx5-nIfbY_IMRRUJua7E_joZ_E1iGlXM2jSnZD_ooCrPFwVcnZXSLyKz_lhr1Mg6lw3hBHrU97P80-zoiIZLjvIfC4gIyMNG6WIslhVp0J8w8u6HZ8SD8XHM8Evwluz0ZqwBGh9cyd1b5i4STzTXyh-dIFd3vSJOPZpmL6Ji642ju0vdfKYsFxzM9135BgsNLNaeCVfjJoI9JVHw",
    top: "25%",
    left: "33%",
    rotation: "rotate-[-5deg]"
  },
  {
    id: "library",
    name: "Central Library",
    category: "academic",
    description: "Over 50,000 books, group study rooms, quiet reference section, and computer center.",
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • Closes at 22:00",
      distance: "8 mins away (600m)",
      floors: "3 Floors • Silent Study Areas",
      features: ["Wi-Fi", "Study Areas", "Air Conditioned"]
    },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    top: "55%",
    left: "65%",
    rotation: "rotate-[10deg]"
  },
  {
    id: "food_court",
    name: "Food Court & Cafeteria",
    category: "food",
    description: "Multi-cuisine food stalls, juice bar, and outdoor sit-out dining area.",
    busyStatus: "Moderate",
    busyColor: "bg-yellow-500",
    details: {
      hours: "Open • Closes at 23:00",
      distance: "3 mins away (250m)",
      floors: "1 Floor • Outdoor Seating",
      features: ["Wi-Fi", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    top: "70%",
    left: "40%",
    rotation: "rotate-[3deg]"
  },
  {
    id: "hostel",
    name: "Main Hostels",
    category: "hostels",
    description: "Student residential wings, common lounge, laundry facility, and 24/7 dining hall.",
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open 24/7",
      distance: "12 mins away (900m)",
      floors: "8 Floors • Residents Only",
      features: ["Wi-Fi", "24/7", "Accessible"]
    },
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    top: "40%",
    left: "15%",
    rotation: "rotate-[8deg]"
  },
  {
    id: "labs",
    name: "Science & AI Research Labs",
    category: "labs",
    description: "State-of-the-art supercomputing labs, physics research labs, and workspace for developers.",
    busyStatus: "Quiet",
    busyColor: "bg-green-500",
    details: {
      hours: "Open • Closes at 18:00",
      distance: "6 mins away (500m)",
      floors: "2 Floors • Authorized Access Only",
      features: ["Wi-Fi", "Air Conditioned", "24/7"]
    },
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
    top: "20%",
    left: "70%",
    rotation: "rotate-[-12deg]"
  }
];
