export const Logo = ({ className = '', size = 24 }: { className?: string; size?: number | string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m16.24 7.76-1.74 4.93-4.93 1.74 1.74-4.93 4.93-1.74Z"/>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m19.07 4.93-1.41 1.41"/>
    <path d="m6.34 17.66-1.41 1.41"/>
  </svg>
);
