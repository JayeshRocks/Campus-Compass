import { useState } from "react";
import type { RouteStep, RouteResult } from "../../utils/navigationEngine";
import type { Building } from "../../data/buildings";

interface TurnByTurnHUDProps {
  destinationBuilding: Building;
  originLabel?: string;
  routeResult: RouteResult | null;
  currentStepIndex?: number;
  isFollowingUser?: boolean;
  onToggleFollow?: () => void;
  onEndNavigation: () => void;
  onSelectStep?: (step: RouteStep) => void;
}

export const TurnByTurnHUD: React.FC<TurnByTurnHUDProps> = ({
  destinationBuilding,
  originLabel,
  routeResult,
  currentStepIndex = 0,
  isFollowingUser = false,
  onToggleFollow,
  onEndNavigation,
  onSelectStep
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!routeResult) {
    return (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-slate-900/90 dark:bg-surface-container-highest/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Calculating Pedestrian Route...</h4>
          <p className="text-xs text-slate-400">Fetching OpenStreetMap OSRM Foot path to {destinationBuilding.name}</p>
        </div>
      </div>
    );
  }

  const steps = routeResult.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  const formatDistance = (distM: number) => {
    if (distM >= 1000) return `${(distM / 1000).toFixed(1)} km`;
    return `${Math.round(distM)} m`;
  };

  const formatDuration = (durS: number) => {
    const mins = Math.max(1, Math.round(durS / 60));
    return `${mins} min walk`;
  };

  return (
    <div className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg transition-all duration-300">
      {/* Primary Banner */}
      <div className="bg-slate-950/90 dark:bg-surface-container-highest/95 backdrop-blur-2xl border border-white/15 dark:border-white/10 text-white rounded-3xl p-4 shadow-2xl overflow-hidden">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Step Icon */}
            <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
              <span className="material-symbols-outlined text-2xl">{currentStep.icon || "navigation"}</span>
            </div>

            {/* Instruction */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base md:text-lg leading-tight truncate text-white">
                {currentStep.instruction}
              </h3>
              <p className="text-xs text-slate-300 dark:text-slate-400 truncate mt-0.5">
                To <strong className="text-primary-light dark:text-primary">{destinationBuilding.name}</strong>
                {originLabel ? ` (from ${originLabel})` : ""}
              </p>
            </div>
          </div>

          {/* End Navigation Button */}
          <button
            onClick={onEndNavigation}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 flex items-center justify-center transition-colors shrink-0"
            title="End Navigation"
            aria-label="End Navigation"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Stats Row & Actions */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="bg-primary/20 text-primary-light font-semibold px-2.5 py-1 rounded-full border border-primary/30 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">directions_walk</span>
              {formatDistance(routeResult.distanceM)}
            </span>
            <span className="bg-white/10 text-slate-200 font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {formatDuration(routeResult.durationS)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Recenter / Follow Button */}
            {onToggleFollow && (
              <button
                onClick={onToggleFollow}
                className={`p-1.5 rounded-xl transition-colors flex items-center gap-1 text-xs ${
                  isFollowingUser
                    ? "bg-primary text-white font-medium"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title={isFollowingUser ? "Following Location" : "Center Location"}
              >
                <span className="material-symbols-outlined text-base">my_location</span>
              </button>
            )}

            {/* Toggle Steps Drawer */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-medium flex items-center gap-1 transition-colors"
            >
              <span>{isExpanded ? "Hide Steps" : "Steps"}</span>
              <span className="material-symbols-outlined text-sm">
                {isExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>
        </div>

        {/* Expanded Steps Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10 max-h-60 overflow-y-auto space-y-2 pr-1">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Turn-by-Turn Guide</h4>
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => onSelectStep?.(step)}
                className={`p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  idx === currentStepIndex
                    ? "bg-primary/25 border border-primary/40 text-white font-medium"
                    : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">
                    {step.icon || "navigation"}
                  </span>
                  <span className="truncate">{step.instruction}</span>
                </div>
                {step.distanceM > 0 && (
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2">{step.distanceM}m</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
