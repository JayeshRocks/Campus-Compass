import { useEffect, useRef } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

function Header({
  onMenuToggle,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
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
    <header className="fixed top-0 w-full h-[64px] bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 flex items-center justify-between px-gutter z-[100]">
      {/* Left: Branding & Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-2">
          <img
            alt="Logo"
            className="w-6 h-6 object-contain"
            src="https://lh3.googleusercontent.com/aida/AP1WRLs8WWVb6_a4ER09TSCJMmt6TtaWlZ5ghCWOIsUu7bQu_1fl5uL1NLerNr5KJciVtLgaiRoIczHdHo8M7Utca9-nFxw0bj672cB3ZRf7IFSaL-1SqBWzCUJx8FcYlODD6ryMMTcLGS20kh-R_g9n0AH9t744QLBnxfD4Z8WXYhco3Wqy2mpprm37QPd1Cmn2xrfcCWTH228JSTmgVCh9fIYqDZAxfGBOdjzs6vVaNtWFUQLeizDCpg_3GlM"
          />
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">Campus Compass</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-[600px] mx-gutter relative items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-12 pr-20 py-2 bg-surface-container-high/50 border border-outline-variant/30 rounded-full text-on-surface placeholder-on-surface-variant font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          placeholder="Search buildings, classrooms, facilities..."
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="px-2 py-0.5 rounded border border-outline-variant/30 bg-surface-container-highest/50 text-[10px] font-label-sm text-on-surface-variant">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onThemeToggle}
          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center"
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <div className="relative group">
          <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 transition-colors rounded-full cursor-pointer active:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-surface-bright/90 backdrop-blur-md border border-outline-variant/30 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110] p-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">groups</span>
              <span className="font-body-md text-sm">Meet the Team</span>
            </a>
            <a
              href="https://github.com/JayeshRocks/Campus-Compass"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-primary">code</span>
              <span className="font-body-md text-sm">Github Repository</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">info</span>
              <span className="font-body-md text-sm">About</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-on-surface">
              <span className="material-symbols-outlined text-primary">report_problem</span>
              <span className="font-body-md text-sm">Report Issues</span>
            </a>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden ml-2 border border-outline-variant/30">
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvCC31iuH2MAGonmYyEkzuCTrqtiT_3AQTYpPa1er3zZRl_xwPIr4dZ1ZpLxmkEgWlKY74s_q1uX5OYmDTdznlevHyAHvDkvam3AfzJCxRhDpWGvT5cHTvxRimcYwQnd5CnNfKOMAN9IFto4U9vckJF-ec55dBMMViF_SMZtqVh_fp5WDrOR4-b3zGsp8mA1NpiPdvlh214kOqWXLijyvvv8o2HzM_ozYfFeKuJXb-F_xmSNKMO7xZwN"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;