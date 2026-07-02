import { useEffect, useRef, useState } from "react";

function Header() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

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
    <header className="bg-surface/70 backdrop-blur-md fixed top-0 w-full h-[64px] border-b border-outline-variant/30 shadow-sm flex items-center justify-between px-gutter z-[100]">
      {/* Left: Branding & Menu */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface hidden md:block tracking-tight">Campus Compass</h1>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl px-8 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full pl-10 pr-16 py-2.5 bg-surface-container-low/80 backdrop-blur-sm border border-outline-variant/30 rounded-full text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
            placeholder="Search buildings, classrooms, facilities..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/50">Ctrl K</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <div className="md:hidden flex-1 flex justify-end px-2">
        <button className="p-2 rounded-full hover:bg-surface-container-high/50 transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>contrast</span>
        </button>
        <div className="relative group">
          <button className="p-2 rounded-full hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>more_vert</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-surface-bright/90 backdrop-blur-md border border-outline-variant/30 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110] p-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">groups</span>
              <span className="font-body-md">Meet the Team</span>
            </a>
            <a href="https://github.com/JayeshRocks/Campus-Compass" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">code</span>
              <span className="font-body-md">Github Repository</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">info</span>
              <span className="font-body-md">About</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">report_problem</span>
              <span className="font-body-md">Report Issues</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;