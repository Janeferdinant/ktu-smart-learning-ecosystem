import { describe, it, expect } from 'vitest';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

describe('Task 7: Quiz and Assessment Engine Validation', () => {
  it('should include diverse question types', () => {
    const types = new Set(QUIZ_QUESTIONS.map(q => q.type));
    expect(types.has('mcq')).toBe(true);
    expect(types.has('numerical')).toBe(true);
    expect(types.has('multi-select')).toBe(true);
    expect(types.has('code-output')).toBe(true);
    expect(types.has('debugging')).toBe(true);
  });

  it('every question must have points, valid explanation, and correct answer', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.points).toBeGreaterThan(0);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.correctAnswer).toBeDefined();
      expect(q.topicRef.length).toBeGreaterThan(0);
    }
  });

  it('should support both Computer Networks and Java OOP', () => {
    const subjects = new Set(QUIZ_QUESTIONS.map(q => q.subjectId));
    expect(subjects.has('cst303-computer-networks')).toBe(true);
    expect(subjects.has('cst205-object-oriented-programming')).toBe(true);
  });
});
