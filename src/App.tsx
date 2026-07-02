import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MapView from "./components/map/MapView";
import { type Building, type CategoryType, buildings } from "./data/buildings";
import About from "./pages/About";
import MeetTeam from "./pages/MeetTeam";
import ReportIssue from "./pages/ReportIssue";
import ReportLocation from "./pages/ReportLocation";

export default function App() {
  const [activePage, setActivePage] = useState<string>("map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Filter buildings dynamically based on category, search, and quick filters
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

    // 3. Quick Filters (Active list matching)
    for (const filter of activeFilters) {
      if (filter === "Open Now") {
        if (!building.details.hours.toLowerCase().startsWith("open")) return false;
      }
      if (filter === "Air Conditioned") {
        if (!building.details.features.includes("Air Conditioned")) return false;
      }
      if (filter === "24/7") {
        if (
          !building.details.features.includes("24/7") &&
          !building.details.hours.includes("24/7")
        ) {
          return false;
        }
      }
      if (filter === "Accessible") {
        const isAcc =
          building.details.features.includes("Accessible") ||
          building.details.floors.toLowerCase().includes("accessible");
        if (!isAcc) return false;
      }
      if (filter === "Study Areas") {
        if (!building.details.features.includes("Study Areas")) return false;
      }
      if (filter === "Wi-Fi") {
        if (!building.details.features.includes("Wi-Fi")) return false;
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

  // Handle Ctrl+K focusing input in Header
  const focusSearchInput = () => {
    const searchInput = document.querySelector("header input") as HTMLInputElement | null;
    searchInput?.focus();
  };

  const handleToggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <>
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        onNavigate={setActivePage}
      />
      
      {activePage === "map" ? (
        <main className="pt-[64px] relative h-[calc(100vh-64px)] w-full overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
            onFocusSearch={focusSearchInput}
          />
          <MapView
            buildings={filteredBuildings}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={setSelectedBuilding}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isSidebarOpen={isSidebarOpen}
            isDarkMode={isDarkMode}
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

