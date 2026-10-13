import React, { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES, GraphNode } from '../data/knowledgeGraphData';
import { ZoomIn, ZoomOut, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

interface GraphCanvasProps {
  onSelectNode: (node: GraphNode | null) => void;
  selectedNode: GraphNode | null;
  searchFilter: string;
  categoryFilter: string;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  onSelectNode,
  selectedNode,
  searchFilter,
  categoryFilter
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Grid / layered layout calculation for nodes
  const nodePositions: Record<string, { x: number; y: number }> = {
    'sub-cn': { x: 120, y: 150 },
    'cn-osi': { x: 300, y: 150 },
    'cn-crc': { x: 480, y: 90 },
    'cn-sliding-window': { x: 680, y: 90 },
    'cn-subnetting': { x: 480, y: 220 },
    'cn-dijkstra': { x: 680, y: 180 },
    'cn-bellman-ford': { x: 680, y: 260 },
    'cn-tcp-handshake': { x: 680, y: 340 },
    'cn-tcp-congestion': { x: 880, y: 300 },
    'cn-socket-api': { x: 880, y: 400 },

    'sub-java': { x: 120, y: 460 },
    'java-jvm': { x: 300, y: 460 },
    'java-polymorphism': { x: 480, y: 460 },
    'java-exceptions': { x: 680, y: 460 },
    'java-swing-mvc': { x: 680, y: 540 },
    'java-jdbc': { x: 880, y: 480 },
    'java-threading': { x: 480, y: 370 },

    'sub-robotics': { x: 120, y: 640 },

    'career-network-architect': { x: 1080, y: 220 },
    'career-backend-dev': { x: 1080, y: 500 },
    'career-robotics-eng': { x: 1080, y: 640 }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'subject': return '#2563eb';
      case 'algorithm': return '#10b981';
      case 'concept': return '#f59e0b';
      case 'lab': return '#8b5cf6';
      case 'career': return '#06b6d4';
      default: return '#64748b';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[540px] glass-panel overflow-hidden select-none border-blue-500/20">
      {/* Zoom Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl glass-panel shadow-md">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 0.15, 2.0))}
          className="p-1.5 rounded-lg glass-button text-slate-700 dark:text-slate-200"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.6))}
          className="p-1.5 rounded-lg glass-button text-slate-700 dark:text-slate-200"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="p-1.5 rounded-lg glass-button text-slate-700 dark:text-slate-200"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Canvas Area */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            transition: isDragging ? 'none' : 'transform 0.15s ease'
          }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Render Directed Edges */}
          {GRAPH_EDGES.map((edge, i) => {
            const p1 = nodePositions[edge.source];
            const p2 = nodePositions[edge.target];
            if (!p1 || !p2) return null;

            const isHighlighted = selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

            return (
              <g key={i}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isHighlighted ? '#3b82f6' : '#94a3b8'}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={edge.relationship === 'prerequisite' ? '4 2' : undefined}
                  opacity={isHighlighted ? 1 : 0.45}
                  markerEnd="url(#arrow)"
                />
              </g>
            );
          })}

          {/* Render Nodes */}
          {GRAPH_NODES.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isSelected = selectedNode?.id === node.id;
            const matchesSearch = searchFilter ? node.label.toLowerCase().includes(searchFilter.toLowerCase()) : true;
            const matchesCategory = categoryFilter !== 'all' ? node.category === categoryFilter : true;
            const isDimmed = !matchesSearch || !matchesCategory;

            const color = getCategoryColor(node.category);

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node);
                }}
                className="cursor-pointer transition-transform hover:scale-105"
                opacity={isDimmed ? 0.25 : 1}
              >
                <circle
                  r={node.category === 'subject' ? 24 : 18}
                  fill={isSelected ? '#3b82f6' : color}
                  fillOpacity={isSelected ? 0.95 : 0.2}
                  stroke={color}
                  strokeWidth={isSelected ? 3 : 2}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                />

                <circle
                  r={node.category === 'subject' ? 8 : 5}
                  fill={color}
                />

                <text
                  y={node.category === 'subject' ? 38 : 30}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isSelected ? 'bold' : '600'}
                  fill="currentColor"
                  className="font-sans text-slate-900 dark:text-slate-100"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend Bar */}
      <div className="absolute bottom-3 left-4 z-20 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-500 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span>Subject</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Core Concept</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Algorithm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span>Lab Endpoint</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          <span>Industry Career</span>
        </div>
      </div>
    </div>
  );
};
