import { useState } from "react";
import type { Building } from "../../data/buildings";

interface NavigationPanelProps {
  buildings: Building[];
  originBuilding: Building | null;
  destinationBuilding: Building | null;
  onSelectOrigin: (building: Building | null) => void;
  onSelectDestination: (building: Building | null) => void;
  onStartNavigation: () => void;
  onClear: () => void;
  isGpsActive?: boolean;
  onToggleGps?: () => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  buildings,
  originBuilding,
  destinationBuilding,
  onSelectOrigin,
  onSelectDestination,
  onStartNavigation,
  onClear,
  isGpsActive = false,
  onToggleGps
}) => {
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [isSelectingOrigin, setIsSelectingOrigin] = useState(false);
  const [isSelectingDest, setIsSelectingDest] = useState(false);

  const filteredOriginBuildings = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(originQuery.toLowerCase()) ||
      b.shortName.toLowerCase().includes(originQuery.toLowerCase())
  );

  const filteredDestBuildings = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(destQuery.toLowerCase()) ||
      b.shortName.toLowerCase().includes(destQuery.toLowerCase())
  );

  const handleSwap = () => {
    const tempOrigin = originBuilding;
    onSelectOrigin(destinationBuilding);
    onSelectDestination(tempOrigin);
  };

  return (
    <div className="bg-surface-container/95 dark:bg-surface-container-highest/95 backdrop-blur-2xl border border-outline-variant/30 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline font-bold text-lg text-on-surface dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">directions_walk</span>
          Pedestrian Navigation
        </h3>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-outline hover:text-error transition-colors px-2 py-1"
        >
          Clear
        </button>
      </div>

      {/* Inputs Container */}
      <div className="relative space-y-3">
        {/* Origin Field */}
        <div className="relative">
          <label className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider block mb-1">
            Starting Point (From)
          </label>
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant/50 rounded-2xl p-2.5">
            <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0">my_location</span>
            <input
              type="text"
              readOnly={!isSelectingOrigin}
              value={
                isSelectingOrigin
                  ? originQuery
                  : originBuilding
                  ? originBuilding.name
                  : isGpsActive
                  ? "My Current Location (GPS)"
                  : "Main Gate (Default)"
              }
              onFocus={() => setIsSelectingOrigin(true)}
              onChange={(e) => setOriginQuery(e.target.value)}
              placeholder="Search origin building..."
              className="bg-transparent text-sm font-medium text-on-surface dark:text-white outline-none w-full placeholder:text-outline"
            />
            {onToggleGps && (
              <button
                onClick={onToggleGps}
                className={`px-2.5 py-1 text-xs rounded-xl font-medium flex items-center gap-1 transition-colors shrink-0 ${
                  isGpsActive && !originBuilding
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-surface-container-high text-on-surface-variant hover:text-primary"
                }`}
                title="Use Live GPS"
              >
                <span className="material-symbols-outlined text-sm">gps_fixed</span>
                {isGpsActive && !originBuilding ? "GPS On" : "GPS"}
              </button>
            )}
          </div>

          {/* Origin Building Dropdown */}
          {isSelectingOrigin && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-48 overflow-y-auto bg-surface-container-high dark:bg-surface-container-highest border border-outline-variant rounded-2xl shadow-xl divide-y divide-outline-variant/30">
              <div
                onClick={() => {
                  onSelectOrigin(null);
                  setIsSelectingOrigin(false);
                }}
                className="p-3 hover:bg-primary/10 text-xs font-semibold text-primary flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">my_location</span>
                Use Live Location / Main Entrance
              </div>
              {filteredOriginBuildings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectOrigin(b);
                    setIsSelectingOrigin(false);
                    setOriginQuery("");
                  }}
                  className="p-3 hover:bg-primary/10 text-xs text-on-surface dark:text-white flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium">{b.name}</span>
                  <span className="text-[10px] text-outline px-1.5 py-0.5 rounded bg-surface-container-high">
                    {b.shortName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button Floating Absolute */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwap}
            className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-surface border border-outline-variant/60 text-on-surface hover:text-primary shadow-md flex items-center justify-center transition-transform hover:scale-110"
            title="Swap Origin & Destination"
          >
            <span className="material-symbols-outlined text-base">swap_vert</span>
          </button>
        </div>

        {/* Destination Field */}
        <div className="relative">
          <label className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider block mb-1">
            Destination (To)
          </label>
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant/50 rounded-2xl p-2.5">
            <span className="material-symbols-outlined text-rose-500 text-xl shrink-0">location_on</span>
            <input
              type="text"
              readOnly={!isSelectingDest}
              value={isSelectingDest ? destQuery : destinationBuilding ? destinationBuilding.name : ""}
              onFocus={() => setIsSelectingDest(true)}
              onChange={(e) => setDestQuery(e.target.value)}
              placeholder="Select destination building..."
              className="bg-transparent text-sm font-medium text-on-surface dark:text-white outline-none w-full placeholder:text-outline"
            />
          </div>

          {/* Destination Building Dropdown */}
          {isSelectingDest && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-48 overflow-y-auto bg-surface-container-high dark:bg-surface-container-highest border border-outline-variant rounded-2xl shadow-xl divide-y divide-outline-variant/30">
              {filteredDestBuildings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectDestination(b);
                    setIsSelectingDest(false);
                    setDestQuery("");
                  }}
                  className="p-3 hover:bg-primary/10 text-xs text-on-surface dark:text-white flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium">{b.name}</span>
                  <span className="text-[10px] text-outline px-1.5 py-0.5 rounded bg-surface-container-high">
                    {b.shortName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <button
        disabled={!destinationBuilding}
        onClick={onStartNavigation}
        className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:shadow-xl active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-xl">directions_walk</span>
        Start Foot Navigation
      </button>
    </div>
  );
};
