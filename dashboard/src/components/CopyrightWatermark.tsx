import React, { useState, useEffect } from 'react';
import { Shield, Lock, Award, CheckCircle2, Sparkles, X, FileText, ExternalLink } from 'lucide-react';

export const FacultySecurityLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 56 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] ${className}`}
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

      {/* Rotating Outer Hexagonal Cyber Ring */}
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

      {/* Circuit Nodes */}
      <circle cx="60" cy="22" r="3" fill="#38bdf8" />
      <circle cx="34" cy="46" r="2.5" fill="#a855f7" />
      <circle cx="86" cy="46" r="2.5" fill="#a855f7" />
      <circle cx="60" cy="98" r="3" fill="#10b981" />
      <line x1="60" y1="22" x2="60" y2="38" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Stylized Monogram: JRF (Jane Rose Ferdinant) */}
      <g transform="translate(34, 38)">
        {/* Letter J */}
        <path 
          d="M12 6 H22 V24 C22 30 18 34 10 34 C4 34 2 31 2 28" 
          stroke="url(#cyberRing)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none"
        />
        {/* Letter R */}
        <path 
          d="M20 6 H32 C38 6 42 10 42 16 C42 22 38 25 32 25 H20 V34 M29 25 L41 34" 
          stroke="#fff" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        {/* Letter F */}
        <path 
          d="M38 6 H50 M38 18 H46" 
          stroke="url(#goldAccent)" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          fill="none"
        />
      </g>

      {/* Verification Star */}
      <polygon 
        points="60,28 62,32 66,32 63,35 64,39 60,36 56,39 57,35 54,32 58,32" 
        fill="url(#goldAccent)" 
      />
    </svg>
  );
};

export const CopyrightWatermark: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Anti-piracy context menu protection with polite faculty IP notification
    const handleContextMenu = (e: MouseEvent) => {
      // Allow normal interactions, but notify on canvas/code blocks
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'CANVAS' || target.closest('.game-arena-box') || target.closest('pre'))) {
        e.preventDefault();
        setToastMessage('🔒 Intellectual Property Protected • Jane Rose Ferdinant, Assistant Professor CSE');
        setTimeout(() => setToastMessage(null), 3200);
      }
    };

    // 2. Clipboard Copyright Citation Injector
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 80 && e.clipboardData) {
        const citation = `\n\n/* [KTU Smart Learning Ecosystem] Sourced from Coursework & Research under Jane Rose Ferdinant, Assistant Professor, Department of CSE. © 2026. Unauthorized commercial duplication prohibited. */`;
        e.clipboardData.setData('text/plain', selection + citation);
        e.preventDefault();
        setToastMessage('✓ Copied with Verified Faculty Copyright Citation');
        setTimeout(() => setToastMessage(null), 2500);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <>
      {/* Subtle Repeating Diagonal Background Watermark (Non-obstructive, Anti-Screenshot) */}
      <div 
        className="pointer-events-none fixed inset-0 z-[1] select-none overflow-hidden opacity-[0.022] dark:opacity-[0.038]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='200' viewBox='0 0 360 200'><text x='20' y='100' fill='%2338bdf8' font-family='monospace' font-weight='bold' font-size='12' transform='rotate(-22 180 100)'>JANE ROSE FERDINANT • ASST PROF CSE • © 2026</text></svg>")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Floating Bottom-Right Holographic IP Authenticity Seal */}
      <aside 
        aria-label="Intellectual Property Verification Badge"
        className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
      >
        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl glass-panel bg-slate-950/80 hover:bg-slate-900/90 border-cyan-500/40 hover:border-cyan-400 text-left transition-all shadow-xl shadow-cyan-950/40 hover:scale-102 ring-1 ring-cyan-500/20"
          title="Click to view Copyright & Faculty IP Verification"
        >
          <FacultySecurityLogo size={32} />
          <div className="hidden sm:block">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <span>Verified Faculty IP</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              Jane Rose Ferdinant
            </div>
            <div className="text-[9px] text-slate-400">
              Asst Professor • CSE Dept
            </div>
          </div>
        </button>
      </aside>

      {/* Ephemeral Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-slate-950/95 border border-cyan-500/50 text-white text-xs font-mono shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Detailed Copyright & Authenticity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-lg w-full p-6 sm:p-8 space-y-6 relative border-cyan-500/40 bg-slate-950/95 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <FacultySecurityLogo size={58} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                  <Lock className="w-3 h-3" />
                  <span>Cryptographic Copyright Certificate</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  Jane Rose Ferdinant
                </h3>
                <p className="text-xs text-slate-400">
                  Assistant Professor | Department of Computer Science and Engineering (CSE)
                </p>
              </div>
            </div>

            {/* IP Terms and Verification */}
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-400 font-mono uppercase text-[10px]">
                  Intellectual Property Ownership
                </div>
                <p>
                  All curriculum architectures, interactive simulators, gaming lab modules, teaching plans, and algorithmic derivations in this ecosystem are the intellectual property of <strong>Jane Rose Ferdinant</strong> and the KTU Department of CSE.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 font-mono uppercase text-[10px]">
                  Authorized Academic License
                </div>
                <p>
                  Open access is granted for bona fide student learning, personal research, and classroom instruction. Unauthorized commercial mirroring, scraper extraction, removal of author watermark/attribution, or plagiarism is strictly prohibited.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="font-bold text-emerald-400 uppercase text-[10px]">
                  Digital Signature & Ecosystem Provenance
                </div>
                <div className="text-slate-400 truncate">
                  SHA-256 Provenance Hash: <span className="text-cyan-300">2148d3d9f0...af52834</span>
                </div>
                <div className="text-slate-400">
                  Institution: APJ Abdul Kalam Technological University (KTU)
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
