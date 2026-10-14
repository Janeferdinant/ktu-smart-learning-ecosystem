import React, { useState } from 'react';
import { CheckCircle2, X, ExternalLink, Scale, ShieldCheck } from 'lucide-react';

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
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {/* Floating Creative Commons CC BY-NC-ND 4.0 Seal in Bottom Right */}
      <aside 
        aria-label="Creative Commons Academic License Badge"
        className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl glass-panel bg-slate-950/85 hover:bg-slate-900/95 border-slate-700/60 hover:border-cyan-500/50 text-left transition-all shadow-xl shadow-black/40 hover:scale-102 ring-1 ring-white/10"
          title="Click to view official Creative Commons CC BY-NC-ND 4.0 License terms"
        >
          <FacultySecurityLogo size={34} />
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CreativeCommonsIconGroup />
              <span className="text-[10px] font-mono font-bold text-cyan-400">CC BY-NC-ND 4.0</span>
            </div>
            <div className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              Jane Rose Ferdinant
            </div>
            <div className="text-[10px] text-slate-400">
              Assistant Professor • Dept of CSE
            </div>
          </div>
        </button>
      </aside>

      {/* Official Creative Commons Legal Framework Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-lg w-full p-6 sm:p-8 space-y-5 relative border-slate-700/80 bg-slate-950/95 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <FacultySecurityLogo size={52} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                  <Scale className="w-3 h-3" />
                  <span>Academic Creative Commons License</span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">
                  Jane Rose Ferdinant
                </h3>
                <p className="text-xs text-slate-400">
                  Assistant Professor | Department of Computer Science and Engineering (CSE)
                </p>
              </div>
            </div>

            {/* License Terms */}
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>CC BY-NC-ND 4.0 International</span>
                  </span>
                  <CreativeCommonsIconGroup />
                </div>
                <p>
                  This educational ecosystem and all curriculum assets are licensed under the <strong>Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</strong>.
                </p>
              </div>

              {/* Specific Conditions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-[11px]">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                  <div className="font-bold uppercase text-[10px]">1. Attribution (BY)</div>
                  <p className="text-[10px] leading-snug">
                    You must give appropriate credit to Jane Rose Ferdinant and provide a link to the license.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1">
                  <div className="font-bold uppercase text-[10px]">2. NonCommercial (NC)</div>
                  <p className="text-[10px] leading-snug">
                    You may not use this material for commercial purposes, paywalled courses, or monetization.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                  <div className="font-bold uppercase text-[10px]">3. NoDerivatives (ND)</div>
                  <p className="text-[10px] leading-snug">
                    If you remix, transform, or build upon the material, you may not distribute the modified material.
                  </p>
                </div>
              </div>

              {/* Attribution and Legal Deed Link */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>APJ Abdul Kalam Technological University (KTU)</span>
                <a 
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  <span>View Full License Deed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
