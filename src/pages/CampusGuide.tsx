export default function CampusGuide() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-16">
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
      </div>
    </div>
  );
}
