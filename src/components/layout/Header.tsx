import { useEffect, useRef } from "react";
import { Logo } from "../ui/Logo";

interface HeaderProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isSatellite: boolean;
  onSatelliteToggle: () => void;
  onNavigate: (page: string) => void;
}

function Header({
  onMenuToggle,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  isSatellite,
  onSatelliteToggle,
  onNavigate,
}: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 w-full h-[64px] bg-white/80 border-b border-slate-200 dark:bg-surface/80 backdrop-blur-md dark:border-b dark:border-outline-variant/20 flex items-center justify-between px-gutter z-[100]">
      {/* Left: Branding & Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center animate-fade-in"
          title="Toggle Sidebar"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div
          onClick={() => onNavigate("map")}
          className="flex items-center gap-2 cursor-pointer select-none active:opacity-90 transition-opacity"
          title="Campus Compass Home"
        >
          <Logo className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-slate-900 dark:text-on-surface">Campus Compass</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-[600px] mx-gutter relative items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-500 dark:text-on-surface-variant text-[20px]">search</span>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-12 pr-20 py-2 bg-slate-100/50 border border-slate-200 dark:bg-surface-container-high/50 dark:border-outline-variant/30 rounded-full text-slate-900 dark:text-on-surface placeholder-slate-500 dark:placeholder-on-surface-variant font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
          placeholder="Search buildings, classrooms, facilities..."
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="px-2 py-0.5 rounded border border-slate-200 bg-white/50 text-[10px] font-label-sm text-slate-500 dark:border-outline-variant/30 dark:bg-surface-container-highest/50 dark:text-on-surface-variant select-none shadow-sm">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSatelliteToggle}
          className={`glitch-btn relative p-2 overflow-hidden transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center border-2 border-transparent ${isSatellite ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50'}`}
          title="Toggle Satellite View"
        >
          <span className="material-symbols-outlined select-none relative z-10">
            satellite_alt
          </span>
        </button>
        <button
          onClick={onThemeToggle}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center"
          title="Toggle Light/Dark Theme"
        >
          <span className="material-symbols-outlined select-none">
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <div className="relative group">
          <button
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center"
            title="More Options"
          >
            <span className="material-symbols-outlined select-none">more_vert</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white/95 border border-slate-200 dark:bg-surface-bright/95 backdrop-blur-md dark:border-outline-variant/30 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110] p-2">
            <button
              onClick={() => onNavigate("team")}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-slate-700 dark:text-on-surface text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-blue-600 dark:text-primary">groups</span>
              <span className="font-body-md text-sm">Meet the Team</span>
            </button>
            <a
              href="https://github.com/JayeshRocks/Campus-Compass"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-slate-700 dark:text-on-surface"
            >
              <span className="material-symbols-outlined text-blue-600 dark:text-primary">code</span>
              <span className="font-body-md text-sm">GitHub Repository</span>
            </a>
            <button
              onClick={() => onNavigate("about")}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-slate-700 dark:text-on-surface text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-blue-600 dark:text-primary">info</span>
              <span className="font-body-md text-sm">About</span>
            </button>
            <button
              onClick={() => onNavigate("report-location")}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-slate-700 dark:text-on-surface text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-blue-600 dark:text-primary">edit_location_alt</span>
              <span className="font-body-md text-sm">Report Incorrect Location</span>
            </button>
            <button
              onClick={() => onNavigate("report-issue")}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-slate-700 dark:text-on-surface text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-blue-600 dark:text-primary">report_problem</span>
              <span className="font-body-md text-sm">Report Issue</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;