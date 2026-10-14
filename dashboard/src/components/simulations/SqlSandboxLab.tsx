import React, { useState } from 'react';
import { Database, Play, RotateCcw, CheckCircle2, AlertCircle, Clock, Zap, FileCode } from 'lucide-react';
import { executeSqlQuery, SqlExecutionResult } from '../../services/sqlEngine';

export const SqlSandboxLab: React.FC = () => {
  const [query, setQuery] = useState<string>('SELECT name, course, semester, gpa FROM students WHERE gpa >= 8.5 ORDER BY gpa DESC;');
  const [execResult, setExecResult] = useState<SqlExecutionResult>(() => 
    executeSqlQuery('SELECT name, course, semester, gpa FROM students WHERE gpa >= 8.5 ORDER BY gpa DESC;')
  );

  const handleRunQuery = () => {
    const res = executeSqlQuery(query);
    setExecResult(res);
  };

  const handleSetPreset = (presetSql: string) => {
    setQuery(presetSql);
    setExecResult(executeSqlQuery(presetSql));
  };

  return (
    <div className="glass-panel p-6 sm:p-8 space-y-6 border-blue-500/30">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Interactive SQL Sandbox & JDBC Engine
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30">
                In-Memory RDBMS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              CST205 Module 5 • Real-time query execution, projection, filtering & execution plan tracing
            </p>
          </div>
        </div>

        {/* Quick Query Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => handleSetPreset("SELECT * FROM students WHERE semester = 'S5' ORDER BY gpa DESC;")}
            className="px-2.5 py-1 rounded-lg glass-button text-blue-600 dark:text-blue-400 hover:border-blue-400"
          >
            S5 Students
          </button>
          <button
            onClick={() => handleSetPreset("SELECT name, gpa FROM students WHERE gpa >= 9.0 ORDER BY gpa DESC;")}
            className="px-2.5 py-1 rounded-lg glass-button text-emerald-600 dark:text-emerald-400 hover:border-emerald-400"
          >
            GPA &ge; 9.0
          </button>
          <button
            onClick={() => handleSetPreset("SELECT * FROM students WHERE course LIKE '%Networks%';")}
            className="px-2.5 py-1 rounded-lg glass-button text-cyan-600 dark:text-cyan-400 hover:border-cyan-400"
          >
            Networks Course
          </button>
          <button
            onClick={() => handleSetPreset("SELECT name, attendance, gpa FROM students WHERE attendance < 90 ORDER BY attendance ASC;")}
            className="px-2.5 py-1 rounded-lg glass-button text-amber-600 dark:text-amber-400 hover:border-amber-400"
          >
            Low Attendance
          </button>
        </div>
      </div>

      {/* Query Input Box with Run Button */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleRunQuery(); }}
              className="glass-input w-full p-3 font-mono text-xs pr-10 text-slate-100 bg-slate-950/80 border-slate-700/80 focus:border-cyan-400 rounded-xl"
              placeholder="SELECT [cols|*] FROM students WHERE [condition] ORDER BY [col] LIMIT [n];"
            />
          </div>
          <button
            onClick={handleRunQuery}
            className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute SQL</span>
          </button>
        </div>

        {/* Execution Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Clock className="w-3 h-3" />
              <span>Execution Time: {execResult.executionTimeMs} ms</span>
            </span>
            <span>•</span>
            <span className="text-cyan-400">Rows Returned: {execResult.rowCount}</span>
          </div>
          <div className="text-slate-500 truncate max-w-md">
            <span>Query Plan: {execResult.executionPlan}</span>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {!execResult.success && execResult.error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">SQL Execution Failed</div>
            <div className="text-[11px] text-rose-200 mt-0.5">{execResult.error}</div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {execResult.success && (
        <div className="rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/60 shadow-lg">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-100/80 dark:bg-slate-900/90 text-slate-400 border-b border-slate-200/50 dark:border-slate-800/80">
              <tr>
                {execResult.columns.map((col) => (
                  <th key={col} className="py-2.5 px-4 uppercase text-[10px] tracking-wider font-bold text-cyan-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 bg-white/40 dark:bg-slate-950/40">
              {execResult.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition-colors">
                  {execResult.columns.map((col) => {
                    const val = row[col];
                    const isGpa = col === 'gpa';
                    const isName = col === 'name';
                    return (
                      <td key={col} className={`py-2.5 px-4 ${
                        isGpa ? 'font-bold text-emerald-400' : isName ? 'font-semibold text-slate-100' : 'text-slate-300'
                      }`}>
                        {val !== null && val !== undefined ? String(val) : <span className="text-slate-600">NULL</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {execResult.rowCount === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              0 rows matched your WHERE condition.
            </div>
          )}
        </div>
      )}

      {/* Schema Reference Panel */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span>
          Schema: <strong className="text-slate-200">students</strong> (id INT, name VARCHAR, course VARCHAR, semester VARCHAR, gpa FLOAT, credits INT, attendance INT)
        </span>
        <span className="text-blue-400">KTU DBMS Lab Compatible</span>
      </div>
    </div>
  );
};
