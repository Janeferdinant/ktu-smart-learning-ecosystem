import React, { useState, useEffect } from 'react';
import { Cpu, AlertOctagon, CheckCircle2, RotateCcw, Zap, GitCommit } from 'lucide-react';

interface ThreadNode {
  id: string;
  name: string;
  holds: string;
  waitsFor: string;
  rollbackCost: number; // in milliseconds / currency
  priority: number;
}

export const DistributedDeadlockCommandGame: React.FC = () => {
  const [deadlockResolved, setDeadlockResolved] = useState<boolean>(false);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [log, setLog] = useState<string>('WARNING: Circular lock wait condition detected! T1 → R2 → T2 → R3 → T3 → R1. Identify lowest-cost thread to preempt.');
  
  const [threads, setThreads] = useState<ThreadNode[]>([
    { id: 'T1', name: 'PaymentProcessingThread', holds: 'Lock(DB_WAL)', waitsFor: 'Lock(OrderTable)', rollbackCost: 120, priority: 8 },
    { id: 'T2', name: 'InventoryReserveThread', holds: 'Lock(OrderTable)', waitsFor: 'Lock(StockCache)', rollbackCost: 45, priority: 4 },
    { id: 'T3', name: 'NotificationDispatchThread', holds: 'Lock(StockCache)', waitsFor: 'Lock(DB_WAL)', rollbackCost: 15, priority: 2 },
    { id: 'T4', name: 'AnalyticsFlushThread', holds: 'Lock(Telemetry)', waitsFor: 'None', rollbackCost: 10, priority: 1 }
  ]);

  // Sound Synthesizer
  const playTone = (freq: number, type: OscillatorType, duration: number) => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy
    }
  };

  const handlePreemptThread = (threadId: string) => {
    setSelectedThread(threadId);

    // T3 is the optimal victim (lowest rollback cost: 15ms, breaks cycle T1->T2->T3->T1)
    if (threadId === 'T3') {
      setDeadlockResolved(true);
      const earned = 350;
      setScore(score + earned);
      setLog(`✓ OPTIMAL VICTIM SELECTION! Thread T3 (NotificationDispatch) aborted at minimal cost (15ms). Circular wait broken; T1 and T2 executed to completion! +${earned} pts`);
      playTone(660, 'triangle', 0.15);
      setTimeout(() => playTone(880, 'triangle', 0.25), 100);
    } else if (threadId === 'T4') {
      setLog(`❌ Ineffective Action! Thread T4 is not part of the circular wait cycle! Deadlock persists.`);
      playTone(180, 'sawtooth', 0.3);
    } else {
      setDeadlockResolved(true);
      const earned = 150;
      setScore(score + earned);
      setLog(`⚠️ Suboptimal Selection: Preempted ${threadId}. Deadlock broken, but heavy rollback cost incurred (${threads.find(t=>t.id===threadId)?.rollbackCost}ms)! +${earned} pts`);
      playTone(350, 'sine', 0.2);
    }
  };

  const resetSimulation = () => {
    setDeadlockResolved(false);
    setSelectedThread(null);
    setLog('WARNING: Circular lock wait condition detected! T1 → R2 → T2 → R3 → T3 → R1. Identify lowest-cost thread to preempt.');
    playTone(440, 'sine', 0.1);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Concurrency Monitor</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {deadlockResolved ? 'Status: Normal (Throughput 100%)' : 'CRITICAL: Mutual Exclusion Deadlock Detected!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Architect Score</div>
            <div className="text-xl font-black font-mono text-cyan-400">{score} pts</div>
          </div>
          <button onClick={resetSimulation} className="px-3 py-1.5 rounded-xl text-xs glass-button hover:border-slate-500">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Graph & Process Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RAG Graph Visualization */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Resource Allocation Graph (RAG) Topology</span>
            <span className={deadlockResolved ? 'text-emerald-400' : 'text-rose-400'}>
              {deadlockResolved ? 'CYCLE BROKEN' : 'ACTIVE CYCLE: T1 ⇆ T2 ⇆ T3'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-slate-950">
              <span className="text-cyan-400">Thread T1</span>
              <span className="text-slate-500">──[Holds: DB_WAL]──►</span>
              <span className="text-rose-400">WaitsFor: OrderTable</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950">
              <span className="text-purple-400">Thread T2</span>
              <span className="text-slate-500">──[Holds: OrderTable]──►</span>
              <span className="text-rose-400">WaitsFor: StockCache</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950">
              <span className="text-amber-400">Thread T3</span>
              <span className="text-slate-500">──[Holds: StockCache]──►</span>
              <span className="text-rose-400">WaitsFor: DB_WAL (CYCLE!)</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs font-mono ${
            deadlockResolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {log}
          </div>
        </div>

        {/* Candidate Preemption Decision Panel */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Select Victim Thread to Preempt:
          </div>

          {threads.map(t => (
            <div
              key={t.id}
              className={`p-3.5 rounded-xl border transition-all ${
                selectedThread === t.id
                  ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">{t.id}</span>
                  <span>{t.name}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Priority: {t.priority}</span>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Rollback Cost: <strong className="text-amber-400">{t.rollbackCost} ms</strong></span>
                <span>{t.holds}</span>
              </div>

              <button
                onClick={() => handlePreemptThread(t.id)}
                disabled={deadlockResolved}
                className="w-full mt-2 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition disabled:opacity-30"
              >
                Preempt & Revoke Locks
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
