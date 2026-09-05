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
      
      <div className="max-w-5xl mx-auto relative z-10 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in relative pt-16 md:pt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="w-24 h-24 rounded-[2rem] bg-[#D7F3F6] dark:bg-surface-container-high/50 mx-auto flex items-center justify-center mb-8 border border-[#B7E9ED] dark:border-white/10 relative shadow-2xl overflow-hidden group">
            {/* Spinning Aura */}
            <div className="absolute -inset-10 bg-gradient-to-br from-[#22B8CF] via-transparent to-[#9B8AFB] opacity-30 animate-spin pointer-events-none" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-1 bg-[#D7F3F6] dark:bg-surface-container-high rounded-[1.75rem] z-0"></div>
            <Logo className="w-12 h-12 text-[#22B8CF] dark:text-primary relative z-10 transition-transform group-hover:scale-110 duration-500" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center text-[#22B8CF] dark:text-primary font-label-md text-xs bg-[#EAFBFC] dark:bg-primary/10 px-3.5 py-1.5 rounded-full border border-[#B7E9ED] dark:border-primary/20 uppercase tracking-widest font-bold shadow-sm">
              About Campus Compass
            </span>
            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-label-md text-xs bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 font-semibold gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Platform
            </span>
          </div>

          <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            MIT Bengaluru Navigator
          </h1>
          <p className="text-slate-500 dark:text-on-surface-variant mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The next-generation spatial guide and 360° virtual tour for students, faculty, and visitors at MAHE Bengaluru.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          
          {/* Row 1: The Purpose & Mission */}
          <div className="liquid-glass p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#22B8CF]/5 dark:bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#22B8CF]/10 dark:group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#EAFBFC] dark:bg-primary/10 flex items-center justify-center text-[#22B8CF] dark:text-primary mb-6 border border-[#B7E9ED] dark:border-primary/20">
                <span className="material-symbols-outlined text-[28px]">explore</span>
              </div>
              <h2 className="font-headline-md text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Our Purpose</h2>
              <p className="font-body-md text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-4xl">
                Campus Compass is an interactive 3D navigation and spatial discovery platform designed and engineered by students, for students. It replaces confusing static PDF maps with an intelligent, responsive vector interface that helps freshmen, visitors, and campus community members locate academic departments, hostel blocks, sports complexes, food courts, and campus facilities in seconds.
              </p>
            </div>
          </div>

          {/* Row 2: Live Platform Features */}
          <div>
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="font-headline-md text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary">auto_awesome</span>
                Active Core Features
              </h2>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Production Release
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "360",
                  title: "360° Virtual Campus Tour",
                  desc: "High-resolution equirectangular campus photography rendered via Three.js with device motion gyroscope support, touch momentum, and pinch zoom.",
                  badge: "360° Viewer",
                  color: "from-cyan-500/20 to-blue-500/20",
                  iconColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20",
                },
                {
                  icon: "directions_walk",
                  title: "Turn-by-Turn Navigation",
                  desc: "Pedestrian routing calculated across actual campus pathways with distance metrics, estimated walking times, and directional step-by-step HUD guides.",
                  badge: "Routing Engine",
                  color: "from-emerald-500/20 to-teal-500/20",
                  iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
                },
                {
                  icon: "my_location",
                  title: "Live GPS & Heading Tracking",
                  desc: "Real-time location detection with dynamic accuracy rings, auto-centering, and compass heading orientation for confident navigation.",
                  badge: "GPS Geolocation",
                  color: "from-blue-500/20 to-indigo-500/20",
                  iconColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
                },
                {
                  icon: "view_in_ar",
                  title: "3D Perspective & Satellite",
                  desc: "Seamless switching between 3D building extrusions, high-resolution Esri satellite imagery, and high-contrast dark/light vector basemaps.",
                  badge: "MapLibre 3D",
                  color: "from-purple-500/20 to-pink-500/20",
                  iconColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20",
                },
                {
                  icon: "manage_search",
                  title: "Campus Directory & Search",
                  desc: "Fast, debounced search across all 26+ campus buildings, department faculties, hostel blocks, medical centers, and sports venues.",
                  badge: "Spatial Directory",
                  color: "from-amber-500/20 to-orange-500/20",
                  iconColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
                },
                {
                  icon: "feedback",
                  title: "In-App Feedback System",
                  desc: "Direct feedback and bug reporting integrated with Supabase edge storage and GitHub issue generation for continuous community improvements.",
                  badge: "Community Loop",
                  color: "from-rose-500/20 to-red-500/20",
                  iconColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20",
                },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="liquid-glass p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300 ${feat.iconColor}`}>
                        <span className="material-symbols-outlined text-[24px]">{feat.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 uppercase tracking-wider">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-body-sm text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active in Production
                    </span>
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Roadmap Timeline */}
          <div className="liquid-glass p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
              <h2 className="font-headline-md text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary">rocket_launch</span>
                Next Horizons & Roadmap
              </h2>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Upcoming Enhancements
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  phase: "Upcoming",
                  title: "Indoor Floor Mapping",
                  desc: "Floor-by-floor classroom, laboratory, and faculty office locators inside Academic Blocks.",
                  icon: "layers",
                  color: "text-[#22B8CF] dark:text-primary bg-[#EAFBFC] dark:bg-primary/10 border-[#B7E9ED] dark:border-primary/20",
                },
                {
                  phase: "Planned",
                  title: "Live Campus Events",
                  desc: "Real-time venue pins for tech fests, cultural nights, sports tournaments, and club activities.",
                  icon: "event",
                  color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20",
                },
                {
                  phase: "Planned",
                  title: "Accessible Step-Free Routes",
                  desc: "Elevation-aware walking path calculations with ramp and elevator priority for accessibility.",
                  icon: "accessible",
                  color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
                },
                {
                  phase: "Planned",
                  title: "Offline PWA Storage",
                  desc: "Offline tile caching and building lookup for seamless navigation even during weak network zones.",
                  icon: "wifi_off",
                  color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20",
                },
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-50/50 dark:bg-surface-container/50 p-6 rounded-2xl border border-slate-200/80 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-white dark:bg-white/5 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10">
                        {step.phase}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Licenses, Credits & Disclaimer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Disclaimer */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 border border-amber-200 dark:border-amber-500/20">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white mb-3">Independent Initiative</h3>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Campus Compass is an independent student initiative created to enhance campus mobility. It is not affiliated with, endorsed by, or officially operated by Manipal Institute of Technology (MIT) Bengaluru or Manipal Academy of Higher Education (MAHE).
              </p>
            </div>

            {/* License & Tech Credits */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-200 dark:border-blue-500/20">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white mb-3">Licenses & Attributions</h3>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 text-sm">
                Campus Compass is licensed under the <strong className="text-slate-900 dark:text-white">GNU Affero General Public License v3.0 (AGPL-3.0)</strong>.
              </p>
              <p className="text-body-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 text-xs">
                Built with open-source technologies including React 19, TypeScript, Vite, Tailwind CSS, MapLibre GL JS, Three.js, and Supabase.
              </p>
              <p className="text-body-sm text-slate-500 dark:text-slate-400 leading-relaxed text-xs italic">
                Map data &copy; <a href="https://www.openstreetmap.org/copyright" className="hover:underline text-slate-900 dark:text-white font-medium" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors. 
                Vector basemaps by <a href="https://openfreemap.org/" className="hover:underline text-slate-900 dark:text-white font-medium" target="_blank" rel="noreferrer">OpenFreeMap</a>. 
                Satellite tiles provided by <a href="https://www.esri.com/" className="hover:underline text-slate-900 dark:text-white font-medium" target="_blank" rel="noreferrer">Esri</a>. 
                360&deg; virtual tour rendering powered by <a href="https://threejs.org/" className="hover:underline text-slate-900 dark:text-white font-medium" target="_blank" rel="noreferrer">Three.js (MIT)</a>.
              </p>
            </div>
          </div>

          {/* Row 5: Open Source Community CTA */}
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
                  <h2 className="font-headline-lg text-3xl font-bold text-white mb-4 tracking-tight">Community Driven</h2>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    Campus Compass is 100% open source under the AGPL-3.0 license. We welcome contributions, bug reports, feature suggestions, and pull requests from students and developers across the world.
                  </p>
                </div>
                
                <a 
                  href="https://github.com/JayeshRocks/Campus-Compass" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-label-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:scale-95 group/btn cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                  View on GitHub
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
