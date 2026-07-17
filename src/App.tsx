import { useState, useEffect, useMemo } from "react";
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
import CookieBanner from "./components/ui/CookieBanner";

export default function App() {
  const [showTabsInHeader, setShowTabsInHeader] = useState(true);
  const [activePage, setActivePage] = useState<string>("map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [isSatellite, setIsSatellite] = useState(() => {
    const saved = localStorage.getItem("isSatellite");
    return saved ? JSON.parse(saved) : false;
  });
  const [userRole, setUserRole] = useState<UserRole | null>(
    () => localStorage.getItem("userRole") as UserRole | null,
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
      const shortNameMatch = building.shortName.toLowerCase().includes(query);
      const descMatch = building.description.toLowerCase().includes(query);
      const featureMatch = building.details.features.some((f) =>
        f.toLowerCase().includes(query),
      );
      if (!nameMatch && !shortNameMatch && !descMatch && !featureMatch) {
        return false;
      }
    }

    return true;
  });

  const activeBuildingIds = useMemo(
    () => new Set(filteredBuildings.map((b) => b.id)),
    [filteredBuildings],
  );

  // Ranked search results for the autocomplete dropdown — matches on
  // shortName first (so "HB1" jumps straight to it), then full name.
  const searchResults = (() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return buildings
      .map((b) => {
        const shortName = b.shortName.toLowerCase();
        const name = b.name.toLowerCase();
        let rank = -1;
        if (shortName === query) rank = 0;
        else if (shortName.startsWith(query)) rank = 1;
        else if (name.startsWith(query)) rank = 2;
        else if (shortName.includes(query) || name.includes(query)) rank = 3;
        else if (b.description.toLowerCase().includes(query)) rank = 4;
        return { building: b, rank };
      })
      .filter((r) => r.rank !== -1)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 8)
      .map((r) => r.building);
  })();

  const handleSelectSearchResult = (building: Building) => {
    setSelectedBuilding(building);
    setSearchQuery("");
    if (activePage !== "map") setActivePage("map");
  };

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
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        isSatellite={isSatellite}
        onSatelliteToggle={() => setIsSatellite(!isSatellite)}
        onNavigate={setActivePage}
        isSidebarOpen={isSidebarOpen}
        showTabsInHeader={showTabsInHeader}
        onTabsLayoutChange={setShowTabsInHeader}
      />

      {activePage === "map" ? (
        <main className={`pt-[64px] ${!showTabsInHeader ? 'pb-[90px]' : ''} relative h-[100vh] w-full overflow-hidden`}>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            showTabsInHeader={showTabsInHeader}
          />
          <MapView
            buildings={buildings}
            activeBuildingIds={activeBuildingIds}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={setSelectedBuilding}
            isSidebarOpen={isSidebarOpen}
            isDarkMode={isDarkMode}
            isSatellite={isSatellite}
            showTabsInHeader={showTabsInHeader}
          />
        </main>
      ) : (
        <main className={`pt-[64px] ${!showTabsInHeader ? 'pb-[90px]' : ''} relative h-[100vh] w-full overflow-hidden`}>
          {activePage === "home" && <Home />}
          {activePage === "about" && <About />}
          {activePage === "campus-guide" && <CampusGuide />}
          {activePage === "team" && <MeetTeam />}
          {activePage === "report-issue" && <ReportIssue />}
          {activePage === "report-location" && <ReportLocation />}
        </main>
      )}

      <BottomNav
        activePage={activePage}
        onNavigate={setActivePage}
        showTabsInHeader={showTabsInHeader}
      />
      <CookieBanner />
    </>
  );
}
