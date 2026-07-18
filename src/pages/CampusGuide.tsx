import { useEffect, useRef, useState } from "react";

export default function CampusGuide() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${type} copied to clipboard!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    <div className="h-full w-full page-blobs page-scroll text-slate-900 dark:text-on-surface px-6 md:px-12 pb-6 md:pb-12 pt-24 md:pt-32 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-16 pb-8">
        {/* Campus Contacts Section */}
        <section className="animate-fade-in">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline-lg text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-on-surface tracking-tight mb-2">Campus Contacts</h2>
              <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-lg">Useful campus departments and emergency contacts available 24/7.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Admissions & Academics',
                icon: 'school',
                phone1: '+91 7411747070',
                phone2: '080 2449 4100',
                email: 'Admissions.maheblr@manipal.edu',
                isEmergency: false
              },
              {
                title: 'Hostels Information',
                icon: 'apartment',
                phone1: '080 2449 7217',
                phone2: '+91 8904178490',
                email: 'Hostels.maheblr@manipal.edu',
                isEmergency: false
              },
              {
                title: 'Parents Helpline (24/7)',
                icon: 'support_agent',
                phone1: '+91 9900034777',
                email: 'Hostels.maheblr@manipal.edu',
                isEmergency: true
              },
              {
                title: 'HBO-1 JM Complex',
                icon: 'location_city',
                phone1: '+91 9886660560',
                location: 'Bagalur Main Rd, Opp. Reva Univ.',
                isEmergency: false
              },
              {
                title: 'HBO-3 Shanti Bachan',
                icon: 'location_city',
                phone1: '+91 8884256562',
                location: 'Khushi Township, Bagalur Post',
                isEmergency: false
              }
            ].map((contact, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border-2 transition-all flex flex-col h-full group shadow-lg ${
                contact.isEmergency 
                  ? 'border-red-500/30 dark:border-error/30 hover:border-red-500 dark:hover:border-error'
                  : 'border-slate-200 dark:border-outline-variant/30 hover:border-[#5DCBDA] dark:hover:border-primary/50'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  contact.isEmergency
                    ? 'bg-red-50 dark:bg-error/10 text-red-600 dark:text-error'
                    : 'bg-[#EAFBFC] dark:bg-primary/10 text-[#22B8CF] dark:text-primary'
                }`}>
                  <span className="material-symbols-outlined">{contact.icon}</span>
                </div>
                <h4 className="font-headline-md text-xl font-bold mb-6">{contact.title}</h4>
                <div className="space-y-4 flex-1 mb-8">
                  {contact.phone1 && (
                    <div onClick={() => handleCopy(contact.phone1, 'Phone number')} className="flex items-start gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors group/copy">
                      <span className="material-symbols-outlined text-[18px] mt-0.5">call</span>
                      <span className={`flex-1 ${contact.isEmergency ? "text-red-600 dark:text-error font-bold" : ""}`}>{contact.phone1}</span>
                      <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/copy:opacity-100 transition-opacity">content_copy</span>
                    </div>
                  )}
                  {contact.phone2 && (
                    <div onClick={() => handleCopy(contact.phone2!, 'Phone number')} className="flex items-start gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors group/copy">
                      <span className="material-symbols-outlined text-[18px] mt-0.5">call</span>
                      <span className="flex-1">{contact.phone2}</span>
                      <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/copy:opacity-100 transition-opacity">content_copy</span>
                    </div>
                  )}
                  {contact.email && (
                    <div onClick={() => handleCopy(contact.email!, 'Email address')} className="flex items-start gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors group/copy">
                      <span className="material-symbols-outlined text-[18px] mt-0.5">mail</span>
                      <span className="break-all flex-1">{contact.email}</span>
                      <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/copy:opacity-100 transition-opacity">content_copy</span>
                    </div>
                  )}
                  {contact.location && (
                    <div onClick={() => handleCopy(contact.location!, 'Address')} className="flex items-start gap-3 text-slate-600 dark:text-on-surface-variant font-label-md text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors group/copy">
                      <span className="material-symbols-outlined text-[18px] mt-0.5">location_on</span>
                      <span className="flex-1 whitespace-normal break-words">{contact.location}</span>
                      <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/copy:opacity-100 transition-opacity">content_copy</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3 mt-auto">
                  <a className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-label-md font-bold transition-all shadow-md ${
                    contact.isEmergency
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
                      : 'bg-[#22B8CF] hover:bg-[#1A94A6] text-white shadow-[#22B8CF]/20'
                  }`} href={`tel:${contact.phone1.replace(/\s+/g, '')}`}>
                    <span className="material-symbols-outlined text-[18px]">{contact.isEmergency ? 'emergency' : 'call'}</span>
                    Call Now
                  </a>
                  {contact.email && (
                    <a className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-label-md transition-colors ${
                      contact.isEmergency
                        ? 'bg-red-50 hover:bg-red-100 text-red-700 dark:bg-surface-container-high dark:text-error dark:hover:bg-error/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-surface-container-high dark:hover:bg-primary/10 dark:text-primary'
                    }`} href={`mailto:${contact.email}`}>
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                      Send Email
                    </a>
                  )}
                </div>
              </div>
            ))}
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
              { icon: 'apartment', title: 'Hostel Guide', desc: 'Everything you need to know about hostel life.', accent: '#F5A356', tint: '#FBEADC', link: '/pdfs/Hostel Guide.pdf' },
              { icon: 'wifi', title: 'Wi-Fi Setup', desc: 'Connect your laptop and phone to campus Wi-Fi.', accent: '#5B6EF5', tint: '#E3E6FD', link: '/pdfs/iBus Wi-Fi Registration.pdf' },
              { icon: 'school', title: 'Academic Guide', desc: 'Detailed academic guidelines and procedures.', accent: '#9B8AFB', tint: '#ECE8FB', link: '/pdfs/Academic Guide.pdf' },
              { icon: 'calendar_month', title: 'Academic Calendar', desc: 'Official dates for semesters, exams, and holidays.', accent: '#10B981', tint: '#D1FAE5', link: '/pdfs/Academic Calendar.pdf' },
              { icon: 'menu_book', title: 'Campus Rules', desc: 'Important rules and transport guidelines.', accent: '#E8574F', tint: '#FBE1DF', link: '/pdfs/Campus Rules and Transport.pdf' },
              { icon: 'restaurant', title: 'Mess Timings', desc: 'Daily breakfast, lunch and dinner timings.', accent: '#4CAF7D', tint: '#E1F5EA', link: '/pdfs/Mess Timings.pdf' },
              { icon: 'groups', title: 'Student Clubs', desc: 'Explore technical, cultural and sports clubs.', accent: '#F06BA8', tint: '#FCE4EF', link: '/pdfs/Student Clubs.pdf' },
              { icon: 'help', title: 'Freshers FAQs', desc: 'Frequently asked questions for incoming freshers.', accent: '#22B8CF', tint: '#EAFBFC', link: '/pdfs/Freshers FAQs.pdf' },
              { icon: 'explore', title: 'Hidden Gems', desc: 'Discover secret spots and hidden campus gems.', accent: '#F3C93A', tint: '#FEF8E6', link: '/pdfs/Hidden Gems.pdf' }
            ].map((resource, idx) => (
              <a href={resource.link} target="_blank" rel="noopener noreferrer" key={idx} className="p-6 rounded-2xl bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 hover:border-[#5DCBDA] dark:hover:border-primary/50 transition-all flex flex-col group shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer block text-left">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: resource.tint, color: resource.accent }}
                >
                  <span className="material-symbols-outlined text-[24px]">{resource.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-on-surface mb-2">{resource.title}</h3>
                <p className="text-body-md text-slate-600 dark:text-on-surface-variant text-sm mb-6 flex-1">{resource.desc}</p>
                <div className="flex items-center gap-1 font-label-md font-semibold group-hover:gap-2 transition-all w-max mt-auto" style={{ color: resource.accent }}>
                  Read PDF <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </a>
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
              { title: "SLCM Portal", desc: "Student Life Cycle Management", link: "https://maheslcm.manipal.edu/login/" },
              { title: "Counseling Page", desc: "Student counseling and support", link: "https://counseling.manipal.edu" },
              { title: "MAHE Portal", desc: "Main Manipal university portal", link: "https://apply.manipal.edu" },
              { title: "EduVerify", desc: "Document verification portal", link: "https://maheblreduverify.manipal.edu" },
              { title: "Aarambh Portal", desc: "Get your orientation pass", link: "https://red-desert-068b4bb00.7.azurestaticapps.net/index.html" },
              { title: "iBus Wi-Fi", desc: "Campus Wi-Fi login portal", link: "https://wificustomer.ibustech.com/" }
            ].map((item, idx) => (
              <a href={item.link} target="_blank" rel="noopener noreferrer" key={idx} className="liquid-glass p-5 rounded-xl border border-slate-200 dark:border-outline-variant/30 hover:border-[#5DCBDA] dark:hover:border-primary/50 transition-all flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer">
                <div>
                  <h3 className="font-label-lg font-bold text-slate-900 dark:text-on-surface mb-1">{item.title}</h3>
                  <p className="text-label-sm text-slate-500 dark:text-on-surface-variant/70">{item.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-surface-container-high flex items-center justify-center text-slate-600 dark:text-on-surface-variant group-hover:bg-[#22B8CF] group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Help / Support Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div ref={ctaRef} tabIndex={0} className="mt-12 relative w-full mx-auto group outline-none">
            {/* Glowing Aura Background */}
            <div className={`absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2.5rem] blur-xl transition duration-1000 group-hover:duration-500 ${isCtaVisible ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
            
            {/* Premium Glass Card */}
            <div 
              className="relative rounded-[2rem] bg-gradient-to-br from-[#22B8CF] to-[#16233F] dark:from-surface/90 dark:to-surface/90 backdrop-blur-2xl p-8 md:p-12 text-center shadow-2xl border border-[#22B8CF]/40 dark:border-white/10 overflow-hidden dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
              {/* Internal Ambient Glows */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/20 dark:bg-primary/40 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#D7F3F6]/20 dark:bg-secondary/40 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-surface-container/50 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20">
                  <span className="material-symbols-outlined text-[32px]">help_center</span>
                </div>
                <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Still have questions?</h2>
                <p className="text-body-lg text-white/90 dark:text-slate-300 text-lg mb-8 max-w-lg">
                  Reach out to the student team for assistance or feedback on the platform.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <a href="mailto:CampusCompass.mitblr@gmail.com" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-primary hover:bg-slate-50 dark:hover:bg-primary dark:hover:brightness-110 text-[#1A94A6] dark:text-on-primary rounded-xl font-label-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 group/btn">
                    <span className="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">chat</span>
                    Contact Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-lg font-label-md z-[200] animate-fade-in flex items-center gap-2 backdrop-blur-md whitespace-nowrap">
          <span className="material-symbols-outlined text-[18px]">content_copy</span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
