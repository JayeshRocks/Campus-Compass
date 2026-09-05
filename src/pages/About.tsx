import { Logo } from "../components/ui/Logo";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full page-blobs page-scroll text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16233F]/50 pointer-events-none hidden dark:block"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in relative pt-20 md:pt-28">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="w-24 h-24 rounded-[2rem] bg-[#D7F3F6] dark:bg-surface-container-high/50 mx-auto flex items-center justify-center mb-8 border border-[#B7E9ED] dark:border-white/10 relative shadow-2xl overflow-hidden group">
            {/* Spinning Aura */}
            <div className="absolute -inset-10 bg-gradient-to-br from-[#22B8CF] via-transparent to-[#9B8AFB] opacity-30 animate-spin pointer-events-none" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-1 bg-[#D7F3F6] dark:bg-surface-container-high rounded-[1.75rem] z-0"></div>
            <Logo className="w-12 h-12 text-[#22B8CF] dark:text-primary relative z-10 transition-transform group-hover:scale-110 duration-500" />
          </div>
          
          <span className="inline-flex items-center text-[#22B8CF] dark:text-primary font-label-md text-xs bg-[#EAFBFC] dark:bg-primary/10 px-4 py-2 rounded-full border border-[#B7E9ED] dark:border-primary/20 uppercase tracking-widest font-bold shadow-sm">
            About Campus Compass
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-extrabold mt-8 tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            MIT Bengaluru Navigator
          </h2>
          <p className="text-slate-500 dark:text-on-surface-variant mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A premium, high-performance mapping solution designed to help students navigate the campus effortlessly.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          
          {/* Row 1: The Vision */}
          <div className="liquid-glass p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#22B8CF]/5 dark:bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#22B8CF]/10 dark:group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#EAFBFC] dark:bg-primary/10 flex items-center justify-center text-[#22B8CF] dark:text-primary mb-6 border border-[#B7E9ED] dark:border-primary/20">
                <span className="material-symbols-outlined text-[28px]">explore</span>
              </div>
              <h3 className="font-headline-md text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Our Purpose</h3>
              <p className="font-body-md text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl">
                Campus Compass is an interactive campus navigation platform designed and engineered by students, for students. It replaces the complex schematic maps with a smooth, modern vector-based layout that helps newcomers, visitors, and current students find academic classrooms, hostel wings, sports fields, cafeteria centers, and utility zones instantly.
              </p>
            </div>
          </div>

          {/* Row 2: V1 Milestones (Grid of 4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'center_focus_strong', title: 'Smart Bounds', desc: 'Lock bounds centered to MIT Bengaluru with fluid panning.' },
              { icon: 'location_on', title: 'Dynamic POIs', desc: 'Highlight all 26 campus POIs dynamically.' },
              { icon: 'map', title: 'Vector Engine', desc: 'Draggable, zoomable vector tile mapping.' },
              { icon: 'tune', title: 'Advanced Filters', desc: 'Search filters for academics, hostels, food, and sports.' }
            ].map((feature, idx) => (
              <div key={idx} className="liquid-glass p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-green-200 dark:border-green-500/20">
                  <span className="material-symbols-outlined text-[24px]">{feature.icon}</span>
                </div>
                <h4 className="font-headline-md text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-body-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{feature.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">V1 Active</span>
                  <span className="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Roadmap Timeline */}
          <div className="liquid-glass p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
            <h3 className="font-headline-md text-2xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary">rocket_launch</span>
              Roadmap & Future Features
            </h3>
            
            <div className="relative mt-8">
              {/* Timeline connecting line (hidden on mobile, visible on md+) */}
              <div className="absolute top-8 left-8 right-8 h-1 bg-slate-200 dark:bg-white/10 hidden md:block rounded-full">
                <div className="h-full bg-gradient-to-r from-[#22B8CF] via-purple-500 to-amber-500 w-1/3 opacity-50 blur-[1px]"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                {[
                  { v: 'V2', title: 'Live Location', desc: 'Integration of real-time GPS tracking and accuracy dot updates.', bg: 'bg-slate-50 dark:bg-surface-container', text: 'text-[#22B8CF] dark:text-primary', glow: 'text-[#22B8CF] dark:text-primary' },
                  { v: 'V3', title: 'Navigation', desc: 'Walking routes estimation, line drawing, and dynamic distance calculations.', bg: 'bg-slate-50 dark:bg-surface-container', text: 'text-purple-600 dark:text-purple-400', glow: 'text-purple-600 dark:text-purple-400' },
                  { v: 'V4', title: 'Indoor Maps', desc: 'Floor-by-floor classroom locator and indoor navigation markers.', bg: 'bg-slate-50 dark:bg-surface-container', text: 'text-amber-600 dark:text-amber-400', glow: 'text-amber-600 dark:text-amber-400' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 group flex flex-col items-center md:items-start">
                    <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.text} flex items-center justify-center font-headline-md text-xl font-bold mb-6 shadow-lg border border-slate-200 dark:border-white/10 ring-4 ring-white dark:ring-[#16233F] relative group-hover:-translate-y-1 transition-transform`}>
                      {step.v}
                      {/* Glow behind node */}
                      <div className={`absolute inset-0 bg-current opacity-20 blur-xl rounded-full ${step.glow}`}></div>
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{step.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Licenses, Credits & Disclaimer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Disclaimer */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 border border-amber-200 dark:border-amber-500/20">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white mb-3">Independent Initiative</h4>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Campus Compass is an independent student initiative and is not affiliated with, endorsed by, or officially maintained by MIT Bengaluru or MAHE.
              </p>
            </div>

            {/* License & Tech */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-200 dark:border-blue-500/20">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white mb-3">Licenses & Credits</h4>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Campus Compass is licensed under the <strong className="text-slate-900 dark:text-white">GNU Affero General Public License v3.0</strong>.
              </p>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Built with open-source technologies including React, TypeScript, Vite, Tailwind CSS, MapLibre GL JS, Three.js, and Supabase.
              </p>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed text-sm italic">
                Map data &copy; <a href="https://www.openstreetmap.org/copyright" className="hover:underline text-slate-900 dark:text-white" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors. 
                Vector basemap rendering by <a href="https://openfreemap.org/" className="hover:underline text-slate-900 dark:text-white" target="_blank" rel="noreferrer">OpenFreeMap</a>. 
                Satellite imagery provided by <a href="https://www.esri.com/" className="hover:underline text-slate-900 dark:text-white" target="_blank" rel="noreferrer">Esri</a>. 
                360&deg; virtual tour rendering powered by <a href="https://threejs.org/" className="hover:underline text-slate-900 dark:text-white" target="_blank" rel="noreferrer">Three.js</a>.
              </p>
            </div>
          </div>

          {/* Row 5: Open Source */}
          <div ref={ctaRef} tabIndex={0} className="relative w-full mx-auto group outline-none">
            {/* Glowing Aura Background */}
            <div className={`absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2.5rem] blur-xl transition duration-1000 group-hover:duration-500 ${isCtaVisible ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
            
            <div 
              className="relative bg-slate-900 dark:bg-gradient-to-br dark:from-surface-container-highest dark:to-surface rounded-[2rem] p-8 md:p-12 border border-slate-800 dark:border-white/10 shadow-2xl overflow-hidden group hover:border-slate-700 dark:hover:border-white/20 transition-colors"
              style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
              {/* Internal Ambient Glows */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 dark:bg-primary/30 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#D7F3F6]/10 dark:bg-secondary/30 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Glowing sweep */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#22B8CF]/30 dark:from-primary/30 to-transparent blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-label-sm text-xs uppercase tracking-widest font-bold mb-6 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Open Source
                  </div>
                  <h3 className="font-headline-lg text-3xl font-bold text-white mb-4 tracking-tight">Community Driven</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Campus Compass is completely open source. We welcome contributions, bug reports, and feature requests from anyone to help improve the campus experience.
                  </p>
                </div>
                
                <a 
                  href="https://github.com/JayeshRocks/Campus-Compass" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-label-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:scale-95 group/btn"
                >
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                  View Repository
                  <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
