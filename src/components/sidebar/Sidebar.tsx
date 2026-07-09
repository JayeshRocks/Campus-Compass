import { useState, useRef, useEffect } from "react";
import type { CategoryType } from "../../data/buildings";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const ALL_CATEGORIES = [
  { id: "all", label: "All Places", icon: "explore" },
  { id: "academic", label: "Academic Buildings", icon: "business" },
  { id: "hostels", label: "Hostels", icon: "apartment" },
  { id: "food", label: "Food & Cafeteria", icon: "restaurant" },
  { id: "sports", label: "Sports", icon: "sports_soccer" },
  { id: "labs", label: "Labs", icon: "science" },
  { id: "admin", label: "Administration", icon: "admin_panel_settings" },
  { id: "parking", label: "Parking", icon: "local_parking" },
  { id: "security", label: "Security & Gates", icon: "security" },
] as const;

export default function Sidebar({
  isOpen,
  onClose,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const activeIndex = ALL_CATEGORIES.findIndex((cat) => cat.id === activeCategory);
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIndicatorStyle({
          top: activeTab.offsetTop,
          height: activeTab.offsetHeight,
          opacity: 1,
        });
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [activeCategory, isOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md z-[90] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      
      <nav
        className={`liquid-glass fixed left-0 md:left-4 top-0 md:top-[80px] h-[100vh] md:h-[calc(100vh-96px)] pt-[64px] md:pt-0 w-[85vw] max-w-[320px] md:w-sidebar_width md:rounded-2xl flex flex-col z-[95] transition-transform duration-300 overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-[110%] pointer-events-none"
        }`}
      >
      {/* Scrollable Categories */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-4 px-2">
        <div className="space-y-1 relative">
          <h3 className="px-3 py-2 text-xs font-label-sm text-slate-600 dark:text-on-surface-variant uppercase tracking-wider relative z-10">
            Categories
          </h3>
          {/* Active Frosted Glass Indicator */}
          <div 
            className="absolute left-0 right-0 bg-white dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-lg shadow-sm transition-all duration-300 ease-out z-0"
            style={{ top: indicatorStyle.top, height: indicatorStyle.height, opacity: indicatorStyle.opacity }}
          />

          {ALL_CATEGORIES.map((cat, index) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => { tabsRef.current[index] = el; }}
                onClick={() => onCategoryChange(cat.id as CategoryType)}
                className={`relative z-10 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group active:scale-95 ${
                  isActive ? "" : "hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform ${isActive ? "text-blue-600 dark:text-primary" : "text-slate-600 dark:text-on-surface-variant group-hover:text-blue-600 dark:group-hover:text-primary"}`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {cat.icon}
                </span>
                <span className={`font-label-md text-sm tracking-wide transition-colors ${isActive ? "text-slate-900 dark:text-on-surface font-semibold" : "text-slate-700 dark:text-on-surface-variant group-hover:text-slate-900 dark:group-hover:text-on-surface font-medium"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-2.5 border-t border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md flex flex-col items-center justify-center gap-0.5">
        <span className="font-label-sm text-[10px] font-medium text-slate-500 dark:text-on-surface-variant/70 tracking-widest uppercase text-center">© 2026 Campus Compass</span>
        <span className="font-label-sm text-[9px] text-slate-400 dark:text-on-surface-variant/50 text-center">Made by students for students</span>
      </div>
    </nav>
    </>
  );
}

