import type { CategoryType } from "../../data/buildings";

interface SidebarProps {
  isOpen: boolean;
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const categories = [
  { id: "academic", label: "Academic Buildings", icon: "business" },
  { id: "hostels", label: "Hostels", icon: "apartment" },
  { id: "food", label: "Food & Cafeteria", icon: "restaurant" },
  { id: "sports", label: "Sports", icon: "sports_soccer" },
  { id: "labs", label: "Labs", icon: "science" },
  { id: "admin", label: "Administration", icon: "admin_panel_settings" },
  { id: "parking", label: "Parking", icon: "local_parking" },
  { id: "security", label: "Security & Gates", icon: "security" },
] as const;

function Sidebar({
  isOpen,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  return (
    <nav
      className={`fixed left-4 top-[80px] h-[calc(100vh-96px)] w-sidebar_width bg-[#f1f5f9]/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-slate-200 dark:border-outline-variant/20 rounded-2xl flex flex-col z-[90] shadow-2xl transition-all duration-300 overflow-hidden ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-0 pointer-events-none"
      }`}
    >
      {/* Scrollable Categories */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-4 px-2">
        <div className="space-y-1">
          <h3 className="px-3 py-2 text-xs font-label-sm text-slate-500 dark:text-on-surface-variant uppercase tracking-wider">
            Categories
          </h3>
          {/* Add an "All Categories" option */}
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-blue-100 text-blue-700 dark:bg-primary-container dark:text-on-primary-container"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50"
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
                onClick={() => onCategoryChange(cat.id as CategoryType)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-primary-container dark:text-on-primary-container"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-surface-container-high/50"
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
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-200 dark:border-outline-variant/20 bg-white/50 dark:bg-surface-container-lowest/50 flex justify-center">
        <span className="font-label-sm text-xs font-medium text-slate-500 dark:text-on-surface-variant tracking-widest uppercase">Version 1.0</span>
      </div>
    </nav>
  );
}

export default Sidebar;
