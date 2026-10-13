import { describe, it, expect } from 'vitest';
import { ACADEMIC_SUBJECTS } from '../data/academicData';

describe('Task 4: Question Papers and Answer Schemes Validation', () => {
  it('should verify CST303 contains both official valuation schemes from the repo', () => {
    const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks')!;
    const schemeFiles = cn.answerKeys.map(k => k.filename);
    expect(schemeFiles).toContain('B2 CST303 CN QP SCHEME1-Dec 2022.pdf');
    expect(schemeFiles).toContain('CST303-DRAFT SCHEME1.pdf');
  });

  it('each question paper should have a valid filename and non-zero byte size', () => {
    const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks')!;
    for (const qp of cn.questionPapers) {
      expect(qp.filename).toMatch(/\.pdf$/i);
      expect(qp.sizeBytes).toBeGreaterThan(0);
      expect(qp.examMonthYear.length).toBeGreaterThan(0);
    }
  });

  it('should include authentic model paper sets 1 through 5', () => {
    const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks')!;
    const modelSets = cn.questionPapers.filter(q => q.category === 'model-paper');
    expect(modelSets.length).toBe(5);
  });
});
