export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#020617] text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-label-md text-label-md bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            About Campus Compass
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-4 tracking-tight">
            MIT Bengaluru Campus Navigator
          </h2>
        </div>

        <div className="space-y-8 bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-xl">
          <section>
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">explore</span>
              Our Purpose
            </h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Campus Compass is an interactive campus navigation platform designed and engineered by students, for students. It replaces the complex schematic maps with a smooth, modern vector-based layout that helps newcomers, visitors, and current students find academic classrooms, hostel wings, sports fields, cafeteria centers, and utility zones instantly.
            </p>
          </section>

          <section className="border-t border-outline-variant/20 pt-6">
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">widgets</span>
              Version 1 Milestones (Active)
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                <span>Lock bounds centered to MIT Bengaluru.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                <span>Highlight all 26 campus POIs dynamically.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                <span>Draggable, zoomable vector tile mapping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                <span>Search filters for academics, hostels, food, and sports.</span>
              </li>
            </ul>
          </section>

          <section className="border-t border-outline-variant/20 pt-6">
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">navigation</span>
              Roadmap (Future Implementations)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-1">Version 2: Live Location</h4>
                <p className="text-on-surface-variant leading-tight">Integration of real-time GPS tracking and accuracy dot updates.</p>
              </div>
              <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-1">Version 3: Navigation</h4>
                <p className="text-on-surface-variant leading-tight">Walking routes estimation, line drawing, and dynamic distance calculations.</p>
              </div>
              <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-1">Version 4: Indoor Maps</h4>
                <p className="text-on-surface-variant leading-tight">Floor-by-floor classroom locator and indoor navigation markers.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
