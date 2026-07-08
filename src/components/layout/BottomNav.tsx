

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
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-[110]">
      <div className="bg-white/90 dark:bg-surface-container-highest/90 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex items-center justify-around">
        {TABS.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? "bg-blue-100/50 dark:bg-blue-500/20 text-blue-600 dark:text-primary shadow-sm"
                  : "text-slate-500 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-white/5"
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
