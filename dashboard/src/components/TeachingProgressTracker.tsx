import React from 'react';
import { CheckCircle2, Clock, CalendarDays, Award } from 'lucide-react';

interface TeachingProgressTrackerProps {
  totalSessions: number;
  completedSessions: number;
  totalHours: number;
  completedHours: number;
}

export const TeachingProgressTracker: React.FC<TeachingProgressTrackerProps> = ({
  totalSessions,
  completedSessions,
  totalHours,
  completedHours
}) => {
  const percentage = Math.round((completedSessions / totalSessions) * 100) || 0;

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Semester Delivery Progress Tracker
          </h3>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
          {percentage}% Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/60 dark:bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
            {completedSessions} / {totalSessions}
          </div>
          <div className="text-[10px] text-slate-500">Sessions Taught</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
            {completedHours} / {totalHours}h
          </div>
          <div className="text-[10px] text-slate-500">Teaching Hours</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {totalHours - completedHours}h
          </div>
          <div className="text-[10px] text-slate-500">Hours Remaining</div>
        </div>
      </div>
    </div>
  );
};
