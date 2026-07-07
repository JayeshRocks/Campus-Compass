import { Logo } from "../components/ui/Logo";
import teamData from "../data/team.json";

interface Contributor {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  avatar: string;
}

export default function MeetTeam() {
  const contributors = teamData as Contributor[];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
        <div className="flex justify-center mb-6">
          <Logo className="w-16 h-16 text-blue-600 dark:text-blue-500" />
        </div>
        <span className="text-blue-600 dark:text-primary font-label-md text-label-md bg-blue-50 dark:bg-primary/10 px-4 py-1.5 rounded-full border border-blue-200 dark:border-primary/20 animate-fade-in">
          The Minds Behind It
        </span>
        <h2 className="font-headline-lg text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-on-surface mt-6 tracking-tight">
          Meet the Team
        </h2>
        <p className="font-body-lg text-lg text-slate-600 dark:text-on-surface-variant mt-4 max-w-2xl mx-auto">
          Campus Compass is built by students, for students. Meet the creative and technical forces who designed and engineered the platform.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {contributors.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            {/* Elegant Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-primary/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full mb-6 ring-4 ring-slate-50 dark:ring-surface group-hover:ring-blue-100 dark:group-hover:ring-primary/20 transition-all duration-300">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=256`}
                alt={member.name}
                className="w-full h-full object-cover rounded-full shadow-inner bg-slate-100 dark:bg-surface-container-high"
                onError={(e) => {
                  // Fallback if local image doesn't exist yet
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=256`;
                }}
              />
            </div>
            
            {/* Name & Role */}
            <h3 className="font-bold text-2xl text-slate-900 dark:text-on-surface mb-2 relative z-10">{member.name}</h3>
            <span className="font-medium text-sm text-blue-600 dark:text-primary bg-blue-50 dark:bg-primary/10 px-3 py-1 rounded-full border border-blue-200 dark:border-primary/20 mb-4 inline-block relative z-10">
              {member.role}
            </span>
            
            {/* Bio */}
            <p className="font-body-md text-slate-600 dark:text-on-surface-variant flex-1 text-sm leading-relaxed mb-6 relative z-10">
              {member.bio}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 w-full justify-center pt-6 border-t border-slate-100 dark:border-outline-variant/20 relative z-10">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white dark:bg-surface-container-high dark:text-on-surface-variant dark:hover:bg-primary dark:hover:text-on-primary transition-colors shadow-sm"
                  title="GitHub Profile"
                >
                  <span className="material-symbols-outlined text-[20px] block">code</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white dark:bg-surface-container-high dark:text-on-surface-variant dark:hover:bg-blue-500 dark:hover:text-white transition-colors shadow-sm"
                  title="LinkedIn Profile"
                >
                  <span className="material-symbols-outlined text-[20px] block">work</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
