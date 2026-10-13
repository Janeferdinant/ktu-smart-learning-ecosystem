import { describe, it, expect } from 'vitest';
import { CpuSchedulingLab } from '../components/simulations/CpuSchedulingLab';
import { PacketRoutingSimulation } from '../components/simulations/PacketRoutingSimulation';
import { SqlSandboxLab } from '../components/simulations/SqlSandboxLab';

describe('Task 10: Simulations and Virtual Labs Validation', () => {
  it('should export all simulation lab components', () => {
    expect(CpuSchedulingLab).toBeDefined();
    expect(PacketRoutingSimulation).toBeDefined();
    expect(SqlSandboxLab).toBeDefined();
  });
});
