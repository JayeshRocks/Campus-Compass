import { useEffect } from "react";
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

  // We rely purely on CSS animations (fadeInUp) for entry to ensure smooth and glitch-free scrolling.
  // IntersectionObserver was causing aggressive fading out when scrolling past sections.
  useEffect(() => {
    // No-op or handle anything else needed in the future
  }, []);

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-[#020617] px-6 md:px-12 pb-6 md:pb-12 overflow-y-auto relative">
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
          top: -1px; /* Sticks to the top of this scrolling container */
          z-index: 50;
          transition: all 0.3s ease;
        }
        .batch-section {
          /* Handled by fadeInUp animation */
        }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto w-full text-center mb-16 space-y-6 animate-fade-in pt-14 md:pt-20">
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
            <div className="sticky-header py-6 bg-slate-50/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-slate-200 dark:border-blue-500/40 mb-8 flex items-center justify-between">
              <h2 className="font-headline-lg text-3xl font-bold text-blue-600 dark:text-blue-200 flex items-center gap-3 shadow-sm">
                {batch === "2027" && <span className="material-symbols-outlined text-blue-500 dark:text-blue-400">history</span>}
                {batch}
              </h2>
              <span className="font-label-md text-slate-500 dark:text-on-surface-variant">{groupedContributors[batch].title}</span>
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
                    <span className="bg-primary-container/10 text-primary-container font-label-sm text-xs px-4 py-1.5 rounded-full mb-4 relative z-10 tracking-wide font-medium">
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
                        className="text-slate-500 dark:text-on-surface-variant hover:text-blue-600 dark:hover:text-primary transition-colors flex items-center gap-2 group/link"
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
                        className="text-slate-500 dark:text-on-surface-variant hover:text-blue-600 dark:hover:text-primary transition-colors flex items-center gap-2 group/link"
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

        {/* Call to Action */}
        <div className="mt-12 p-12 bg-white/60 dark:bg-surface-container-high/30 rounded-3xl border border-slate-200 dark:border-outline-variant/20 max-w-4xl w-full text-center relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          <h2 className="font-headline-lg text-3xl font-bold text-slate-900 dark:text-on-surface mb-4 relative z-10">Want to join the mission?</h2>
          <p className="font-body-md text-slate-600 dark:text-on-surface-variant mb-8 relative z-10">
            We're always looking for talented MIT Bengaluru students to help expand our navigation ecosystem.
          </p>
          <div className="flex flex-col items-center gap-3 mt-2">
            <div className="bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-200 dark:border-red-500/20">
              Currently Not Available
            </div>
            <button 
              disabled
              className="bg-slate-100 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500 font-headline-md text-lg px-8 py-3.5 rounded-xl cursor-not-allowed font-medium border border-slate-200 dark:border-slate-700/50 transition-all"
            >
              Apply for Internship
            </button>
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
