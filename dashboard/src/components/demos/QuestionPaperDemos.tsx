import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, Network, ArrowRight } from 'lucide-react';
import { QuestionPaperDemoConfig } from '../../data/questionPaperSolutionsData';

// ----------------- 1. Dijkstra Shortest Path Explorer -----------------
export const DijkstraDemo: React.FC<{ initialState?: Record<string, any> }> = ({ initialState }) => {
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [source, setSource] = useState<string>(initialState?.source || 'A');
  const [target, setTarget] = useState<string>(initialState?.target || 'F');
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Graph edge definitions: [u, v, weight]
  const edges: [string, string, number][] = [
    ['A', 'B', 4],
    ['A', 'C', 2],
    ['B', 'C', 1],
    ['B', 'D', 5],
    ['C', 'D', 8],
    ['C', 'E', 10],
    ['D', 'E', 2],
    ['D', 'F', 6],
    ['E', 'F', 3]
  ];

  // Steps calculation
  const steps = [
    {
      iter: 0,
      visited: ['A'],
      distances: { A: 0, B: 4, C: 2, D: Infinity, E: Infinity, F: Infinity },
      desc: 'Initialize: dist(A)=0. Tentative: dist(B)=4, dist(C)=2. All others ∞.'
    },
    {
      iter: 1,
      visited: ['A', 'C'],
      distances: { A: 0, B: 3, C: 2, D: 10, E: 12, F: Infinity },
      desc: 'Pick C (min cost 2). Relax neighbors: dist(B)=min(4, 2+1)=3, dist(D)=min(∞, 2+8)=10, dist(E)=min(∞, 2+10)=12.'
    },
    {
      iter: 2,
      visited: ['A', 'C', 'B'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 12, F: Infinity },
      desc: 'Pick B (min cost 3). Relax neighbors: dist(D)=min(10, 3+5)=8.'
    },
    {
      iter: 3,
      visited: ['A', 'C', 'B', 'D'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 14 },
      desc: 'Pick D (min cost 8). Relax neighbors: dist(E)=min(12, 8+2)=10, dist(F)=min(∞, 8+6)=14.'
    },
    {
      iter: 4,
      visited: ['A', 'C', 'B', 'D', 'E'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
      desc: 'Pick E (min cost 10). Relax neighbors: dist(F)=min(14, 10+3)=13.'
    },
    {
      iter: 5,
      visited: ['A', 'C', 'B', 'D', 'E', 'F'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
      desc: 'Destination F reached! Shortest path: A -> C -> B -> D -> E -> F (Total Cost: 13).'
    }
  ];

  const current = steps[currentStep] || steps[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/40 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Source:</span>
          <select
            value={source}
            onChange={(e) => { setSource(e.target.value); setCurrentStep(0); }}
            className="bg-slate-800 text-white rounded px-2 py-1 text-xs border border-white/10"
          >
            {nodes.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="text-slate-400 ml-2">Destination:</span>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-slate-800 text-white rounded px-2 py-1 text-xs border border-white/10"
          >
            {nodes.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep >= steps.length - 1}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <Play className="w-3.5 h-3.5" /> Next Iteration
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Step {current.iter} of {steps.length - 1}: Shortest Path Progress
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-mono bg-black/40 p-3 rounded-lg border border-white/5">
          {current.desc}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
          {nodes.map(node => {
            const isVisited = current.visited.includes(node);
            const dist = current.distances[node as keyof typeof current.distances];
            return (
              <div
                key={node}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isVisited
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800/40 border-white/10 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold font-mono">Node {node}</div>
                <div className="text-lg font-black tracking-tight mt-0.5">
                  {dist === Infinity ? '∞' : dist}
                </div>
                <div className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">
                  {isVisited ? 'Permanent' : 'Tentative'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ----------------- 2. CRC Polynomial Checksum & Bit-Corruption Generator -----------------
export const CrcDemo: React.FC<{ initialState?: Record<string, any> }> = ({ initialState }) => {
  const [dataPayload, setDataPayload] = useState<string>(initialState?.data || '1101011011');
  const generator = '10011'; // x^4 + x + 1 (KTU exam standard)
  const [corruptBitIndex, setCorruptBitIndex] = useState<number | null>(null);

  // Modulo-2 XOR Division
  const computeCRC = (data: string, poly: string): { codeword: string; remainder: string } => {
    const k = poly.length - 1;
    let padded = data + '0'.repeat(k);
    const bits = padded.split('').map(Number);
    const polyBits = poly.split('').map(Number);

    for (let i = 0; i <= bits.length - polyBits.length; i++) {
      if (bits[i] === 1) {
        for (let j = 0; j < polyBits.length; j++) {
          bits[i + j] ^= polyBits[j];
        }
      }
    }
    const rem = bits.slice(bits.length - k).join('');
    return { codeword: data + rem, remainder: rem };
  };

  const { codeword, remainder } = computeCRC(dataPayload, generator);

  // Received bits with simulated corruption
  const receivedBits = codeword.split('').map((bit, idx) => {
    if (corruptBitIndex === idx) {
      return bit === '1' ? '0' : '1';
    }
    return bit;
  }).join('');

  // Receiver verification
  const receiverCheck = (received: string, poly: string): { syndrome: string; isValid: boolean } => {
    const bits = received.split('').map(Number);
    const polyBits = poly.split('').map(Number);
    for (let i = 0; i <= bits.length - polyBits.length; i++) {
      if (bits[i] === 1) {
        for (let j = 0; j < polyBits.length; j++) {
          bits[i + j] ^= polyBits[j];
        }
      }
    }
    const synd = bits.slice(bits.length - (poly.length - 1)).join('');
    const isValid = parseInt(synd, 2) === 0;
    return { syndrome: synd, isValid };
  };

  const { syndrome, isValid } = receiverCheck(receivedBits, generator);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/50 rounded-xl border border-white/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-semibold text-slate-300">
            Sender Data Stream (Binary):
          </label>
          <span className="text-xs text-blue-400 font-mono">
            Generator G(x) = x⁴ + x + 1 (10011)
          </span>
        </div>
        <input
          type="text"
          value={dataPayload}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/[^01]/g, '');
            if (sanitized.length <= 16) setDataPayload(sanitized || '1');
            setCorruptBitIndex(null);
          }}
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 tracking-wider focus:outline-none focus:border-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-black/40 rounded-lg border border-white/5">
            <span className="text-xs text-slate-400">Computed CRC Remainder (R):</span>
            <div className="text-base font-mono font-bold text-amber-400 mt-1">{remainder}</div>
          </div>
          <div className="p-3 bg-black/40 rounded-lg border border-white/5">
            <span className="text-xs text-slate-400">Transmitted Codeword T = M + R:</span>
            <div className="text-base font-mono font-bold text-emerald-400 mt-1 break-all">{codeword}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Interactive Noise Channel (Click any bit to flip/corrupt):
          </span>
          {corruptBitIndex !== null && (
            <button
              onClick={() => setCorruptBitIndex(null)}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              Clear Noise
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 py-2">
          {codeword.split('').map((bit, idx) => {
            const isFlipped = corruptBitIndex === idx;
            const currentBit = isFlipped ? (bit === '1' ? '0' : '1') : bit;
            return (
              <button
                key={idx}
                onClick={() => setCorruptBitIndex(isFlipped ? null : idx)}
                title={`Bit ${idx + 1}: Click to invert`}
                className={`w-9 h-10 rounded-lg font-mono font-bold text-sm flex flex-col items-center justify-center transition-all ${
                  isFlipped
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
                }`}
              >
                <span>{currentBit}</span>
                <span className="text-[9px] opacity-50 font-normal">b{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className={`p-3.5 rounded-lg border flex items-center gap-3 ${
          isValid
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          {isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <div className="text-xs">
            <span className="font-bold">Receiver Syndrome: {syndrome}</span>
            <p className="mt-0.5 opacity-90">
              {isValid
                ? 'Remainder is ZERO (0000). Frame verified without corruption. Accepted!'
                : `Non-zero syndrome (${syndrome}) detected! Corrupted bit caught at position b${(corruptBitIndex ?? 0) + 1}. Frame discarded.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------- 3. IPv4 CIDR VLSM Subnet Slicer -----------------
export const CidrDemo: React.FC<{ initialState?: Record<string, any> }> = ({ initialState }) => {
  const [baseIp, setBaseIp] = useState<string>(initialState?.baseIp || '192.168.1.0');
  const [subnetsCount, setSubnetsCount] = useState<number>(initialState?.targetSubnets || 4);

  // Subnet calculations
  const borrowedBits = Math.ceil(Math.log2(subnetsCount));
  const defaultPrefix = baseIp.startsWith('172.') ? 16 : 24;
  const newPrefix = defaultPrefix + borrowedBits;
  const blockSize = Math.pow(2, 32 - newPrefix);
  const usableHosts = Math.max(0, blockSize - 2);

  const subnetsList = Array.from({ length: subnetsCount }).map((_, i) => {
    if (defaultPrefix === 24) {
      const netStart = i * blockSize;
      const netEnd = netStart + blockSize - 1;
      return {
        subnetNum: i + 1,
        networkId: `192.168.1.${netStart}/${newPrefix}`,
        usableRange: `192.168.1.${netStart + 1} - 192.168.1.${netEnd - 1}`,
        broadcast: `192.168.1.${netEnd}`,
        hosts: usableHosts
      };
    } else {
      // 172.16.x.x Class B
      const octetStep = 256 / subnetsCount;
      const octetStart = i * octetStep;
      return {
        subnetNum: i + 1,
        networkId: `172.16.${octetStart}.0/${newPrefix}`,
        usableRange: `172.16.${octetStart}.1 - 172.16.${octetStart + octetStep - 1}.254`,
        broadcast: `172.16.${octetStart + octetStep - 1}.255`,
        hosts: (octetStep * 256) - 2
      };
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/40 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Base Network:</span>
          <select
            value={baseIp}
            onChange={(e) => setBaseIp(e.target.value)}
            className="bg-slate-800 text-white rounded px-2.5 py-1 text-xs border border-white/10 font-mono"
          >
            <option value="192.168.1.0">192.168.1.0/24 (Class C)</option>
            <option value="172.16.0.0">172.16.0.0/16 (Class B)</option>
          </select>
          <span className="text-slate-400 ml-2">Number of Subnets:</span>
          <select
            value={subnetsCount}
            onChange={(e) => setSubnetsCount(Number(e.target.value))}
            className="bg-slate-800 text-white rounded px-2.5 py-1 text-xs border border-white/10 font-mono"
          >
            <option value="2">2 Subnets</option>
            <option value="4">4 Subnets</option>
            <option value="8">8 Subnets</option>
          </select>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded border border-emerald-500/20">
          Prefix: /{newPrefix} | {usableHosts} Hosts/Subnet
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider text-[11px] border-b border-white/10">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Network ID</th>
              <th className="p-3">Usable Host Range</th>
              <th className="p-3">Broadcast Address</th>
              <th className="p-3 text-right">Hosts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {subnetsList.map((sn) => (
              <tr key={sn.subnetNum} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-bold text-blue-400">Subnet {sn.subnetNum}</td>
                <td className="p-3 text-emerald-400 font-semibold">{sn.networkId}</td>
                <td className="p-3 text-slate-300">{sn.usableRange}</td>
                <td className="p-3 text-amber-400">{sn.broadcast}</td>
                <td className="p-3 text-right font-bold text-white">{sn.hosts.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------- 4. TCP Congestion Control Simulator (AIMD & Slow Start) -----------------
export const TcpCongestionDemo: React.FC<{ initialState?: Record<string, any> }> = () => {
  const [history, setHistory] = useState<number[]>([1, 2, 4, 8, 16, 17, 18, 19, 20]);
  const [ssthresh, setSsthresh] = useState<number>(16);
  const [mode, setMode] = useState<'Slow Start' | 'Congestion Avoidance'>('Congestion Avoidance');

  const currentCwnd = history[history.length - 1];

  const handleNextRtt = () => {
    let nextCwnd: number;
    if (currentCwnd < ssthresh) {
      nextCwnd = Math.min(64, currentCwnd * 2);
      setMode('Slow Start');
    } else {
      nextCwnd = Math.min(64, currentCwnd + 1);
      setMode('Congestion Avoidance');
    }
    setHistory(prev => [...prev.slice(-15), nextCwnd]);
  };

  const handleTimeout = () => {
    const newThresh = Math.max(2, Math.floor(currentCwnd / 2));
    setSsthresh(newThresh);
    setHistory(prev => [...prev.slice(-15), 1]);
    setMode('Slow Start');
  };

  const handleDupAck = () => {
    const newThresh = Math.max(2, Math.floor(currentCwnd / 2));
    setSsthresh(newThresh);
    setHistory(prev => [...prev.slice(-15), newThresh]);
    setMode('Congestion Avoidance');
  };

  const handleReset = () => {
    setHistory([1]);
    setSsthresh(16);
    setMode('Slow Start');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/40 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={handleNextRtt}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <Play className="w-3.5 h-3.5" /> Next RTT (+ACK)
          </button>
          <button
            onClick={handleDupAck}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> 3 Duplicate ACKs
          </button>
          <button
            onClick={handleTimeout}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Packet Timeout
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-blue-400 font-bold">cwnd: {currentCwnd} MSS</span>
          <span className="text-amber-400 font-bold">ssthresh: {ssthresh} MSS</span>
          <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">{mode}</span>
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
        <div className="text-xs font-semibold text-slate-300">
          Congestion Window Waveform (MSS over RTTs):
        </div>
        <div className="h-40 flex items-end gap-1.5 pt-6 pb-2 px-2 bg-slate-950 rounded-lg border border-white/5">
          {history.map((val, idx) => {
            const heightPercent = Math.min(100, Math.max(8, (val / 32) * 100));
            const isLatest = idx === history.length - 1;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">{val}</span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t transition-all ${
                    isLatest
                      ? 'bg-blue-400 ring-2 ring-blue-300'
                      : val > ssthresh
                      ? 'bg-emerald-500'
                      : 'bg-indigo-500'
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="text-[11px] text-slate-400 flex items-center justify-between">
          <span>🔵 Indigo = Slow Start (Exponential: 2^n)</span>
          <span>🟢 Green = Congestion Avoidance (Linear: +1 MSS/RTT)</span>
        </div>
      </div>
    </div>
  );
};

// ----------------- 5. Hamming (7,4) Code Single-Bit Error Recovery -----------------
export const HammingDemo: React.FC<{ initialState?: Record<string, any> }> = ({ initialState }) => {
  const [dataBits, setDataBits] = useState<string>(initialState?.data || '0110');
  const [corruptPos, setCorruptPos] = useState<number | null>(initialState?.errorPos ?? 3);

  // d1, d2, d3, d4
  const d = dataBits.padEnd(4, '0').slice(0, 4).split('').map(Number);
  const p1 = d[0] ^ d[1] ^ d[3];
  const p2 = d[0] ^ d[2] ^ d[3];
  const p4 = d[1] ^ d[2] ^ d[3];

  // positions: [1, 2, 3, 4, 5, 6, 7] -> [p1, p2, d1, p4, d2, d3, d4]
  const originalCodeword = [p1, p2, d[0], p4, d[1], d[2], d[3]];

  const receivedCodeword = originalCodeword.map((b, idx) => {
    const pos = idx + 1;
    return corruptPos === pos ? (b === 1 ? 0 : 1) : b;
  });

  // Calculate syndrome
  const s1 = receivedCodeword[0] ^ receivedCodeword[2] ^ receivedCodeword[4] ^ receivedCodeword[6];
  const s2 = receivedCodeword[1] ^ receivedCodeword[2] ^ receivedCodeword[5] ^ receivedCodeword[6];
  const s4 = receivedCodeword[3] ^ receivedCodeword[4] ^ receivedCodeword[5] ^ receivedCodeword[6];
  const syndromeInt = s4 * 4 + s2 * 2 + s1 * 1;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/50 rounded-xl border border-white/10 space-y-3">
        <label className="text-xs font-semibold text-slate-300">
          4-Bit Input Data (d1, d2, d3, d4):
        </label>
        <input
          type="text"
          value={dataBits}
          maxLength={4}
          onChange={(e) => setDataBits(e.target.value.replace(/[^01]/g, ''))}
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 focus:outline-none"
        />

        <div className="text-xs text-slate-400 pt-1">
          Parity equations: p1 = d1⊕d2⊕d4 = {p1}, p2 = d1⊕d3⊕d4 = {p2}, p4 = d2⊕d3⊕d4 = {p4}
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            7-Bit Hamming Codeword (Click any bit to flip):
          </span>
          {corruptPos && (
            <button onClick={() => setCorruptPos(null)} className="text-xs text-blue-400 hover:text-blue-300 underline">
              Reset Bits
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {receivedCodeword.map((val, idx) => {
            const pos = idx + 1;
            const isFlipped = corruptPos === pos;
            const isParity = pos === 1 || pos === 2 || pos === 4;
            return (
              <button
                key={pos}
                onClick={() => setCorruptPos(isFlipped ? null : pos)}
                className={`flex-1 h-14 rounded-xl font-mono flex flex-col items-center justify-center transition-all ${
                  isFlipped
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 animate-pulse'
                    : isParity
                    ? 'bg-blue-900/40 border border-blue-500/40 text-blue-300'
                    : 'bg-slate-800 border border-white/10 text-white'
                }`}
              >
                <span className="text-base font-bold">{val}</span>
                <span className="text-[10px] opacity-60">
                  {isParity ? `p${pos}` : `d${pos === 3 ? 1 : pos === 5 ? 2 : pos === 6 ? 3 : 4}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className={`p-3.5 rounded-lg border flex items-center gap-3 ${
          syndromeInt === 0
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          {syndromeInt === 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <div className="text-xs">
            <span className="font-bold">
              Syndrome Word (s4 s2 s1) = {s4}{s2}{s1} ({syndromeInt === 0 ? 'No Errors' : `Position ${syndromeInt}`})
            </span>
            <p className="mt-0.5 opacity-90">
              {syndromeInt === 0
                ? 'All parity checks satisfied. Codeword intact.'
                : `Syndrome indicates bit position ${syndromeInt} is corrupted! Auto-inverting bit ${syndromeInt} restores clean data: ${dataBits}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------- 6. Token Bucket Traffic Shaper -----------------
export const TokenBucketDemo: React.FC<{ initialState?: Record<string, any> }> = () => {
  const [capacity, setCapacity] = useState<number>(10);
  const [tokens, setTokens] = useState<number>(8);
  const [conforming, setConforming] = useState<number>(0);
  const [dropped, setDropped] = useState<number>(0);

  // Periodic token arrival
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens(prev => Math.min(capacity, prev + 1));
    }, 1200);
    return () => clearInterval(timer);
  }, [capacity]);

  const handleSendBurst = (count: number) => {
    if (tokens >= count) {
      setTokens(prev => prev - count);
      setConforming(prev => prev + count);
    } else {
      const allowed = tokens;
      const denied = count - allowed;
      setTokens(0);
      setConforming(prev => prev + allowed);
      setDropped(prev => prev + denied);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/40 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSendBurst(1)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <Play className="w-3.5 h-3.5" /> Send 1 Packet
          </button>
          <button
            onClick={() => handleSendBurst(5)}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Inject Burst (5 Packets)
          </button>
          <button
            onClick={() => { setTokens(capacity); setConforming(0); setDropped(0); }}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <div className="text-xs font-mono text-slate-300">
          Bucket: <span className="text-emerald-400 font-bold">{tokens} / {capacity}</span> Tokens
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
          <div className="text-xs font-semibold text-slate-300">
            Token Reservoir (Regenerates +1 token/sec):
          </div>
          <div className="h-28 bg-slate-950 rounded-lg border border-white/5 p-3 flex flex-wrap gap-2 content-start">
            {Array.from({ length: capacity }).map((_, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                  i < tokens
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'border border-dashed border-white/20 text-transparent'
                }`}
              >
                🪙
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-3">
          <div className="text-xs font-semibold text-slate-300">
            Traffic Shaping Analytics:
          </div>
          <div className="space-y-2">
            <div className="p-2.5 bg-black/40 rounded-lg flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">Conforming Packets Transmitted:</span>
              <span className="font-mono font-bold text-emerald-300">{conforming}</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg flex items-center justify-between text-xs">
              <span className="text-rose-400 font-semibold">Non-Conforming Packets Dropped:</span>
              <span className="font-mono font-bold text-rose-300">{dropped}</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg flex items-center justify-between text-xs">
              <span className="text-blue-400 font-semibold">Burst Transmission Law:</span>
              <span className="font-mono text-slate-300">S = C / (M - r)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------- Master Component Dispatcher -----------------
export const QuestionPaperDemoViewer: React.FC<{ demoConfig: QuestionPaperDemoConfig }> = ({ demoConfig }) => {
  return (
    <div className="space-y-4">
      <div className="p-3.5 bg-blue-950/30 rounded-xl border border-blue-500/20 text-xs text-blue-200">
        <span className="font-bold uppercase tracking-wider text-blue-400 block mb-1">
          Exam Companion Simulator: {demoConfig.title}
        </span>
        <p className="opacity-90">{demoConfig.instructions}</p>
      </div>

      {demoConfig.type === 'dijkstra' && <DijkstraDemo initialState={demoConfig.initialState} />}
      {demoConfig.type === 'crc' && <CrcDemo initialState={demoConfig.initialState} />}
      {demoConfig.type === 'cidr' && <CidrDemo initialState={demoConfig.initialState} />}
      {demoConfig.type === 'tcp-congestion' && <TcpCongestionDemo initialState={demoConfig.initialState} />}
      {demoConfig.type === 'hamming' && <HammingDemo initialState={demoConfig.initialState} />}
      {demoConfig.type === 'token-bucket' && <TokenBucketDemo initialState={demoConfig.initialState} />}
    </div>
  );
};
