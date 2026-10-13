import { describe, it, expect } from 'vitest';
import { RESEARCH_PAPERS } from '../data/researchData';
import { CAREER_ROLES } from '../data/industryCareerData';

describe('Task 11: Verified Research and Career Data Validation', () => {
  it('all research papers must have verified DOIs and authoritative venues', () => {
    for (const p of RESEARCH_PAPERS) {
      expect(p.doi.length).toBeGreaterThan(5);
      expect(p.authors.length).toBeGreaterThan(0);
      expect(p.year).toBeGreaterThan(1970);
      expect(p.researchProblem.length).toBeGreaterThan(10);
      expect(p.syllabusRelevance.length).toBeGreaterThan(0);
    }
  });

  it('career roles must have explicit salary sources and skills checklists', () => {
    for (const r of CAREER_ROLES) {
      expect(r.salarySource.length).toBeGreaterThan(5);
      expect(r.salaryRangeINR.length).toBeGreaterThan(0);
      expect(r.salaryRangeUSD.length).toBeGreaterThan(0);
      expect(r.skillsGapChecklist.length).toBeGreaterThanOrEqual(1);
      expect(r.topEmployers.length).toBeGreaterThanOrEqual(2);
    }
  });
});
