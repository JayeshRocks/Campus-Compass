import { useEffect, useState } from "react";

interface WeatherWidgetProps {
  isVisible: boolean;
  isSidebarOpen: boolean;
}

interface WeatherData {
  temp: number;
  condition: string;
  type: "sunny" | "moon" | "cloudy" | "rain" | "storm";
}

export default function WeatherWidget({ isVisible, isSidebarOpen }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // MIT Bengaluru coords roughly
    const lat = 13.1116;
    const lng = 77.5878;
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        const cw = data.current_weather;
        const code = cw.weathercode;
        const isDay = cw.is_day === 1;
        
        let type: WeatherData["type"] = "sunny";
        let condition = "Clear";
        
        if (code === 0) {
          type = isDay ? "sunny" : "moon";
          condition = isDay ? "Sunny" : "Clear";
        } else if (code >= 1 && code <= 3) {
          type = "cloudy";
          condition = code === 1 ? "Mainly Clear" : code === 2 ? "Partly Cloudy" : "Cloudy";
        } else if (code >= 45 && code <= 48) {
          type = "cloudy";
          condition = "Hazy";
        } else if (code >= 51 && code <= 67) {
          type = "rain";
          condition = "Rainy";
        } else if (code >= 71 && code <= 86) {
          type = "rain";
          condition = "Showers";
        } else if (code >= 95) {
          type = "storm";
          condition = "Storm";
        }

        setWeather({
          temp: Math.round(cw.temperature),
          condition,
          type
        });
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  let transformClass = "translate-x-0 opacity-100";
  if (isSidebarOpen) {
    transformClass = "-translate-x-[calc(100%+40px)] opacity-0"; 
  } else if (!isVisible) {
    transformClass = "-translate-x-[calc(100%+40px)] opacity-0"; 
  }

  // If we haven't loaded weather yet, render nothing or a tiny skeleton.
  if (!weather) return null;

  return (
    <div
      className={`fixed left-4 md:left-[24px] top-[80px] md:top-[88px] z-[80] transition-all duration-700 ease-in-out pointer-events-none ${transformClass}`}
    >
      <div className="flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl drop-shadow-lg">
        
        {/* Dynamic Icon */}
        <div className="w-10 h-10 relative flex-shrink-0 flex items-center justify-center drop-shadow-md">
          {weather.type === "sunny" && (
            <>
              <div className="absolute inset-0 bg-amber-500/20 dark:bg-yellow-400/30 rounded-full blur-md"></div>
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 relative z-10 text-amber-500 dark:text-yellow-400">
                <circle cx="12" cy="12" r="5" fill="currentColor"/>
                <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 3v2M12 19v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6l1.4 1.4M6 18l1.4-1.4M16.6 7.4l1.4-1.4"/>
                </g>
              </svg>
            </>
          )}

          {weather.type === "moon" && (
            <>
              <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-400/30 rounded-full blur-md"></div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 relative z-10 text-indigo-500 dark:text-indigo-300">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </>
          )}

          {weather.type === "cloudy" && (
            <>
              <div className="absolute inset-0 bg-slate-500/20 dark:bg-slate-400/30 rounded-full blur-md"></div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 relative z-10 text-slate-500 dark:text-slate-300">
                <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.176 10.2048 17.8546 10.0245C17.3871 6.6346 14.4756 4 11 4C7.13401 4 4 7.13401 4 11C4 11.1633 4.00557 11.3253 4.01646 11.4855C2.28588 12.1158 1 13.7997 1 15.8C1 18.1196 2.8804 20 5.2 20H17.5V19Z"/>
              </svg>
            </>
          )}

          {weather.type === "rain" && (
            <>
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/30 rounded-full blur-md"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 relative z-10 text-blue-500 dark:text-blue-300">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
              </svg>
            </>
          )}

          {weather.type === "storm" && (
            <>
              <div className="absolute inset-0 bg-purple-500/20 dark:bg-purple-400/30 rounded-full blur-md"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 relative z-10 text-purple-600 dark:text-purple-400">
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m13 12-3 5h4l-3 5"/>
              </svg>
            </>
          )}
        </div>

        {/* Text Container */}
        <div className="flex flex-col pr-2">
          <span className="font-headline-sm font-bold text-slate-900 dark:text-white leading-tight text-[19px] tracking-tight">{weather.temp}°C</span>
          <span className="font-body-md text-slate-600 dark:text-slate-300 text-[13px] uppercase tracking-widest font-semibold leading-none mt-1">{weather.condition}</span>
        </div>
      </div>
    </div>
  );
}
