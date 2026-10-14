import { describe, it, expect } from 'vitest';
import { GAMING_LAB_TIERS, AgeTierGame } from '../data/gamingLabData';

describe('Gaming Lab (Ages 10, 12, 15, 18, 21) Academic Depth & Curriculum Rigor', () => {
  it('should define all 5 age-adaptive developmental tiers', () => {
    expect(GAMING_LAB_TIERS).toBeDefined();
    expect(GAMING_LAB_TIERS.length).toBe(5);

    const ages = GAMING_LAB_TIERS.map(t => t.age);
    expect(ages).toEqual([10, 12, 15, 18, 21]);
  });

  it('should provide complete KTU academic framework metadata for all tiers', () => {
    GAMING_LAB_TIERS.forEach(tier => {
      expect(tier.academicFramework).toBeDefined();
      expect(tier.academicFramework.courseCode).toBeTruthy();
      expect(tier.academicFramework.courseTitle).toBeTruthy();
      expect(tier.academicFramework.moduleNumber).toBeTruthy();
      expect(tier.academicFramework.bloomsTaxonomyLevel).toBeTruthy();
      expect(tier.academicFramework.prerequisites.length).toBeGreaterThan(0);
      expect(tier.academicFramework.creditWeight).toBeGreaterThan(0);
    });
  });

  it('should contain formal mathematical derivations and algorithm specifications', () => {
    GAMING_LAB_TIERS.forEach(tier => {
      expect(tier.deepTheory.mathematicalDerivation).toBeTruthy();
      expect(tier.deepTheory.formalAlgorithm).toBeTruthy();
      expect(tier.deepTheory.formalAlgorithm.pseudocode).toBeTruthy();
      expect(tier.deepTheory.formalAlgorithm.timeComplexity).toBeTruthy();
      expect(tier.deepTheory.formalAlgorithm.spaceComplexity).toBeTruthy();
      expect(tier.deepTheory.keyFormulasOrRules.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should include fully worked solved KTU numerical problems for each age tier', () => {
    GAMING_LAB_TIERS.forEach(tier => {
      expect(tier.solvedNumericalExample).toBeDefined();
      expect(tier.solvedNumericalExample.problemStatement).toBeTruthy();
      expect(tier.solvedNumericalExample.givenData).toBeDefined();
      expect(tier.solvedNumericalExample.stepByStepSolution.length).toBeGreaterThanOrEqual(3);
      expect(tier.solvedNumericalExample.finalAnswer).toBeTruthy();
    });
  });

  it('should configure interactive workbenches for realtime formula evaluation', () => {
    GAMING_LAB_TIERS.forEach(tier => {
      expect(tier.interactiveWorkbench).toBeDefined();
      expect(tier.interactiveWorkbench.calculatorType).toBeTruthy();
      expect(tier.interactiveWorkbench.title).toBeTruthy();
      expect(tier.interactiveWorkbench.formulaDisplay).toBeTruthy();
    });
  });

  it('should provide viva voce technical interview mastery questions with faculty answers', () => {
    GAMING_LAB_TIERS.forEach(tier => {
      expect(tier.vivaVoceQuestions).toBeDefined();
      expect(tier.vivaVoceQuestions.length).toBeGreaterThanOrEqual(3);
      tier.vivaVoceQuestions.forEach(q => {
        expect(q.question).toBeTruthy();
        expect(q.answer).toBeTruthy();
        expect(q.conceptTested).toBeTruthy();
      });
    });
  });

  it('must strictly enforce Zero Student PII and maintain official Faculty branding', () => {
    const rawDataStr = JSON.stringify(GAMING_LAB_TIERS);
    // Zero PII checks:
    expect(rawDataStr.toLowerCase()).not.toContain('arjun');
    expect(rawDataStr).not.toMatch(/TVE\d{2}[A-Z]{2}\d{3}/i);
    expect(rawDataStr).not.toMatch(/KTU\d{2}[A-Z]{2}\d{3}/i);

    // Faculty branding check in data/context
    const facultyFound = rawDataStr.includes('Jane Rose') || rawDataStr.includes('CSE');
    expect(facultyFound).toBe(true);
  });
});
