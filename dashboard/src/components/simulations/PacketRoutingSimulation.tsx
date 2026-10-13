import React, { useState } from 'react';
import { Network, Play, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const PacketRoutingSimulation: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<'ospf' | 'rip'>('ospf');
  const [failedLink, setFailedLink] = useState<string | null>(null);
  const [packetStep, setPacketStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // 5 Nodes: S (Source), A, B, C, D (Destination)
  const defaultPathOSPF = failedLink === 'S-A' ? ['S', 'B', 'C', 'D'] : ['S', 'A', 'D'];
  const defaultPathRIP = failedLink === 'S-A' ? ['S', 'B', 'D'] : ['S', 'A', 'D'];

  const currentPath = activeProtocol === 'ospf' ? defaultPathOSPF : defaultPathRIP;

  const startSimulation = () => {
    setIsSimulating(true);
    setPacketStep(0);

    const interval = setInterval(() => {
      setPacketStep(prev => {
        if (prev >= currentPath.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const toggleLinkFailure = () => {
    setFailedLink(prev => (prev === 'S-A' ? null : 'S-A'));
    setPacketStep(0);
  };

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-emerald-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Dynamic Routing Protocol Simulator (OSPF vs RIPv2)
            </h3>
            <span className="text-[11px] text-slate-500">
              CST303 Module 3 • Dijkstra Shortest Path vs Distance Vector Loop Recovery
            </span>
          </div>
        </div>

        {/* Protocol Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveProtocol('ospf'); setPacketStep(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeProtocol === 'ospf' ? 'bg-emerald-600 text-white shadow-xs' : 'glass-button'
            }`}
          >
            OSPF (Link State Dijkstra)
          </button>
          <button
            onClick={() => { setActiveProtocol('rip'); setPacketStep(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeProtocol === 'rip' ? 'bg-blue-600 text-white shadow-xs' : 'glass-button'
            }`}
          >
            RIPv2 (Distance Vector)
          </button>
        </div>
      </div>

      {/* Topology Canvas */}
      <div className="p-6 rounded-2xl bg-slate-950 text-white relative h-64 flex items-center justify-between px-8 sm:px-16 border border-slate-800">
        {/* Node S */}
        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold border-2 transition-all ${
          currentPath[packetStep] === 'S' ? 'bg-amber-500 border-amber-300 text-slate-950 scale-110 shadow-lg shadow-amber-500/50' : 'bg-slate-800 border-slate-600'
        }`}>
          <span className="text-sm">Router S</span>
          <span className="text-[9px] text-slate-400 font-mono">10.0.0.1</span>
        </div>

        {/* Intermediate Nodes */}
        <div className="flex flex-col gap-12">
          {/* Node A */}
          <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold border-2 transition-all ${
            failedLink === 'S-A'
              ? 'border-red-500/60 bg-red-950/40 text-red-400 line-through'
              : currentPath[packetStep] === 'A'
              ? 'bg-amber-500 border-amber-300 text-slate-950 scale-110 shadow-lg shadow-amber-500/50'
              : 'bg-slate-800 border-slate-600'
          }`}>
            <span className="text-sm">Router A</span>
            <span className="text-[9px] font-mono text-slate-400">Cost: 2</span>
          </div>

          {/* Node B */}
          <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold border-2 transition-all ${
            currentPath[packetStep] === 'B' ? 'bg-amber-500 border-amber-300 text-slate-950 scale-110 shadow-lg shadow-amber-500/50' : 'bg-slate-800 border-slate-600'
          }`}>
            <span className="text-sm">Router B</span>
            <span className="text-[9px] font-mono text-slate-400">Cost: 5</span>
          </div>
        </div>

        {/* Node D (Destination) */}
        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold border-2 transition-all ${
          currentPath[packetStep] === 'D' ? 'bg-emerald-500 border-emerald-300 text-slate-950 scale-110 shadow-lg shadow-emerald-500/50' : 'bg-slate-800 border-slate-600'
        }`}>
          <span className="text-sm">Router D</span>
          <span className="text-[9px] text-slate-400 font-mono">Destination</span>
        </div>
      </div>

      {/* Simulator Controls & Diagnostic */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Transmit Packet Flow</span>
          </button>

          <button
            onClick={toggleLinkFailure}
            className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
              failedLink
                ? 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-400'
                : 'glass-button hover:border-amber-500'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>{failedLink ? 'Repair S-A Link' : 'Simulate Link S-A Failure'}</span>
          </button>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
          Active Packet Path: <strong>{currentPath.join(' -> ')}</strong>
        </div>
      </div>
    </div>
  );
};
