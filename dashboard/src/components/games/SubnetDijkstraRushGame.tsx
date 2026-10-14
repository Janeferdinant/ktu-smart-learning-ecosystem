import React, { useState, useEffect } from 'react';
import { Network, Zap, Timer, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface SubnetQuestion {
  requiredHosts: number;
  correctCidr: number;
  correctMask: string;
  usableHosts: number;
}

export const SubnetDijkstraRushGame: React.FC = () => {
  const [stage, setStage] = useState<'subnet' | 'dijkstra'>('subnet');
  const [selectedCidr, setSelectedCidr] = useState<number>(26);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [activeRouterPath, setActiveRouterPath] = useState<string[]>(['R1']);
  const [targetRouter] = useState<string>('R5');
  const [feedback, setFeedback] = useState<string>('Select the most optimal CIDR prefix that satisfies host requirements with minimal waste.');

  const [question, setQuestion] = useState<SubnetQuestion>({
    requiredHosts: 52,
    correctCidr: 26,
    correctMask: '255.255.255.192',
    usableHosts: 62
  });

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

  const verifySubnet = () => {
    if (selectedCidr === question.correctCidr) {
      setScore(score + 150);
      setFeedback(`✓ CIDR /${selectedCidr} Verified! Provides ${question.usableHosts} usable hosts. Transitioning to Dijkstra Routing Rush!`);
      playTone(650, 'triangle', 0.15);
      setTimeout(() => {
        setStage('dijkstra');
        setFeedback('Click adjacent router nodes to compute Dijkstra shortest path from R1 to R5 with minimum total cost.');
      }, 900);
    } else {
      setFeedback(`✗ Incorrect Subnet! /${selectedCidr} does not optimally fit ${question.requiredHosts} hosts.`);
      playTone(220, 'sawtooth', 0.25);
    }
  };

  // Dijkstra Router Network Topology
  const links = [
    { u: 'R1', v: 'R2', cost: 3 },
    { u: 'R1', v: 'R3', cost: 5 },
    { u: 'R2', v: 'R3', cost: 1 },
    { u: 'R2', v: 'R4', cost: 6 },
    { u: 'R3', v: 'R4', cost: 2 },
    { u: 'R4', v: 'R5', cost: 2 }
  ];

  const handleRouterClick = (node: string) => {
    if (stage !== 'dijkstra') return;
    const current = activeRouterPath[activeRouterPath.length - 1];
    
    // Check if connected
    const isConnected = links.some(l => 
      (l.u === current && l.v === node) || (l.v === current && l.u === node)
    );

    if (isConnected && !activeRouterPath.includes(node)) {
      const newPath = [...activeRouterPath, node];
      setActiveRouterPath(newPath);
      playTone(500 + newPath.length * 50, 'sine', 0.08);

      if (node === targetRouter) {
        // Optimal path: R1 -> R2 -> R3 -> R4 -> R5 (Cost: 3 + 1 + 2 + 2 = 8)
        const pathCost = calculatePathCost(newPath);
        if (pathCost === 8) {
          setScore(score + 250);
          setFeedback(`🏆 Optimal Dijkstra SPF Path Found: ${newPath.join(' → ')} (Total Metric Cost: 8)!`);
          playTone(800, 'triangle', 0.2);
        } else {
          setScore(score + 100);
          setFeedback(`✓ Path completed: ${newPath.join(' → ')}, but suboptimal cost (${pathCost} vs optimal 8).`);
          playTone(400, 'sine', 0.15);
        }
      }
    } else {
      playTone(200, 'sawtooth', 0.2);
    }
  };

  const calculatePathCost = (path: string[]): number => {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const l = links.find(x => (x.u === u && x.v === v) || (x.v === u && x.u === v));
      if (l) total += l.cost;
    }
    return total;
  };

  const resetGame = () => {
    setStage('subnet');
    setSelectedCidr(26);
    setActiveRouterPath(['R1']);
    setFeedback('Select the optimal CIDR prefix that satisfies host requirements.');
    playTone(440, 'sine', 0.1);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 gap-4">
        <div>
          <div className="text-[10px] uppercase font-mono text-slate-400">Current Phase</div>
          <div className="text-sm font-bold text-white mt-0.5">
            {stage === 'subnet' ? 'Phase 1: CIDR VLSM Partitioning' : 'Phase 2: Dijkstra SPF Packet Routing'}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Total Score</div>
            <div className="text-xl font-black font-mono text-amber-400">{score} pts</div>
          </div>
          <button onClick={resetGame} className="px-3 py-1.5 rounded-xl text-xs glass-button hover:border-slate-500">
            Reset
          </button>
        </div>
      </div>

      {/* Stage 1: CIDR Partitioning */}
      {stage === 'subnet' && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
          <div className="max-w-xl mx-auto space-y-4 text-center">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Department IP Slicing Challenge
            </span>
            <h3 className="text-2xl font-black text-white">
              Allocate Subnet for Exactly <span className="text-cyan-400">{question.requiredHosts} Host Devices</span>
            </h3>
            <p className="text-xs text-slate-400">
              Choose the tightest CIDR prefix that accommodates all hosts without exceeding the allocation boundaries.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { cidr: 25, hosts: 126, mask: '255.255.255.128' },
              { cidr: 26, hosts: 62, mask: '255.255.255.192' },
              { cidr: 27, hosts: 30, mask: '255.255.255.224' },
              { cidr: 28, hosts: 14, mask: '255.255.255.240' }
            ].map(item => (
              <button
                key={item.cidr}
                onClick={() => { setSelectedCidr(item.cidr); playTone(500, 'sine', 0.05); }}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  selectedCidr === item.cidr
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-lg font-black font-mono">/{item.cidr}</div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">{item.hosts} usable</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">{item.mask}</div>
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto text-center space-y-3">
            <button
              onClick={verifySubnet}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition"
            >
              Verify Subnet Mask Allocation
            </button>
            <div className="text-xs font-mono text-slate-400">{feedback}</div>
          </div>
        </div>
      )}

      {/* Stage 2: Dijkstra Routing Rush */}
      {stage === 'dijkstra' && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Active Path: <strong className="text-cyan-400">{activeRouterPath.join(' → ')}</strong>
            </span>
            <span className="text-xs font-mono text-amber-400">
              Current Cost: {calculatePathCost(activeRouterPath)}
            </span>
          </div>

          {/* Interactive Router Node Network */}
          <div className="grid grid-cols-5 gap-3 text-center my-6">
            {['R1', 'R2', 'R3', 'R4', 'R5'].map((r) => {
              const isSelected = activeRouterPath.includes(r);
              const isCurrent = activeRouterPath[activeRouterPath.length - 1] === r;
              return (
                <button
                  key={r}
                  onClick={() => handleRouterClick(r)}
                  className={`p-4 rounded-2xl border-2 font-mono transition-all transform hover:scale-105 ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                      : isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="text-lg font-black">{r}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {r === 'R1' ? 'SOURCE' : r === 'R5' ? 'DEST' : 'ROUTER'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Router Link Costs Reference */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 grid grid-cols-3 gap-2">
            <div>R1-R2: <strong>Cost 3</strong></div>
            <div>R1-R3: <strong>Cost 5</strong></div>
            <div>R2-R3: <strong>Cost 1</strong></div>
            <div>R2-R4: <strong>Cost 6</strong></div>
            <div>R3-R4: <strong>Cost 2</strong></div>
            <div>R4-R5: <strong>Cost 2</strong></div>
          </div>

          <div className="text-xs font-mono text-center text-slate-400">{feedback}</div>
        </div>
      )}
    </div>
  );
};
