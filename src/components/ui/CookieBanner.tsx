import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem("campus_compass_cookies_accepted");
    if (!hasAccepted) {
      // Small delay for smooth entrance animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    localStorage.setItem("campus_compass_cookies_accepted", "true");
    
    // Wait for exit animation to complete before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[520px] px-4 z-[120] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        isClosing ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="glass-panel p-6 rounded-2xl shadow-2xl space-y-5 border border-slate-200/50 dark:border-outline-variant/30 relative">

        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#22B8CF]/10 dark:bg-primary/10 text-[#22B8CF] dark:text-primary flex-shrink-0">
            <span className="text-3xl">🍪</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-headline-md font-bold text-slate-900 dark:text-on-surface text-[18px]">
              We Use Essential Cookies
            </h3>
            <p className="font-body-md text-slate-600 dark:text-on-surface-variant text-[14px] leading-relaxed">
              Campus Compass uses local storage strictly to remember your essential preferences (like theme mode and role). We do not track you or use advertising cookies.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button 
            onClick={handleAccept}
            className="bg-[#22B8CF] hover:bg-[#1A94A6] dark:bg-primary-container dark:text-on-primary-container text-white px-6 py-2.5 rounded-xl font-bold font-label-md text-sm transition-all active:scale-95 shadow-lg shadow-[#22B8CF]/20"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
