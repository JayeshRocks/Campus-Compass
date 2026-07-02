interface Contributor {
  name: string;
  role: string;
  bio: string;
  github: string;
  avatar: string;
}

const contributors: Contributor[] = [
  {
    name: "Jayesh",
    role: "Lead Developer & Architect",
    bio: "Computer Science student passionate about open-source mapping and frontend performance.",
    github: "https://github.com/JayeshRocks",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Ananya",
    role: "Lead UI/UX Designer",
    bio: "Focuses on building clean, accessible layouts and responsive visual frameworks.",
    github: "#",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Rohan",
    role: "Map Integrations Engineer",
    bio: "Loves playing with vector tiles, basemaps, and coordinates lock logic.",
    github: "#",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  }
];

export default function MeetTeam() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#020617] text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-primary font-label-md text-label-md bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Version 1
        </span>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-4 tracking-tight">
          Meet the Team
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl mx-auto">
          Campus Compass is built by students, for students. Meet the team who designed and engineered the platform.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {contributors.map((member) => (
          <div
            key={member.name}
            className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:border-primary/50 transition-all duration-200"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant/50 mb-4">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg text-on-surface">{member.name}</h3>
            <span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mt-1">
              {member.role}
            </span>
            <p className="font-body-md text-sm text-on-surface-variant mt-4 flex-1">
              {member.bio}
            </p>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-primary hover:text-on-primary rounded-xl transition-all duration-200 border border-outline-variant/30 text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
