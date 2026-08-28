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
    const val = Math.max(10, Math.round(distM));
    if (val >= 1000) return `${(val / 1000).toFixed(1)} km`;
    return `${val} m`;
  };

  const formatDuration = (durS: number) => {
    const mins = Math.max(1, Math.round(durS / 60));
    return `${mins} min walk`;
  };

  return (
    <div className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md transition-all duration-300">
      {/* Sleek Single Banner */}
      <div className="bg-slate-950/95 dark:bg-surface-container-highest/95 backdrop-blur-2xl border border-white/20 dark:border-white/15 text-white rounded-2xl p-3 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-2.5">
          {/* Left Step Icon */}
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
            <span className="material-symbols-outlined text-xl">{currentStep.icon || "navigation"}</span>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xs md:text-sm text-white truncate leading-snug">
              {currentStep.instruction}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-300">
              <span className="text-primary-light font-semibold">{formatDistance(routeResult.distanceM)}</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{formatDuration(routeResult.durationS)}{originLabel ? ` • from ${originLabel}` : ""}</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleFollow && (
              <button
                onClick={onToggleFollow}
                className={`w-7 h-7 rounded-lg transition-colors flex items-center justify-center text-xs ${
                  isFollowingUser
                    ? "bg-primary text-white"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
                title={isFollowingUser ? "Following Location" : "Center Location"}
                aria-label="Toggle follow location"
              >
                <span className="material-symbols-outlined text-base">my_location</span>
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-0.5 transition-colors"
            >
              <span>Steps</span>
              <span className="material-symbols-outlined text-xs">
                {isExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>

            <button
              onClick={onEndNavigation}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 flex items-center justify-center transition-colors"
              title="End Navigation"
              aria-label="End Navigation"
            >
              <span className="material-symbols-outlined text-base">close</span>
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
