import React, { useMemo } from 'react';
import { Award, ShieldCheck, GraduationCap, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  const dynamicDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-slate-200/50 dark:border-slate-800/60 glass-panel !rounded-none !border-x-0 !border-b-0 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>KTU Smart Learning Ecosystem</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
              Autonomous Faculty Suite
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide">
            Jane Rose Ferdinant | Assistant Professor | Department of Computer Science and Engineering (CSE)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            APJ Abdul Kalam Technological University (KTU) — Official Course Delivery & Learning Portal
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2 text-[11px] text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono font-bold text-cyan-400">
              CC BY-NC-ND 4.0
            </span>
            <span>
              Licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</a>.
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-mono font-medium">{dynamicDate}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KTU 2019/2024 Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
