import type { CategoryType } from "../../data/mockData";

interface SidebarProps {
  isOpen: boolean;
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
  onFocusSearch: () => void;
}

const categories = [
  { id: "academic", label: "Academic Buildings", icon: "business" },
  { id: "hostels", label: "Hostels", icon: "apartment" },
  { id: "food", label: "Food & Cafeteria", icon: "restaurant" },
  { id: "sports", label: "Sports", icon: "sports_soccer" },
  { id: "labs", label: "Labs", icon: "science" },
  { id: "admin", label: "Administration", icon: "admin_panel_settings" },
] as const;

const quickFilterOptions = [
  "Open Now",
  "Air Conditioned",
  "24/7",
  "Accessible",
  "Study Areas",
  "Wi-Fi",
];

function Sidebar({
  isOpen,
  activeCategory,
  onCategoryChange,
  activeFilters,
  onToggleFilter,
  onFocusSearch,
}: SidebarProps) {
  return (
    <nav
      className={`fixed left-4 top-[80px] h-[calc(100vh-96px)] w-sidebar_width bg-[#0F172A]/90 backdrop-blur-xl border border-outline-variant/20 rounded-2xl flex flex-col z-[90] shadow-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-0 pointer-events-none"
      }`}
    >
      {/* Top Shortcut Card */}
      <div className="p-4 border-b border-outline-variant/20">
        <div
          onClick={onFocusSearch}
          className="bg-surface-container-low/50 border border-outline-variant/30 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-surface-container-high/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="font-body-md text-sm">Search places...</span>
          </div>
          <span className="px-2 py-1 rounded bg-surface-container-highest/50 border border-outline-variant/30 text-[10px] font-label-sm text-on-surface-variant">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-4 py-3 border-b border-outline-variant/20 flex flex-wrap gap-2">
        {quickFilterOptions.map((filter) => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              className={`px-3 py-1 rounded-full border text-xs font-label-md cursor-pointer transition-colors ${
                isActive
                  ? "bg-primary text-on-primary border-primary shadow-sm"
                  : "border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Scrollable Categories */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-2 px-2">
        <div className="space-y-1">
          <h3 className="px-3 py-2 text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">
            Categories
          </h3>
          {/* Add an "All Categories" option */}
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
            <span className="font-label-md text-sm">All Places</span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {cat.icon}
                </span>
                <span className="font-label-md text-sm">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Saved Places */}
        <div className="mt-6 space-y-1">
          <h3 className="px-3 py-2 text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">
            Saved Places
          </h3>
          <div className="px-3 py-4 border border-dashed border-outline-variant/30 rounded-lg text-center bg-surface-container-lowest/30">
            <span className="material-symbols-outlined text-on-surface-variant opacity-50 mb-1">
              bookmark_border
            </span>
            <p className="font-body-md text-xs text-on-surface-variant">Coming Soon</p>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mt-6 space-y-1 mb-4">
          <h3 className="px-3 py-2 text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">
            Recent Searches
          </h3>
          <div className="px-3 py-4 border border-dashed border-outline-variant/30 rounded-lg text-center bg-surface-container-lowest/30">
            <span className="material-symbols-outlined text-on-surface-variant opacity-50 mb-1">
              history
            </span>
            <p className="font-body-md text-xs text-on-surface-variant">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-label-sm text-xs text-on-surface">Campus Open</span>
          </div>
          <span className="font-label-sm text-[10px] text-on-surface-variant">v2.4.1</span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
