import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { AnswerKeyScheme } from '../types/academic';
import { CheckCircle2, ShieldCheck, Download, FileText, Award, HelpCircle, Layers } from 'lucide-react';
import { PdfViewerModal } from '../components/PdfViewerModal';

export const AnswerKeySolutions: React.FC = () => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('scheme-dec2022');
  const [modalScheme, setModalScheme] = useState<AnswerKeyScheme | null>(null);

  const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks')!;
  const activeScheme = cn.answerKeys.find(k => k.id === selectedSchemeId) || cn.answerKeys[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border-emerald-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>University Valuation Authority</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Official University Answer Keys & Valuation Schemes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Official valuation schemes prescribed by APJ Abdul Kalam Technological University (KTU). Contains sub-question mark allocations, step marks, grading rubrics, and step-by-step mathematical solutions.
        </p>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cn.answerKeys.map((scheme) => {
          const isSelected = scheme.id === selectedSchemeId;
          return (
            <button
              key={scheme.id}
              onClick={() => setSelectedSchemeId(scheme.id)}
              className={`p-5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 border-emerald-600 font-bold scale-101'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`uppercase font-mono text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'}`}>
                  {scheme.type.replace(/-/g, ' ')}
                </span>
                <span className={`font-mono text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {(scheme.sizeBytes / 1024).toFixed(0)} KB
                </span>
              </div>
              <h3 className="text-sm font-bold leading-snug line-clamp-2">
                {scheme.title}
              </h3>
              <div className={`text-xs mt-2 font-mono ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                Session: {scheme.examMonthYear}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scheme Display */}
      {activeScheme && (
        <div className="glass-panel p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                {activeScheme.type.replace(/-/g, ' ')}
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {activeScheme.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="font-mono">{activeScheme.filename}</span>
                <span>•</span>
                <span>{(activeScheme.sizeBytes / 1024).toFixed(0)} KB</span>
                <span>•</span>
                <span>KTU 2019 Scheme</span>
              </div>
            </div>

            <button
              onClick={() => setModalScheme(activeScheme)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 flex items-center gap-2 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Valuation PDF</span>
            </button>
          </div>

          {/* Key Evaluation Highlights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>University Mark Allocation Guidelines & Evaluation Rubrics</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeScheme.keyHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-card border-slate-200/50 dark:border-slate-800/60 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {hl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Model Answer Breakdown Sample */}
          <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Exam Structure & Scheme Rubric Breakdown:
            </h4>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Part A (Compulsory 10 Questions × 3 Marks = 30 Marks)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">30 Marks</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Direct conceptual questions covering 2 questions per module. Evaluated with 1 mark for definition/principle, 1 mark for essential equations/diagram, and 1 mark for concise technical explanation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Part B (5 Choice Modules × 14 Marks = 70 Marks)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">70 Marks</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  In-depth analytical problems, algorithmic trace (e.g. Dijkstra, Bellman-Ford, CRC polynomial division), protocol packet flow sequence diagrams, and architecture analysis. Step marks rigorously awarded per intermediate calculation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalScheme && (
        <PdfViewerModal
          isOpen={true}
          onClose={() => setModalScheme(null)}
          title={modalScheme.title}
          filename={modalScheme.filename}
          sizeBytes={modalScheme.sizeBytes}
          scheme="KTU 2019 Scheme"
          highlights={modalScheme.keyHighlights}
        />
      )}
    </div>
  );
};
