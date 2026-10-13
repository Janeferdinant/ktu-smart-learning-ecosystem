import React, { useState } from 'react';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/researchData';
import { FileCheck, ExternalLink, BookOpen, Layers, ShieldCheck, Search, Filter } from 'lucide-react';

export const ResearchExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredPapers = RESEARCH_PAPERS.filter(p => {
    if (selectedSubject !== 'all' && !p.subjectId.includes(selectedSubject)) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.authors.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <FileCheck className="w-4 h-4" />
          <span>IEEE & Landmark Research Archives</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Verified Academic Research Papers & Scientific Foundations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Curated seminal research literature that established the theoretical foundations of your KTU syllabus topics. All papers include verified DOIs, author credentials, research problem formulations, and syllabus alignment.
        </p>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search authors, papers, TCP, SLAM..."
            className="glass-input w-full pl-8 pr-3 py-1.5 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
          {[
            { id: 'all', label: 'All Subjects' },
            { id: 'cst303', label: 'Computer Networks' },
            { id: 'cst205', label: 'Java OOP' },
            { id: 'robotics', label: 'Robotics' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubject(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSubject === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/50"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {paper.venue.split(',')[0]}
                </span>
                <span className="text-slate-400 font-semibold">{paper.year}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {paper.title}
              </h2>

              <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Authors: <strong className="text-slate-800 dark:text-slate-100">{paper.authors}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Research Problem: </span>
                  <span className="text-slate-600 dark:text-slate-400">{paper.researchProblem}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Methodology: </span>
                  <span className="text-slate-600 dark:text-slate-400">{paper.methodology}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Key Finding: </span>
                  <span className="text-slate-600 dark:text-slate-400">{paper.keyFindings}</span>
                </div>
              </div>

              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-1">
                KTU Syllabus Mapping: {paper.syllabusRelevance}
              </div>
            </div>

            {/* Footer with verified DOI */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">DOI: {paper.doi}</span>
              </div>

              <a
                href={paper.doiUrl || `https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl font-bold glass-button flex items-center gap-1 hover:text-blue-600"
              >
                <span>Read Official Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
