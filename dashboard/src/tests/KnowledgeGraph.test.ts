import { describe, it, expect } from 'vitest';
import { GRAPH_NODES, GRAPH_EDGES } from '../data/knowledgeGraphData';

describe('Task 8: Knowledge Graph Data & Topology Validation', () => {
  it('should contain nodes across multiple academic categories', () => {
    const categories = new Set(GRAPH_NODES.map(n => n.category));
    expect(categories.has('subject')).toBe(true);
    expect(categories.has('concept')).toBe(true);
    expect(categories.has('algorithm')).toBe(true);
    expect(categories.has('lab')).toBe(true);
    expect(categories.has('career')).toBe(true);
  });

  it('every edge source and target must exist in GRAPH_NODES', () => {
    const nodeIds = new Set(GRAPH_NODES.map(n => n.id));
    for (const edge of GRAPH_EDGES) {
      expect(nodeIds.has(edge.source), `Source node ${edge.source} must exist`).toBe(true);
      expect(nodeIds.has(edge.target), `Target node ${edge.target} must exist`).toBe(true);
    }
  });
});
