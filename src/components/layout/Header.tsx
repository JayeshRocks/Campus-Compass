import { useState, useRef, useEffect } from "react";
import { Logo } from "../ui/Logo";

interface HeaderProps {
  activePage: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMenuToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isSatellite: boolean;
  onSatelliteToggle: () => void;
  onNavigate: (page: string) => void;
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
  onMenuToggle,
  isDarkMode,
  onThemeToggle,
  isSatellite,
  onSatelliteToggle,
  onNavigate,
  isSidebarOpen,
}: HeaderProps & { isSidebarOpen?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);  useEffect(() => {
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

  // If search query is typed, automatically open the search bar
  useEffect(() => {
    if (searchQuery && !isSearchOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearchOpen(true);
    }
  }, [searchQuery, isSearchOpen]);

  const glassyButtonClass = "p-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/10 backdrop-blur-md shadow-sm transition-all hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md cursor-pointer active:scale-95 flex items-center justify-center group";

  return (
    <>
      <header className="liquid-glass fixed top-0 w-full h-[64px] flex items-center justify-between px-gutter z-[100]">
        {/* Left: Branding & Menu */}
        <div className="flex items-center gap-1.5 lg:gap-4 min-w-0 lg:min-w-[240px]">
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
            <div className="w-9 h-9 rounded-xl bg-blue-600 dark:bg-primary-container flex items-center justify-center text-white dark:text-on-primary-container shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Logo size={20} className="text-white dark:text-on-primary-container" />
            </div>
            <h1 className="font-headline-md font-bold tracking-tight flex flex-col lg:block leading-[1.1] lg:leading-normal min-w-0">
              <span className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-900 dark:text-on-surface truncate">Campus</span>
              <span className="text-[13px] sm:text-[14px] lg:text-[20px] lg:ml-1 text-blue-600 dark:text-primary lg:text-slate-900 lg:dark:text-on-surface truncate">Compass</span>
            </h1>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="hidden md:flex flex-1 lg:flex-none lg:absolute lg:left-1/2 lg:-translate-x-1/2 justify-center px-2 lg:px-4 min-w-0">
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
              className="absolute h-9 bg-blue-100 dark:bg-surface-container-high/80 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 ease-out z-0"
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
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${isActive ? "text-blue-600 dark:text-primary" : "text-slate-500 dark:text-on-surface-variant group-hover:text-blue-600 dark:group-hover:text-primary"}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{tab.icon}</span>
                  <span className={`font-label-md text-[13px] tracking-wide transition-colors ${isActive ? "text-slate-900 dark:text-on-surface font-semibold" : "text-slate-500 dark:text-on-surface-variant group-hover:text-slate-900 dark:group-hover:text-on-surface font-medium"}`}>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 lg:gap-3 min-w-0 lg:min-w-[240px] justify-end">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            disabled={activePage !== "map"}
            className={`${glassyButtonClass} ${
              activePage !== "map"
                ? "opacity-40 cursor-not-allowed text-slate-400 dark:text-on-surface-variant/40"
                : isSearchOpen
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)] border-blue-200 dark:border-blue-500/30"
                  : "text-slate-600 dark:text-on-surface-variant hover:text-blue-600 dark:hover:text-primary"
            }`}
          >
            <span className={`material-symbols-outlined transition-transform ${activePage === "map" ? "group-hover:scale-110" : ""}`} style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </button>
          
          <button
            onClick={onThemeToggle}
            className={`${glassyButtonClass} text-slate-600 dark:text-on-surface-variant hover:text-blue-600 dark:hover:text-primary`}
          >
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            onClick={onSatelliteToggle}
            disabled={activePage !== "map"}
            className={`glitch-btn relative overflow-hidden ${glassyButtonClass} ${isSatellite ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-500 dark:text-cyan-400 dark:border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-500/20' : 'text-slate-600 dark:text-on-surface-variant hover:border-blue-500/50 dark:hover:border-primary/50'} ${activePage !== "map" ? "opacity-30 pointer-events-none" : ""}`}
            data-icon="satellite_alt"
          >
            <span className={`material-symbols-outlined text-[20px] transition-colors ${isSatellite ? '' : 'group-hover:text-blue-600 dark:group-hover:text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>satellite_alt</span>
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </header>

      {/* Floating Glassmorphism Search Bar */}
      {isSearchOpen && activePage === "map" && (
        <div className={`fixed top-[80px] left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[85] md:w-[calc(100%-2rem)] md:max-w-lg animate-fade-in transition-all duration-300 ${isSidebarOpen ? "md:ml-[140px]" : ""}`}>
          <div className="liquid-glass relative rounded-2xl p-2.5 flex items-center gap-3 transition-shadow hover:shadow-blue-500/20 dark:hover:shadow-primary/20 ring-2 ring-white/60 dark:ring-white/10 shadow-xl overflow-hidden">
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
                setIsSearchOpen(false);
                if (!searchQuery) onSearchChange("");
              }}
              className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-700 dark:text-on-surface transition-colors relative z-10"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}