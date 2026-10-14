import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

interface GateChallenge {
  id: number;
  gateType: 'AND' | 'OR' | 'XOR' | 'NAND';
  targetOutput: number; // 0 or 1
  packetData: string;
}

export const LogicGateDefenderGame: React.FC = () => {
  const [inputA, setInputA] = useState<number>(0);
  const [inputB, setInputB] = useState<number>(1);
  const [currentGate, setCurrentGate] = useState<'AND' | 'OR' | 'XOR' | 'NAND'>('AND');
  const [shieldHealth, setShieldHealth] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [challenge, setChallenge] = useState<GateChallenge>({
    id: 1,
    gateType: 'AND',
    targetOutput: 1,
    packetData: '0xFA3D_SYN'
  });
  const [feedback, setFeedback] = useState<string>('Match gate inputs to target output to allow valid packet transmission.');

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

  // Evaluate Current Gate Output
  const evaluateGate = (a: number, b: number, gate: string): number => {
    if (gate === 'AND') return (a && b) ? 1 : 0;
    if (gate === 'OR') return (a || b) ? 1 : 0;
    if (gate === 'XOR') return (a !== b) ? 1 : 0;
    if (gate === 'NAND') return !(a && b) ? 1 : 0;
    return 0;
  };

  const currentOutput = evaluateGate(inputA, inputB, currentGate);

  const generateNewChallenge = () => {
    const gates: ('AND' | 'OR' | 'XOR' | 'NAND')[] = ['AND', 'OR', 'XOR', 'NAND'];
    const selectedGate = gates[Math.floor(Math.random() * gates.length)];
    const target = Math.random() > 0.5 ? 1 : 0;
    const packetHex = '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase() + '_PKT';

    setChallenge({
      id: Date.now(),
      gateType: selectedGate,
      targetOutput: target,
      packetData: packetHex
    });
    setCurrentGate(selectedGate);
  };

  const transmitPacket = () => {
    if (shieldHealth <= 0) return;

    if (currentOutput === challenge.targetOutput) {
      const newScore = score + 50 + streak * 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setFeedback(`✓ Parity Verified! ${currentGate} produced output ${currentOutput}. Packet delivered.`);
      playTone(660, 'triangle', 0.15);
      generateNewChallenge();
    } else {
      const newHealth = Math.max(0, shieldHealth - 20);
      setShieldHealth(newHealth);
      setStreak(0);
      setFeedback(`✗ Checksum Mismatch! ${currentGate}(${inputA}, ${inputB}) = ${currentOutput}, but firewall requires ${challenge.targetOutput}!`);
      playTone(220, 'sawtooth', 0.3);

      if (newHealth <= 0) {
        setFeedback('FIREWALL BREACHED! Shield exhausted due to invalid packet frames.');
      }
    }
  };

  const resetGame = () => {
    setShieldHealth(100);
    setScore(0);
    setStreak(0);
    setInputA(0);
    setInputB(1);
    generateNewChallenge();
    setFeedback('Circuit reset. Match inputs to target output.');
    playTone(440, 'sine', 0.1);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 gap-4">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Shield Integrity</div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-32 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    shieldHealth > 50 ? 'bg-emerald-500' : shieldHealth > 20 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${shieldHealth}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-slate-200">{shieldHealth}%</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Current Streak</div>
            <div className="font-mono text-sm font-extrabold text-cyan-400 mt-0.5">{streak}x Multiplier</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Total Score</div>
            <div className="font-mono text-lg font-black text-amber-400">{score} pts</div>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-xl glass-button text-xs hover:border-slate-500 transition"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Circuit Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Circuit Diagram View */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          {/* Target Requirement Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Incoming Frame:</span>
              <span className="text-cyan-400 font-bold">{challenge.packetData}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Required Target Output:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/40">
                Y = {challenge.targetOutput}
              </span>
            </div>
          </div>

          {/* Interactive Circuit Nodes */}
          <div className="my-8 flex items-center justify-around">
            {/* Input Pins */}
            <div className="flex flex-col gap-6">
              <button
                onClick={() => { setInputA(inputA === 1 ? 0 : 1); playTone(500, 'sine', 0.05); }}
                className={`w-16 h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all transform hover:scale-105 ${
                  inputA === 1
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <span className="text-[10px] text-slate-400">Input A</span>
                <span className="text-lg font-black">{inputA}</span>
              </button>

              <button
                onClick={() => { setInputB(inputB === 1 ? 0 : 1); playTone(500, 'sine', 0.05); }}
                className={`w-16 h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all transform hover:scale-105 ${
                  inputB === 1
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <span className="text-[10px] text-slate-400">Input B</span>
                <span className="text-lg font-black">{inputB}</span>
              </button>
            </div>

            {/* Wire Traces */}
            <div className="flex flex-col gap-8 text-slate-600 font-mono text-sm">
              <div>────►</div>
              <div>────►</div>
            </div>

            {/* Central Logic Gate Block */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/60 shadow-xl shadow-cyan-500/10 text-center min-w-[140px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Gate</div>
              <div className="text-2xl font-black text-white mt-1">{currentGate}</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-1">Logic Unit</div>
            </div>

            {/* Output Wire */}
            <div className="text-slate-600 font-mono text-sm">──────►</div>

            {/* Output Probe */}
            <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono shadow-xl transition-all ${
              currentOutput === challenge.targetOutput
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                : 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-rose-500/20'
            }`}>
              <span className="text-[10px] uppercase font-semibold">Output Y</span>
              <span className="text-2xl font-black">{currentOutput}</span>
            </div>
          </div>

          {/* Feedback Strip */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>{feedback}</span>
            <button
              onClick={transmitPacket}
              disabled={shieldHealth <= 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Transmit Packet</span>
            </button>
          </div>
        </div>

        {/* Truth Table Reference Guide */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Boolean Gate Truth Reference</span>
          </h4>

          <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
            <div className="p-1.5 rounded bg-slate-800/80 text-slate-400">A</div>
            <div className="p-1.5 rounded bg-slate-800/80 text-slate-400">B</div>
            <div className="p-1.5 rounded bg-slate-800/80 text-cyan-400 font-bold">{currentGate}</div>
            <div className="p-1.5 rounded bg-slate-800/80 text-slate-400">Status</div>

            <div className="p-1 rounded bg-slate-950/50">0</div>
            <div className="p-1 rounded bg-slate-950/50">0</div>
            <div className="p-1 rounded bg-slate-950/50 font-bold">{evaluateGate(0, 0, currentGate)}</div>
            <div className="p-1 rounded bg-slate-950/50 text-[10px]">{inputA === 0 && inputB === 0 ? '👈 Current' : '-'}</div>

            <div className="p-1 rounded bg-slate-950/50">0</div>
            <div className="p-1 rounded bg-slate-950/50">1</div>
            <div className="p-1 rounded bg-slate-950/50 font-bold">{evaluateGate(0, 1, currentGate)}</div>
            <div className="p-1 rounded bg-slate-950/50 text-[10px]">{inputA === 0 && inputB === 1 ? '👈 Current' : '-'}</div>

            <div className="p-1 rounded bg-slate-950/50">1</div>
            <div className="p-1 rounded bg-slate-950/50">0</div>
            <div className="p-1 rounded bg-slate-950/50 font-bold">{evaluateGate(1, 0, currentGate)}</div>
            <div className="p-1 rounded bg-slate-950/50 text-[10px]">{inputA === 1 && inputB === 0 ? '👈 Current' : '-'}</div>

            <div className="p-1 rounded bg-slate-950/50">1</div>
            <div className="p-1 rounded bg-slate-950/50">1</div>
            <div className="p-1 rounded bg-slate-950/50 font-bold">{evaluateGate(1, 1, currentGate)}</div>
            <div className="p-1 rounded bg-slate-950/50 text-[10px]">{inputA === 1 && inputB === 1 ? '👈 Current' : '-'}</div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
            <strong>💡 Pro-Tip:</strong> In XOR gates, output is 1 whenever inputs disagree (A ≠ B). This makes XOR the mathematical heart of parity error detection in network packets!
          </div>
        </div>

      </div>
    </div>
  );
};
