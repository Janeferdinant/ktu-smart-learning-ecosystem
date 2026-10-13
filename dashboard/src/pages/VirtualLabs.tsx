import React, { useState } from 'react';
import { NeuralNetwork3D } from '../components/simulations/NeuralNetwork3D';
import { PacketRoutingSimulation } from '../components/simulations/PacketRoutingSimulation';
import { CpuSchedulingLab } from '../components/simulations/CpuSchedulingLab';
import { SqlSandboxLab } from '../components/simulations/SqlSandboxLab';
import { Cpu, Network, Database, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface VirtualLabsProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const VirtualLabs: React.FC<VirtualLabsProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'neural' | 'routing' | 'cpu' | 'sql'>('neural');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-indigo-600/10 border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Cpu className="w-4 h-4" />
          <span>Interactive Engineering Simulations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Virtual Laboratories & Real-Time Demonstrations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Experiment with live mathematical models, Three.js 3D signal propagation, packet routing dynamics, OS process scheduling Gantt charts, and relational SQL sandboxes.
        </p>
      </div>

      {/* Simulation Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 p-2 glass-panel">
        {[
          { id: 'neural', label: '3D Neural Network (Three.js)', icon: Sparkles },
          { id: 'routing', label: 'Packet Routing (OSPF / RIP)', icon: Network },
          { id: 'cpu', label: 'CPU Scheduling Lab', icon: Clock },
          { id: 'sql', label: 'SQL Query Sandbox', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Simulation View */}
      <div className="space-y-6">
        {activeTab === 'neural' && <NeuralNetwork3D />}
        {activeTab === 'routing' && <PacketRoutingSimulation />}
        {activeTab === 'cpu' && <CpuSchedulingLab />}
        {activeTab === 'sql' && <SqlSandboxLab />}
      </div>
    </div>
  );
};
