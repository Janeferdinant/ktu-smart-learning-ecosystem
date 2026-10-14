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

  it('should validate standalone HTML STEM Arcade scripts and tier integrity', async () => {
    const fs = await import('fs');
    const path = await import('path');

    const htmlPaths = [
      path.resolve(__dirname, '../../public/gaming-lab.html'),
      path.resolve(__dirname, '../../../subjects/common/gaming-lab.html')
    ];

    htmlPaths.forEach(filePath => {
      expect(fs.existsSync(filePath), `File exists: ${filePath}`).toBe(true);
      const html = fs.readFileSync(filePath, 'utf8');

      // Check attribution & CC license
      expect(html).toContain('Jane Rose Ferdinant');
      expect(html).toContain('CC BY-NC-ND 4.0');

      // Extract script blocks
      const scriptMatches = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
      expect(scriptMatches.length).toBeGreaterThanOrEqual(1);

      // Verify each script block compiles without syntax errors
      scriptMatches.forEach((match, idx) => {
        const code = match[1];
        if (!code.trim() || match[0].includes('src=')) return;
        
        let syntaxError = null;
        try {
          new Function(code);
        } catch (err: any) {
          syntaxError = err.message;
        }
        expect(syntaxError, `Script block ${idx+1} syntax in ${filePath}`).toBeNull();
      });

      // Verify all 5 age tier definitions exist in HTML
      [10, 12, 15, 18, 21].forEach(age => {
        expect(html).toContain(`switchAgeTier(${age}`);
      });

      // Verify no student PII
      expect(html.toLowerCase()).not.toContain('arjun');
      expect(html).not.toMatch(/TVE\d{2}[A-Z]{2}\d{3}/i);
      expect(html).not.toMatch(/KTU\d{2}[A-Z]{2}\d{3}/i);
    });
  });

  it('should provide comprehensive bilingual (English & Malayalam) algorithm walkthroughs and voiceover scripts', async () => {
    const { BILINGUAL_GAMING_LAB_DATA } = await import('../data/gamingLabBilingualData');
    expect(BILINGUAL_GAMING_LAB_DATA).toBeDefined();

    const expectedAges = [10, 12, 15, 18, 21];
    expectedAges.forEach(age => {
      const tierData = BILINGUAL_GAMING_LAB_DATA[age];
      expect(tierData, `Bilingual data for Age ${age}`).toBeDefined();

      // English Content & Voiceover
      expect(tierData.en.voiceoverNarrative.length).toBeGreaterThan(50);
      expect(tierData.en.algorithmTitle).toBeTruthy();
      expect(tierData.en.algorithmSteps.length).toBeGreaterThanOrEqual(3);
      expect(tierData.en.realWorldApplications.length).toBeGreaterThanOrEqual(2);

      // Malayalam Content & Voiceover
      expect(tierData.ml.voiceoverNarrative.length).toBeGreaterThan(50);
      expect(tierData.ml.algorithmTitle).toBeTruthy();
      expect(tierData.ml.algorithmSteps.length).toBeGreaterThanOrEqual(3);
      expect(tierData.ml.realWorldApplications.length).toBeGreaterThanOrEqual(2);

      // Verify Malayalam Unicode presence
      const hasMalayalamUnicode = /[\u0D00-\u0D7F]/.test(tierData.ml.voiceoverNarrative);
      expect(hasMalayalamUnicode, `Malayalam text present for Age ${age}`).toBe(true);

      // Avatar config
      expect(tierData.avatar.name).toBeTruthy();
      expect(tierData.avatar.role).toBeTruthy();
      expect(tierData.avatar.focusTopic).toBeTruthy();
    });
  });
});

