import { describe, it, expect } from 'vitest';
import { generateModulePresentation } from '../services/pptxGenerator';
import { ACADEMIC_SUBJECTS } from '../data/academicData';

describe('Task 5: Light-Theme PowerPoint Generator Validation', () => {
  it('should have generateModulePresentation function defined', () => {
    expect(typeof generateModulePresentation).toBe('function');
  });

  it('all subjects should have modules that can be passed to the PPTX generator', () => {
    for (const sub of ACADEMIC_SUBJECTS) {
      for (const mod of sub.modules) {
        expect(mod.moduleNumber).toBeGreaterThan(0);
        expect(mod.title.length).toBeGreaterThan(0);
        expect(mod.keyTopics.length).toBeGreaterThan(0);
      }
    }
  });
});
