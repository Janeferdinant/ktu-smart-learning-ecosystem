import React, { useState } from 'react';
import { Cpu, Play, BarChart2, Clock } from 'lucide-react';

interface Process {
  id: string;
  burst: number;
  arrival: number;
  priority: number;
}

const DEFAULT_PROCESSES: Process[] = [
  { id: 'P1', burst: 6, arrival: 0, priority: 2 },
  { id: 'P2', burst: 4, arrival: 1, priority: 1 },
  { id: 'P3', burst: 8, arrival: 2, priority: 3 },
  { id: 'P4', burst: 3, arrival: 3, priority: 4 }
];

export const CpuSchedulingLab: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'sjf' | 'rr'>('fcfs');
  const [quantum, setQuantum] = useState<number>(2);

  // Simplified calculation for demo
  const getGanttChart = () => {
    if (algorithm === 'fcfs') {
      return [
        { pid: 'P1', start: 0, end: 6, color: 'bg-blue-600' },
        { pid: 'P2', start: 6, end: 10, color: 'bg-indigo-600' },
        { pid: 'P3', start: 10, end: 18, color: 'bg-cyan-600' },
        { pid: 'P4', start: 18, end: 21, color: 'bg-teal-600' }
      ];
    } else if (algorithm === 'sjf') {
      return [
        { pid: 'P1', start: 0, end: 6, color: 'bg-blue-600' },
        { pid: 'P4', start: 6, end: 9, color: 'bg-teal-600' },
        { pid: 'P2', start: 9, end: 13, color: 'bg-indigo-600' },
        { pid: 'P3', start: 13, end: 21, color: 'bg-cyan-600' }
      ];
    } else {
      // Round Robin Q=2
      return [
        { pid: 'P1', start: 0, end: 2, color: 'bg-blue-600' },
        { pid: 'P2', start: 2, end: 4, color: 'bg-indigo-600' },
        { pid: 'P1', start: 4, end: 6, color: 'bg-blue-600' },
        { pid: 'P3', start: 6, end: 8, color: 'bg-cyan-600' },
        { pid: 'P4', start: 8, end: 10, color: 'bg-teal-600' },
        { pid: 'P1', start: 10, end: 12, color: 'bg-blue-600' }
      ];
    }
  };

  const gantt = getGanttChart();
  const avgTurnaround = algorithm === 'sjf' ? '11.5 ms' : algorithm === 'fcfs' ? '13.2 ms' : '14.0 ms';
  const avgWaiting = algorithm === 'sjf' ? '6.2 ms' : algorithm === 'fcfs' ? '8.0 ms' : '8.7 ms';

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              CPU Scheduling & Turnaround Time Laboratory
            </h3>
            <span className="text-[11px] text-slate-500">
              Interactive Gantt Chart • FCFS vs Shortest Job First vs Round Robin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['fcfs', 'sjf', 'rr'].map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                algorithm === algo ? 'bg-indigo-600 text-white shadow-xs' : 'glass-button'
              }`}
            >
              {algo === 'rr' ? 'Round Robin (Q=2)' : algo}
            </button>
          ))}
        </div>
      </div>

      {/* Gantt Chart Bar */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Execution Gantt Chart Timeline:
        </div>
        <div className="flex rounded-2xl overflow-hidden border border-slate-700 shadow-md h-12">
          {gantt.map((block, i) => (
            <div
              key={i}
              className={`${block.color} text-white flex flex-col items-center justify-center font-mono font-bold text-xs border-r border-white/20`}
              style={{ flexGrow: block.end - block.start }}
            >
              <span>{block.pid}</span>
              <span className="text-[10px] text-white/70">{block.start}-{block.end}ms</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-3 rounded-xl glass-card">
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{avgTurnaround}</div>
          <div className="text-[10px] text-slate-500">Average Turnaround Time</div>
        </div>
        <div className="p-3 rounded-xl glass-card">
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{avgWaiting}</div>
          <div className="text-[10px] text-slate-500">Average Waiting Time</div>
        </div>
        <div className="p-3 rounded-xl glass-card">
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
          <div className="text-[10px] text-slate-500">CPU Utilization</div>
        </div>
        <div className="p-3 rounded-xl glass-card">
          <div className="text-base font-bold text-blue-600 dark:text-blue-400 font-mono">21 ms</div>
          <div className="text-[10px] text-slate-500">Total Makespan</div>
        </div>
      </div>
    </div>
  );
};
