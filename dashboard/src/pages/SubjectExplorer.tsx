import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { Subject } from '../types/academic';
import { BookOpen, Layers, FileText, Presentation, Calendar, Award, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SubjectExplorerProps {
  onSelectSubject: (subject: Subject) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SubjectExplorer: React.FC<SubjectExplorerProps> = ({
  onSelectSubject,
  onNavigateSection
}) => {
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('all');

  const filteredSubjects = ACADEMIC_SUBJECTS.filter((sub) => {
    if (selectedSemester !== 'all' && !sub.semester.toLowerCase().includes(selectedSemester.toLowerCase())) {
      return false;
    }
    if (selectedRegulation !== 'all' && !sub.regulation.toLowerCase().includes(selectedRegulation.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="glass-panel p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-cyan-500/10 border-blue-500/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>APJ Abdul Kalam Technological University (KTU)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering Curriculum Ecosystem
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Curated by <strong>Jane Rose</strong>, Assistant Professor, Department of CSE. Explore module-wise notes, university solved question papers, downloadable light-themed PowerPoint slides, and certified 46-hour academic teaching plans.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">46h</div>
            <div className="text-xs text-slate-500">Validated Teaching Plans</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">12+</div>
            <div className="text-xs text-slate-500">University PYQs & Schemes</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">37</div>
            <div className="text-xs text-slate-500">Faculty Presentation Decks</div>
          </div>
          <div>
            <div className="text-2xl font-black text-pink-600 dark:text-pink-400">10</div>
            <div className="text-xs text-slate-500">Liquid Glass Themes</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Semester:
          </label>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
            {['all', 'S3', 'S4', 'S5', 'S6'].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSemester === sem
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
                }`}
              >
                {sem === 'all' ? 'All Semesters' : sem}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Regulation:
          </label>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
            {['all', '2019', '2024'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegulation(reg)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedRegulation === reg
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
                }`}
              >
                {reg === 'all' ? 'All Schemes' : `KTU ${reg}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="glass-card p-6 flex flex-col justify-between group hover:border-blue-500/50"
          >
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white font-extrabold shadow-md`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                        {subject.code}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold">
                        {subject.semester}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {subject.name}
                    </h2>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold shrink-0">
                  {subject.credits} Credits
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {subject.description}
              </p>

              {/* Curriculum Details Chips */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {subject.modules.length}
                  </div>
                  <div className="text-[10px] text-slate-500">Modules</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {subject.questionPapers.length}
                  </div>
                  <div className="text-[10px] text-slate-500">PYQs & Model</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">46h</div>
                  <div className="text-[10px] text-slate-500">Lesson Plan</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>{subject.regulation}</span>
              </div>

              <div className="flex items-center gap-2">
                {subject.showcaseUrl && (
                  <a
                    href={subject.showcaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>⚡ 3D Showcase</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    onSelectSubject(subject);
                    onNavigateSection('teaching-plans');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-button hover:border-blue-400"
                >
                  46h Plan
                </button>
                <button
                  onClick={() => {
                    onSelectSubject(subject);
                    onNavigateSection('modules');
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all group-hover:scale-102"
                >
                  <span>Explore Modules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
