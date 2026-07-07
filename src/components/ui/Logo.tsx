import React from 'react';

export const Logo = ({ className = '', size = 24 }: { className?: string; size?: number | string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={className}
    fill="none"
  >
    {/* Outer Ring */}
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 16C31.2223 16 16 31.2223 16 50C16 68.7777 31.2223 84 50 84C68.7777 84 84 68.7777 84 50C84 31.2223 68.7777 16 50 16Z" 
      fill="currentColor"
    />
    
    {/* Nubs/Notches (8 of them) */}
    <circle cx="50" cy="20" r="5" fill="currentColor" />
    <circle cx="50" cy="80" r="5" fill="currentColor" />
    <circle cx="20" cy="50" r="5" fill="currentColor" />
    <circle cx="80" cy="50" r="5" fill="currentColor" />
    
    <circle cx="28.7868" cy="28.7868" r="5" fill="currentColor" />
    <circle cx="71.2132" cy="71.2132" r="5" fill="currentColor" />
    <circle cx="28.7868" cy="71.2132" r="5" fill="currentColor" />
    <circle cx="71.2132" cy="28.7868" r="5" fill="currentColor" />

    {/* Center Diamond */}
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M50 30L65 50L50 70L35 50L50 30ZM50 40L42.5 50L50 60L57.5 50L50 40Z" 
      fill="currentColor"
    />
  </svg>
);
