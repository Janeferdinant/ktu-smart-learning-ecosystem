import React from 'react';
import { INDUSTRY_TOOLS, STUDENT_PROJECT_IDEAS } from '../data/industryCareerData';
import { Briefcase, ExternalLink, Code2, Layers, CheckCircle2, Sparkles } from 'lucide-react';

export const IndustryApplications: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-blue-600/10 via-teal-600/10 to-indigo-600/10 border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <Briefcase className="w-4 h-4" />
          <span>Industry Alignment & Practical Portfolios</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Real-World Industry Implementations & Student Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Connect academic syllabus theory to modern industry platforms, cloud architectures, enterprise frameworks, and high-impact student capstone project implementations.
        </p>
      </div>

      {/* Enterprise Tools Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <span>Industry-Standard Enterprise Tools & Platforms</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRY_TOOLS.map((tool) => (
            <div key={tool.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {tool.subjectCode} • {tool.category}
                  </span>
                  <span className="text-slate-400 font-semibold">Production Ready</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tool.description}
                </p>

                {/* Enterprise Users */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Deployed By Industry Leaders:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.enterpriseUsers.map((user, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {user}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end">
                <a
                  href={tool.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold glass-button flex items-center gap-1.5 hover:text-blue-600"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Capstone Projects */}
      <div className="space-y-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <span>Curriculum-Aligned Student Capstone & Mini-Project Ideas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_PROJECT_IDEAS.map((proj) => (
            <div key={proj.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    {proj.subjectCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {proj.complexity}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                Aligned with: {proj.ktuModuleAlignment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
