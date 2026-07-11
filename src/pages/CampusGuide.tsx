export default function CampusGuide() {
  return (
    <div className="h-full w-full bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-16 pb-24">
        {/* Campus Contacts Section */}
        <section className="animate-fade-in">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline-lg text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-on-surface tracking-tight mb-2">Campus Contacts</h2>
              <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-lg">Useful campus departments and emergency contacts available 24/7.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Contact Card 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 hover:border-blue-400 dark:hover:border-primary/50 transition-all flex flex-col h-full group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center text-blue-600 dark:text-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined">concierge</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold mb-6">Main Reception</h4>
              <div className="space-y-4 flex-1 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>+91 80 2449 4100</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span className="truncate">reception.mitb@mahe.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Admin Block, G Floor</span>
                </div>
              </div>
              <div className="space-y-3 mt-auto">
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-label-md font-bold transition-all shadow-md shadow-blue-600/20" href="tel:+918024494100">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Now
                </a>
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-surface-container-high dark:hover:bg-primary/10 dark:text-primary rounded-xl font-label-md transition-colors" href="mailto:reception.mitb@mahe.edu">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Send Email
                </a>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 hover:border-blue-400 dark:hover:border-primary/50 transition-all flex flex-col h-full group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center text-blue-600 dark:text-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined">school</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold mb-6">Academic Office</h4>
              <div className="space-y-4 flex-1 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>+91 80 2449 4120</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span className="truncate">academics.mitb@mahe.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Academic Block A, 1st Flr</span>
                </div>
              </div>
              <div className="space-y-3 mt-auto">
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-label-md font-bold transition-all shadow-md shadow-blue-600/20" href="tel:+918024494120">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Now
                </a>
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-surface-container-high dark:hover:bg-primary/10 dark:text-primary rounded-xl font-label-md transition-colors" href="mailto:academics.mitb@mahe.edu">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Send Email
                </a>
              </div>
            </div>

            {/* Contact Card 3 (Emergency) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border-2 border-red-500/30 dark:border-error/30 hover:border-red-500 dark:hover:border-error transition-all flex flex-col h-full group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-error/10 flex items-center justify-center text-red-600 dark:text-error mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold mb-6">Security Office</h4>
              <div className="space-y-4 flex-1 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span className="text-red-600 dark:text-error font-bold">+91 80 2449 4111</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="truncate">security.mitb@mahe.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Main Gate, Security Post</span>
                </div>
              </div>
              <div className="space-y-3 mt-auto">
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-label-md font-bold transition-all shadow-md shadow-red-600/20" href="tel:+918024494111">
                  <span className="material-symbols-outlined text-[18px]">emergency</span>
                  Emergency Call
                </a>
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-surface-container-high dark:text-error dark:hover:bg-error/10 rounded-xl font-label-md transition-colors" href="mailto:security.mitb@mahe.edu">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Send Email
                </a>
              </div>
            </div>

            {/* Contact Card 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 hover:border-blue-400 dark:hover:border-primary/50 transition-all flex flex-col h-full group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center text-blue-600 dark:text-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold mb-6">Medical Centre</h4>
              <div className="space-y-4 flex-1 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>+91 80 2449 4999</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">healing</span>
                  <span className="truncate">health.mitb@mahe.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Health Wing, Hostel B</span>
                </div>
              </div>
              <div className="space-y-3 mt-auto">
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-label-md font-bold transition-all shadow-md shadow-blue-600/20" href="tel:+918024494999">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Now
                </a>
                <a className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-surface-container-high dark:hover:bg-primary/10 dark:text-primary rounded-xl font-label-md transition-colors" href="mailto:health.mitb@mahe.edu">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Essential Resources Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="mb-8">
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-slate-900 dark:text-on-surface tracking-tight mb-2">Essential Resources</h2>
            <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-lg">Quick guides to help you navigate campus life.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'apartment', title: 'Hostel Guide', desc: 'Everything you need to know about hostel life.' },
              { icon: 'wifi', title: 'Wi-Fi Setup', desc: 'Connect your laptop and phone to campus Wi-Fi.' },
              { icon: 'app_registration', title: 'Registration', desc: 'Steps for academic registration and orientation.' },
              { icon: 'menu_book', title: 'Campus Rules', desc: 'Important rules and student guidelines.' },
              { icon: 'restaurant', title: 'Mess Timings', desc: 'Daily breakfast, lunch and dinner timings.' },
              { icon: 'groups', title: 'Student Clubs', desc: 'Explore technical, cultural and sports clubs.' }
            ].map((resource, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 hover:border-blue-400 dark:hover:border-primary/50 transition-all flex flex-col group shadow-md hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center text-blue-600 dark:text-primary mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <span className="material-symbols-outlined text-[24px]">{resource.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface mb-2">{resource.title}</h3>
                <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-sm mb-6 flex-1">{resource.desc}</p>
                <a href="#" className="flex items-center gap-1 font-label-md font-semibold text-blue-600 dark:text-primary hover:gap-2 transition-all w-max mt-auto">
                  Learn More <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access Links Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="mb-8 border-t border-slate-200 dark:border-white/10 pt-12">
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-slate-900 dark:text-on-surface tracking-tight mb-2">Quick Access</h2>
            <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-lg">Direct links to frequently used portals and documents.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Academic Calendar", "Hostel Rules", "Student Portal",
              "Exam Schedule", "Library", "Campus Directory"
            ].map((link, idx) => (
              <a href="#" key={idx} className="liquid-glass p-5 rounded-xl border border-slate-200 dark:border-outline-variant/30 hover:border-blue-400 dark:hover:border-primary/50 transition-all flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer">
                <div>
                  <h3 className="font-label-lg font-bold text-slate-900 dark:text-on-surface mb-1">{link}</h3>
                  <p className="text-label-sm text-slate-500 dark:text-on-surface-variant/70">Open resource</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-surface-container-high flex items-center justify-center text-slate-600 dark:text-on-surface-variant group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Help / Support Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-primary/20 dark:to-indigo-500/10 p-8 md:p-12 text-center shadow-xl border border-blue-500/20 dark:border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 dark:bg-cyan-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-surface-container/50 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20">
                <span className="material-symbols-outlined text-[32px]">help_center</span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-white mb-4">Still have questions?</h2>
              <p className="text-body-lg text-blue-100 dark:text-on-surface-variant text-lg mb-8 max-w-lg">
                Reach out to the student team for assistance, or continue exploring the interactive campus map.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <a href="mailto:support.mitb@mahe.edu" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-primary hover:bg-slate-50 dark:hover:bg-primary/90 text-blue-700 dark:text-on-primary rounded-xl font-label-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">chat</span>
                  Contact Team
                </a>
                <a href="/" className="w-full sm:w-auto px-8 py-3.5 bg-blue-700/50 hover:bg-blue-800/60 dark:bg-surface-container/50 dark:hover:bg-surface-container-high/60 backdrop-blur-md text-white border border-white/20 rounded-xl font-label-lg font-bold transition-all flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">map</span>
                  Open Campus Map
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
