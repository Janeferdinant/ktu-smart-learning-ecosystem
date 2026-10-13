import React, { useState } from 'react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { Subject, SubjectModule } from '../types/academic';
import { generateModulePresentation } from '../services/pptxGenerator';
import { Presentation, Download, CheckCircle, Sun, Sparkles, ShieldCheck, FileText, ArrowDownToLine, Loader2 } from 'lucide-react';

export const SlideDownloadCenter: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cst303-computer-networks');
  const [downloadingModule, setDownloadingModule] = useState<number | null>(null);
  const [downloadingAll, setDownloadingAll] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currentSubject = ACADEMIC_SUBJECTS.find(s => s.id === selectedSubjectId) || ACADEMIC_SUBJECTS[0];

  const handleDownloadModule = async (mod: SubjectModule) => {
    try {
      setDownloadingModule(mod.id);
      await generateModulePresentation(currentSubject, mod);
      setSuccessMessage(`Successfully generated and downloaded: ${currentSubject.code} Module 0${mod.moduleNumber} Light Presentation (.pptx)!`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error('PPTX generation error:', err);
    } finally {
      setDownloadingModule(null);
    }
  };

  const handleDownloadAllSubject = async () => {
    try {
      setDownloadingAll(true);
      for (const mod of currentSubject.modules) {
        await generateModulePresentation(currentSubject, mod);
      }
      setSuccessMessage(`Downloaded all ${currentSubject.modules.length} modules for ${currentSubject.code} in dedicated Light Theme!`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Error generating subject pack:', err);
    } finally {
      setDownloadingAll(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-blue-500/10 border-amber-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Presentation className="w-4 h-4" />
          <span>Faculty Presentation Delivery Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Downloadable PowerPoint Slides & Lecture Decks
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Generate and download authentic, editable PowerPoint (.pptx) presentations for each module. <strong>All generated PowerPoint presentations strictly enforce a high-contrast LIGHT THEME by default</strong>, with official faculty branding and KTU syllabus alignment.
        </p>

        {/* Light Theme Guarantee Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-900 dark:text-amber-200 mt-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>Strict Light Theme Policy: Presentation files never inherit dark dashboard modes.</span>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-xs font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Subject Selector & Bulk Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Course:
          </span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="glass-input px-3 py-1.5 text-xs font-bold"
          >
            {ACADEMIC_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id} className="dark:bg-slate-900">
                {s.code} — {s.name} ({s.modules.length} Modules)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleDownloadAllSubject}
          disabled={downloadingAll}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {downloadingAll ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating All Slides...</span>
            </>
          ) : (
            <>
              <ArrowDownToLine className="w-4 h-4" />
              <span>Download Complete Subject Deck Pack</span>
            </>
          )}
        </button>
      </div>

      {/* Modules Slide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSubject.modules.map((mod) => {
          const isDownloading = downloadingModule === mod.id;
          return (
            <div
              key={mod.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    MODULE 0{mod.moduleNumber}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {mod.hoursAllocated} Hours
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {mod.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {mod.description}
                </p>

                {/* Key Slide Topics */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Included Deck Content:
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-0.5">
                    {mod.keyTopics.slice(0, 3).map((t, idx) => (
                      <li key={idx} className="line-clamp-1 flex items-center gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Slide Format Badges & Download Button */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light Academic Theme</span>
                  </div>
                  <span className="font-mono">16:9 HD</span>
                </div>

                <button
                  onClick={() => handleDownloadModule(mod)}
                  disabled={isDownloading}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating PPTX...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Module {mod.moduleNumber} PPTX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Specifications Footer */}
      <div className="p-4 rounded-xl glass-panel text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Footer applied to all slides: <strong>Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)</strong></span>
        </div>
        <span className="font-mono">PptxGenJS Native 16:9 PPTX Generator</span>
      </div>
    </div>
  );
};
