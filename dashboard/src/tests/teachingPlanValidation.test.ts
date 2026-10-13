import { describe, it, expect } from 'vitest';
import { TEACHING_PLANS } from '../data/teachingPlans';

describe('Task 6: 46-Hour Teaching Plan Mathematical Validation', () => {
  it('every subject teaching plan must have exactly 46 sessions', () => {
    for (const [subjectId, plan] of Object.entries(TEACHING_PLANS)) {
      expect(plan.sessions.length, `Subject ${subjectId} session count`).toBe(46);
    }
  });

  it('mathematical sum of durationHours must equal exactly 46.0 hours', () => {
    for (const [subjectId, plan] of Object.entries(TEACHING_PLANS)) {
      const totalHours = plan.sessions.reduce((acc, s) => acc + s.durationHours, 0);
      expect(totalHours, `Subject ${subjectId} total hours`).toBe(46.0);
      expect(plan.totalHours).toBe(46.0);
    }
  });

  it('every session must contain all 9 required fields from the specification', () => {
    for (const [_, plan] of Object.entries(TEACHING_PLANS)) {
      for (const s of plan.sessions) {
        expect(s.session).toBeGreaterThan(0);
        expect(s.durationHours).toBeGreaterThan(0);
        expect(s.module).toBeGreaterThanOrEqual(1);
        expect(s.topic.length).toBeGreaterThan(0);
        expect(s.learningOutcomes.length).toBeGreaterThan(0);
        expect(s.teachingMethod.length).toBeGreaterThan(0);
        expect(s.learningResources.length).toBeGreaterThan(0);
        expect(s.assessment.length).toBeGreaterThan(0);
        expect(s.practicalActivity.length).toBeGreaterThan(0);
      }
    }
  });
});
