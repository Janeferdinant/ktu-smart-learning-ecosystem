import React from 'react';

export const CreativeCommonsIconGroup: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 font-bold font-mono ${className}`}>
      {/* CC Icon */}
      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center text-[10px] shadow-sm font-black">
        CC
      </span>
      {/* BY (Attribution) Icon */}
      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center text-[10px] shadow-sm font-black" title="Attribution required">
        BY
      </span>
      {/* NC (NonCommercial) Icon */}
      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center text-[10px] shadow-sm font-black" title="Non-commercial use only">
        NC
      </span>
      {/* ND (NoDerivatives) Icon */}
      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-rose-400 flex items-center justify-center text-[10px] shadow-sm font-black" title="No derivatives / modifications">
        ND
      </span>
    </div>
  );
};

export const FacultySecurityLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] ${className}`}
    >
      <defs>
        <linearGradient id="cyberRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Hexagonal Cyber Border */}
      <polygon 
        points="60,6 106,32 106,88 60,114 14,88 14,32" 
        stroke="url(#cyberRing)" 
        strokeWidth="2.5" 
        strokeDasharray="6 4"
        fill="none"
      />

      {/* Inner Armored Shield */}
      <path 
        d="M60 14 L96 30 V68 C96 90 60 106 60 106 C60 106 24 90 24 68 V30 Z" 
        fill="url(#shieldFill)" 
        stroke="url(#cyberRing)" 
        strokeWidth="2" 
      />

      {/* Stylized Monogram: JRF (Jane Rose Ferdinant) */}
      <g transform="translate(34, 38)">
        <path 
          d="M12 6 H22 V24 C22 30 18 34 10 34 C4 34 2 31 2 28" 
          stroke="url(#cyberRing)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none"
        />
        <path 
          d="M20 6 H32 C38 6 42 10 42 16 C42 22 38 25 32 25 H20 V34 M29 25 L41 34" 
          stroke="#fff" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        <path 
          d="M38 6 H50 M38 18 H46" 
          stroke="url(#goldAccent)" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          fill="none"
        />
      </g>
    </svg>
  );
};

export const CopyrightWatermark: React.FC = () => {
  return null;
};
