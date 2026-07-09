import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MapView from "./components/map/MapView";
import { type Building, type CategoryType, buildings } from "./data/buildings";
import Home from "./pages/Home";
import About from "./pages/About";
import MeetTeam from "./pages/MeetTeam";
import ReportIssue from "./pages/ReportIssue";
import ReportLocation from "./pages/ReportLocation";
import RoleModal, { type UserRole } from "./components/RoleModal";
import CampusGuide from "./pages/CampusGuide";
import BottomNav from "./components/layout/BottomNav";

export default function App() {
  const [activePage, setActivePage] = useState<string>("map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return false; // Always closed on first view / reload on mobile
    }
    const saved = localStorage.getItem("isSidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [isSatellite, setIsSatellite] = useState(() => {
    const saved = localStorage.getItem("isSatellite");
    return saved ? JSON.parse(saved) : true;
  });
  const [userRole, setUserRole] = useState<UserRole | null>(
    () => localStorage.getItem("userRole") as UserRole | null,
  );

  // Sync sidebar state
  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Filter buildings dynamically based on category and search
  const filteredBuildings = buildings.filter((building) => {
    // 1. Category Filter
    if (activeCategory !== "all" && building.category !== activeCategory) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const nameMatch = building.name.toLowerCase().includes(query);
      const descMatch = building.description.toLowerCase().includes(query);
      const featureMatch = building.details.features.some((f) =>
        f.toLowerCase().includes(query),
      );
      if (!nameMatch && !descMatch && !featureMatch) {
        return false;
      }
    }

    return true;
  });

  // Synchronize dark class on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Sync satellite state
  useEffect(() => {
    localStorage.setItem("isSatellite", JSON.stringify(isSatellite));
  }, [isSatellite]);

  // If the selected building is filtered out, deselect it
  useEffect(() => {
    if (
      selectedBuilding &&
      !filteredBuildings.some((b) => b.id === selectedBuilding.id)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedBuilding(null);
    }
  }, [filteredBuildings, selectedBuilding]);

  return (
    <>
      {!userRole && <RoleModal onSelectRole={setUserRole} />}
      <Header
        activePage={activePage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        isSatellite={isSatellite}
        onSatelliteToggle={() => setIsSatellite(!isSatellite)}
        onNavigate={setActivePage}
        isSidebarOpen={isSidebarOpen}
      />

      {activePage === "map" ? (
        <main className="pt-[64px] pb-[90px] md:pb-0 relative h-[100vh] w-full overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <MapView
            buildings={filteredBuildings}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={setSelectedBuilding}
            isSidebarOpen={isSidebarOpen}
            isDarkMode={isDarkMode}
            isSatellite={isSatellite}
          />
        </main>
      ) : (
        <main className="pt-[64px] relative h-[100vh] w-full overflow-hidden">
          {activePage === "home" && <Home />}
          {activePage === "about" && <About />}
          {activePage === "campus-guide" && <CampusGuide />}
          {activePage === "team" && <MeetTeam />}
          {activePage === "report-issue" && <ReportIssue />}
          {activePage === "report-location" && <ReportLocation />}
        </main>
      )}

      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </>
  );
}
