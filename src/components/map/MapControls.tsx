interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCompass: () => void;
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onResetCompass,
}: MapControlsProps) {
  return (
    <div className="fixed bottom-[100px] md:bottom-[24px] right-[24px] z-[80] flex flex-col gap-3 transition-all duration-300">
      {/* Compass */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border w-12 h-12 flex mx-auto">
        <button
          onClick={onResetCompass}
          className="w-12 h-12 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 group"
          title="Reset Map Orientation"
        >
          <span className="material-symbols-outlined transform -rotate-45 text-blue-600 dark:text-primary group-hover:scale-110 transition-transform">explore</span>
        </button>
      </div>
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
