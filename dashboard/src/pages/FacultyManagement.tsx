import React, { useState } from 'react';
import { UserCheck, Award, FileSpreadsheet, Presentation, ShieldCheck, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { ACADEMIC_SUBJECTS } from '../data/academicData';
import { exportTeachingPlanToExcel } from '../services/excelGenerator';
import { TEACHING_PLANS } from '../data/teachingPlans';

export const FacultyManagement: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cst303-computer-networks');
  const [coverageMarks, setCoverageMarks] = useState<Record<string, number>>({
    'cst303-computer-networks': 88,
    'cst205-object-oriented-programming': 92,
    'pcadt502-robotics': 75,
    'pecst521-software-project-management': 80
  });

  const subject = ACADEMIC_SUBJECTS.find(s => s.id === selectedSubjectId) || ACADEMIC_SUBJECTS[0];
  const plan = TEACHING_PLANS[selectedSubjectId] || TEACHING_PLANS['cst303-computer-networks'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-teal-600/10 border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <UserCheck className="w-4 h-4" />
          <span>Faculty Administration & Accreditation Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Faculty Resource & Course File Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Comprehensive faculty portal for APJ Abdul Kalam Technological University (KTU) course files, internal evaluation rubrics, continuous assessment marks, and automated accreditation compliance audits.
        </p>

        {/* Faculty Signature Card */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Course In-Charge / Assistant Professor:
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Jane Rose | Assistant Professor
            </div>
            <div className="text-xs text-slate-500">
              Department of Computer Science and Engineering (CSE)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportTeachingPlanToExcel(plan)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Approved 46h Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course File Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course File Checklist */}
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>KTU Course File Mandatory Checklist</span>
          </h2>

          <div className="space-y-3">
            {[
              { item: 'Official KTU Course Syllabus (2019/2024 Scheme)', status: 'Approved & Verified' },
              { item: 'Course Outcomes (CO) to Program Outcomes (PO) Mapping', status: 'Mapped (CO1-CO5)' },
              { item: 'Session-wise 46-Hour Lesson Plan Schedule', status: '46h Validated' },
              { item: 'First & Second Series Internal Examination Question Papers', status: 'Archived with Scheme' },
              { item: 'University Previous Year Papers (Dec 2021, Dec 2022, Model 1-5)', status: 'Archived (12 Papers)' },
              { item: 'Valuation Scheme & Step Mark Criteria (B2 Scheme Dec 2022)', status: 'Verified' },
              { item: 'Continuous Assessment Sample Lab Assignments & Quizzes', status: 'Complete' }
            ].map((entry, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl glass-card flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{entry.item}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Coverage & Student Performance */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              <span>Syllabus Coverage & Internal Performance</span>
            </h2>

            <div className="space-y-4">
              {ACADEMIC_SUBJECTS.map((s) => {
                const cov = coverageMarks[s.id] || 80;
                return (
                  <div key={s.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">
                        {s.code} — {s.name}
                      </span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">{cov}% Complete</span>
                    </div>
                    <div className="w-full bg-slate-200/60 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full"
                        style={{ width: `${cov}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-600 dark:text-slate-300">
            <strong>Accreditation Compliance Note: </strong>
            All curriculum documents and 46-hour session breakdowns adhere to KTU academic audit regulations and NBA accreditation criteria.
          </div>
        </div>
      </div>
    </div>
  );
};
