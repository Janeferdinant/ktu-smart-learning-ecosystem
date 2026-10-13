import React from 'react';
import { CAREER_ROLES } from '../data/industryCareerData';
import { TrendingUp, DollarSign, Building2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const CareerSalaryExplorer: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-blue-600/10 border-emerald-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-4 h-4" />
          <span>Verified Career & Compensation Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Job Roles, Verified Salary Benchmarks & Skills Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Explore high-growth technology job designations mapped directly to your KTU subjects. Features verified compensation benchmarks sourced from official portals, skills-gap checklists, and top hiring employers.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CAREER_ROLES.map((role) => (
          <div
            key={role.id}
            className="glass-card p-6 flex flex-col justify-between space-y-5 hover:border-emerald-500/50"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {role.subjectCode} • {role.industryDomain}
                </span>
                <span className="text-slate-400 font-semibold text-[10px]">
                  {role.experienceLevel}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {role.title}
              </h2>

              {/* Salary Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Verified Compensation:
                  </span>
                  <span className="text-[10px] text-slate-400">Annual</span>
                </div>
                <div className="text-xl font-black text-emerald-800 dark:text-emerald-300 font-mono">
                  {role.salaryRangeINR}
                </div>
                <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                  Global equivalent: {role.salaryRangeUSD}
                </div>
                <div className="text-[10px] text-slate-500 font-medium pt-1">
                  Source: {role.salarySource}
                </div>
              </div>

              {/* Required Technical Skills */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Core Technical Skills:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.keySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Gap Roadmap Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Student Skills-Gap Preparation Roadmap:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {role.skillsGapChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Top Employers Footer */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>Top Recruiting Employers:</span>
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {role.topEmployers.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
