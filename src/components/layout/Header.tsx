import { useState, useRef, useEffect } from "react";
import { Logo } from "../ui/Logo";
import type { Building } from "../../data/buildings";

interface HeaderProps {
  activePage: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults?: Building[];
  onSelectSearchResult?: (building: Building) => void;
  onMenuToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isSatellite: boolean;
  onSatelliteToggle: () => void;
  onNavigate: (page: string) => void;
  isSidebarOpen?: boolean;
  showTabsInHeader?: boolean;
  onTabsLayoutChange?: (show: boolean) => void;
}

const TABS = [
  { id: "map", label: "Map", icon: "map" },
  { id: "campus-guide", label: "Resources", icon: "inventory_2" },
  { id: "team", label: "Team", icon: "groups" },
  { id: "about", label: "About", icon: "info" },
];

export default function Header({
  activePage,
  searchQuery,
  onSearchChange,
  searchResults = [],
  onSelectSearchResult,
  onMenuToggle,
  isDarkMode,
  onThemeToggle,
  isSatellite,
  onSatelliteToggle,
  onNavigate,
  isSidebarOpen,
  showTabsInHeader = true,
  onTabsLayoutChange,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const headerSearchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Set timeout ensures layout is painted and offsets are accurate
    const timer = setTimeout(() => {
      const activeIndex = TABS.findIndex((t) => t.id === activePage);
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab) {
        setIndicatorStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
        });
      } else {
        setIndicatorStyle({ left: -100, width: 0 }); // Hide if off-tab
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [activePage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // Standard responsive breakpoint (lg: 1024px)
      // >= 1024px: Desktop (tabs in header)
      // < 1024px: Mobile/Tablet (tabs in bottom nav)
      const isDesktop = window.innerWidth >= 1024;
      
      if (onTabsLayoutChange && showTabsInHeader !== isDesktop) {
        onTabsLayoutChange(isDesktop);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showTabsInHeader, onTabsLayoutChange]);

  // If search query is typed, automatically open the search bar
  useEffect(() => {
    if (searchQuery) {
      setIsSearchOpen(true);
    }
  }, [searchQuery]);

  // Handle clicking outside the search bar to close and clear it
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking the header search button (it has its own toggle logic)
      if (headerSearchButtonRef.current?.contains(e.target as Node)) return;
      
      // Close and clear if clicking outside the search container
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        onSearchChange("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, onSearchChange]);

  const glassyButtonClass = "p-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/10 backdrop-blur-md shadow-sm transition-all hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md cursor-pointer active:scale-95 flex items-center justify-center group";

  return (
    <>
      <header ref={headerRef} className="liquid-glass fixed top-0 w-full h-[64px] flex items-center justify-between px-gutter z-[100]">
        {/* Left: Branding & Menu */}
        <div className="flex flex-1 items-center gap-3 lg:gap-6 min-w-0">
          <button
            onClick={onMenuToggle}
            disabled={activePage !== "map"}
            className={`${glassyButtonClass} text-slate-600 dark:text-on-surface-variant flex-shrink-0 -ml-[2px] lg:ml-0 ${activePage !== "map" ? "opacity-30 pointer-events-none" : ""}`}
          >
            <span className="material-symbols-outlined transition-transform group-hover:rotate-180" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
          </button>
          <div
            onClick={() => onNavigate("map")}
            className="flex items-center gap-1.5 lg:gap-2.5 cursor-pointer group min-w-0 ml-[1px] lg:ml-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#22B8CF] dark:bg-primary-container flex items-center justify-center text-white dark:text-on-primary-container shadow-lg shadow-[#22B8CF]/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Logo size={20} className="text-white dark:text-on-primary-container" />
            </div>
            <h1 className="hidden min-[360px]:flex flex-wrap items-center gap-x-1 font-headline-md font-bold tracking-tight leading-[1.1]">
              <span className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-900 dark:text-on-surface">Campus</span>
              <span className="text-[14px] sm:text-[18px] lg:text-[20px] text-[#22B8CF] dark:text-primary lg:text-slate-900 lg:dark:text-on-surface">Compass</span>
            </h1>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        {showTabsInHeader && (
          <div className="flex-shrink-0 px-2 lg:px-4">
            <nav className="bg-slate-100/50 dark:bg-surface-container-low/50 backdrop-blur-md p-1 rounded-full border border-slate-200 dark:border-white/10 flex items-center gap-1 relative overflow-hidden" onMouseLeave={() => {
            const activeIndex = TABS.findIndex((t) => t.id === activePage);
            const activeTab = tabsRef.current[activeIndex];
            if (activeTab) {
              setIndicatorStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
              });
            } else {
              setIndicatorStyle({ left: -100, width: 0 }); // Hide if off-tab
            }
          }}>
            {/* Animated Indicator */}
            <div 
              className="absolute h-9 bg-[#D7F3F6] dark:bg-surface-container-high/80 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 ease-out z-0"
              style={{ 
                left: `${indicatorStyle.left}px`, 
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.width > 0 ? 1 : 0
              }}
            />
            {TABS.map((tab, index) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabsRef.current[index] = el; }}
                  onClick={() => onNavigate(tab.id)}
                  onMouseEnter={(e) => {
                    setIndicatorStyle({
                      left: e.currentTarget.offsetLeft,
                      width: e.currentTarget.offsetWidth,
                    });
                  }}
                  className="relative z-10 px-5 py-2 mx-1 flex items-center gap-2.5 rounded-full transition-all cursor-pointer active:scale-95 group"
                >
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${isActive ? "text-[#22B8CF] dark:text-primary" : "text-slate-500 dark:text-on-surface-variant group-hover:text-[#22B8CF] dark:group-hover:text-primary"}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{tab.icon}</span>
                  <span className={`font-label-md text-[13px] tracking-wide transition-colors ${isActive ? "text-slate-900 dark:text-on-surface font-semibold" : "text-slate-500 dark:text-on-surface-variant group-hover:text-slate-900 dark:group-hover:text-on-surface font-medium"}`}>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        )}

        {/* Right: Actions */}
        <div ref={rightRef} className="flex flex-1 items-center gap-1.5 lg:gap-3 justify-end min-w-0">
          <button
            ref={headerSearchButtonRef}
            onClick={() => {
              if (isSearchOpen) onSearchChange("");
              setIsSearchOpen(!isSearchOpen);
            }}
            disabled={activePage !== "map"}
            className={`${glassyButtonClass} ${
              activePage !== "map"
                ? "opacity-40 cursor-not-allowed text-slate-400 dark:text-on-surface-variant/40"
                : isSearchOpen
                  ? "text-[#22B8CF] dark:text-[#5DCBDA] bg-[#EAFBFC]/50 dark:bg-[#22B8CF]/10 hover:bg-[#D7F3F6] dark:hover:bg-[#22B8CF]/20 shadow-[0_0_15px_rgba(37,99,235,0.2)] border-[#B7E9ED] dark:border-[#22B8CF]/30"
                  : "text-slate-600 dark:text-on-surface-variant hover:text-[#22B8CF] dark:hover:text-primary"
            }`}
          >
            <span className={`material-symbols-outlined transition-transform ${activePage === "map" ? "group-hover:scale-110" : ""}`} style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </button>
          
          <button
            onClick={onThemeToggle}
            className={`${glassyButtonClass} text-slate-600 dark:text-on-surface-variant hover:text-[#22B8CF] dark:hover:text-primary`}
          >
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            onClick={onSatelliteToggle}
            disabled={activePage !== "map"}
            className={`glitch-btn relative overflow-hidden ${glassyButtonClass} ${isSatellite ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-500 dark:text-cyan-400 dark:border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-500/20' : 'text-slate-600 dark:text-on-surface-variant hover:border-[#22B8CF]/50 dark:hover:border-primary/50'} ${activePage !== "map" ? "opacity-30 pointer-events-none" : ""}`}
            data-icon="satellite_alt"
          >
            <span className={`material-symbols-outlined text-[20px] transition-colors ${isSatellite ? '' : 'group-hover:text-[#22B8CF] dark:group-hover:text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>satellite_alt</span>
            <div className="absolute inset-0 bg-[#22B8CF]/5 dark:bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </header>

      {/* Floating Glassmorphism Search Bar */}
      {isSearchOpen && activePage === "map" && (
        <div ref={searchContainerRef} className={`fixed top-[80px] left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[85] md:w-[calc(100%-2rem)] md:max-w-lg animate-fade-in transition-all duration-300 ${isSidebarOpen ? "md:ml-[140px]" : ""}`}>
          <div className="liquid-glass relative rounded-2xl p-2.5 flex items-center gap-3 transition-shadow hover:shadow-[#22B8CF]/20 dark:hover:shadow-primary/20 ring-2 ring-white/60 dark:ring-white/10 shadow-xl overflow-hidden">
            {/* Extra opacity layer exclusively for dark mode */}
            <div className="absolute inset-0 bg-slate-900/60 hidden dark:block -z-10 pointer-events-none"></div>
            
            <span className="material-symbols-outlined text-slate-700 dark:text-on-surface ml-2 text-[24px]">search</span>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search buildings, rooms, resources..."
              className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white font-body-md font-semibold placeholder:text-slate-600 dark:placeholder:text-on-surface-variant/70 placeholder:font-medium"
            />
            <button
              onClick={() => {
                onSearchChange("");
                setIsSearchOpen(false);
              }}
              className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-700 dark:text-on-surface transition-colors relative z-10"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Autocomplete results — jump straight to a building */}
          {searchQuery.trim() !== "" && searchResults.length > 0 && (
            <div className="liquid-glass mt-2 rounded-2xl overflow-hidden ring-2 ring-white/60 dark:ring-white/10 shadow-xl max-h-[60vh] overflow-y-auto">
              <div className="absolute inset-0 bg-slate-900/60 hidden dark:block -z-10 pointer-events-none"></div>
              {searchResults.map((building) => (
                <button
                  key={building.id}
                  onClick={() => {
                    onSelectSearchResult?.(building);
                    setIsSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#EAFBFC]/60 dark:hover:bg-white/10 transition-colors border-b border-slate-200/40 dark:border-white/5 last:border-b-0"
                >
                  <span className="material-symbols-outlined text-slate-500 dark:text-on-surface-variant text-[20px]">location_on</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">{building.name}</span>
                    <span className="text-xs text-slate-500 dark:text-on-surface-variant">
                      {building.shortName} • <span className="capitalize">{building.category}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {searchQuery.trim() !== "" && searchResults.length === 0 && (
            <div className="liquid-glass mt-2 rounded-2xl px-4 py-3 text-sm text-slate-500 dark:text-on-surface-variant ring-2 ring-white/60 dark:ring-white/10 shadow-xl">
              No buildings match &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      )}
    </>
  );
}