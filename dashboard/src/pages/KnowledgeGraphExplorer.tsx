import React, { useState } from 'react';
import { GRAPH_NODES, GraphNode } from '../data/knowledgeGraphData';
import { GraphCanvas } from '../components/GraphCanvas';
import { Network, Search, Filter, BookOpen, Layers, ArrowRight, X, Cpu, Briefcase } from 'lucide-react';

interface KnowledgeGraphExplorerProps {
  onNavigateSection: (sectionId: string) => void;
}

export const KnowledgeGraphExplorer: React.FC<KnowledgeGraphExplorerProps> = ({ onNavigateSection }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_NODES[1]); // Default to OSI
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 space-y-3 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          <Network className="w-4 h-4" />
          <span>Semantic Curriculum Topology</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Interactive Knowledge Graph Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
          Visualize interconnected relationships between subjects, core algorithms, equations, prerequisite paths, laboratory experiments, and industry career pathways. Click any node to inspect prerequisite requirements and syllabus links.
        </p>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-panel">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search concepts, Dijkstra, JVM, Socket..."
            className="glass-input w-full pl-8 pr-3 py-1.5 text-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
          {[
            { id: 'all', label: 'All Entities' },
            { id: 'concept', label: 'Concepts' },
            { id: 'algorithm', label: 'Algorithms' },
            { id: 'lab', label: 'Labs' },
            { id: 'career', label: 'Career Roles' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Grid with Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GraphCanvas
            onSelectNode={setSelectedNode}
            selectedNode={selectedNode}
            searchFilter={searchFilter}
            categoryFilter={categoryFilter}
          />
        </div>

        {/* Selected Node Details Drawer */}
        <div className="glass-panel p-6 flex flex-col justify-between space-y-6">
          {selectedNode ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {selectedNode.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedNode.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="glass-button p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Concept Overview:
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Prerequisites */}
              {selectedNode.prerequisites && selectedNode.prerequisites.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Prerequisites:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.prerequisites.map((prereqId) => {
                      const pNode = GRAPH_NODES.find(n => n.id === prereqId);
                      return (
                        <button
                          key={prereqId}
                          onClick={() => setSelectedNode(pNode || null)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          {pNode ? pNode.label : prereqId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Career Relevance */}
              {selectedNode.careerRelevance && (
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-800 dark:text-cyan-300">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Industry Career Alignment</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {selectedNode.careerRelevance}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-400">
              Click any node in the knowledge canvas to inspect its semantic prerequisites and syllabus links.
            </div>
          )}

          {/* Jump Actions */}
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-2">
            <button
              onClick={() => onNavigateSection('modules')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5"
            >
              <span>Explore Module Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateSection('simulations')}
              className="w-full py-2 rounded-xl text-xs font-semibold glass-button flex items-center justify-center gap-1.5 hover:border-blue-400"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>Launch Virtual Lab Simulation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
