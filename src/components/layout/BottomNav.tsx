

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const TABS = [
  { id: "map", label: "Map", icon: "map" },
  { id: "campus-guide", label: "Resources", icon: "inventory_2" },
  { id: "team", label: "Team", icon: "groups" },
  { id: "about", label: "About", icon: "info" },
];

export default function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-[110]">
      <div className="liquid-glass rounded-3xl p-2 flex items-center justify-around">
        {TABS.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 active:scale-95 ${
                isActive
                  ? "bg-white/60 dark:bg-white/10 text-blue-600 dark:text-primary shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-slate-600 dark:text-on-surface-variant hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] mb-0.5"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className={`text-[10px] tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
