import { describe, it, expect } from 'vitest';
import { CpuSchedulingLab } from '../components/simulations/CpuSchedulingLab';
import { PacketRoutingSimulation } from '../components/simulations/PacketRoutingSimulation';
import { SqlSandboxLab } from '../components/simulations/SqlSandboxLab';
import { NeuralNetwork3D } from '../components/simulations/NeuralNetwork3D';
import { executeForwardPass, applyActivation, softmax } from '../services/neuralMath';
import { executeSqlQuery } from '../services/sqlEngine';

describe('Task 10: Simulations and Virtual Labs Validation', () => {
  it('should export all simulation lab components including NeuralNetwork3D', () => {
    expect(CpuSchedulingLab).toBeDefined();
    expect(PacketRoutingSimulation).toBeDefined();
    expect(SqlSandboxLab).toBeDefined();
    expect(NeuralNetwork3D).toBeDefined();
  });

  it('should accurately compute forward pass matrix operations across all 4 layers', () => {
    const result = executeForwardPass([0.8, -0.4, 0.6, 0.9], 'relu');
    expect(result.layerTraces).toHaveLength(4);
    expect(result.layerTraces[0].nodeCount).toBe(4);
    expect(result.layerTraces[1].nodeCount).toBe(6);
    expect(result.layerTraces[2].nodeCount).toBe(6);
    expect(result.layerTraces[3].nodeCount).toBe(2);

    // All ReLU activations should be non-negative
    result.layerTraces[1].aValues.forEach(val => expect(val).toBeGreaterThanOrEqual(0));
    result.layerTraces[2].aValues.forEach(val => expect(val).toBeGreaterThanOrEqual(0));

    // Output probabilities must sum to approximately 1.0
    const sumProb = result.outputProbabilities.reduce((a, b) => a + b, 0);
    expect(sumProb).toBeCloseTo(1.0, 2);
    expect(result.pythonCode).toContain('import numpy as np');
  });

  it('should execute arbitrary SQL queries correctly with projection, WHERE, ORDER BY, and LIMIT', () => {
    // 1. Filter by GPA
    const r1 = executeSqlQuery('SELECT name, gpa FROM students WHERE gpa >= 9.0 ORDER BY gpa DESC;');
    expect(r1.success).toBe(true);
    expect(r1.rowCount).toBeGreaterThan(0);
    expect(r1.columns).toEqual(['name', 'gpa']);
    r1.rows.forEach(row => expect(row.gpa).toBeGreaterThanOrEqual(9.0));

    // 2. Filter with LIKE
    const r2 = executeSqlQuery("SELECT * FROM students WHERE course LIKE '%Networks%';");
    expect(r2.success).toBe(true);
    expect(r2.rowCount).toBe(2);

    // 3. Limit test
    const r3 = executeSqlQuery('SELECT id, name FROM students LIMIT 2;');
    expect(r3.success).toBe(true);
    expect(r3.rowCount).toBe(2);

    // 4. Syntax Error handling
    const r4 = executeSqlQuery('INSERT INTO students VALUES (1, "fake");');
    expect(r4.success).toBe(false);
    expect(r4.error).toBeDefined();
  });
});
