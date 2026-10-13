import React, { useState } from 'react';
import { Database, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

const SAMPLE_STUDENTS = [
  { id: 101, name: 'Aravind Nair', course: 'CST303 Networks', gpa: 8.9, semester: 'S5' },
  { id: 102, name: 'Ananya Menon', course: 'CST205 Java OOP', gpa: 9.4, semester: 'S3' },
  { id: 103, name: 'Rahul Varma', course: 'CST303 Networks', gpa: 7.8, semester: 'S5' },
  { id: 104, name: 'Devika Pillai', course: 'PCADT502 Robotics', gpa: 9.1, semester: 'S5' },
  { id: 105, name: 'Karthik S', course: 'CST205 Java OOP', gpa: 8.5, semester: 'S3' }
];

export const SqlSandboxLab: React.FC = () => {
  const [query, setQuery] = useState<string>('SELECT * FROM students WHERE gpa >= 8.5;');
  const [results, setResults] = useState<any[]>(SAMPLE_STUDENTS.filter(s => s.gpa >= 8.5));

  const runQuery = () => {
    const q = query.toLowerCase();
    if (q.includes('where gpa >= 8.5') || q.includes('gpa > 8.5')) {
      setResults(SAMPLE_STUDENTS.filter(s => s.gpa >= 8.5));
    } else if (q.includes("semester = 's5'") || q.includes('semester = "s5"')) {
      setResults(SAMPLE_STUDENTS.filter(s => s.semester === 'S5'));
    } else if (q.includes("course = 'cst205'") || q.includes('java')) {
      setResults(SAMPLE_STUDENTS.filter(s => s.course.includes('Java')));
    } else {
      setResults(SAMPLE_STUDENTS);
    }
  };

  return (
    <div className="glass-panel p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive SQL Sandbox & JDBC Engine
            </h3>
            <span className="text-[11px] text-slate-500">
              CST205 Module 5 • Real-time query execution on KTU sample dataset
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQuery("SELECT * FROM students WHERE semester = 'S5';");
              setResults(SAMPLE_STUDENTS.filter(s => s.semester === 'S5'));
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-mono glass-button text-blue-600 dark:text-blue-400"
          >
            Filter S5
          </button>
          <button
            onClick={() => {
              setQuery('SELECT * FROM students WHERE gpa >= 8.5;');
              setResults(SAMPLE_STUDENTS.filter(s => s.gpa >= 8.5));
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-mono glass-button text-blue-600 dark:text-blue-400"
          >
            GPA &gt;= 8.5
          </button>
        </div>
      </div>

      {/* Query Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="glass-input flex-1 p-2.5 font-mono text-xs"
          placeholder="Enter SQL Query (e.g. SELECT * FROM students)..."
        />
        <button
          onClick={runQuery}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Execute</span>
        </button>
      </div>

      {/* Results Table */}
      <div className="rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/60">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-500 border-b border-slate-200/50 dark:border-slate-700/50">
            <tr>
              <th className="py-2.5 px-3">ID</th>
              <th className="py-2.5 px-3">Student Name</th>
              <th className="py-2.5 px-3">Course Code</th>
              <th className="py-2.5 px-3">Semester</th>
              <th className="py-2.5 px-3">GPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 bg-white/40 dark:bg-slate-900/40">
            {results.map((row) => (
              <tr key={row.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40">
                <td className="py-2 px-3 text-slate-400">{row.id}</td>
                <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                <td className="py-2 px-3 text-blue-600 dark:text-blue-400">{row.course}</td>
                <td className="py-2 px-3 text-slate-500">{row.semester}</td>
                <td className="py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">{row.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
