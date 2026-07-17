import { Logo } from "../components/ui/Logo";

export default function About() {
  return (
    <div className="h-full w-full page-blobs text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16233F]/50 pointer-events-none hidden dark:block"></div>
      <div className="max-w-3xl mx-auto relative z-10 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-[#D7F3F6] dark:bg-primary-container/20 mx-auto flex items-center justify-center mb-8 border border-[#B7E9ED] dark:border-primary/30 relative shadow-xl">
            <div className="absolute inset-0 bg-[#5DCBDA]/20 dark:bg-primary/10 blur-xl rounded-full"></div>
            <Logo className="w-10 h-10 text-[#22B8CF] dark:text-primary relative z-10" />
          </div>
          <span className="text-[#22B8CF] dark:text-primary font-label-md text-[11px] bg-[#EAFBFC] dark:bg-primary/10 px-4 py-1.5 rounded-full border border-[#B7E9ED] dark:border-primary/20 uppercase tracking-widest font-bold">
            About Campus Compass
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl font-bold text-slate-900 dark:text-on-surface mt-6 tracking-tight">
            MIT Bengaluru Campus Navigator
          </h2>
          <p className="text-slate-500 dark:text-on-surface-variant mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            A premium, high-performance mapping solution designed to help students navigate the campus effortlessly.
          </p>
        </div>

        <div className="space-y-8 bg-white/80 dark:bg-surface-container-lowest/80 backdrop-blur-xl border border-slate-200 dark:border-outline-variant/30 rounded-[2rem] p-8 md:p-10 shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <section>
            <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary bg-[#EAFBFC] dark:bg-primary/10 p-2 rounded-xl">explore</span>
              Our Purpose
            </h3>
            <p className="font-body-md text-slate-600 dark:text-on-surface-variant text-base leading-relaxed">
              Campus Compass is an interactive campus navigation platform designed and engineered by students, for students. It replaces the complex schematic maps with a smooth, modern vector-based layout that helps newcomers, visitors, and current students find academic classrooms, hostel wings, sports fields, cafeteria centers, and utility zones instantly.
            </p>
          </section>

          <section className="border-t border-slate-200 dark:border-outline-variant/20 pt-8">
            <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary bg-[#EAFBFC] dark:bg-primary/10 p-2 rounded-xl">widgets</span>
              Version 1 Milestones (Active)
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-on-surface-variant">
              <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-surface-container/50 border border-slate-100 dark:border-white/5 transition-colors hover:border-[#B7E9ED] dark:hover:border-primary/20">
                <span className="material-symbols-outlined text-green-500 text-[20px] mt-0.5">check_circle</span>
                <span className="leading-snug">Lock bounds centered to MIT Bengaluru with fluid panning.</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-surface-container/50 border border-slate-100 dark:border-white/5 transition-colors hover:border-[#B7E9ED] dark:hover:border-primary/20">
                <span className="material-symbols-outlined text-green-500 text-[20px] mt-0.5">check_circle</span>
                <span className="leading-snug">Highlight all 26 campus POIs dynamically.</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-surface-container/50 border border-slate-100 dark:border-white/5 transition-colors hover:border-[#B7E9ED] dark:hover:border-primary/20">
                <span className="material-symbols-outlined text-green-500 text-[20px] mt-0.5">check_circle</span>
                <span className="leading-snug">Draggable, zoomable vector tile mapping.</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-surface-container/50 border border-slate-100 dark:border-white/5 transition-colors hover:border-[#B7E9ED] dark:hover:border-primary/20">
                <span className="material-symbols-outlined text-green-500 text-[20px] mt-0.5">check_circle</span>
                <span className="leading-snug">Search filters for academics, hostels, food, and sports.</span>
              </li>
            </ul>
          </section>

          <section className="border-t border-slate-200 dark:border-outline-variant/20 pt-8">
            <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#22B8CF] dark:text-primary bg-[#EAFBFC] dark:bg-primary/10 p-2 rounded-xl">navigation</span>
              Roadmap (Future Implementations)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 dark:bg-surface-container-high/40 p-5 rounded-2xl border border-slate-200 dark:border-outline-variant/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <h4 className="font-bold text-slate-900 dark:text-on-surface mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D7F3F6] dark:bg-primary/20 flex items-center justify-center text-[10px] font-bold text-[#22B8CF] dark:text-primary">V2</span>
                  Live Location
                </h4>
                <p className="text-slate-500 dark:text-on-surface-variant leading-relaxed text-[13px]">Integration of real-time GPS tracking and accuracy dot updates.</p>
              </div>
              <div className="bg-slate-50 dark:bg-surface-container-high/40 p-5 rounded-2xl border border-slate-200 dark:border-outline-variant/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <h4 className="font-bold text-slate-900 dark:text-on-surface mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-600 dark:text-purple-400">V3</span>
                  Navigation
                </h4>
                <p className="text-slate-500 dark:text-on-surface-variant leading-relaxed text-[13px]">Walking routes estimation, line drawing, and dynamic distance calculations.</p>
              </div>
              <div className="bg-slate-50 dark:bg-surface-container-high/40 p-5 rounded-2xl border border-slate-200 dark:border-outline-variant/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <h4 className="font-bold text-slate-900 dark:text-on-surface mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-600 dark:text-amber-400">V4</span>
                  Indoor Maps
                </h4>
                <p className="text-slate-500 dark:text-on-surface-variant leading-relaxed text-[13px]">Floor-by-floor classroom locator and indoor navigation markers.</p>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 dark:border-outline-variant/20 pt-8">
            <div className="bg-slate-50 dark:bg-surface-container/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200 dark:border-outline-variant/30 relative overflow-hidden group hover:border-[#B7E9ED] dark:hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#22B8CF]/5 dark:bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#22B8CF]/10 dark:group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface mb-2">Open Source Community</h3>
                <p className="text-slate-500 dark:text-on-surface-variant text-sm max-w-md leading-relaxed">
                  Campus Compass is completely open source. We welcome contributions, bug reports, and feature requests from anyone to help improve the campus experience.
                </p>
              </div>
              
              <a 
                href="https://github.com/JayeshRocks/Campus-Compass" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:brightness-110 text-white dark:text-on-primary rounded-xl font-label-md font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group/btn whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
                View Repository
                <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
