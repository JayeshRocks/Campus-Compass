import { Logo } from "../ui/Logo";

interface HeaderProps {
  onMenuToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isSatellite: boolean;
  onSatelliteToggle: () => void;
  onNavigate: (page: string) => void;
}

function Header({
  onMenuToggle,
  isDarkMode,
  onThemeToggle,
  isSatellite,
  onSatelliteToggle,
  onNavigate,
}: HeaderProps) {
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

      {/* Center: Navigation Links */}
      <div className="hidden md:flex flex-1 mx-gutter items-center justify-center gap-6">
        {[
          { id: "home", label: "Home" },
          { id: "map", label: "Map" },
          { id: "campus-guide", label: "Campus Guide" },
          { id: "team", label: "Meet the Team" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="font-label-md text-slate-600 hover:text-blue-600 dark:text-on-surface-variant dark:hover:text-primary transition-colors cursor-pointer relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-primary transition-all group-hover:w-full"></span>
          </button>
        ))}
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
      </div>
    </header>
  );
}

export default Header;