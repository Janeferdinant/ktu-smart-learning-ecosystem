import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { Subject, SubjectModule, ModuleResource } from '../types/academic';
import { Layers, FileText, Presentation, CheckCircle, Clock, BookOpen, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { PdfViewerModal } from '../components/PdfViewerModal';

interface ModuleLearningProps {
  selectedSubject: Subject;
  onSelectSubject: (sub: Subject) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ModuleLearning: React.FC<ModuleLearningProps> = ({
  selectedSubject,
  onSelectSubject,
  onNavigateSection
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [activeModalResource, setActiveModalResource] = useState<ModuleResource | null>(null);

  const currentModule = selectedSubject.modules.find(m => m.id === activeModuleId) || selectedSubject.modules[0];

  const toggleTopic = (topic: string) => {
    const key = `${selectedSubject.id}-m${currentModule.id}-${topic}`;
    setCompletedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Subject Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Current Course:
          </span>
          <select
            value={selectedSubject.id}
            onChange={(e) => {
              const found = ACADEMIC_SUBJECTS.find(s => s.id === e.target.value);
              if (found) {
                onSelectSubject(found);
                setActiveModuleId(1);
              }
            }}
            className="glass-input px-3 py-1.5 text-sm font-bold text-slate-900 dark:text-white"
          >
            {ACADEMIC_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                {s.code} — {s.name} ({s.semester})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {selectedSubject.regulation}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60">
            Faculty: Jane Rose
          </span>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {selectedSubject.modules.map((m) => {
          const isActive = m.id === activeModuleId;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModuleId(m.id)}
              className={`p-3.5 rounded-2xl text-left transition-all border ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-600 font-bold scale-102'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isActive ? 'text-blue-100 font-mono' : 'text-slate-500 font-mono'}>
                  Module 0{m.moduleNumber}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/50 dark:bg-slate-700/50 text-slate-500'}`}>
                  {m.hoursAllocated}h
                </span>
              </div>
              <div className="text-xs font-semibold line-clamp-1">
                {m.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Details */}
      {currentModule && (
        <div className="glass-panel p-6 sm:p-8 space-y-8">
          {/* Module Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                <span>MODULE {currentModule.moduleNumber}</span>
                <span>•</span>
                <span>{currentModule.hoursAllocated} TEACHING HOURS ALLOCATED</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl pt-1">
                {currentModule.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateSection('slides')}
                className="glass-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:border-blue-500"
              >
                <Presentation className="w-4 h-4 text-blue-500" />
                <span>Light Slides</span>
              </button>
              <button
                onClick={() => onNavigateSection('quizzes')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                <span>Practice Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Syllabus Topics Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Prescribed Syllabus Key Concepts</span>
              </h3>
              <span className="text-xs text-slate-500">
                Click to track student mastery
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentModule.keyTopics.map((topic, idx) => {
                const key = `${selectedSubject.id}-m${currentModule.id}-${topic}`;
                const isDone = !!completedTopics[key];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTopic(topic)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200 shadow-xs'
                        : 'glass-card border-slate-200/50 dark:border-slate-800/60 hover:border-blue-400'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                        isDone ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                    <div className="text-xs font-medium leading-relaxed">
                      {topic}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Authentic Academic Resources for this Module */}
          <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Available Repository Lecture Notes & PPTs</span>
            </h3>

            {currentModule.resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentModule.resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl glass-card flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="uppercase font-mono font-bold text-blue-600 dark:text-blue-400">
                          {res.type}
                        </span>
                        <span>{(res.sizeBytes / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {res.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono line-clamp-1">
                        {res.filename}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalResource(res)}
                      className="w-full py-2 rounded-lg text-xs font-semibold glass-button flex items-center justify-center gap-1.5 hover:border-blue-500"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      <span>Access File</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl glass-card text-center text-xs text-slate-500">
                Verified syllabus topic notes and generated presentations are linked in the Slide Download Center and Teaching Plan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* PDF / Document Modal */}
      {activeModalResource && (
        <PdfViewerModal
          isOpen={true}
          onClose={() => setActiveModalResource(null)}
          title={activeModalResource.name}
          filename={activeModalResource.filename}
          sizeBytes={activeModalResource.sizeBytes}
          scheme={selectedSubject.regulation}
        />
      )}
    </div>
  );
};
