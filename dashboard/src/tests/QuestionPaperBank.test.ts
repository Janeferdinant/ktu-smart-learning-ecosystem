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

  it('each question paper must have a complete Solution, Demo, and Answer Key companion', async () => {
    const { QUESTION_PAPER_COMPANIONS } = await import('../data/questionPaperSolutionsData');
    expect(QUESTION_PAPER_COMPANIONS).toBeDefined();

    const cn = ACADEMIC_SUBJECTS.find(s => s.id === 'cst303-computer-networks')!;
    for (const qp of cn.questionPapers) {
      const companion = QUESTION_PAPER_COMPANIONS[qp.id];
      expect(companion, `Companion for paper ${qp.id} (${qp.title})`).toBeDefined();

      // Solution Verification
      expect(companion.solution).toBeDefined();
      expect(companion.solution.overview.length).toBeGreaterThan(20);
      expect(companion.solution.partA.length).toBeGreaterThanOrEqual(5);
      expect(companion.solution.partB.length).toBeGreaterThanOrEqual(2);
      companion.solution.partA.forEach(q => {
        expect(q.questionText).toBeTruthy();
        expect(q.solutionText).toBeTruthy();
        expect(q.marks).toBe(3);
      });
      companion.solution.partB.forEach(q => {
        expect(q.questionText).toBeTruthy();
        expect(q.solutionSteps.length).toBeGreaterThanOrEqual(2);
        expect(q.marks).toBeGreaterThanOrEqual(7);
      });

      // Interactive Demo Verification
      expect(companion.demo).toBeDefined();
      expect(companion.demo.title).toBeTruthy();
      expect(['dijkstra', 'crc', 'cidr', 'tcp-congestion', 'token-bucket', 'hamming']).toContain(companion.demo.type);
      expect(companion.demo.instructions).toBeTruthy();

      // Answer Key Verification
      expect(companion.answerKey).toBeDefined();
      expect(companion.answerKey.schemeTitle).toBeTruthy();
      expect(companion.answerKey.totalMarks).toBe(100);
      expect(companion.answerKey.rubrics.length).toBeGreaterThanOrEqual(2);
      expect(companion.answerKey.examinerChecklist.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('must strictly enforce Zero Student PII across all question paper solutions and answer keys', async () => {
    const { QUESTION_PAPER_COMPANIONS } = await import('../data/questionPaperSolutionsData');
    const rawData = JSON.stringify(QUESTION_PAPER_COMPANIONS);
    expect(rawData.toLowerCase()).not.toContain('arjun');
    expect(rawData).not.toMatch(/TVE\d{2}[A-Z]{2}\d{3}/i);
    expect(rawData).not.toMatch(/KTU\d{2}[A-Z]{2}\d{3}/i);
  });
});

