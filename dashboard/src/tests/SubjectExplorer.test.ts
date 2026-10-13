import { describe, it, expect } from 'vitest';
import { ACADEMIC_SUBJECTS } from '../data/academicData';

describe('Task 3: Subject Explorer and Academic Data Validation', () => {
  it('should contain the verified KTU subjects', () => {
    const ids = ACADEMIC_SUBJECTS.map(s => s.id);
    expect(ids).toContain('cst303-computer-networks');
    expect(ids).toContain('cst205-object-oriented-programming');
    expect(ids).toContain('pcadt502-robotics');
    expect(ids).toContain('pecst521-software-project-management');
  });

  it('each subject should have valid modules with key topics', () => {
    for (const sub of ACADEMIC_SUBJECTS) {
      expect(sub.modules.length).toBeGreaterThanOrEqual(1);
      for (const mod of sub.modules) {
        expect(mod.title.length).toBeGreaterThan(0);
        expect(mod.keyTopics.length).toBeGreaterThanOrEqual(1);
        expect(mod.hoursAllocated).toBeGreaterThan(0);
      }
    }
  });

  it('CST303 Computer Networks should contain official question papers and answer schemes', () => {
    const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks');
    expect(cn).toBeDefined();
    expect(cn?.questionPapers.length).toBeGreaterThanOrEqual(10);
    expect(cn?.answerKeys.length).toBeGreaterThanOrEqual(2);
  });
});
