import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MapView from "./components/map/MapView";
import { type Building, type CategoryType, buildings } from "./data/buildings";
import About from "./pages/About";
import MeetTeam from "./pages/MeetTeam";
import ReportIssue from "./pages/ReportIssue";
import ReportLocation from "./pages/ReportLocation";
import RoleModal, { type UserRole } from "./components/RoleModal";

export default function App() {
  const [activePage, setActivePage] = useState<string>("map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSatellite, setIsSatellite] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(
  () => (localStorage.getItem("userRole") as UserRole | null)
);

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
        f.toLowerCase().includes(query)
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
  }, [isDarkMode]);

  // If the selected building is filtered out, deselect it
  useEffect(() => {
    if (selectedBuilding && !filteredBuildings.some((b) => b.id === selectedBuilding.id)) {
      setSelectedBuilding(null);
    }
  }, [filteredBuildings, selectedBuilding]);

  return (
    <>
    {!userRole && <RoleModal onSelectRole={setUserRole} />}
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        isSatellite={isSatellite}
        onSatelliteToggle={() => setIsSatellite(!isSatellite)}
        onNavigate={setActivePage}
      />
      
      {activePage === "map" ? (
        <main className="pt-[64px] relative h-[calc(100vh-64px)] w-full overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <MapView
            buildings={filteredBuildings}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={setSelectedBuilding}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isSidebarOpen={isSidebarOpen}
            isDarkMode={isDarkMode}
            isSatellite={isSatellite}
          />
        </main>
      ) : (
        <main className="pt-[64px] relative h-[calc(100vh-64px)] w-full overflow-hidden">
          {activePage === "about" && <About />}
          {activePage === "team" && <MeetTeam />}
          {activePage === "report-issue" && <ReportIssue />}
          {activePage === "report-location" && <ReportLocation />}
        </main>
      )}
    </>
  );
}
