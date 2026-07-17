interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCompass: () => void;
  onLocateUser: () => void;
  onToggle3D: () => void;
  is3D: boolean;
  onToggleRoads: () => void;
  showRoads: boolean;
  isSatellite: boolean;
  bearing?: number;
  hasBottomNav?: boolean;
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onResetCompass,
  onLocateUser,
  onToggle3D,
  is3D,
  onToggleRoads,
  showRoads,
  isSatellite,
  bearing = -17,
  hasBottomNav = false,
}: MapControlsProps) {
  return (
    <div className={`fixed right-[24px] z-[80] flex flex-col gap-3 transition-all duration-300 ${hasBottomNav ? 'bottom-[100px]' : 'bottom-[24px]'}`}>
      {/* Locate User */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border w-12 h-12 flex mx-auto">
        <button
          onClick={onLocateUser}
          className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 group"
          title="Find My Location"
        >
          <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary group-hover:scale-110 transition-transform">my_location</span>
        </button>
      </div>
      {/* Compass */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border w-12 h-12 flex mx-auto">
        <button
          onClick={onResetCompass}
          className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 group"
          title="Reset Map Orientation"
        >
          <span 
            className="material-symbols-outlined text-[#22B8CF] dark:text-primary group-hover:scale-110 transition-transform"
            style={{ transform: `rotate(${-45 - bearing}deg)` }}
          >
            explore
          </span>
        </button>
      </div>
      {/* 3D View Toggle */}
      {!isSatellite && (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border w-12 h-12 flex mx-auto animate-fade-in">
          <button
            onClick={onToggle3D}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 group font-bold text-[13px] tracking-tight ${
              is3D
                ? "text-white bg-[#22B8CF] dark:bg-primary hover:brightness-110"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50"
            }`}
            title={is3D ? "Switch to flat 2D view" : "Switch to 3D perspective view"}
          >
            {is3D ? "3D" : "2D"}
          </button>
        </div>
      )}
      {/* Roads Toggle */}
      {!isSatellite && (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border w-12 h-12 flex mx-auto animate-fade-in">
          <button
            onClick={onToggleRoads}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 group ${
              showRoads
                ? "text-white bg-[#22B8CF] dark:bg-primary hover:brightness-110"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50"
            }`}
            title={showRoads ? "Hide roads" : "Show roads"}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              {showRoads ? "route" : "hide_source"}
            </span>
          </button>
        </div>
      )}
      {/* Zoom Controls */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border flex flex-col overflow-hidden w-12 mx-auto">
        <button
          onClick={onZoomIn}
          className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors border-b border-slate-200 dark:border-outline-variant/30 cursor-pointer"
          title="Zoom In"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <button
          onClick={onZoomOut}
          className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
    </div>
  );
}
