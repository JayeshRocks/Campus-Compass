export interface Building {
  id: string;
  name: string;
  category: "academic" | "food" | "hostels" | "labs" | "sports" | "admin";
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

export type CategoryType = "all" | "academic" | "food" | "hostels" | "labs" | "sports" | "admin";

export const buildings: Building[] = [
  {
    id: "ab1",
    name: "Academic Block 1",
    category: "academic",
    description: "Main engineering facilities, lecture halls 101-305, and faculty offices for CS & IT.",
    latitude: 13.1189,
    longitude: 77.6101,
    busyStatus: "Busy",
    busyColor: "bg-tertiary-container",
    details: {
      hours: "Open • Closes at 20:00",
      distance: "5 mins away (450m)",
      floors: "4 Floors • Wheelchair Accessible",
      features: ["Wi-Fi", "Air Conditioned", "Accessible"]
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr5KqG-U_ZtrIQHw_RWhXcGxttT9h7zDL1ELKoyscx5-nIfbY_IMRRUJua7E_joZ_E1iGlXM2jSnZD_ooCrPFwVcnZXSLyKz_lhr1Mg6lw3hBHrU97P80-zoiIZLjvIfC4gIyMNG6WIslhVp0J8w8u6HZ8SD8XHM8Evwluz0ZqwBGh9cyd1b5i4STzTXyh-dIFd3vSJOPZpmL6Ji642ju0vdfKYsFxzM9135BgsNLNaeCVfjJoI9JVHw"
  }
];
