import { useEffect, useRef, useState } from "react";
import teamData from "../data/team.json";

interface Contributor {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  avatar: string;
  batch: string;
  batchTitle: string;
}

export default function MeetTeam() {
  const contributors = teamData as Contributor[];

  // Group contributors by batch
  const groupedContributors = contributors.reduce((acc, contributor) => {
    if (!acc[contributor.batch]) {
      acc[contributor.batch] = {
        title: contributor.batchTitle,
        members: [],
      };
    }
    acc[contributor.batch].members.push(contributor);
    return acc;
  }, {} as Record<string, { title: string; members: Contributor[] }>);

  // Sort batches descending (e.g. 2027, 2026...) or ascending. Let's do ascending for this context (2026, 2027)
  const sortedBatches = Object.keys(groupedContributors).sort();

  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  // We rely purely on CSS animations (fadeInUp) for entry to ensure smooth and glitch-free scrolling.
  // IntersectionObserver was causing aggressive fading out when scrolling past sections.
  useEffect(() => {
    // Only track visibility for the CTA card to trigger its glow on mobile
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the card is visible
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full page-blobs page-scroll px-6 md:px-12 pb-0 md:pb-12 overflow-y-auto relative">
      <style>{`
        .team-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #2563eb, transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .team-card:hover::before {
          transform: scaleX(1);
        }
        .glow-overlay {
          position: absolute;
          top: -20%;
          left: 50%;
          width: 140%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .team-card:hover .glow-overlay {
          opacity: 1;
        }
        .sticky-header {
          position: sticky;
          top: 80px; /* 64px header + 16px breathing room */
          z-index: 50;
          transition: all 0.3s ease;
          pointer-events: none; /* Empty space around the island shouldn't block clicks */
        }
        .sticky-header > div {
          pointer-events: auto; /* Re-enable clicks for the actual pill */
        }
        .batch-section {
          /* Handled by fadeInUp animation */
        }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto w-full text-center mb-16 space-y-6 animate-fade-in pt-28 md:pt-32">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container font-label-md text-label-md uppercase tracking-widest">
          The Minds Behind It
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl lg:text-[48px] font-bold text-slate-900 dark:text-on-surface">
          Meet the Team
        </h1>
        <p className="font-body-lg text-lg text-slate-600 dark:text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Built by students, for students. Meet the creative and technical forces who designed and engineered the platform, organized by their joining batches.
        </p>
      </div>

      {/* Batches */}
      <div className="max-w-6xl mx-auto flex flex-col items-center pb-24">
        {sortedBatches.map((batch, batchIndex) => (
          <section
            key={batch}
            className="batch-section max-w-6xl w-full mb-20 relative"
            style={{ animation: `fadeInUp 0.8s ease forwards ${batchIndex * 0.2}s`, opacity: 0, transform: "translateY(20px)" }}
          >
            <div className="sticky-header mb-10 flex justify-center w-full px-4 sm:px-0">
              <div className="flex items-center justify-between w-full max-w-4xl px-6 md:px-8 py-4 bg-white/70 dark:bg-[#1a2b4c]/70 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(34,184,207,0.15)] ring-1 ring-black/5 dark:ring-white/5 transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_rgba(34,184,207,0.25)]">
                <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold flex items-center gap-3">
                  {batch === "2027" && <span className="material-symbols-outlined text-[#22B8CF] dark:text-[#5DCBDA]">history</span>}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22B8CF] to-blue-500 dark:from-[#5DCBDA] dark:to-[#8BE9FD] drop-shadow-sm">
                    {batch}
                  </span>
                </h2>
                <span className="font-label-md px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-700 dark:text-slate-100 border border-slate-200/50 dark:border-white/5 shadow-sm backdrop-blur-md">
                  {groupedContributors[batch].title}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
              {groupedContributors[batch].members.map((member, index) => (
                  <div
                    key={member.id}
                    className="team-card bg-white/80 dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 rounded-3xl flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 group"
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.1 + 0.2}s`,
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  <div className="glow-overlay"></div>
                  <div className="p-8 pb-6 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors"></div>
                      <div className="w-32 h-32 rounded-full ring-4 ring-primary-container p-1 bg-surface-container relative z-10 overflow-hidden">
                        <img
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563eb&color=fff&size=256`}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563eb&color=fff&size=256`;
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl text-slate-900 dark:text-on-surface mb-2 relative z-10">{member.name}</h3>
                    <span className="bg-[#22B8CF]/10 dark:bg-primary-container/10 text-[#0E7C92] dark:text-primary-container font-label-sm text-xs px-4 py-1.5 rounded-full mb-4 relative z-10 tracking-wide font-medium">
                      {member.role}
                    </span>
                    <p className="font-body-md text-slate-600 dark:text-on-surface-variant leading-relaxed text-sm mb-6 flex-1 relative z-10">
                      {member.bio}
                    </p>
                  </div>
                  
                  <div className="w-full mt-auto border-t border-slate-200 dark:border-outline-variant/30 p-4 flex justify-center gap-6 relative z-10 bg-slate-50/50 dark:bg-surface-container-lowest/50">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 dark:text-on-surface-variant hover:text-[#22B8CF] dark:hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="material-symbols-outlined text-[20px] group-hover/link:scale-110 transition-transform">
                          {member.github.includes("dribbble") ? "palette" : member.github.includes("kaggle") ? "analytics" : "terminal"}
                        </span>
                        <span className="font-label-sm text-xs font-medium">
                          {member.github.includes("dribbble") ? "Dribbble" : member.github.includes("kaggle") ? "Kaggle" : "GitHub"}
                        </span>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 dark:text-on-surface-variant hover:text-[#22B8CF] dark:hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="material-symbols-outlined text-[20px] group-hover/link:scale-110 transition-transform">hub</span>
                        <span className="font-label-sm text-xs font-medium">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div ref={ctaRef} tabIndex={0} className="mt-16 relative max-w-4xl w-full mx-auto animate-fade-in group md:mb-12 outline-none">
          {/* Glowing Aura Background */}
          <div className={`absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-[3rem] blur-xl transition duration-1000 group-hover:duration-500 ${isCtaVisible ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
          
          {/* Premium Glass Card */}
          <div 
            className="relative p-12 sm:p-16 bg-white/80 dark:bg-surface/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-white/10 text-center overflow-hidden shadow-2xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          >
            
            {/* Internal Ambient Glows */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/40 dark:bg-primary/40 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/40 dark:bg-secondary/40 blur-[80px] rounded-full pointer-events-none" />

            {/* Content */}
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 relative z-10 tracking-tight">
              Want to join the mission?
            </h2>
            <p className="font-body-md text-lg text-slate-600 dark:text-slate-300 mb-10 relative z-10 max-w-2xl mx-auto">
              We're always looking for talented MIT Bengaluru students to help expand our navigation ecosystem.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="bg-red-50 text-red-600 dark:bg-error/10 dark:text-error text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest border border-red-200 dark:border-error/20 shadow-sm backdrop-blur-md">
                Currently Not Available
              </div>
              <button 
                disabled
                className="bg-white dark:bg-primary enabled:hover:bg-slate-50 dark:enabled:hover:bg-primary dark:enabled:hover:brightness-110 text-[#1A94A6] dark:text-on-primary font-headline-md text-lg px-10 py-4 rounded-2xl cursor-not-allowed opacity-60 font-bold shadow-lg transition-all"
              >
                Apply for Internship
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
