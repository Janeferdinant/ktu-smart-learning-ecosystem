import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import { QuizEngine } from '../components/QuizEngine';
import { BrainCircuit, Filter, Sparkles, BookOpen, Award, CheckCircle2 } from 'lucide-react';

interface AssessmentCenterProps {
  onNavigateNotes?: (moduleId: number) => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({ onNavigateNotes }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cst303-computer-networks');
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const currentSubject = ACADEMIC_SUBJECTS.find(s => s.id === selectedSubjectId) || ACADEMIC_SUBJECTS[0];

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    if (q.subjectId !== selectedSubjectId) return false;
    if (selectedModule !== 'all' && q.moduleId !== selectedModule) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 border-purple-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <BrainCircuit className="w-4 h-4" />
          <span>Interactive Assessment & Examination Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Quiz & Examination Assessment Centre
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Test your mastery with randomized MCQs, code-output prediction, debugging challenges, and numerical derivations. Features timed mock examination mode, negative marking simulation, and weak-topic diagnostics linked to lecture notes.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Subject:
          </span>
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedModule('all');
            }}
            className="glass-input px-3 py-1.5 text-xs font-bold"
          >
            {ACADEMIC_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id} className="dark:bg-slate-900">
                {s.code} — {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Module Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
          <button
            onClick={() => setSelectedModule('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedModule === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
            }`}
          >
            Full Syllabus Mock
          </button>
          {[1, 2, 3, 4, 5].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModule(m)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedModule === m
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
              }`}
            >
              M0{m}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Difficulty:
          </span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="glass-input px-3 py-1.5 text-xs font-bold capitalize"
          >
            <option value="all" className="dark:bg-slate-900">All Levels</option>
            <option value="beginner" className="dark:bg-slate-900">Beginner</option>
            <option value="intermediate" className="dark:bg-slate-900">Intermediate</option>
            <option value="advanced" className="dark:bg-slate-900">Advanced</option>
          </select>
        </div>
      </div>

      {/* Quiz Engine Workspace */}
      {filteredQuestions.length > 0 ? (
        <QuizEngine
          key={`${selectedSubjectId}-${selectedModule}-${selectedDifficulty}`}
          questions={filteredQuestions}
          subjectName={currentSubject.name}
          onNavigateNotes={onNavigateNotes}
        />
      ) : (
        <div className="p-12 text-center glass-panel space-y-3">
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No questions available matching the current module filter.
          </div>
          <p className="text-xs text-slate-500">
            Try switching to "Full Syllabus Mock" to practice all questions for {currentSubject.name}.
          </p>
          <button
            onClick={() => setSelectedModule('all')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
