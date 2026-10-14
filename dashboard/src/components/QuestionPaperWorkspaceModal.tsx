import React, { useState } from 'react';
import {
  X,
  FileText,
  Lightbulb,
  Gamepad2,
  KeyRound,
  Download,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Layers,
  Award,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { QuestionPaper } from '../types/academic';
import {
  QUESTION_PAPER_COMPANIONS,
  QuestionPaperCompanion
} from '../data/questionPaperSolutionsData';
import { QuestionPaperDemoViewer } from './demos/QuestionPaperDemos';
import { downloadAcademicPdf } from '../services/pdfService';

interface QuestionPaperWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  paper: QuestionPaper | null;
  initialTab?: 'solution' | 'demo' | 'answerKey' | 'paper';
}

export const QuestionPaperWorkspaceModal: React.FC<QuestionPaperWorkspaceModalProps> = ({
  isOpen,
  onClose,
  paper,
  initialTab = 'solution'
}) => {
  const [activeTab, setActiveTab] = useState<'solution' | 'demo' | 'answerKey' | 'paper'>(initialTab);

  // Sync initial tab when changed
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen || !paper) return null;

  const companion: QuestionPaperCompanion | undefined = QUESTION_PAPER_COMPANIONS[paper.id];

  const handleDownload = async () => {
    await downloadAcademicPdf(
      paper.filename,
      paper.title,
      paper.scheme || 'KTU 2019 Scheme',
      [`Semester: Semester S5 (CST303)`, `Exam: ${paper.examMonthYear}`, `Subject: CST303`]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/20 w-full max-w-5xl h-[90vh] max-h-[850px] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {paper.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-400">
                <span className="font-mono text-blue-400 font-semibold">{paper.examMonthYear}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{paper.scheme}</span>
                <span>•</span>
                <span>Semester S5 (CST303)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-slate-950/40 border-b border-white/10 flex gap-2 shrink-0 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('solution')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'solution'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <span>Step-by-Step Solution</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'demo'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-emerald-300" />
            <span>Interactive Demo</span>
          </button>

          <button
            onClick={() => setActiveTab('answerKey')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'answerKey'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <KeyRound className="w-4 h-4 text-amber-200" />
            <span>Valuation Answer Scheme</span>
          </button>

          <button
            onClick={() => setActiveTab('paper')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'paper'
                ? 'bg-slate-700 text-white shadow-lg shadow-slate-700/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-300" />
            <span>Question Paper & PDF</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!companion ? (
            <div className="p-8 text-center text-slate-400 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm">Companion solution data is being indexed for this paper.</p>
            </div>
          ) : (
            <>
              {/* TAB 1: SOLUTION */}
              {activeTab === 'solution' && (
                <div className="space-y-6">
                  {/* Overview Card */}
                  <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-500/20 text-xs sm:text-sm text-blue-200">
                    <span className="font-bold text-blue-400 uppercase tracking-wider block mb-1">
                      Solution Walkthrough Overview
                    </span>
                    <p className="opacity-90">{companion.solution.overview}</p>
                  </div>

                  {/* Part A Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <span className="px-2.5 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold font-mono">
                        PART A
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        Conceptual Short Answer Questions (3 Marks Each)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {companion.solution.partA.map((q) => (
                        <div
                          key={q.questionNumber}
                          className="p-4 bg-slate-950/50 rounded-xl border border-white/10 space-y-2.5 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-blue-400 text-xs">
                                {q.questionNumber}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px] font-mono">
                                Module {q.module}
                              </span>
                            </div>
                            <span className="text-xs font-bold font-mono text-emerald-400">
                              {q.marks} Marks
                            </span>
                          </div>

                          <p className="text-sm font-semibold text-slate-200">
                            {q.questionText}
                          </p>

                          <div className="text-xs text-slate-300 bg-white/5 p-3 rounded-lg leading-relaxed">
                            <span className="font-bold text-emerald-400 block mb-1">Solution:</span>
                            {q.solutionText}
                          </div>

                          {q.formulaOrCode && (
                            <div className="p-2.5 bg-black/60 rounded-lg border border-white/5 font-mono text-xs text-amber-300">
                              {q.formulaOrCode}
                            </div>
                          )}

                          {q.keywords && q.keywords.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Key Rubrics:
                              </span>
                              {q.keywords.map((kw, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-blue-950/60 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part B Section */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <span className="px-2.5 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg text-xs font-bold font-mono">
                        PART B
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        Long Analytical & Numerical Problems (14 Marks Each)
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {companion.solution.partB.map((q) => (
                        <div
                          key={q.questionNumber}
                          className="p-5 bg-slate-950/60 rounded-xl border border-white/10 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-emerald-400 text-sm">
                                {q.questionNumber}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs font-mono">
                                Module {q.module}
                              </span>
                            </div>
                            <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
                              {q.marks} Marks Full Credit
                            </span>
                          </div>

                          <p className="text-sm font-bold text-slate-100 leading-snug">
                            {q.questionText}
                          </p>

                          {/* Step-by-step walkthrough */}
                          <div className="space-y-2 pt-1">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                              Step-by-Step Derivation & Walkthrough:
                            </span>
                            <div className="space-y-2">
                              {q.solutionSteps.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-white/5 rounded-lg text-xs text-slate-200 leading-relaxed font-sans border-l-2 border-blue-500"
                                >
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>

                          {q.formulaOrCode && (
                            <div className="p-3 bg-black/60 rounded-lg border border-white/5 font-mono text-xs text-amber-300">
                              <span className="text-[10px] text-slate-500 block mb-1 uppercase">
                                Formula Applied:
                              </span>
                              {q.formulaOrCode}
                            </div>
                          )}

                          {q.diagramOrTable && (
                            <div className="p-3 bg-slate-900 rounded-lg border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
                              <span className="text-[10px] text-slate-500 block mb-1 uppercase">
                                Computational Breakdown / Matrix:
                              </span>
                              {q.diagramOrTable}
                            </div>
                          )}

                          {q.finalAnswer && (
                            <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-xs text-emerald-300 font-mono flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <div>
                                <span className="font-bold">Final Answer: </span>
                                {q.finalAnswer}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DEMO */}
              {activeTab === 'demo' && (
                <div className="space-y-4">
                  <QuestionPaperDemoViewer demoConfig={companion.demo} />
                </div>
              )}

              {/* TAB 3: ANSWER KEY */}
              {activeTab === 'answerKey' && (
                <div className="space-y-6">
                  {/* Scheme Header */}
                  <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        {companion.answerKey.schemeTitle}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-900/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                        Max Marks: {companion.answerKey.totalMarks}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                      <div className="p-2.5 bg-black/40 rounded-lg text-slate-300">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Part A Distribution:</span>
                        <span className="font-mono text-emerald-400">{companion.answerKey.partAMarksDistribution}</span>
                      </div>
                      <div className="p-2.5 bg-black/40 rounded-lg text-slate-300">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Part B Distribution:</span>
                        <span className="font-mono text-emerald-400">{companion.answerKey.partBMarksDistribution}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rubrics Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Question-Wise Valuation Rubrics
                    </h4>
                    <div className="space-y-3">
                      {companion.answerKey.rubrics.map((rubric, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-950/60 rounded-xl border border-white/10 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {rubric.question}
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                              {rubric.marksAllocated} Marks
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {rubric.criteria.map((crit, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2">
                                <span className="text-blue-400 shrink-0 mt-0.5">▪</span>
                                <span>{crit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examiner Checklist */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-white/10 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-amber-400" />
                      Official Evaluator Checklist
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {companion.answerKey.examinerChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: PAPER & PDF */}
              {activeTab === 'paper' && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-950/60 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{paper.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                          File: {paper.filename} • {paper.scheme} • {paper.examMonthYear}
                        </p>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                      >
                        <Download className="w-4 h-4" /> Download Official Question Paper
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Semester</span>
                        <span className="text-sm font-bold text-white font-mono">Semester S5</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Scheme</span>
                        <span className="text-sm font-bold text-white font-mono">{paper.scheme}</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
                        <span className="text-sm font-bold text-white font-mono">3 Hours</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Maximum Marks</span>
                        <span className="text-sm font-bold text-white font-mono">100 Marks</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-950/20 rounded-xl border border-blue-500/20 text-xs text-slate-300 space-y-2">
                    <span className="font-bold text-blue-400 uppercase tracking-wider block">
                      Subject Modules Covered
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Module 1: Physical & Data Link', 'Module 2: MAC & Flow Control', 'Module 3: Network Layer & Routing', 'Module 4: Transport Layer & TCP/UDP', 'Module 5: Application Layer & Protocols'].map((mod, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300 font-mono text-[11px]">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with Licensing & Attribution */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Curated by <strong className="text-slate-200">Jane Rose Ferdinant</strong>, Assistant Professor, Department of CSE
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-500 font-mono">CC BY-NC-ND 4.0</span>
            <span>•</span>
            <span className="text-slate-500">Zero Student PII Certified</span>
          </div>
        </div>

      </div>
    </div>
  );
};
