import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { Subject, QuestionPaper } from '../types/academic';
import { HelpCircle, Download, CheckCircle, Search, FileText, ArrowRight, ShieldCheck, Filter, Lightbulb, Gamepad2, KeyRound } from 'lucide-react';
import { QuestionPaperWorkspaceModal } from '../components/QuestionPaperWorkspaceModal';
import { downloadAcademicPdf } from '../services/pdfService';

interface QuestionPaperBankProps {
  onNavigateSection: (sectionId: string) => void;
}

export const QuestionPaperBank: React.FC<QuestionPaperBankProps> = ({ onNavigateSection }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cst303-computer-networks');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalPaper, setModalPaper] = useState<QuestionPaper | null>(null);
  const [modalTab, setModalTab] = useState<'solution' | 'demo' | 'answerKey' | 'paper'>('solution');

  const currentSubject = ACADEMIC_SUBJECTS.find(s => s.id === selectedSubjectId) || ACADEMIC_SUBJECTS[0];

  const filteredPapers = currentSubject.questionPapers.filter((qp) => {
    if (categoryFilter !== 'all' && qp.category !== categoryFilter) {
      return false;
    }
    if (searchQuery && !qp.title.toLowerCase().includes(searchQuery.toLowerCase()) && !qp.examMonthYear.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <HelpCircle className="w-4 h-4" />
          <span>KTU Official Examination Repository</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Previous-Year Question Papers & Model Question Bank
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Access verified regular semester examination question papers, model question sets, and series question banks for KTU B.Tech. All question papers map directly to official university schemes and syllabus modules.
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Subject:
          </span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="glass-input px-3 py-1.5 text-xs font-bold"
          >
            {ACADEMIC_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id} className="dark:bg-slate-900">
                {s.code} — {s.name} ({s.questionPapers.length} Papers)
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
          {[
            { id: 'all', label: 'All Papers' },
            { id: 'university-pyq', label: 'University PYQs' },
            { id: 'model-paper', label: 'Model Papers' },
            { id: 'series-exam', label: 'Series Exams' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam year or title..."
            className="glass-input w-full pl-8 pr-3 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/50 dark:border-slate-700/50">
              <tr>
                <th className="py-3 px-4">Question Paper Title</th>
                <th className="py-3 px-4">Exam Session</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Interactive Companions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60">
              {filteredPapers.length > 0 ? (
                filteredPapers.map((qp) => (
                  <tr
                    key={qp.id}
                    className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <div>{qp.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {qp.filename} ({(qp.sizeBytes / 1024).toFixed(0)} KB)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-600 dark:text-slate-300">
                      {qp.examMonthYear}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {qp.scheme}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {qp.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => { setModalPaper(qp); setModalTab('solution'); }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all inline-flex items-center gap-1"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-400" />
                          <span>Solution</span>
                        </button>
                        <button
                          onClick={() => { setModalPaper(qp); setModalTab('demo'); }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-all inline-flex items-center gap-1"
                        >
                          <Gamepad2 className="w-3 h-3 text-emerald-400" />
                          <span>Demo</span>
                        </button>
                        <button
                          onClick={() => { setModalPaper(qp); setModalTab('answerKey'); }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all inline-flex items-center gap-1"
                        >
                          <KeyRound className="w-3 h-3 text-amber-500" />
                          <span>Key</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => { setModalPaper(qp); setModalTab('paper'); }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => downloadAcademicPdf(qp.filename, qp.title, qp.scheme)}
                        className="px-3 py-1 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No question papers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Question Paper Workspace Modal */}
      {modalPaper && (
        <QuestionPaperWorkspaceModal
          isOpen={true}
          onClose={() => setModalPaper(null)}
          paper={modalPaper}
          initialTab={modalTab}
        />
      )}
    </div>
  );
};
