interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCompass: () => void;
  onLocateMe: () => void;
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onResetCompass,
  onLocateMe,
}: MapControlsProps) {
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[80] flex flex-col gap-3">
      {/* Compass */}
      <button
        onClick={onResetCompass}
        className="w-12 h-12 glass-panel rounded-full shadow-lg ghost-border flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
        title="Reset Map Orientation"
      >
        <span className="material-symbols-outlined transform -rotate-45 text-primary">explore</span>
      </button>
      {/* Zoom Controls */}
      <div className="glass-panel rounded-full shadow-lg ghost-border flex flex-col overflow-hidden">
        <button
          onClick={onZoomIn}
          className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors border-b border-outline-variant/30 cursor-pointer"
          title="Zoom In"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <button
          onClick={onZoomOut}
          className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
      {/* Locate Me */}
      <button
        onClick={onLocateMe}
        className="w-12 h-12 glass-panel rounded-full shadow-lg ghost-border flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shadow-[0_0_20px_rgba(37,99,235,0.2)] cursor-pointer active:scale-95"
        title="Locate Me"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          my_location
        </span>
      </button>
    </div>
  );
}
